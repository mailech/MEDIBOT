# MEDIBOT+ - AI-Powered Healthcare Companion for India

A comprehensive healthcare platform that provides AI-powered medical assistance, medication management, hospital finder, and voice-based healthcare support in multiple Indian languages.

## 🚀 New Feature: HealthMate AI Voice Assistant

### What is HealthMate?
HealthMate is an AI-powered voice assistant integrated with **OmniDimension** that can have real phone conversations with patients. It provides 24/7 healthcare support in multiple Indian languages.

### 🎯 Key Features of HealthMate AI Agent

- **🤖 Voice AI Assistant**: Real-time phone conversations with patients
- **🌍 Multilingual Support**: Hindi, Tamil, Telugu, and other Indian languages
- **📞 Appointment Booking**: Schedule doctor appointments automatically
- **💊 Medication Reminders**: Set up and manage medication schedules
- **📋 Medical Report Interpretation**: Explain medical reports in simple terms
- **🔍 Web Search**: Access current medical information
- **📧 Email Summaries**: Get detailed summaries after each call
- **24/7 Availability**: Round-the-clock healthcare support

### 🏥 Real-World Use Cases

1. **Hospital Reception Automation**
   - Patients call to book appointments
   - AI handles initial screening and scheduling
   - Reduces staff workload during peak hours

2. **Healthcare Hotline**
   - 24/7 medical information support
   - Emergency guidance and triage
   - Multilingual patient support

3. **Pharmacy Support**
   - Medication consultation
   - Drug interaction checking
   - Prescription refill reminders

4. **Insurance Assistance**
   - Claims status checking
   - Coverage questions
   - Policy explanations

### 🔧 Technical Integration

#### Agent Configuration
- **Agent ID**: 2975
- **Platform**: OmniDimension
- **Voice Provider**: ElevenLabs (Human-like voice)
- **Speech-to-Text**: Deepgram (Nova-3 model)
- **AI Model**: GPT-4o-mini
- **Web Search**: DuckDuckGo integration

#### React Component Integration
```tsx
import HealthMateIntegration from '../components/HealthMateIntegration';

<HealthMateIntegration 
  agentId="2975"
  apiKey="your-api-key"
/>
```

### 🧪 Testing Your HealthMate Agent

#### 1. Web Dashboard Testing
- Visit: https://app.omnidim.io
- Login with API key: `kafOrESBOQUMZ8Cj6D901kvedWE-usYDCKXtsewqjgI`
- Find HealthMate agent (ID: 2975)
- Click "Test Call" to interact directly

#### 2. Phone Number Integration
- Contact OmniDimension support for a real phone number
- Connect the number to your HealthMate agent
- Patients can call and speak to the AI directly

#### 3. Website Integration
- Add "Call HealthMate" button to your website
- Integrate with existing healthcare platforms
- Seamless patient experience

### 📱 Example Conversation Flow

```
Patient: "Hello, I need to schedule a cardiologist appointment"
HealthMate: "Hi, welcome to HealthMate. May I have your name, please?"
Patient: "My name is Priya"
HealthMate: "Nice to meet you, Priya. Which location do you prefer?"
Patient: "Bangalore"
HealthMate: "I have Dr. Kumar available on Tuesday at 2 PM. Would that work for you?"
Patient: "Yes, that's perfect"
HealthMate: "Great! I've scheduled your appointment. Is there anything else you need?"
```

### 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   pip install omnidimension
   npm install
   ```

2. **Configure Agent**
   ```python
   from omnidimension import Client
   
   client = Client("your-api-key")
   response = client.agent.create(
       name="HealthMate",
       # ... configuration details
   )
   ```

3. **Test Integration**
   - Run the test scripts in the project
   - Use the web dashboard for live testing
   - Integrate with your existing healthcare platform

### 📊 Business Value

- **24/7 Availability**: No more "office hours only" limitations
- **Cost-Effective**: Significantly cheaper than human staff
- **Scalable**: Handle hundreds of calls simultaneously
- **Consistent Quality**: Same helpful service every time
- **Multilingual**: Serve diverse patient populations
- **Data-Driven**: Get insights from call summaries and analytics

### 🔗 Integration Options

1. **Website Integration**: Add call buttons to hospital websites
2. **Mobile App Integration**: Embed in healthcare apps
3. **WhatsApp Business**: Connect to WhatsApp for voice responses
4. **Telephony Systems**: Integrate with existing hospital phone systems
5. **API Integration**: Programmatic access for custom solutions

### 📞 Support and Documentation

- **OmniDimension Dashboard**: https://app.omnidim.io
- **API Documentation**: Available through OmniDimension
- **Agent ID**: 2975
- **Status**: Active and ready for production use

---

## 🏥 Core Features

### 1. AI Symptom Checker
- Powered by Google MedLM
- Multi-language support
- Instant medical insights
- Symptom analysis and recommendations

### 2. Smart Medication Reminders
- WhatsApp integration
- Voice call reminders
- Multi-language support
- Customizable schedules

### 3. Hospital Finder
- Real-time availability
- Location-based search
- Instant booking
- Emergency contacts

### 4. Voice Assistant
- Natural language processing
- Multi-language support
- Medical advice
- Appointment scheduling

## 🌍 Language Support

- Hindi
- Tamil
- Telugu
- Bengali
- Marathi
- Gujarati
- Kannada
- Malayalam
- Punjabi
- Urdu
- And more...

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server
5. Test HealthMate integration

## 📱 Technologies Used

- React + TypeScript
- Tailwind CSS
- OmniDimension AI
- Google MedLM
- WhatsApp Business API
- Voice Recognition APIs

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License.

---

**HealthMate AI Agent Status**: ✅ Active and Ready for Production Use
**Agent ID**: 2975
**Last Updated**: December 2024
