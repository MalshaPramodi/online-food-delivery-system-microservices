import axios from 'axios'
import type {
  CreateRestaurantInput,
  FoodMenu,
  Restaurant,
} from '../types/restaurant'

const restaurantApi = axios.create({
  baseURL: '/restaurant-api',
})

export async function getRestaurants() {
  const response = await restaurantApi.get<Restaurant[]>('/restaurant/all')
  return response.data
}

export async function getRestaurant(id: string | number) {
  const response = await restaurantApi.get<Restaurant>(`/restaurant/${id}`)
  return response.data
}

export async function getRestaurantMenu(id: string | number) {
  const response = await restaurantApi.get<FoodMenu[]>(`/restaurant/${id}/menu`)
  return response.data
}

export async function createRestaurant(input: CreateRestaurantInput) {
  const response = await restaurantApi.post<number>('/restaurant/create', input)
  return response.data
}
