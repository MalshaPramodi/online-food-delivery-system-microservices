package com.group.onlinefooddelivery.restaurant.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RestaurantLoginRequest {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public RestaurantLoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
