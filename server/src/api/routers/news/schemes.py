from pydantic import BaseModel

class NewsSchema(BaseModel):
    name: str
    text: str
    reply_if_correct: str
    reply_if_wrong: str
    is_true: bool
    misinformation_level_delta: int
    pollution_delta: int
    trust_science_delta: int
