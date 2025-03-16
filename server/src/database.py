from redis import Redis
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from fastapi import HTTPException

from src.config import settings

engine = create_engine(
    url=settings.db_url,
    echo=True,
)

session_factory = sessionmaker(engine)

class Base(DeclarativeBase):
    def save(self, session, with_commit: bool = True):
        session.add(self)
        if with_commit:
            session.commit()

    @classmethod
    def get_object(cls, session, **filters):
        query = session.query(cls)
        for key, value in filters.items():
            if value:
                query = query.filter(getattr(cls, key) == value)
        return query

    def delete(self, session):
        session.delete(self)
        session.commit()

def get_db():
    db = session_factory()
    try:
        yield db
    finally:
        db.close()

redis_client = Redis(host=settings.redis.host, port=settings.redis.port, db=settings.redis.db)

def redis_get_value(key):
    item = redis_client.get(f'game:{key}')

    if not item:
        raise HTTPException(status_code=404, detail="Not found")

    decoded_str = item.decode('utf-8')
    return decoded_str
