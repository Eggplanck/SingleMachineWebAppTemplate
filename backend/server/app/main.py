from fastapi import Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session
from typing import List

from . import crud, models, schemas, auth
from .database import engine, get_db


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users/", response_model=schemas.User, status_code=201)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=409, detail="Username already used")
    hashed_password = auth.get_password_hash(user.password)
    return crud.create_user(db, user.username, hashed_password)

@app.get("/users/", response_model=List[schemas.User], status_code=200)
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip, limit)
    return users
