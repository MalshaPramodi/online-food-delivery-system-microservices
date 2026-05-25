import axios from 'axios'
import type { Payment } from '../types/payment'

const paymentApi = axios.create({
  baseURL: '/api',
})

export async function getPayments() {
  const response = await paymentApi.get<Payment[]>('/payment/all')
  return response.data
}

export async function getPayment(id: string | number) {
  const response = await paymentApi.get<Payment>(`/payment/${id}`)
  return response.data
}

export async function getPaymentsByOrder(orderId: string | number) {
  const response = await paymentApi.get<Payment[]>(`/payment/order/${orderId}`)
  return response.data
}