package com.group.onlinefooddelivery.order.domain;

public class NotificationEvent {

    private Long customerId;
    private Long orderId;
    private String type;
    private String channel;
    private String message;

    public NotificationEvent() {
    }

    public NotificationEvent(Long customerId, Long orderId, String type, String channel, String message) {
        this.customerId = customerId;
        this.orderId = orderId;
        this.type = type;
        this.channel = channel;
        this.message = message;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
