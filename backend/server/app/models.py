import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


tz_jst = datetime.timezone(datetime.timedelta(hours=9))

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    memos = relationship("Memo", back_populates="owner")

class Memo(Base):
    __tablename__ = "memos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    create_time = Column(DateTime, default=lambda: datetime.datetime.now(tz_jst))
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="memos")