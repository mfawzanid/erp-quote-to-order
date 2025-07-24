# Simple ERP

A simple ERP (Enterprise Resource Planning) that allows sales teams to create quotations and convert them into sales orders. This project includes authentication, role-based access control, and basic product and quotation management.

## Features

- Customer and product management
- Quotation creation and conversion to order
- Simple authentication 
- Built with:
  - Backend: Node.js, TypeScript, Express, PostgreSQL
  - Frontend: Next.js
  - Docker for containerized deployment

## Checklist Features

### Core APIs

- [x] `POST /quotations`
- [x] `PUT /quotations/:id/approve`
- [x] `POST /sales-orders` 
- [x] `GET /quotations` (paginated, filter by status/date)
- [x] `GET /sales-orders?quotationId={id}`

### Auth & Access Control

- [x] JWT-based authentication in backend 
- [ ] JWT-based authentication implementation in frontend
- [x] Roles: `customer`, `sales`
- [x] Enforce role checks

### 🔧 Tracking & Auditing 

- [ ] Track status history with audit fields: `createdBy`, `approvedBy`

## Getting Started

### How to Run
Start all services (backend, database, frontend):
```bash
docker compose up --build
```

- Backend API: http://localhost:3000
- Frontend: http://localhost:3001