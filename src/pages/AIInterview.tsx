import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Mic, MicOff, VideoOff, User, AlertCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  useTracks,
  useLocalParticipant,
  VideoTrack,
  useRemoteParticipants,
  ParticipantTile,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";

// LiveKit Configuration
const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || "";
const LIVEKIT_API_KEY = import.meta.env.VITE_LIVEKIT_API_KEY || "";
const LIVEKIT_API_SECRET = import.meta.env.VITE_LIVEKIT_API_SECRET || "";

// Inner component for the interview room
const InterviewRoom = ({ onDisconnect }: { onDisconnect: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { state, audioTrack } = useVoiceAssistant();
  const cameraTracks = useTracks([Track.Source.Camera]);
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const avatarParticipant = remoteParticipants.find(p => p.identity.includes('tavus') || p.identity.includes('avatar'));

  const questions = [
    "Tell me about yourself and your professional background.",
    "Can you describe a challenging project you worked on and how you overcame the obstacles?",
    "How do you stay updated with the latest technologies in your field?",
    "Describe a time when you had to work with a difficult team member. How did you handle it?",
    "Where do you see yourself in the next 5 years?",
    "What interests you most about this position and our company?",
  ];

  useEffect(() => {
    if (state === "listening") {
      toast.success("AI is ready - start speaking!");
    }
  }, [state]);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      toast.info("Moving to next question");
    } else {
      toast.info("All questions completed!");
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Video Section */}
      <div className="lg:col-span-2 space-y-4">
        {/* AI Avatar Video */}
        <Card>
          <CardHeader>
            <CardTitle>AI Interviewer</CardTitle>
            <CardDescription>LiveKit + Tavus - Real-time AI Avatar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
              {avatarParticipant ? (
                // Show Tavus avatar video
                <div className="w-full h-full">
                  {Array.from(avatarParticipant.videoTrackPublications.values()).map((publication) => (
                    publication.track && (
                      <VideoTrack
                        key={publication.trackSid}
                        trackRef={{
                          participant: avatarParticipant,
                          source: publication.source,
                          publication: publication,
                        }}
                        className="w-full h-full object-cover"
                      />
                    )
                  ))}
                </div>
              ) : (
                // Fallback visualization
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-all ${state === 'speaking' ? 'animate-pulse scale-110' : ''}`}>
                      <Bot className="h-16 w-16 text-white" />
                    </div>
                    
                    {/* Voice Visualizer */}
                    {audioTrack && (
                      <div className="w-64 h-16 mb-4">
                        <BarVisualizer
                          state={state}
                          barCount={7}
                          trackRef={audioTrack}
                          className="rounded-lg"
                          options={{ minHeight: 8 }}
                        />
                      </div>
                    )}
                    
                    <p className="text-lg font-medium text-white">
                      {state === "speaking" ? "AI Speaking..." : 
                       state === "listening" ? "Listening to you..." : 
                       state === "thinking" ? "Processing..." : "Waiting for avatar..."}
                    </p>
                    <p className="text-sm opacity-90 text-white mt-2">
                      {state === "speaking" ? "Please listen" : 
                       state === "listening" ? "Your turn to speak" : 
                       state === "thinking" ? "Analyzing response" : "Voice-to-voice AI"}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 z-10">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Live
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm z-10">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>

            {/* Control Bar */}
            <VoiceAssistantControlBar />
          </CardContent>
        </Card>

        {/* Your Video Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {cameraTracks.length > 0 ? (
                <VideoTrack trackRef={cameraTracks[0]} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-center text-muted-foreground">
                  <div>
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-xs">Camera Preview</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions & Controls */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Interview Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI State:</span>
                <span className="font-medium capitalize">{state}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Participant:</span>
                <span className="font-medium">{localParticipant?.identity || "You"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avatar:</span>
                <span className="font-medium">{avatarParticipant ? "Connected" : "Connecting..."}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <span className="font-medium">{currentQuestion + 1}/{questions.length}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button 
                onClick={nextQuestion} 
                className="w-full"
                disabled={currentQuestion >= questions.length - 1}
              >
                Next Question
              </Button>
              <Button variant="destructive" className="w-full" onClick={onDisconnect}>
                End Interview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Question {currentQuestion + 1}/{questions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium mb-2">{questions[currentQuestion]}</p>
            <p className="text-xs text-muted-foreground">
              The AI will ask this question. Answer naturally - it's voice-to-voice!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Speak naturally, like a real conversation</li>
              <li>Wait for AI to finish before responding</li>
              <li>Use STAR method for behavioral questions</li>
              <li>Be specific with examples</li>
              <li>Ask for clarification if needed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AIInterview = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const generateToken = async () => {
    if (!LIVEKIT_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
      toast.error("LiveKit configuration missing. Please check your .env file.");
      return;
    }

    setIsConnecting(true);
    
    try {
      // In production, generate token server-side
      // For now, using a simple client-side token generation (NOT secure for production)
      const response = await fetch(`${LIVEKIT_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: LIVEKIT_API_KEY,
          apiSecret: LIVEKIT_API_SECRET,
          roomName: 'interview-room',
          participantName: `candidate-${Date.now()}`,
        }),
      });

      const data = await response.json();
      setToken(data.token);
      toast.success("Connected to interview room!");
    } catch (error) {
      console.error('Error generating token:', error);
      toast.error("Failed to connect. Please check your LiveKit configuration.");
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setToken("");
    setIsConnecting(false);
    toast.success("Interview completed! Proceeding to HR Round.");
    setTimeout(() => navigate("/admin"), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Onboardly
          </Link>
          <div className="text-sm font-medium">AI Interview - Powered by LiveKit + Tavus</div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Interview
          </Link>
        </Button>

        {!token ? (
          // Pre-interview screen
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>AI Video Interview</CardTitle>
                  <CardDescription>Real-time voice conversation with hyper-realistic AI avatar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                    <div className="text-white text-center">
                      <Bot className="h-20 w-20 mx-auto mb-4" />
                      <p className="text-xl font-medium">LiveKit + Tavus AI Avatar Ready</p>
                      <p className="text-sm opacity-90 mt-2">Hyper-realistic AI interviewer with natural conversation</p>
                    </div>
                  </div>

                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This interview uses LiveKit's real-time infrastructure with Tavus hyper-realistic avatars for natural voice conversations.
                      Make sure your microphone and camera are working.
                    </AlertDescription>
                  </Alert>

                  {(!LIVEKIT_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Configuration Required:</strong> Please add your LiveKit credentials to the .env file.
                        <br />
                        Get started at <a href="https://cloud.livekit.io" target="_blank" rel="noopener noreferrer" className="underline">cloud.livekit.io</a>
                        <br />
                        <span className="text-xs">Need Tavus? Sign up at <a href="https://tavus.io" target="_blank" rel="noopener noreferrer" className="underline">tavus.io</a></span>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Before you start:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ensure good lighting</li>
                      <li>Allow camera & microphone access</li>
                      <li>Find a quiet space</li>
                      <li>Use headphones for best audio</li>
                      <li>Speak clearly and naturally</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Interview Format:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>6 AI-powered questions</li>
                      <li>Real-time voice conversation</li>
                      <li>Hyper-realistic AI avatar</li>
                      <li>Natural back-and-forth dialogue</li>
                      <li>Behavioral & technical topics</li>
                      <li>Duration: ~20-30 minutes</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={generateToken} 
                    className="w-full" 
                    size="lg"
                    disabled={isConnecting || !LIVEKIT_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET}
                  >
                    {isConnecting ? "Connecting..." : "Start Interview"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Powered by LiveKit + Tavus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">
                    This interview uses cutting-edge technology:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>LiveKit - Ultra-low latency audio/video</li>
                    <li>Tavus - Hyper-realistic AI avatars</li>
                    <li>Voice-to-voice AI conversation</li>
                    <li>Enterprise-grade reliability</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Interview Room
          <LiveKitRoom
            token={token}
            serverUrl={LIVEKIT_URL}
            connect={true}
            audio={true}
            video={true}
            onDisconnected={handleDisconnect}
          >
            <InterviewRoom onDisconnect={handleDisconnect} />
            <RoomAudioRenderer />
          </LiveKitRoom>
        )}
      </div>
    </div>
  );
};

export default AIInterview;
