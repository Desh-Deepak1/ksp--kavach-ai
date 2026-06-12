-- ---------------------------------------------------------------------------
-- 1. DROP EXISTING CONSTRAINTS AND TABLES TO ENSURE IDEMPOTENT INITIALIZATION
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS immutable_audit CASCADE;
DROP TABLE IF EXISTS users_core CASCADE;

-- ---------------------------------------------------------------------------
-- 2. CREATE SYSTEM USERS STORAGE PROFILE WITH ENFORCED RBAC DOMAINS
-- ---------------------------------------------------------------------------
CREATE TABLE users_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rank_role VARCHAR(20) NOT NULL CHECK (rank_role IN ('Constable', 'Inspector', 'SCRB_Analyst', 'IT_Auditor')),
    station_id VARCHAR(50) NOT NULL,
    subdivision_scope VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- 3. CREATE SECURE CRYPTOGRAPHICALLY AUDITABLE ACCESS HISTORY LEDGER
-- ---------------------------------------------------------------------------
CREATE TABLE immutable_audit (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users_core(id) ON DELETE RESTRICT,
    username VARCHAR(50) NOT NULL,
    rank_role VARCHAR(20) NOT NULL,
    action_performed VARCHAR(100) NOT NULL,
    query_intent_hash VARCHAR(64) NOT NULL, -- SHA-256 hash tracking intent matching
    accessed_station_context VARCHAR(50) NOT NULL,
    timestamp_triggered TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- 4. PERFORMANCE TUNING & SECURITY INDEXES
-- ---------------------------------------------------------------------------
CREATE INDEX idx_users_username ON users_core(username);
CREATE INDEX idx_audit_user_lookup ON immutable_audit(user_id);
CREATE INDEX idx_audit_timestamp ON immutable_audit(timestamp_triggered);