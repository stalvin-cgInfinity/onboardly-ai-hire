import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Mic, MicOff, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AIInterview = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const startInterview = () => {
    setIsRecording(true);
    toast.success("Interview started! The AI will now ask you questions.");
  };

  const endInterview = () => {
    setIsRecording(false);
    toast.success("Interview completed! Proceeding to HR Round.");
    setTimeout(() => navigate("/interview/hr"), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Onboardly
          </Link>
          <div className="text-sm font-medium">Round 2: AI Interview</div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Interview
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Interviewer</CardTitle>
                <CardDescription>Face-to-face interview with our AI assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center mb-4 relative">
                  {isRecording ? (
                    <div className="text-white text-center">
                      <Video className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <p className="text-lg font-medium">Interview in Progress</p>
                      <p className="text-sm opacity-90">AI is analyzing your responses...</p>
                    </div>
                  ) : (
                    <div className="text-white text-center">
                      <Video className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">Ready to Start</p>
                      <p className="text-sm opacity-90">Click "Start Interview" when ready</p>
                    </div>
                  )}
                  {isRecording && (
                    <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Recording
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setIsMuted(!isMuted)}
                    disabled={!isRecording}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    disabled={!isRecording}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Your Video Preview */}
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Your Video</p>
                  <div className="aspect-video max-w-xs bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Video className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-xs">Camera Preview</p>
                    </div>
                  </div>
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
                    <li>Test your microphone</li>
                    <li>Find a quiet space</li>
                    <li>Look directly at the camera</li>
                    <li>Speak clearly and confidently</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Interview Format:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>5-7 technical questions</li>
                    <li>Behavioral questions</li>
                    <li>Problem-solving scenarios</li>
                    <li>Duration: 20-30 minutes</li>
                  </ul>
                </div>

                {!isRecording ? (
                  <Button onClick={startInterview} className="w-full" size="lg">
                    Start Interview
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
                  <CardTitle className="text-base">Current Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    "Can you describe a challenging project you worked on and how you overcame the obstacles?"
                  </p>
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
