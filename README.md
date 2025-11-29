# 🧠 AI Technical Teacher - Frontend

A comprehensive AI-powered learning platform frontend built with React.js, designed to teach Cybersecurity, AI/ML, Deep Learning, Cloud technologies, and more.

## 🚀 Features

- **Responsive Dashboard** - Clean, modern interface with progress tracking
- **Video Lessons** - Interactive video player with subtitles support using Plyr
- **Interactive Labs** - Hands-on practical exercises with step-by-step guidance
- **Project-Based Learning** - Real-world projects with phase-based completion
- **Progress Tracking** - Comprehensive learning analytics and achievements
- **Dynamic Routing** - Smooth navigation between Dashboard → Lessons → Labs → Projects
- **Gamification** - Achievements, streaks, and certificates
- **AI Chatbot Integration** - Ready for AI assistant integration

## 🛠️ Tech Stack

- **React.js 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Plyr React** - Video player with subtitle support
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client (ready for API integration)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI_TEACHER1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Side navigation
│   ├── Layout.jsx      # Main layout wrapper
│   ├── VideoPlayer.jsx # Video player component
│   └── Quiz.jsx        # Interactive quiz component
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Lessons.jsx     # Lessons catalog
│   ├── LessonViewer.jsx # Individual lesson viewer
│   ├── Labs.jsx        # Labs catalog
│   ├── LabViewer.jsx   # Interactive lab environment
│   ├── Projects.jsx    # Projects catalog
│   ├── ProjectViewer.jsx # Project management
│   ├── Profile.jsx     # User profile
│   └── NotFound.jsx    # 404 page
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design
- **Responsive Design** - Works on all devices
- **Dark Mode Ready** - Prepared for theme switching
- **Accessibility** - ARIA labels and keyboard navigation
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages

## 📚 Key Components

### Dashboard
- Learning progress overview
- Quick stats and achievements
- Recent lessons and upcoming labs
- Learning streak tracking

### Lessons
- Video-based learning with subtitles
- Interactive quizzes
- Progress tracking
- Category filtering

### Labs
- Interactive hands-on exercises
- Step-by-step guidance
- Tool integration ready
- Completion tracking

### Projects
- Phase-based project management
- Real-world applications
- Technology stack integration
- Deliverable tracking

## 🔗 API Integration Ready

The frontend is prepared for backend integration with:
- REST API endpoints
- Authentication system
- Real-time updates
- File uploads
- Video streaming

## 🎯 Next Steps

1. **Backend Integration** - Connect to REST API
2. **Authentication** - Implement user login/signup
3. **Real-time Features** - WebSocket integration
4. **AI Chatbot** - Add AI assistant
5. **Content Management** - Dynamic content loading
6. **Analytics** - Detailed learning analytics
7. **Notifications** - Push notifications
8. **Offline Support** - PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of the AI Technical Teacher platform.

## 🚀 Demo

The application includes:
- Sample lessons with video content
- Interactive lab simulations
- Project templates
- User progress tracking
- Achievement system

Start the development server to explore all features!