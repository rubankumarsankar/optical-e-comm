# 🕶️ Optical E-Commerce Frontend

A modern, responsive optical e-commerce web app built using **React.js**, **Tailwind CSS**, and **Framer Motion**, supporting:

- ✅ Dynamic product listing (Eyeglasses, Sunglasses, Contact Lenses)
- 🛒 Cart & Wishlist (localStorage)
- 🎯 Filter by brand, frame type, rating
- 📱 Mobile-first responsive UI
- 💫 Smooth animations (Framer Motion)
- 🔥 Bestsellers & Discounts
- 💡 Modular scalable folder structure

---

## 📁 Project Structure

```dash 

/src
│
├── assets/ # Images used in UI
├── components/ # Reusable UI components
│ ├── ProductCard.jsx
│ ├── FilterSidebar.jsx
│ └── ...
│
├── data/
│ └── products.js # All product data (id, title, price, image, etc.)
│
├── pages/
│ ├── CategoryPage.jsx
│ ├── ProductDetail.jsx
│ └── ...
│
├── App.jsx
├── main.jsx
└── index.css



```


## 🚀 Features

### ✅ Product Listing
- Lists all products under `/category` 
- Filters by:
  - Frame type
  - Brand
  - Rating

### 💎 Product Details
- Dynamic route: `/product/:id`
- Shows product info, pricing, gallery
- Buttons: Add to Cart, Wishlist, Buy Now

### 🛒 Cart
- Stored in `localStorage` under `optic_cart`
- Accessed from anywhere

### ❤️ Wishlist
- Stored in `localStorage` under `optic_wishlist`
- Add/remove via heart icon

---

## 📦 Data Structure (`products.js`)

Each product contains:

```js
{
  id: 1,
  brand: "Ray-Ban",
  title: "Classic Round Metal Frame",
  price: 2999,
  originalPrice: 3999,
  frameType: "Round",
  category: "Eyeglasses",
  rating: 128,
  quantity: 45,
  image: "/assets/bestsellers/eyeglasses1.jpg",
  images: [ ... ],
  tag: "Best Seller",
  discount: "25%",
}
```

## 💻 Technologies Used
React.js

Tailwind CSS

Framer Motion

React Icons

React Router DOM

React Toastify

## 📥 Installation

```base
git clone https://github.com/your-username/optical-ecommerce.git
cd optical-ecommerce
npm install
npm run dev

```

## Notes

Data is hardcoded in products.js. You can later replace it with API calls.

Cart/Wishlist uses localStorage (optic_cart and optic_wishlist)

Designed with mobile-first responsiveness

