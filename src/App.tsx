import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/student/DashboardPage';
import ProfilePage from './pages/student/ProfilePage';
import LessonsPage from './pages/student/LessonsPage';
import GrammarPage from './pages/student/GrammarPage';
import VocabularyPage from './pages/student/VocabularyPage';
import KanjiPage from './pages/student/KanjiPage';
import PapersPage from './pages/student/PapersPage';
import PaperTakePage from './pages/student/PaperTakePage';
import DailyGamesPage from './pages/student/DailyGamesPage';
import LeaderboardPage from './pages/student/LeaderboardPage';
import ReferralsPage from './pages/student/ReferralsPage';
import ListeningPage from './pages/student/ListeningPage';
import ReadingPage from './pages/student/ReadingPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminContent from './pages/admin/AdminContent';
import AdminPapers from './pages/admin/AdminPapers';
import AdminGames from './pages/admin/AdminGames';
import AdminPopups from './pages/admin/AdminPopups';
import AdminSettings from './pages/admin/AdminSettings';
import WelcomeAnimation from './components/WelcomeAnimation';
import { useState, useEffect } from 'react';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, isLoading, isAdmin } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-jft-red text-xl">Loading...</div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && user.role === 'student') {
      const seen = localStorage.getItem(`jft_welcome_${user.id}`);
      if (!seen) {
        setShowWelcome(true);
      }
    }
  }, [user]);

  const handleWelcomeClose = () => {
    if (user) localStorage.setItem(`jft_welcome_${user.id}`, '1');
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeClose} />}
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
        <Route path="/lessons" element={<ProtectedRoute><Layout><LessonsPage /></Layout></ProtectedRoute>} />
        <Route path="/grammar" element={<ProtectedRoute><Layout><GrammarPage /></Layout></ProtectedRoute>} />
        <Route path="/vocabulary" element={<ProtectedRoute><Layout><VocabularyPage /></Layout></ProtectedRoute>} />
        <Route path="/kanji" element={<ProtectedRoute><Layout><KanjiPage /></Layout></ProtectedRoute>} />
        <Route path="/listening" element={<ProtectedRoute><Layout><ListeningPage /></Layout></ProtectedRoute>} />
        <Route path="/reading" element={<ProtectedRoute><Layout><ReadingPage /></Layout></ProtectedRoute>} />
        <Route path="/jft-papers" element={<ProtectedRoute><Layout><PapersPage category="jft-past" title="JFT Past Papers" /></Layout></ProtectedRoute>} />
        <Route path="/model-papers" element={<ProtectedRoute><Layout><PapersPage category="model" title="Model Papers" /></Layout></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><Layout><PapersPage category="practice" title="Practice Papers" /></Layout></ProtectedRoute>} />
        <Route path="/paper/:id" element={<ProtectedRoute><Layout><PaperTakePage /></Layout></ProtectedRoute>} />
        <Route path="/daily-games" element={<ProtectedRoute><Layout><DailyGamesPage /></Layout></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Layout><LeaderboardPage /></Layout></ProtectedRoute>} />
        <Route path="/referrals" element={<ProtectedRoute><Layout><ReferralsPage /></Layout></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="papers" element={<AdminPapers />} />
          <Route path="games" element={<AdminGames />} />
          <Route path="popups" element={<AdminPopups />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
