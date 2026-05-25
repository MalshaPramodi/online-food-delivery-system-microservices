export type FoodItem = {
  id?: number
  foodMenuId: number
  foodName: string
  foodPrice: number
  quantity: number
}

export type Order = {
  id: number
  userId: number
  restaurantId: number
  restaurantName: string
  orderTime: string
  orderStatus: string
  totalPrice: number
  foodItems: FoodItem[]
}