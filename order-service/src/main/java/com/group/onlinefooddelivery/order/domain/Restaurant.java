package com.group.onlinefooddelivery.order.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Restaurant {

    private Long id;
    private String name;
    private String location;
    private String contactNumber;
}
