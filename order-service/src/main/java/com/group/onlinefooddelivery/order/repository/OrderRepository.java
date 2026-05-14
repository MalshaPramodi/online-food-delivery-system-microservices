package com.group.onlinefooddelivery.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group.onlinefooddelivery.order.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    List<Order> findByRestaurantId(Long restaurantId);
}
