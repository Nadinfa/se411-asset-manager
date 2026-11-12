# SE411 AssetTrack — Computer Asset Manager

## Project Overview

AssetTrack is a computer asset management system developed using React and Spring Boot.

## Technologies

- Frontend: React, Vite
- Backend: Java, Spring Boot
- Database: Aiven MySQL
- Database Access: Spring Data JDBC
- Testing: JUnit, Mockito, Vitest

## Features

- Add computer assets
- Search assets by ID
- View assets with pagination
- Update existing assets
- Delete assets

## Project Structure

- `frontend/` — React application
- `backend/` — Spring Boot REST API

## Running the Backend

1. Configure `backend/src/main/resources/application.properties` using the provided example file.
2. Open a terminal in the backend folder.
3. Run:

   `./mvnw spring-boot:run`

The backend runs at `http://localhost:8080`.

## Running the Frontend

1. Open another terminal in the frontend folder.
2. Run:

   `npm install`

   `npm run dev`

3. Open `http://localhost:5173`.

## Running Tests

Backend:

`cd backend`

`./mvnw test`

Frontend:

`cd frontend`

`npm test`

## Database

The application uses a persistent MySQL database hosted on Aiven. New and updated assets remain saved after restarting the application.

The MySQL database must contain the `asset` table before starting the backend. Database credentials are not included in the GitHub repository.