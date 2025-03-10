from pydantic import BaseModel

class UserParams(BaseModel):
    username: str
    password: str
