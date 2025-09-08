import React, { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setUploadStatus(null);
      setExtractedText('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
      setUploadStatus(null);
      setExtractedText('');
    } else {
      setError('Please drop a valid PDF file');
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      setUploadStatus('success');
      console.log('Upload successful:', result);
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const extractText = async () => {
    if (!file) return;

    setIsExtracting(true);
    setError(null);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Extraction failed: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setExtractedText(result.extracted_text);
        setUploadStatus('extracted');
      } else {
        throw new Error(result.message || 'Extraction failed');
      }
    } catch (err) {
      setError(`Text extraction failed: ${err.message}`);
      setUploadStatus('error');
    } finally {
      setIsExtracting(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setExtractedText('');
    setUploadStatus(null);
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">PDF Text Extraction</h2>
        <p className="text-gray-600">Upload a PDF file and extract text using Azure OpenAI</p>
      </div>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          file
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-lg font-medium text-gray-900 mb-2">
              Drop your PDF here or click to browse
            </div>
            <p className="text-gray-500 mb-4">Supports PDF files up to 10MB</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose PDF File
            </label>
          </>
        ) : (
          <div className="flex items-center justify-center space-x-4">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">{file.name}</div>
              <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
            </div>
            <button
              onClick={clearFile}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-red-700">{error}</div>
        </div>
      )}

      {/* Action Buttons */}
      {file && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={uploadFile}
            disabled={isUploading || isExtracting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? 'Uploading...' : 'Upload PDF'}
          </button>

          <button
            onClick={extractText}
            disabled={isUploading || isExtracting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExtracting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            {isExtracting ? 'Extracting...' : 'Extract Text'}
          </button>
        </div>
      )}

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <div className="text-green-700">PDF uploaded successfully!</div>
        </div>
      )}

      {/* Extracted Text Display */}
      {extractedText && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Extracted Text</h3>
            <button
              onClick={() => navigator.clipboard.writeText(extractedText)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
              {extractedText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;