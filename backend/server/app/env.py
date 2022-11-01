import os


POSTGRES_USER = os.environ.get('POSTGRES_USER', 'admin')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD', 'password')
POSTGRES_SERVER = os.environ.get('POSTGRES_SERVER', '127.0.0.1')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT', '5432')
POSTGRES_DB = os.environ.get('POSTGRES_DB', 'fastapi')