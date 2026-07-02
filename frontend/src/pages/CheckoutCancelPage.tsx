import { Link } from 'react-router-dom'

export function CheckoutCancelPage() {
  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold text-amber-700">Stripe Checkout</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        Payment was cancelled
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Your order was created, but payment was not completed. You can return to
        the cart and try again.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/cart"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Back to cart
        </Link>
        <Link
          to="/my-orders"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View orders
        </Link>
      </div>
    </section>
  )
}
