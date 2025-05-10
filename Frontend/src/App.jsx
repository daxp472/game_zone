import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GameHome from './pages/GameHome';
import Categories from './pages/Categories';
// import CategoryPage from './pages/category/CategoryPage';
import NewGames from './pages/NewGames';
import Popular from './pages/Popular';
import Tournaments from './pages/Tournaments';
import Multiplayer from './pages/Multiplayer';


import Leaderboard from './pages/Main-Sidebar/Leaderboard';
import Store from './pages/Main-Sidebar/Store';
import DailyChallenges from './pages/Main-Sidebar/DailyChallenges';
import Friends from './pages/Main-Sidebar/Friends';
import Support from './pages/Main-Sidebar/Support';
import Achievements from './pages/Main-Sidebar/Achievements';
import SiteSettings from './pages/Main-Sidebar/SiteSettings';


import TournamentPage from './pages/Tournament/TournamentPage';
import TournamentDetails from './components/tournaments/TournamentDetails';
import CreateTournament from './pages/Tournament/CreateRoomPage';
import RoomMangePage from './pages/Tournament/ManageRoomPage';

import Profile from './pages/Profile/Profile';
import Subscription from './pages/Profile/Subscription';
import ReferAndEarn from './pages/Profile/ReferAndEarn';
import Notifications from './pages/Profile/Notifications';
import GlobalPerformance from './pages/Profile/GlobalPerformance';
import Settings1 from './pages/Profile/Settings';
import ForgotPassword from './pages/Profile/UpdatePassword';
import LevelPath from '../src/components/Profile/LevelPath';
// import Settings from './pages/Settings';


import AboutUs from './pages/AboutUs';
import HowToPlay from './pages/HowToPlay';
import ContactUs from './pages/ContactUs';
import GameDetails from './pages/GameDetails';
import PrivateRoute from './components/PrivateRoute';

import Racing from "./pages/category/Racing";
import Action from "./pages/category/Action";
import Puzzle from "./pages/category/Puzzle";
import Sports from "./pages/category/Sports";
import Strategy from "./pages/category/Strategy";
import Adventure from "./pages/category/Adventure";

import Game2048 from "./pages/Games/game2048";
import GameHangman from "./pages/Games/hangman";
import GameXO from "./pages/Games/xo";
import GameFlappy from "./pages/Games/Flappy-bird"
import GameAngryBird from "./pages/Games/Angry-Birds";

import Layout from "./components/Layout";
import MobileNavigation from './components/MobileNavigation';
import Toast from './components/Toast';
import MobileDownload from './pages/MobileDownload';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import CookiePolicy from './pages/Legal/CookiePolicy';


function App() {

  const [showWelcome, setShowWelcome] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Show welcome animation on login/signup
    const isNewLogin = sessionStorage.getItem('newLogin');
    if (isNewLogin) {
      setShowWelcome(true);
      sessionStorage.removeItem('newLogin');
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };


  return (
    <Router>
      <ErrorBoundary>
        <Layout>
        {showWelcome && (
          <WelcomeLoader onComplete={() => setShowWelcome(false)} />
        )}
        
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
          <div className="min-h-screen bg-[#13141f]"> {/* Added pt-16 for fixed navbar */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/how-to-play" element={<HowToPlay />} />
              <Route path="/contact" element={<ContactUs />} />


              {/* Legal Pages */}
              <Route path="/download" element={<MobileDownload />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />


              {/* Protected Routes */}
              <Route path="/home" element={<PrivateRoute><GameHome /></PrivateRoute>} />
              <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
              {/* <Route path="/category/:category" element={<CategoryPage />} /> */}
              <Route path="/game/:gameId" element={<PrivateRoute><GameDetails /></PrivateRoute>} />
              <Route path="/new-games" element={<PrivateRoute><NewGames /></PrivateRoute>} />
              <Route path="/popular" element={<PrivateRoute><Popular /></PrivateRoute>} />

              {/* Tournaments */}
              {/* <Route path="/tournaments" element={<PrivateRoute><Tournaments /></PrivateRoute>} /> */}
              <Route path="/tournaments" element={<PrivateRoute><TournamentPage /></PrivateRoute>} />
              <Route path="/tournament/:id" element={<PrivateRoute><TournamentDetails /></PrivateRoute>} />
              <Route path="/tournaments/create-room" element={<PrivateRoute><CreateTournament /></PrivateRoute>} />
              <Route path="/tournaments/manage-room/:roomId" element={<PrivateRoute><RoomMangePage /></PrivateRoute>} />


              <Route path="/multiplayer" element={<PrivateRoute><Multiplayer /></PrivateRoute>} />



              <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
              <Route path="/store" element={<PrivateRoute><Store /></PrivateRoute>} />
              <Route path="/challenges" element={<PrivateRoute><DailyChallenges /></PrivateRoute>} />
              <Route path="/friends" element={<PrivateRoute><Friends /></PrivateRoute>} />
              <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><SiteSettings /></PrivateRoute>} />
              <Route path='/achievements' element={<PrivateRoute><Achievements /></PrivateRoute>} />




              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/profile/subscription" element={<PrivateRoute><Subscription /></PrivateRoute>} />
              <Route path="/profile/referral" element={<PrivateRoute><ReferAndEarn /></PrivateRoute>} />
              <Route path="/profile/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              <Route path="/profile/global-performance" element={<PrivateRoute><GlobalPerformance /></PrivateRoute>} />
              <Route path="/profile/settings" element={<PrivateRoute><Settings1 /></PrivateRoute>} />
              <Route path="/profile/:username/settings/forgot-password" element={<PrivateRoute><ForgotPassword /></PrivateRoute>} />
              <Route path="/profile/level" element={<PrivateRoute><LevelPath /></PrivateRoute>} />
              {/* <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} /> */}


              {/* Category Pages */}
              <Route path="/category/racing" element={<Racing />} />
              <Route path="/category/action" element={<Action />} />
              <Route path="/category/puzzle" element={<Puzzle />} />
              <Route path="/category/sports" element={<Sports />} />
              <Route path="/category/strategy" element={<Strategy />} />
              <Route path="/category/adventure" element={<Adventure />} />


              {/* Game Pages */}
              <Route path="/game/game-0" element={<PrivateRoute><Game2048 /></PrivateRoute>} />
              <Route path="/game/game-1" element={<PrivateRoute><GameHangman /></PrivateRoute>} />
              <Route path="/game/game-2" element={<PrivateRoute><GameXO /></PrivateRoute>} />
              <Route path="/game/game-3" element={<PrivateRoute><GameFlappy /></PrivateRoute>} />
              <Route path="/game/game-4" element={<PrivateRoute><GameAngryBird /></PrivateRoute>} />


              {/* Fallback Route */}
              {/* <Route path="/error" element={<ErrorBoundary/>} /> */}

            </Routes>
            <MobileNavigation />
          </div>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;