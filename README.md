# Online Food Delivery System

Microservices-based online food delivery platform with API Gateway, service discovery, frontend UI, PostgreSQL, and Kafka support.

## Planned modules

- API Gateway
- Service Discovery
- Order Service
- Restaurant Service
- Customer Management Service
- Payment Service
- Frontend
- Infrastructure and Docker support

## Service Discovery

The system uses a Spring Cloud Netflix Eureka server for service discovery.

- Service name: `service-discovery`
- Port: `8761`
- Dashboard: `http://localhost:8761`
- Other backend services will register with this server later.

## API Gateway

The system uses a Spring Cloud Gateway service as the single entry point for client requests.

- Service name: `api-gateway`
- Port: `9000`
- Eureka registration: `http://localhost:8761/eureka/`
- Base URL: `http://localhost:9000`
- Backend service routes will be added through Eureka-registered service names.

## Restaurant Service

The system uses a Spring Boot Restaurant service to manage restaurant and menu-related features.

- Service name: `restaurant-service`
- Port: `9002`
- Eureka registration: `http://localhost:8761/eureka/`
- Database: `restaurant_db`
- Base URL: `http://localhost:9002`
- This service will contain restaurant and menu APIs.

### Restaurant Service REST Endpoints

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| POST   | `/restaurants`      | Create a new restaurant   |
| GET    | `/restaurants`      | Get all restaurants       |
| GET    | `/restaurants/{id}` | Get a restaurant by ID    |
| PUT    | `/restaurants/{id}` | Update a restaurant by ID |
| DELETE | `/restaurants/{id}` | Delete a restaurant by ID |

Restaurant APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/restaurants
```

Example create request:

```json
{
  "name": "Pizza Palace",
  "location": "Colombo",
  "cuisineType": "Italian",
  "active": true
}
```

### Food Menu REST Endpoints

| Method | Endpoint                            | Description                          |
| ------ | ----------------------------------- | ------------------------------------ |
| POST   | `/restaurants/{restaurantId}/menus` | Add a food menu item to a restaurant |
| GET    | `/restaurants/{restaurantId}/menus` | Get all menu items for a restaurant  |
| GET    | `/restaurants/menus/{menuId}`       | Get a menu item by ID                |
| PUT    | `/restaurants/menus/{menuId}`       | Update a menu item                   |
| DELETE | `/restaurants/menus/{menuId}`       | Delete a menu item                   |

Food Menu APIs can be accessed through the API Gateway using:

````text
http://localhost:9000/restaurants/{restaurantId}/menus
http://localhost:9000/restaurants/menus/{menuId}

Example create request:

```json
{
  "foodName": "Chicken Pizza",
  "foodDescription": "Large chicken pizza with cheese",
  "foodCategory": "Pizza",
  "foodPrice": 2500.00,
  "available": true
}
````

## Customer Service

The system uses a Spring Boot Customer service to manage customer-related features.

- Service name: `customer-service`
- Port: `9003`
- Eureka registration: `http://localhost:8761/eureka/`
- Database: `customer_db`
- Base URL: `http://localhost:9003`
- This service will contain customer, address, and customer payment information APIs.

### Customer Service REST Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/customers`      | Create a new customer   |
| GET    | `/customers`      | Get all customers       |
| GET    | `/customers/{id}` | Get a customer by ID    |
| PUT    | `/customers/{id}` | Update a customer by ID |
| DELETE | `/customers/{id}` | Delete a customer by ID |

Customer APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/customers

```

### Customer Address REST Endpoints

The Customer Service supports managing multiple delivery addresses for each customer. A customer profile can be created first, and one or more addresses can be added later using the customer address APIs.

| Method | Endpoint                            | Description                     |
| ------ | ----------------------------------- | ------------------------------- |
| POST   | `/customers/{customerId}/addresses` | Add an address for a customer   |
| GET    | `/customers/{customerId}/addresses` | Get all addresses of a customer |
| GET    | `/customers/addresses/{addressId}`  | Get an address by ID            |
| PUT    | `/customers/addresses/{addressId}`  | Update an address               |
| DELETE | `/customers/addresses/{addressId}`  | Delete an address               |

Customer Address APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/customers/{customerId}/addresses
http://localhost:9000/customers/addresses/{addressId}

```

### Customer Payment Method REST Endpoints

The Customer Service supports storing customer payment method details for future checkout and payment workflows. This stores customer payment method metadata only. Actual payment processing is handled separately by the Payment Service.

| Method | Endpoint                                       | Description                           |
| ------ | ---------------------------------------------- | ------------------------------------- |
| POST   | `/customers/{customerId}/payment-methods`      | Add a payment method for a customer   |
| GET    | `/customers/{customerId}/payment-methods`      | Get all payment methods of a customer |
| GET    | `/customers/payment-methods/{paymentMethodId}` | Get a payment method by ID            |
| PUT    | `/customers/payment-methods/{paymentMethodId}` | Update a payment method               |
| DELETE | `/customers/payment-methods/{paymentMethodId}` | Delete a payment method               |

Customer Payment Method APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/customers/{customerId}/payment-methods
http://localhost:9000/customers/payment-methods/{paymentMethodId}

```

`````

## Order Service

The system uses a Spring Boot Order service to manage customer orders and order history.

- Service name: `order-service`
- Port: `9001`
- Eureka registration: `http://localhost:8761/eureka/`
- Database: `order_db`
- Base URL: `http://localhost:9001`
- This service contains order creation and order query APIs.

### Order Service REST Endpoints

| Method | Endpoint                           | Description                     |
| ------ | ---------------------------------- | ------------------------------- |
| POST   | `/order/create`                    | Create a new order              |
| GET    | `/order/{orderId}`                 | Get an order by ID              |
| GET    | `/order/user/{userId}`             | Get all orders for a customer   |
| GET    | `/order/restaurant-orders/{id}`    | Get all orders for a restaurant |
| GET    | `/order/restaurant/{restaurantId}` | Get restaurant details          |

Order APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/order
```

Example create order request:

```json
{
  "userId": 1,
  "restaurantId": 1,
  "restaurantName": "Pizza House",
  "totalPrice": 2500,
  "foodItems": [
    {
      "foodMenuId": 1,
      "foodName": "Chicken Pizza",
      "foodPrice": 2000,
      "quantity": 1
    },
    {
      "foodMenuId": 2,
      "foodName": "Coke",
      "foodPrice": 500,
      "quantity": 1
    }
  ]
}
```

## Payment Service

The system uses a Spring Boot Payment service to manage payment processing and payment history.

- Service name: `payment-service`
- Port: `9004`
- Eureka registration: `http://localhost:8761/eureka/`
- Database: `payment_db`
- Base URL: `http://localhost:9004`
- This service contains payment creation and payment history APIs.

### Payment Service REST Endpoints

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/payment/save`            | Save/process a payment          |
| GET    | `/payment/all`             | Get all payments                |
| GET    | `/payment/{id}`            | Get payment by ID               |
| GET    | `/payment/order/{orderId}` | Get payment history by order ID |

Payment APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/payment
```

Example payment request:

```json
{
  "orderId": 1,
  "customerId": 1,
  "totalPrice": 2500
}
```

Expected payment response:

```json
{
  "id": 1,
  "orderId": 1,
  "customerId": 1,
  "paymentTime": "2026-05-23T20:00:00",
  "totalPrice": 2500,
  "orderStatus": "PAID"
}
```
## Notification Service

The system uses a Spring Boot Notification Service to manage order and payment related notifications.

- Service name: `notification-service`
- Port: `9005`
- Eureka registration: `http://localhost:8761/eureka/`
- Database: `notification_db`
- Base URL: `http://localhost:9005`
- API Gateway URL: `http://localhost:9000/notifications`

The Notification Service stores notification records generated by other services. Currently, the Order Service creates notifications when an order is placed and when payment is completed.

### Notification Service REST Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/notifications` | Create a notification |
| GET | `/notifications` | Get all notifications |
| GET | `/notifications/{id}` | Get a notification by ID |
| GET | `/notifications/customer/{customerId}` | Get notifications for a customer |
| GET | `/notifications/order/{orderId}` | Get notifications for an order |
| PUT | `/notifications/{id}/sent` | Mark a notification as sent |

Notification APIs can be accessed through the API Gateway using:

```text
http://localhost:9000/notifications

## Services

| Service              | Description                                                                    | Port |
| -------------------- | ------------------------------------------------------------------------------ | ---: |
| Service Discovery    | Eureka server used by backend services for service registration and discovery. | 8761 |
| API Gateway          | Entry point for client requests and Eureka-registered service routing.         | 9000 |
| Order Service        | Manages customer orders and order history.                                     | 9001 |
| Restaurant Service   | Manages restaurant and menu-related features.                                  | 9002 |
| Customer Service     | Manages customer profile, address, and payment information.                    | 9003 |
| Payment Service      | Manages payment processing and payment history.                                | 9004 |
| Notification Service | Manages order and payment notification records.                                | 9005 |

## Docker Database Setup

The project uses Docker Compose to run PostgreSQL databases for the backend services. This allows each developer to start the required databases without manually creating them in a local PostgreSQL installation.

### Required Tools

- Docker Desktop
- Docker Compose

### Start Databases

Run this command from the project root folder:

````bash
docker compose up -d

### Functionality

Docker is used to support the distributed nature of the system by providing isolated and reproducible infrastructure components. In this project, Docker Compose runs separate PostgreSQL database containers for the Restaurant Service and Customer Service.

Each microservice has its own database, which follows the database-per-service pattern commonly used in microservice architectures. Docker allows these databases to run as independent containers with separate ports, storage volumes, and configuration.

In the current implementation, the Spring Boot services run locally using Maven, while the database layer runs in Docker. This setup helps demonstrate distributed system principles such as service independence, isolated data ownership, environment consistency, and infrastructure reproducibility.

Docker helps the project by:

- running separate database instances for different microservices
- supporting the database-per-service architecture
- reducing dependency on manually configured local databases
- giving all developers a consistent environment
- making the system easier to run, test, and demonstrate

localhost:5433 -> restaurant-db container -> restaurant_db
localhost:5434 -> customer-db container -> customer_db
order-service  -> localhost:5435 -> order-db container-> order_dborder-service -> order_db
payment-service -> payment_db
notification-service -> localhost:5437 -> notification-db -> notification_db

Create these databases in PostgreSQL for Order and Payment services:

```sql
CREATE DATABASE order_db;
CREATE DATABASE payment_db;
```

## Current Service Integration Flow

The current backend flow demonstrates service-to-service communication through Eureka-registered service names.

1. A client sends an order request through the API Gateway.
2. API Gateway routes the request to Order Service.
3. Order Service saves the order in `order_db`.
4. Order Service creates an `ORDER_CREATED` notification through Notification Service.
5. Order Service calls Payment Service to process payment.
6. Payment Service saves payment details in `payment_db` and returns `PAID` status.
7. Order Service updates the order status to `PAID`.
8. Order Service creates a `PAYMENT_COMPLETED` notification through Notification Service.
9. Notification records are stored in `notification_db`.

## Running Services Locally

Run each service from its own folder.

```bash
### Service Discovery
cd service-discovery
mvn spring-boot:run

Start Service Discovery first, then run:

### API Gateway
cd api-gateway
mvn spring-boot:run

### Order Service
cd order-service
mvn spring-boot:run

### Restaurant Service
cd restaurant-service
mvn spring-boot:run

### Customer Service
cd customer-service
mvn spring-boot:run

### Payment Service
cd payment-service
mvn spring-boot:run

### Notification Service
cd notification-service
mvn spring-boot:run

`````
