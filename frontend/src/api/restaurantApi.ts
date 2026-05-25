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
