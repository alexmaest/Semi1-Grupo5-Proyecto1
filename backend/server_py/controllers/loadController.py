import boto3
import os
import random
from io import BytesIO
import base64

session = boto3.Session(
    aws_access_key_id=os.environ['AWS_PUBLIC_KEY'],
    aws_secret_access_key=os.environ['AWS_SECRET_KEY'],
    region_name=os.environ['AWS_BUCKET_REGION']
)

s3_client = session.client('s3')

class LoadController:
    def __init__(self):
        # TODO document why this method is empty
        pass
    
    def upload_image(self, image):
        try:
            base64_data = image.split(';base64,')[1]
            base64_data_bytes = base64.b64decode(base64_data)
            random_number = random.randint(0, 10000)
            filename = f"file{random_number}"
            upload_key = f'Fotos/{filename}'

            s3_client.upload_fileobj(BytesIO(base64_data_bytes), os.environ['AWS_BUCKET_NAME'], upload_key, ExtraArgs={
                'ContentType': 'image',
            })
            url_file = f"https://{os.environ['AWS_BUCKET_NAME']}.s3.{os.environ['AWS_BUCKET_REGION']}.amazonaws.com/{upload_key}"
            print('Information: Image uploaded')
            return url_file
        except Exception as e:
            print(f'Error: {e}')
            return None
    
    def upload_song(self, song):
        try:
            random_number = random.randint(0, 10000)
            filename = f"file{random_number}"
            upload_key = f'Canciones/{filename}'

            s3_client.upload_fileobj(BytesIO(song), os.environ['AWS_BUCKET_NAME'], upload_key, ExtraArgs={
                'ContentType': 'audio/mpeg',
            })
            url_file = f"https://{os.environ['AWS_BUCKET_NAME']}.s3.{os.environ['AWS_BUCKET_REGION']}.amazonaws.com/{upload_key}"
            print('Information: Song uploaded')
            return url_file
        except Exception as e:
            print(f'Error: {e}')
            return None

load_controller = LoadController()
