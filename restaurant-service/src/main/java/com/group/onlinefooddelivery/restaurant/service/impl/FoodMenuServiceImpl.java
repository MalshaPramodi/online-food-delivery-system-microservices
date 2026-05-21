package com.group.onlinefooddelivery.restaurant.service.impl;

import com.group.onlinefooddelivery.restaurant.dao.FoodMenuRepository;
import com.group.onlinefooddelivery.restaurant.domain.FoodMenu;
import com.group.onlinefooddelivery.restaurant.domain.Restaurant;
import com.group.onlinefooddelivery.restaurant.exception.RestaurantNotFoundException;
import com.group.onlinefooddelivery.restaurant.service.FoodMenuService;
import com.group.onlinefooddelivery.restaurant.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodMenuServiceImpl implements FoodMenuService {

    private final FoodMenuRepository foodMenuRepository;
    private final RestaurantService restaurantService;

    public FoodMenuServiceImpl(FoodMenuRepository foodMenuRepository, RestaurantService restaurantService) {
        this.foodMenuRepository = foodMenuRepository;
        this.restaurantService = restaurantService;
    }

    @Override
    public FoodMenu addFoodMenu(Long restaurantId, FoodMenu foodMenu) {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        foodMenu.setRestaurant(restaurant);
        return foodMenuRepository.save(foodMenu);
    }

    @Override
    public List<FoodMenu> getFoodMenusByRestaurantId(Long restaurantId) {
        restaurantService.getRestaurantById(restaurantId);
        return foodMenuRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public FoodMenu getFoodMenuById(Long menuId) {
        return foodMenuRepository.findById(menuId)
                .orElseThrow(() -> new RestaurantNotFoundException("Food menu item not found with id: " + menuId));
    }

    @Override
    public FoodMenu updateFoodMenu(Long menuId, FoodMenu foodMenu) {
        FoodMenu existingFoodMenu = getFoodMenuById(menuId);

        existingFoodMenu.setFoodName(foodMenu.getFoodName());
        existingFoodMenu.setFoodDescription(foodMenu.getFoodDescription());
        existingFoodMenu.setFoodCategory(foodMenu.getFoodCategory());
        existingFoodMenu.setFoodPrice(foodMenu.getFoodPrice());
        existingFoodMenu.setAvailable(foodMenu.isAvailable());

        return foodMenuRepository.save(existingFoodMenu);
    }

    @Override
    public void deleteFoodMenu(Long menuId) {
        FoodMenu existingFoodMenu = getFoodMenuById(menuId);
        foodMenuRepository.delete(existingFoodMenu);
    }
}