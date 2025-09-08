from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import tempfile
import asyncio
from typing import Optional
import logging
from datetime import datetime

from services.pdf_service import PDFService
from services.azure_openai_service import AzureOpenAIService
from models.response_models import ExtractTextResponse, HealthResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="BOL Dashboard API",
    description="API for BOL Dashboard with PDF text extraction using Azure OpenAI",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
pdf_service = PDFService()
azure_openai_service = AzureOpenAIService()

@app.get("/", response_model=HealthResponse)
async def root():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="BOL Dashboard API is running",
        timestamp=datetime.utcnow().isoformat()
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Detailed health check endpoint"""
    try:
        # Check Azure OpenAI service
        openai_status = await azure_openai_service.check_connection()
        
        return HealthResponse(
            status="healthy" if openai_status else "degraded",
            message="All services operational" if openai_status else "Azure OpenAI service unavailable",
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return HealthResponse(
            status="unhealthy",
            message=f"Health check failed: {str(e)}",
            timestamp=datetime.utcnow().isoformat()
        )

@app.post("/api/extract-text", response_model=ExtractTextResponse)
async def extract_text_from_pdf(file: UploadFile = File(...)):
    """
    Extract text from uploaded PDF using Azure OpenAI
    """
    try:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(
                status_code=400, 
                detail="Only PDF files are supported"
            )
        
        # Check file size (max 10MB)
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(
                status_code=400,
                detail="File size exceeds 10MB limit"
            )
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(contents)
            temp_file_path = temp_file.name
        
        try:
            # Extract text from PDF
            logger.info(f"Extracting text from PDF: {file.filename}")
            pdf_text = await pdf_service.extract_text_from_pdf(temp_file_path)
            
            if not pdf_text.strip():
                # If no text extracted, try OCR with Azure OpenAI
                logger.info("No text found, attempting OCR extraction")
                extracted_text = await azure_openai_service.extract_text_with_ocr(temp_file_path)
            else:
                # Use Azure OpenAI to clean and structure the extracted text
                logger.info("Processing extracted text with Azure OpenAI")
                extracted_text = await azure_openai_service.process_extracted_text(pdf_text)
            
            return ExtractTextResponse(
                success=True,
                filename=file.filename,
                extracted_text=extracted_text,
                message="Text extracted successfully",
                timestamp=datetime.utcnow().isoformat()
            )
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
                
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Simple PDF upload endpoint (without extraction)
    """
    try:
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported"
            )
        
        contents = await file.read()
        
        return JSONResponse(
            content={
                "success": True,
                "filename": file.filename,
                "size": len(contents),
                "message": "PDF uploaded successfully"
            }
        )
        
    except Exception as e:
        logger.error(f"Error uploading PDF: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)