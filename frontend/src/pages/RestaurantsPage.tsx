import { useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createRestaurant, getRestaurants } from '../api/restaurantApi'

export function RestaurantsPage() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    restaurantName: '',
    restaurantCatalog: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })

  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  })

  const createMutation = useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      setForm({
        restaurantName: '',
        restaurantCatalog: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      })
      queryClient.invalidateQueries({ queryKey: ['restaurants'] })
    },
  })

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createMutation.mutate({
      restaurantName: form.restaurantName,
      restaurantCatalog: form.restaurantCatalog,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
    })
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Restaurants</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage restaurants from Restaurant Service.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h3 className="text-base font-semibold text-slate-900">
          Create restaurant
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            required
            minLength={4}
            maxLength={32}
            value={form.restaurantName}
            onChange={(event) => updateField('restaurantName', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder="Restaurant name"
          />
          <input
            required
            minLength={4}
            maxLength={32}
            value={form.restaurantCatalog}
            onChange={(event) =>
              updateField('restaurantCatalog', event.target.value)
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder="Restaurant catalog"
          />
          <input
            value={form.street}
            onChange={(event) => updateField('street', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder="Street"
          />
          <input
            value={form.city}
            onChange={(event) => updateField('city', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder="City"
          />
          <input
            value={form.state}
            onChange={(event) => updateField('state', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder="State"
          />
          <input
            value={form.zip}
            onChange={(event) => updateField('zip', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            placeholder="Zip"
          />
          <input
            value={form.country}
            onChange={(event) => updateField('country', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2 md:col-span-2"
            placeholder="Country"
          />
        </div>
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {createMutation.isPending ? 'Creating...' : 'Create restaurant'}
        </button>
        {createMutation.isError ? (
          <p className="mt-3 text-sm text-rose-600">
            Failed to create restaurant. Check service validation and server logs.
          </p>
        ) : null}
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-base font-semibold text-slate-900">
            Restaurant list
          </h3>
        </div>
        {isLoading ? (
          <p className="p-5 text-sm text-slate-500">Loading restaurants...</p>
        ) : null}
        {isError ? (
          <p className="p-5 text-sm text-rose-600">
            Unable to load restaurants from port 9002.
          </p>
        ) : null}
        <div className="divide-y divide-slate-100">
          {restaurants.map((restaurant) => (
            <article
              key={restaurant.id}
              className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h4 className="font-semibold text-slate-900">
                  {restaurant.restaurantName}
                </h4>
                <p className="text-sm text-slate-500">
                  {restaurant.restaurantCatalog}
                </p>
              </div>
              <p className="text-sm text-slate-500">
                {[restaurant.address?.city, restaurant.address?.country]
                  .filter(Boolean)
                  .join(', ') || 'Address not added'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
