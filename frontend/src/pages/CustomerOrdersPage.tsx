import { recentOrders } from '../mocks/customerData'

const statusStyles: Record<string, string> = {
  Preparing: 'bg-amber-100 text-amber-700',
  'On the way': 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
}

export function CustomerOrdersPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your latest deliveries and order history.
        </p>
      </div>

      <div className="space-y-3">
        {recentOrders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{order.id}</p>
                <h2 className="text-lg font-semibold text-slate-900">
                  {order.restaurantName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{order.placedAt}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">
                  ${order.total.toFixed(2)}
                </p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
