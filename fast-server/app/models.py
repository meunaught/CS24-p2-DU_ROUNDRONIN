from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base

# Define a many-to-many relationship table

class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, nullable='False')
    name = Column(String(50), nullable=False)
    description = Column(String(255))

    def __repr__(self):
        return f"<Role(name='{self.name}', description='{self.description}')>"

class User(Base):
    __tablename__= "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email= Column(String, unique=True, nullable=False)
    password= Column(String, nullable=False)
    created_at=Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)

    role_id = Column(Integer, ForeignKey('roles.id'), server_default='1000', nullable=False)

    def __repr__(self):
        return f"<User(username='{self.username}')>"

class Permission(Base):
    __tablename__ = 'permissions'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(255))

    def __repr__(self):
        return f"<Permission(name='{self.name}', description='{self.description}')>"

class role_permission_association(Base):
    __tablename__ = 'role_permission_association'

    uuid = Column(Integer, primary_key=True)
    role_id = Column(Integer, ForeignKey('roles.id'))
    permission_id = Column(Integer, ForeignKey('permissions.id'))

    def __repr__(self):
        return f"<RolePermission(role_id='{self.role_id}', permission_id='{self.permission_id}')>"
