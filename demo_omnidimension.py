from omnidimension import Client
import json

print("=== OmniDimension HealthMate Agent Demo ===\n")

# This is what the code structure looks like
print("1. Library Import:")
print("from omnidimension import Client")
print()

print("2. Client Initialization:")
print("client = Client(api_key)")
print()

print("3. Agent Configuration:")
agent_config = {
    "name": "HealthMate",
    "welcome_message": "Hi, welcome to HealthMate, your healthcare assistant. How can I assist you today?",
    "context_breakdown": [
        {
            "title": "Greeting and Personalization",
            "body": "Begin with a warm, friendly greeting and ask for caller's name and language preference",
            "is_enabled": True
        },
        {
            "title": "Intelligent Q&A", 
            "body": "Provide clear healthcare answers in plain language",
            "is_enabled": True
        },
        {
            "title": "Appointment Scheduling",
            "body": "Help schedule appointments with specialists",
            "is_enabled": True
        },
        {
            "title": "Medication Reminders",
            "body": "Set up medication reminder services",
            "is_enabled": True
        },
        {
            "title": "Medical Report Interpretation",
            "body": "Explain medical reports in simple terms",
            "is_enabled": True
        },
        {
            "title": "Multilingual Support",
            "body": "Support for Indian languages",
            "is_enabled": True
        }
    ],
    "transcriber": {
        "provider": "deepgram_stream",
        "silence_timeout_ms": 400,
        "model": "nova-3",
        "numerals": True,
        "punctuate": True,
        "smart_format": False,
        "diarize": False
    },
    "model": {
        "model": "gpt-4o-mini",
        "temperature": 0.7
    },
    "voice": {
        "provider": "eleven_labs",
        "voice_id": "m7GHBtY0UEqljrKQw2JH"
    },
    "web_search": {
        "enabled": True,
        "provider": "DuckDuckGo"
    },
    "post_call_actions": {
        "email": {
            "enabled": True,
            "recipients": ["example@example.com"],
            "include": ["summary", "extracted_variables"]
        },
        "extracted_variables": []
    }
}

print("Agent Configuration:")
print(json.dumps(agent_config, indent=2))
print()

print("4. Expected API Response Format:")
expected_response = {
    "status": "success",
    "json": {
        "id": "agent_123456789",
        "name": "HealthMate",
        "welcome_message": "Hi, welcome to HealthMate, your healthcare assistant. How can I assist you today?",
        "context_breakdown": [
            {
                "title": "Greeting and Personalization",
                "body": "Begin with a warm, friendly greeting and ask for caller's name and language preference",
                "is_enabled": True
            }
        ],
        "transcriber": {
            "provider": "deepgram_stream",
            "model": "nova-3"
        },
        "model": {
            "model": "gpt-4o-mini",
            "temperature": 0.7
        },
        "voice": {
            "provider": "eleven_labs",
            "voice_id": "m7GHBtY0UEqljrKQw2JH"
        },
        "web_search": {
            "enabled": True,
            "provider": "DuckDuckGo"
        },
        "post_call_actions": {
            "email": {
                "enabled": True,
                "recipients": ["example@example.com"]
            }
        },
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}

print("Expected Response:")
print(json.dumps(expected_response, indent=2))
print()

print("5. What the output would look like:")
print("Status: success")
print("Created Agent: {agent_details}")
print("Agent ID: agent_123456789")
print()

print("=== To run this successfully, you need:")
print("1. A valid OmniDimension API key")
print("2. Replace 'YOUR_API_KEY_HERE' in the code with your actual API key")
print("3. Run: python test_omnidimension.py")
print()

print("=== Features of this HealthMate agent:")
print("✅ Voice-based healthcare assistant")
print("✅ Multilingual support (Indian languages)")
print("✅ Appointment scheduling")
print("✅ Medication reminders")
print("✅ Medical report interpretation")
print("✅ Web search capabilities")
print("✅ Email summaries after calls")
print("✅ Real-time transcription")
print("✅ Natural voice synthesis") 