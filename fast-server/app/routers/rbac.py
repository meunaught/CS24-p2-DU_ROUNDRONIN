from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils
from ..database import get_db

router = APIRouter(
    prefix="/rbac",
    tags=['Role Based Access Control']
)

@router.get("/permissions", response_model=list[schemas.PermissionOut])
def get_permissions(db: Session = Depends(get_db)):
    permissions = db.query(models.Permission).all()
    return permissions

@router.get("/roles/{roleId}/permissions", response_model=list[schemas.PermissionOut])
def get_permissions_for_role(roleId: int, db: Session = Depends(get_db)):
    role = db.query(models.Role).filter(models.Role.id == roleId).first()
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return role.permissions

@router.post("/roles", status_code=status.HTTP_201_CREATED, response_model=schemas.RoleOut)
def create_role(role: schemas.RoleCreate, db: Session = Depends(get_db)):
    if db.query(models.Role).filter(models.Role.id == role.id).first():
        raise HTTPException(status_code=400, detail="Role already exists")
    new_role = models.Role(**role.dict())
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

@router.delete("/roles/{roleId}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(roleId: int, db: Session = Depends(get_db)):
    if roleId == 1000:
        raise HTTPException(status_code=400, detail="Cannot delete default role")
    role = db.query(models.Role).filter(models.Role.id == roleId).first()
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    db.delete(role)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)