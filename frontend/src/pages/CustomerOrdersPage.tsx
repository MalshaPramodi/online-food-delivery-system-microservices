import { useEffect, useState } from 'react'
import { getOrdersByCustomer } from '../api/orderApi'
import { useAuth } from '../features/auth/AuthContext'
import type { Order } from '../types/order'

const statusStyles: Record<string, string> = {
  CREATED: 'bg-slate-100 text-slate-700',
  PROCESSING: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  FINISHED: 'bg-blue-50 text-blue-700',
  CANCELLED: 'bg-rose-50 text-rose-700',
}

export function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useAuth()

useEffect(() => {
  if (!user?.id) {
    setErrorMessage('Please login as a customer to view your orders.')
    setIsLoading(false)
    return
  }

  setIsLoading(true)
  setErrorMessage('')

  getOrdersByCustomer(user.id)
    .then(setOrders)
    .catch(() => setErrorMessage('Unable to load your orders.'))
    .finally(() => setIsLoading(false))
}, [user?.id])

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          My orders
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Track your order history loaded from the Order Service.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          Loading orders...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && orders.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          No orders found.
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Order #{order.id}</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  {order.restaurantName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {order.orderTime
                    ? new Date(order.orderTime).toLocaleString()
                    : 'Time unavailable'}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-lg font-semibold text-slate-900">
                  Rs. {Number(order.totalPrice).toFixed(2)}
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    statusStyles[order.orderStatus] ??
                    'bg-slate-100 text-slate-700'
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="text-sm font-medium text-slate-700">Items</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {order.foodItems?.map((item) => (
                  <li key={`${order.id}-${item.foodMenuId}`}>
                    {item.quantity} x {item.foodName} - Rs.{' '}
                    {Number(item.foodPrice).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}