-- ============================================
-- NOSHOWKILL · Schéma Supabase complet
-- À coller dans : Supabase > SQL Editor > New Query
-- ============================================

-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE : restaurants
-- Un compte = un restaurant
-- ============================================
CREATE TABLE restaurants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  gmail_connected BOOLEAN DEFAULT FALSE,
  gmail_email TEXT,
  twilio_configured BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'solo', 'annual', 'multi')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : clients
-- Historique de chaque client du restaurant
-- ============================================
CREATE TABLE clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  total_reservations INTEGER DEFAULT 0,
  total_noshows INTEGER DEFAULT 0,
  noshow_rate DECIMAL(5,2) DEFAULT 0,
  risk_level TEXT DEFAULT 'unknown' CHECK (risk_level IN ('low', 'medium', 'high', 'unknown')),
  last_reservation_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : reservations
-- Cœur du système
-- ============================================
CREATE TABLE reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients(id),
  client_name TEXT NOT NULL,
  client_phone TEXT,
  client_email TEXT,
  covers INTEGER NOT NULL DEFAULT 2,
  reserved_at TIMESTAMPTZ NOT NULL,
  source TEXT DEFAULT 'manual' CHECK (source IN ('thefork', 'zenchef', 'phone', 'email', 'manual')),
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'reminded', 'arrived', 'noshow', 'cancelled')),
  noshow_score INTEGER CHECK (noshow_score >= 0 AND noshow_score <= 100),
  score_color TEXT CHECK (score_color IN ('green', 'orange', 'red')),
  score_factors JSONB,
  raw_email TEXT,
  email_received_at TIMESTAMPTZ,
  sms_sent BOOLEAN DEFAULT FALSE,
  call_made BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : sms_logs
-- Historique de tous les SMS/appels envoyés
-- ============================================
CREATE TABLE sms_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  client_phone TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('sms_reminder', 'sms_confirmation', 'sms_waitlist', 'call')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  twilio_sid TEXT,
  cost_eur DECIMAL(10,4),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : waitlist
-- Liste d'attente par service
-- ============================================
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  covers INTEGER NOT NULL DEFAULT 2,
  service_date DATE NOT NULL,
  service_time TIME NOT NULL,
  position INTEGER NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'confirmed', 'expired')),
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE : weekly_reports
-- Rapports hebdomadaires sauvegardés
-- ============================================
CREATE TABLE weekly_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  total_reservations INTEGER DEFAULT 0,
  total_noshows INTEGER DEFAULT 0,
  noshow_rate DECIMAL(5,2) DEFAULT 0,
  tables_recovered INTEGER DEFAULT 0,
  revenue_saved DECIMAL(10,2) DEFAULT 0,
  sms_sent INTEGER DEFAULT 0,
  calls_made INTEGER DEFAULT 0,
  report_data JSONB,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES pour les performances
-- ============================================
CREATE INDEX idx_reservations_restaurant_id ON reservations(restaurant_id);
CREATE INDEX idx_reservations_reserved_at ON reservations(reserved_at);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_clients_restaurant_id ON clients(restaurant_id);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_sms_logs_reservation_id ON sms_logs(reservation_id);
CREATE INDEX idx_waitlist_service_date ON waitlist(service_date);

-- ============================================
-- TRIGGERS : updated_at automatique
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- RLS : Row Level Security
-- Chaque restaurant voit UNIQUEMENT ses données
-- ============================================

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;

-- Restaurants : un user voit seulement son restaurant
CREATE POLICY "restaurants_own" ON restaurants
  FOR ALL USING (auth.uid() = user_id);

-- Clients : via restaurant_id
CREATE POLICY "clients_own" ON clients
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  );

-- Réservations : via restaurant_id
CREATE POLICY "reservations_own" ON reservations
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  );

-- SMS logs : via restaurant_id
CREATE POLICY "sms_logs_own" ON sms_logs
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  );

-- Waitlist : via restaurant_id
CREATE POLICY "waitlist_own" ON waitlist
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  );

-- Reports : via restaurant_id
CREATE POLICY "reports_own" ON weekly_reports
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- FONCTION : stats du soir pour le dashboard
-- ============================================
CREATE OR REPLACE FUNCTION get_tonight_stats(p_restaurant_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total', COUNT(*),
    'green', COUNT(*) FILTER (WHERE score_color = 'green'),
    'orange', COUNT(*) FILTER (WHERE score_color = 'orange'),
    'red', COUNT(*) FILTER (WHERE score_color = 'red'),
    'arrived', COUNT(*) FILTER (WHERE status = 'arrived'),
    'noshow', COUNT(*) FILTER (WHERE status = 'noshow'),
    'covers', SUM(covers)
  ) INTO result
  FROM reservations
  WHERE restaurant_id = p_restaurant_id
    AND DATE(reserved_at) = CURRENT_DATE;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
