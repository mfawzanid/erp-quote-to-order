## APIs

## Create Quotation
Creates a new quotation for a specific customer (based on its `customerId` that set in token) with one or more product items.

```http
  POST /quotations
```

Request Body
| Parameter | Type        | Description                            |
| :-------- | :-------    | :------------------------------------- |
| `item.productId`| `UUID`      | id of product               |
| `item.quantity` | `INT`      | uantity of product     |

Example:
```json
{
    "items": [
        {
            "productId": "d80fffd1-7bb9-4e77-8441-f09c14724bf5",
            "quantity": 3
        }
    ]
}
```

## Approve Quotation
Approve a pending quotation that is only allowed for user with role `SALES`. This API also generate the sales order.

```http
  PUT /quotations/:id/approve
```

Query Param
| Parameter | Type        | Required   | Description                       |
| :-------- | :-------    | :--------- | :-------------------------------- |
| `id` | `UUID`       | Yes        | Id of quotation                      |

## Get Quotations
Get quotation list with pagination. 

```http
  GET /quotations?status=PENDING
```

Query Param
| Parameter | Type        | Required   | Description                       |
| :-------- | :-------    | :--------- | :-------------------------------- |
| `status` | `enum`       | No        | Enum: PENDING, APPROVED, REJECTED                       |
| `date`      | `date` | No        | Date when quotation created       |

Example: 
```http
http://localhost:3000/quotations?status=APPROVED&date=2025-07-28T08%3A00%3A12.407Z'
```

Response Body
| Parameter | Type        | Description                            |
| :-------- | :-------    | :------------------------------------- |
| `id`      | `timestamp` | id of quotation |
| `customerId` | `TEXT`      | id of customer that created               |
| `status` | `TEXT`      | quotation status     |
| `customer` | `object`      | object of customer     |
| `items` | `object`      | object of product item     |

Example:
```json
{
    "page": 1,
    "pageSize": 10,
    "total": 4,
    "data": [
        {
            "id": "f113a058-adb2-4c6d-b29b-335b7affe5fc",
            "customerId": "a3f32c16-682c-44e3-872c-53eebba15d64",
            "status": "APPROVED",
            "createdAt": "2025-07-28T08:00:12.407Z",
            "createdBy": "de70a12a-04c9-461e-bbe5-67f0f43f2e52",
            "updatedAt": "2025-07-28T08:00:37.821Z",
            "updatedBy": "a009a4c5-fdf4-4961-8563-4971f2f082ff",
            "customer": {
                "id": "a3f32c16-682c-44e3-872c-53eebba15d64",
                "name": "customer_1",
                "createdAt": "2025-07-28T04:20:17.268Z",
                "updatedAt": "2025-07-28T04:20:17.268Z"
            },
            "items": [
                {
                    "id": "688b34eb-6499-4a2a-8c22-8712b0576d9a",
                    "quotationId": "f113a058-adb2-4c6d-b29b-335b7affe5fc",
                    "productId": "d80fffd1-7bb9-4e77-8441-f09c14724bf5",
                    "quantity": 1,
                    "unitPrice": 2000,
                    "product": {
                        "id": "d80fffd1-7bb9-4e77-8441-f09c14724bf5",
                        "name": "product_1",
                        "unitPrice": 2000,
                        "quantity": 50,
                        "createdAt": "2025-07-28T04:22:01.445Z",
                        "updatedAt": "2025-07-28T04:22:01.445Z"
                    }
                }
            ]
        },
```
## Get Sales Orders
Get sales order list with pagination. 

```http
  GET /sales-orders
```

Response Body
| Parameter | Type        | Description                            |
| :-------- | :-------    | :------------------------------------- |
| `id`      | `timestamp` | id of sales order |
| `quotationId` | `TEXT`      | id of quotation               |
| `customerId` | `TEXT`      | id of customer that created               |
| `status` | `TEXT`      | quotation status     |
| `customer` | `object`      | object of customer     |
| `items` | `object`      | object of product item     |

Example:
```json
{
    "page": 1,
    "pageSize": 10,
    "total": 1,
    "data": [
        {
            "id": "920df80a-32c8-4c37-b5e6-b1bc482a41b6",
            "quotationId": "f113a058-adb2-4c6d-b29b-335b7affe5fc",
            "customerId": "a3f32c16-682c-44e3-872c-53eebba15d64",
            "status": "NEW",
            "createdAt": "2025-07-28T08:00:37.859Z",
            "createdBy": "a009a4c5-fdf4-4961-8563-4971f2f082ff",
            "customer": {
                "id": "a3f32c16-682c-44e3-872c-53eebba15d64",
                "name": "customer_1",
                "createdAt": "2025-07-28T04:20:17.268Z",
                "updatedAt": "2025-07-28T04:20:17.268Z"
            },
            "items": [
                {
                    "id": "3808f681-e419-4de7-a600-4c439129cde2",
                    "salesOrderId": "920df80a-32c8-4c37-b5e6-b1bc482a41b6",
                    "productId": "d80fffd1-7bb9-4e77-8441-f09c14724bf5",
                    "quantity": 1,
                    "unitPrice": 2000,
                    "product": {
                        "id": "d80fffd1-7bb9-4e77-8441-f09c14724bf5",
                        "name": "product_1",
                        "unitPrice": 2000,
                        "quantity": 50,
                        "createdAt": "2025-07-28T04:22:01.445Z",
                        "updatedAt": "2025-07-28T04:22:01.445Z"
                    }
                }
            ]
        }
    ]
}
```