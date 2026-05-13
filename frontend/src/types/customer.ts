export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  isPopular?: boolean
  tags?: string[]
}

export type RestaurantSummary = {
  id: string
  name: string
  catalog: string
  rating: number
  deliveryTime: string
  deliveryFee: string
  heroImage: string
  shortDescription: string
}

export type RestaurantDetails = RestaurantSummary & {
  about: string
  categories: string[]
  menu: MenuItem[]
}

export type CartItem = {
  id: string
  restaurantId: string
  restaurantName: string
  menuItemId: string
  name: string
  unitPrice: number
  quantity: number
}

export type OrderPreview = {
  id: string
  restaurantName: string
  total: number
  status: 'Preparing' | 'On the way' | 'Delivered'
  placedAt: string
}
