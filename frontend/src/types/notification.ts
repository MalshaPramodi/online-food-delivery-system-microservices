export type CustomerNotification = {
  id: number
  customerId: number
  orderId?: number | null
  type: 'ORDER_CREATED' | 'PAYMENT_COMPLETED' | string
  channel: string
  message: string
  sent: boolean
  createdAt: string
  sentAt?: string | null
}
