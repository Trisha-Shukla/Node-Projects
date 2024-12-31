# eCommerce API Documentation

## Introduction

This is an eCommerce platform API built using Node.js. The API provides functionalities for user registration, authentication, product listing, cart management, and checkout.

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [API Endpoints](#api-endpoints)
  - [User Registration](#1-user-registration)
  - [Seller Registration](#2-seller-registration)
  - [User Login](#3-user-login)
  - [User Logout](#4-user-logout)
  - [User Profile](#5-user-profile)
  - [User Edit Profile](#6-edit-profile)
  - [Add Wishlist](#7-add-wishlist)
  - [Remove wishlist](#8-remove-wishlist)
  - [Add Product ](#9-add-product)
  - [Get Product List](#10-get-product-list)
  - [Get Product Details](#11-get-product-details)
  - [Add Item to Cart](#12-add-item-to-cart)
  - [View Cart](#13-view-cart)
  - [Update Cart](#14-update-cart)
  - [Delete Cart](#15-delete-cart)
  - [Verify Token](#16-verify-token)
  - [Validate Token](#17-validate-token)
  - [Create Coupon](#18-create-coupon)
  - [Get Coupon](#19-get-coupon)
  - [Apply Coupon](#20-apply-coupon)
  - [Payment Integration](#21-payment-integration)
  - [Create Order](#22-create-order)
  - [Add Blog](#23-add-blog)
  - [Get All Blog](#24-get-all-blog)
  - [Get A Blog](#25-get-a-blog)
  - [Delete A Blog](#26-delete-a-blog)
  - [Update A Blog](#27-update-a-blog)


## API Endpoints

### 1. User Registration

- **Endpoint:** `POST /api/user/register`
- **Description:** Registers a new user.

**Example Request:**


POST /api/users/register HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

**Example  Response:**

HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "User registered successfully",
  "userId": "12345"
}
### 2. Seller Registration

- **Endpoint:** `POST /api/user/register-seller`
- **Description:** Registers a new seller.

**Example Request:**


POST /api/users/register HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
### 3. User Login

- **Endpoint:** `POST /api/user/login`
- **Description:** Authenticates a user and returns a token.

**Example Request:**


POST /api/users/login HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "securepassword"
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

### 4. User Logout

- **Endpoint:** `POST /api/user/logout`
- **Description:** Logs out the authenticated user by invalidating their current session or token.

**Example Request:**


POST /api/users/logout HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "User logged out successfully"
}
### 5.Get User Profile

- **Endpoint:** `GET /api/user/profile`
- **Description:** Retrieves the authenticated user's profile information.

**Example Request:**

GET /api/users/profile HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token



**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "userId": "12345",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "createdAt": "2023-01-01T12:00:00Z"
}
### 6.Edit User Profile

- **Endpoint:** `PUT /api/user/profile`
- **Description:** Updates the authenticated user's profile information.

**Example Request:**

PUT /api/users/profile HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "username": "john_updated",
  "email": "john_updated@example.com"
}



**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Profile updated successfully",
  "user": {
    "userId": "12345",
    "username": "john_updated",
    "email": "john_updated@example.com"
  }
}

### 7. Add User's Wishlist

- **Endpoint:** `POST /api/user/wishList/add`
- **Description:** Adds a product to the authenticated user's wish list.

**Example Request:**


POST /api/users/wishList/add HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "productId": "1"
}

**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Product added to wish list",
  "wishList": [
    {
      "productId": "1",
      "name": "Product 1",
      "price": 29.99
    }
  ]
}

### 8. Edit User Profile

- **Endpoint:** `POST /api/user/wishList/remove`
- **Description:** Removes a product from the authenticated user's wish list.

**Example Request:**


POST /api/users/wishList/remove HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "productId": "1"
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Product removed from wish list",
  "wishList": []
}


### 9. Get Product List

- **Endpoint:** `GET /api/product/get`
- **Description:** Retrieves a list of all products.

**Example Request:**


GET /api/products HTTP/1.1
Host: your-domain.com


HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "productId": "1",
    "name": "Product 1",
    "price": 29.99,
    "description": "Description of Product 1"
  },
  {
    "productId": "2",
    "name": "Product 2",
    "price": 49.99,
    "description": "Description of Product 2"
  }
]

**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "productId": "1",
    "name": "Product 1",
    "price": 29.99,
    "description": "Description of Product 1"
  },
  {
    "productId": "2",
    "name": "Product 2",
    "price": 49.99,
    "description": "Description of Product 2"
  }
]

### 10. Get Product Details

- **Endpoint:** `GET /api/products/{id}`
- **Description:** Retrieves details of a specific product by ID.

**Example Request:**

GET /api/products/1 HTTP/1.1
Host: your-domain.com


{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "productId": "1",
  "name": "Product 1",
  "price": 29.99,
  "description": "Detailed description of Product 1",
  "stock": 100
}

### 11. Add Item to product

- **Endpoint:** `POST /api/product/add`
- **Description:** Adds an item to the product.

**Example Request:**

POST /api/product/add HTTP/1.1
Host: your-domain.com
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "productId": "1",
  "quantity": 2
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Item added to product",
  "productId": "67890"
}
### 12. Add Item to Cart

- **Endpoint:** `POST /api/cart`
- **Description:** Adds an item to the user's shopping cart.

**Example Request:**

POST /api/cart HTTP/1.1
Host: your-domain.com
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "productId": "1",
  "quantity": 2
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Item added to cart",
  "cartId": "67890"
}

### 13. View Cart

- **Endpoint:** `GET /api/cart`
- **Description:** Retrieves the current user's shopping cart.

**Example Request:**

GET /api/cart HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "cartId": "67890",
  "items": [
    {
      "productId": "1",
      "name": "Product 1",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98
}
### 14. update Cart

- **Endpoint:** `PUT /api/cart/update`
- **Description:** Updates current user's shopping cart.

**Example Request:**

PUT /api/cart/update HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "productId": "1",
  "quantity": 3
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "cartId": "67890",
  "items": [
    {
      "productId": "1",
      "name": "Product 1",
      "quantity": 3,
      "price": 29.99
    }
  ],
  "total": 89.97
}

### 15. Remove Item from Cart

- **Endpoint:** `DELETE /api/cart/remove`
- **Description:** Removes an item from the user's shopping cart.

**Example Request:**

DELETE /api/cart/remove HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "productId": "1"
}



**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "cartId": "67890",
  "items": [
    {
      "productId": "1",
      "name": "Product 1",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98
}
### 16. Verify Token

- **Endpoint:** `POST /api/auth/verifyToken`
- **Description:** Verifies the validity of a token without requiring authentication. This is useful for confirming the token's status before using it in further requests.

**Example Request:**

POST /api/auth/verifyToken HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "isValid": true,
  "message": "Token is valid"
}

### 17. Validate Token

- **Endpoint:** `GET /api/auth/validate-token`
- **Description:** Validates the provided token and confirms that the user is authenticated. This is often used to check a user's session status on the client side.

**Example Request:**

GET /api/auth/validate-token HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": {
    "userId": "12345",
    "username": "johndoe",
    "email": "johndoe@example.com"
  },
  "isAuthenticated": true
}

### 18. Get Coupon

- **Endpoint:** `GET /api/coupons/`
- **Description:** Retrieves a list of all available coupons for the authenticated user.

**Example Request:**

GET /api/coupons/ HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "couponId": "123",
    "code": "SAVE20",
    "discount": 20,
    "validTill": "2024-12-31T23:59:59Z"
  },
  {
    "couponId": "124",
    "code": "FREEDEL",
    "discount": 100,
    "validTill": "2024-01-31T23:59:59Z"
  }
]
### 19. Create Coupon

- **Endpoint:** `POST /api/coupons/create`
- **Description:** Allows a seller to create a new coupon.

**Example Request:**

POST /api/coupons/create HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "code": "SAVE30",
  "discount": 30,
  "validTill": "2024-12-31T23:59:59Z"
}



**Example  Response:**

HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Coupon created successfully",
  "coupon": {
    "couponId": "125",
    "code": "SAVE30",
    "discount": 30,
    "validTill": "2024-12-31T23:59:59Z"
  }
}

### 20. Apply Coupon

- **Endpoint:** `POST /api/coupons/apply`
- **Description:** Applies a coupon to the authenticated user's cart.

**Example Request:**

POST /api/coupons/apply HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "code": "SAVE20"
}


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Coupon applied successfully",
  "discount": 20,
  "cartTotal": 80
}

### 21. Payment Integration

- **Endpoint:** `POST /api/payments/create-payment-intent`
- **Description:** Creates a payment intent to process a payment. This endpoint interacts with the payment gateway (e.g., Stripe) to generate a client secret for payment processing.

**Example Request:**

POST /api/payments/create-payment-intent HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "amount": 1000,  // Amount in cents (e.g., $10.00)
  "currency": "usd"
}

**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "clientSecret": "pi_1JH9Xs2eZvKYlo2CQaDWT85A_secret_uPE8HVapIxePhh"
}

### 22. Create Order

- **Endpoint:** `POST /api/orders/create`
- **Description:** Creates a new order for the authenticated user based on their cart and payment status.

**Example Request:**

POST /api/orders/create HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "cartId": "67890",
  "paymentIntentId": "pi_1JH9Xs2eZvKYlo2CQaDWT85A"
}



**Example  Response:**

HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Order created successfully",
  "order": {
    "orderId": "123456",
    "cartId": "67890",
    "totalAmount": 100.00,
    "paymentStatus": "Paid",
    "createdAt": "2024-12-29T12:34:56Z"
  }
}
### 23. Add Blog

- **Endpoint:** `POST /api/blogs/add`
- **Description:** Adds a new blog post. This endpoint allows authenticated users to upload a blog post with an optional image..

**Example Request:**

POST /api/blogs/add HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: multipart/form-data

{
  "title": "My First Blog",
  "content": "This is the content of the blog.",
  "image": <file>  // Upload an image file
}




**Example  Response:**

HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "Blog added successfully",
  "blog": {
    "blogId": "1",
    "title": "My First Blog",
    "content": "This is the content of the blog.",
    "imageUrl": "https://your-domain.com/uploads/image.jpg",
    "createdAt": "2024-12-29T12:34:56Z"
  }
}

### 24. Get Blog

- **Endpoint:** `GET /api/blogs/get`
- **Description:** Retrieves a list of all blogs.

**Example Request:**

GET /api/blogs/get HTTP/1.1
Host: your-domain.com


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "blogId": "1",
    "title": "My First Blog",
    "content": "This is the content of the blog.",
    "imageUrl": "https://your-domain.com/uploads/image.jpg",
    "createdAt": "2024-12-29T12:34:56Z"
  },
  {
    "blogId": "2",
    "title": "My Second Blog",
    "content": "This is the content of another blog.",
    "imageUrl": null,
    "createdAt": "2024-12-30T09:45:00Z"
  }
]

### 25. Get Blog details

- **Endpoint:** `GET /api/blogs/get/:id`
- **Description:** Retrieves details of a specific blog post by ID.

**Example Request:**

GET /api/blogs/get/1 HTTP/1.1
Host: your-domain.com



**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "blogId": "1",
  "title": "My First Blog",
  "content": "This is the content of the blog.",
  "imageUrl": "https://your-domain.com/uploads/image.jpg",
  "createdAt": "2024-12-29T12:34:56Z"
}

### 26. Delete Blog

- **Endpoint:** `DELETE /api/blogs/delete/:id`
- **Description:** Deletes a blog post by ID.

**Example Request:**

DELETE /api/blogs/delete/1 HTTP/1.1
Host: your-domain.com


**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Blog deleted successfully"
}

### 27. Update Blog

- **Endpoint:** `PUT /api/blogs/update/:id`
- **Description:** Updates a blog post by ID. Only authenticated users can update a blog.

**Example Request:**

PUT /api/blogs/update/1 HTTP/1.1
Host: your-domain.com
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "title": "Updated Blog Title",
  "content": "Updated blog content."
}



**Example  Response:**

HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Blog updated successfully",
  "blog": {
    "blogId": "1",
    "title": "Updated Blog Title",
    "content": "Updated blog content.",
    "imageUrl": "https://your-domain.com/uploads/image.jpg",
    "updatedAt": "2024-12-29T14:00:00Z"
  }
}


