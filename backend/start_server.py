#!/usr/bin/env python3
"""
Startup script for BOL Dashboard FastAPI backend
"""
import uvicorn
import os
import sys
from pathlib import Path

def main():
    """Start the FastAPI server"""
    print("🚀 Starting BOL Dashboard API Server...")
    print("📁 Backend directory:", Path(__file__).parent)
    
    # Check if .env file exists
    env_file = Path(__file__).parent / ".env"
    if not env_file.exists():
        print("⚠️  Warning: .env file not found. Please copy .env.example to .env and configure your Azure OpenAI credentials.")
        print("   The server will start but Azure OpenAI features will not work without proper configuration.")
    
    # Start the server
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()