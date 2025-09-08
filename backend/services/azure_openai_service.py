import os
import asyncio
import logging
from typing import Optional
from openai import AsyncAzureOpenAI
from dotenv import load_dotenv
import base64
from pdf2image import convert_from_path
import io

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class AzureOpenAIService:
    def __init__(self):
        self.api_key = os.getenv("AZURE_OPENAI_API_KEY")
        self.endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        self.api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2023-12-01-preview")
        self.deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME", "gpt-4")
        
        if not self.api_key or not self.endpoint:
            logger.warning("Azure OpenAI credentials not found. Please set AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT environment variables.")
            self.client = None
        else:
            self.client = AsyncAzureOpenAI(
                api_key=self.api_key,
                api_version=self.api_version,
                azure_endpoint=self.endpoint
            )
    
    async def check_connection(self) -> bool:
        """Check if Azure OpenAI service is available"""
        if not self.client:
            return False
        
        try:
            # Simple test call
            response = await self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[{"role": "user", "content": "Test connection"}],
                max_tokens=10
            )
            return True
        except Exception as e:
            logger.error(f"Azure OpenAI connection test failed: {str(e)}")
            return False
    
    async def process_extracted_text(self, text: str) -> str:
        """
        Process and clean extracted text using Azure OpenAI
        """
        if not self.client:
            logger.warning("Azure OpenAI not configured, returning raw text")
            return text
        
        try:
            prompt = f"""
            Please clean up and structure the following text extracted from a PDF document. 
            Make it more readable while preserving all important information:
            
            {text}
            
            Please:
            1. Fix any formatting issues
            2. Organize the content logically
            3. Preserve all important data and numbers
            4. Remove unnecessary whitespace and line breaks
            5. Make it easy to read and understand
            """
            
            response = await self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that cleans up and structures text extracted from PDF documents."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=4000,
                temperature=0.1
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"Error processing text with Azure OpenAI: {str(e)}")
            # Return original text if processing fails
            return text
    
    async def extract_text_with_ocr(self, pdf_path: str) -> str:
        """
        Extract text from PDF using OCR via Azure OpenAI Vision
        This is used when regular PDF text extraction fails
        """
        if not self.client:
            logger.warning("Azure OpenAI not configured, cannot perform OCR")
            return "Azure OpenAI not configured for OCR extraction"
        
        try:
            # Convert PDF to images
            images = convert_from_path(pdf_path, first_page=1, last_page=3)  # Limit to first 3 pages
            
            extracted_texts = []
            
            for i, image in enumerate(images):
                # Convert image to base64
                buffer = io.BytesIO()
                image.save(buffer, format='PNG')
                image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
                
                # Use Azure OpenAI Vision to extract text
                response = await self.client.chat.completions.create(
                    model="gpt-4-vision-preview",  # Use vision model
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Please extract all text from this image. Maintain the structure and formatting as much as possible."
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/png;base64,{image_base64}"
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens=4000
                )
                
                page_text = response.choices[0].message.content
                extracted_texts.append(f"Page {i+1}:\n{page_text}\n\n")
            
            return "\n".join(extracted_texts)
            
        except Exception as e:
            logger.error(f"Error performing OCR with Azure OpenAI: {str(e)}")
            return f"OCR extraction failed: {str(e)}"
    
    async def extract_structured_data(self, text: str, data_type: str = "general") -> dict:
        """
        Extract structured data from text based on data type
        """
        if not self.client:
            return {"error": "Azure OpenAI not configured"}
        
        try:
            prompt = f"""
            Extract structured data from the following text. 
            Focus on {data_type} information and return it in JSON format:
            
            {text}
            
            Please extract relevant fields and organize them in a structured JSON format.
            """
            
            response = await self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": "You are a data extraction assistant. Extract structured information and return it in valid JSON format."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.1
            )
            
            return {"extracted_data": response.choices[0].message.content}
            
        except Exception as e:
            logger.error(f"Error extracting structured data: {str(e)}")
            return {"error": str(e)}