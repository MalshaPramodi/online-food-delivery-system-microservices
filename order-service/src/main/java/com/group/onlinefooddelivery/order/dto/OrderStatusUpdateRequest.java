package com.group.onlinefooddelivery.order.dto;

import com.group.onlinefooddelivery.order.domain.OrderStatus;

import jakarta.validation.constraints.NotNull;

public class OrderStatusUpdateRequest {

    @NotNull
    private OrderStatus status;

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}