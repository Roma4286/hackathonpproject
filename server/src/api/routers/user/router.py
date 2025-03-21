from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.api.routers.user.schemes import UserData
from src.models import User
from src.api.routers.jwt_utils import get_current_user
from src.database import get_db

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

@router.get('/')
async def get_user(user: User = Depends(get_current_user)):
    sum_params = user.misinformation_level + user.pollution + user.trust_science
    if sum_params <= -20:
        condition_world = 'Bad'
    elif sum_params >= 20:
        condition_world = 'Excellent'
    else:
        condition_world = 'Normal'
    user_data = UserData(username=user.username, misinformation_level=user.misinformation_level, pollution=user.pollution, trust_science=user.trust_science, general_condition=condition_world, passed_intro=user.passed_intro)
    return {"data": user_data.model_dump()}

@router.post('/passed_intro')
async def passed_intro(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user.passed_intro = True
    user.save(db)

    return {"message": "success"}