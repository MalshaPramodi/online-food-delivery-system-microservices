package com.group.onlinefooddelivery.customer.controller;

import com.group.onlinefooddelivery.customer.domain.Address;
import com.group.onlinefooddelivery.customer.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AddressRestController {

    private final AddressService addressService;

    public AddressRestController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/customers/{customerId}/addresses")
    @ResponseStatus(HttpStatus.CREATED)
    public Address addAddress(
            @PathVariable Long customerId,
            @Valid @RequestBody Address address) {
        return addressService.addAddress(customerId, address);
    }

    @GetMapping("/customers/{customerId}/addresses")
    public List<Address> getAddressesByCustomerId(@PathVariable Long customerId) {
        return addressService.getAddressesByCustomerId(customerId);
    }

    @GetMapping("/customers/addresses/{addressId}")
    public Address getAddressById(@PathVariable Long addressId) {
        return addressService.getAddressById(addressId);
    }

    @PutMapping("/customers/addresses/{addressId}")
    public Address updateAddress(
            @PathVariable Long addressId,
            @Valid @RequestBody Address address) {
        return addressService.updateAddress(addressId, address);
    }

    @DeleteMapping("/customers/addresses/{addressId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
    }
}