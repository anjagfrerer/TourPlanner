-- USERS
INSERT INTO users (email, password_hash) VALUES
('max@example.com', 'hashed_pw_1'),
('anna@example.com', 'hashed_pw_2');


-- TOURS
INSERT INTO tours (
    userId,
    tourName,
    tourDescription,
    startLocation,
    endLocation,
    transportType,
    distance,
    estTime,
    routeGeoJson,
    childFriendliness,
    popularity
) VALUES
(
    1,
    'Donau Bike Tour',
    'Nice bike ride along the Danube.',
    'Linz',
    'Grein',
    'bike',
    42.5,
    150,
    '{"type":"LineString","coordinates":[[14.2858,48.3069],[14.8560,48.2280]]}'
),
(
    1,
    'Mountain Hike',
    'Beautiful hike with great view.',
    'Innsbruck',
    'Seegrube',
    'hike',
    8.2,
    180,
    '{"type":"LineString","coordinates":[[11.4041,47.2692],[11.3923,47.3063]]}'
),
(
    2,
    'City Run',
    'Running tour through the city park.',
    'Vienna Center',
    'Prater',
    'run',
    5.0,
    40,
    '{"type":"LineString","coordinates":[[16.3738,48.2082],[16.4200,48.2167]]}'
);


-- TOUR LOGS
INSERT INTO tourLogs (
    tourId,
    comment,
    difficulty,
    totalTime,
    dateTime,
    totalDistance,
    rating
) VALUES
(
    1,
    'Great weather and easy ride.',
    2,
    145,
    '2026-03-01 10:00:00',
    42.5,
    5
),
(
    1,
    'Windy but enjoyable.',
    3,
    150,
    '2026-03-10 09:30:00',
    42.5,
    4
),
(
    2,
    'Steep but amazing view.',
    4,
    190,
    '2026-03-05 08:00:00',
    8.2,
    4
),
(
    3,
    'Nice quick morning run.',
    2,
    38,
    '2026-03-08 07:30:00',
    5.0,
    5
),
(
    3,
    'Crowded but still good.',
    2,
    42,
    '2026-03-12 18:00:00',
    5.0,
    4
);