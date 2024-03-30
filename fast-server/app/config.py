from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_hostname: str = 'localhost'
    database_port: str = '5432'
    database_password: str = 'postgres'
    database_name: str = 'postgres'
    database_username: str = 'postgres'
    database_url: str = f'postgresql+psycopg2://{database_username}:{database_password}@{database_hostname}:{database_port}/{database_name}'
    secret_key: str
    algorithm: str = 'HS256'
    access_token_expire_minutes: int

    class Config:
        env_file = ".env"


settings = Settings()