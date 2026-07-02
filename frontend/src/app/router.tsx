import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CustomerShell } from '../layout/CustomerShell'
import { AppShell } from '../layout/AppShell'
import { RestaurantOwnerShell } from '../layout/RestaurantOwnerShell'
import { RequireAuth } from '../features/auth/RequireAuth'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { CheckoutCancelPage } from '../pages/CheckoutCancelPage'
import { CheckoutSuccessPage } from '../pages/CheckoutSuccessPage'
import { CustomerNotificationsPage } from '../pages/CustomerNotificationsPage'
import { CustomerOrdersPage } from '../pages/CustomerOrdersPage'
import { CustomerRestaurantsPage } from '../pages/CustomerRestaurantsPage'
import { CustomersPage } from '../pages/CustomersPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { OrdersPage } from '../pages/OrdersPage'
import { PaymentsPage } from '../pages/PaymentsPage'
import { RestaurantDetailsPage } from '../pages/RestaurantDetailsPage'
import { RestaurantOwnerDashboardPage } from '../pages/RestaurantOwnerDashboardPage'
import { RestaurantOwnerMenuPage } from '../pages/RestaurantOwnerMenuPage'
import { RestaurantOwnerOrdersPage } from '../pages/RestaurantOwnerOrdersPage'
import { RestaurantOwnerSettingsPage } from '../pages/RestaurantOwnerSettingsPage'
import { RestaurantsPage } from '../pages/RestaurantsPage'
import { SignupPage } from '../pages/SignupPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth allowedRoles={['customer']}>
              <LandingPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          element={
            <RequireAuth allowedRoles={['customer']}>
              <CustomerShell />
            </RequireAuth>
          }
        >
          <Route path="/restaurants" element={<CustomerRestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
          <Route path="/my-orders" element={<CustomerOrdersPage />} />
          <Route path="/notifications" element={<CustomerNotificationsPage />} />
        </Route>
        <Route
          path="/ops"
          element={
            <RequireAuth allowedRoles={['admin']}>
              <AppShell />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/ops/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>
        <Route
          path="/restaurant"
          element={
            <RequireAuth allowedRoles={['restaurant']}>
              <RestaurantOwnerShell />
            </RequireAuth>
          }
        >
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
