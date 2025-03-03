# 📌 Fixl Solutions - Assignment task

Welcome  This backend provides a **secure** and **efficient** API for user authentication,post management, and rate-limited access control. It follows best security practices, including **JWT authentication**, **rate limiting**, **password hashing**, and **secure cookie handling**.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/vikassharma2004/Assignment
cd backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```



### 4️⃣ Run the Server
```sh
npm run dev 
node App.js
```

By default, the server runs on `http://localhost:5000`

---

## 📦 Dependencies Used

| Package            | Description                                     |
|--------------------|-------------------------------------------------|
| express           | Fast and minimal Node.js framework              |
| mongoose          | MongoDB ODM for schema modeling                 |
|                 |
| jsonwebtoken      | Secure authentication using JWT                 |
| bcryptjs          | Password hashing for security                   |
| express-rate-limit | Prevent brute-force attacks with rate limiting  |
| cookie-parser     | Secure handling of cookies                      |          



## 🔒 Security Features

✅ **JWT Authentication** - Secure user authentication with JSON Web Tokens.  
✅ **Password Hashing** - Uses `bcryptjs` for secure password storage.  
✅ **Rate Limiting** - Prevents excessive requests using `express-rate-limit`.  
  
 

---

## 📌 API Endpoints & Usage

### 🔑 **Auth Routes** (User Authentication)
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and receive JWT token (Rate Limited: 5 req/30s) |
| POST   | `/api/auth/logout`   | Logout and clear session cookies |

### 📝 **Post Routes** ( Posts Management)
| Method | Endpoint             | Middleware Applied | Description |
|--------|---------------------|------------------|-------------|
| GET    | `/api/posts/all`     | None             | Get all posts |
| GET    | `/api/posts/:id`     | `postLimiter`    | Get a post by ID (Rate Limited: 5 req/30s) |
| POST   | `/api/posts/create`         | `authMiddleware`, `postLimiter` | Create a new post (Authentication required) |
| PUT    | `/api/posts/update/:id` | `authMiddleware`, `postLimiter` | Update a post (Authentication required) |
| DELETE | `/api/posts/delete/:id` | `authMiddleware`, `postLimiter` | Delete a post (Authentication required) |

---

## 🔧 Middleware & Security Implementations

### **Authentication Middleware (`authMiddleware`)**
- Verifies JWT token before allowing access to protected routes.
- Ensures only authenticated users can **create, update, and delete** posts.

### **Rate Limiting**
- **Login & Signup:** Limited to **5 requests per 30 seconds** (`authLimiter`).
- **Post Routes:** Creating, updating, or deleting posts is rate-limited (`postLimiter`).











Made with ❤️ by [vikas sharma](https://github.com/vikassharma2004)

