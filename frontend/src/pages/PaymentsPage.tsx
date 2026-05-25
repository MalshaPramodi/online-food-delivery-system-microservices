import { useEffect, useState } from 'react'
import { getPayments } from '../api/paymentApi'
import type { Payment } from '../types/payment'

const statusStyles: Record<string, string> = {
  PAID: 'bg-emerald-50 text-emerald-700',
  CREATED: 'bg-slate-100 text-slate-700',
  PROCESSING: 'bg-amber-50 text-amber-700',
  FAILED: 'bg-rose-50 text-rose-700',
  CANCELLED: 'bg-rose-50 text-rose-700',
}

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getPayments()
      .then(setPayments)
      .catch(() => setErrorMessage('Unable to load payments.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Payment Service
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Payments
        </h1>
        <p className="mt-2 text-slate-600">
          Live payment records loaded through the API Gateway.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Payment records
          </h2>
        </div>

        {isLoading && (
          <div className="p-5 text-sm text-slate-500">Loading payments...</div>
        )}

        {errorMessage && (
          <div className="p-5 text-sm text-rose-600">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && payments.length === 0 && (
          <div className="p-5 text-sm text-slate-500">No payments found.</div>
        )}

        {!isLoading && !errorMessage && payments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-5 py-3 font-medium text-slate-700">
                      {payment.id}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {payment.orderId}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {payment.customerId}
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-900">
                      Rs. {Number(payment.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          statusStyles[payment.orderStatus] ??
                          'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {payment.orderStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {payment.paymentTime
                        ? new Date(payment.paymentTime).toLocaleString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}