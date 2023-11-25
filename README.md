# Mongoose Express CRUD Mastery

Developed a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Joi/Zod.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/NAYMUR143/level2-assignment2

   ```

2. Install dependencies:
   ```bash
   cd your-repo
   npm install
   ```
3. Set up environment variables:
   ```bash
   PORT=3000
   DATABASE_URL=mongodb+srv://servername:password@cluster0.u3srpau.mongodb.net/test
   BCYPT_SALT_ROUND=10
   ```
4. Start the application:

   ```bash
   npm start
   ```

   The application will be running at http://localhost:3000.

## User Management:

### 1. Create a new user

- Endpoint: **POST /api/users**
- Request Body:

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Response: List of user objects. Each object should only contain `username`, `fullName`, `age`, `email`, `address` . Apply suitable field filtering to exclusively retrieve the necessary information.

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "age": "number",
      "email": "string",
      "address": {
        "street": "string",
        "city": "string",
        "country": "string"
      }
    }
    // more objects...
  ]
}
```

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Response will be look like:

```json
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (similar structure as in user creation).

- Response will be look like this

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

- Response will be look like this

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

### Order Management:

1. Add New Product in Order

- Endpoint: **PUT /api/users/:userId/orders**

- Response will be look liket this:

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response will be look liket this:

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**
- Response will be look liket this:

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```
