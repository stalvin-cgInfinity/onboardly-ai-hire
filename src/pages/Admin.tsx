import { useState } from "react";
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

  // Mock candidate data
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      position: "Senior Frontend Developer",
      college: "MIT",
      score: 850,
      status: "Selected",
      rounds: { mcq: 45, ai: 42, hr: 48 },
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      position: "AI/ML Engineer",
      college: "Stanford University",
      score: 920,
      status: "Selected",
      rounds: { mcq: 48, ai: 47, hr: 50 },
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      position: "Product Manager",
      college: "UC Berkeley",
      score: 780,
      status: "HR Round",
      rounds: { mcq: 42, ai: 39, hr: 0 },
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@email.com",
      position: "UX Designer",
      college: "Harvard University",
      score: 810,
      status: "Selected",
      rounds: { mcq: 43, ai: 41, hr: 45 },
    },
    {
      id: 5,
      name: "Priya Patel",
      email: "priya.p@email.com",
      position: "Senior Frontend Developer",
      college: "IIT Delhi",
      score: 890,
      status: "Selected",
      rounds: { mcq: 47, ai: 44, hr: 47 },
    },
  ];

  const handleAIQuery = () => {
    // This would call an AI assistant in production
    console.log("AI Query:", query);
  };

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
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Candidate Dashboard</h1>
          <p className="text-muted-foreground">Manage and review all candidate applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{candidates.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Selected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {candidates.filter((c) => c.status === "Selected").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {candidates.filter((c) => c.status !== "Selected").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Query */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              AI Assistant Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ask AI: 'Show top 5 candidates with score > 700 from reputed colleges'"
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleAIQuery} className="bg-accent hover:bg-accent/90">
                Ask AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Candidates</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead className="text-center">MCQ</TableHead>
                  <TableHead className="text-center">AI Interview</TableHead>
                  <TableHead className="text-center">HR Round</TableHead>
                  <TableHead className="text-center">Total Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{candidate.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>{candidate.college}</TableCell>
                    <TableCell className="text-center">{candidate.rounds.mcq}/50</TableCell>
                    <TableCell className="text-center">{candidate.rounds.ai}/50</TableCell>
                    <TableCell className="text-center">
                      {candidate.rounds.hr > 0 ? `${candidate.rounds.hr}/50` : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-lg">{candidate.score}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          candidate.status === "Selected"
                            ? "bg-success text-success-foreground"
                            : "bg-accent text-accent-foreground"
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
