package com.group.onlinefooddelivery.customer.service.impl;

import com.group.onlinefooddelivery.customer.dao.AddressRepository;
import com.group.onlinefooddelivery.customer.domain.Address;
import com.group.onlinefooddelivery.customer.domain.Customer;
import com.group.onlinefooddelivery.customer.exception.CustomerNotFoundException;
import com.group.onlinefooddelivery.customer.service.AddressService;
import com.group.onlinefooddelivery.customer.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final CustomerService customerService;

    public AddressServiceImpl(AddressRepository addressRepository, CustomerService customerService) {
        this.addressRepository = addressRepository;
        this.customerService = customerService;
    }

    @Override
    public Address addAddress(Long customerId, Address address) {
        Customer customer = customerService.getCustomerById(customerId);
        address.setCustomer(customer);
        return addressRepository.save(address);
    }

    @Override
    public List<Address> getAddressesByCustomerId(Long customerId) {
        customerService.getCustomerById(customerId);
        return addressRepository.findByCustomerId(customerId);
    }

    @Override
    public Address getAddressById(Long addressId) {
        return addressRepository.findById(addressId)
                .orElseThrow(() -> new CustomerNotFoundException("Address not found with id: " + addressId));
    }

    @Override
    public Address updateAddress(Long addressId, Address address) {
        Address existingAddress = getAddressById(addressId);

        existingAddress.setStreet(address.getStreet());
        existingAddress.setCity(address.getCity());
        existingAddress.setState(address.getState());
        existingAddress.setPostalCode(address.getPostalCode());
        existingAddress.setCountry(address.getCountry());

        return addressRepository.save(existingAddress);
    }

    @Override
    public void deleteAddress(Long addressId) {
        Address existingAddress = getAddressById(addressId);
        addressRepository.delete(existingAddress);
    }
}