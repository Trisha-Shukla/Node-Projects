# Twitter Clone API Documentation

This documentation provides a detailed overview of the API endpoints for the Twitter Clone project. It includes descriptions, request/response formats, and example usage.

---

## Base URL

```
https://twitter-clone-ts.onrender.com/api/v1
```

Replace `https://twitter-clone-ts.onrender.com/api/v1` with the URL where the server is hosted.

---

## Authentication Endpoints

### 1. **Register a New User**

**Endpoint:**
```
POST /user/register
```

**Request Body:**
```json
{
    "name":"Trisha",
    "username":"trisha",
    "password":"123456789",
    "email":"sachi@gmail.com"
}
```

**Response (Success):**
```json
{
    "message": "Account created successfully",
    "success": true
}
```

**Response (Error):**
```json
{
  "error": "Email already exists"
}
```

---

### 2. **Login a User**

**Endpoint:**
```
POST /user/login
```

**Request Body:**
```json
{
  "username": "trisha",
  "password": "securepassword"
}
```

**Response (Success):**
```json
{
    "message": "Welcome back Trisha",
    "user": {
        "_id": "6777d12847d53911cb2f6117",
        "name": "Trisha",
        "username": "trisha",
        "email": "trisha@gmail.com",
        "password": "$2a$12$9pqDLM6rpg3bqHuLw/OKCe8k.GRp5XQMWh.uHSw7YiXb2awqacfwW",
        "followers": [],
        "following": [
            "6778f9bc1f88ebaee5de1fe6",
            "6776b9a84dbb74c76fa9bb42"
        ],
        "bookmarks": [],
        "createdAt": "2025-01-03T11:59:36.169Z",
        "updatedAt": "2025-01-05T12:59:17.187Z",
        "__v": 0
    },
    "success": true
}
```

**Response (Error):**
```json
{
  "error": "Invalid username or password"
}
```

---

## User Endpoints

### 3. **Logout**

**Endpoint:**
```
GET /user/logout
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
    "message": "Logout Succesfully",
    "success": true
}
```

---

### 4. **Get Profile**

**Endpoint:**
```
GET /user/profile/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```


**Response:**
```json
{
    "user": {
        "_id": "6776b9a84dbb74c76fa9bb42",
        "name": "Trisha",
        "username": "trisha",
        "email": "tshukla025@gmail.com",
        "followers": [
            "6777d12847d53911cb2f6117"
        ],
        "following": [],
        "bookmarks": [
            "6777b32fcc287fd2b549242b"
        ],
        "createdAt": "2025-01-02T16:07:04.577Z",
        "updatedAt": "2025-01-05T12:59:17.254Z",
        "__v": 0
    }
}
```
---

### 5. **Get Users**

**Endpoint:**
```
GET /user/users
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```


**Response:**
```json
{
    "user": [
        {
            "_id": "6777d12847d53911cb2f6117",
            "name": "Sachi",
            "username": "sachi",
            "email": "sachi@gmail.com",
            "followers": [],
            "following": [],
            "bookmarks": [],
            "createdAt": "2025-01-03T11:59:36.169Z",
            "updatedAt": "2025-01-03T11:59:36.169Z",
            "__v": 0
        }
    ]
}
```
### 6. **Get User**

**Endpoint:**
```
GET /user/user
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```


**Response:**
```json
{
    "user": {
        "_id": "6777d12847d53911cb2f6117",
        "name": "Sachi",
        "username": "sachi",
        "email": "sachi@gmail.com",
        "followers": [],
        "following": [
            "6776b9a84dbb74c76fa9bb42",
            "6778fdfd1f88ebaee5de1ff0"
        ],
        "bookmarks": [],
        "createdAt": "2025-01-03T11:59:36.169Z",
        "updatedAt": "2025-01-05T10:05:56.687Z",
        "__v": 0
    }
}
```
### 7. **Follow User**

**Endpoint:**
```
POST /user/follow/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```


**Response:**
```json
{
    "message": "Sachi started following Akshara Gaur",
    "success": true
}
```
### 8. **Bookmarks**

**Endpoint:**
```
PUT /user/bookmark/
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```


**Response:**
```json
{
    "message": "User bookmarked a Tweet",
    "success": true
}
```

---

## Tweet Endpoints

### 9. **Create a Tweet**

**Endpoint:**
```
POST /tweet/create
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
    
    "description":"Hello Everyone!"
}
```

**Response:**
```json
{
    "message": "Tweet created successfully.",
    "success": true
}
```

---

### 10. **Get All Tweets**

**Endpoint:**
```
GET /tweet/all-tweets
```

**Response:**
```json
{
    "tweets": [
        {
            "_id": "6777f25369a327d9c82db4e0",
            "description": "Hello Sachi",
            "like": [],
            "userId": "6777d12847d53911cb2f6117",
            "userDetails": [
                {
                    "_id": "6777d12847d53911cb2f6117",
                    "name": "Sachi",
                    "username": "sachi",
                    "email": "sachi@gmail.com",
                    "followers": [],
                    "following": [],
                    "bookmarks": [],
                    "createdAt": "2025-01-03T11:59:36.169Z",
                    "updatedAt": "2025-01-03T13:00:23.446Z",
                    "__v": 0
                }
            ],
            "createdAt": "2025-01-03T14:21:07.517Z",
            "updatedAt": "2025-01-04T16:00:27.202Z",
            "__v": 0
        },
        {
            "_id": "677953b7af98c3e6b5099fd6",
            "description": "hello this is my second tweet",
            "like": [],
            "userId": "6777d12847d53911cb2f6117",
            "userDetails": [
                {
                    "_id": "6777d12847d53911cb2f6117",
                    "name": "Sachi",
                    "username": "sachi",
                    "email": "sachi@gmail.com",
                    "followers": [],
                    "following": [
                        "6776b9a84dbb74c76fa9bb42"
                    ],
                    "bookmarks": [],
                    "createdAt": "2025-01-03T11:59:36.169Z",
                    "updatedAt": "2025-01-03T14:23:51.735Z",
                    "__v": 0
                }
            ],
            "createdAt": "2025-01-04T15:28:55.307Z",
            "updatedAt": "2025-01-04T16:00:29.825Z",
            "__v": 0
        },
        {
            "_id": "6777b32fcc287fd2b549242b",
            "description": "Hello Trisha",
            "like": [
                "6776b9a84dbb74c76fa9bb42",
                "6777d12847d53911cb2f6117"
            ],
            "userId": "6776b9a84dbb74c76fa9bb42",
            "userDetails": [
                {
                    "_id": "6776b9a84dbb74c76fa9bb42",
                    "name": "Trisha",
                    "username": "trisha",
                    "email": "tshukla025@gmail.com",
                    "followers": [],
                    "following": [],
                    "bookmarks": [],
                    "createdAt": "2025-01-02T16:07:04.577Z",
                    "updatedAt": "2025-01-02T16:07:04.577Z",
                    "__v": 0
                }
            ],
            "createdAt": "2025-01-03T09:51:43.144Z",
            "updatedAt": "2025-01-04T16:00:39.399Z",
            "__v": 0
        }
    ]
}
```

---

### 11. **Delete a Tweet**

**Endpoint:**
```
DELETE /tweet/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
    "message": "Tweet deleted successfully.",
    "success": true
}
```

---

## Follow Endpoints

### 12. **Tweets of Following**

**Endpoint:**
```
GET /tweet/get-following-tweets
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
    "tweets": [
        {
            "_id": "6777b32fcc287fd2b549242b",
            "description": "Hello Trisha",
            "like": [
                "6776b9a84dbb74c76fa9bb42"
            ],
            "userId": "6776b9a84dbb74c76fa9bb42",
            "userDetails": [
                {
                    "_id": "6776b9a84dbb74c76fa9bb42",
                    "name": "Trisha",
                    "username": "trisha",
                    "email": "tshukla025@gmail.com",
                    "followers": [],
                    "following": [],
                    "bookmarks": [],
                    "createdAt": "2025-01-02T16:07:04.577Z",
                    "updatedAt": "2025-01-02T16:07:04.577Z",
                    "__v": 0
                }
            ],
            "createdAt": "2025-01-03T09:51:43.144Z",
            "updatedAt": "2025-01-03T09:56:31.320Z",
            "__v": 0
        }
    ]
}
```

---

### 13. **Like a Tweet**

**Endpoint:**
```
PUT /tweet/like/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
    "message": "User liked your Tweet",
    "success": true
}
```

```
### Notes
- Replace `:userId` and `:tweetId` with actual IDs in the API calls.
- Always include a valid `Authorization` token in the headers where required.
- Ensure the backend server is running before testing the endpoints.

For more details on setting up the project, refer to the [project setup guide](#).

---
