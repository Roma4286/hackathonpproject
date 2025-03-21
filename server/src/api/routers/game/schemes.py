from pydantic import BaseModel

class GetNews(BaseModel):
    news_id: int
    name: str
    text: str

class Answer(BaseModel):
    news_id: int
    answer: bool