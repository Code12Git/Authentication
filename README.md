# User Registration and Password Reset Functionality (MERN Stack)

## Overview

This full-stack web application allows users to register, reset their passwords, and perform various operations related to user management. The application involves implementing user registration, login, forgot password, and password reset functionality using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

1. **User Registration**:

   - Register users with username, email, and password.
   - Implement form validations for fields.

2. **Password Reset**:

   - Forgot password functionality.
   - Generate unique reset tokens and email users for password reset.
   - Securely validate tokens and allow password updates.

3. **Backend (Node.js with Express)**:

   - RESTful API endpoints for user registration and password reset.
   - JWT implementation for secure authentication during password reset.

4. **Frontend (React)**:
   - Components for registration, login, and password reset.
   - Client-side form validation and React Router for navigation.

## Technologies Used

- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- Vinejs (for validations)

## Getting Started

### Prerequisites

Before getting started, make sure you have the following tools and technologies installed:

- Node.js
- MongoDB database
- React.js
- Express

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/project-name.git

# Install server dependencies
cd server
npm install

# Install client dependencies
cd client
npm install

```

## Configuration

### Database Configuration

Create a MongoDB database and configure the database connection in the server/.env file.

## Usage

Start the frontend and backend servers using the following commands:

Frontend (React.js):

```bash
cd client
npm run dev

```

Backend (Express):

```bash
cd server
npm start

```

## API Endpoints

The following API endpoints are available:

- POST /api/auth/register: Register User
- POST /api/auth/login: Login User.
- POST /api/auth/forgotpassword: Forgot Password.
- POST /reset-password/:token/:id: Reset Password by token and userId.

### Accessing Sample Quotes

To retrieve sample users, you can use API endpoints with tools like [curl](https://curl.se/) or [Postman](https://www.postman.com/) . Here's an example of how to make a POST request to retrieve quotes:

```bash
# For registering users

postman -X POST -u http://15.207.86.110:8000/api/auth/register

# For login users

postman -X POST -u http://15.207.86.110:8000/api/auth/login

```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy Authentication ! 📝🚀
