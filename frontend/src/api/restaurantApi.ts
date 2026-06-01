import axios from 'axios'
import type {
  CreateRestaurantInput,
  FoodMenu,
  Restaurant,
} from '../types/restaurant'

const restaurantApi = axios.create({
  baseURL: '/api',
})

export async function getRestaurants() {
  const response = await restaurantApi.get<Restaurant[]>('/restaurants')
  return response.data
}

export async function getRestaurant(id: string | number) {
  const response = await restaurantApi.get<Restaurant>(`/restaurants/${id}`)
  return response.data
}

export async function getRestaurantMenu(id: string | number) {
  const response = await restaurantApi.get<FoodMenu[]>(`/restaurants/${id}/menus`)
  return response.data
}

export async function createRestaurant(input: CreateRestaurantInput) {
  const response = await restaurantApi.post<Restaurant>('/restaurants', input)
  return response.data
}

export type CreateFoodMenuInput = {
  foodName: string
  foodDescription: string
  foodCategory: string
  foodPrice: number
  available: boolean
}

export async function createFoodMenu(
  restaurantId: string | number,
  input: CreateFoodMenuInput,
) {
  const response = await restaurantApi.post<FoodMenu>(
    `/restaurants/${restaurantId}/menus`,
    input,
  )
  return response.data
}

export async function updateFoodMenu(
  menuId: string | number,
  input: CreateFoodMenuInput,
) {
  const response = await restaurantApi.put<FoodMenu>(
    `/restaurants/menus/${menuId}`,
    input,
  )
  return response.data
}

export async function deleteFoodMenu(menuId: string | number) {
  await restaurantApi.delete(`/restaurants/menus/${menuId}`)
}

export async function updateRestaurant(
  id: string | number,
  input: CreateRestaurantInput,
) {
  const response = await restaurantApi.put<Restaurant>(`/restaurants/${id}`, input)
  return response.data
}