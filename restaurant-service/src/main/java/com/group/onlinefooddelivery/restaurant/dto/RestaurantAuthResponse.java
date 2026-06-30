package com.group.onlinefooddelivery.restaurant.dto;

public class RestaurantAuthResponse {

    private Long id;
    private String name;
    private String email;
    private String location;
    private String cuisineType;

    public RestaurantAuthResponse() {
    }

    public RestaurantAuthResponse(Long id, String name, String email, String location, String cuisineType) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.location = location;
        this.cuisineType = cuisineType;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getLocation() {
        return location;
    }

    public String getCuisineType() {
        return cuisineType;
    }
}
