package com.group.onlinefooddelivery.notification.service.impl;

import com.group.onlinefooddelivery.notification.dao.NotificationRepository;
import com.group.onlinefooddelivery.notification.domain.Notification;
import com.group.onlinefooddelivery.notification.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found with id: " + id));
    }

    @Override
    public List<Notification> getNotificationsByCustomerId(Long customerId) {
        return notificationRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Notification> getNotificationsByOrderId(Long orderId) {
        return notificationRepository.findByOrderId(orderId);
    }

    @Override
    public Notification markAsSent(Long id) {
        Notification notification = getNotificationById(id);
        notification.setSent(true);
        notification.setSentAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }
}