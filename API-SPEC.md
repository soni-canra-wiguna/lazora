# API SPESIFICATION

## Register

POST `/api/register`

Request Body :

Response Body (Success) :

Response Body (Failed) :

---

GET `/api/register`

parameters :

- `search` (optional)

Request Body :

Response Body (Success) :

Response Body (Failed) :

---

GET `/api/register/:id`

parameters :

- `id` (required)

Request Body :

Response Body (Success) :

Response Body (Failed) :

---

PATCH `/api/register/:id`
parameters :

- `id` (required)

Request Body :

Response Body (Success) :

Response Body (Failed) :

---

DELETE `/api/register/:id`

parameters :

- `id` (required)

Request Body :

Response Body (Success) :

Response Body (Failed) :

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
    "updatedAt": Date,
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
