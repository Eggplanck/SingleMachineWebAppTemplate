from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
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

@app.post("/memos/", response_model=schemas.Memo, status_code=201)
def create_memo(memo: schemas.MemoCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo_by_title(db, memo.title, current_user.id)
    if db_memo:
        raise HTTPException(status_code=409, detail="Title already registered")
    return crud.create_memo(db, memo, current_user.id)

@app.get("/memos/", response_model=List[schemas.Memo], status_code=200)
def read_multiple_memos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    memos = crud.get_memos(db, current_user.id, skip, limit)
    return memos

@app.get("/memos/{memo_id}", response_model=schemas.Memo, status_code=200)
def read_one_memo(memo_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo(db, memo_id, current_user.id)
    if db_memo is None:
        raise HTTPException(status_code=404, detail="Memo not found")
    return db_memo

@app.put("/memos/{memo_id}", response_model=schemas.Memo, status_code=200)
def update_memo(memo_id: int, memo: schemas.MemoCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo(db, memo_id, current_user.id)
    if db_memo is None:
        raise HTTPException(status_code=404, detail="Memo not found")
    db_memo = crud.get_memo_by_title(db, memo.title, current_user.id)
    if db_memo and db_memo.id != memo_id:
        raise HTTPException(status_code=409, detail="Title already registered")
    return crud.update_memo(db, memo_id, memo)

@app.delete("/memos/{memo_id}", status_code=204)
def delete_memo(memo_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo(db, memo_id, current_user.id)
    if db_memo is None:
        raise HTTPException(status_code=404, detail="Memo not found")
    crud.delete_memo(db, memo_id)
    return Response(status_code=204)


@app.post("/token", response_model=auth.Token)
async def login_to_get_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}