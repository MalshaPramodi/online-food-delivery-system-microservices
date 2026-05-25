package com.group.onlinefooddelivery.notification.service;

import com.group.onlinefooddelivery.notification.domain.Notification;

import java.util.List;

public interface NotificationService {

    Notification createNotification(Notification notification);

    List<Notification> getAllNotifications();

    Notification getNotificationById(Long id);

    List<Notification> getNotificationsByCustomerId(Long customerId);

    List<Notification> getNotificationsByOrderId(Long orderId);

    Notification markAsSent(Long id);
}