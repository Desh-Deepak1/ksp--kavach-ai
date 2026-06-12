from pydantic import BaseModel, Field, field_validator
import re

class UserLogin(BaseModel):
    username: str = Field(..., min_length=4, max_length=50, description="Unique operational identification token")
    password: str = Field(..., min_length=8, description="Cryptographic system entry phrase")

    @field_validator('username')
    @classmethod
    def sanitize_username(cls, v: str) -> str:
        # Enforce strict alphanumeric structures to block NoSQL/SQL injection payload markers
        if not re.match(r"^[a-zA-Z0-9_]+$", v):
            raise ValueError("Username must contain only alphanumeric characters and underscores")
        return v

class Token(BaseModel):
    access_token: str
    token_type: str
    rank_role: str

class TokenData(BaseModel):
    username: str | None = None
    rank_role: str | None = None
    station_id: str | None = None
    subdivision_scope: str | None = None

class InvestigationQuery(BaseModel):
    query_text: str = Field(..., min_length=3, max_length=1000)