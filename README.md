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

Example create request:

```json
{
  "name": "Pizza Palace",
  "location": "Colombo",
  "cuisineType": "Italian",
  "active": true
}
```

## Customer Service

The system uses a Spring Boot Customer service to manage customer-related features.

- Service name: `customer-service`
- Port: `9003`
- Eureka registration: `http://localhost:8761/eureka/`
- Database: `customer_db`
- Base URL: `http://localhost:9003`
- This service will contain customer, address, and customer payment information APIs.

## Services

| Service            | Description                                                                    | Port |
| ------------------ | ------------------------------------------------------------------------------ | ---: |
| Service Discovery  | Eureka server used by backend services for service registration and discovery. | 8761 |
| API Gateway        | Entry point for client requests and Eureka-registered service routing.         | 9000 |
| Restaurant Service | Manages restaurant and menu-related features.                                  | 9002 |
| Customer Service   | Manages customer profile, address, and payment information.                    | 9003 |

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

```
