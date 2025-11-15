# LiveKit + Tavus AI Interview Setup Guide

## 🎉 Why LiveKit + Tavus?

This combination provides the **best AI interview experience** available:

✅ **LiveKit** - Ultra-low latency real-time communication (<50ms)  
✅ **Tavus** - Hyper-realistic AI avatars that look and sound human  
✅ **Voice-to-Voice AI** - Natural conversation, not text-based  
✅ **Enterprise Grade** - Reliable, scalable, production-ready  
✅ **Easy Integration** - Built for AI agents from the ground up  

---

## 🚀 Quick Start (10 minutes)

### Step 1: Set Up LiveKit (5 minutes)

#### Option A: LiveKit Cloud (Recommended)

1. **Sign up at [LiveKit Cloud](https://cloud.livekit.io/)**
   - Create a free account
   - Create a new project

2. **Get Your Credentials**
   - Go to Project Settings
   - Copy your:
     - WebSocket URL (e.g., `wss://your-project.livekit.cloud`)
     - API Key
     - API Secret

3. **Update `.env` file:**
   ```env
   VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
   VITE_LIVEKIT_API_KEY=your_api_key_here
   VITE_LIVEKIT_API_SECRET=your_api_secret_here
   ```

#### Option B: Self-Hosted LiveKit (Free)

1. **Install LiveKit Server:**
   ```bash
   # macOS
   brew install livekit
   
   # Or use Docker
   docker run --rm -p 7880:7880 -p 7881:7881 -p 7882:7882/udp livekit/livekit-server
   ```

2. **Start LiveKit Server:**
   ```bash
   livekit-server --dev
   ```

3. **Update `.env` file:**
   ```env
   VITE_LIVEKIT_URL=ws://localhost:7880
   VITE_LIVEKIT_API_KEY=devkey
   VITE_LIVEKIT_API_SECRET=secret
   ```

### Step 2: Set Up Tavus AI Avatar (5 minutes)

1. **Sign up at [Tavus](https://tavus.io/)**
   - Create an account
   - Get your API key from dashboard

2. **Create a Replica** (your AI avatar):
   - Upload a video or photo
   - Or use Tavus's stock avatars
   - Copy the **Replica ID**

3. **Create a Persona** for LiveKit:
   ```bash
   curl --request POST \
     --url https://tavusapi.com/v2/personas \
     -H "Content-Type: application/json" \
     -H "x-api-key: YOUR_TAVUS_API_KEY" \
     -d '{
       "layers": {
         "transport": {
           "transport_type": "livekit"
         }
       },
       "persona_name": "AI Interviewer",
       "pipeline_mode": "echo"
     }'
   ```
   - Copy the **Persona ID** from response

4. **Update `.env` file:**
   ```env
   VITE_TAVUS_API_KEY=your_tavus_api_key
   ```

### Step 3: Set Up Python AI Agent

1. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install "livekit-agents[tavus]~=1.2" livekit-plugins-openai
   ```

3. **Get OpenAI API Key:**
   - Sign up at [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create API key
   - Add to environment:
     ```bash
     export OPENAI_API_KEY=sk-your_key_here
     export LIVEKIT_URL=wss://your-project.livekit.cloud
     export LIVEKIT_API_KEY=your_api_key
     export LIVEKIT_API_SECRET=your_api_secret
     export TAVUS_API_KEY=your_tavus_api_key
     ```

4. **Create AI agent** (`ai-interviewer.py`):
   ```python
   import asyncio
   from livekit import agents
   from livekit.agents import AgentSession, JobContext, WorkerOptions, cli
   from livekit.plugins import openai, tavus

   async def entrypoint(ctx: JobContext):
       # Connect to the room
       await ctx.connect()
       
       # Create AI session with voice capabilities
       session = AgentSession(
           stt=openai.STT(model="whisper-1"),
           llm=openai.LLM(model="gpt-4-turbo"),
           tts=openai.TTS(model="tts-1-hd", voice="nova"),
       )
       
       # Create Tavus avatar
       avatar = tavus.AvatarSession(
           replica_id="YOUR_REPLICA_ID",
           persona_id="YOUR_PERSONA_ID",
       )
       
       # Start avatar
       await avatar.start(session, room=ctx.room)
       
       # Start AI session
       await session.start(
           room=ctx.room,
           agent=session,
       )

   if __name__ == "__main__":
       cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
   ```

5. **Run the agent:**
   ```bash
   python ai-interviewer.py dev
   ```

### Step 4: Start Interview

1. **Start React app:**
   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:5173

3. **Click "Start Interview"**

4. **Talk to the AI avatar!** 🎉

---

## 🎯 How It Works

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Candidate     │◄───────►│  LiveKit Server  │◄───────►│  Python Agent   │
│  (React App)    │  WebRTC │   (Real-time)    │  WebRTC │ + Tavus Avatar  │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │                             │
    Browser                      Routing                    AI Processing
   Video + Mic                Audio/Video                  GPT-4 + Avatar
                                 Streams                   Hyper-realistic
```

### Interview Flow:

1. **Candidate joins** → React app connects to LiveKit room
2. **AI agent joins** → Python script connects to same room
3. **Tavus avatar appears** → Hyper-realistic video of AI interviewer
4. **Natural conversation:**
   - Tavus avatar speaks (with lip-sync)
   - Candidate responds via microphone
   - AI listens, processes with GPT-4
   - Tavus avatar responds naturally
   - Continuous back-and-forth dialogue

---

## 📦 What You Get

### ✅ Features

- **Hyper-Realistic Avatar** - Tavus provides photorealistic video avatars
- **Natural Lip-Sync** - Avatar's mouth moves perfectly with speech
- **Voice-to-Voice AI** - Real conversation, not text chat
- **Ultra-Low Latency** - <50ms audio/video delay
- **Built-in Controls** - Mute, video toggle, disconnect
- **Professional UI** - Beautiful React components
- **Voice Visualizer** - See when AI is speaking/listening
- **Multi-participant** - Can add HR observers

### 🎨 React Components Used

```tsx
<LiveKitRoom>                // Main room container
<RoomAudioRenderer />        // Plays audio automatically
<VoiceAssistantControlBar /> // Mic/speaker controls
<BarVisualizer />            // Voice activity visualization
<VideoTrack />               // Display video streams
<useVoiceAssistant />        // AI state (speaking/listening/thinking)
<useRemoteParticipants />    // Track avatar participant
```

---

## 🆚 Comparison

| Feature | LiveKit + Tavus | Agora + D-ID | Previous Setup |
|---------|----------------|--------------|----------------|
| **Avatar Quality** | ⭐⭐⭐⭐⭐ Hyper-realistic | ⭐⭐⭐ Good | ⭐⭐ Basic |
| **Lip-Sync** | Perfect | Good | Poor |
| **Voice AI** | ✅ Built-in | ❌ DIY | ❌ None |
| **Setup Time** | 10 minutes | 30+ minutes | - |
| **APIs to integrate** | 2 (LiveKit + Tavus) | 2 (Agora + D-ID) | 1 |
| **Latency** | <50ms | ~200ms | N/A |
| **Cost (1000 mins)** | $20 | $99 | - |
| **Self-hosting** | ✅ Free | ❌ No | - |
| **Avatar customization** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | - |
| **Documentation** | Excellent | Good | - |
| **AI Agent SDK** | ✅ Official | ❌ None | - |

---

## 💰 Pricing

### LiveKit Cloud

- **Free Tier:** 
  - 50GB egress/month
  - ~1,000 participant-minutes
  - Perfect for development

- **Pay-as-you-go:** 
  - $0.009 per participant-minute
  - 1000 mins ≈ $9

### Tavus

- **Free Trial:** Limited credits for testing
- **Pay-as-you-go:** $0.20 per avatar minute
- **1000 mins:** ~$200
- **Monthly Plans:** Available for volume

### OpenAI (for AI logic)

- **GPT-4 Turbo:** $0.01 per 1K tokens
- **TTS:** $15 per 1M characters
- **Whisper:** $0.006 per minute

**Total Cost Per 30-min Interview:** ~$7

---

## 🔧 Advanced Configuration

### Custom Avatar Personality

Edit `ai-interviewer.py`:

```python
llm=openai.LLM(
    model="gpt-4-turbo",
    instructions="""You are Sarah, a senior technical recruiter.
    You're warm, professional, and ask insightful follow-up questions.
    
    Interview process:
    1. Greet warmly
    2. Ask each question
    3. Listen actively
    4. Provide brief feedback
    5. Move to next question
    
    Questions:
    - Tell me about yourself
    - Describe a challenging project
    - How do you stay updated?
    - Difficult team member situation
    - 5-year career goals
    - Why our company?
    """,
)
```

### Different Tavus Avatars

```python
# Choose from Tavus's library or create custom
avatar = tavus.AvatarSession(
    replica_id="replica_professional_female",  # Professional woman
    # replica_id="replica_professional_male",  # Professional man
    # replica_id="your_custom_replica_id",     # Your custom avatar
    persona_id="YOUR_PERSONA_ID",
)
```

### Recording Interviews

```python
# In ai-interviewer.py
from livekit import rtc

async def entrypoint(ctx: JobContext):
    await ctx.connect()
    
    # Start recording
    await ctx.room.local_participant.publish_data(
        data=b"START_RECORDING",
        reliable=True
    )
    
    # Your existing code...
```

---

## 🐛 Troubleshooting

### "Failed to connect to LiveKit"

**Solutions:**
1. Check `.env` has correct `VITE_LIVEKIT_URL`
2. Verify API key and secret are correct
3. If self-hosted, ensure server is running
4. Check firewall allows WebSocket connections

### "Tavus avatar not appearing"

**Solutions:**
1. Verify Tavus API key is set
2. Check replica ID and persona ID are correct
3. Ensure persona has `transport_type: "livekit"`
4. Look at Python agent logs for errors

### "No audio from avatar"

**Solutions:**
1. Check browser audio permissions
2. Unmute in control bar
3. Verify OpenAI TTS is working
4. Try different browser (Chrome recommended)

### "AI agent not joining room"

**Solutions:**
1. Ensure Python agent is running
2. Check all environment variables are set
3. Verify LiveKit credentials match
4. Look at agent terminal for errors

---

## 📚 Documentation

### Official Resources

- **LiveKit Docs:** https://docs.livekit.io/
- **Tavus Docs:** https://docs.tavus.io/
- **Tavus Plugin:** https://docs.livekit.io/agents/models/avatar/plugins/tavus/
- **Agents SDK:** https://docs.livekit.io/agents/overview/
- **React Components:** https://docs.livekit.io/reference/components/react/

### Example Code

- **Tavus Examples:** https://github.com/livekit/agents/tree/main/examples
- **Voice Assistant:** https://github.com/livekit/agents/tree/main/examples/voice-assistant

### Community

- **LiveKit Discord:** https://livekit.io/discord
- **GitHub:** https://github.com/livekit/livekit
- **Tavus Support:** support@tavus.io

---

## 🎓 Next Steps

### 1. Basic Setup (Complete! ✅)
- [x] Install LiveKit packages
- [x] Configure environment
- [x] Update React components

### 2. Add AI Agent
- [ ] Set up Python environment
- [ ] Create Tavus replica and persona
- [ ] Configure AI agent script
- [ ] Test voice interview

### 3. Customize Experience
- [ ] Customize avatar appearance
- [ ] Adjust AI personality
- [ ] Add custom questions
- [ ] Implement scoring logic

### 4. Production Ready
- [ ] Set up server-side token generation
- [ ] Add interview recording
- [ ] Implement analytics
- [ ] Deploy AI agent service

---

## 🌟 Why This is Better

### Before:
```javascript
// Complex Agora setup
// Separate D-ID integration
// Manual token management
// No built-in AI
// Text-based avatars
```

### After:
```javascript
// Simple LiveKit integration
// Tavus hyper-realistic avatars
// Built-in AI agent support
// Voice-to-voice conversation
// Production-ready
```

---

**Ready to start?** 

1. Add LiveKit credentials to `.env`
2. Sign up for Tavus
3. Run the Python agent
4. Start interviewing! 🚀

**Need help?** Check the [troubleshooting section](#-troubleshooting) or join the [LiveKit Discord](https://livekit.io/discord).
