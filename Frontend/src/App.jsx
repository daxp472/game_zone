import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GameHome from './pages/GameHome';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import NewGames from './pages/NewGames';
import Popular from './pages/Popular';
import Tournaments from './pages/Tournaments';
import Multiplayer from './pages/Multiplayer';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AboutUs from './pages/AboutUs';
import HowToPlay from './pages/HowToPlay';
import ContactUs from './pages/ContactUs';
import GameDetails from './pages/GameDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-[#13141f] pt-16"> {/* Added pt-16 for fixed navbar */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={<PrivateRoute><GameHome /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
            <Route path="/category/:categoryId" element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
            <Route path="/game/:gameId" element={<PrivateRoute><GameDetails /></PrivateRoute>} />
            <Route path="/new-games" element={<PrivateRoute><NewGames /></PrivateRoute>} />
            <Route path="/popular" element={<PrivateRoute><Popular /></PrivateRoute>} />
            <Route path="/tournaments" element={<PrivateRoute><Tournaments /></PrivateRoute>} />
            <Route path="/multiplayer" element={<PrivateRoute><Multiplayer /></PrivateRoute>} />
            <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;