# 📌 Fixl Solutions - Assignment Task

Welcome! This backend provides a **secure** and **efficient** API for user authentication, product management, cart handling, and order placement. It follows best security practices, including **JWT authentication**, **rate limiting**, **password hashing**, and **secure cookie handling**.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/vikassharma2004/Assignment
cd yourproject
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Server
```sh
npm run dev
node App.js
```

By default, the server runs on `http://localhost:5000`

---

## 📚 Dependencies Used

| Package            | Description                                     |
|--------------------|-------------------------------------------------|
| express           | Fast and minimal Node.js framework              |
| mongoose          | MongoDB ODM for schema modeling                 |
| jsonwebtoken      | Secure authentication using JWT                 |
| bcryptjs          | Password hashing for security                   |
| express-rate-limit | Prevent brute-force attacks with rate limiting  |
| cookie-parser     | Secure handling of cookies                      |   

---

## 🔒 Security Features

✅ **JWT Authentication** - Secure user authentication with JSON Web Tokens.  
✅ **Password Hashing** - Uses `bcryptjs` for secure password storage.  
✅ **Rate Limiting** - Prevents excessive requests using `express-rate-limit`.  

---

## 📂 API Endpoints & Usage

### 🔑 **Auth Routes** (User Authentication)
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and receive JWT token (Rate Limited: 5 req/30s) |
| POST   | `/api/auth/logout`   | Logout and clear session cookies |

### 🛒 **Product Routes** (Product Management)
| Method | Endpoint             | Middleware Applied | Description |
|--------|----------------------|------------------|-------------|
| GET    | `/api/products`      | None             | Get all products |
| GET    | `/api/products/:id`  | `postLimiter`    | Get a product by ID (Rate Limited: 5 req/30s) |
| POST   | `/api/products`      | `isAuthenticated`, `adminRoute`, `postLimiter` | Create a new product (Admin only) |
| PUT    | `/api/products/:id`  | `isAuthenticated`, `adminRoute`, `postLimiter` | Update a product (Admin only) |
| DELETE | `/api/products/:id`  | `isAuthenticated`, `adminRoute`, `postLimiter` | Delete a product (Admin only) |

### 🛒 **Cart Routes** (Cart Management)
| Method | Endpoint         | Middleware Applied | Description |
|--------|-----------------|------------------|-------------|
| GET    | `/api/cart`     | `isAuthenticated` | Get user cart items |
| POST   | `/api/cart`     | `isAuthenticated` | Add item to cart |
| DELETE | `/api/cart`     | `isAuthenticated` | Remove item from cart |
| PUT    | `/api/cart/:id` | `isAuthenticated` | Update cart item quantity |

### 🛒 **Order Routes** (Order Management)
| Method | Endpoint        | Middleware Applied | Description |
|--------|----------------|------------------|-------------|
| POST   | `/api/order`   | `isAuthenticated` | Place an order |
| get   | `/api/order`   | `isAuthenticated` |  order details |

---

## 🛠️ Middleware & Security Implementations

### **Authentication Middleware (`authMiddleware`)**
- Verifies JWT token before allowing access to protected routes.
- Ensures only authenticated users can **add to cart, place orders, and manage products (admin only)**.

### **Rate Limiting**
- **Login & Signup:** Limited to **5 requests per 30 seconds** (`authLimiter`).
- **Product & Cart Routes:** Creating, updating, or deleting items is rate-limited (`postLimiter`).

---

Made with ❤️ by [vikas sharma](https://github.com/vikassharma2004)

