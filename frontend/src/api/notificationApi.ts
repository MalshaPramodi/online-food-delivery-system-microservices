import axios from 'axios'
import type { CustomerNotification } from '../types/notification'

const notificationApi = axios.create({
  baseURL: '/api',
})

export async function getCustomerNotifications(customerId: string | number) {
  const response = await notificationApi.get<CustomerNotification[]>(
    `/notifications/customer/${customerId}`,
  )
  return response.data
}
