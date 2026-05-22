package com.group.onlinefooddelivery.customer.dao;

import com.group.onlinefooddelivery.customer.domain.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    List<PaymentMethod> findByCustomerId(Long customerId);
}