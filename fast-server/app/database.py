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

initial_permissions = [
    {"id":0, "name":"Admin Access", "description":"Full access to all resources"}
]

initial_users = [
    {"id":0, "email":"admin@cs.com", "password":"cs", "role_id":1001}
]

initial_role_permissions = [
    {"role_id":1001, "permission_id":0}
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
        for permission in initial_permissions:
            db_permission = models.Permission(**permission)
            if db.query(models.Permission).filter(models.Permission.id == db_permission.id).first():
                continue
            db.add(db_permission)
            db.commit()
        print("Permissions seeded successfully")
        for user in initial_users:
            db_user = models.User(**user)
            if db.query(models.User).filter(models.User.id == db_user.id).first():
                continue
            db.add(db_user)
            db.commit()
        for role_permission in initial_role_permissions:
            db_role_permission = models.role_permission_association(**role_permission)
            if db.query(models.role_permission_association).filter(models.role_permission_association.role_id == db_role_permission.role_id).filter(models.role_permission_association.permission_id == db_role_permission.permission_id).first():
                continue
            db.add(db_role_permission)
            db.commit()
    except Exception as error:
        print("Error seeding roles: ", error)
        db.rollback()
    finally:
        db.close()
        print("Database connection closed")
