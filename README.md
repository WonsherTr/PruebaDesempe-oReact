# 🧠 TechNova — Internal Management System

**TechNova** is a full-stack web application built with **Next.js 14**, **TypeScript**, **React Hooks**, and **MongoDB**, designed to digitalize and optimize the management of products, users, and operations for a technology company.

This project was developed as part of the **Performance Test (TypeScript + React.js)** challenge for the Riwi Community training program.

---

## 🚀 Overview

TechNova centralizes product, user, and order information into a single internal system, eliminating the need for spreadsheets and manual processes.

### ✅ Core Features

- **Product Management (CRUD)**  
  Create, read, update, and delete technology products with strict validation (unique SKU, positive quantities, etc.).

- **User Authentication & Roles**  
  Modular login system with global state and secure route guards using cookies and middleware.

- **Reusable UI Components**  
  Reusable `Button`, `Badge`, and `Card` components with strict TypeScript typing and multiple variants/sizes.

- **Full API Integration**  
  RESTful API built in Next.js (`/api/products`) with complete CRUD routes connected to MongoDB via Mongoose.

- **Form Validations & Error Handling**  
  Controlled, typed forms with clear user feedback for errors and success messages.

- **Protected Dashboard**  
  Only authenticated users can access `/dashboard`. Guards are implemented both via Next.js `middleware` and client-side fallback.

---

## 🧩 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React 18 + Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Backend/API** | Next.js API Routes + Mongoose |
| **Database** | MongoDB Atlas |
| **Styling** | TailwindCSS (and inline styles) |
| **HTTP Client** | Axios |
| **State Management** | React Context + Hooks |
| **Auth Guard** | Next.js Middleware + Cookies |
| **Validation** | Zod (schema validation) |

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js >= 18  
- npm or yarn  
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/technova.git
cd technova
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root based on `.env.example`:

```bash
MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"
```

### 4. Run the development server

```bash
npm run dev
```

App will be available at:  
👉 http://localhost:3000

---

## 🧱 Functional Modules

### 🛒 Product Management
- Create, update, and delete products.
- Prevent duplicate SKUs.
- Filter products by brand or category.
- Show active/inactive status with badges.

### 👤 User & Authentication
- Modular login with validation and redirect.
- `UserStore` class with CRUD simulation and console logs (GET/POST/PATCH/DELETE).
- Decorator applied to `create` method adds defaults (`role: "user"`, `createdAt: Date.now()`).

### 🎨 Reusable UI Components
- **Button:** Variants (`primary`, `secondary`, `danger`) + sizes (`sm`, `md`, `lg`).
- **Badge:** Category/status indicators.
- **Card:** Product display with actions inside.

### 🔐 Auth Guards
- **Server-side:** `middleware.ts` checks cookie `tn_auth=1` and redirects unauthorized users.
- **Client-side:** Context + hooks ensure logout/login state sync.

### 🧾 API & Axios Services
- Full CRUD API in `/api/products`.
- Axios services with `try/catch` and readable error messages.

### 🧩 Global State & Hooks
- Auth state managed via Context.
- Custom hooks: `useAuth`, `useToast`.

### 🚨 Error Handling & Validation
- API-level and UI-level error capture with clear user feedback.
- SKU uniqueness validated in API.
- Controlled, typed forms with minimal required field checks.

---

## 🧪 Testing the Flow

1. Open `/login`  
2. Login with any email/password (mock authentication).  
3. You’ll be redirected to `/dashboard`.  
4. Create, edit, and delete products.  
5. Try invalid SKUs to see validation in action.  
6. Logout → redirect to `/login`.

---

## 🧾 Example `.env.example`

```bash
# MongoDB connection string
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
```

---

## 🧑‍💻 Developer Information

| Field | Info |
|-------|------|
| **Coder:** Your Name |
| **Clan:** Your Clan (Riwi) |
| **Email:** your.email@example.com |
| **Document ID:** CC / TI / Passport |
| **Project:** TechNova Performance Test |

---

## 📦 Deployment

### Build for production

```bash
npm run build
npm start
```

### Environment variables required in production
- `MONGODB_URI`

---

## ✅ Acceptance Criteria Summary

| Category | Requirement | Status |
|-----------|--------------|--------|
| Product CRUD | Full CRUD + validation | ✅ |
| Authentication | Modular login + guards | ✅ |
| UI Components | Button, Badge, Card | ✅ |
| API Integration | `/api/products` with Mongoose | ✅ |
| Error Handling | try/catch + user messages | ✅ |
| README + Docs | Complete | ✅ |

---

## 🏁 License

This project was created for academic purposes as part of the **Riwi Performance Test** and is free to use for educational and portfolio demonstrations.

---

Made with ❤️ using **Next.js + TypeScript + MongoDB**
# PruebaDesempe-oReact
