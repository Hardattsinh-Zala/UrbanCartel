# UrbanCartel 🛒

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://urbancartel.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A full-featured MERN Stack e-commerce platform with user authentication, cart system, and product management.

---

## 🚀 Table of Contents

- [About](#about)  
- [Tech Stack](#tech-stack)  
- [Demo](#demo)  
- [Key Features](#key-features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Screenshots](#screenshots)  
- [Roadmap](#roadmap)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## About

**UrbanCartel** is a modern e-commerce web application built with the MERN stack. It includes secure user login/register, product browsing, cart management, admin controls, and a clean responsive UI.

---

## Tech Stack

### Frontend:
- **React.js** with Vite  
- **React Router DOM** for navigation  
- **Axios** for HTTP requests  
- **Context API / custom hooks** for auth state  
- **Tailwind CSS / Custom CSS** for styling

### Backend:
- **Node.js + Express.js** for REST API  
- **MongoDB + Mongoose** for data storage  
- **JWT** for authentication  
- **bcryptjs** for password hashing  
- **CORS**, **dotenv**, and other middleware

###  Tools & Platforms:
- **Vercel** (frontend deployment)  
- **Render** (backend)  
- **Git** + **GitHub** for version control

---

## Demo

🌐 Live: [https://urbancartel.vercel.app](https://urbancartel.vercel.app)

> *Admin routes and sensitive features may require login or protected routes.*

---

## Key Features

✅ User Authentication (JWT-based)  
✅ Product Listings  
✅ Add to Cart  
✅ Cart Page with quantity adjustments  
✅ Protected Routes for Auth Users  
✅ Admin Authorization  
✅ Responsive UI  
✅ Clean code & modular architecture

---

##  Installation

```bash
# 1. Clone the repository
git clone https://github.com/Hardattsinh-Zala/UrbanCartel.git
cd UrbanCartel

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install

# 4. Set up environment variables
# In both /server and /client, create a .env file using .env.example or:
VITE_API_BASE_URL=http://localhost:5000/api
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string

# 5. Run the development servers
# Backend
cd ../server
npm run dev

# Frontend
cd ../client
npm run dev
```
---

## Usage
- Register or login as a user
- Browse products and add them to your cart
- View cart, adjust quantities
- Proceed to checkout (payment integration in roadmap)
- Admins (if enabled) can add/edit/remove products

---

## Project Structure
```bash
UrbanCartel/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── store/       # Context/Auth
├── server/              # Node + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── .env.example
├── README.md
```

---
