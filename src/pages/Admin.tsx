import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchApplications, JobApplication } from "@/services/adminService";
import { createChatSession, sendChatMessage, ChatSession } from "@/services/chatService";
import { Link } from "react-router-dom";
import { Search, Download, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'processed' | 'pending'>('all');

  // API candidate data
  const [candidates, setCandidates] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [chatError, setChatError] = useState<string | null>(null);

  // Use GUIDs for userId and sessionId
  const appName = "greeting_agent";
  const [userId] = useState(() => `u_${uuidv4()}`);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const openChat = async () => {
    setChatOpen(true);
    if (!chatSession) {
      setChatLoading(true);
      setChatError(null);
      try {
        const newSessionId = `s_${uuidv4()}`;
        const session = await createChatSession(appName, userId, { key1: "value1", key2: 42, sessionId: newSessionId });
  setChatSession(session);
  // Extract sessionId from the session response (if present) or from the payload
  const returnedSessionId = (session as any).sessionId || (session as any).id || newSessionId;
  setSessionId(returnedSessionId);
        setChatHistory([]);
      } catch (err) {
        setChatError("Failed to start chat session");
      } finally {
        setChatLoading(false);
      }
    }
  };

  const closeChat = () => {
    setChatOpen(false);
    setChatInput("");
    setChatError(null);
  };

  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatSession || !chatInput.trim()) return;
    const userMsg = { role: "user", text: chatInput };
    setChatHistory((h) => [...h, userMsg]);
    setChatInput("");
    setChatLoading(true);
    setChatError(null);
    try {
      // Use the sessionId from the chatSession response
      const replyRaw = await sendChatMessage(
        chatSession.appName,
        chatSession.userId,
        sessionId,
        userMsg.text
      );
      // Extract the last available text from the last object in the response array
      let replyText = "";
      try {
        const parsed = Array.isArray(replyRaw) ? replyRaw : JSON.parse(replyRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const last = parsed[parsed.length - 1];
          // Try to find a 'text' property in the last object's content.parts
          if (last && last.content && Array.isArray(last.content.parts)) {
            // Look for a part with a 'text' property, prefer the last one
            for (let i = last.content.parts.length - 1; i >= 0; i--) {
              const part = last.content.parts[i];
              if (typeof part.text === 'string') {
                replyText = part.text;
                break;
              }
              // If part has functionResponse with response.content array
              if (part.functionResponse && part.functionResponse.response && Array.isArray(part.functionResponse.response.content)) {
                const contentArr = part.functionResponse.response.content;
                for (let j = contentArr.length - 1; j >= 0; j--) {
                  if (typeof contentArr[j].text === 'string') {
                    replyText = contentArr[j].text;
                    break;
                  }
                }
                if (replyText) break;
              }
            }
          }
          // Fallback: stringify the last object if no text found
          if (!replyText) replyText = JSON.stringify(last);
        } else {
          replyText = typeof replyRaw === "string" ? replyRaw : JSON.stringify(replyRaw);
        }
      } catch (e) {
        replyText = typeof replyRaw === "string" ? replyRaw : JSON.stringify(replyRaw);
      }
      setChatHistory((h) => [...h, { role: "assistant", text: replyText }]);
    } catch (err) {
      setChatError("Failed to get response");
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchApplications()
      .then((data) => {
        setCandidates(data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to fetch applications");
        setCandidates([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAIQuery = () => {
    // This would call an AI assistant in production
    console.log("AI Query:", query);
  };

  // Filter and search logic
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesQuery =
      candidate.name.toLowerCase().includes(query.toLowerCase()) ||
      candidate.email.toLowerCase().includes(query.toLowerCase()) ||
      candidate.position.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'processed' && candidate.isApplicationProcessed) ||
      (statusFilter === 'pending' && !candidate.isApplicationProcessed);
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Onboardly
          </Link>
          <nav className="flex gap-6">
            <Link to="/jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Jobs
            </Link>
            <Link to="/admin" className="text-sm font-medium text-primary hover:underline">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Post Job Navigation Button */}
        <div className="flex justify-end mb-8">
          <Link to="/admin/post-job">
            <Button className="bg-gradient-to-r from-primary to-accent text-lg px-8 py-3 shadow-lg hover:scale-[1.03] transition-transform">
              + Post a New Job
            </Button>
          </Link>
        </div>
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Candidate Dashboard</h1>
          <p className="text-muted-foreground">Manage and review all candidate applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{candidates.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {candidates.filter((c) => c.isApplicationProcessed).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unprocessed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {candidates.filter((c) => !c.isApplicationProcessed).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Latest Application</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {candidates[0]?.name || "-"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Bot Button and Modal */}
        <div className="mb-8 flex justify-end">
          <Button onClick={openChat} className="bg-gradient-to-r from-primary to-accent text-lg px-6 py-2 shadow-lg">
            <Star className="h-5 w-5 mr-2 text-accent" />
            Open Chat Bot
          </Button>
        </div>
        {chatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-card rounded-lg shadow-xl w-full max-w-md flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="font-bold text-lg">AI Chat Bot</span>
                </div>
                <Button variant="ghost" size="icon" onClick={closeChat}>
                  ×
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-background" style={{ minHeight: 300, maxHeight: 400 }}>
                {chatLoading && chatHistory.length === 0 && (
                  <div className="text-center text-muted-foreground">Starting chat session...</div>
                )}
                {chatError && <div className="text-center text-destructive">{chatError}</div>}
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendChat} className="flex gap-2 p-4 border-t bg-background">
                <Input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={chatLoading}
                  className="flex-1"
                  autoFocus
                />
                <Button type="submit" disabled={chatLoading || !chatInput.trim()}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Candidates Table with Search and Filter */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <CardTitle>All Applications</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'processed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('processed')}
                >
                  Processed
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending
                </Button>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or position"
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading applications...</div>
            ) : error ? (
              <div className="text-center text-destructive py-8">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">No applications found.</TableCell>
                    </TableRow>
                  ) : (
                    filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.jobApplicationId}>
                        <TableCell>
                          <div className="font-medium">{candidate.name}</div>
                        </TableCell>
                        <TableCell>{candidate.email}</TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>
                          <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Resume</a>
                        </TableCell>
                        <TableCell>{new Date(candidate.appliedOn).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={candidate.isApplicationProcessed ? "bg-success text-success-foreground" : "bg-accent text-accent-foreground"}>
                            {candidate.isApplicationProcessed ? "Processed" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
