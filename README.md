# **Order Management System**

A full-stack **Order Management System** built using **Turborepo**, **NestJS**, **Next.js**, and **TypeScript**.
This application allows users to view products, add them to a cart, apply valid coupons, and place orders.
Administrators can view order history, generate coupons, and check sales & discount summaries.

---

## 🚀 **Features**

### **🛍 Products**

* List all available products
* Products include name, category, price, and stock
* Products are served from an in-memory datastore

### **🛒 Cart**

* Add items to the cart (only if stock is available)
* Update quantities or remove items
* Clear the cart for a user
* Check out using an optional coupon code

### **🏷 Coupons**

* Generate new coupon codes
* Fetch all active & inactive coupons
* Update global coupon cycle settings
* Update the discount for the coupon
* Apply valid coupons during checkout

### **📦 Orders**

* Place orders with or without coupons
* Automatic discount calculation
* Order records stored in an in-memory datastore
* View all orders
* View individual user orders

### **📊 Admin Summary**

* Total sales
* Total discounts given
* Total orders placed
* Easy API endpoint for dashboard integrations

---

## 🧩 **Technology Stack**

### **Monorepo Setup**

* **Turborepo** for workspace management

### **Backend**

* **NestJS**
* **TypeScript**
* **Class Validator & Swagger**
* In-memory database (completely local, no external DB required)
* Dependency injection following NestJS conventions
* Modular architecture (`product`, `cart`, `coupon`, `order`, `common`, `database`)

### **Frontend**

* **Next.js** (located in the `web` app of the monorepo)

---

## 📁 **Project Structure**

```
src
├── cart
│   ├── cart.controller.ts
│   ├── cart.module.ts
│   ├── cart.service.ts
│   ├── dto
│   │   ├── cartResponse.dto.ts
│   │   └── updateCartRequest.dto.ts
│   └── interfaces
│       └── cart.interface.ts
├── common
│   ├── common.module.ts
│   └── common.service.ts
├── coupon
│   ├── coupon.controller.ts
│   ├── coupon.module.ts
│   ├── coupon.service.ts
│   ├── dto
│   │   ├── couponResponse.dto.ts
│   │   ├── getCouponsRequest.dto.ts
│   │   ├── updateCycleRequest.dto.ts
│   │   └── updateDiscountRequest.dto.ts
│   └── interfaces
│       └── coupon.interface.ts
├── database
│   ├── database.module.ts
│   ├── interfaces
│   │   └── database.interface.ts
│   └── token.ts
├── order
│   ├── dto
│   │   ├── getOrderRequest.dto.ts
│   │   ├── orderResponse.dto.ts
│   │   └── orderSummaryResponse.dto.ts
│   ├── interfaces
│   │   └── order.interface.ts
│   ├── order.controller.ts
│   ├── order.module.ts
│   └── order.service.ts
└── product
    ├── dto
    │   ├── getProductRequest.dto.ts
    │   └── productResponse.dto.ts
    ├── interfaces
    │   └── product.interface.ts
    ├── product.controller.ts
    ├── product.module.ts
    ├── product.service.ts
    └── products.json
```

Each module follows NestJS conventions:

* `module.ts` → registers providers & controllers
* `service.ts` → business logic
* `controller.ts` → routes
* `dto/` → request/response schemas
* `interfaces/` → pure TypeScript types

The database is an in-memory store injected using a custom DI token.

---

## 📘 **API Overview**

### **Product APIs**

* `GET /product/get` — Fetch all products
* `GET /product/get?id=1` — Filter by ID, category, or name

### **Cart APIs**

* `POST /cart/add/:userId` — Add/update products in cart
* `GET /cart/get/:userId` — View items in cart
* `DELETE /cart/clear/:userId` — Empty user cart
* `POST /cart/checkout/:userId?couponCode=ABC123` — Checkout

### **Coupon APIs**

* `POST /coupon/generate` — Generate coupons
* `POST /coupon/update-discount` — Update global discount percentage
* `POST /coupon/update-cycle` — Update coupon usage cycle
* `GET /coupon/get` — Fetch coupon list

### **Order APIs**

* `GET /order/get?userId=number` — Get orders for a user
* `GET /order/all` — Get all placed orders
* `GET /order/summary` — Sales & discount summary

Swagger documentation is automatically available at:

```
http://localhost:3000/api
```

---

## 🏗 **How It Works**

### 📦 In-Memory Database

All data (products, carts, orders, coupons, config) lives in an in-memory object.
This keeps the project simple and fully self-contained.

### 🧠 Dependency Injection

Each module exports its service and the database token so other modules can inject them:

```ts
@Module({
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
```

Then:

```ts
constructor(private readonly couponService: CouponService) {}
```

This keeps modules loosely coupled and maintainable.

---

## 🛠 **Running the Project**

### **Install dependencies**

```bash
pnpm install
```

### **Run backend (NestJS)**

```bash
pnpm --filter api dev
```

### **Run frontend (Next.js)**

```bash
pnpm --filter web dev
```

### **Run everything**

```bash
pnpm dev
```

---

## 🔮 Future Improvements

* Persist data using a real database
* Add authentication & roles
* Add frontend cart management UI
* Add inventory management
* Add order history UI in Next.js

---

## 📎 Repository

GitHub: [https://github.com/shoeb00/order-management](https://github.com/shoeb00/order-management)
