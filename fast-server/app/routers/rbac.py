from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter, Path
from sqlalchemy.orm import Session
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/rbac",
    tags=['Role Based Access Control']
)

@router.get("/permissions", response_model=list[schemas.PermissionOut])
def get_permissions(db: Session = Depends(get_db), isSuperUser: bool = Depends(oauth2.is_superuser)):
    if not isSuperUser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Insufficicent Permissions")
    permissions = db.query(models.Permission).all()
    return permissions

@router.get("/roles/{roleId}/permissions", response_model=list[schemas.PermissionOut])
def get_permissions_for_role(roleId: int = Path(...), db: Session = Depends(get_db), isSuperUser: bool = Depends(oauth2.is_superuser)):
    if not isSuperUser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Insufficicent Permissions")
    role = db.query(models.Role).filter(models.Role.id == roleId).first()
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    permissions = db.query(models.Permission).join(models.role_permission_association).filter(models.role_permission_association.role_id == roleId).all()
    return permissions

@router.post("/roles", status_code=status.HTTP_201_CREATED, response_model=schemas.RoleOut)
def create_role(role: schemas.RoleCreate, db: Session = Depends(get_db), isSuperUser: bool = Depends(oauth2.is_superuser)):
    if not isSuperUser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Insufficicent Permissions")
    if db.query(models.Role).filter(models.Role.id == role.id).first():
        raise HTTPException(status_code=400, detail="Role already exists")
    new_role = models.Role(**role.dict())
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

@router.post("/permissions", status_code=status.HTTP_201_CREATED, response_model=schemas.PermissionOut)
def create_permission(permission: schemas.PermissionCreate, db: Session = Depends(get_db), isSuperUser: bool = Depends(oauth2.is_superuser)):
    if not isSuperUser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Insufficicent Permissions")
    if db.query(models.Permission).filter(models.Permission.id == permission.id).first():
        raise HTTPException(status_code=400, detail="Permission already exists")
    new_permission = models.Permission(**permission.dict())
    db.add(new_permission)
    db.commit()
    db.refresh(new_permission)
    return new_permission

@router.post("/roles/{roleId}/permissions/", status_code=status.HTTP_201_CREATED, response_model=schemas.PermissionOut) 
def add_permission_to_role(permissionId: int, roleId : int = Path(...), db: Session = Depends(get_db), isSuperUser: bool = Depends(oauth2.is_superuser)):
    if not isSuperUser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Insufficicent Permissions")
    role = db.query(models.Role).filter(models.Role.id == roleId).first()
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    permission = db.query(models.Permission).filter(models.Permission.id == permissionId).first()
    if permission is None:
        raise HTTPException(status_code=404, detail="Permission not found")
    role_permission = models.role_permission_association(role_id=roleId, permission_id=permissionId)
    if db.query(models.role_permission_association).filter(models.role_permission_association.role_id == roleId, models.role_permission_association.permission_id == permissionId).first():
        raise HTTPException(status_code=400, detail="Permission already exists for this role")
    db.add(role_permission)
    db.commit()
    return role_permission

@router.delete("/roles/{roleId}", status_code=status.HTTP_204_NO_CONTENT)
def delete_role(roleId: int = Path(...), db: Session = Depends(get_db), isSuperUser: bool = Depends(oauth2.is_superuser)):
    if not isSuperUser:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Insufficicent Permissions")
    if roleId == 1000:
        raise HTTPException(status_code=400, detail="Cannot delete default role")
    role = db.query(models.Role).filter(models.Role.id == roleId).first()
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    db.delete(role)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)