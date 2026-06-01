-- ACHTUNG, LÖSCHT ALLES IN DER DB!
TRUNCATE TABLE tour_log CASCADE;
TRUNCATE TABLE tour CASCADE;
TRUNCATE TABLE route CASCADE;
TRUNCATE TABLE users CASCADE;

-- USERS (password123)
INSERT INTO users (id, username, password)
VALUES
    ('a1111111-1111-1111-1111-111111111111', 'anja', '$2a$10$vHUoR1o21nxUD0.BQyV5N.qEjJH7.PK89kxlJelnYfVCMu9yDQpgG'),
    ('b2222222-2222-2222-2222-222222222222', 'munsinator', '$2a$10$vHUoR1o21nxUD0.BQyV5N.qEjJH7.PK89kxlJelnYfVCMu9yDQpgG');

-- ROUTES
INSERT INTO route (id, start_lat, start_long, end_lat, end_long)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 48.2082, 16.3738, 48.3123, 16.3456),
    ('c2222222-2222-2222-2222-222222222222', 48.2115, 16.4042, 48.1950, 16.4442);

-- TOURS
INSERT INTO tour (id, name, description, start_location, destination_location, transport_type, distance, estimated_time, rating, tour_route_information, created_by_id)
VALUES
    (
        'd1111111-1111-1111-1111-111111111111',
        'Kahlenberg Hike',
        'Schöne Frühlingswanderung mit Blick über ganz Wien.',
        'Wien Mitte',
        'Kahlenberg Spitze',
        1,
        14.5,
        '03:30:00',
        5,
        'c1111111-1111-1111-1111-111111111111',
        'a1111111-1111-1111-1111-111111111111'
    ),
    (
        'd2222222-2222-2222-2222-222222222222',
        'Prater Intervall-Run',
        'Flache, schnelle Laufrunde auf Asphalt.',
        'Praterstern',
        'Lusthaus',
        2,
        8.2,
        '00:45:00',
        4,
        'c2222222-2222-2222-2222-222222222222',
        'b2222222-2222-2222-2222-222222222222'
    );

-- TOUR LOGS
INSERT INTO tour_log (tour_log_id, date, time, rating, difficulty, total_distance_km, total_time_min, comment, tour_id, author_id)
VALUES
    (
        'f1111111-1111-1111-1111-111111111111',
        '2026-05-20',
        '10:15:00',
        5,
        3,
        14.5,
        210,
        'Super Wetter, die Aussicht war grandios. Kahlenberger Hütte hatte offen!',
        'd1111111-1111-1111-1111-111111111111',
        'a1111111-1111-1111-1111-111111111111'
    ),
    (
        'f2222222-2222-2222-2222-222222222222',
        '2026-05-24',
        '18:30:00',
        4,
        2,
        8.2,
        43,
        'Etwas windig auf der Hauptallee, aber Bestzeit knapp verfehlt.',
        'd2222222-2222-2222-2222-222222222222',
        'b2222222-2222-2222-2222-222222222222'
    );