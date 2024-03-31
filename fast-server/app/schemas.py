from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

from pydantic.types import conint


class UserOut(BaseModel):
    id: int
    email: EmailStr
    role_id: int
    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role_id: Optional[int] = 1000


class UserUpdate(BaseModel):
    email: Optional[EmailStr]

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None

class RoleOut(BaseModel):
    id: int
    name: str
    description: str

    class config:
        from_attributes = True

class RoleCreate(BaseModel):
    id: int = 1000
    name: str = 'Unassigned'
    description: Optional[str] = 'Default role for unassigned users'

class PermissionOut(BaseModel):
    id: int
    name: str
    description: str

class PermissionCreate(BaseModel):
    id: int = 0
    name: str = "Admin Access"
    description: Optional[str] = "Full access to all resources"

    class config:
        from_attributes = True

class RolePermission(BaseModel):
    role_id: int
    permission_id: int
