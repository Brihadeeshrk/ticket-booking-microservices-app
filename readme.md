# Ticketing Microservices Application

A ticketing platform built with microservices architecture using Node.js, TypeScript, Docker, and Kubernetes.

## Services Overview

### Auth Service

- Handles user authentication (sign up, sign in, sign out)
- Manages JWT-based sessions
- Uses MongoDB for user data storage

### Tickets Service

- Manages ticket creation and updates
- Handles ticket listing and individual ticket viewing
- Uses MongoDB for ticket storage
- Publishes events when tickets are created/updated

### Orders Service

- Manages order creation and cancellation
- Handles order expiration
- Uses MongoDB for order storage
- Subscribes to ticket events
- Publishes order events

### Payments Service

- Processes payments using Stripe
- Handles payment verification
- Uses MongoDB for payment records
- Subscribes to order events
- Publishes payment events

### Expiration Service

- Handles order expiration timing
- Uses Redis for job queue
- Publishes expiration events

### Client Service

- Next.js frontend application
- Handles all user interactions
- Server-side rendered React

### Common Library

- Shared code between services
- Common middleware
- Event definitions
- Error handling

## Prerequisites

- Docker
- Kubernetes
- Skaffold
- Node.js
- A Stripe account (for payments)

## Setup Instructions

1. Install dependencies:

   ```bash
   cd auth && npm install
   cd ../client && npm install
   cd ../tickets && npm install
   cd ../orders && npm install
   cd ../payments && npm install
   cd ../expiration && npm install
   ```

2. Add the following entries to your hosts file (`/etc/hosts` on Unix or `C:\Windows\System32\Drivers\etc\hosts` on Windows):

   ```
   127.0.0.1 ticketing.dev
   ```

3. Create Kubernetes secrets:

   ```bash
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_key
   kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your_stripe_secret_key
   ```

4. Start the application:
   ```bash
   skaffold dev
   ```

## Testing

Each service can be tested individually:

```bash
cd [service_name]
npm run test
```

## Architecture

- Each service runs in its own Docker container.
- Services communicate through NATS Streaming Server.
- MongoDB instances are deployed per service.
- Ingress-NGINX handles external traffic routing.
- All services are deployed to Kubernetes.

### API Routes

The application exposes various endpoints through the ingress controller at ticketing.dev:

- **Auth:** `/api/users/_`
- **Tickets:** `/api/tickets/_`
- **Orders:** `/api/orders/_`
- **Payments:** `/api/payments/_`

### Development Notes

- The project uses TypeScript for type safety.
- Tests are written using Jest.
- CI/CD is handled through GitHub Actions.
- Event-driven architecture for service communication.
- Optimistic concurrency control using version numbers.

### Environment Variables

Each service requires specific environment variables. These are automatically set through Kubernetes deployments, but for local development, you'll need:

- `JWT_KEY`
- `MONGO_URI`
- `NATS_URL`
- `NATS_CLUSTER_ID`
- `NATS_CLIENT_ID`
- `STRIPE_KEY` (for payments service)

### Common Issues

- If services fail to start, ensure all Kubernetes secrets are properly set.
- For development, make sure skaffold is properly configured.
- Ensure Docker Desktop is running with Kubernetes enabled.
- Check that ingress-nginx is properly installed in your cluster.

### Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Push to the branch.
5. Create a Pull Request.

The project uses GitHub Actions for CI/CD, which will automatically run tests when a pull request is created.
