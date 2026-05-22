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

## Services

| Service            | Description                                                                    | Port |
| ------------------ | ------------------------------------------------------------------------------ | ---: |
| Service Discovery  | Eureka server used by backend services for service registration and discovery. | 8761 |
| API Gateway        | Entry point for client requests and Eureka-registered service routing.         | 9000 |
| Restaurant Service | Manages restaurant and menu-related features.                                  | 9002 |
| Customer Service   | Manages customer profile, address, and payment information.                    | 9003 |

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
order-service  -> localhost:5435 -> order-db container-> order_db

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

````
