import { restaurantProfile } from '../mocks/restaurantOwnerData'

export function RestaurantOwnerSettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Restaurant profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Preview of the restaurant-side profile settings screen.
        </p>
      </div>

      <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Restaurant name</span>
            <input
              defaultValue={restaurantProfile.name}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Cuisine / catalog</span>
            <input
              defaultValue={restaurantProfile.catalog}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Location</span>
            <input
              defaultValue={restaurantProfile.location}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Opening status</span>
            <select
              defaultValue={restaurantProfile.status}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            >
              <option>Open</option>
              <option>Paused</option>
              <option>Closed</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Average prep time</span>
            <input
              defaultValue={restaurantProfile.prepTime}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>
        </div>
        <button
          type="button"
          className="mt-5 rounded-lg bg-[#476E00] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Save preview
        </button>
      </form>
    </section>
  )
}
