package com.group.onlinefooddelivery.notification.service;

import com.group.onlinefooddelivery.notification.domain.Customer;
import com.group.onlinefooddelivery.notification.domain.Notification;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;

@Service
public class EmailDeliveryService {

    private static final Duration MIN_TIME_BETWEEN_EMAILS = Duration.ofSeconds(2);
    private static final Duration RETRY_DELAY = Duration.ofSeconds(3);

    private final JavaMailSender mailSender;
    private final RestTemplate restTemplate;
    private final Object mailSendLock = new Object();
    private Instant lastEmailSentAt = Instant.EPOCH;

    @Value("${notification.email.enabled:false}")
    private boolean emailEnabled;

    @Value("${notification.email.from}")
    private String fromAddress;

    @Value("${customer.microservice.url}")
    private String customerServiceUrl;

    public EmailDeliveryService(JavaMailSender mailSender, RestTemplate restTemplate) {
        this.mailSender = mailSender;
        this.restTemplate = restTemplate;
    }

    public boolean send(Notification notification) {
        if (!emailEnabled || !"EMAIL".equalsIgnoreCase(notification.getChannel())) {
            return false;
        }

        Customer customer = restTemplate.getForObject(
                customerServiceUrl + notification.getCustomerId(),
                Customer.class);

        if (customer == null || customer.getEmail() == null || customer.getEmail().isBlank()) {
            throw new IllegalStateException("Customer email is not available for id: " + notification.getCustomerId());
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(customer.getEmail());
        message.setSubject(buildSubject(notification));
        message.setText(notification.getMessage());

        sendWithThrottle(message);
        return true;
    }

    private void sendWithThrottle(SimpleMailMessage message) {
        synchronized (mailSendLock) {
            waitForMailtrapRateLimit();

            try {
                mailSender.send(message);
                lastEmailSentAt = Instant.now();
            } catch (MailException exception) {
                waitBeforeRetry();
                mailSender.send(message);
                lastEmailSentAt = Instant.now();
            }
        }
    }

    private void waitForMailtrapRateLimit() {
        long millisToWait = MIN_TIME_BETWEEN_EMAILS.minus(Duration.between(lastEmailSentAt, Instant.now())).toMillis();

        if (millisToWait > 0) {
            sleep(millisToWait);
        }
    }

    private void waitBeforeRetry() {
        sleep(RETRY_DELAY.toMillis());
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Email sending was interrupted", exception);
        }
    }

    private String buildSubject(Notification notification) {
        if ("PAYMENT_COMPLETED".equals(notification.getType())) {
            return "Payment completed for order #" + notification.getOrderId();
        }

        if ("ORDER_CREATED".equals(notification.getType())) {
            return "Order placed #" + notification.getOrderId();
        }

        return "Food delivery notification";
    }
}
