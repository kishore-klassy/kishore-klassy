import PyPDF2
import pdfplumber
import logging
from typing import Optional
import asyncio
from concurrent.futures import ThreadPoolExecutor

logger = logging.getLogger(__name__)

class PDFService:
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=4)
    
    async def extract_text_from_pdf(self, pdf_path: str) -> str:
        """
        Extract text from PDF using multiple methods
        """
        try:
            # Try pdfplumber first (better for structured PDFs)
            text = await self._extract_with_pdfplumber(pdf_path)
            
            if not text.strip():
                # Fallback to PyPDF2
                text = await self._extract_with_pypdf2(pdf_path)
            
            return text.strip()
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {str(e)}")
            raise
    
    async def _extract_with_pdfplumber(self, pdf_path: str) -> str:
        """Extract text using pdfplumber (better for tables and structured content)"""
        def _extract():
            text = ""
            try:
                with pdfplumber.open(pdf_path) as pdf:
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n\n"
            except Exception as e:
                logger.warning(f"pdfplumber extraction failed: {str(e)}")
            return text
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(self.executor, _extract)
    
    async def _extract_with_pypdf2(self, pdf_path: str) -> str:
        """Extract text using PyPDF2 (fallback method)"""
        def _extract():
            text = ""
            try:
                with open(pdf_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    for page in pdf_reader.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n\n"
            except Exception as e:
                logger.warning(f"PyPDF2 extraction failed: {str(e)}")
            return text
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(self.executor, _extract)
    
    def get_pdf_info(self, pdf_path: str) -> dict:
        """Get basic information about the PDF"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                return {
                    "num_pages": len(pdf_reader.pages),
                    "metadata": pdf_reader.metadata,
                    "encrypted": pdf_reader.is_encrypted
                }
        except Exception as e:
            logger.error(f"Error getting PDF info: {str(e)}")
            return {"error": str(e)}