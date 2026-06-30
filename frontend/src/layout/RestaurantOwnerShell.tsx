import {
  BarChart3,
  ClipboardList,
  LogOut,
  MenuSquare,
  Settings,
  UtensilsCrossed,
} from 'lucide-react'
import { useEffect, useState, type ComponentType } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getRestaurant } from '../api/restaurantApi'
import { useAuth } from '../features/auth/AuthContext'
import type { Restaurant } from '../types/restaurant'

type OwnerNavItem = {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
}

const ownerNavItems: OwnerNavItem[] = [
  { to: '/restaurant/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/restaurant/orders', label: 'Orders', icon: ClipboardList },
  { to: '/restaurant/menu', label: 'Menu', icon: MenuSquare },
  { to: '/restaurant/settings', label: 'Settings', icon: Settings },
]

export function RestaurantOwnerShell() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  useEffect(() => {
    if (!user?.restaurantId) {
      setRestaurant(null)
      return
    }

    getRestaurant(user.restaurantId)
      .then(setRestaurant)
      .catch(() => setRestaurant(null))
  }, [user?.restaurantId])

  const restaurantName =
    restaurant?.name ?? user?.restaurantName ?? 'Restaurant'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <NavLink to="/" className="flex items-center gap-2 text-sm font-semibold">
              <span className="rounded-lg bg-[#FE5826] p-2 text-white">
                <UtensilsCrossed className="h-4 w-4" />
              </span>
              Online Food Delivery
            </NavLink>

            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-sm font-medium text-slate-700 sm:inline-flex">
                {restaurantName}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-1">
            {ownerNavItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[#476E00] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-orange-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
