# BOL Dashboard FastAPI Backend

A FastAPI backend service for the BOL Dashboard that provides PDF text extraction capabilities using Azure OpenAI.

## Features

- 📄 PDF file upload and validation
- 🤖 Text extraction using Azure OpenAI GPT models
- 🔍 OCR capabilities for image-based PDFs
- 📊 Structured data extraction
- 🚀 Fast and async processing
- 🔒 CORS configuration for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy the example environment file and configure your Azure OpenAI credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your Azure OpenAI configuration:

```env
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_API_VERSION=2023-12-01-preview
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
```

### 3. Start the Server

```bash
# Using the startup script
python start_server.py

# Or directly with uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check including Azure OpenAI connectivity

### PDF Processing
- `POST /api/upload-pdf` - Upload PDF file (simple upload)
- `POST /api/extract-text` - Upload PDF and extract text using Azure OpenAI

## API Documentation

Once the server is running, you can access:
- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## File Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── start_server.py         # Startup script
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── models/
│   ├── __init__.py
│   └── response_models.py  # Pydantic response models
└── services/
    ├── __init__.py
    ├── pdf_service.py      # PDF text extraction service
    └── azure_openai_service.py  # Azure OpenAI integration
```

## Usage Examples

### Upload and Extract Text

```bash
curl -X POST "http://localhost:8000/api/extract-text" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@your-document.pdf"
```

### Health Check

```bash
curl -X GET "http://localhost:8000/health"
```

## Error Handling

The API includes comprehensive error handling:
- File validation (PDF format, size limits)
- Azure OpenAI service availability
- Graceful fallbacks for text extraction
- Detailed error messages

## Development

For development, the server runs with auto-reload enabled. Make changes to the code and the server will automatically restart.

## Troubleshooting

1. **Azure OpenAI not working**: Ensure your `.env` file is properly configured with valid credentials
2. **PDF extraction fails**: The service will attempt multiple extraction methods and fallback to OCR
3. **CORS issues**: The server is configured to allow requests from common frontend development ports

## Dependencies

Key dependencies include:
- FastAPI: Web framework
- PyPDF2 & pdfplumber: PDF text extraction
- OpenAI: Azure OpenAI integration
- pdf2image: PDF to image conversion for OCR
- Uvicorn: ASGI server