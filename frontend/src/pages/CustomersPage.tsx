import { useEffect, useState } from 'react'
import { getCustomers } from '../api/customerApi'
import type { Customer } from '../types/customer'

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(() => setErrorMessage('Unable to load customers.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Customer Service
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Customers
        </h1>
        <p className="mt-2 text-slate-600">
          Live customer profiles loaded through the API Gateway.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Customer records
          </h2>
        </div>

        {isLoading && (
          <div className="p-5 text-sm text-slate-500">Loading customers...</div>
        )}

        {errorMessage && (
          <div className="p-5 text-sm text-rose-600">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && customers.length === 0 && (
          <div className="p-5 text-sm text-slate-500">
            No customers found.
          </div>
        )}

        {!isLoading && !errorMessage && customers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-5 py-3 font-medium text-slate-700">
                      {customer.id}
                    </td>
                    <td className="px-5 py-3 text-slate-700">
                      {customer.fullName}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {customer.email}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {customer.phone}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          customer.active
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {customer.active ? 'Active' : 'Inactive'}
                      </span>
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