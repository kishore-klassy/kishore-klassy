from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str

class ExtractTextResponse(BaseModel):
    success: bool
    filename: str
    extracted_text: str
    message: str
    timestamp: str

class UploadResponse(BaseModel):
    success: bool
    filename: str
    size: int
    message: str