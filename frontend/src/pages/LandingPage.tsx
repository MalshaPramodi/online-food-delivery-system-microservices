import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Lightning fast delivery',
    description: 'Hot meals at your doorstep in under 30 minutes in major zones.',
    icon: Clock3,
    cardStyle: 'bg-[#FE5826] border-[#040409]',
    iconStyle: 'bg-white text-[#FE5826]',
  },
  {
    title: 'Live order tracking',
    description: 'Track each stage from kitchen confirmation to rider drop-off.',
    icon: MapPin,
    cardStyle: 'bg-[#E8F3D6] border-[#476E00]',
    iconStyle: 'bg-white text-[#476E00]',
  },
  {
    title: 'Secure checkout',
    description: 'Reliable payment processing with protected transaction flows.',
    icon: ShieldCheck,
    cardStyle: 'bg-white border-[#040409]',
    iconStyle: 'bg-[#040409] text-white',
  },
]

const foodShowcase = [
  {
    title: 'Flame Grill Burger',
    subtitle: 'Urban Spice Kitchen',
    image:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Neapolitan Pizza',
    subtitle: 'Napoli Byte Pizza',
    image:
      'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Fresh Healthy Bowl',
    subtitle: 'Green Fork House',
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
  },
]

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFF5E9] to-[#EEF7E6] text-[#040409]">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#FE5826]/30 blur-3xl" />
        <div className="animate-blob animate-blob-delay-1 absolute right-0 top-28 h-96 w-96 rounded-full bg-[#476E00]/25 blur-3xl" />
        <div className="animate-blob animate-blob-delay-2 absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#040409]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.25),transparent_35%)]" />
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <header className="relative z-10 flex items-center justify-between rounded-2xl border border-[#040409]/20 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-r from-[#FE5826] via-[#476E00] to-[#040409] p-2">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-wide">
              Online Food Delivery
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="http://localhost:9000"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 sm:text-sm"
            >
              API Gateway
            </a>
            <Link
              to="/ops/dashboard"
              className="rounded-lg bg-[#476E00] px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110 sm:text-sm"
            >
              Open Ops Panel
            </Link>
          </div>
        </header>

        <section className="relative z-10 mt-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center rounded-full border border-[#476E00] bg-[#EEF7E6] px-3 py-1 text-xs font-medium text-[#476E00]">
              Loved by 10,000+ hungry customers
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Delicious food,{' '}
              <span className="bg-gradient-to-r from-[#FE5826] via-[#476E00] to-[#040409] bg-clip-text text-transparent">
                delivered smart
              </span>{' '}
              and fast.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover top-rated restaurants, place orders in seconds, and track every
              step in real-time with a modern delivery experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#FE5826]" />
                30 min average delivery
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#476E00]" />
                Live rider tracking
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#040409]" />
                Secure payments
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 rounded-xl bg-[#476E00] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#476E00]/35 transition hover:brightness-110"
              >
                Explore Restaurants <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 rounded-xl border border-[#476E00] bg-white px-5 py-3 text-sm font-semibold text-[#476E00] transition hover:bg-[#EEF7E6]"
              >
                Start Ordering
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 overflow-hidden rounded-2xl border border-[#040409]/20 bg-white shadow-md ring-1 ring-[#FE5826]/20">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Food platter"
                className="h-56 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#040409]/20 bg-white shadow-md ring-1 ring-[#476E00]/20">
              <img
                src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Pizza slices"
                className="h-44 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#040409]/20 bg-white shadow-md ring-1 ring-[#040409]/20">
              <img
                src="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Burger combo"
                className="h-44 w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-12 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className={`rounded-2xl border p-5 shadow-sm ${item.cardStyle}`}
              >
                <div className={`mb-4 inline-flex rounded-lg p-2 ${item.iconStyle}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#040409]/85">
                  {item.description}
                </p>
              </article>
            )
          })}
        </section>

        <section className="relative z-10 mt-12">
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Popular picks today
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {foodShowcase.map((food) => (
              <article
                key={food.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <img src={food.image} alt={food.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-base font-semibold text-slate-900">{food.title}</h4>
                  <p className="mt-1 text-sm text-slate-700">{food.subtitle}</p>
                  <span className="mt-3 inline-flex rounded-full bg-[#E8F3D6] px-2 py-1 text-xs font-semibold text-[#476E00]">
                    Trending
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mt-12 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#040409] bg-[#FE5826] p-5 shadow-sm">
            <Bike className="h-5 w-5 text-white" />
            <h4 className="mt-3 font-semibold text-slate-900">1. Choose your meal</h4>
            <p className="mt-2 text-sm text-slate-800">
              Browse restaurants and add your favorite dishes to cart.
            </p>
          </article>
          <article className="rounded-2xl border border-[#476E00] bg-[#E8F3D6] p-5 shadow-sm">
            <MapPin className="h-5 w-5 text-[#476E00]" />
            <h4 className="mt-3 font-semibold text-slate-900">2. Confirm address</h4>
            <p className="mt-2 text-sm text-slate-800">
              Secure checkout with clear delivery ETA and live tracking.
            </p>
          </article>
          <article className="rounded-2xl border border-[#040409] bg-white p-5 shadow-sm">
            <Clock3 className="h-5 w-5 text-[#040409]" />
            <h4 className="mt-3 font-semibold text-slate-900">3. Enjoy in minutes</h4>
            <p className="mt-2 text-sm text-slate-800">
              Get updates from kitchen to doorstep with reliable status alerts.
            </p>
          </article>
        </section>

        <section className="relative z-10 mt-12 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h3 className="text-2xl font-semibold text-slate-900">
            Hungry? Your next meal is a few taps away.
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-800 sm:text-base">
            Explore restaurant menus, customize your favorites, and place your
            order with confidence through a fast and friendly experience.
          </p>
          <div className="mt-6">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 rounded-xl bg-[#476E00] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#476E00]/35 transition hover:brightness-110"
            >
              Start Your Order <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
