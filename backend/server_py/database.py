import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")

connection = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    db=db_name,
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

if connection:
    print('Information: Database connection succeeded')
else:
    raise ConnectionError('Database connection failed')
