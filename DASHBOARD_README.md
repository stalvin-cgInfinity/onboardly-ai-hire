# 🎨 SkillVista AI - Revamped Dashboard

A stunning, modern AI-powered hiring platform with a beautiful dark/light mode dashboard inspired by contemporary UI design.

## ✨ Features Implemented

### 🌓 Theme System
- **Dark/Light Mode Toggle**: Seamlessly switch between dark and light themes
- **System Preference Detection**: Automatically detects and respects user's system theme preference
- **Persistent Theme**: Theme preference saved in localStorage
- **Smooth Transitions**: All theme changes include smooth color transitions

### 🎯 Dashboard Layout
- **Modern Sidebar Navigation**: Clean, organized sidebar with menu sections
  - MENU: Dashboard, Open Hiring (with badge), Candidates, Interviews
  - Management: Talent Pool, Messages, Reports & Analytics
  - OTHERS: Settings, Help & Support
- **Top Header Bar**: 
  - Global search functionality
  - Export Report button
  - Theme toggle
  - Notification bell with indicator
  - Mail icon
  - User profile with avatar and email
- **Responsive Design**: Fully responsive across all screen sizes

### 📊 Dashboard Metrics
- **Statistics Cards**:
  - Total Applied: 1,428 (+33.15%)
  - Total Invitation: 367 (+14.93%)
  - Total Hiring: 94 (-5.49%)
  - Each with trend indicators and hover effects

- **Job Summary Chart**:
  - Visual bar representation
  - Posted (46%)
  - Closed (28%)
  - Not Posted (16%)
  - Expired (10%)

- **Employee Metrics Graph**:
  - Year-over-year comparison (2018-2024)
  - Highlighted peak values
  - Interactive bar chart

- **Employee Metrics Table**:
  - Owner information with avatars
  - Location tracking
  - Status badges
  - Employment type
  - Date stamps
  - Action dropdown menu

### 🎭 Animations & Effects
- **Fade-in animations** for page loads
- **Slide-up animations** for hero sections
- **Scale-in animations** for cards
- **Staggered animations** for sequential element reveals
- **Hover lift effect** on cards and buttons
- **Hover glow effect** for special elements
- **Shimmer effects** for loading states
- **Smooth transitions** throughout the UI

### 🎨 Design Features
- **Gradient backgrounds** with brand colors
- **Glass-morphism effects** for modern UI feel
- **Custom shadows** (soft, medium, large, glow)
- **Border accents** on metric cards
- **Rounded corners** throughout
- **Professional color palette**:
  - Primary: Blue (#0f4c81)
  - Accent: Cyan (#0BA5EC)
  - Success: Green
  - Destructive: Red
  - Muted tones for secondary content

### 🏠 Landing Page
- **Hero section** with gradient background
- **Feature cards** with icon highlights
- **Three-round interview process** section
- **Admin dashboard preview**
- **Call-to-action** sections
- **Animated elements** throughout
- **Theme toggle** in header

### 📱 Pages Included
1. **Dashboard** (`/admin`) - Main analytics dashboard
2. **Landing Page** (`/`) - Public-facing homepage
3. **Jobs** (`/jobs`) - Job listings
4. **Candidates** (`/admin/candidates`) - Candidate management
5. **Interviews** (`/admin/interviews`) - Interview scheduling
6. **Analytics** (`/admin/analytics`) - Reporting & metrics
7. **Settings** (`/admin/settings`) - Application settings
8. **Job Details** (`/jobs/:id`) - Individual job view
9. **MCQ Interview** (`/interview/mcq`) - MCQ assessment
10. **AI Interview** (`/interview/ai`) - AI video interview

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **shadcn/ui** component library
- **React Router** for navigation
- **Lucide React** for icons
- **TanStack Query** for data fetching
- **next-themes** for theme management

## 🎨 Color System

### Light Mode
- Background: Pure white
- Foreground: Dark gray
- Primary: Deep blue
- Accent: Bright cyan
- Cards: White with subtle shadows

### Dark Mode
- Background: Dark blue-gray (#0D1117)
- Foreground: Near white
- Primary: Bright cyan
- Accent: Deep blue
- Cards: Dark with elevated appearance

## 📐 Layout Structure

```
DashboardLayout
├── Sidebar (fixed left, 256px)
│   ├── Logo & Brand
│   ├── Menu Section
│   ├── Management Section
│   ├── Others Section
│   └── CTA Card
└── Main Content
    ├── Header (search, actions, profile)
    └── Page Content (scrollable)
```

## ✅ Animations Reference

- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up from bottom
- `animate-slide-down` - Slide down from top
- `animate-slide-in-left` - Slide in from left
- `animate-slide-in-right` - Slide in from right
- `animate-scale-in` - Scale up effect
- `animate-bounce-in` - Bounce scale effect
- `hover-lift` - Lift on hover
- `hover-glow` - Glow on hover
- `hover-scale` - Scale on hover
- `stagger-1` through `stagger-6` - Animation delays

## 🎯 Key Components

### ThemeProvider
Manages theme state and persistence across the app.

### ThemeToggle
Sun/Moon icon toggle button for switching themes.

### DashboardLayout
Reusable layout wrapper with sidebar and header.

### Dashboard
Main analytics page with metrics, charts, and tables.

## 📊 Metrics Display

All metric cards include:
- Icon with colored background
- Metric name
- Large number display
- Trend indicator (up/down arrow)
- Percentage change
- Comparison text
- View details link
- Hover lift effect

## 🎨 Design Principles

1. **Consistency**: Unified spacing, colors, and typography
2. **Accessibility**: ARIA labels, keyboard navigation, focus states
3. **Performance**: Optimized animations, lazy loading
4. **Responsiveness**: Mobile-first approach
5. **Modern**: Glass effects, gradients, smooth transitions
6. **Professional**: Clean, organized, business-ready

## 📝 Notes

- Theme preference persists across sessions
- All navigation links are functional
- Sidebar highlights active route
- Responsive from 320px to 4K displays
- Dark mode optimized for OLED screens
- Animations can be disabled for accessibility

## 🔮 Future Enhancements

- Real-time data integration
- Advanced filtering and sorting
- Export functionality
- Email notifications
- Calendar integration
- Video interview interface
- AI chat assistant
- Advanced analytics dashboards

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
