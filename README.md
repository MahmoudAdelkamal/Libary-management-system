# Introduction
This document describes the development of a library management system using nodejs, express and postgres.

# Key features
- Book module :
  - user can add,update or delete books.
  - search for book by author, title or ISBN.

- Borrower module :
  - signUp, signIn, list, update or delete borrowers.
  - track borrowers whose booking is overdue.
  

- Borrowing transactions module :
  - Borrowing new books.
  - returning back the borrowed books.
  - apply some filters to fetch the borrowing transactions that happened on different times.
 

# Bonus features
- Authentication: basic authentication is applied on the borrower module level.
- Containerization: containerized the whole app using docker and docker-compose.
- Unit testing: applied unit testing on the book module main features.
- Adding database indexing for faster searching.
- Exporting all overdue borrows of the last month.
- Exporting borrowing processes of the last month

# Tools & concepts
- Nodejs
- Express
- postgres
- Restful api design

# How to run it?
- Create .env file same as .env.example as a template.
- add this key as an env var **DB_URL=postgres://postgres:postgres@postgres:5432/library_management_system**
- add this key as an env var **port=3000**
- run
- #### build with docker
```
docker compose up --build -d
```
- you can test any endpoint using this base url **http://localhost:3000/api**
