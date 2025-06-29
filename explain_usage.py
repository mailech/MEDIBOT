from omnidimension import Client

# Your API key
api_ket = "your api key"
client = Client(api_key)

# Your agent ID from the previous run
agent_id = 2975

print("=== HOW OMNIDIMENSION WORKS ===\n")

print("1. WHAT YOU JUST CREATED:")
print("   - A voice AI agent named 'HealthMate'")
print("   - It can have real phone conversations with people")
print("   - It speaks using ElevenLabs voice (sounds human)")
print("   - It listens using Deepgram (speech-to-text)")
print("   - It thinks using GPT-4o-mini (AI brain)")
print("   - It can search the web for information\n")

print("2. HOW IT WORKS IN PRACTICE:")
print("   - Someone calls a phone number associated with your agent")
print("   - The agent answers: 'Hi, welcome to HealthMate. How can I assist you today?'")
print("   - Person speaks: 'I need to schedule a doctor appointment'")
print("   - Agent responds: 'Which specialization are you looking for?'")
print("   - Person: 'Cardiologist'")
print("   - Agent: 'Do you have a preferred location and time?'")
print("   - And so on...\n")

print("3. WHAT YOUR AGENT CAN DO:")
print("   ✅ Answer healthcare questions")
print("   ✅ Schedule appointments")
print("   ✅ Set medication reminders")
print("   ✅ Explain medical reports")
print("   ✅ Support multiple Indian languages")
print("   ✅ Search the web for current information")
print("   ✅ Send email summaries after calls\n")

print("4. REAL-WORLD USE CASES:")
print("   - Hospital reception desk automation")
print("   - Healthcare hotline for patients")
print("   - Appointment booking system")
print("   - Medical information helpline")
print("   - Patient support and triage\n")

# Let's see what agents you have
print("5. YOUR CURRENT AGENTS:")
try:
    agents = client.agent.list()
    print(f"   You have {len(agents['json'])} agent(s):")
    for agent in agents['json']:
        print(f"   - ID: {agent['id']}, Name: {agent['name']}, Status: {agent['status']}")
except Exception as e:
    print(f"   Error fetching agents: {e}")

print("\n6. NEXT STEPS TO USE IT:")
print("   - Get a phone number from OmniDimension")
print("   - Connect it to your agent")
print("   - Start receiving calls!")
print("   - Monitor conversations in the dashboard")
print("   - Get email summaries of each call\n")

print("7. EXAMPLE CONVERSATION FLOW:")
print("   Caller: 'Hello, I need help with my medication'")
print("   Agent: 'Hi, welcome to HealthMate. May I have your name, please?'")
print("   Caller: 'My name is Priya'")
print("   Agent: 'Nice to meet you, Priya. Would you like to set up reminders for your medications?'")
print("   Caller: 'Yes, I take blood pressure medicine twice a day'")
print("   Agent: 'I'll set your reminder for blood pressure medicine at 9 AM and 9 PM. Do these details look correct?'")
print("   Caller: 'Yes, that's perfect'")
print("   Agent: 'Great! Your medication reminders are now set up. Is there anything else you would like to know?'") 
