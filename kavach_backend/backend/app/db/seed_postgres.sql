-- Clean old entries
DELETE FROM users_core;

-- ---------------------------------------------------------------------------
-- SEED DEFAULT USERS (Passwords match our standard test profile: 'KavachSecure2026')
-- Hashes are pre-computed using secure passlib pass-stretching bcrypt algorithms
-- ---------------------------------------------------------------------------
INSERT INTO users_core (username, password_hash, rank_role, station_id, subdivision_scope) VALUES
(
    'constable_mysore', 
    '$2b$12$ZmxN0xR9C12w8i23Z3B8OeNf09Nn8.K/2qGz3B9bH7M0j.r6bY8qy', 
    'Constable', 
    'MYS-STN-02', 
    'Mysore Central'
),
(
    'inspector_mysore', 
    '$2b$12$ZmxN0xR9C12w8i23Z3B8OeNf09Nn8.K/2qGz3B9bH7M0j.r6bY8qy', 
    'Inspector', 
    'MYS-STN-02', 
    'Mysore Central'
),
(
    'scrb_analyst_state', 
    '$2b$12$ZmxN0xR9C12w8i23Z3B8OeNf09Nn8.K/2qGz3B9bH7M0j.r6bY8qy', 
    'SCRB_Analyst', 
    'HQ-BANGALORE', 
    'STATE-WIDE'
);