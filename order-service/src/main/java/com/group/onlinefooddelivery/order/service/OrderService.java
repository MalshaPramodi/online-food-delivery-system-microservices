package com.group.onlinefooddelivery.order.service;

import java.util.List;

import com.group.onlinefooddelivery.order.domain.Order;
import com.group.onlinefooddelivery.order.domain.Payment;

public interface OrderService {

    Order saveOrder(Order order);

    List<Order> findAll();

    Order getOrderByOrderId(Long id);

    List<Order> getOrdersByUserId(Long userId);

    List<Order> getAllOrdersByRestaurantId(Long restaurantId);

    Payment getPaymentResponse(Order order);

    void sendOrderCreatedNotification(Order order);
}