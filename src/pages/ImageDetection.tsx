import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { DetectionResult } from '../types';

export function ImageDetection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) return;

    setIsUploading(true);
    setError(null);

    try {
      // Mock API call - replace with actual detection API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      setResult({
        pest_id: 'mock-pest-1',
        confidence: 0.89,
        created_at: new Date().toISOString()
      });
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pest Detection</h1>
        <p className="mt-2 text-gray-600">
          Upload an image of an insect or pest for instant identification
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <label 
                htmlFor="image-upload"
                className={`
                  relative block w-full aspect-video rounded-lg cursor-pointer
                  border-2 border-dashed border-gray-300 hover:border-green-500
                  transition-colors
                  ${preview ? 'bg-gray-100' : 'bg-white'}
                `}
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click or drag and drop an image here
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Supports JPG, PNG (max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedImage || isUploading}
            className={`
              w-full py-3 px-4 rounded-md text-white font-medium
              ${isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'}
              transition-colors
            `}
          >
            {isUploading ? 'Processing...' : 'Detect Pest'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">
                  Detection Complete
                </h3>
                <p className="text-green-700 mt-1">
                  We've identified the pest with {(result.confidence * 100).toFixed(1)}% confidence.
                </p>
                <div className="mt-4">
                  <a
                    href={`/pests/${result.pest_id}`}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    View Detailed Information →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tips for Better Results
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            Ensure the pest is clearly visible in the image
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            Use good lighting conditions
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            Take close-up shots when possible
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            Include multiple angles if unsure
          </li>
        </ul>
      </div>
    </div>
  );
}