import { useEffect, useState } from 'react'
import { getOrders } from '../api/orderApi'
import type { Order } from '../types/order'

const statusStyles: Record<string, string> = {
  CREATED: 'bg-slate-100 text-slate-700',
  PROCESSING: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  FINISHED: 'bg-blue-50 text-blue-700',
  CANCELLED: 'bg-rose-50 text-rose-700',
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setErrorMessage('Unable to load orders.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Order Service
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Orders
        </h1>
        <p className="mt-2 text-slate-600">
          Live order records loaded through the API Gateway.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Order records
          </h2>
        </div>

        {isLoading && (
          <div className="p-5 text-sm text-slate-500">Loading orders...</div>
        )}

        {errorMessage && (
          <div className="p-5 text-sm text-rose-600">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && orders.length === 0 && (
          <div className="p-5 text-sm text-slate-500">No orders found.</div>
        )}

        {!isLoading && !errorMessage && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Restaurant</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-3 font-medium text-slate-700">
                      {order.id}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {order.userId}
                    </td>
                    <td className="px-5 py-3 text-slate-700">
                      {order.restaurantName}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {order.foodItems?.length ?? 0}
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-900">
                      Rs. {Number(order.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          statusStyles[order.orderStatus] ??
                          'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}