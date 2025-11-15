import { useState, useEffect } from "react";
import { fetchJobs, JobPosting } from "@/services/jobListService";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchJobs()
      .then((data) => {
        setJobs(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to fetch jobs");
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Search Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Browse through {jobs.length} open positions and kickstart your career
            </p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by job title or description..."
                className="pl-12 h-14 text-lg bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-lg">Loading jobs...</div>
          ) : error ? (
            <div className="text-center py-12 text-destructive">{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-muted-foreground">No jobs found.</div>
              ) : (
                filteredJobs.map((job) => (
                  <Card key={job.jobPostingId} className="hover:shadow-medium transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-2xl">{job.jobTitle}</CardTitle>
                        {/* No department in API, use placeholder */}
                        <Badge variant="secondary">General</Badge>
                      </div>
                      <CardDescription className="text-base">{job.jobDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* No skills in API, use placeholder */}
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-accent text-accent-foreground">.NET 9</Badge>
                        <Badge className="bg-accent text-accent-foreground">Azure</Badge>
                        <Badge className="bg-accent text-accent-foreground">Docker</Badge>
                      </div>
                      {/* No location/type/experience in API, use placeholder */}
                      <div className="space-y-2 text-sm text-muted-foreground">
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
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link to={`/jobs/${job.jobPostingId}`}>View Details & Apply</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
