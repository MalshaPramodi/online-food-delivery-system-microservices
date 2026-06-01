import { useEffect, useState } from 'react'
import {
  createFoodMenu,
  deleteFoodMenu,
  getRestaurantMenu,
  updateFoodMenu,
} from '../api/restaurantApi'
import type { FoodMenu } from '../types/restaurant'

type MenuForm = {
  foodName: string
  foodDescription: string
  foodCategory: string
  foodPrice: string
  available: boolean
}

const emptyForm: MenuForm = {
  foodName: '',
  foodDescription: '',
  foodCategory: '',
  foodPrice: '',
  available: true,
}

export function RestaurantOwnerMenuPage() {
  const restaurantId = 1
  const [menuItems, setMenuItems] = useState<FoodMenu[]>([])
  const [form, setForm] = useState<MenuForm>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loadMenu = () => {
    setIsLoading(true)
    getRestaurantMenu(restaurantId)
      .then(setMenuItems)
      .catch(() => setErrorMessage('Unable to load menu items.'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadMenu()
  }, [])

  const updateField = (field: keyof MenuForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleEdit = (item: FoodMenu) => {
    setEditingId(item.id)
    setForm({
      foodName: item.foodName,
      foodDescription: item.foodDescription,
      foodCategory: item.foodCategory,
      foodPrice: String(item.foodPrice),
      available: item.available,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    const payload = {
      foodName: form.foodName,
      foodDescription: form.foodDescription,
      foodCategory: form.foodCategory,
      foodPrice: Number(form.foodPrice),
      available: form.available,
    }

    try {
      if (editingId) {
        await updateFoodMenu(editingId, payload)
      } else {
        await createFoodMenu(restaurantId, payload)
      }

      resetForm()
      loadMenu()
    } catch {
      setErrorMessage('Unable to save menu item.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (menuId: number) => {
    const confirmed = window.confirm('Delete this menu item?')
    if (!confirmed) return

    try {
      await deleteFoodMenu(menuId)
      setMenuItems((current) => current.filter((item) => item.id !== menuId))
    } catch {
      setErrorMessage('Unable to delete menu item.')
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Menu management
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage restaurant menu items loaded from Restaurant Service.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900">
          {editingId ? 'Update menu item' : 'Add menu item'}
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            required
            value={form.foodName}
            onChange={(event) => updateField('foodName', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            placeholder="Food name"
          />
          <input
            required
            value={form.foodCategory}
            onChange={(event) =>
              updateField('foodCategory', event.target.value)
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            placeholder="Food category"
          />
          <input
            required
            type="number"
            min="1"
            value={form.foodPrice}
            onChange={(event) => updateField('foodPrice', event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2"
            placeholder="Food price"
          />
          <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(event) =>
                updateField('available', event.target.checked)
              }
            />
            Available
          </label>
          <textarea
            required
            value={form.foodDescription}
            onChange={(event) =>
              updateField('foodDescription', event.target.value)
            }
            className="min-h-24 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-[#FE5826] focus:ring-2 md:col-span-2"
            placeholder="Food description"
          />
        </div>

        {errorMessage && (
          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errorMessage}
          </p>
        )}

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-[#FE5826] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#E84F21] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving
              ? 'Saving...'
              : editingId
                ? 'Update item'
                : 'Add item'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          Loading menu items...
        </div>
      )}

      {!isLoading && menuItems.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
          No menu items found.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {menuItems.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {item.foodName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {item.foodCategory}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  item.available
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.available ? 'Available' : 'Hidden'}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {item.foodDescription}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-lg font-semibold text-slate-900">
                Rs. {Number(item.foodPrice).toFixed(2)}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}