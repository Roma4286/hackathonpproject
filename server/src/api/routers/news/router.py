from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.routers.news.schemes import NewsSchema
from src.models import News
from src.database import get_db
from typing import List

router = APIRouter(
    prefix="/news",
    tags=["News"]
)


@router.post("/add_news")
async def add_news(
        news_list: List[NewsSchema],
        db: AsyncSession = Depends(get_db),
):
    news_objects = [News(**news.model_dump()) for news in news_list]

    db.add_all(news_objects)
    db.commit()

    return {"message": "News added successfully"}
