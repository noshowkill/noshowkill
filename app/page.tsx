import Link from 'next/link'
import { ArrowRight, CheckCircle2, TrendingDown, Clock, ShieldCheck, Mail, Smartphone, BarChart3, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-red-500/30">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">
            NoShow<span className="text-red-500">Kill</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="text-sm bg-white text-zinc-950 px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors"
            >
              Essayer gratuitement
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-6 border border-red-500/20">
            <TrendingDown className="w-4 h-4" />
            La fin des tables vides
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Vos no-shows vous coûtent <span className="text-red-500">1 200€</span> par mois.<br/>
            On arrête ça.
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            NoShowKill prédit quels clients vont disparaître et les relance automatiquement — avant qu'ils vous fassent faux bond.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-200 transition-transform hover:scale-105"
            >
              Essayer gratuitement 30 jours
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-zinc-500 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Sans carte bancaire · Installation en 10 minutes · Résultats en 1 semaine
            </p>
          </div>
        </section>

        {/* Trust Banner */}
        <div className="border-y border-zinc-800 bg-zinc-900/50 py-8 mb-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm text-zinc-400 font-medium tracking-widest uppercase mb-6">
              Déjà utilisé par des restaurants à Paris, Lyon, Marseille, Bordeaux
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder logos for trust visual */}
              <div className="text-xl font-bold font-serif italic text-white flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" /> Le Petit Bistrot
              </div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" /> MAISON D'HÔTE
              </div>
              <div className="text-xl font-medium tracking-widest text-white flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" /> CAFE M
              </div>
              <div className="text-xl font-semibold uppercase text-white flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" /> L'Atelier
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <section className="max-w-5xl mx-auto px-4 mb-32">
          <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingDown className="w-64 h-64 text-red-500" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Chaque vendredi soir, c'est la même histoire.</h2>
              <div className="space-y-4 text-lg text-zinc-300 leading-relaxed">
                <p>
                  Vous préparez tout. Vous faites confiance. Et à 20h, <strong>3 tables vides vous regardent</strong>.
                </p>
                <p>
                  <span className="text-red-400 font-semibold">15 à 20%</span> de vos réservations finissent en no-show. 
                  2 tables vides par service = 70€ perdus = <strong className="text-white">2 100€ par mois qui s'évaporent</strong>.
                </p>
                <p className="pt-4 border-t border-zinc-800 text-zinc-400 text-base">
                  25 restaurants ferment en France chaque jour. Le no-show est la cause n°1 silencieuse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="max-w-5xl mx-auto px-4 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">NoShowKill se pose sur vos outils.<br/>Vous ne changez rien.</h2>
            <p className="text-xl text-zinc-400">Une intégration invisible, des résultats immédiats.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Mail className="w-6 h-6 text-blue-400" />,
                title: "1. Connexion",
                desc: "Vous transférez vos emails TheFork/Zenchef en 3 minutes"
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
                title: "2. Scoring IA",
                desc: "NoShowKill score chaque client de 0 à 100 automatiquement"
              },
              {
                icon: <Smartphone className="w-6 h-6 text-orange-400" />,
                title: "3. Action",
                desc: "Le bon rappel part tout seul — SMS, confirmation, ou appel"
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
                title: "4. Résultats",
                desc: "Lundi matin : votre rapport avec le CA récupéré cette semaine"
              }
            ].map((step, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial & Stats */}
        <section className="max-w-5xl mx-auto px-4 mb-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-6xl text-zinc-800 mb-4 font-serif">"</div>
            <p className="text-2xl font-medium leading-relaxed mb-6">
              Avant NoShowKill, je perdais 300€ chaque vendredi. Ce mois-ci j'ai récupéré 11 tables. L'outil se rembourse en moins d'une semaine.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xl">
                M
              </div>
              <div>
                <div className="font-bold">Mohammed R.</div>
                <div className="text-sm text-zinc-400">Restaurateur à Lyon</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {[
              "6 à 10 couverts récupérés par service en moyenne",
              "90% de marge — NoShowKill se rembourse avec 4 couverts/mois",
              "10 minutes d'installation — zéro formation requise"
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="font-medium">{stat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-3xl mx-auto px-4 mb-24">
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
            
            <h2 className="text-3xl font-bold mb-2">Plan Solo</h2>
            <div className="flex justify-center items-baseline gap-1 mb-6">
              <span className="text-5xl font-extrabold">59€</span>
              <span className="text-zinc-400">/mois</span>
            </div>
            
            <ul className="space-y-4 mb-10 text-left max-w-sm mx-auto">
              {[
                "1 restaurant",
                "SMS illimités",
                "Appels automatiques",
                "Dashboard temps réel",
                "Rapport hebdomadaire"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-zinc-200">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/register" 
              className="block w-full max-w-sm mx-auto bg-white text-zinc-950 py-4 rounded-xl text-lg font-bold hover:bg-zinc-200 transition-colors mb-6 shadow-xl shadow-white/5"
            >
              Commencer gratuitement →
            </Link>
            
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm leading-relaxed max-w-md mx-auto">
              <strong>Garantie 30 jours gratuits, sans carte.</strong><br/>
              Si vous ne récupérez pas au moins 4 couverts la première semaine, on vous rembourse <em>(même si vous n'avez rien payé)</em>.
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Questions fréquentes</h2>
          <div className="space-y-6">
            {[
              {
                q: "Je dois changer mon système de réservation ?",
                a: "Non. Vous gardez TheFork, Zenchef, ou votre carnet. NoShowKill lit vos emails en arrière-plan."
              },
              {
                q: "Ça marche si je prends les réservations par téléphone ?",
                a: "Oui. Vous entrez la réservation en 30 secondes dans le dashboard et le scoring se fait automatiquement."
              },
              {
                q: "Et si je ne suis pas satisfait ?",
                a: "Annulation en 1 clic, sans préavis, sans justification. Mais vous ne partirez pas."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 text-center text-zinc-500">
        <div className="max-w-5xl mx-auto px-4">
          <div className="font-bold text-xl tracking-tight text-white mb-6">
            NoShow<span className="text-red-500">Kill</span>
          </div>
          <div className="flex justify-center gap-6 text-sm mb-8">
            <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} NoShowKill. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
