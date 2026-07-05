# TourPlanner

Software Engineering 2 Semester Project (SS26)

## Features

- User registration and login
- Create, edit and delete tours
- Display routes of tours
- Rate tours and comment
- Search and filter options for tours and logs
- Current weather information of tour via Open-Meteo
- Statistics page for tour overview data
- JSON export for tour data

## Tech Stack

- **Frontend:** Angular, TypeScript, Tailwind CSS, Leaflet, Vitest
- **Backend:** Spring Boot, Java, Spring Security, Spring Data JPA
- **Database:** PostgreSQL
- **External APIs:** OpenRouteService, Open-Meteo

## Project Structure

```text
TourPlanner/
+-- backend/    Spring Boot REST API
+-- frontend/   Angular application
```

## Getting Started

### Prerequisites

- Node.js and npm
- Java 23
- Docker or a local PostgreSQL installation
- OpenRouteService API key

### 1. Start the database

```bash
cd backend
docker compose up -d
```

The default database configuration uses:

- Database: `tourplanner`
- User: `admin`
- Password: `admin`
- Port: `5432`

### 2. Configure the backend

Create or update `backend/src/main/resources/application-local.properties`:

```properties
openrouteservice.api-key=YOUR_OPENROUTESERVICE_API_KEY
```

### 3. Run the backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The API runs on `http://localhost:8080`.

Swagger UI is available at:

```text
http://localhost:8080/docs
```

### 4. Run the frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs on:

```text
http://localhost:4200
```

## Tests

Backend tests:

```bash
cd backend
./mvnw test
```

Frontend tests:

```bash
cd frontend
npm test
```

## Notes

Open-Meteo does not require an API key. OpenRouteService is used for geocoding and route calculation, so the backend needs a valid API key before tours with route data can be created.
