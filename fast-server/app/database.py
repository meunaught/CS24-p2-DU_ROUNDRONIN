from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings
from . import models

initial_roles = [
    {"id":1000, "name":"Unassigned", "description":"Default role for unassigned users"},
    {"id":1001, "name":"System Admin", "description":"Role for Administrators"},
    {"id":1002, "name":"STS Manager", "description":"Role for STS Managers"},
    {"id":1003, "name":"Landfill Manager", "description":"Role for Landfill Managers"}
]

SQLALCHEMY_DATABASE_URL = settings.database_url


engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for role in initial_roles:
            db_role = models.Role(**role)
            if db.query(models.Role).filter(models.Role.id == db_role.id).first():
                continue
            db.add(db_role)
            db.commit()
        print("Roles seeded successfully")
    except Exception as error:
        print("Error seeding roles: ", error)
        db.rollback()
    finally:
        db.close()
        print("Database connection closed")
