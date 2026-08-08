# DREAM MILES — Full-Stack Tour & Travel Platform

> **Tagline**: *"Turn Every Journey Into a Memory."*  
> **Supporting Tagline**: *"Explore More. Travel Better. Dream Further."*

Dream Miles is a commercial-grade, full-stack tour booking and travel discovery web application built with **Node.js, Express, MongoDB, Mongoose, React, Vite, Tailwind CSS v4, Framer Motion, and Leaflet Maps**.

---

## 🚀 Architecture & Tech Stack

### Backend
- **Core**: Node.js & Express.js REST API (`/api/v1/...`)
- **Database**: MongoDB & Mongoose ODM (15+ Schemas/Models)
- **Security**: JWT Authentication (HTTP-Only Cookie & Bearer Header), bcrypt password hashing, Role-Based Access Control (User, Admin, SuperAdmin), Helmet, CORS, Express Rate Limiting
- **Validation**: Centralized Zod validation & Error Handling middleware
- **Payment Architecture**: Razorpay & Stripe order creation and signature verification API endpoints (`/api/v1/payments/create-order` & `/api/v1/payments/verify`)

### Frontend
- **Core**: React.js (Vite bundler) & React Router DOM v7
- **Styling**: Tailwind CSS v4 with custom design tokens (`#1F8A70` Teal, `#145E4C` Dark Teal, `#FFC857` Gold, `#EEF2F1` Off-white, `#1A1A1A` Charcoal) & Glassmorphic overlays
- **Icons & Motion**: Lucide React & Framer Motion animations
- **Maps**: Leaflet & React-Leaflet interactive world map with custom popup cards
- **Context State**: AuthContext, WishlistContext, CurrencyContext (INR, USD, EUR, GBP, AED, JPY, AUD, CAD, SGD), NotificationContext

---

## 📂 Folder Structure

```
dream-miles/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Auth, Country, Destination, Package, Hotel, Activity, Booking, Payment, Review, Wishlist, Coupon, Blog, Contact, Admin
│   │   ├── models/          # User, Country, Destination, TourPackage, Hotel, Activity, Booking, Payment, Review, Wishlist, Coupon, BlogPost, ContactMessage, Notification, FAQ, Offer
│   │   ├── middleware/      # authMiddleware, roleMiddleware, errorHandler, rateLimiter
│   │   ├── routes/          # Express API Router (/api/v1)
│   │   ├── seed/            # Automated database seeder script (seeder.js)
│   │   └── utils/           # APIResponse, APIError, catchAsync, slugify
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios API client instance
│   │   ├── components/      # Navbar, Footer, Hero, SearchModal, PackageCard, DestinationCard, ItineraryTimeline, MapSection, BookingWidget, InvoiceModal, ReviewSection, FilterSidebar
│   │   ├── context/         # Auth, Wishlist, Currency, Notification Providers
│   │   ├── pages/           # Home, Destinations, DestinationDetail, Countries, CountryDetail, Tours, PackageDetail, Checkout, BookingSuccess, Hotels, Activities, FlightsInfo, Blog, BlogDetail, About, Contact, Login, Register, UserDashboard, AdminDashboard
│   │   ├── routes/          # AppRoutes with ProtectedRoute & AdminRoute wrappers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json             # Root monorepo scripts
└── README.md
```

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/dream_miles
JWT_SECRET=dream_miles_super_secret_jwt_key_2026_production_ready
CLIENT_URL=http://localhost:5173
```

### 3. Seed MongoDB Database
Populates Countries, Destinations, Tour Packages, Hotels, Activities, Coupons, Blogs, and Admin Account:
```bash
npm run seed
```

### 4. Run Development Servers
Start both backend (Port 5000) and frontend (Port 5173) concurrently:
```bash
npm run dev
```

---

## 🔑 Demo Login Credentials

- **Admin Account**: `admin@dreammiles.com` / `Admin@123456`
- **Sample User**: `john@example.com` / `User@123456`

---

## 📜 Key API Endpoints (`/api/v1`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT |
| `GET` | `/api/v1/countries` | Fetch all countries |
| `GET` | `/api/v1/destinations` | Search & filter destinations |
| `GET` | `/api/v1/packages` | Filter tour packages by price, days, rating |
| `GET` | `/api/v1/packages/:slug` | Get tour package details & itinerary |
| `POST` | `/api/v1/bookings` | Create package reservation |
| `POST` | `/api/v1/payments/create-order` | Create Razorpay / Stripe payment order |
| `POST` | `/api/v1/payments/verify` | Verify payment signature & confirm booking |
| `POST` | `/api/v1/coupons/validate` | Validate promo discount coupon |
| `GET` | `/api/v1/admin/stats` | Admin portal analytics summary |
