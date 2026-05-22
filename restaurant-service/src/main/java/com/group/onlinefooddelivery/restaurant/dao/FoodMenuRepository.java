package com.group.onlinefooddelivery.restaurant.dao;

import com.group.onlinefooddelivery.restaurant.domain.FoodMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodMenuRepository extends JpaRepository<FoodMenu, Long> {

    List<FoodMenu> findByRestaurantId(Long restaurantId);
}