## Database Schema

This project uses **PostgreSQL** with **Prisma ORM** for schema management. Below is the overview of all models and their relationships.

---

### User

Represents a system user.

| Field         | Type     | Notes                              |
|---------------|----------|------------------------------------|
| id            | String   | UUID (Primary Key)                 |
| name          | String   |                                    |
| email         | String   | Unique                             |
| role          | Role     | Enum: `CUSTOMER` \| `SALES`        |
| createdAt     | DateTime | Defaults to `now()`                |
| customerId    | String?  | FK to `Customer` if user is a CUSTOMER |
| customer      | Customer?| Relation to customer (optional)    |
| statusChanges | QuotationStatusHistory[] | Status changes made by this user |

---

### Customer

Represents a client company.

| Field       | Type     | Notes                  |
|-------------|----------|------------------------|
| id          | String   | UUID (Primary Key)     |
| name        | String   | Company name           |
| createdAt   | DateTime | Defaults to `now()`    |
| updatedAt   | DateTime | Auto-updated timestamp |
| users       | User[]   | Users associated with this customer |
| quotations  | Quotation[] | Related quotations  |
| salesOrders | SalesOrder[] | Related sales orders |

---

### Product

Product information available to sell.

| Field       | Type     | Notes                  |
|-------------|----------|------------------------|
| id          | String   | UUID (Primary Key)     |
| name        | String   |                        |
| unitPrice   | Int      | Price per unit         |
| quantity    | Int      | Available stock        |
| createdAt   | DateTime | Defaults to `now()`    |
| updatedAt   | DateTime | Auto-updated timestamp |

---

### Quotation

Represents a quotation for a customer.

| Field        | Type            | Notes                          |
|--------------|-----------------|--------------------------------|
| id           | String          | UUID (Primary Key)             |
| customerId   | String          | FK to `Customer`               |
| customer     | Customer        | Relation                       |
| status       | QuotationStatus | Enum: `PENDING`, `APPROVED`, `REJECTED` |
| createdAt    | DateTime        | Defaults to `now()`            |
| createdBy    | String          | User ID                        |
| updatedAt    | DateTime        | Auto-updated timestamp         |
| updatedBy    | String?         | Updated by user ID (optional)  |
| items        | QuotationItem[] | Items included in quotation    |
| salesOrder   | SalesOrder?     | Optional link to sales order   |
| statusHistory| QuotationStatusHistory[] | Status history        |

---

### QuotationItem

Items inside a quotation.

| Field        | Type     | Notes                        |
|--------------|----------|------------------------------|
| id           | String   | UUID (Primary Key)           |
| quotationId  | String   | FK to `Quotation`            |
| productId    | String   | FK to `Product`              |
| quantity     | Int      | Quantity requested           |
| unitPrice    | Int      | Price at time of quotation   |

Unique Constraint: `(quotationId, productId)`

---

### SalesOrder

Represents a confirmed quotation that is now a sales order.

| Field        | Type             | Notes                     |
|--------------|------------------|---------------------------|
| id           | String           | UUID (Primary Key)        |
| quotationId  | String           | Unique FK to `Quotation`  |
| customerId   | String           | FK to `Customer`          |
| status       | SalesOrderStatus | Enum: `NEW`, `PROCESSING`, `COMPLETED` |
| createdAt    | DateTime         | Defaults to `now()`       |
| createdBy    | String           | User ID                   |
| items        | SalesOrderItem[] | Items in the sales order  |

---

### SalesOrderItem

Items inside a sales order.

| Field        | Type     | Notes                          |
|--------------|----------|--------------------------------|
| id           | String   | UUID (Primary Key)             |
| salesOrderId | String   | FK to `SalesOrder`             |
| productId    | String   | FK to `Product`                |
| quantity     | Int      | Quantity confirmed             |
| unitPrice    | Int      | Price at time of sale          |

Unique Constraint: `(salesOrderId, productId)`

---

### QuotationStatusHistory

Tracks status changes of quotations.

| Field          | Type            | Notes                            |
|----------------|------------------|----------------------------------|
| id             | String           | UUID (Primary Key)               |
| quotationId    | String           | FK to `Quotation`                |
| oldStatus      | QuotationStatus  |                                  |
| newStatus      | QuotationStatus  |                                  |
| changedAt      | DateTime         | Defaults to `now()`              |
| changedBy      | String           | FK to `User` (changedByUser)     |
| changedByUser  | User             | Relation ("UserStatusChanges")   |

---

### Enums

#### `Role`
- `CUSTOMER`
- `SALES`

#### `QuotationStatus`
- `PENDING`
- `APPROVED`
- `REJECTED`

#### `SalesOrderStatus`
- `NEW`
- `PROCESSING`
- `COMPLETED`

---

### Relations Overview

- `User.customerId` → optional FK to `Customer`
- `Quotation.customerId` → FK to `Customer`
- `QuotationItem` ↔ `Quotation` + `Product`
- `SalesOrder.quotationId` → FK to `Quotation` 
- `SalesOrderItem` ↔ `SalesOrder` + `Product`
- `QuotationStatusHistory` ↔ `Quotation` + `User`

