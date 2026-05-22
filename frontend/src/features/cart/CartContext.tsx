import type { PropsWithChildren } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import type { CartItem } from '../../types/customer'

type AddToCartInput = {
  restaurantId: string
  restaurantName: string
  menuItemId: string
  name: string
  unitPrice: number
}

type CartContextValue = {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
  totalItems: number
  subtotal: number
  addItem: (input: AddToCartInput) => void
  removeItem: (itemId: string) => void
  incrementQty: (itemId: string) => void
  decrementQty: (itemId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])

  const restaurantId = items.length > 0 ? items[0].restaurantId : null
  const restaurantName = items.length > 0 ? items[0].restaurantName : null

  const addItem = (input: AddToCartInput) => {
    setItems((prev) => {
      if (prev.length > 0 && prev[0].restaurantId !== input.restaurantId) {
        const shouldReplace = window.confirm(
          'Your cart has items from another restaurant. Replace cart items?',
        )
        if (!shouldReplace) {
          return prev
        }
        return [
          {
            id: `${input.restaurantId}-${input.menuItemId}`,
            restaurantId: input.restaurantId,
            restaurantName: input.restaurantName,
            menuItemId: input.menuItemId,
            name: input.name,
            unitPrice: input.unitPrice,
            quantity: 1,
          },
        ]
      }

      const existing = prev.find((item) => item.menuItemId === input.menuItemId)
      if (existing) {
        return prev.map((item) =>
          item.menuItemId === input.menuItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...prev,
        {
          id: `${input.restaurantId}-${input.menuItemId}`,
          restaurantId: input.restaurantId,
          restaurantName: input.restaurantName,
          menuItemId: input.menuItemId,
          name: input.name,
          unitPrice: input.unitPrice,
          quantity: 1,
        },
      ]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const incrementQty = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decrementQty = (itemId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setItems([])

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    )

    return {
      items,
      restaurantId,
      restaurantName,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      incrementQty,
      decrementQty,
      clearCart,
    }
  }, [items, restaurantId, restaurantName])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
