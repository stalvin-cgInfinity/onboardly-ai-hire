"""
LiveKit + Tavus AI Interview Agent

This agent conducts professional job interviews using:
- LiveKit for real-time audio/video
- Tavus for hyper-realistic AI avatars
- OpenAI GPT-4 for intelligent responses

Setup:
1. Install: pip install "livekit-agents[tavus]~=1.2" livekit-plugins-openai
2. Set environment variables (see .env.example)
3. Create Tavus replica and persona (see LIVEKIT_TAVUS_SETUP.md)
4. Run: python ai-interviewer.py dev
"""

import asyncio
import os
from livekit import agents
from livekit.agents import AgentSession, JobContext, WorkerOptions, cli
from livekit.plugins import openai, tavus

# Configuration - set these in your environment or here
TAVUS_REPLICA_ID = os.getenv("TAVUS_REPLICA_ID", "YOUR_REPLICA_ID")
TAVUS_PERSONA_ID = os.getenv("TAVUS_PERSONA_ID", "YOUR_PERSONA_ID")

# Interview questions
INTERVIEW_QUESTIONS = [
    "Tell me about yourself and your professional background.",
    "Can you describe a challenging project you worked on and how you overcame the obstacles?",
    "How do you stay updated with the latest technologies in your field?",
    "Describe a time when you had to work with a difficult team member. How did you handle it?",
    "Where do you see yourself in the next 5 years?",
    "What interests you most about this position and our company?",
]

# AI interviewer instructions
INTERVIEWER_PROMPT = f"""You are Sarah, an expert HR interviewer conducting a professional job interview.

YOUR PERSONALITY:
- Warm, professional, and encouraging
- Genuinely interested in the candidate
- Ask insightful follow-up questions when needed
- Provide positive reinforcement
- Make candidates feel comfortable

YOUR INTERVIEW PROCESS:

1. GREETING (Start with this):
   "Hello! Welcome to your interview with Onboardly. I'm Sarah, and I'll be conducting 
   your interview today. This will be a conversational interview where I'll ask you several
   questions about your background and experience. Feel free to speak naturally - this is 
   a friendly conversation. Let's begin!"

2. ASK THESE QUESTIONS IN ORDER:
   {chr(10).join([f'   {i+1}. {q}' for i, q in enumerate(INTERVIEW_QUESTIONS)])}

3. DURING ANSWERS:
   - Listen carefully
   - Ask 1-2 brief follow-up questions if interesting
   - Give encouraging feedback (e.g., "That's great experience...")
   - Then move to next question

4. CLOSING:
   "Thank you so much for your time today. You've shared some really interesting experiences.
   Our HR team will review your interview and be in touch with next steps soon. Best of luck!"

IMPORTANT RULES:
- Keep responses concise (2-3 sentences typically)
- Speak naturally, not robotically
- Don't repeat candidate's entire answer back
- Be encouraging but professional
- Transition smoothly between questions
- If unclear, politely ask for clarification

Remember: This is evaluating the candidate while representing our company positively!
"""


async def entrypoint(ctx: JobContext):
    """Main entry point for the AI interview agent."""
    
    # Connect to the LiveKit room
    await ctx.connect()
    print(f"🎤 AI Interviewer joined room: {ctx.room.name}")
    
    # Create AI session with speech capabilities
    session = AgentSession(
        # Speech-to-Text (listens to candidate)
        stt=openai.STT(
            model="whisper-1",
            language="en",
        ),
        
        # Large Language Model (AI brain)
        llm=openai.LLM(
            model="gpt-4-turbo",
            temperature=0.7,  # Balanced creativity
            instructions=INTERVIEWER_PROMPT,
        ),
        
        # Text-to-Speech (AI voice)
        tts=openai.TTS(
            model="tts-1-hd",  # High quality
            voice="nova",      # Professional female voice
            speed=0.95,        # Slightly slower for clarity
        ),
    )
    
    # Create Tavus hyper-realistic avatar
    avatar = tavus.AvatarSession(
        replica_id=TAVUS_REPLICA_ID,
        persona_id=TAVUS_PERSONA_ID,
        avatar_participant_name="AI Interviewer",
    )
    
    print("✅ Starting Tavus avatar...")
    
    # Start the avatar first
    await avatar.start(session, room=ctx.room)
    
    print("🤖 AI Interviewer is live with Tavus avatar!")
    
    # Start the AI agent session
    await session.start(
        room=ctx.room,
        agent=session,
    )
    
    print("✅ Interview session active - ready for candidate!")


def main():
    """Run the AI interview agent."""
    
    # Check for required environment variables
    required_vars = {
        "OPENAI_API_KEY": "Get from https://platform.openai.com/api-keys",
        "LIVEKIT_URL": "Get from https://cloud.livekit.io/",
        "LIVEKIT_API_KEY": "Get from LiveKit Cloud dashboard",
        "LIVEKIT_API_SECRET": "Get from LiveKit Cloud dashboard",
        "TAVUS_API_KEY": "Get from https://tavus.io/",
    }
    
    missing = []
    for var, help_text in required_vars.items():
        if not os.getenv(var):
            missing.append(f"❌ {var} not set - {help_text}")
    
    if missing:
        print("\n⚠️  Missing required environment variables:\n")
        for msg in missing:
            print(msg)
        print("\nPlease set these environment variables and try again.")
        print("See LIVEKIT_TAVUS_SETUP.md for detailed instructions.")
        return
    
    if TAVUS_REPLICA_ID == "YOUR_REPLICA_ID" or TAVUS_PERSONA_ID == "YOUR_PERSONA_ID":
        print("❌ Error: Tavus replica and persona IDs not configured")
        print("\nSteps to configure:")
        print("1. Create a Tavus account at https://tavus.io/")
        print("2. Create a replica (your AI avatar)")
        print("3. Create a persona with pipeline_mode='echo' and transport_type='livekit'")
        print("4. Set TAVUS_REPLICA_ID and TAVUS_PERSONA_ID environment variables")
        print("\nSee LIVEKIT_TAVUS_SETUP.md for detailed instructions.")
        return
    
    print("🤖 Starting LiveKit + Tavus AI Interview Agent...")
    print(f"📋 Replica ID: {TAVUS_REPLICA_ID}")
    print(f"📋 Persona ID: {TAVUS_PERSONA_ID}")
    print("\n📝 Interview Questions:")
    for i, q in enumerate(INTERVIEW_QUESTIONS, 1):
        print(f"   {i}. {q}")
    print("\n⏳ Waiting for candidate to join the room...\n")
    
    # Run the agent
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))


if __name__ == "__main__":
    main()
