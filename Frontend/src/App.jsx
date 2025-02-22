import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Leaderboard from './pages/Leaderboard';

import TournamentPage from './pages/Tournament/TournamentPage';
import TournamentDetails from './components/tournaments/TournamentDetails';
import CreateTournament from './pages/Tournament/CreateRoomPage';
import RoomMangePage from './pages/Tournament/ManageRoomPage';

import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings';
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

import Game2048 from "./pages/Games/2048";
import GameHangman from "./pages/Games/hangman";
import GameXO from "./pages/Games/xo";
import GameFlappy from "./pages/Games/Flappy-bird"

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
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />


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

          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;