from fastapi import APIRouter, Depends

from src.models import User
from src.api.routers.jwt_utils import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.get('/')
async def get_user(user: User = Depends(get_current_user)):
    return {"username": user.username}