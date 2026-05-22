import { Clock3, Star, TrendingUp } from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import { ownerOrders, ownerStats, restaurantProfile } from '../mocks/restaurantOwnerData'

const statusStyles: Record<string, string> = {
  New: 'bg-orange-100 text-orange-700',
  Preparing: 'bg-amber-100 text-amber-700',
  Ready: 'bg-emerald-100 text-emerald-700',
  'Picked up': 'bg-slate-100 text-slate-700',
}

export function RestaurantOwnerDashboardPage() {
  const { user } = useAuth()
  const restaurantName = user?.restaurantName ?? restaurantProfile.name

  return (
    <section className="space-y-6">
      <article className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 sm:p-8">
            <span className="inline-flex rounded-full bg-[#E8F3D6] px-3 py-1 text-xs font-semibold text-[#476E00]">
              Restaurant owner portal
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {restaurantName}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Manage incoming orders, update your menu, and keep restaurant details ready for customers.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2">
                <Clock3 className="h-4 w-4 text-[#FE5826]" />
                {restaurantProfile.prepTime} avg prep
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {restaurantProfile.rating} rating
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                {restaurantProfile.status}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant counter"
            className="h-64 w-full object-cover lg:h-full"
          />
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ownerStats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-xs font-semibold text-[#476E00]">{stat.note}</p>
          </article>
        ))}
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Live orders</h2>
            <p className="text-sm text-slate-500">Current restaurant-side queue preview.</p>
          </div>
          <span className="rounded-full bg-[#FE5826] px-3 py-1 text-xs font-semibold text-white">
            {ownerOrders.length} active
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {ownerOrders.slice(0, 3).map((order) => (
            <div key={order.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{order.id}</p>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{order.customer}</p>
                <p className="mt-1 text-sm text-slate-500">{order.items}</p>
              </div>
              <div className="text-sm md:text-right">
                <p className="font-semibold text-slate-900">{order.total}</p>
                <p className="mt-1 text-slate-500">{order.time}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
