#!/bin/bash

# BOL Dashboard Development Startup Script

echo "🚀 Starting BOL Dashboard Development Environment"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Start backend server
echo "📡 Starting FastAPI backend server..."
if check_port 8000; then
    echo "⚠️  Port 8000 is already in use. Backend might already be running."
else
    cd backend
    if [ ! -f ".env" ]; then
        echo "⚠️  Warning: .env file not found in backend directory."
        echo "   Please copy .env.example to .env and configure Azure OpenAI credentials."
    fi
    python start_server.py &
    BACKEND_PID=$!
    cd ..
    echo "✅ Backend started (PID: $BACKEND_PID) at http://localhost:8000"
fi

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🌐 Starting React frontend server..."
if check_port 5173; then
    echo "⚠️  Port 5173 is already in use. Frontend might already be running."
else
    npm run dev &
    FRONTEND_PID=$!
    echo "✅ Frontend started (PID: $FRONTEND_PID) at http://localhost:5173"
fi

echo ""
echo "🎉 Development environment is ready!"
echo "📱 Frontend: http://localhost:5173"
echo "🔗 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user input to stop
trap 'echo ""; echo "🛑 Stopping servers..."; kill $BACKEND_PID 2>/dev/null; kill $FRONTEND_PID 2>/dev/null; echo "✅ All servers stopped"; exit 0' INT

wait