import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Video
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Search, Bell, Mail } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Open Hiring", href: "/jobs", icon: Briefcase, badge: "3" },
  { name: "Candidates", href: "/admin/candidates", icon: Users },
  { name: "Interviews", href: "/admin/interviews", icon: Video },
]

const managementLinks = [
  { name: "Talent Pool", href: "/admin/talent-pool", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Reports & Analytics", href: "/admin/analytics", icon: BarChart3 },
]

const otherLinks = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Help & Support", href: "/admin/support", icon: HelpCircle },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-2 h-16 px-6 border-b border-sidebar-border">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="font-bold text-lg text-sidebar-foreground">Onboardly</span>
        </div>

        {/* Menu Section */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-6">
            {/* MENU Section */}
            <div>
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                MENU
              </p>
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Management Section */}
            <div>
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Management
              </p>
              <ul className="space-y-1">
                {managementLinks.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Others Section */}
            <div>
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                OTHERS
              </p>
              <ul className="space-y-1">
                {otherLinks.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>

        {/* Try Onboardly CTA */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-gradient-hero rounded-xl p-4 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold mb-1">Try Onboardly AI</p>
              <p className="text-xs text-white/80 mb-3">
                Make smarter data-driven decisions with AI insights
              </p>
              <Button 
                size="sm" 
                className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Get An Analysis
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="h-full px-6 flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-background"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <span className="mr-2">📄</span>
                Export Report
              </Button>
              
              <ThemeToggle />

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>

              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3 pl-3 border-l">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Audrey Ley" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold">Audrey Ley</p>
                  <p className="text-xs text-muted-foreground">exemple@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
