import { ArrowLeft, Plus, Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getRestaurant, getRestaurantMenu } from '../api/restaurantApi'
import { useCart } from '../features/cart/CartContext'

export function RestaurantDetailsPage() {
  const { id } = useParams()
  const { addItem } = useCart()
  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
  } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurant(id!),
    enabled: Boolean(id),
  })
  const { data: menu = [], isLoading: isMenuLoading } = useQuery({
    queryKey: ['restaurant-menu', id],
    queryFn: () => getRestaurantMenu(id!),
    enabled: Boolean(id),
  })

  if (isRestaurantLoading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        Loading restaurant...
      </section>
    )
  }

  if (isRestaurantError || !restaurant) {
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
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80"
          alt={restaurant.name}
          className="h-64 w-full object-cover"
        />
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {restaurant.name}
              </h1>
              <p className="mt-1 text-slate-500">
                {restaurant.cuisineType}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              4.8
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Browse the latest menu from {restaurant.name}. Orders are
            prepared by the restaurant service data stored in the backend.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              restaurant.location,
              restaurant.cuisineType,
            ]
              .filter(Boolean)
              .map((category) => (
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
        {isMenuLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
            Loading menu...
          </div>
        ) : null}
        {menu.length === 0 && !isMenuLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
            No menu items have been added for this restaurant yet.
          </div>
        ) : null}
        <div className="space-y-3">
          {menu.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.foodName}
                  </h3>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    {item.foodCategory}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{item.foodDescription}</p>
                <p className="text-sm font-semibold text-slate-900">
                  ${Number(item.foodPrice).toFixed(2)}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    restaurantId: String(restaurant.id),
                    restaurantName: restaurant.name,
                    menuItemId: String(item.id),
                    name: item.foodName,
                    unitPrice: Number(item.foodPrice),
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
