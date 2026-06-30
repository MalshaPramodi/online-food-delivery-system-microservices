package com.group.onlinefooddelivery.payment.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group.onlinefooddelivery.payment.domain.NotificationEvent;
import com.group.onlinefooddelivery.payment.domain.Payment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentNotificationEventPublisher {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.kafka.topic.payment-completed}")
    private String paymentCompletedTopic;

    public PaymentNotificationEventPublisher(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishPaymentCompleted(Payment payment) {
        NotificationEvent event = new NotificationEvent(
                payment.getCustomerId(),
                payment.getOrderId(),
                "PAYMENT_COMPLETED",
                "EMAIL",
                "Your payment has been completed successfully.");

        try {
            kafkaTemplate.send(
                    paymentCompletedTopic,
                    String.valueOf(payment.getOrderId()),
                    objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException exception) {
            throw new RuntimeException("Unable to publish payment notification event", exception);
        }
    }
}
