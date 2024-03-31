from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base

class User(Base):
    __tablename__= "users"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name= Column(String, nullable=False)
    email= Column(String, unique=True, nullable=False)
    password= Column(String, nullable=False)
    created_at=Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    role_id= Column(Integer, server_default='1000', nullable=False)