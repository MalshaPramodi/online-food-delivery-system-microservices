import axios from 'axios'
import type { Customer } from '../types/customer'

export type CreateCustomerInput = {
  fullName: string
  email: string
  phone: string
  active: boolean
}

const customerApi = axios.create({
  baseURL: '/api',
})

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