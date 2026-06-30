import { CreditCard, RefreshCw, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getCustomerNotifications } from '../api/notificationApi'
import { useAuth } from '../features/auth/AuthContext'
import type { CustomerNotification } from '../types/notification'

const typeStyles: Record<string, string> = {
  ORDER_CREATED: 'bg-blue-50 text-blue-700',
  PAYMENT_COMPLETED: 'bg-emerald-50 text-emerald-700',
}

function getNotificationIcon(type: string) {
  if (type === 'PAYMENT_COMPLETED') {
    return <CreditCard className="h-5 w-5" />
  }

  return <ShoppingBag className="h-5 w-5" />
}

export function CustomerNotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<CustomerNotification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.sent).length,
    [notifications],
  )

  const loadNotifications = () => {
    if (!user?.id) {
      setErrorMessage('Please login as a customer to view notifications.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    getCustomerNotifications(user.id)
      .then((items) =>
        setNotifications(
          [...items].sort(
            (first, second) =>
              new Date(second.createdAt).getTime() -
              new Date(first.createdAt).getTime(),
          ),
        ),
      )
      .catch(() => setErrorMessage('Unable to load notifications.'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadNotifications()
  }, [user?.id])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Notifications
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Kafka events consumed by the Notification Service for your orders.
          </p>
        </div>

        <button
          type="button"
          onClick={loadNotifications}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-100"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {notifications.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Unread</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{unreadCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Source</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            Kafka topics
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          Loading notifications...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && notifications.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          No notifications found yet.
        </div>
      )}

      <div className="space-y-4">
        {notifications.map((notification) => (
          <article
            key={notification.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        typeStyles[notification.type] ??
                        'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {notification.type}
                    </span>
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {notification.channel}
                    </span>
                    {notification.sent ? (
                      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                        Sent
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-900">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Order #{notification.orderId ?? 'N/A'} -{' '}
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
