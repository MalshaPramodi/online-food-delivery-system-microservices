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
  name: string
  location: string
  cuisineType: string
  active: boolean
}

export type FoodMenu = {
  id: number
  foodName: string
  foodDescription: string
  foodCategory: string
  foodPrice: number | string
  available: boolean
}

export type CreateRestaurantInput = {
  name: string
  location: string
  cuisineType: string
  active: boolean
}
