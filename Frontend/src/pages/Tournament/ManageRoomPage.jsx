import { useParams, useNavigate } from 'react-router-dom';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';

function ManageRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const users = ['Player1', 'Player2', 'Player3']; // Fake data, replace with API data

  const handleStartMatch = () => {
    alert('Match Started!'); // Replace with API call
    navigate('/tournaments'); // Redirect to tournaments after start
  };

  const handleKickUser = (user) => {
    alert(`${user} has been kicked!`); // Replace with API call
  };

  return (
    <div className="min-h-screen bg-[#13141f] flex flex-col items-center text-white">
      <GameNavbar />
      <h1 className="text-3xl font-bold mt-8">Manage Room - {roomId}</h1>
      <div className="bg-[#1a1b26] p-6 rounded-lg w-96 mt-6">
        <h2 className="text-xl font-bold mb-4">Joined Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user} className="flex justify-between mb-2">
              {user}
              <button onClick={() => handleKickUser(user)} className="text-red-500">
                Kick
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleStartMatch} className="bg-blue-600 w-full py-2 mt-4 rounded-md hover:bg-blue-700">
          Start Match
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ManageRoomPage;
