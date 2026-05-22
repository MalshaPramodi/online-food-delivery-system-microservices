package com.group.onlinefooddelivery.customer.controller;

import com.group.onlinefooddelivery.customer.domain.PaymentMethod;
import com.group.onlinefooddelivery.customer.service.PaymentMethodService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PaymentMethodRestController {

    private final PaymentMethodService paymentMethodService;

    public PaymentMethodRestController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    @PostMapping("/customers/{customerId}/payment-methods")
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentMethod addPaymentMethod(
            @PathVariable Long customerId,
            @Valid @RequestBody PaymentMethod paymentMethod) {
        return paymentMethodService.addPaymentMethod(customerId, paymentMethod);
    }

    @GetMapping("/customers/{customerId}/payment-methods")
    public List<PaymentMethod> getPaymentMethodsByCustomerId(@PathVariable Long customerId) {
        return paymentMethodService.getPaymentMethodsByCustomerId(customerId);
    }

    @GetMapping("/customers/payment-methods/{paymentMethodId}")
    public PaymentMethod getPaymentMethodById(@PathVariable Long paymentMethodId) {
        return paymentMethodService.getPaymentMethodById(paymentMethodId);
    }

    @PutMapping("/customers/payment-methods/{paymentMethodId}")
    public PaymentMethod updatePaymentMethod(
            @PathVariable Long paymentMethodId,
            @Valid @RequestBody PaymentMethod paymentMethod) {
        return paymentMethodService.updatePaymentMethod(paymentMethodId, paymentMethod);
    }

    @DeleteMapping("/customers/payment-methods/{paymentMethodId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePaymentMethod(@PathVariable Long paymentMethodId) {
        paymentMethodService.deletePaymentMethod(paymentMethodId);
    }
}