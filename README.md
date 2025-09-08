# BOL Dashboard - Weave AI Agents

A comprehensive React.js dashboard application for BOL (Bill of Lading) document verification and processing, built with TailwindCSS and Recharts. Now includes a FastAPI backend with Azure OpenAI-powered PDF text extraction capabilities.

## Features

### Frontend Dashboard
- **Left Sidebar Navigation**: Dark sidebar with Weave AI Agents branding, agent sections, and menu items
- **Top Navbar**: Notification system, settings, and user profile management
- **Dashboard Metrics**: Six key performance indicator cards showing BOL processing statistics
- **Interactive Charts**: Pie chart, bar chart, and horizontal category charts using Recharts
- **Data Table**: Comprehensive BOL Pipeline Records with filtering and actions
- **PDF Upload & Text Extraction**: Upload PDFs and extract text using Azure OpenAI
- **Responsive Design**: Clean, modern UI that works across different screen sizes

### Backend API
- **FastAPI Backend**: High-performance async API server
- **PDF Text Extraction**: Multiple extraction methods (PyPDF2, pdfplumber)
- **Azure OpenAI Integration**: Advanced text processing and OCR capabilities
- **File Upload**: Secure PDF upload with validation
- **Health Monitoring**: API health checks and service status
- **CORS Support**: Configured for frontend integration

## Tech Stack

### Frontend
- **React 18**: Modern React with functional components and hooks
- **TailwindCSS**: Utility-first CSS framework for styling
- **Recharts**: Composable charting library for React
- **Lucide React**: Beautiful & consistent icon library
- **Vite**: Fast build tool and development server

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **PyPDF2 & pdfplumber**: PDF text extraction libraries
- **Azure OpenAI**: AI-powered text processing and OCR
- **Uvicorn**: ASGI server for FastAPI
- **Pydantic**: Data validation and serialization

## Getting Started

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your Azure OpenAI credentials
   ```

4. Start the FastAPI server:
   ```bash
   python start_server.py
   ```

The backend API will be available at `http://localhost:8000`

### Azure OpenAI Configuration

To enable PDF text extraction features, you need to configure Azure OpenAI:

1. Create an Azure OpenAI resource in the Azure portal
2. Deploy a GPT-4 model (and optionally GPT-4 Vision for OCR)
3. Update the `.env` file in the backend directory with your credentials:
   ```env
   AZURE_OPENAI_API_KEY=your_api_key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
   ```

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/
│   │   ├── Sidebar.jsx       # Left navigation sidebar
│   │   ├── Navbar.jsx        # Top navigation bar
│   │   ├── FilterBar.jsx     # Dashboard filters
│   │   ├── DashboardCards.jsx # Metric cards
│   │   ├── Charts.jsx        # Chart components
│   │   ├── DataTable.jsx     # BOL records table
│   │   └── PDFUploader.jsx   # PDF upload and text extraction
│   ├── App.jsx              # Main application layout
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
└── backend/                # FastAPI backend
    ├── main.py             # FastAPI application entry point
    ├── start_server.py     # Server startup script
    ├── requirements.txt    # Python dependencies
    ├── .env.example       # Environment variables template
    ├── models/
    │   └── response_models.py # Pydantic response models
    └── services/
        ├── pdf_service.py      # PDF text extraction service
        └── azure_openai_service.py # Azure OpenAI integration
```

## Dashboard Components

### Sidebar Features
- Weave AI Agents logo and branding
- BOL DocVerify Agent section with Reasoning Agent pill
- Navigation menu items (Dashboard, BOL Master Agent, BOL Extraction Agent, BOL Matching Agent)
- UI Agents section (Rule UI Agent, Repository UI Agent)
- Build the Agent action button

### Dashboard Metrics
- Total Assigned: 18 Today
- Completed: 10 Successfully processed
- Incomplete: 18 Requires attention
- Avg BOL Processing Time: 3.5 sec
- Extraction Accuracy: 97%
- Matching Accuracy: 95%

### PDF Upload & Text Extraction
- **Drag & Drop Interface**: Easy PDF file upload
- **File Validation**: PDF format and size validation
- **Azure OpenAI Integration**: Advanced text extraction and processing
- **OCR Support**: Fallback OCR for image-based PDFs
- **Real-time Processing**: Live status updates during extraction
- **Copy to Clipboard**: Easy text copying functionality

### Charts
- **Donut Chart**: Total Assigned breakdown (82% Completed, 8% Failed, 10% Pending)
- **Bar Chart**: BOL Exception & Resolution Status
- **Horizontal Bar Chart**: BOL Issue Root Cause Category

### Data Table
Comprehensive BOL Pipeline Records with columns for:
- BOL Number, File Name, Product Name
- MOT (Mode of Transport), Origin, Assigned To
- Issue Status, Root Cause, Shipment Date
- BOL Status (with colored badges)
- Actions menu

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check with service status

### PDF Processing
- `POST /api/upload-pdf` - Simple PDF file upload
- `POST /api/extract-text` - Upload PDF and extract text using Azure OpenAI

### API Documentation
- Interactive docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Build for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

The built files will be in the `dist/` directory, ready for deployment.