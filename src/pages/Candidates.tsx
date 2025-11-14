import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function Candidates() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground">Manage and review all candidate applications</p>
          </div>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Candidate List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Candidate management interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
