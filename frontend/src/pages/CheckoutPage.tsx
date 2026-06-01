import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../features/cart/CartContext'
import { createOrder } from '../api/orderApi'
import { useAuth } from '../features/auth/AuthContext'

export function CheckoutPage() {
  const { items, subtotal, restaurantId, restaurantName, clearCart } = useCart()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const deliveryFee = items.length > 0 ? 2.5 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax
  const { user } = useAuth()

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">No items to checkout</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add at least one item before checkout.
        </p>
      </section>
    )
  }

  const handlePlaceOrder = async () => {
    if (!restaurantId || !restaurantName) {
    setErrorMessage('Cart does not contain restaurant information.')
    return
    }
    if (!user?.id) {
  setErrorMessage('Please login as a customer before placing an order.')
  return
   }

  setIsSubmitting(true)
  setErrorMessage('')

  try {
    await createOrder({
      userId: user.id,
      restaurantId: Number(restaurantId),
      restaurantName,
      totalPrice: Number(total.toFixed(2)),
      foodItems: items.map((item) => ({
        foodMenuId: Number(item.menuItemId),
        foodName: item.name,
        foodPrice: Number(item.unitPrice),
        quantity: item.quantity,
      })),
    })

    clearCart()
    navigate('/my-orders')
  } catch {
    setErrorMessage('Unable to place order. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <article className="space-y-4 lg:col-span-2">
        <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Delivery details</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="Full name"
            />
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="Phone number"
            />
            <input
              className="sm:col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="Street address"
            />
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="City"
            />
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="Zip code"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Payment method</h2>
          <div className="mt-4 grid gap-3">
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="Card holder name"
            />
            <input
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
              placeholder="Card number"
            />
          </div>
        </div>
      </article>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Payment summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        {errorMessage && (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errorMessage}
            </p>
        )}
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="mt-5 w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Placing order...' : 'Place order'}
        </button>
      </aside>
    </section>
  )
}
