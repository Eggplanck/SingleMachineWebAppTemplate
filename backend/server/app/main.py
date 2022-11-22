from fastapi import Depends, FastAPI, Response, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import crud, models, schemas, auth
from .database import engine, get_db
from .exceptions import ItemAlreadyExistException, ItemNotFoundException, AuthenticationException


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users/", response_model=schemas.User, status_code=201)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise ItemAlreadyExistException(detail="Username already used")
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
        raise ItemAlreadyExistException(detail="Title already registered")
    return crud.create_memo(db, memo, current_user.id)

@app.get("/memos/", response_model=List[schemas.Memo], status_code=200)
def read_multiple_memos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    memos = crud.get_memos(db, current_user.id, skip, limit)
    return memos

@app.get("/memos/{memo_id}", response_model=schemas.Memo, status_code=200)
def read_one_memo(memo_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo(db, memo_id, current_user.id)
    if db_memo is None:
        raise ItemNotFoundException(detail="Memo not found")
    return db_memo

@app.put("/memos/{memo_id}", response_model=schemas.Memo, status_code=200)
def update_memo(memo_id: int, memo: schemas.MemoCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo(db, memo_id, current_user.id)
    if db_memo is None:
        raise ItemNotFoundException(detail="Memo not found")
    db_memo = crud.get_memo_by_title(db, memo.title, current_user.id)
    if db_memo and db_memo.id != memo_id:
        raise ItemAlreadyExistException(detail="Title already registered")
    return crud.update_memo(db, memo_id, memo)

@app.delete("/memos/{memo_id}", status_code=204)
def delete_memo(memo_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    db_memo = crud.get_memo(db, memo_id, current_user.id)
    if db_memo is None:
        raise ItemNotFoundException(detail="Memo not found")
    crud.delete_memo(db, memo_id)
    return Response(status_code=204)


@app.post("/token", response_model=auth.Token)
async def login_to_get_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise AuthenticationException(detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

#Exception Handler
@app.exception_handler(ItemAlreadyExistException)
def item_already_exist_exception_handler(request: Request, exc: ItemAlreadyExistException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

@app.exception_handler(ItemNotFoundException)
def item_not_found_exception_handler(request: Request, exc: ItemNotFoundException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

@app.exception_handler(AuthenticationException)
def authentication_exception_handler(request: Request, exc: AuthenticationException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return await request_validation_exception_handler(request, exc)

@app.exception_handler(HTTPException)
def any_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )