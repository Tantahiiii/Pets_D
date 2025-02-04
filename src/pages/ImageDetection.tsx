import React, { useState, useEffect } from 'react';
import { Upload, AlertCircle, CheckCircle2, History, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { collection, addDoc, query, orderBy, getDocs, doc } from 'firebase/firestore';
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
    if (!user) return;

    try {
      // ดึง Prediction History ของผู้ใช้จาก Firestore
     const predictionsRef = collection(doc(db, 'users', user.uid), 'predictions');
     const q = query(predictionsRef, orderBy('timestamp', 'desc'));

      const querySnapshot = await getDocs(q);
      const history: PredictionHistory[] = [];

      querySnapshot.forEach((doc) => {
        history.push({ id: doc.id, ...doc.data() } as PredictionHistory);
      });

      setPredictions(history);
    } catch (err) {
      console.error('Error loading prediction history:', err);
      toast.error('Failed to load prediction history');
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
      // อัปโหลดรูปภาพไปที่ Firebase Storage
      const imageRef = ref(storage, `predictions/${user.uid}/${Date.now()}_${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
      const imageUrl = await getDownloadURL(imageRef);

      // Mock API call - แทนที่ด้วย API จริงในอนาคต
      await new Promise(resolve => setTimeout(resolve, 2000));

      // ผลลัพธ์ตัวอย่าง
      const mockResult = {
        confidence: 0.92,
        predictedClass: 'Grasshopper',
        timestamp: new Date().toISOString(),
      };

      // บันทึกผลลง Firestore ใน Subcollection `predictions` ของ `userId`
      await addDoc(collection(doc(db, 'users', user.uid), 'predictions'), {
        imageName: selectedImage.name,
        imageUrl: imageUrl,
        ...mockResult
      });

      setResult({
        pest_id: 'mock-pest-1',
        confidence: mockResult.confidence,
        created_at: mockResult.timestamp
      });

      // รีเซ็ตฟอร์ม
      setSelectedImage(null);
      setPreview(null);

      // โหลดประวัติใหม่
      await loadPredictionHistory();
      toast.success('Prediction saved successfully');
    } catch (err) {
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
      </div>
    </div>
  );
}
