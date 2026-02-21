from pydantic import BaseModel

class Machine(BaseModel):
    id: int
    name: str
    category: str
    location: str
    price_per_day: float
    available: bool