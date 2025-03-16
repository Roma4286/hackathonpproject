FROM python:3.12-slim

WORKDIR /server

COPY requirements.txt .
RUN pip install -r requirements.txt

# Сначала копируем весь серверный код
COPY . /server

CMD ["sh", "-c", "alembic upgrade head && uvicorn src.api.main:app --host 0.0.0.0 --port 8000"]
