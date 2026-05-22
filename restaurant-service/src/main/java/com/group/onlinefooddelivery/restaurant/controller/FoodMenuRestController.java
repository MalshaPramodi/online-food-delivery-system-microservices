package com.group.onlinefooddelivery.restaurant.controller;

import com.group.onlinefooddelivery.restaurant.domain.FoodMenu;
import com.group.onlinefooddelivery.restaurant.service.FoodMenuService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FoodMenuRestController {

    private final FoodMenuService foodMenuService;

    public FoodMenuRestController(FoodMenuService foodMenuService) {
        this.foodMenuService = foodMenuService;
    }

    @PostMapping("/restaurants/{restaurantId}/menus")
    @ResponseStatus(HttpStatus.CREATED)
    public FoodMenu addFoodMenu(
            @PathVariable Long restaurantId,
            @Valid @RequestBody FoodMenu foodMenu) {
        return foodMenuService.addFoodMenu(restaurantId, foodMenu);
    }

    @GetMapping("/restaurants/{restaurantId}/menus")
    public List<FoodMenu> getFoodMenusByRestaurantId(@PathVariable Long restaurantId) {
        return foodMenuService.getFoodMenusByRestaurantId(restaurantId);
    }

    @GetMapping("/restaurants/menus/{menuId}")
    public FoodMenu getFoodMenuById(@PathVariable Long menuId) {
        return foodMenuService.getFoodMenuById(menuId);
    }

    @PutMapping("/restaurants/menus/{menuId}")
    public FoodMenu updateFoodMenu(
            @PathVariable Long menuId,
            @Valid @RequestBody FoodMenu foodMenu) {
        return foodMenuService.updateFoodMenu(menuId, foodMenu);
    }

    @DeleteMapping("/restaurants/menus/{menuId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFoodMenu(@PathVariable Long menuId) {
        foodMenuService.deleteFoodMenu(menuId);
    }
}
