package com.group.onlinefooddelivery.notification.controller;

import com.group.onlinefooddelivery.notification.domain.Notification;
import com.group.onlinefooddelivery.notification.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationRestController {

    private final NotificationService notificationService;

    public NotificationRestController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Notification createNotification(@Valid @RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<Notification> getNotificationsByCustomerId(@PathVariable Long customerId) {
        return notificationService.getNotificationsByCustomerId(customerId);
    }

    @GetMapping("/order/{orderId}")
    public List<Notification> getNotificationsByOrderId(@PathVariable Long orderId) {
        return notificationService.getNotificationsByOrderId(orderId);
    }

    @PutMapping("/{id}/sent")
    public Notification markAsSent(@PathVariable Long id) {
        return notificationService.markAsSent(id);
    }
}