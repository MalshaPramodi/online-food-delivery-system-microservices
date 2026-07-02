import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { confirmStripeCheckoutSession } from '../api/paymentApi'
import { useCart } from '../features/cart/CartContext'

export function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Confirming Stripe payment...')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      setStatus('error')
      setMessage('Stripe session id is missing.')
      return
    }

    confirmStripeCheckoutSession(sessionId)
      .then(() => {
        clearCart()
        setStatus('success')
        setMessage('Payment completed successfully.')
      })
      .catch(() => {
        setStatus('error')
        setMessage('Unable to confirm Stripe payment.')
      })
  }, [clearCart, searchParams])

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p
        className={`text-sm font-semibold ${
          status === 'success'
            ? 'text-emerald-700'
            : status === 'error'
              ? 'text-rose-700'
              : 'text-slate-500'
        }`}
      >
        {status === 'loading'
          ? 'Stripe Checkout'
          : status === 'success'
            ? 'Payment confirmed'
            : 'Payment confirmation failed'}
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">{message}</h1>
      <p className="mt-3 text-sm text-slate-500">
        Successful payments are stored by Payment Service, the order is marked
        as paid, and the notification event is published through Kafka.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/my-orders"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          View orders
        </Link>
        <Link
          to="/notifications"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View notifications
        </Link>
      </div>
    </section>
  )
}
