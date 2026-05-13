import { ArrowLeft, Plus, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../features/cart/CartContext'
import { restaurants } from '../mocks/customerData'

export function RestaurantDetailsPage() {
  const { id } = useParams()
  const restaurant = restaurants.find((entry) => entry.id === id)
  const { addItem } = useCart()

  if (!restaurant) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Restaurant not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          This restaurant is unavailable at the moment.
        </p>
        <Link
          to="/restaurants"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to restaurants
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <Link
        to="/restaurants"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to restaurants
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name}
          className="h-64 w-full object-cover"
        />
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {restaurant.name}
              </h1>
              <p className="mt-1 text-slate-500">{restaurant.catalog}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {restaurant.rating}
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">{restaurant.about}</p>
          <div className="flex flex-wrap gap-2">
            {restaurant.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </article>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Menu</h2>
        <div className="space-y-3">
          {restaurant.menu.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  {item.isPopular ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-slate-600">{item.description}</p>
                <p className="text-sm font-semibold text-slate-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    menuItemId: item.id,
                    name: item.name,
                    unitPrice: item.price,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FE5826] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E84F21]"
              >
                <Plus className="h-4 w-4" />
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
