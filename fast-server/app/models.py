from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base


# Association table for many-to-many relationship between roles and permissions
role_permission_association = Table('role_permission_association', Base.metadata,
    Column('role_id', Integer, ForeignKey('roles.id')),
    Column('permission_id', Integer, ForeignKey('permissions.id'))
)
class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True, nullable='False')
    name = Column(String(50), nullable=False)
    description = Column(String(255))

    # Define a relationship with the User table
    users = relationship("User", back_populates="role")

    # Define many-to-many relationship with permissions
    permissions = relationship("Permission", secondary=role_permission_association, back_populates="roles")

    def __repr__(self):
        return f"<Role(name='{self.name}', description='{self.description}')>"

class User(Base):
    __tablename__= "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email= Column(String, unique=True, nullable=False)
    password= Column(String, nullable=False)
    created_at=Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)

    role_id = Column(Integer, ForeignKey('roles.id'), server_default='1000', nullable=False)
    role = relationship("Role", back_populates="users")

    def __repr__(self):
        return f"<User(username='{self.username}')>"

class Permission(Base):
    __tablename__ = 'permissions'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(255))

    # Define many-to-many relationship with roles
    roles = relationship("Role", secondary=role_permission_association, back_populates="permissions")
    def __repr__(self):
        return f"<Permission(name='{self.name}', description='{self.description}')>"

