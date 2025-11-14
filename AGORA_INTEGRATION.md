# Agora SDK Integration for AI Avatar Interview

## Overview
The AI Interview page now integrates Agora RTC SDK for real-time video and audio communication, enabling live interviews with an AI Avatar.

## Features Implemented

### 🎥 Real-time Video & Audio
- **Live Video Streaming**: Agora RTC SDK for real-time communication
- **Camera & Microphone Access**: WebRTC-based media capture
- **Local Video Preview**: See yourself during the interview
- **AI Avatar Stream**: Placeholder for AI avatar video (integrate with your AI service)

### 🎛️ Interview Controls
- **Mute/Unmute Audio**: Toggle microphone on/off
- **Enable/Disable Video**: Toggle camera on/off
- **Next Question**: Manual progression through questions
- **End Interview**: Gracefully leave the channel and cleanup

### 📋 Interview Features
- **6 Pre-defined Questions**: Behavioral and technical questions
- **Question Counter**: Track progress (Question X of 6)
- **Auto-advance**: Questions auto-advance every 2 minutes
- **Live Indicator**: Shows when the interview is active
- **Instructions & Tips**: Guidance for candidates

## Setup Instructions

### 1. Get Agora App ID
1. Visit [Agora Console](https://console.agora.io/)
2. Create an account or sign in
3. Create a new project
4. Copy your App ID

### 2. Configure Environment Variables
Edit `.env` file in the project root:
```env
VITE_AGORA_APP_ID=your-actual-app-id-here
```

### 3. Packages Installed
```bash
npm install agora-rtc-react agora-rtc-sdk-ng
```

## Usage

### Starting an Interview
1. Candidate clicks "Start Interview Process" from job details
2. Browser requests camera/microphone permissions
3. Agora SDK initializes and joins the channel
4. Local video preview appears
5. Interview begins with AI Avatar

### During Interview
- **Mute/Unmute**: Click microphone icon
- **Video On/Off**: Click camera icon
- **Next Question**: Click "Next Question" button
- **End Early**: Click "End Interview" button

### Interview Flow
```
1. Initialize Agora Client
   ↓
2. Request Permissions
   ↓
3. Create Audio/Video Tracks
   ↓
4. Join Channel
   ↓
5. Publish Tracks
   ↓
6. Interview Session
   ↓
7. Leave Channel
   ↓
8. Cleanup Resources
```

## Technical Implementation

### Agora Client Setup
```typescript
const client = AgoraRTC.createClient({ 
  mode: "rtc", 
  codec: "vp8" 
});
```

### Track Configuration
- **Audio**: 48kHz, stereo, 128kbps
- **Video**: 640x480, 30fps, max 1000kbps

### Channel Structure
- **Channel Name**: "ai-interview-room"
- **Mode**: RTC (Real-Time Communication)
- **Codec**: VP8

## AI Avatar Integration

### Current Implementation
The AI Avatar area shows a placeholder with animated icon. To integrate a real AI Avatar:

### Option 1: Remote User Stream
```typescript
client.on("user-published", async (user, mediaType) => {
  await client.subscribe(user, mediaType);
  if (mediaType === "video") {
    user.videoTrack?.play("ai-avatar-video");
  }
});
```

### Option 2: External AI Service
1. Connect to your AI Avatar service (e.g., D-ID, HeyGen, Synthesia)
2. Get the video stream URL
3. Display in the AI Avatar container
4. Sync with Agora audio channel

### Option 3: Pre-recorded AI Avatar
1. Upload avatar videos for each question
2. Play corresponding video when question changes
3. Combine with Agora audio for real-time response

## Production Considerations

### 1. Token Server
For production, implement a token server:
```typescript
// Backend endpoint
POST /api/agora/token
{
  "channelName": "ai-interview-room",
  "uid": 12345,
  "role": "publisher"
}

// Returns
{
  "token": "generated-token",
  "uid": 12345
}
```

Update the code:
```typescript
const TOKEN = await fetchTokenFromServer();
await client.join(APP_ID, CHANNEL, TOKEN, uid);
```

### 2. Security
- ✅ Use token authentication (not null tokens)
- ✅ Implement token expiration
- ✅ Validate channel permissions
- ✅ Rate limit API calls

### 3. Quality Settings
Adjust based on network conditions:
```typescript
// Low bandwidth
encoderConfig: {
  width: 320,
  height: 240,
  frameRate: 15,
  bitrateMax: 500,
}

// High quality
encoderConfig: {
  width: 1280,
  height: 720,
  frameRate: 30,
  bitrateMax: 2000,
}
```

### 4. Error Handling
- Network disconnection recovery
- Camera/microphone permission denied
- Channel join failures
- Track creation errors

## AI Question System

### Current Questions
1. Tell me about yourself and your professional background
2. Describe a challenging project and how you overcame obstacles
3. How do you stay updated with latest technologies?
4. Working with difficult team members
5. 5-year career goals
6. Interest in position and company

### Extending Questions
Edit the `questions` array in `AIInterview.tsx`:
```typescript
const questions = [
  "Your custom question here...",
  // Add more questions
];
```

### AI Response Integration
To make the AI Avatar respond to answers:
1. Record candidate audio
2. Send to speech-to-text service
3. Process with AI (GPT-4, etc.)
4. Generate AI response
5. Convert to speech (TTS)
6. Play through Agora or avatar service

## Performance Optimization

### 1. Lazy Loading
```typescript
const AgoraRTC = lazy(() => import('agora-rtc-sdk-ng'));
```

### 2. Resource Cleanup
Always cleanup tracks and leave channel:
```typescript
useEffect(() => {
  return () => {
    leaveChannel();
  };
}, []);
```

### 3. Network Quality Monitoring
```typescript
client.on("network-quality", (stats) => {
  console.log("Uplink quality:", stats.uplinkNetworkQuality);
  console.log("Downlink quality:", stats.downlinkNetworkQuality);
});
```

## Testing

### Local Testing
1. Open interview page: `http://localhost:8081/interview/ai`
2. Allow camera/microphone permissions
3. Click "Start Interview"
4. Verify video preview appears
5. Test mute/unmute controls
6. Test video on/off
7. Test question progression
8. Test end interview

### Multi-user Testing
1. Open in two browser tabs/windows
2. Both should join the same channel
3. Should see/hear each other (simulates candidate + AI)

## Troubleshooting

### Camera Not Working
- Check browser permissions
- Verify camera is not in use by another app
- Try different browser

### No Audio
- Check microphone permissions
- Verify system audio settings
- Check mute status

### Can't Join Channel
- Verify App ID is correct
- Check network connection
- Check browser console for errors

### Video Quality Issues
- Reduce encoder config settings
- Check network speed
- Close other bandwidth-heavy apps

## Next Steps

### Recommended Enhancements
1. ✅ **AI Avatar Service**: Integrate D-ID, HeyGen, or custom solution
2. ✅ **Speech-to-Text**: Real-time transcription (Whisper, Google STT)
3. ✅ **AI Response**: GPT-4 integration for intelligent responses
4. ✅ **Recording**: Save interview for HR review
5. ✅ **Analytics**: Track engagement, response time, sentiment
6. ✅ **Screen Sharing**: Allow code/presentation sharing
7. ✅ **Chat**: Text-based fallback option

## Resources

- [Agora Documentation](https://docs.agora.io/)
- [Agora React SDK](https://www.npmjs.com/package/agora-rtc-react)
- [Agora Console](https://console.agora.io/)
- [WebRTC Guide](https://webrtc.org/)

## Support

For Agora-specific issues:
- [Agora Community](https://www.agora.io/en/community/)
- [GitHub Issues](https://github.com/AgoraIO/AgoraWebSDK-NG/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/agora)
