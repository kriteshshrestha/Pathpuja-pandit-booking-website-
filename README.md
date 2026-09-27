# PathPuja – Pandit Booking Website

PathPuja is a web application designed to make it easier for users to find pandits, explore available pujas, and book pandit services for specific dates.

This repository currently contains the **backend API** built with Node.js, Express.js, and PostgreSQL.

## 🚀 Features

### Authentication & Users

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based user management
* Support for different user roles such as users, pandits, and admins

### Puja Management

* Create puja services
* Retrieve all available pujas
* Retrieve a specific puja by ID
* Store puja information in PostgreSQL

### Booking Management

* Users can create bookings for puja services
* Users can view their bookings
* Users can view individual booking details
* Users can cancel bookings
* Booking status management
* Active booking filtering

### Backend

* RESTful API architecture
* Authentication middleware
* Role-based authorization
* PostgreSQL database
* Sequelize ORM
* Error handling and HTTP status codes
* API testing using Postman

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Sequelize**
* **JWT (JSON Web Token)**
* **bcrypt / bcryptjs**
* **Postman**
* **Git & GitHub**

## 📁 Project Structure

```text
pathpuja-backend/
│
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   ├── pujaController.js
│   └── ...
│
├── models/
│   ├── userModel.js
│   ├── bookingModel.js
│   ├── pujaModel.js
│   └── ...
│
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── pujaRoutes.js
│   └── ...
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── config/
│   └── database.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

> The exact folder and file names may vary depending on the current project structure.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/kriteshshrestha/YOUR-REPOSITORY-NAME.git
```

### 2. Navigate to the project

```bash
cd YOUR-REPOSITORY-NAME
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_secret_key
```

Do not commit your `.env` file to GitHub.

### 5. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API should then be available at:

```text
http://localhost:5000
```

## 🔐 Authentication

PathPuja uses JWT-based authentication.

After logging in successfully, the server returns a JWT token.

For protected endpoints, send the token in the request header:

```text
Authorization: Bearer YOUR_TOKEN
```

The backend uses the authenticated user's information to identify the user making the request.

## 📌 Example API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Puja

```text
POST /api/puja
GET  /api/puja
GET  /api/puja/:id
```

### Bookings

```text
POST /api/booking
GET  /api/booking
GET  /api/booking/:id
PATCH /api/booking/:id/cancel
```

> Endpoint names may differ slightly depending on the current route configuration.

## 🔄 Booking Flow

```text
User
 │
 ├── Register / Login
 │
 ├── View available pujas
 │
 ├── Select a puja
 │
 ├── Select booking date
 │
 └── Create booking
          │
          ▼
       Booking
       Status: Pending
```

The pandit-side workflow will allow pandits to manage their bookings and accept or reject requests.

## 🗄️ Database

The project uses **PostgreSQL** as the database and **Sequelize** as the ORM.

Main entities currently include:

```text
User
 │
 ├── Bookings
 │
 └── Pandit information

Puja
 │
 └── Bookings

Booking
 ├── User
 └── Puja
```

## 🧪 API Testing

The backend APIs were tested using **Postman**.

Authentication-protected endpoints require the JWT token to be provided as a Bearer token.

## 🔮 Future Improvements

Planned improvements include:

* Pandit registration and profile management
* Pandit dashboard
* Pandit booking acceptance/rejection
* Pandit availability management
* User and pandit profile images
* React frontend
* Improved validation
* Better error handling
* Booking notifications
* Deployment

## 👨‍💻 Author

**Kritesh Shrestha**

Computer Engineering Graduate

GitHub: https://github.com/kriteshshrestha

## 📄 Project Status

🚧 **Backend MVP completed**

The backend currently provides the core authentication, puja, and booking functionality. Frontend development and additional pandit-side functionality will be added progressively.

