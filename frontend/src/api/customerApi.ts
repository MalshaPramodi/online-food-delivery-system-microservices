import axios from 'axios'
import type { Customer } from '../types/customer'

export type CreateCustomerInput = {
  fullName: string
  email: string
  phone: string
  password: string
  active: boolean
}

const customerApi = axios.create({
  baseURL: '/api',
})

export type CustomerLoginInput = {
  email: string
  password: string
}

export type CustomerAuthResponse = {
  id: number
  fullName: string
  email: string
  phone: string
}

export async function getCustomers() {
  const response = await customerApi.get<Customer[]>('/customers')
  return response.data
}

export async function getCustomer(id: string | number) {
  const response = await customerApi.get<Customer>(`/customers/${id}`)
  return response.data
}

export async function createCustomer(input: CreateCustomerInput) {
  const response = await customerApi.post<Customer>('/customers', input)
  return response.data
}

export async function loginCustomer(input: CustomerLoginInput) {
  const response = await customerApi.post<CustomerAuthResponse>(
    '/customers/login',
    input,
  )
  return response.data
}