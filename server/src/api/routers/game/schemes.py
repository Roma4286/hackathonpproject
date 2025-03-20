from pydantic import BaseModel

class GetNews(BaseModel):
    news_id: int
    name: str
    text: str