from fastapi import APIRouter, Depends

from src.api.routers.user.schemes import UserData
from src.models import User
from src.api.routers.jwt_utils import get_current_user

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
    user_data = UserData(username=user.username, misinformation_level=user.misinformation_level, pollution=user.pollution, trust_science=user.trust_science, general_condition=condition_world)
    return {"data": user_data.model_dump()}