# BOL Dashboard Setup Guide

This guide will help you set up the complete BOL Dashboard application with PDF text extraction capabilities.

## Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package installer)
- **Azure OpenAI** account and API key (optional but recommended)

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd bol-dashboard
   ```

2. **Run the development startup script:**
   ```bash
   ./start-dev.sh
   ```

   This will automatically:
   - Start the FastAPI backend on port 8000
   - Start the React frontend on port 5173
   - Display all necessary URLs

### Option 2: Manual Setup

#### Frontend Setup

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and add your Azure OpenAI credentials:
   ```env
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
   AZURE_OPENAI_API_VERSION=2023-12-01-preview
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
   ```

4. **Start the backend server:**
   ```bash
   python start_server.py
   ```

   The backend API will be available at `http://localhost:8000`

## Azure OpenAI Configuration

To enable PDF text extraction with AI processing, you need to set up Azure OpenAI:

### Step 1: Create Azure OpenAI Resource

1. Go to the [Azure Portal](https://portal.azure.com)
2. Create a new "Azure OpenAI" resource
3. Choose your subscription, resource group, and region
4. Select the pricing tier
5. Wait for deployment to complete

### Step 2: Deploy Models

1. Go to Azure OpenAI Studio
2. Navigate to "Deployments"
3. Create a new deployment:
   - **Model**: GPT-4 (recommended) or GPT-3.5-turbo
   - **Deployment name**: `gpt-4` (or update your .env file accordingly)
4. (Optional) For OCR capabilities, also deploy GPT-4 Vision

### Step 3: Get API Credentials

1. In the Azure Portal, go to your OpenAI resource
2. Navigate to "Keys and Endpoint"
3. Copy the following values:
   - **API Key**: One of the available keys
   - **Endpoint**: The endpoint URL
4. Update your `.env` file with these values

## Testing the Setup

### Backend API Tests

Run the API test suite:
```bash
cd backend
python test_api.py
```

This will test:
- Basic API connectivity
- Health check endpoint
- PDF upload functionality

### Manual Testing

1. **Frontend**: Visit `http://localhost:5173` and verify the dashboard loads
2. **Backend**: Visit `http://localhost:8000/docs` for interactive API documentation
3. **PDF Upload**: Try uploading a PDF file through the frontend interface

## Troubleshooting

### Common Issues

#### Port Already in Use
```
Error: Port 8000 is already in use
```
**Solution**: Kill the process using the port or use a different port:
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or start on different port
uvicorn main:app --port 8001
```

#### Azure OpenAI Connection Failed
```
Azure OpenAI connection test failed
```
**Solutions**:
1. Verify your API key and endpoint in `.env`
2. Check if your Azure OpenAI resource is active
3. Ensure the deployment name matches your configuration
4. Verify you have quota available

#### PDF Upload Fails
```
Upload failed: 400 Bad Request
```
**Solutions**:
1. Ensure the file is a valid PDF
2. Check file size (must be under 10MB)
3. Verify backend is running and accessible

#### CORS Errors in Browser
```
Access to fetch blocked by CORS policy
```
**Solution**: The backend is configured for common development ports. If using a different port, update the CORS settings in `backend/main.py`:
```python
allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:YOUR_PORT"]
```

### Debug Mode

Enable debug logging in the backend:
```python
# In backend/main.py, change logging level
logging.basicConfig(level=logging.DEBUG)
```

### Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `AZURE_OPENAI_API_KEY` | Your Azure OpenAI API key | Yes* | `abc123...` |
| `AZURE_OPENAI_ENDPOINT` | Your Azure OpenAI endpoint URL | Yes* | `https://myresource.openai.azure.com/` |
| `AZURE_OPENAI_API_VERSION` | API version to use | No | `2023-12-01-preview` |
| `AZURE_OPENAI_DEPLOYMENT_NAME` | Name of your GPT deployment | No | `gpt-4` |

*Required for AI-powered text extraction features

## Development Workflow

1. **Start both servers** using `./start-dev.sh`
2. **Make changes** to frontend or backend code
3. **Auto-reload** is enabled for both servers
4. **Test changes** using the web interface or API docs
5. **Stop servers** with `Ctrl+C`

## Production Deployment

### Frontend
```bash
npm run build
# Deploy the 'dist' directory to your web server
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Support

- **API Documentation**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/health`
- **Frontend**: `http://localhost:5173`

For issues, check the console logs in both frontend (browser dev tools) and backend (terminal output).