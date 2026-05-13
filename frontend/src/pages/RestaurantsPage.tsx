export function RestaurantsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Restaurants</h2>
      <p className="text-sm text-slate-500">
        Restaurant management UI (listing, create, menu operations) will be
        implemented in Step 3 using your existing APIs.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Endpoint group: <span className="font-medium">/restaurant/**</span>
      </div>
    </section>
  )
}
