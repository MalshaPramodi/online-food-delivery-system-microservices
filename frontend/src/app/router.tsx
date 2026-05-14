import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CustomerShell } from '../layout/CustomerShell'
import { AppShell } from '../layout/AppShell'
import { RestaurantOwnerShell } from '../layout/RestaurantOwnerShell'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CustomerOrdersPage } from '../pages/CustomerOrdersPage'
import { CustomerRestaurantsPage } from '../pages/CustomerRestaurantsPage'
import { CustomersPage } from '../pages/CustomersPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { OrdersPage } from '../pages/OrdersPage'
import { PaymentsPage } from '../pages/PaymentsPage'
import { RestaurantDetailsPage } from '../pages/RestaurantDetailsPage'
import { RestaurantOwnerDashboardPage } from '../pages/RestaurantOwnerDashboardPage'
import { RestaurantOwnerMenuPage } from '../pages/RestaurantOwnerMenuPage'
import { RestaurantOwnerOrdersPage } from '../pages/RestaurantOwnerOrdersPage'
import { RestaurantOwnerSettingsPage } from '../pages/RestaurantOwnerSettingsPage'
import { RestaurantsPage } from '../pages/RestaurantsPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<CustomerShell />}>
          <Route path="/restaurants" element={<CustomerRestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-orders" element={<CustomerOrdersPage />} />
        </Route>
        <Route path="/ops" element={<AppShell />}>
          <Route index element={<Navigate to="/ops/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>
        <Route path="/restaurant" element={<RestaurantOwnerShell />}>
          <Route index element={<Navigate to="/restaurant/dashboard" replace />} />
          <Route path="dashboard" element={<RestaurantOwnerDashboardPage />} />
          <Route path="orders" element={<RestaurantOwnerOrdersPage />} />
          <Route path="menu" element={<RestaurantOwnerMenuPage />} />
          <Route path="settings" element={<RestaurantOwnerSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
