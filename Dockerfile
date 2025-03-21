FROM python:3.12-slim

WORKDIR /server

COPY server/requirements.txt .
RUN pip install -r requirements.txt

COPY server /server

CMD ["sh", "-c", "alembic upgrade head && uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --proxy-headers --forwarded-allow-ips='*'"]
