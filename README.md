# Docker Test App

## Project Overview
This is a **Node.js + MongoDB** application fully containerized with Docker. It serves as a simple student registration platform where users can sign up with their email, username, and password. The project demonstrates how to containerize a full-stack application using Docker and Docker Compose.

## What I Built

### 1. Node.js Web Server (`server.js`)
- Built with **Express.js** running on **port 5050**
- Two API endpoints:
  - `GET /getUsers` — Fetches all registered users from MongoDB
  - `POST /addUser` — Adds a new user (email, username, password) to the database
- Serves a static HTML signup form from the `public/` folder

### 2. Frontend (`public/index.html` + `public/style.css`)
- A clean signup form with fields: Email, Username, Password
- Styled with a centered layout, coral-colored submit button, and bordered form card

### 3. Docker Setup
- **`Dockerfile`** — Builds a Node.js Docker image that:
  - Uses the official `node` base image
  - Sets `/testapp` as the working directory
  - Copies all project files and runs `npm install`
  - Exposes port `5050` and starts the server with `node server.js`

- **`mongodb.yaml`** — Docker Compose configuration with two services:
  - **MongoDB** — Database service on port `27017` with admin credentials (`admin`/`qwerty`) and persistent volume storage
  - **Mongo-Express** — Web-based MongoDB admin panel on port `8081` for easy database management

### 4. Dependencies (`package.json`)
- `express ^4.21.2` — Web framework
- `mongodb ^6.13.0` — MongoDB driver for database operations

## How to Run

```bash
# Build the Node.js image
docker build -t testapp .

# Start MongoDB + mongo-express
docker compose -f mongodb.yaml up -d

# Run the Node app container (connected to same network)
docker run -p 5050:5050 --network docker_test_app_default testapp
```

Then visit:
- **Web App**: http://localhost:5050
- **MongoDB Admin UI**: http://localhost:8081

## Key Learning Outcomes
- ✅ Containerizing a Node.js application with Docker
- ✅ Setting up multi-service environments with Docker Compose (MongoDB + mongo-express)
- ✅ Connecting a Node.js backend to a Dockerized MongoDB database
- ✅ Serving static frontend files through Express
- ✅ Building a complete CRUD-style API with database persistence