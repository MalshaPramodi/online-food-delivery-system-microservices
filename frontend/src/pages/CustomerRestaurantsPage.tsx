import { Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getRestaurants } from '../api/restaurantApi'

const restaurantImages = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
]

export function CustomerRestaurantsPage() {
  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  })

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

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Loading restaurants...
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-sm text-rose-700 shadow-sm">
          Unable to load restaurants. Please check that Restaurant Service is
          running on port 9002.
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {restaurants.map((restaurant, index) => (
          <article
            key={restaurant.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img
              src={restaurantImages[index % restaurantImages.length]}
              alt={restaurant.name}
              className="h-44 w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {restaurant.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {restaurant.cuisineType ?? 'Restaurant'}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  4.{7 + (index % 2)}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Fresh meals from {restaurant.name}, available for fast
                delivery.
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>{restaurant.location}</span>
                <span>{restaurant.active ? 'Open now' : 'Unavailable'}</span>
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
