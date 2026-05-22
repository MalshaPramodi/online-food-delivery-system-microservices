package com.group.onlinefooddelivery.order.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.group.onlinefooddelivery.order.domain.Order;
import com.group.onlinefooddelivery.order.domain.Payment;
import com.group.onlinefooddelivery.order.repository.OrderRepository;
import com.group.onlinefooddelivery.order.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Value("${payment.microservice.url}")
    private String paymentServiceUrl;

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
}