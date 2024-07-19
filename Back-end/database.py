# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL

POSTGRES_DB = 'mydatabase'
POSTGRES_USER = 'myuser'
POSTGRES_PASSWORD = 'mypassword'
POSTGRES_HOST = 'localhost'
POSTGRES_PORT = 5432

DATABASE_URL = URL(
    drivername='postgresql',
    username=POSTGRES_USER,
    password=POSTGRES_PASSWORD,
    host=POSTGRES_HOST,
    port=POSTGRES_PORT,
    database=POSTGRES_DB
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()