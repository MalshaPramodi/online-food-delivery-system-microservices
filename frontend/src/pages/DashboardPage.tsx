const stats = [
  { label: 'Active Restaurants', value: '42', trend: '+6.3%' },
  { label: 'Customers', value: '1,284', trend: '+12.4%' },
  { label: 'Orders Today', value: '316', trend: '+9.1%' },
  { label: 'Payments Settled', value: '289', trend: '+7.8%' },
]

export function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Real-time operational overview for your delivery platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-medium text-emerald-600">
              {stat.trend} this week
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="text-base font-semibold text-slate-900">Recent Orders</h3>
          <div className="mt-4 space-y-3">
            {['#ORD-1042', '#ORD-1041', '#ORD-1040', '#ORD-1039'].map((id) => (
              <div
                key={id}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
              >
                <span className="font-medium text-slate-700">{id}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Health Check</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              'Gateway connected',
              'Order service healthy',
              'Payment service healthy',
              'Discovery server healthy',
            ].map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
