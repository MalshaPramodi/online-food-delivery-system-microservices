import {
  LayoutDashboard,
  LogOut,
  Store,
  Users,
  ShoppingBag,
  WalletCards,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'

type NavItem = {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { to: '/ops/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ops/restaurants', label: 'Restaurants', icon: Store },
  { to: '/ops/customers', label: 'Customers', icon: Users },
  { to: '/ops/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/ops/payments', label: 'Payments', icon: WalletCards },
]

const activeLinkClasses =
  'bg-brand-600 text-white shadow-md shadow-brand-600/25 hover:bg-brand-600'
const idleLinkClasses = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'

export function AppShell() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white p-4 lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-100">
              Online Food Delivery
            </p>
            <h1 className="mt-2 text-2xl font-bold">Ops Console</h1>
            <p className="mt-2 text-sm text-brand-100">
              Manage restaurants, customers, orders, and payments.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? activeLinkClasses : idleLinkClasses
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Operations panel
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  Food Delivery Management
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:block">
                  {user?.name ?? 'Admin'}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
