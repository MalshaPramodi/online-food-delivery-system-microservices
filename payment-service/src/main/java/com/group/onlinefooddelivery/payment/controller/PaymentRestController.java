package com.group.onlinefooddelivery.payment.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
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
import com.group.onlinefooddelivery.payment.dto.StripeCheckoutSessionRequest;
import com.group.onlinefooddelivery.payment.dto.StripeCheckoutSessionResponse;
import com.group.onlinefooddelivery.payment.service.PaymentNotificationEventPublisher;
import com.group.onlinefooddelivery.payment.service.PaymentService;
import com.group.onlinefooddelivery.payment.service.StripeCheckoutService;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentRestController {

    private static final Logger log = LoggerFactory.getLogger(PaymentRestController.class);

    private final PaymentService paymentService;
    private final PaymentNotificationEventPublisher notificationEventPublisher;
    private final StripeCheckoutService stripeCheckoutService;
    private final RestTemplate restTemplate;

    @Value("${payment.credit-card-validation.enabled:false}")
    private boolean creditCardValidationEnabled;

    @Value("${order.status-update.url:http://order-service:9001/order/}")
    private String orderStatusUpdateUrl;

    public PaymentRestController(PaymentService paymentService,
            PaymentNotificationEventPublisher notificationEventPublisher,
            StripeCheckoutService stripeCheckoutService,
            @Qualifier("restTemplate") RestTemplate restTemplate) {
        this.paymentService = paymentService;
        this.notificationEventPublisher = notificationEventPublisher;
        this.stripeCheckoutService = stripeCheckoutService;
        this.restTemplate = restTemplate;
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
            notificationEventPublisher.publishPaymentCompleted(payment);

            return new ResponseEntity<>(payment, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Payment failed", e);

            return new ResponseEntity<>(
                    "Something went wrong. Payment was unsuccessful. Please try again.",
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @PostMapping("/checkout/session")
    public ResponseEntity<StripeCheckoutSessionResponse> createStripeCheckoutSession(
            @RequestBody StripeCheckoutSessionRequest request) {
        return ResponseEntity.ok(stripeCheckoutService.createSession(request));
    }

    @PostMapping("/checkout/confirm/{sessionId}")
    public ResponseEntity<?> confirmStripeCheckoutSession(@PathVariable String sessionId) {
        try {
            Payment existingPayment = paymentService.getPaymentByStripeCheckoutSessionId(sessionId);

            if (existingPayment != null) {
                return ResponseEntity.ok(existingPayment);
            }

            Map<?, ?> session = stripeCheckoutService.retrieveSession(sessionId);

            if (session == null || !"paid".equals(String.valueOf(session.get("payment_status")))) {
                return new ResponseEntity<>("Stripe payment is not completed.", HttpStatus.BAD_REQUEST);
            }

            Map<?, ?> metadata = (Map<?, ?>) session.get("metadata");
            Long orderId = Long.valueOf(String.valueOf(metadata.get("orderId")));
            Long customerId = Long.valueOf(String.valueOf(metadata.get("customerId")));

            Payment payment = new Payment();
            payment.setOrderId(orderId);
            payment.setCustomerId(customerId);
            payment.setTotalPrice(fromMinorUnits(session.get("amount_total")));
            payment.setPaymentTime(LocalDateTime.now());
            payment.setOrderStatus(OrderStatus.PAID);
            payment.setPaymentProvider("STRIPE");
            payment.setProviderReference(String.valueOf(session.get("payment_intent")));
            payment.setStripeCheckoutSessionId(sessionId);

            paymentService.save(payment);
            notificationEventPublisher.publishPaymentCompleted(payment);
            markOrderAsPaid(orderId);

            return ResponseEntity.ok(payment);
        } catch (Exception exception) {
            log.error("Stripe payment confirmation failed", exception);
            return new ResponseEntity<>(
                    "Stripe payment confirmation failed. Please try again.",
                    HttpStatus.BAD_REQUEST);
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

    private BigDecimal fromMinorUnits(Object amountTotal) {
        return new BigDecimal(String.valueOf(amountTotal)).divide(BigDecimal.valueOf(100));
    }

    private void markOrderAsPaid(Long orderId) {
        restTemplate.put(
                orderStatusUpdateUrl + orderId + "/status",
                new HttpEntity<>(Map.of("status", "PAID")));
    }
}
