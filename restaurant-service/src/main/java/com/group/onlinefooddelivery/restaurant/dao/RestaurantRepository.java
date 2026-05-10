package com.group.onlinefooddelivery.restaurant.dao;

import com.group.onlinefooddelivery.restaurant.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
