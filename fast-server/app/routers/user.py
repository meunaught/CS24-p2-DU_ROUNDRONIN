from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=['User Management']
)


@router.get("/",response_model=list[schemas.UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@router.get('/roles', response_model=list[schemas.RoleOut])
def get_roles(db: Session = Depends(get_db)):
    roles = db.query(models.Role).all()
    return roles

@router.get('/{userId}', response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db), ):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")

    return user

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"User with email: {user.email} already exists")
    hashed_password = utils.hash(user.password)
    user.password = hashed_password
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user



@router.put('/{userId}', response_model=schemas.UserOut)
def update_user(id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")
    if user.email:
        db_user.email = user.email
        db.commit()
        db.refresh(db_user)

    return db_user

@router.put('/{userId}/roles/', response_model=schemas.UserOut)
def update_role(role_id : int, user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {user_id} does not exist")
    db_role = db.query(models.Role).filter(models.Role.id == role_id).first()
    if not db_role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Role with id: {role_id} does not exist")
    db_user.role = db_role
    db.commit()
    db.refresh(db_user)

    return db_user

@router.delete('/{userId}', status_code=status.HTTP_204_NO_CONTENT, response_model=None)
def delete_user(id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id: {id} does not exist")
    db.delete(db_user)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
