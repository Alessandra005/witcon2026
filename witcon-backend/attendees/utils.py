# witcon-backend/attendees/utils.py
import boto3
from django.conf import settings

def generate_presigned_resume_url(key: str, expires_in: int = 3600) -> str:
    """
    key = object key stored in S3 (e.g. "resumes/user_123_resume.pdf")
    """
    s3 = boto3.client(
        "s3",
        region_name=settings.AWS_S3_REGION_NAME,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    )
    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": key},
        ExpiresIn=expires_in,
    )
