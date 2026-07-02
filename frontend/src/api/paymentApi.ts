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

export type StripeCheckoutSessionInput = {
  orderId: number
  customerId: number
  totalPrice: number
  customerEmail?: string
}

export type StripeCheckoutSessionResponse = {
  sessionId: string
  url: string
}

export async function createStripeCheckoutSession(
  input: StripeCheckoutSessionInput,
) {
  const response = await paymentApi.post<StripeCheckoutSessionResponse>(
    '/payment/checkout/session',
    input,
  )
  return response.data
}

export async function confirmStripeCheckoutSession(sessionId: string) {
  const response = await paymentApi.post<Payment>(
    `/payment/checkout/confirm/${sessionId}`,
  )
  return response.data
}
