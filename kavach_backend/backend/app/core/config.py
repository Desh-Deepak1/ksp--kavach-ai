from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Server Settings
    PROJECT_NAME: str = "KSP-Kavach AI"
    API_V1_STR: str = "/api/v1"
    
    # Security Configurations (Cryptographic Defaults)
    SECRET_KEY: str = "7a8c9b2d1e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # PostgreSQL Connection Strings
    POSTGRES_USER: str = "ksp_admin"
    POSTGRES_PASSWORD: str = "SecretKavachPassword2026_Secure"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "ksp_kavach_core"

    # Neo4j Connection Strings
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "SecureKavachGraph2026_Admin"

    # OpenSearch Connection Strings
    OPENSEARCH_HOST: str = "localhost"
    OPENSEARCH_PORT: int = 9200

    class Config:
        case_sensitive = True

settings = Settings()