package com.group.onlinefooddelivery.order.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Customer {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNumber;
}
