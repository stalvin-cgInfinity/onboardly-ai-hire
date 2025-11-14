import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserPlus, 
  UserCheck,
  MoreHorizontal,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const employeeMetrics = [
  {
    id: 1,
    name: "Dmytro Zharko",
    email: "dmytrozharko@gmail.com",
    location: "New York, USA",
    status: "Complete",
    type: "Full-Time",
    date: "12 Aug 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmytro",
  },
  {
    id: 2,
    name: "Ralph Edwards",
    email: "ralphedwards12@gmail.com",
    location: "Cape Town, RSA",
    status: "Complete",
    type: "Part-Time",
    date: "20 Aug 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ralph",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    email: "eleanorpena77@gmail.com",
    location: "Dubai, UAE",
    status: "Complete",
    type: "Remote",
    date: "22 Aug 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor",
  },
]

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Dashboard Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Applied */}
          <Card className="hover-lift overflow-hidden relative border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                  View Details
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground mt-3">
                Total Applied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-4xl font-bold">1,428</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">+33.15%</span>
                  </div>
                  <span className="text-muted-foreground">+27 from last year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Invitation */}
          <Card className="hover-lift overflow-hidden relative border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <UserPlus className="h-5 w-5 text-accent" />
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                  View Details
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground mt-3">
                Total Invitation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-4xl font-bold">367</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">+14.93%</span>
                  </div>
                  <span className="text-muted-foreground">+15 from last year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Hiring */}
          <Card className="hover-lift overflow-hidden relative border-l-4 border-l-destructive">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <UserCheck className="h-5 w-5 text-destructive" />
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                  View Details
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground mt-3">
                Total Hiring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-4xl font-bold">94</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-destructive">
                    <TrendingDown className="h-4 w-4" />
                    <span className="font-semibold">-5.49%</span>
                  </div>
                  <span className="text-muted-foreground">-2 from last year</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Employee Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Summary */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Job Summary</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Visual Bars */}
                <div className="flex gap-2 h-32">
                  <div className="flex-1 bg-primary/20 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-[46%] bg-primary rounded-t-lg" />
                  </div>
                  <div className="flex-1 bg-success/20 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-[28%] bg-success rounded-t-lg" />
                  </div>
                  <div className="flex-1 bg-muted rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-[16%] bg-muted-foreground/30 rounded-t-lg" />
                  </div>
                  <div className="flex-1 bg-muted rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-[10%] bg-muted-foreground/20 rounded-t-lg" />
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-sm" />
                      <span className="text-sm text-foreground">Posted</span>
                    </div>
                    <span className="text-sm font-semibold">46%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-sm" />
                      <span className="text-sm text-foreground">Closed</span>
                    </div>
                    <span className="text-sm font-semibold">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-muted-foreground/30 rounded-sm" />
                      <span className="text-sm text-foreground">Not Posted</span>
                    </div>
                    <span className="text-sm font-semibold">16%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-muted-foreground/20 rounded-sm" />
                      <span className="text-sm text-foreground">Expired</span>
                    </div>
                    <span className="text-sm font-semibold">10%</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">+15 from last year</span>
                    <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80">
                      View Details
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Metrics Chart */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Employee Metrics</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-8 pb-4">
                  {[
                    { year: "2018", value: 15 },
                    { year: "2018", value: 22 },
                    { year: "2018", value: 18 },
                    { year: "2019", value: 28 },
                    { year: "2020", value: 85 },
                    { year: "2021", value: 32 },
                    { year: "2022", value: 12 },
                    { year: "2023", value: 38 },
                    { year: "2024", value: 15 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-muted rounded-t-lg relative" style={{ height: `${item.value}%` }}>
                        {item.value > 50 && (
                          <>
                            <div className="absolute inset-0 bg-primary/80 rounded-t-lg" />
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs font-semibold">
                              {item.value > 80 ? "237" : ""}
                            </div>
                          </>
                        )}
                        {item.value <= 50 && item.value > 0 && (
                          <div className="absolute inset-0 bg-muted-foreground/20 rounded-t-lg" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Metrics Table */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Employee Metrics</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" className="bg-success hover:bg-success/90">
                  See All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Owner</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeMetrics.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">{employee.location}</td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm">{employee.type}</td>
                      <td className="py-4 px-4 text-sm">{employee.date}</td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
