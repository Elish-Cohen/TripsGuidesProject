# TripsGuidesProject

TripsGuidesProject is a full-stack educational web application that simulates a real-world tour booking platform, focusing on authentication, role-based access, and a complete end-to-end ordering flow.

This project was developed as part of a learning process and serves as a **portfolio project**.  
It focuses on real-world application logic such as authentication, role-based authorization, state management, and a complete order flow — without integrating real payment services.

---

## 🧭 Project Overview

The platform allows users to browse guided tours by region, select a date and number of participants, add tours to a cart, and complete an order using a **simulated payment process**.

The system also includes an **Admin role** with extended permissions for managing tours, users, and orders.

---

## 🛠 Technologies Used

### Frontend (Client)
- React (Vite)
- Redux Toolkit
- React Router
- Material UI (MUI)
- JavaScript (ES6+)

### Backend (Server)
- Node.js
- Express
- REST-style API
- JSON files for data persistence (users, tours, orders)

---

## 🗂 Project Structure

- `client/` – React frontend (Vite)
- `server/` – Node.js + Express backend


---

## 👥 User Roles & Authorization

### Regular User
- Register and log in
- Browse available tours
- Filter tours by category / region
- Select tour date and number of participants
- Add tours to cart
- View order summary
- Complete an order via a simulated payment form

### Admin
- View all registered users
- View all orders
- Add new tours
- Edit existing tours
- Delete tours
- Full access to management features

---

## 🔐 Admin Access (Demo)

For demonstration and testing purposes, the project includes a predefined admin user:

- **Username:** `admin`
- **Password:** `123`

> ⚠️ These credentials are for demo purposes only and are used in this educational project.  
> No real authentication or sensitive data is involved.

---

## ✨ Main Features

- Full authentication flow (registration & login)
- Role-based authorization (admin vs regular user)
- Tour filtering by category / region
- Cart management and order summary
- Simulated payment form with validation
- Responsive UI built with Material UI
- State management using Redux Toolkit
- REST API with full CRUD operations
- Local data persistence using JSON files

---

## 🧠 What I Learned & Key Challenges

- Designing a full client–server flow, including authentication, authorization, and protected routes.
- Implementing role-based access control and building different user experiences for admin and regular users.
- Managing global application state using Redux Toolkit and structuring slices for scalability.
- Handling complex user flows such as cart management and order creation across multiple screens.
- Designing REST-style APIs and maintaining data consistency between client and server.
- Working with local JSON files as a data store and understanding their limitations compared to real databases.
- Improving code organization and separation of concerns between frontend and backend.

---

## 🚫 Payment Disclaimer

This project does **not** integrate real payment gateways.

The payment flow is **fully simulated for demonstration purposes only**, and no real financial or credit card data is processed or stored.

---

## ▶ Running the Project Locally

### Backend (Server)

    cd server
    npm install
    npm start

### Frontend (Client)

    cd client
    npm install
    npm run dev

## 📌 Project Status & Future Plans

The project currently runs locally and is not deployed.

Planned improvements:
- Migrating from JSON files to a real database
- Improving client–server separation
- Enhancing UI and mobile responsiveness
- Refactoring and code optimization
- Allowing tour guides to add tours independently (not admin-only)

## 📝 Notes

This project was developed as an educational and portfolio project.
Its goal is to demonstrate practical full-stack development skills and real-world application logic while keeping the implementation clear and maintainable.



