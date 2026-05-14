import { CheckCircle2, Clock3, PackageCheck } from 'lucide-react'
import { ownerOrders } from '../mocks/restaurantOwnerData'

const actionLabels: Record<string, string> = {
  New: 'Accept order',
  Preparing: 'Mark ready',
  Ready: 'Hand to rider',
  'Picked up': 'View details',
}

const statusStyles: Record<string, string> = {
  New: 'bg-orange-100 text-orange-700',
  Preparing: 'bg-amber-100 text-amber-700',
  Ready: 'bg-emerald-100 text-emerald-700',
  'Picked up': 'bg-slate-100 text-slate-700',
}

export function RestaurantOwnerOrdersPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Restaurant orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          Confirm, prepare, and complete orders from one restaurant-side queue.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <Clock3 className="h-5 w-5 text-[#FE5826]" />
          <p className="mt-3 text-2xl font-bold text-slate-900">6</p>
          <p className="text-sm text-slate-500">Waiting confirmation</p>
        </article>
        <article className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <PackageCheck className="h-5 w-5 text-amber-600" />
          <p className="mt-3 text-2xl font-bold text-slate-900">9</p>
          <p className="text-sm text-slate-500">Being prepared</p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p className="mt-3 text-2xl font-bold text-slate-900">3</p>
          <p className="text-sm text-slate-500">Ready for pickup</p>
        </article>
      </div>

      <div className="space-y-3">
        {ownerOrders.map((order) => (
          <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">{order.id}</h2>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-700">{order.customer}</p>
                <p className="mt-1 text-sm text-slate-500">{order.items}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <div className="text-sm lg:text-right">
                  <p className="font-semibold text-slate-900">{order.total}</p>
                  <p className="text-slate-500">{order.time}</p>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-[#476E00] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  {actionLabels[order.status]}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
