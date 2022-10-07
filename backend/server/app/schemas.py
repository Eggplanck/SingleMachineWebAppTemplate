from typing import Union, List
import datetime
from pydantic import BaseModel


class MemoBase(BaseModel):
    title: str
    content: Union[str, None] = None

class MemoCreate(MemoBase):
    pass

class Memo(MemoBase):
    id: int
    create_time: datetime.datetime
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True