CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE tours (
    tourId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    tourName VARCHAR(255) NOT NULL,
    tourDescription TEXT NOT NULL,
    startLocation VARCHAR(255) NOT NULL,
    endLocation VARCHAR(255) NOT NULL,
    transportType VARCHAR(50) NOT NULL,
    distance DOUBLE PRECISION NOT NULL,
    estTime INTEGER NOT NULL,
    routeGeoJson JSONB,
    --childFriendliness BOOLEAN DEFAULT false,
    --popularity INTEGER DEFAULT 0,
    CONSTRAINT fk_tour_user FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE tourLogs (
    tourLogId SERIAL PRIMARY KEY,
    tourId INTEGER NOT NULL,
    comment TEXT,
    difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
    totalTime INTEGER,
    dateTime TIMESTAMP NOT NULL,
    totalDistance DOUBLE PRECISION,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT fk_log_tour FOREIGN KEY (tourId) REFERENCES tours(tourId) ON DELETE CASCADE
);