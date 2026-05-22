import { LogOut, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import { useCart } from '../features/cart/CartContext'

export function CustomerShell() {
  const { totalItems } = useCart()
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-lg bg-brand-500 p-2 text-white">
              <UtensilsCrossed className="h-4 w-4" />
            </span>
            Online Food Delivery
          </NavLink>

          <nav className="flex items-center gap-2 sm:gap-3">
            <NavLink
              to="/restaurants"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-100 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Restaurants
            </NavLink>
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-100 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/cart"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart ({totalItems})
            </NavLink>
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
