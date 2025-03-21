from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func

from src.api.routers.game.schemes import GetNews, Answer
from src.models import User
from src.api.routers.jwt_utils import get_current_user
from src.models import News
from src.database import get_db

router = APIRouter(
    prefix="/game",
    tags=["Game"]
)

@router.get('/random_news')
async def get_random_news(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    news = News.get_object(db).order_by(func.random()).first()
    data = GetNews(news_id=news.id, name=news.name, text=news.text, )
    return {"data": data.model_dump()}

@router.post('/check_answer')
async def check_answer(answer: Answer, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    news = News.get_object(db, id=answer.news_id).first()
    if answer.answer == news.is_true:
        user.misinformation_level = user.misinformation_level + news.misinformation_level_delta
        user.pollution = user.pollution + news.pollution_delta
        user.trust_science = user.trust_science + news.trust_science_delta
        user.save(db)
        return {"message": news.reply_if_correct}

    user.misinformation_level = user.misinformation_level - news.misinformation_level_delta
    user.pollution = user.pollution - news.pollution_delta
    user.trust_science = user.trust_science - news.trust_science_delta
    user.save(db)
    return {"message": news.reply_if_wrong}