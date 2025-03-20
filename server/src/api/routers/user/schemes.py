from pydantic import BaseModel

class UserData(BaseModel):
    username: str
    misinformation_level: int
    pollution: int
    trust_science: int
    general_condition: str