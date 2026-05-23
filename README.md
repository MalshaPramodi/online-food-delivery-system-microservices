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

````text
http://localhost:9000/customers
````

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

## Services

| Service            | Description                                                                    | Port |
| ------------------ | ------------------------------------------------------------------------------ | ---: |
| Service Discovery  | Eureka server used by backend services for service registration and discovery. | 8761 |
| API Gateway        | Entry point for client requests and Eureka-registered service routing.         | 9000 |
| Order Service      | Manages customer orders and order history.                                     | 9001 |
| Restaurant Service | Manages restaurant and menu-related features.                                  | 9002 |
| Customer Service   | Manages customer profile, address, and payment information.                    | 9003 |
| Payment Service    | Manages payment processing and payment history.                                | 9004 |


## Docker Database Setup

The project uses Docker Compose to run PostgreSQL databases for the backend services. This allows each developer to start the required databases without manually creating them in a local PostgreSQL installation.

### Required Tools

- Docker Desktop
- Docker Compose

### Start Databases

Run this command from the project root folder:

```bash
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
order-service -> order_db
payment-service -> payment_db

Create these databases in PostgreSQL for Order and Payment services:

```sql
CREATE DATABASE order_db;
CREATE DATABASE payment_db;
```


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

````
