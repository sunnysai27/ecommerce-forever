# 🛒 ecommerce-forever

A full-stack e-commerce web application built with the MERN stack. It includes both a user-facing frontend and an admin panel. Users can browse products, register/login, add items to the cart, and place orders (currently via Cash on Delivery). Admins can manage products and view all orders from a separate admin dashboard.

---

###  **Deployed Website Link**

### 👤 User App:
https://ecom-forever-frontend.vercel.app

### 🛠️ Admin Panel:
https://ecom-forever-admin.vercel.app


## ✨ Features

- User authentication with JWT
- Product browsing, search, and filtering
- Add to cart and place order
- Order management
- Admin panel for managing products and orders
- RESTful API backend
- MongoDB database
- Responsive design for all devices
- Deployed on Vercel

---

## ⚙️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Auth**: JWT (JSON Web Tokens)
- **Deployment**: Vercel
- **Payment**: Currently COD, Razorpay integration coming soon

---

## 🧾 Environment Variables

Make sure to create a `.env` file in each of the following folders (`backend`, `frontend`, and `admin`) and add the required variables as shown below:

---

### `frontend/.env`

VITE_BACKEND_URL=http://localhost:4000

--- 

###  `backend/.env`
MONGODB_URI = ""
CLOUDINAY_API_KEY = "
CLOUDINAY_SECRET_KEY = ""
CLOUDINAY_NAME = ""
JWT_SECRET = ""
ADMIN_EMAIL = ""
ADMIN_PASSWORD = ""


###  `admin/.env`

VITE_BACKEND_URL = ""


## 🧪 Clone This Project

git clone https://github.com/sunnysai27/ecommerce-forever.git
cd ecommerce-forever

