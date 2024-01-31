<!--  -->

# Bag Simulation API

This API allows basic CRUD operations for users and simulations. It uses Node.js with the Express framework, MySQL for data storage, and JSON Web Tokens (JWT) for authentication.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Anglebert-Dev/bag_simulation_api.git
   cd bag_simulation_api
   ```

2.**Install Dependencies:**

npm install

3.**Run the Application:**

node app.js

4.**Configure Database With your credentials:**

username:your_db_username
password:your_db_password
create database :bag_simulation_db

5.**Test the Apis:**

Authentication
JWT (JSON Web Tokens) are used for authentication. Include the token in the Authorization header for authenticated routes.

API Endpoints
Login (Get JWT Token)
POST /login
Request Body: { "username": "yourusername", "password": "yourpassword" }
Response: { "token": "your_jwt_token" }
Users
GET /users

Get all users.
Requires authentication.
GET /users/:username

Get a specific user by username.
Requires authentication.

POST /users

Create a new user.
Request Body: { "username": "newuser", "password": "newpassword" }

POST /login

login
Request Body: { "username": "newuser", "password": "newpassword" }

Test the API
You can use tools like Postman or curl to test the API.

Login to Get JWT Token:
curl -X POST -H "Content-Type: application/json" -d '{"username": "yourusername", "password": "yourpassword"}' http://localhost:3000/login
Retrieve the JWT token from the response.

GET All Users:
curl -X GET -H "Authorization: Bearer your_jwt_token" http://localhost:3000/users

GET User by Username:
curl -X GET -H "Authorization: Bearer your_jwt_token" http://localhost:3000/users/yourusername

Create a User:
curl -X POST -H "Content-Type: application/json" -d'{"username": "newuser", "password": "newpassword"}' http://localhost:3000/users
