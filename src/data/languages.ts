import { Language } from '../types';

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
];

export const translations = {
  en: {
    appName: 'MediBot+',
    navigation: {
      symptoms: 'Symptom Checker',
      medications: 'Medication Reminders',
      hospitals: 'Find Hospitals',
      voice: 'Voice Assistant',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      emergency: 'Emergency',
      book: 'Book Appointment',
    }
  },
  hi: {
    appName: 'मेडीबॉट+',
    navigation: {
      symptoms: 'लक्षण जांचकर्ता',
      medications: 'दवा अनुस्मारक',
      hospitals: 'अस्पताल खोजें',
      voice: 'आवाज सहायक',
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि हुई',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'मिटाएं',
      edit: 'संपादित करें',
      search: 'खोजें',
      emergency: 'आपातकाल',
      book: 'अपॉइंटमेंट बुक करें',
    }
  }
};