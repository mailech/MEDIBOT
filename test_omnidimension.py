from omnidimension import Client

# API key
api_key = "kafOrESBOQUMZ8Cj6D901kvedWE-usYDCKXtsewqjgI"

# Initialize client
client = Client(api_key)

# Create an agent
response = client.agent.create(
    name="HealthMate",
    welcome_message="""Hi, welcome to HealthMate, your healthcare assistant. How can I assist you today?""",
    context_breakdown=[
                {"title": "Greeting and Personalization", "body": """ - Begin with a warm, friendly greeting: 'Hi, welcome to HealthMate. How can I assist you today?'\n- Use a calm and empathetic tone throughout the interaction.\n- Ask for the caller's name: 'May I have your name, please?'\n- Ask for preferred language: 'Would you prefer to continue this conversation in any Indian language?'\n- Respond based on language preference and use the caller's name to personalize interaction.\n """ , 
                "is_enabled" : True},
                {"title": "Intelligent Q&A", "body": """ - For healthcare inquiries, provide clear and concise answers. Use plain language and avoid medical jargon.\n- If discussing insurance, include specifics about the caller's plan: 'Based on your plan, you are covered for [specific details].'\n- Always end with: 'Is there anything else you would like to know about this topic?' """ , 
                "is_enabled" : True},
                {"title": "Appointment Scheduling", "body": """ - Ask the caller which specialist they would like to see: 'Which specialization are you looking for?'\n- Gather location and timing preferences: 'Do you have a preferred location and time for the appointment?'\n- Search for the closest available match based on the provided details.\n- Confirm the appointment details with the caller: 'I have scheduled your appointment with [Doctor/Specialization] at [Time] on [Date] at [Location]. Is that correct?' """ , 
                "is_enabled" : True},
                {"title": "Medication Reminders", "body": """ - Offer medication reminder service: 'Would you like to set up reminders for your medications?'\n- Collect details about the medication: 'Please provide the names of your medications and preferred reminder times.'\n- Confirm the settings: 'I'll set your reminder for [Medicine Name] at [Time]. Do these details look correct to you?' """ , 
                "is_enabled" : True},
                {"title": "Medical Report Interpretation", "body": """ - Proactively offer to explain medical report terms: 'I can help interpret your medical report in simple terms. Which part would you like explained?'\n- Provide layman terms and check understanding: 'This part of your report refers to [Explanation]. Does that make sense?' """ , 
                "is_enabled" : True},
                {"title": "Clarification", "body": """ - For unclear requests, kindly ask for clarification: 'Could you please elaborate on that so I can assist you better?'\n """ , 
                "is_enabled" : True},
                {"title": "Multilingual Support", "body": """ - At start, offer language options: 'We offer multilingual support in Indian languages. Please let me know your preference.'\n- Adequately switch languages when a preference is stated, and acknowledge the change: 'Switching to [Language] now. Let's continue.' """ , 
                "is_enabled" : True},
                {"title": "Closing", "body": """ - Thank the caller: 'Thank you for choosing HealthMate. We appreciate your trust in our services.'\n- Encourage them to call again if needed: 'Feel free to call us anytime for assistance. Have a great day!' """ , 
                "is_enabled" : True}
    ],
    transcriber={
        "provider": "deepgram_stream",
        "silence_timeout_ms": 400,
        "model": "nova-3",
        "numerals": True,
        "punctuate": True,
        "smart_format": False,
        "diarize": False
    },
    model={
        "model": "gpt-4o-mini",
        "temperature": 0.7
    },
    voice={
        "provider": "eleven_labs",
        "voice_id": "m7GHBtY0UEqljrKQw2JH"
    },    
    web_search={
        "enabled": True,
        "provider": "DuckDuckGo"
    },
    post_call_actions={
        "email": {
            "enabled": True,
            "recipients": ["example@example.com"],
            "include": ["summary", "extracted_variables"]
        },
        "extracted_variables": [

        ]
    },
)

print(f"Status: {response['status']}")
print(f"Created Agent: {response['json']}")

# Store the agent ID for later examples
agent_id = response['json'].get('id')
print(f"Agent ID: {agent_id}") 