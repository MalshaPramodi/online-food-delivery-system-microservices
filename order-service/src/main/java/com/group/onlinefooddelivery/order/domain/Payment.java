package com.group.onlinefooddelivery.order.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Payment {

    private Long id;
    private Long orderId;
    private Long customerId;
    private LocalDateTime paymentTime = LocalDateTime.now();
    private BigDecimal totalPrice;
    private OrderStatus orderStatus;
}
