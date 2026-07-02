package com.group.onlinefooddelivery.payment.service;

import java.util.List;

import com.group.onlinefooddelivery.payment.domain.CreditCard;
import com.group.onlinefooddelivery.payment.domain.Payment;

public interface PaymentService {

    void save(Payment payment);

    List<Payment> findAll();

    Payment getPaymentById(Long id);

    Payment getPaymentByStripeCheckoutSessionId(String stripeCheckoutSessionId);

    boolean isCreditCardValid(CreditCard creditCard);

    CreditCard getCrediCardDetails(Long customerId);

    List<Payment> getPaymentHistoryByOrderId(Long orderId);
}
