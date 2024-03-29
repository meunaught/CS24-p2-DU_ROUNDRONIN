import os

class Config:
    # MongoDB settings
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb+srv://dev:5q0jmmtS643s7lrw@cluster0.ngou7zw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'Cluster0')

    # JWT settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    ALGORITHM = os.getenv('ALGORITHM', 'HS256')
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30)

config = Config()
