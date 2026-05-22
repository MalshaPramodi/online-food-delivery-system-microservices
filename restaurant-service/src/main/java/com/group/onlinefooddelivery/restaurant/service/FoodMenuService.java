package com.group.onlinefooddelivery.restaurant.service;

import com.group.onlinefooddelivery.restaurant.domain.FoodMenu;

import java.util.List;

public interface FoodMenuService {

    FoodMenu addFoodMenu(Long restaurantId, FoodMenu foodMenu);

    List<FoodMenu> getFoodMenusByRestaurantId(Long restaurantId);

    FoodMenu getFoodMenuById(Long menuId);

    FoodMenu updateFoodMenu(Long menuId, FoodMenu foodMenu);

    void deleteFoodMenu(Long menuId);
}