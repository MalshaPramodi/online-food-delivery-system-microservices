package com.group.onlinefooddelivery.notification.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group.onlinefooddelivery.notification.domain.Notification;
import com.group.onlinefooddelivery.notification.domain.NotificationEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificationEventConsumer.class);

    private final NotificationService notificationService;
    private final EmailDeliveryService emailDeliveryService;
    private final ObjectMapper objectMapper;

    public NotificationEventConsumer(NotificationService notificationService,
            EmailDeliveryService emailDeliveryService,
            ObjectMapper objectMapper) {
        this.notificationService = notificationService;
        this.emailDeliveryService = emailDeliveryService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "${app.kafka.topic.order-created}", groupId = "${spring.kafka.consumer.group-id}")
    public void handleOrderCreated(String message) {
        createNotification(message);
    }

    @KafkaListener(topics = "${app.kafka.topic.payment-completed}", groupId = "${spring.kafka.consumer.group-id}")
    public void handlePaymentCompleted(String message) {
        createNotification(message);
    }

    private void createNotification(String message) {
        NotificationEvent event = parseEvent(message);

        Notification notification = new Notification();
        notification.setCustomerId(event.getCustomerId());
        notification.setOrderId(event.getOrderId());
        notification.setType(event.getType());
        notification.setChannel(event.getChannel());
        notification.setMessage(event.getMessage());

        Notification savedNotification = notificationService.createNotification(notification);

        try {
            if (emailDeliveryService.send(savedNotification)) {
                notificationService.markAsSent(savedNotification.getId());
            }
        } catch (Exception exception) {
            log.error("Notification {} was saved, but email delivery failed", savedNotification.getId(), exception);
        }
    }

    private NotificationEvent parseEvent(String message) {
        try {
            return objectMapper.readValue(message, NotificationEvent.class);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException("Unable to parse notification event", exception);
        }
    }
}
