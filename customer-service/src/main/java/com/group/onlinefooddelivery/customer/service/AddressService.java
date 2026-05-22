package com.group.onlinefooddelivery.customer.service;

import com.group.onlinefooddelivery.customer.domain.Address;

import java.util.List;

public interface AddressService {

    Address addAddress(Long customerId, Address address);

    List<Address> getAddressesByCustomerId(Long customerId);

    Address getAddressById(Long addressId);

    Address updateAddress(Long addressId, Address address);

    void deleteAddress(Long addressId);
}