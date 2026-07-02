package com.group.onlinefooddelivery.payment.service;

import com.group.onlinefooddelivery.payment.dto.StripeCheckoutSessionRequest;
import com.group.onlinefooddelivery.payment.dto.StripeCheckoutSessionResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

@Service
public class StripeCheckoutService {

    private static final String STRIPE_CHECKOUT_SESSIONS_URL = "https://api.stripe.com/v1/checkout/sessions";

    private final RestTemplate restTemplate;

    @Value("${stripe.secret-key:}")
    private String stripeSecretKey;

    @Value("${stripe.currency:usd}")
    private String currency;

    @Value("${stripe.success-url:http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}}")
    private String successUrl;

    @Value("${stripe.cancel-url:http://localhost:5173/checkout/cancel}")
    private String cancelUrl;

    public StripeCheckoutService(@Qualifier("stripeRestTemplate") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public StripeCheckoutSessionResponse createSession(StripeCheckoutSessionRequest request) {
        if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
            throw new IllegalStateException("Stripe secret key is not configured.");
        }

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("mode", "payment");
        body.add("success_url", successUrl);
        body.add("cancel_url", cancelUrl);
        body.add("client_reference_id", String.valueOf(request.getOrderId()));
        body.add("metadata[orderId]", String.valueOf(request.getOrderId()));
        body.add("metadata[customerId]", String.valueOf(request.getCustomerId()));
        body.add("line_items[0][quantity]", "1");
        body.add("line_items[0][price_data][currency]", currency);
        body.add("line_items[0][price_data][unit_amount]", toMinorUnits(request.getTotalPrice()));
        body.add("line_items[0][price_data][product_data][name]", "Food delivery order #" + request.getOrderId());

        if (request.getCustomerEmail() != null && !request.getCustomerEmail().isBlank()) {
            body.add("customer_email", request.getCustomerEmail());
        }

        Map<?, ?> response = restTemplate.postForObject(
                STRIPE_CHECKOUT_SESSIONS_URL,
                new HttpEntity<>(body, stripeHeaders(MediaType.APPLICATION_FORM_URLENCODED)),
                Map.class);

        if (response == null || response.get("id") == null || response.get("url") == null) {
            throw new IllegalStateException("Stripe did not return a checkout session URL.");
        }

        return new StripeCheckoutSessionResponse(
                String.valueOf(response.get("id")),
                String.valueOf(response.get("url")));
    }

    public Map<?, ?> retrieveSession(String sessionId) {
        if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
            throw new IllegalStateException("Stripe secret key is not configured.");
        }

        return restTemplate.exchange(
                STRIPE_CHECKOUT_SESSIONS_URL + "/" + sessionId,
                HttpMethod.GET,
                new HttpEntity<>(stripeHeaders(null)),
                Map.class).getBody();
    }

    private HttpHeaders stripeHeaders(MediaType contentType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(stripeSecretKey);
        if (contentType != null) {
            headers.setContentType(contentType);
        }
        return headers;
    }

    private String toMinorUnits(BigDecimal amount) {
        return amount
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .toPlainString();
    }
}
