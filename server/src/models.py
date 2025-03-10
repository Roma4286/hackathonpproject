from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base, engine

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(30))
    password: Mapped[str] = mapped_column(String(255))

    @classmethod
    def get_object(cls, session, id=None, username=None, password=None, role=None):
        query = super().get_object(session=session, id=id, username=username, password=password)
        return query


# Base.metadata.create_all(bind=engine)
