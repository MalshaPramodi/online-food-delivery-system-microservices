package com.group.onlinefooddelivery.customer.service.impl;

import com.group.onlinefooddelivery.customer.dao.PaymentMethodRepository;
import com.group.onlinefooddelivery.customer.domain.Customer;
import com.group.onlinefooddelivery.customer.domain.PaymentMethod;
import com.group.onlinefooddelivery.customer.exception.CustomerNotFoundException;
import com.group.onlinefooddelivery.customer.service.CustomerService;
import com.group.onlinefooddelivery.customer.service.PaymentMethodService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final CustomerService customerService;

    public PaymentMethodServiceImpl(PaymentMethodRepository paymentMethodRepository, CustomerService customerService) {
        this.paymentMethodRepository = paymentMethodRepository;
        this.customerService = customerService;
    }

    @Override
    public PaymentMethod addPaymentMethod(Long customerId, PaymentMethod paymentMethod) {
        Customer customer = customerService.getCustomerById(customerId);
        paymentMethod.setCustomer(customer);
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    public List<PaymentMethod> getPaymentMethodsByCustomerId(Long customerId) {
        customerService.getCustomerById(customerId);
        return paymentMethodRepository.findByCustomerId(customerId);
    }

    @Override
    public PaymentMethod getPaymentMethodById(Long paymentMethodId) {
        return paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new CustomerNotFoundException(
                        "Payment method not found with id: " + paymentMethodId));
    }

    @Override
    public PaymentMethod updatePaymentMethod(Long paymentMethodId, PaymentMethod paymentMethod) {
        PaymentMethod existingPaymentMethod = getPaymentMethodById(paymentMethodId);

        existingPaymentMethod.setCardHolderName(paymentMethod.getCardHolderName());
        existingPaymentMethod.setCardNumber(paymentMethod.getCardNumber());
        existingPaymentMethod.setExpiryMonth(paymentMethod.getExpiryMonth());
        existingPaymentMethod.setExpiryYear(paymentMethod.getExpiryYear());
        existingPaymentMethod.setCardType(paymentMethod.getCardType());
        existingPaymentMethod.setActive(paymentMethod.isActive());

        return paymentMethodRepository.save(existingPaymentMethod);
    }

    @Override
    public void deletePaymentMethod(Long paymentMethodId) {
        PaymentMethod existingPaymentMethod = getPaymentMethodById(paymentMethodId);
        paymentMethodRepository.delete(existingPaymentMethod);
    }
}