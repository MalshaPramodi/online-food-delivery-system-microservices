package com.group.onlinefooddelivery.customer.service;

import com.group.onlinefooddelivery.customer.domain.PaymentMethod;

import java.util.List;

public interface PaymentMethodService {

    PaymentMethod addPaymentMethod(Long customerId, PaymentMethod paymentMethod);

    List<PaymentMethod> getPaymentMethodsByCustomerId(Long customerId);

    PaymentMethod getPaymentMethodById(Long paymentMethodId);

    PaymentMethod updatePaymentMethod(Long paymentMethodId, PaymentMethod paymentMethod);

    void deletePaymentMethod(Long paymentMethodId);
}