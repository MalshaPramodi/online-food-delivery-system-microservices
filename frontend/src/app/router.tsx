import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CustomerShell } from '../layout/CustomerShell'
import { AppShell } from '../layout/AppShell'
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
      </Routes>
    </BrowserRouter>
  )
}
