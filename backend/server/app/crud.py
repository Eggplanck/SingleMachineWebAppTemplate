from sqlalchemy.orm import Session

from . import models, schemas


def create_user(db: Session, username: str, hashed_password: str):
    db_user = models.User(username=username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_memo(db: Session, memo: schemas.MemoCreate, owner_id: int):
    db_memo = models.Memo(**memo.dict(), owner_id=owner_id)
    db.add(db_memo)
    db.commit()
    db.refresh(db_memo)
    return db_memo

def get_memo(db: Session, memo_id: int, owner_id: int):
    return db.query(models.Memo).filter(models.Memo.owner_id == owner_id).filter(models.Memo.id == memo_id).first()

def get_memos(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Memo).filter(models.Memo.owner_id == owner_id).offset(skip).limit(limit).all()

def get_memo_by_title(db: Session, title: str, owner_id: int):
    return db.query(models.Memo).filter(models.Memo.owner_id == owner_id).filter(models.Memo.title == title).first()