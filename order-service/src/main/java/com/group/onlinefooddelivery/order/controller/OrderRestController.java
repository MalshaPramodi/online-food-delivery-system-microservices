package com.group.onlinefooddelivery.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.PutMapping;
import com.group.onlinefooddelivery.order.dto.OrderStatusUpdateRequest;
import com.group.onlinefooddelivery.order.domain.Order;
import com.group.onlinefooddelivery.order.domain.OrderStatus;
import com.group.onlinefooddelivery.order.domain.Payment;
import com.group.onlinefooddelivery.order.domain.Restaurant;
import com.group.onlinefooddelivery.order.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
public class OrderRestController {

    private final OrderService orderService;
    private final RestTemplate restTemplate;

    @Value("${restaurant.microservice.url}")
    private String restaurantServiceUrl;

    public OrderRestController(OrderService orderService, RestTemplate restTemplate) {
        this.orderService = orderService;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/create")
    public String placeOrder(@Valid @RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);

        orderService.sendOrderCreatedNotification(savedOrder);

        Payment paymentResponse = orderService.getPaymentResponse(savedOrder);

        if (paymentResponse != null && paymentResponse.getOrderStatus() == OrderStatus.PAID) {
            savedOrder.setOrderStatus(OrderStatus.PAID);
            orderService.saveOrder(savedOrder);
            orderService.sendPaymentCompletedNotification(savedOrder);
        }

        return "Order has been placed successfully";
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.findAll();
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderByOrderId(orderId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderStatusUpdateRequest request) {
        return orderService.updateOrderStatus(orderId, request.getStatus());
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/restaurant-orders/{restaurantId}")
    public List<Order> getOrdersByRestaurantId(@PathVariable Long restaurantId) {
        return orderService.getAllOrdersByRestaurantId(restaurantId);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public Restaurant getRestaurant(@PathVariable Long restaurantId) {
        return restTemplate.getForObject(restaurantServiceUrl + restaurantId, Restaurant.class);
    }
}