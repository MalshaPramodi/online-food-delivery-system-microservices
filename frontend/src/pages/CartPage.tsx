import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../features/cart/CartContext'

export function CartPage() {
  const { items, subtotal, incrementQty, decrementQty, removeItem, restaurantName } =
    useCart()

  const deliveryFee = items.length > 0 ? 2.5 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add items from restaurants to continue.
        </p>
        <Link
          to="/restaurants"
          className="mt-6 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Browse restaurants
        </Link>
      </section>
    )
  }

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <article className="space-y-4 lg:col-span-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your cart</h1>
          <p className="mt-1 text-sm text-slate-500">{restaurantName}</p>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-semibold text-slate-900">{item.name}</h2>
              <p className="mt-1 text-sm text-slate-500">
                Rs. {item.unitPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => decrementQty(item.id)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                type="button"
                onClick={() => incrementQty(item.id)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="ml-2 rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </article>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Delivery</span>
            <span>Rs. {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>Rs. {tax.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="mt-5 inline-flex w-full justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Proceed to checkout
        </Link>
      </aside>
    </section>
  )
}
