package com.group.onlinefooddelivery.restaurant.service;

import com.group.onlinefooddelivery.restaurant.domain.Restaurant;
import com.group.onlinefooddelivery.restaurant.dto.RestaurantAuthResponse;
import com.group.onlinefooddelivery.restaurant.dto.RestaurantLoginRequest;

import java.util.List;

public interface RestaurantService {

    Restaurant createRestaurant(Restaurant restaurant);

    RestaurantAuthResponse login(RestaurantLoginRequest request);

    List<Restaurant> getAllRestaurants();

    Restaurant getRestaurantById(Long id);

    Restaurant updateRestaurant(Long id, Restaurant restaurant);

    void deleteRestaurant(Long id);
}
