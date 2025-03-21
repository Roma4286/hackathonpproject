from typing import Annotated

from fastapi import HTTPException, APIRouter, Depends,Response
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from src.api.routers.auth.schemes import UserParams
from src.api.routers.jwt_utils import create_jwt
from src.database import get_db
from src.models import User

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

router_token = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
async def register(user_params: UserParams, db: Session = Depends(get_db)):
    existing_user = User.get_object(db, username=user_params.username).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="Username already registered")

    hashed_password = pwd_context.hash(user_params.password)
    new_user = User(username=user_params.username, password=hashed_password)
    new_user.save(db)
    return {"message": "User registered successfully"}

@router_token.post('/token')
async def post_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db),  response: Response = None):
    db_user = User.get_object(db, username=form_data.username).first()
    if not db_user or not pwd_context.verify(form_data.password, db_user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_jwt(data={"sub": form_data.username, 'jti': str(db_user.id)})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True
    )

    return {"message": "Login successful"}
