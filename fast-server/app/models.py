from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from .database import Base

class User(Base):
    __tablename__= "users"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    email= Column(String, unique=True, nullable=False)
    password= Column(String, nullable=False)
    created_at=Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    role= Column(String, nullable=False, server_default='Unassigned')