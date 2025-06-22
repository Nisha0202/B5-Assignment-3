# Library Management API

A simple Node.js/Express REST API for managing books and borrow operations in a library system. It uses MongoDB (with Mongoose) to store data and supports basic CRUD operations for books, as well as borrowing and reporting features.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Why This Structure?](#why-this-structure)
- [License](#license)

---

## Features

- Add, view, update, and delete books
- Borrow books with quantity and due date
- Get a summary of borrowed books
- Input validation and error handling
- Modular, scalable structure with separation of concerns

---

## Project Structure

```
Src/
├── controllers/
│   ├── bookcontrollers.ts
│   └── borrowControllers.ts
├── middlewares/
│   └── errorHandelers.ts
├── models/
│   ├── book.model.ts
│   └── borrow.model.ts
├── routes/
│   ├── book.route.ts
│   └── borrow.route.ts
├── app.ts
└── server.ts
```

---

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your environment variables (see below).
4. Start the server with `npm start`.

---

## Environment Variables

Create a `.env` file in the root directory with the following:

```
MONGO_USER=yourMongoUser
MONGO_PASS=yourMongoPassword
MONGO_DB=library
PORT=3000
```

---

## API Endpoints

### Books

- `POST   /api/books` — Add a new book
- `GET    /api/books` — Get all books (with optional filters)
- `GET    /api/books/:bookId` — Get details of a book
- `PUT    /api/books/:bookId` — Update a book
- `DELETE /api/books/:bookId` — Delete a book

### Borrow

- `POST   /api/borrow` — Borrow a book
- `GET    /api/borrow` — Get summary of borrowed books

