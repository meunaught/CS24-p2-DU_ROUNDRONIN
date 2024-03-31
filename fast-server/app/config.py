from pydantic_settings import BaseSettings
import os
class Settings(BaseSettings):
    database_url: str = 'postgresql://postgres:postgres@localhost:5432/postgres'
    secret_key: str = 'SECRET'
    access_token_expire_minutes: int = 20
    algorithm: str = 'HS256'
    class Config:
        if os.getenv('env') == 'docker':
            env_file = '.server.env'
settings = Settings()