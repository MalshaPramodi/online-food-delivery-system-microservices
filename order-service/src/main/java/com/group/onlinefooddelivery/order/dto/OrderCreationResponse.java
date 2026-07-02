package com.group.onlinefooddelivery.order.dto;

import com.group.onlinefooddelivery.order.domain.OrderStatus;

public class OrderCreationResponse {

    private Long orderId;
    private OrderStatus orderStatus;
    private String message;

    public OrderCreationResponse() {
    }

    public OrderCreationResponse(Long orderId, OrderStatus orderStatus, String message) {
        this.orderId = orderId;
        this.orderStatus = orderStatus;
        this.message = message;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
