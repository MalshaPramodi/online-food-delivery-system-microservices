import { useEffect, useMemo, useState } from 'react'
import { getOrdersByRestaurant, updateOrderStatus } from '../api/orderApi'
import { useAuth } from '../features/auth/AuthContext'
import type { Order } from '../types/order'

const statusStyles: Record<string, string> = {
  CREATED: 'bg-slate-100 text-slate-700',
  PROCESSING: 'bg-amber-50 text-amber-700',
  READY: 'bg-indigo-50 text-indigo-700',
  PAID: 'bg-emerald-50 text-emerald-700',
  FINISHED: 'bg-blue-50 text-blue-700',
  CANCELLED: 'bg-rose-50 text-rose-700',
}

const actionLabels: Record<string, string> = {
  CREATED: 'Accept order',
  PROCESSING: 'Mark ready',
  PAID: 'Start preparing',
  READY: 'Complete order',
  FINISHED: 'Completed',
  CANCELLED: 'Cancelled',
}

function getNextOrderStatus(status: string) {
  if (status === 'CREATED') return 'PROCESSING'
  if (status === 'PAID') return 'PROCESSING'
  if (status === 'PROCESSING') return 'READY'
  if (status === 'READY') return 'FINISHED'

  return null
}

export function RestaurantOwnerOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!user?.restaurantId) {
      setErrorMessage('Please login as a restaurant owner to view orders.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    getOrdersByRestaurant(user.restaurantId)
      .then(setOrders)
      .catch(() => setErrorMessage('Unable to load restaurant orders.'))
      .finally(() => setIsLoading(false))
  }, [user?.restaurantId])

  const stats = useMemo(() => {
    const activeOrders = orders.filter((order) =>
      ['CREATED', 'PAID', 'PROCESSING', 'READY'].includes(order.orderStatus),
    ).length

    const preparingOrders = orders.filter(
      (order) => order.orderStatus === 'PROCESSING',
    ).length

    const completedOrders = orders.filter(
      (order) => order.orderStatus === 'FINISHED',
    ).length

    return { activeOrders, preparingOrders, completedOrders }
  }, [orders])

  const handleUpdateOrderStatus = async (order: Order) => {
    const nextStatus = getNextOrderStatus(order.orderStatus)

    if (!nextStatus) {
      return
    }

    setUpdatingOrderId(order.id)
    setErrorMessage('')

    try {
      const updatedOrder = await updateOrderStatus(order.id, nextStatus)

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder.id === updatedOrder.id ? updatedOrder : currentOrder,
        ),
      )
    } catch {
      setErrorMessage('Unable to update order status.')
    } finally {
      setUpdatingOrderId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Restaurant orders
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Orders for your restaurant loaded from the Order Service.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active orders</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.activeOrders}
          </p>
        </article>
        <article className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Preparing</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.preparingOrders}
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed today</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.completedOrders}
          </p>
        </article>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          Loading restaurant orders...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && orders.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          No restaurant orders found.
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Order #{order.id}
                  </h2>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      statusStyles[order.orderStatus] ??
                      'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  Customer #{order.userId}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {order.foodItems
                    ?.map((item) => `${item.quantity}x ${item.foodName}`)
                    .join(', ') || 'No items'}
                </p>
              </div>

              <div className="text-left lg:text-right">
                <p className="font-semibold text-slate-900">
                  Rs. {Number(order.totalPrice).toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {order.orderTime
                    ? new Date(order.orderTime).toLocaleString()
                    : 'Time unavailable'}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => handleUpdateOrderStatus(order)}
                disabled={
                  !getNextOrderStatus(order.orderStatus) || updatingOrderId === order.id
                }
                className="rounded-lg bg-[#FE5826] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E84F21] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                {updatingOrderId === order.id
                  ? 'Updating...'
                  : actionLabels[order.orderStatus] ?? 'Update order'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
