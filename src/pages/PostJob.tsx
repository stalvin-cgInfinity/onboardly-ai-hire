import { useState } from "react";
import { postJob } from "@/services/jobService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const PostJob = () => {
  const [jobForm, setJobForm] = useState({
    JobTitle: "",
    JobDescription: "",
  });
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();

  const handleJobInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.JobTitle || !jobForm.JobDescription) {
      toast.error("Please fill all job fields.");
      return;
    }
    setPosting(true);
    try {
      const response = await postJob(jobForm);
      if (response.ok) {
        toast.success("Job posted successfully!");
        setTimeout(() => navigate("/admin"), 1200);
      } else {
        toast.error("Failed to post job.");
      }
    } catch (err) {
      toast.error("Error posting job.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-xl shadow-lg border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl text-center mb-2">Post a New Job</CardTitle>
            <p className="text-muted-foreground text-center">Fill in the details below to create a new job posting</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostJob} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="job-title" className="block text-left text-sm font-medium text-foreground">Job Title</label>
                <Input
                  id="job-title"
                  name="JobTitle"
                  type="text"
                  value={jobForm.JobTitle}
                  onChange={handleJobInputChange}
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="job-description" className="block text-left text-sm font-medium text-foreground">Job Description</label>
                <textarea
                  id="job-description"
                  name="JobDescription"
                  value={jobForm.JobDescription}
                  onChange={handleJobInputChange}
                  placeholder="Describe the responsibilities, requirements, and perks..."
                  required
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] resize-vertical"
                />
              </div>
              <Button type="submit" className="w-full text-lg" size="lg" disabled={posting}>
                {posting ? "Posting..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostJob;
