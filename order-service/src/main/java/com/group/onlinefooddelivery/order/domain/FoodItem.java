package com.group.onlinefooddelivery.order.domain;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "food_items")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Food menu id is required")
    private Long foodMenuId;

    @NotNull(message = "Food name is required")
    private String foodName;

    @NotNull(message = "Food price is required")
    private BigDecimal foodPrice;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
