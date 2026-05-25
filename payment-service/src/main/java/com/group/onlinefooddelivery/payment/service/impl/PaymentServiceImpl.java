package com.group.onlinefooddelivery.payment.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.group.onlinefooddelivery.payment.dao.PaymentRepository;
import com.group.onlinefooddelivery.payment.domain.CreditCard;
import com.group.onlinefooddelivery.payment.domain.Payment;
import com.group.onlinefooddelivery.payment.service.PaymentService;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Value("${customer.payment-methods.url}")
    private String customerPaymentMethodsUrl;

    private final RestTemplate restTemplate;
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(RestTemplate restTemplate, PaymentRepository paymentRepository) {
        this.restTemplate = restTemplate;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public void save(Payment payment) {
        paymentRepository.save(payment);
    }

    @Override
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public boolean isCreditCardValid(CreditCard creditCard) {
        LocalDate today = LocalDate.now();

        int expMonth = Integer.parseInt(creditCard.getExpiryMonth());
        int expYear = Integer.parseInt(creditCard.getExpiryYear());

        int todayMonth = today.getMonthValue();
        int todayYear = today.getYear();

        if (expYear > todayYear) {
            return true;
        }

        return expYear == todayYear && expMonth >= todayMonth;
    }

    @Override
    public CreditCard getCrediCardDetails(Long customerId) {
        return restTemplate.getForObject(customerPaymentMethodsUrl + customerId, CreditCard.class);
    }

    @Override
    public List<Payment> getPaymentHistoryByOrderId(Long orderId) {
        return paymentRepository.findPaymentHistoryByOrderId(orderId);
    }
}