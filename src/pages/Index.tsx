import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Brain, CheckCircle, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Onboardly
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Jobs
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              AI-Powered Talent Hiring,
              <br />
              Simplified
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 animate-slide-up stagger-1">
              Transform your recruitment process with intelligent screening, automated interviews, and data-driven candidate selection
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up stagger-2">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover-lift" asChild>
                <Link to="/jobs">
                  Browse Open Positions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover-lift" asChild>
                <Link to="/admin">Admin Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform streamlines the entire hiring process from application to selection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center shadow-medium hover-lift transition-all animate-scale-in stagger-1">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Smart Resume Screening</CardTitle>
                <CardDescription>
                  Upload your resume and our AI instantly analyzes if you're a match for the position
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center shadow-medium hover-lift transition-all animate-scale-in stagger-2">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Multi-Round Assessment</CardTitle>
                <CardDescription>
                  AI video interviews and HR rounds - all automated and efficient
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center shadow-medium hover-lift transition-all animate-scale-in stagger-3">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-hero rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Data-Driven Selection</CardTitle>
                <CardDescription>
                  Comprehensive scoring system helps HR make informed decisions quickly
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interview Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Two-Round Interview Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive evaluation ensures we find the best talent
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="shadow-medium hover-lift animate-slide-in-left stagger-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <CardTitle>AI Video Interview</CardTitle>
                    <CardDescription>Face-to-face interview with our AI assistant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Technical and behavioral questions</li>
                  <li>• 20-30 minutes duration</li>
                  <li>• Real-time response analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium hover-lift animate-slide-in-left stagger-2">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <CardTitle>HR Round</CardTitle>
                    <CardDescription>Final evaluation with human resources</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cultural fit assessment</li>
                  <li>• Salary discussion</li>
                  <li>• Final selection decision</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Powerful Admin Dashboard</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  HR teams get comprehensive insights and AI-powered candidate analysis
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">AI Assistant Queries</h3>
                      <p className="text-muted-foreground">
                        Ask questions like "Show top 5 candidates with score &gt; 700 from reputed colleges"
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Comprehensive Scoring</h3>
                      <p className="text-muted-foreground">
                        View detailed breakdowns of MCQ, AI interview, and HR round scores
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Export & Analytics</h3>
                      <p className="text-muted-foreground">
                        Export candidate data and track hiring metrics
                      </p>
                    </div>
                  </li>
                </ul>
                <Button size="lg" className="mt-8 hover-lift" asChild>
                  <Link to="/admin">
                    Explore Admin Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="bg-gradient-card rounded-2xl shadow-large p-8 border hover-lift">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Candidates</span>
                    <span className="text-3xl font-bold">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Selected</span>
                    <span className="text-3xl font-bold text-success">43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Score</span>
                    <span className="text-3xl font-bold text-accent">785</span>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Recent Query</p>
                    <p className="text-sm font-medium">
                      "Show candidates with &gt;800 score from IIT/MIT"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up stagger-1">
            Start your journey with Onboardly today and experience the future of hiring
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover-lift animate-scale-in stagger-2" asChild>
            <Link to="/jobs">
              View All Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Onboardly. AI-Powered Talent Hiring System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
