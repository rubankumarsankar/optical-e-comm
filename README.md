# Optical E-Commerce Platform (React + Tailwind CSS)

This is a fully functional Optical E-Commerce Frontend built with **React.js**, **Tailwind CSS**, **React Router**, and **localStorage** for persistence. It includes both customer-facing pages and a secure admin panel for managing products, orders, and customers.

## 🔧 Tech Stack

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Redux (optional for state management)
- React Icons
- Framer Motion (for animations)
- LocalStorage (for authentication, cart, etc.)

## 📁 Project Structure



## 🚀 Features

### 👓 User Features

- Landing Page with Categories & Offers
- Product Listing & Filtering (Brand, Type, Price)
- Product Detail Page
- Add to Cart and Wishlist
- Checkout Page (dummy)
- Order Tracking
- Authentication: Login/Register
- LocalStorage cart & user state

### 🛠️ Admin Panel

- Admin Login (`/admin`)
- Dashboard Overview
- Product Management
- Order List & Details
- Customer List with Add/Edit/View (Modal)
- Settings Page
- Logout Functionality

## 🛡️ Admin Access Flow

1. Go to `/admin` – Admin Login page will appear.
2. On successful login, you're redirected to `/admin/dashboard`.
3. You can navigate to:
   - `/admin/products`
   - `/admin/orders`
   - `/admin/customers`
   - `/admin/settings`

## 🔐 Authentication

- Admin login data is stored in `localStorage` as `authToken`.
- Upon logout, `authToken` and `user` are cleared.

## 📦 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/optical-ecommerce-frontend.git
   cd optical-ecommerce-frontend
   ```

2. **Install dependencies:**

```dash
npm install
```

3. **Run the project:**

```dash
npm run dev
```
4. **Visit in Browser:**

```dash
http://localhost:5173/

```