# models.py
from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class Status(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"

class Ticket(BaseModel):
    id: Optional[UUID] = uuid4()
    title: str
    description: str
    status: Status = Status.open
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()