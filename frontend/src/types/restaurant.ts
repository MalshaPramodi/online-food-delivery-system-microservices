export type Address = {
  id?: number
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export type Restaurant = {
  id: number
  restaurantName: string
  restaurantCatalog: string
  address?: Address | null
}

export type FoodMenu = {
  id: number
  foodName: string
  foodDescription: string
  foodCatalog: string
  foodPrice: number | string
}

export type CreateRestaurantInput = {
  restaurantName: string
  restaurantCatalog: string
  address: Address
}
