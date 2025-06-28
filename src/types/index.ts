export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Symptom {
  id: string;
  text: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

export interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  medications: string[];
  precautions: string[];
  dietPlan: string[];
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  times: string[];
  startDate: Date;
  endDate: Date;
  reminderMethods: ('whatsapp' | 'call' | 'notification')[];
  taken?: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  rating: number;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  availability: {
    isOpen: boolean;
    hours: string;
  };
  emergency: boolean;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: string;
}

export interface MedicalReport {
  id: string;
  filename: string;
  uploadDate: Date;
  extractedText: string;
  summary: string;
  keyFindings: string[];
  recommendations: string[];
}