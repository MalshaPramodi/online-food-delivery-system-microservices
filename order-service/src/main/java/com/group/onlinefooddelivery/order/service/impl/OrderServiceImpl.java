package com.group.onlinefooddelivery.order.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.group.onlinefooddelivery.order.domain.OrderStatus;
import com.group.onlinefooddelivery.order.domain.Order;
import com.group.onlinefooddelivery.order.domain.Payment;
import com.group.onlinefooddelivery.order.repository.OrderRepository;
import com.group.onlinefooddelivery.order.service.OrderService;
import com.group.onlinefooddelivery.order.domain.Notification;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Value("${payment.microservice.url}")
    private String paymentServiceUrl;

    @Value("${notification.microservice.url}")
    private String notificationServiceUrl;

    @Override
    public void sendOrderCreatedNotification(Order order) {
        Notification notification = new Notification();
        notification.setCustomerId(order.getUserId());
        notification.setOrderId(order.getId());
        notification.setType("ORDER_CREATED");
        notification.setChannel("EMAIL");
        notification.setMessage("Your order has been placed successfully.");

        restTemplate.postForObject(notificationServiceUrl, notification, Notification.class);
    }

    @Override
    public void sendPaymentCompletedNotification(Order order) {
        Notification notification = new Notification();
        notification.setCustomerId(order.getUserId());
        notification.setOrderId(order.getId());
        notification.setType("PAYMENT_COMPLETED");
        notification.setChannel("EMAIL");
        notification.setMessage("Your payment has been completed successfully.");

        restTemplate.postForObject(notificationServiceUrl, notification, Notification.class);
    }

    public OrderServiceImpl(OrderRepository orderRepository, RestTemplate restTemplate) {
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderByOrderId(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getAllOrdersByRestaurantId(Long restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public Payment getPaymentResponse(Order order) {
        Payment payment = new Payment();
        payment.setOrderId(order.getId());
        payment.setCustomerId(order.getUserId());
        payment.setTotalPrice(order.getTotalPrice());

        return restTemplate.postForObject(paymentServiceUrl, payment, Payment.class);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderByOrderId(orderId);

        if (order == null) {
            throw new RuntimeException("Order not found: " + orderId);
        }

        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
}