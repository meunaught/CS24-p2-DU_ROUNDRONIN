from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import database, schemas, models, utils, oauth2

router = APIRouter(
    prefix="/auth",
    tags=['Authentication']
)


@router.post('/login', response_model=schemas.Token)
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

    user = db.query(models.User).filter(
        models.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    
    access_token = oauth2.create_access_token(data={"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("bearer")
    return {"status":"success"}

@router.put("/change-password", response_model=schemas.Token)
async def change_password(new_password: str, old_password: str, current_user: models.User = Depends(oauth2.get_current_user), db: Session = Depends(database.get_db)):
    if not utils.verify(old_password, current_user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    hashed_password = utils.hash(new_password)
    current_user.password = hashed_password
    db.commit()
    db.refresh(current_user)

@router.post("/reset-password/initiate", response_model=schemas.Token)
async def reset_password_initiate():
    pass

@router.post("/reset-password/confirm", response_model=schemas.Token)
async def reset_password_confirm():
    pass