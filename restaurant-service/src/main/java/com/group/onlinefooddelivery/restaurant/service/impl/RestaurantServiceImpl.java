package com.group.onlinefooddelivery.restaurant.service.impl;

import com.group.onlinefooddelivery.restaurant.dao.RestaurantRepository;
import com.group.onlinefooddelivery.restaurant.domain.Restaurant;
import com.group.onlinefooddelivery.restaurant.dto.RestaurantAuthResponse;
import com.group.onlinefooddelivery.restaurant.dto.RestaurantLoginRequest;
import com.group.onlinefooddelivery.restaurant.service.RestaurantService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.group.onlinefooddelivery.restaurant.exception.RestaurantNotFoundException;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        if (restaurant.getPassword() != null && !restaurant.getPassword().isBlank()) {
            restaurant.setPassword(passwordEncoder.encode(restaurant.getPassword()));
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public RestaurantAuthResponse login(RestaurantLoginRequest request) {
        Restaurant restaurant = restaurantRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (restaurant.getPassword() == null
                || !passwordEncoder.matches(request.getPassword(), restaurant.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new RestaurantAuthResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getEmail(),
                restaurant.getLocation(),
                restaurant.getCuisineType());
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RestaurantNotFoundException(id));
    }

    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        Restaurant existingRestaurant = getRestaurantById(id);

        existingRestaurant.setName(restaurant.getName());
        existingRestaurant.setLocation(restaurant.getLocation());
        existingRestaurant.setCuisineType(restaurant.getCuisineType());
        existingRestaurant.setActive(restaurant.getActive());

        return restaurantRepository.save(existingRestaurant);
    }

    @Override
    public void deleteRestaurant(Long id) {
        Restaurant existingRestaurant = getRestaurantById(id);
        restaurantRepository.delete(existingRestaurant);
    }
}
