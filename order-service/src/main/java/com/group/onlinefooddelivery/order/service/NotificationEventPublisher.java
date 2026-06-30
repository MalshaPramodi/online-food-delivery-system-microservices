package com.group.onlinefooddelivery.order.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group.onlinefooddelivery.order.domain.NotificationEvent;
import com.group.onlinefooddelivery.order.domain.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationEventPublisher {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.kafka.topic.order-created}")
    private String orderCreatedTopic;

    public NotificationEventPublisher(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishOrderCreated(Order order) {
        NotificationEvent event = new NotificationEvent(
                order.getUserId(),
                order.getId(),
                "ORDER_CREATED",
                "EMAIL",
                "Your order has been placed successfully.");

        publish(orderCreatedTopic, order.getId(), event);
    }

    private void publish(String topic, Long orderId, NotificationEvent event) {
        try {
            kafkaTemplate.send(topic, String.valueOf(orderId), objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException exception) {
            throw new RuntimeException("Unable to publish notification event", exception);
        }
    }
}
