package com.group.onlinefooddelivery.notification.dao;

import com.group.onlinefooddelivery.notification.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByCustomerId(Long customerId);

    List<Notification> findByOrderId(Long orderId);
}