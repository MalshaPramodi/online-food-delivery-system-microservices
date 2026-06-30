import axios from 'axios'
import type { Order } from '../types/order'

const orderApi = axios.create({
  baseURL: '/api',
})

export async function getOrders() {
  const response = await orderApi.get<Order[]>('/order')
  return response.data
}

export async function getOrder(id: string | number) {
  const response = await orderApi.get<Order>(`/order/${id}`)
  return response.data
}

export async function getOrdersByCustomer(userId: string | number) {
  const response = await orderApi.get<Order[]>(`/order/user/${userId}`)
  return response.data
}

export async function getOrdersByRestaurant(restaurantId: string | number) {
  const response = await orderApi.get<Order[]>(
    `/order/restaurant-orders/${restaurantId}`,
  )
  return response.data
}

export type CreateOrderInput = {
  userId: number
  restaurantId: number
  restaurantName: string
  totalPrice: number
  foodItems: {
    foodMenuId: number
    foodName: string
    foodPrice: number
    quantity: number
  }[]
}

export type OrderStatus = 'CREATED' | 'PAID' | 'PROCESSING'
  | 'READY'| 'CANCELLED' | 'FINISHED'

export async function createOrder(input: CreateOrderInput) {
  const response = await orderApi.post<string>('/order/create', input)
  return response.data
}

export async function updateOrderStatus(
  orderId: string | number,
  status: OrderStatus,
) {
  const response = await orderApi.put<Order>(`/order/${orderId}/status`, {
    status,
  })
  return response.data
}