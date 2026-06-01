package com.group.onlinefooddelivery.customer.service;

import com.group.onlinefooddelivery.customer.domain.Customer;
import com.group.onlinefooddelivery.customer.dto.CustomerAuthResponse;
import com.group.onlinefooddelivery.customer.dto.CustomerLoginRequest;
import java.util.List;

public interface CustomerService {

    Customer createCustomer(Customer customer);

    CustomerAuthResponse login(CustomerLoginRequest request);

    List<Customer> getAllCustomers();

    Customer getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);

    void deleteCustomer(Long id);
}
