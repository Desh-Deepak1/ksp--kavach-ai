from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from backend.app.core.config import settings
from backend.app.core.security import verify_password, create_access_token
from backend.app.db.postgres_client import pg_client
from backend.app.models.schemas import UserLogin, Token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_for_access_token(payload: UserLogin):
    # 1. Fetch user data securely via parameterized PostgreSQL lookups
    user = pg_client.fetch_user_by_username(payload.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect operational username or cryptographic password entry context"
        )
    
    # 2. Verify Bcrypt password hash matches the database state
    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect operational username or cryptographic password entry context"
        )
    
    # 3. Compile hierarchical security claims into the JWT payload
    token_claims = {
        "sub": user["username"],
        "role": user["rank_role"],
        "station_id": user["station_id"],
        "subdivision_scope": user["subdivision_scope"]
    }
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data=token_claims, expires_delta=access_token_expires)
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "rank_role": user["rank_role"]
    }