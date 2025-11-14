import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export default function Interviews() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Video className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Interviews</h1>
            <p className="text-muted-foreground">Schedule and manage candidate interviews</p>
          </div>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Interview Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interview management interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
