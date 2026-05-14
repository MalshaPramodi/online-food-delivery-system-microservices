import { Plus, Search } from 'lucide-react'
import { ownerMenuItems } from '../mocks/restaurantOwnerData'

const statusStyles: Record<string, string> = {
  Available: 'bg-emerald-100 text-emerald-700',
  'Low stock': 'bg-amber-100 text-amber-700',
  Unavailable: 'bg-slate-100 text-slate-700',
}

export function RestaurantOwnerMenuPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Menu management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Restaurant owners can add, edit, and pause menu items here.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FE5826] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E84F21]"
        >
          <Plus className="h-4 w-4" />
          Add item
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search menu items"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ownerMenuItems.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.category}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-sm text-slate-500">Price</p>
                <p className="font-semibold text-slate-900">{item.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Today orders</p>
                <p className="font-semibold text-slate-900">{item.orders}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Edit
              </button>
              <button type="button" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Toggle status
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
