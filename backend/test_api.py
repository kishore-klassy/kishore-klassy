#!/usr/bin/env python3
"""
Simple test script for the BOL Dashboard API
"""
import requests
import json
import sys
from pathlib import Path

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    try:
        print("🔍 Testing health check...")
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data['status']}")
            print(f"   Message: {data['message']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend server. Is it running on port 8000?")
        return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_basic_endpoint():
    """Test the basic root endpoint"""
    try:
        print("🔍 Testing root endpoint...")
        response = requests.get(f"{BASE_URL}/", timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Root endpoint working: {data['message']}")
            return True
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
        return False

def test_pdf_upload():
    """Test PDF upload with a dummy file"""
    try:
        print("🔍 Testing PDF upload endpoint...")
        
        # Create a dummy PDF-like file for testing
        dummy_pdf_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n"
        
        files = {'file': ('test.pdf', dummy_pdf_content, 'application/pdf')}
        response = requests.post(f"{BASE_URL}/api/upload-pdf", files=files, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ PDF upload working: {data['message']}")
            return True
        else:
            print(f"❌ PDF upload failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ PDF upload error: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 BOL Dashboard API Test Suite")
    print("=" * 40)
    
    tests = [
        test_basic_endpoint,
        test_health_check,
        test_pdf_upload
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 40)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The API is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the backend configuration.")
        return 1

if __name__ == "__main__":
    sys.exit(main())