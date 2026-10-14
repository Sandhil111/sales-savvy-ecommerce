# Sales Savvy — Full-Stack E-Commerce Application

Sales Savvy is a full-stack e-commerce application built using React, Spring Boot and MySQL. It allows customers to browse products, manage their shopping cart and make payments through Razorpay.

## Features

- User registration and login
- Product management (add, view, update and delete products)
- Shopping cart with quantity management
- Razorpay payment integration
- Separate frontend and backend applications

## Tech Stack

**Frontend:** React, JavaScript, HTML, CSS  
**Backend:** Java, Spring Boot, REST APIs  
**Database:** MySQL  
**Payment Gateway:** Razorpay  
**Tools:** Git, GitHub, Postman, VS Code, Eclipse

## Project Structure

```text
sales-savvy-ecommerce/
├── frontend/
├── backend/
└── razorpay-demo/
```

## Running the Project

### 1. Database
Install MySQL and create the database required by the backend. Configure your database credentials locally.

### 2. Main Backend
Open the `backend` project in Eclipse or another Java IDE. Configure the database connection and run the Spring Boot application.

### 3. Payment Backend
Open `razorpay-demo` as a separate Spring Boot project. Configure your Razorpay test credentials using environment variables and run it on port `8081`.

### 4. Frontend
Open a terminal in the `frontend` directory and run:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Security Note

Never commit database passwords, Razorpay secrets or other private credentials. Use environment variables for sensitive configuration.

## Purpose

This project was built to practise full-stack application development, REST API integration, database operations and payment gateway integration.
