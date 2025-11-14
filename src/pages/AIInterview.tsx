import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Mic, MicOff, VideoOff, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

// Agora Configuration
const APP_ID = import.meta.env.VITE_AGORA_APP_ID || "";
const CHANNEL = "ai-interview-room";
const TOKEN = null; // Use token server in production
const DEMO_MODE = !APP_ID || APP_ID === "your-app-id-here" || APP_ID.trim() === ""; // Enable demo mode if no App ID

const AIInterview = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const questions = [
    "Tell me about yourself and your professional background.",
    "Can you describe a challenging project you worked on and how you overcame the obstacles?",
    "How do you stay updated with the latest technologies in your field?",
    "Describe a time when you had to work with a difficult team member. How did you handle it?",
    "Where do you see yourself in the next 5 years?",
    "What interests you most about this position and our company?",
  ];

  useEffect(() => {
    // Initialize Agora client
    const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(agoraClient);
    setIsInitialized(true);

    return () => {
      // Cleanup on unmount
      if (agoraClient) {
        leaveChannel(agoraClient);
      }
    };
  }, []);

  const joinChannel = async () => {
    if (!client || !isInitialized) {
      toast.error("Agora client not initialized");
      return;
    }

    // Demo mode - skip Agora and use local media only
    if (DEMO_MODE) {
      try {
        toast.info("Running in demo mode (no Agora App ID). Using local camera only.");
        
        // Create local tracks for preview
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
          {
            encoderConfig: {
              sampleRate: 48000,
              stereo: true,
              bitrate: 128,
            },
          },
          {
            encoderConfig: {
              width: 640,
              height: 480,
              frameRate: 30,
              bitrateMax: 1000,
            },
          }
        );

        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);

        // Play video track in the local preview
        videoTrack.play("local-video");

        setIsJoined(true);
        setIsRecording(true);
        toast.success("Interview started! The AI will now ask you questions.");

        // Simulate AI avatar joining
        setTimeout(() => {
          toast.info("AI Avatar has joined the interview (Demo Mode)");
        }, 1000);

        return;
      } catch (error: any) {
        console.error("Error in demo mode:", error);
        toast.error(`Camera/Microphone error: ${error.message || "Please check permissions"}`);
        return;
      }
    }

    try {
      // Generate random UID
      const uid = Math.floor(Math.random() * 10000);

      // Join the channel
      await client.join(APP_ID, CHANNEL, TOKEN, uid);

      // Create local tracks
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
        {
          encoderConfig: {
            sampleRate: 48000,
            stereo: true,
            bitrate: 128,
          },
        },
        {
          encoderConfig: {
            width: 640,
            height: 480,
            frameRate: 30,
            bitrateMax: 1000,
          },
        }
      );

      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);

      // Play video track in the local preview
      videoTrack.play("local-video");

      // Publish tracks to the channel
      await client.publish([audioTrack, videoTrack]);

      setIsJoined(true);
      setIsRecording(true);
      toast.success("Interview started! The AI will now ask you questions.");

      // Simulate AI avatar joining (in production, this would be handled by your backend)
      setTimeout(() => {
        toast.info("AI Avatar has joined the interview");
      }, 1000);

      // Auto-advance questions every 2 minutes
      const questionInterval = setInterval(() => {
        setCurrentQuestion((prev) => {
          if (prev < questions.length - 1) {
            toast.info("Next question coming up...");
            return prev + 1;
          }
          return prev;
        });
      }, 120000); // 2 minutes per question

      return () => clearInterval(questionInterval);
    } catch (error: any) {
      console.error("Error joining channel:", error);
      const errorMessage = error.message || "Unknown error";
      
      if (errorMessage.includes("INVALID_VENDOR_KEY") || errorMessage.includes("INVALID_APP_ID")) {
        toast.error("Invalid Agora App ID. Please check your .env file or remove it to use demo mode.");
      } else if (errorMessage.includes("CAN_NOT_GET_GATEWAY_SERVER") || errorMessage.includes("dynamic use static key")) {
        toast.error("Your Agora project requires a token. Either enable 'APP ID only' mode in Agora Console or remove the App ID to use demo mode.");
        console.error("Solution: Go to Agora Console > Project Settings > Enable 'APP ID' authentication mode, or comment out VITE_AGORA_APP_ID in .env");
      } else if (errorMessage.includes("NotAllowedError") || errorMessage.includes("Permission")) {
        toast.error("Camera/Microphone permission denied. Please allow access in your browser settings.");
      } else if (errorMessage.includes("NotFoundError")) {
        toast.error("No camera or microphone found. Please connect a device.");
      } else {
        toast.error(`Failed to start interview: ${errorMessage}`);
      }
    }
  };

  const leaveChannel = async (agoraClient?: IAgoraRTCClient) => {
    const activeClient = agoraClient || client;
    
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
      setLocalAudioTrack(null);
    }

    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
      setLocalVideoTrack(null);
    }

    if (activeClient && isJoined && !DEMO_MODE) {
      await activeClient.leave();
      setIsJoined(false);
    } else if (DEMO_MODE) {
      setIsJoined(false);
    }
  };

  const toggleMute = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const endInterview = async () => {
    await leaveChannel();
    setIsRecording(false);
    toast.success("Interview completed! Proceeding to HR Round.");
    setTimeout(() => navigate("/admin"), 2000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      toast.info("Moving to next question");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Onboardly
          </Link>
          <div className="text-sm font-medium">AI Avatar Interview</div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Interview
          </Link>
        </Button>

        {!isInitialized && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Initializing video conference...
            </AlertDescription>
          </Alert>
        )}

        {DEMO_MODE && isInitialized && !isRecording && (
          <Alert className="mb-6 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Demo Mode:</strong> No Agora App ID configured. Running with local camera only. 
              Add your App ID to <code className="text-xs bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">.env</code> for full functionality.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* AI Avatar Video */}
            <Card>
              <CardHeader>
                <CardTitle>AI Avatar Interviewer</CardTitle>
                <CardDescription>Interactive AI-powered interview session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  {isRecording ? (
                    <>
                      {/* AI Avatar Placeholder - In production, this would show the AI avatar stream */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                              <User className="h-16 w-16" />
                            </div>
                            <p className="text-lg font-medium">AI Avatar Speaking...</p>
                            <p className="text-sm opacity-90">Analyzing your responses</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 z-10">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Live
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm z-10">
                        Question {currentQuestion + 1} of {questions.length}
                      </div>
                    </>
                  ) : (
                    <div className="text-white text-center">
                      <User className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">AI Avatar Ready</p>
                      <p className="text-sm opacity-90">Click "Start Interview" when ready</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={toggleMute}
                    disabled={!isRecording}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={toggleVideo}
                    disabled={!isRecording}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                  {isRecording && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextQuestion}
                      disabled={currentQuestion >= questions.length - 1}
                    >
                      Next Question
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Your Video Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  id="local-video" 
                  className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden"
                >
                  {!isRecording && (
                    <div className="text-center text-muted-foreground">
                      <Video className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-xs">Camera Preview</p>
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
                <CardTitle>Interview Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Before you start:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Ensure good lighting</li>
                    <li>Allow camera & microphone access</li>
                    <li>Find a quiet space</li>
                    <li>Look directly at the camera</li>
                    <li>Speak clearly and confidently</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Interview Format:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>{questions.length} AI-powered questions</li>
                    <li>Real-time interaction</li>
                    <li>Behavioral & technical topics</li>
                    <li>Duration: ~20-30 minutes</li>
                  </ul>
                </div>

                {!isRecording ? (
                  <Button onClick={joinChannel} className="w-full" size="lg" disabled={!isInitialized}>
                    {isInitialized ? "Start Interview" : "Initializing..."}
                  </Button>
                ) : (
                  <Button onClick={endInterview} variant="destructive" className="w-full" size="lg">
                    End Interview
                  </Button>
                )}
              </CardContent>
            </Card>

            {isRecording && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Question {currentQuestion + 1}/{questions.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium mb-2">{questions[currentQuestion]}</p>
                  <p className="text-xs text-muted-foreground">
                    Take your time to answer thoughtfully. The AI is listening and will respond.
                  </p>
                </CardContent>
              </Card>
            )}

            {isRecording && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Maintain eye contact with camera</li>
                    <li>Use STAR method for behavioral questions</li>
                    <li>Be specific with examples</li>
                    <li>Ask for clarification if needed</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterview;
