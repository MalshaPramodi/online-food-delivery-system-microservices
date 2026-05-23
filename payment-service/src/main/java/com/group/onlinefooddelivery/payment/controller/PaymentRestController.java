package com.group.onlinefooddelivery.payment.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.onlinefooddelivery.payment.domain.CreditCard;
import com.group.onlinefooddelivery.payment.domain.OrderStatus;
import com.group.onlinefooddelivery.payment.domain.Payment;
import com.group.onlinefooddelivery.payment.service.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentRestController {

    private static final Logger log = LoggerFactory.getLogger(PaymentRestController.class);

    private final PaymentService paymentService;

    @Value("${payment.credit-card-validation.enabled:false}")
    private boolean creditCardValidationEnabled;

    public PaymentRestController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> payment(@RequestBody Payment payment) {
        try {
            if (creditCardValidationEnabled) {
                CreditCard creditCard = paymentService.getCrediCardDetails(payment.getCustomerId());

                if (creditCard == null) {
                    return new ResponseEntity<>(
                            "Something went wrong, customer not found or doesn't have credit card",
                            HttpStatus.BAD_REQUEST
                    );
                }

                if (!paymentService.isCreditCardValid(creditCard)) {
                    return new ResponseEntity<>(
                            "Your card has expired. Please provide another card.",
                            HttpStatus.BAD_REQUEST
                    );
                }
            }

            payment.setPaymentTime(LocalDateTime.now());
            payment.setOrderStatus(OrderStatus.PAID);
            paymentService.save(payment);

            return new ResponseEntity<>(payment, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Payment failed", e);

            return new ResponseEntity<>(
                    "Something went wrong. Payment was unsuccessful. Please try again.",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @GetMapping("/all")
    public List<Payment> findAll() {
        return paymentService.findAll();
    }

    @GetMapping("/{id}")
    public Payment findOne(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @GetMapping("/order/{orderId}")
    public List<Payment> paymentHistoryByOrderId(@PathVariable Long orderId) {
        if (orderId == null) {
            throw new IllegalArgumentException("Order Id is invalid.");
        }

        return paymentService.getPaymentHistoryByOrderId(orderId);
    }
}
