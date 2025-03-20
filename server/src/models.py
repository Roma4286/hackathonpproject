from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import String, Integer, Text, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base, engine

class History(BaseModel):
    date: datetime
    id_news: int
    answer: bool
    misinformation_level_delta: int
    pollution_delta: int
    trust_science_delta: int

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30))
    password: Mapped[str] = mapped_column(String(200))
    misinformation_level: Mapped[int] = mapped_column(Integer, default=0)
    pollution: Mapped[int] = mapped_column(Integer, default=0)
    trust_science: Mapped[int] = mapped_column(Integer, default=0)
    history: Mapped[list] = mapped_column(JSON, default=list)

    @classmethod
    def get_object(cls, session, id=None, username=None, password=None):
        query = super().get_object(session=session, id=id, username=username, password=password)
        return query

class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    text: Mapped[str] = mapped_column(Text())
    reply_if_correct: Mapped[str] = mapped_column(Text())
    reply_if_wrong: Mapped[str] = mapped_column(Text())
    is_true: Mapped[bool] = mapped_column(Boolean, default=True)
    misinformation_level_delta: Mapped[int] = mapped_column(Integer)
    pollution_delta: Mapped[int] = mapped_column(Integer)
    trust_science_delta: Mapped[int] = mapped_column(Integer)

    @classmethod
    def get_object(cls, session, id=None, name=None, text=None, explanation=None, is_true=None, disinformation_level_delta=None, pollution_delta=None, trust_science_delta=None):
        query = super().get_object(session=session, id=id, name=name, text=None, explanation=None, is_true=is_true, disinformation_level_delta=disinformation_level_delta, pollution_delta=pollution_delta, trust_science_delta=trust_science_delta)
        return query

# Base.metadata.create_all(bind=engine)
