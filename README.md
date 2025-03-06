<<<<<<< HEAD
# Roxiler-System-MERN-Assignment
=======

# MERN stack coding assignment (Roxiler Systems)

![Project Screenshot](./frontend/public/images/s1.png)

# env
PORT=5000

NODE_ENV=development

DATABASE_LOCAL=mongodb://localhost:27017/roxiler


## Run Locally

Clone the project

```bash
https://github.com/rvasande/Roxiler---MERN-Stack-Coding-Challenge.git
```


Install dependencies ( in root directory)

```bash
  npm install
```
Install dependencies (in frontend )

```bash
  1. cd frontend
  2. npm install
```
RUN COMMAND IN ROOT DIRECTORY 

Start the server

```bash
  npm run start
```
<span style="color: red;">IMPORTANT: Make sure that after running the server, you hit the following API on POSTMAN or in CHROME to seed the database with the GET method:</span>

```bash
   /api/v1/products/seedData

```

Start the client

```bash
  npm run client
```

Start both frontend & backend

```bash
  npm run dev
```


## API Reference

#### 1) Seed data into database
```http
  GET /api/v1/products/seedData
```

#### 2) Get all products
```http
  GET /api/v1/products
```

#### 3) Get statistics of selected month
```http
  GET /api/v1/products/stats/:month
```

#### 4) Get category of selected month
```http
  GET /api/v1/products/category/:month
```
#### 5) Get statistics of selected month
```http
  GET /api/v1/products/barChart/:month
```

#### 6) Get statistics of selected month
```http
  GET /api/v1/products/combinedRes/:month
```

>>>>>>> b6a6f00 (Initial commit)
