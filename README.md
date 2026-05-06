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

## Services

| Service           | Description                                                                    | Port |
| ----------------- | ------------------------------------------------------------------------------ | ---: |
| Service Discovery | Eureka server used by backend services for service registration and discovery. | 8761 |
| API Gateway       | Entry point for client requests and Eureka-registered service routing.         | 9000 |

## Running Services Locally

Run each service from its own folder.

### Service Discovery

````bash
cd service-discovery
mvn spring-boot:run

### API Gateway
```bash
cd api-gateway
mvn spring-boot:run

````
