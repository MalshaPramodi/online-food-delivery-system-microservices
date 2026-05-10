package com.group.onlinefooddelivery.restaurant.service;

import com.group.onlinefooddelivery.restaurant.domain.Restaurant;

import java.util.List;

public interface RestaurantService {

    Restaurant createRestaurant(Restaurant restaurant);

    List<Restaurant> getAllRestaurants();

    Restaurant getRestaurantById(Long id);

    Restaurant updateRestaurant(Long id, Restaurant restaurant);

    void deleteRestaurant(Long id);
}
