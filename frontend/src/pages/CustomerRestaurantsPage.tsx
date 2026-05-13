import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { restaurants } from '../mocks/customerData'

export function CustomerRestaurantsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Discover great restaurants
        </h1>
        <p className="text-sm text-slate-500 sm:text-base">
          Curated picks, trending menus, and quick delivery near you.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {restaurants.map((restaurant) => (
          <article
            key={restaurant.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img
              src={restaurant.heroImage}
              alt={restaurant.name}
              className="h-44 w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {restaurant.name}
                  </h2>
                  <p className="text-sm text-slate-500">{restaurant.catalog}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {restaurant.rating}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                {restaurant.shortDescription}
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>{restaurant.deliveryTime}</span>
                <span>Delivery {restaurant.deliveryFee}</span>
              </div>
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-[#FE5826] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E84F21]"
              >
                View menu
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
