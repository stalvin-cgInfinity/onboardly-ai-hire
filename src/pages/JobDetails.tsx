import { useState, useEffect } from "react";
import { fetchJobs, JobPosting } from "@/services/jobListService";
import { applyForJob } from "@/services/applicationService";
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
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    Resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchJobs()
      .then((jobs) => {
        const found = jobs.find((j) => String(j.jobPostingId) === String(id));
        setJob(found || null);
        setError(found ? null : "Job not found");
      })
      .catch(() => {
        setError("Failed to fetch job details");
        setJob(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'Resume' && files) {
      setForm((prev) => ({ ...prev, Resume: files[0] }));
      setResumeUploaded(!!files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Name || !form.Email || !form.Resume || !job) {
      toast.error('Please fill all fields and upload your resume.');
      return;
    }
    setSubmitting(true);
    const payload = {
      Name: form.Name,
      Email: form.Email,
      Position: job.jobTitle,
      JobPostingId: String(job.jobPostingId),
      Resume: form.Resume,
    };
    try {
      const response = await applyForJob(payload);
      if (response.ok) {
        setIsEligible(true);
        setSubmitted(true);
        toast.success("Great news! You're eligible for this position. You can now proceed to the interview process.");
      } else {
        setIsEligible(false);
        setSubmitted(true);
        toast.error("Unfortunately, your profile doesn't match the requirements for this position at this time.");
      }
    } catch (error) {
      setIsEligible(false);
      setSubmitted(true);
      toast.error("An error occurred while uploading your resume. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading job details...</div>;
  }
  if (error || !job) {
    return <div className="min-h-screen flex items-center justify-center text-destructive text-lg">{error || 'Job not found.'}</div>;
  }

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
                  <CardTitle className="text-3xl">{job.jobTitle}</CardTitle>
                  <Badge variant="secondary" className="text-base">
                    {/* No department in API, use placeholder */}
                    General
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Full-time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5+ years experience</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About the Role</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{job.jobDescription}</p>
                </div>

                {/* No responsibilities, requirements, or skills in API. Optionally add placeholder or omit. */}
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

                {!submitted && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-left text-sm font-medium text-foreground">Full Name</label>
                      <input
                        id="name"
                        name="Name"
                        type="text"
                        value={form.Name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-left text-sm font-medium text-foreground">Email</label>
                      <input
                        id="email"
                        name="Email"
                        type="email"
                        value={form.Email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="resume-upload" className="block text-left text-sm font-medium text-foreground">Resume</label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleInputChange}
                          name="Resume"
                          className="hidden"
                          id="resume-upload"
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium mb-1">
                            {resumeUploaded && form.Resume ? `File: ${form.Resume.name}` : "Click to upload resume"}
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
                        </label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={submitting || !form.Name || !form.Email || !form.Resume}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                )}

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
                    <Link to="/interview/mcq">Start Interview Process</Link>
                  </Button>
                )}

                {/* No salary or type in API. Optionally add placeholder or omit. */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
