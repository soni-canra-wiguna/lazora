# API SPESIFICATION

## Register

POST `/api/register`

Request Body :

```json
{
  "username": "string",
  "email": "string (email format)",
  "password": "string(hash using bycrypt)",
  "emailVerified": null, // optional
  "image": "string (URL) | null", // optional
  "role": "string" // optional default (BUYER)
}
```

Response Body (Success) :

```json
{
  "message": "register success",
  "status": 201
}
```

Response Body (Failed) :

```json
{
  "message": "User already exist",
  "status": 400
}
```

```json
{
  "message": "Internal sever error",
  "status": 500
}
```

GET `/api/register`

parameters :

- `search` (optional)

Response Body (Success) :

```json
{
  "message": "Data retrieved successfully",
  "status": 200,
  "users": [
    {
      "id": "string",
      "username": "string",
      "email": "string (email format)",
      "password": "string(hash using bycrypt)",
      "emailVerified": "string (ISO 8601 datetime)" | null,
      "image": "string (URL) | null",
      "role": "string",
      "createdAt": Date, // example: "2024-04-21T11:34:39.124Z",
      "updatedAt": Date
    }
  ],
}
```

```json
// search results
{
  "message": "Users successfully retrieved",
  "users": [
    {
      "id": "string",
      "username": "string",
      "email": "string (email format)",
      "password": "string(hash using bycrypt)",
      "emailVerified": null,
      "image": "string (URL) | null",
      "role": "string",
      "createdAt": Date,
      "updatedAt": Date
    }
  ],
  "status": 200,
}
```

Response Body (Failed) :

```json
{
  "message": "users not found",
  "status": 404
}
```

```json
{
  "message": "Internal server error",
  "status": 500
}
```

---

GET `/api/register/:id`

parameters :

- `id` (required)

Response Body (Success) :

```json
{
  "message": "user data retrieval successful",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string (email format)",
    "password": "string",
    "emailVerified": "string (ISO 8601 datetime) | null",
    "image": "string (URL) | null",
    "role": "string",
    "createdAt": Date,
    "updatedAt": Date
  },
  "status": 200
}
```

Response Body (Failed) :

```json
{
  "message": "User not found",
  "status": 404
}
```

```json
{
  "message": "Internal server error",
  "status": 500
}
```

---

PATCH `/api/register/:id`
parameters :

- `id` (required)

Request Body :

```json
{
  "username": "string",
  "email": "string (email format)",
  "password": "string(hash using bycrypt)",
  "emailVerified": null, // optional
  "image": "string (URL) | null", // optional
  "role": "string" // optional default (BUYER)
}
```

Response Body (Success) :

```json
{
  "message": "data successfully updated.",
  "status": 200
}
```

Response Body (Failed) :

```json
{
  "message": "user not found, can't updated",
  "status": 404
}
```

```json
{
  "message": "Internal server error",
  "status": 500
}
```

---

DELETE `/api/register/:id`

parameters :

- `id` (required)

Response Body (Success) :

```json
{
  "message": "User was deleted.",
  "status": 200
}
```

Response Body (Failed) :

```json
{
  "message": "Internal server error",
  "status": 500
}
```

## Products

POST `/api/products`

Request Body :

```json
{
  "title": "New Product",
  "price": 20000,
  "description": "This is a new product",
  "stock": 50,
  "categories": [
    {
      "id": "categoryId",
      "title": "Category Title"
    }
  ],
  "images": [
    {
      "id": "imageId",
      "image": "http://example.com/image.jpg"
    }
  ]
}
```

Response Body (Success) :

```json
{
  "message": "product successfully created",
  "status": 201
}
```

Response Body (Failed) :

```json
{
  "message": "Validation error",
  "errors": "string",
  "status": 400
}
```

```json
{
  "message": "internal server error",
  "status": 500
}
```

GET `/api/products`

parameters :

- `page` _default 1_ (optional)
- `limit` _default 20_ (optional)
- `sortBy` (optional)
- `search` (optional)

Response Body (Success) :

```json
{
  "message": "Products successfully retrieved",
  "status": 200,
  "data": [
    {
      "id": "string",
      "title": "string",
      "price": number,
      "description": "string",
      "stock": number,
      "createdAt": "string",
      "updatedAt": "string",
      "images": [
        {
          "id": "string",
          "image": "string",
          "productId": "string"
        }
      ],
      "categories": [
        {
          "id": "string",
          "title": "string",
          "productId": "string"
        }
      ],
      "comments": [
        {
          "id": "string",
          "message": "string",
          "username": "string",
          "email": "string",
          "image": "string",
          "role": "string",
          "productId": "string",
          "createdAt": "string",
          "updatedAt": "string"
        }
      ]
    }
  ],
  "currentPage": number,
  "totalPages": number,
  "totalProductsPerPage": number,
  "totalProducts": number,
}
```

Response Body (Failed) :

```json
{
  "message": "data not found",
  "status": 404,
},
```

```json
{
  "message": "search result not found",
  "status": 404,
},
```

```json
{
  "message": "internal server error",
  "status": 500
}
```

GET `/api/products/:id`

Parameters:

- `id` (required)

Response Body (Success) :

```json
{
  "message": "Product successfully retrieved",
  "status": 200,
  "data": {
    "id": "string",
    "title": "string",
    "price": "number",
    "description": "string",
    "stock": "number",
    "createdAt": Date,
    "updatedAt": Date
    "images": [
      {
        "id": "string",
        "image": "string (URL)",
        "productId": "string"
      }
    ],
    "categories": [
      {
        "id": "string",
        "title": "string",
        "productId": "string"
      }
    ],
    "comments": [
      {
        "id": "string",
        "message": "string",
        "username": "string",
        "email": "string (email format)",
        "image": "string (URL)",
        "role": "string",
        "productId": "string",
        "createdAt": Date,
        "updatedAt": Date
      }
    ]
  },
}
```

Response Body (Failed) :

```json
{
  "message": "product not found",
  "status": 404,
},
```

```json
{
  "message": "internal server error",
  "status": 500
}
```

DELETE `/api/products/:id`

Parameters:

- `id` (required)

Response Body (Success) :

```json
{
  "message": "product deleted",
  "status": 201
}
```

Response Body (Failed) :

```json
{
  "message": "internal server error",
  "status": 500
}
```

PATCH `/api/products/:id` _still developing_

## Banners

POST `/api/banners`

Request Body :

```json
{
  "title": "string",
  "description": "string",
  "title_button": "string",
  "href_button": "string",
  "image": "string",
  "alt_image": "string",
  "background_color": "string"
}
```

Response Body (Success) :

```json
{
  "message": "banner successfully created!!",
  "status": 201,
},
```

Response Body (Failed) :

```json
{
  "message": "Validation error",
  "errors": error.errors,
  "status": 400,
}
```

```json
{
  "message": "internal server error",
  "status": 500
}
```

GET `/api/banners`

Response Body (Success) :

```json
{
  "message": "Data retrieved successfully",
  "status": 200,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "title_button": "string",
      "href_button": "string",
      "image": "string",
      "alt_image": "string",
      "background_color": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "message": "data not found",
  "status": 404,
},
```

```json
{
  "message": "internal server error",
  "status": 500
}
```

PATCH `/api/banners/:id`

Parameters :

- `id` (required)

Request Body :

```json
{
  "title": "string",
  "description": "string",
  "title_button": "string",
  "href_button": "string",
  "image": "string",
  "alt_image": "string",
  "background_color": "string"
}
```

Response Body (Success) :

```json
{
  "message": "banner successfully updated",
  "status": 201,
},
```

Response Body (Failed) :

```json
{
  "message": "banner not found, can't updated",
  "status": 404
}
```

```json
{
  "message": "internal server error",
  "status": 500
}
```

DELETE `/api/banners/:id`

Parameters :

- `id` (required)

Response Body (Success) :

```json
{
  "message": "banner was deleted",
  "status": 200,
},
```

Response Body (Failed) :

```json
{
  "status": 500,
  "message": "Internal server error"
}
```
