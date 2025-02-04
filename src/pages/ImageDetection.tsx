import React, { useState, useEffect } from 'react';
import { Upload, AlertCircle, CheckCircle2, History, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { collection, addDoc, query, orderBy, getDocs,doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { DetectionResult } from '../types';
import toast from 'react-hot-toast';
import { db, storage } from '../lib/firebase';

interface PredictionHistory {
  id: string;
  confidence: number;
  imageName: string;
  predictedClass: string;
  timestamp: string;
  imageUrl?: string;
}

export function ImageDetection() {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);

  useEffect(() => {
    if (user) {
      loadPredictionHistory();
    }
  }, [user]);

  
 const loadPredictionHistory = async () => {
  if (!user) {
    console.log("❌ No user logged in");
    return;
  }

  try {
    console.log("✅ Fetching predictions for user:", user.uid);
    
    const predictionsRef = collection(doc(db, 'users', user.uid), 'predictions');
    const q = query(predictionsRef, orderBy('timestamp', 'desc'));

    const querySnapshot = await getDocs(q);
    const history: PredictionHistory[] = [];

    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() } as PredictionHistory);
    });

    setPredictions(history);
    console.log("✅ Prediction history loaded:", history);
  } catch (err: any) {
    console.error('❌ Error loading prediction history:', err.message, err.code, err);
    toast.error(`Failed to load prediction history: ${err.message}`);
  }
};



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
    if (!selectedImage || !user) return;

    setIsUploading(true);
    setError(null);

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `predictions/${user.uid}/${Date.now()}_${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
      const imageUrl = await getDownloadURL(imageRef);

      // Mock API call - replace with actual API in the future
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Sample result
      const mockResult = {
        confidence: 0.92,
        predictedClass: 'Grasshopper',
        timestamp: new Date().toISOString(),
      };

      // Save prediction to Firestore
      const predictionsRef = collection(db, 'users', user.uid, 'predictions');
      await addDoc(predictionsRef, {
        imageName: selectedImage.name,
        imageUrl: imageUrl,
        ...mockResult
      });

      setResult({
        pest_id: 'mock-pest-1',
        confidence: mockResult.confidence,
        created_at: mockResult.timestamp
      });

      // Reset form
      setSelectedImage(null);
      setPreview(null);

      // Reload prediction history
      await loadPredictionHistory();
      toast.success('Prediction saved successfully');
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
      toast.error('Failed to process image');
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
            disabled={!selectedImage || isUploading || !user}
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

        {/* Prediction History */}
        {predictions.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Predictions</h2>
            </div>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  {prediction.imageUrl && (
                    <img
                      src={prediction.imageUrl}
                      alt={prediction.predictedClass}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{prediction.predictedClass}</p>
                    <p className="text-sm text-gray-500">
                      Confidence: {(prediction.confidence * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {new Date(prediction.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}