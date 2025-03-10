import time
from datetime import datetime, timedelta
from typing import Optional

from jose import jwt, JWTError
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from src.config import settings
from src.database import get_db
from src.models import User


def create_jwt(
    data: dict,
    private_key: str = settings.auth_jwt.private_key_path.read_text(),
    algorithm: str = settings.auth_jwt.algorithm,
    expire_minutes: int = settings.auth_jwt.access_token_expire_minutes,
) -> str:
    to_encode = data.copy()
    now = datetime.fromtimestamp(time.time())
    expire = now + timedelta(minutes=expire_minutes)
    to_encode.update(exp=expire, iat=now)
    encoded = jwt.encode(to_encode, private_key, algorithm=algorithm)
    return encoded


def decode_jwt(
    token: str | bytes,
    public_key: str = settings.auth_jwt.public_key_path.read_text(),
    algorithm: str = settings.auth_jwt.algorithm,
) -> dict:
    decoded = jwt.decode(token, public_key, algorithms=[algorithm])
    return decoded

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(access_token: Optional[str] = Depends(oauth2_scheme),  db: Session = Depends(get_db)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = decode_jwt(token=access_token)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        if int(datetime.now().timestamp())+10800 > payload.get("exp"):
            raise HTTPException(status_code=401, detail="Token has expired")
    except JWTError as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid token")

    user = User.get_object(db, username=username).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
