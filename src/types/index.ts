export interface Pest {
  id: string;
  common_name: string;
  scientific_name: string;
  description: string;
  image_url: string;
  category: string;
  threat_level: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface DetectionResult {
  pest_id: string;
  confidence: number;
  created_at: string;
}