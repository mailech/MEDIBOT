import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { 
  Stethoscope, 
  Bell, 
  MapPin, 
  Mic, 
  Shield,
  Globe,
  Clock,
  Users,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartHealthCheck = () => {
    Swal.fire({
      title: 'Health Check Info',
      text: 'On the next page, you can start your AI health check!',
      icon: 'info',
      confirmButtonText: 'Go to Symptom Checker',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'bg-primary-500 text-white px-6 py-2 rounded-lg',
        title: 'text-2xl',
        htmlContainer: 'text-lg',
      }
    }).then(() => {
      navigate('/symptoms');
    });
  };

  const features = [
    {
      icon: Stethoscope,
      title: 'AI Symptom Checker',
      description: 'Describe your symptoms in your native language and get instant medical insights powered by Google MedLM.',
      href: '/symptoms',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      icon: Bell,
      title: 'Smart Medication Reminders',
      description: 'Never miss a dose with WhatsApp and voice call reminders in your preferred language.',
      href: '/medications',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      icon: MapPin,
      title: 'Hospital Finder',
      description: 'Find nearby hospitals, check availability, and book appointments instantly.',
      href: '/hospitals',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Speak naturally in any Indian language and get medical advice through OmniDim AI.',
      href: '/voice',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  const stats = [
    { icon: Users, value: '10M+', label: 'Users Served' },
    { icon: Globe, value: '13+', label: 'Indian Languages' },
    { icon: Shield, value: '99.9%', label: 'Data Security' },
    { icon: Clock, value: '24/7', label: 'Availability' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                मेडीबॉट<span className="text-primary-500">+</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Your AI-powered healthcare companion for India. Get medical advice, 
                manage medications, and find healthcare services in your native language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleStartHealthCheck}>
                  Start Health Check
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/voice">
                  <Button variant="outline" size="lg">
                    Try Voice Assistant
                    <Mic className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for better health management, available in all Indian languages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card hover onClick={() => window.location.href = feature.href}>
                    <div className="p-6">
                      <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium">
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-medical-emergency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-scale">
            <h2 className="text-3xl font-bold text-white mb-4">
              Emergency? We're Here 24/7
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Get immediate medical assistance and emergency contact information
            </p>
            <Button variant="emergency" size="lg">
              Emergency Help
            </Button>
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Your Language, Your Health
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['🇮🇳 हिन्दी', '🇮🇳 தமிழ்', '🇮🇳 తెలుగు', '🇮🇳 বাংলা', '🇮🇳 मराठी', '🇮🇳 ગુજરાતી'].map((lang) => (
              <span
                key={lang}
                className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-600">
            And 7 more Indian languages supported
          </p>
        </div>
      </section>

      {/* Floating Speaker Icon */}
      <div className="fixed top-6 right-6 z-50">
        <Link to="/voice">
          <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transition-all">
            <Mic className="h-8 w-8" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;