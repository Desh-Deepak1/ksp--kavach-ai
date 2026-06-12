// ---------------------------------------------------------------------------
// 1. CREATE UNIQUE CONSTRAINTS FOR CORE LOGISTICAL ENTITIES
// ---------------------------------------------------------------------------
CREATE CONSTRAINT unique_fir_id IF NOT EXISTS 
FOR (f:FIR) REQUIRE f.fir_id IS UNIQUE;

CREATE CONSTRAINT unique_suspect_id IF NOT EXISTS 
FOR (s:Suspect) REQUIRE s.suspect_id IS UNIQUE;

CREATE CONSTRAINT unique_phone_number IF NOT EXISTS 
FOR (p:Phone) REQUIRE p.phone_number IS UNIQUE;

CREATE CONSTRAINT unique_vehicle_plate IF NOT EXISTS 
FOR (v:Vehicle) REQUIRE v.plate_number IS UNIQUE;

// ---------------------------------------------------------------------------
// 2. CREATE SEARCH INDEXES FOR OPTIMIZED TRAVERSAL ROUTINES
// ---------------------------------------------------------------------------
CREATE INDEX idx_fir_modus_operandi IF NOT EXISTS 
FOR (f:FIR) ON (f.modus_operandi);

CREATE INDEX idx_suspect_name IF NOT EXISTS 
FOR (s:Suspect) ON (s.name);