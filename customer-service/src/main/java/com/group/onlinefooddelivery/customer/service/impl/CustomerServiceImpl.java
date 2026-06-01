package com.group.onlinefooddelivery.customer.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.group.onlinefooddelivery.customer.dao.CustomerRepository;
import com.group.onlinefooddelivery.customer.domain.Customer;
import com.group.onlinefooddelivery.customer.exception.CustomerNotFoundException;
import com.group.onlinefooddelivery.customer.service.CustomerService;
import org.springframework.stereotype.Service;
import com.group.onlinefooddelivery.customer.dto.CustomerAuthResponse;
import com.group.onlinefooddelivery.customer.dto.CustomerLoginRequest;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer createCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    @Override
    public CustomerAuthResponse login(CustomerLoginRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new CustomerAuthResponse(
                customer.getId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getPhone());
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException(id));

    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        Customer existingCustomer = getCustomerById(id);

        existingCustomer.setFullName(customer.getFullName());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setActive(customer.isActive());

        return customerRepository.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer existingCustomer = getCustomerById(id);
        customerRepository.delete(existingCustomer);
    }
}
