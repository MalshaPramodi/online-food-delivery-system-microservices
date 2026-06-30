import { useEffect, useState } from 'react'
import { getRestaurant, updateRestaurant } from '../api/restaurantApi'
import { useAuth } from '../features/auth/AuthContext'

export function RestaurantOwnerSettingsPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: '',
    location: '',
    cuisineType: '',
    active: true,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!user?.restaurantId) {
      setErrorMessage('Please login as a restaurant owner to edit settings.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    getRestaurant(user.restaurantId)
      .then((restaurant) => {
        setForm({
          name: restaurant.name,
          location: restaurant.location,
          cuisineType: restaurant.cuisineType,
          active: restaurant.active,
        })
      })
      .catch(() => setErrorMessage('Unable to load restaurant settings.'))
      .finally(() => setIsLoading(false))
  }, [user?.restaurantId])

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')
    setErrorMessage('')

    try {
      if (!user?.restaurantId) {
        throw new Error('Missing restaurant id')
      }

      await updateRestaurant(user.restaurantId, form)
      setMessage('Restaurant settings updated successfully.')
    } catch {
      setErrorMessage('Unable to update restaurant settings.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
        Loading restaurant settings...
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Restaurant settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Update restaurant profile details stored in Restaurant Service.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Restaurant name
            <input
              required
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Cuisine type
            <input
              required
              value={form.cuisineType}
              onChange={(event) =>
                updateField('cuisineType', event.target.value)
              }
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Location
            <input
              required
              value={form.location}
              onChange={(event) => updateField('location', event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            />
          </label>

          <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => updateField('active', event.target.checked)}
            />
            Restaurant is active
          </label>
        </div>

        {message && (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </p>
        )}

        {errorMessage && (
          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="mt-5 rounded-lg bg-[#FE5826] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E84F21] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? 'Saving...' : 'Save settings'}
        </button>
      </form>
    </section>
  )
}
