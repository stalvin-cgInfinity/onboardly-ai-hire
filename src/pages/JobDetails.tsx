import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, Clock, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  // Mock job data - in production, fetch from backend
  const job = {
    id: Number(id),
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120,000 - $180,000",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    description:
      "We're looking for an experienced Frontend Developer to join our growing engineering team. You'll be responsible for building and maintaining our web applications using modern technologies.",
    responsibilities: [
      "Develop and maintain web applications using React and TypeScript",
      "Collaborate with designers and backend engineers",
      "Write clean, maintainable, and well-tested code",
      "Participate in code reviews and technical discussions",
      "Mentor junior developers",
    ],
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with modern CSS frameworks",
      "Excellent problem-solving abilities",
      "Bachelor's degree in Computer Science or equivalent",
    ],
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeUploaded(true);
      // Simulate AI analysis
      setTimeout(() => {
        const eligible = Math.random() > 0.3; // 70% chance of eligibility for demo
        setIsEligible(eligible);
        if (eligible) {
          toast.success("Great news! You're eligible for this position. You can now proceed to the interview process.");
        } else {
          toast.error("Unfortunately, your profile doesn't match the requirements for this position at this time.");
        }
      }, 2000);
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
          <nav className="flex gap-6">
            <Link to="/jobs" className="text-sm font-medium text-primary hover:underline">
              Jobs
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-3xl">{job.title}</CardTitle>
                  <Badge variant="secondary" className="text-base">
                    {job.department}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About the Role</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} className="bg-accent text-accent-foreground text-base">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
                <CardDescription>Upload your resume to check eligibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      {resumeUploaded ? "Resume uploaded" : "Click to upload resume"}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
                  </label>
                </div>

                {isEligible !== null && (
                  <div
                    className={`p-4 rounded-lg ${
                      isEligible ? "bg-success/10 border border-success" : "bg-destructive/10 border border-destructive"
                    }`}
                  >
                    <p className={`text-sm font-medium ${isEligible ? "text-success" : "text-destructive"}`}>
                      {isEligible
                        ? "✓ You meet the requirements!"
                        : "✗ Profile doesn't match requirements"}
                    </p>
                  </div>
                )}

                {isEligible && (
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/interview/ai">Start Interview Process</Link>
                  </Button>
                )}

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salary Range</span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Job Type</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
