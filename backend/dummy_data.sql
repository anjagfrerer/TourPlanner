DROP TABLE IF EXISTS tour_log CASCADE;
DROP TABLE IF EXISTS tour CASCADE;
DROP TABLE IF EXISTS route CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
                                     id UUID PRIMARY KEY,
                                     username VARCHAR(255) NOT NULL UNIQUE,
                                     password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS route (
                                     id UUID PRIMARY KEY,
                                     start_lat DOUBLE PRECISION,
                                     start_long DOUBLE PRECISION,
                                     end_lat DOUBLE PRECISION,
                                     end_long DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS tour (
                                    id UUID PRIMARY KEY,
                                    name VARCHAR(255) NOT NULL,
                                    description TEXT,
                                    start_location VARCHAR(255),
                                    destination_location VARCHAR(255),
                                    transport_type INT,
                                    distance DOUBLE PRECISION,
                                    estimated_time VARCHAR(255),
                                    rating INT,
                                    tour_route_information UUID REFERENCES route(id),
                                    created_by_id UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tour_log (
                                        tour_log_id UUID PRIMARY KEY,
                                        date DATE,
                                        time TIME,
                                        rating INT,
                                        difficulty INT,
                                        total_distance_km DOUBLE PRECISION,
                                        total_time_min INT,
                                        comment TEXT,
                                        tour_id UUID REFERENCES tour(id),
                                        author_id UUID REFERENCES users(id)
);

-- USERS (Passwort lautet: password123)
INSERT INTO users (id, username, password)
VALUES
    ('a1111111-1111-1111-1111-111111111111'::uuid, 'anja', '$2a$10$vHUoR1o21nxUD0.BQyV5N.qEjJH7.PK89kxlJelnYfVCMu9yDQpgG'),
    ('b2222222-2222-2222-2222-222222222222'::uuid, 'munsinator', '$2a$10$vHUoR1o21nxUD0.BQyV5N.qEjJH7.PK89kxlJelnYfVCMu9yDQpgG');

-- ROUTES
INSERT INTO route (id, start_lat, start_long, end_lat, end_long)
VALUES
    ('c1111111-1111-1111-1111-111111111111'::uuid, 48.2082, 16.3738, 48.3123, 16.3456),
    ('c2222222-2222-2222-2222-222222222222'::uuid, 48.2115, 16.4042, 48.1950, 16.4442);

-- TOURS
INSERT INTO tour (id, name, description, start_location, destination_location, transport_type, distance, estimated_time, rating, tour_route_information, created_by_id)
VALUES
    (
        'd1111111-1111-1111-1111-111111111111'::uuid,
        'Kahlenberg Hike',
        'Schöne Frühlingswanderung mit Blick über ganz Wien.',
        'Wien Mitte',
        'Kahlenberg Spitze',
        1,
        14.5,
        '03:30:00',
        5,
        'c1111111-1111-1111-1111-111111111111'::uuid,
        'a1111111-1111-1111-1111-111111111111'::uuid
    ),
    (
        'd2222222-2222-2222-2222-222222222222'::uuid,
        'Prater Interval-Run',
        'Flache, schnelle Laufrunde auf Asphalt.',
        'Praterstern',
        'Lusthaus',
        2,
        8.2,
        '00:45:00',
        4,
        'c2222222-2222-2222-2222-222222222222'::uuid,
        'b2222222-2222-2222-2222-222222222222'::uuid
    );

-- TOUR LOGS
INSERT INTO tour_log (tour_log_id, date, time, rating, difficulty, total_distance_km, total_time_min, comment, tour_id, author_id)
VALUES
    (
        'f1111111-1111-1111-1111-111111111111'::uuid,
        '2026-05-20',
        '10:15:00',
        5,
        3,
        14.5,
        210,
        'Super Wetter, die Aussicht war grandios. Kahlenberger Hütte hatte offen!',
        'd1111111-1111-1111-1111-111111111111'::uuid,
        'a1111111-1111-1111-1111-111111111111'::uuid
    ),
    (
        'f2222222-2222-2222-2222-222222222222'::uuid,
        '2026-05-24',
        '18:30:00',
        4,
        2,
        8.2,
        43,
        'Etwas windig auf der Hauptallee, aber Bestzeit knapp verfehlt.',
        'd2222222-2222-2222-2222-222222222222'::uuid,
        'b2222222-2222-2222-2222-222222222222'::uuid
    );