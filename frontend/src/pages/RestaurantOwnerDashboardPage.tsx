import { useEffect, useMemo, useState } from 'react'
import { getRestaurant, getRestaurantMenu } from '../api/restaurantApi'
import { getOrdersByRestaurant } from '../api/orderApi'
import { useAuth } from '../features/auth/AuthContext'
import type { FoodMenu, Restaurant } from '../types/restaurant'
import type { Order } from '../types/order'

const statusStyles: Record<string, string> = {
  CREATED: 'bg-slate-100 text-slate-700',
  PROCESSING: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  FINISHED: 'bg-blue-50 text-blue-700',
  CANCELLED: 'bg-rose-50 text-rose-700',
}

export function RestaurantOwnerDashboardPage() {
  const { user } = useAuth()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menuItems, setMenuItems] = useState<FoodMenu[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!user?.restaurantId) {
      setErrorMessage('Please login as a restaurant owner to view the dashboard.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    Promise.all([
      getRestaurant(user.restaurantId),
      getRestaurantMenu(user.restaurantId),
      getOrdersByRestaurant(user.restaurantId),
    ])
      .then(([restaurantData, menuData, orderData]) => {
        setRestaurant(restaurantData)
        setMenuItems(menuData)
        setOrders(orderData)
      })
      .catch(() => setErrorMessage('Unable to load restaurant dashboard.'))
      .finally(() => setIsLoading(false))
  }, [user?.restaurantId])

  const stats = useMemo(() => {
    const activeOrders = orders.filter((order) =>
      ['CREATED', 'PAID', 'PROCESSING', 'READY'].includes(order.orderStatus),
    ).length

    const completedOrders = orders.filter(
      (order) => order.orderStatus === 'FINISHED',
    ).length

    const revenue = orders
      .filter((order) => ['PAID', 'FINISHED'].includes(order.orderStatus))
      .reduce((sum, order) => sum + Number(order.totalPrice), 0)

    return {
      activeOrders,
      completedOrders,
      menuItems: menuItems.length,
      revenue,
    }
  }, [orders, menuItems])

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Loading restaurant dashboard...
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">
        {errorMessage}
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <article className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#FE5826]">
              Restaurant dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {restaurant?.name ?? 'Restaurant'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Manage incoming orders, menu availability, and restaurant profile
              data using live backend services.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-[#FE5826]">
                {restaurant?.cuisineType}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {restaurant?.location}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                {restaurant?.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-50 p-5">
            <p className="text-sm font-medium text-slate-600">
              Estimated paid revenue
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              Rs. {stats.revenue.toFixed(2)}
            </p>
          </div>
        </div>
      </article>

      <div className="grid gap-4 md:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active orders</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.activeOrders}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.completedOrders}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Menu items</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.menuItems}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-900">
            {restaurant?.active ? 'Open' : 'Closed'}
          </p>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent orders
            </h2>
            <p className="text-sm text-slate-500">
              Latest orders from Order Service.
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="p-5 text-sm text-slate-500">
            No orders found for this restaurant.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-slate-900">
                      Order #{order.id}
                    </p>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        statusStyles[order.orderStatus] ??
                        'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Customer #{order.userId}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {order.foodItems
                      ?.map((item) => `${item.quantity}x ${item.foodName}`)
                      .join(', ') || 'No items'}
                  </p>
                </div>
                <div className="text-sm md:text-right">
                  <p className="font-semibold text-slate-900">
                    Rs. {Number(order.totalPrice).toFixed(2)}
                  </p>
                  <p className="mt-1 text-slate-500">
                    {order.orderTime
                      ? new Date(order.orderTime).toLocaleString()
                      : 'Time unavailable'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}
