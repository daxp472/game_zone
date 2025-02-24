import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameNavbar from '../../components/GameNavbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { API_BASE_URLS } from '../../config';  // Importing API base URLs
import { useAuth } from '../../contexts/AuthContext'; // Importing Auth context

// Reusable Input Component
const InputField = ({ label, type, value, onChange, name }) => (
    <div className="mb-4">
        <label className="block mb-2">{label}</label>
        <input
            className="w-full p-2 bg-gray-800 text-white rounded-md"
            type={type}
            value={value}
            onChange={onChange}
            name={name}
        />
    </div>
);

function CreateRoomPage() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Getting the user from Auth context
    const [roomSettings, setRoomSettings] = useState({
        roomName: '',
        maxPlayers: 10,
        type: 'public',
        password: '',
        startTime: new Date().toISOString(),
    });
    const [roomCardCount, setRoomCardCount] = useState(0);
    const [roomExpiryTimer, setRoomExpiryTimer] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [isRoomCreated, setIsRoomCreated] = useState(false);

    useEffect(() => {
        const fetchRoomCardCount = async () => {
            try {
                const response = await axios.get(`${API_BASE_URLS.ROOM}cards`, {
                    withCredentials: true,
                    params: { username: user.username } // Sending the username
                });
                setRoomCardCount(response.data.roomCardsCount);
            } catch (error) {
                if (error.response) {
                    // Backend error
                    console.error('Backend error fetching room card count:', error.response.data.message);
                } else if (error.request) {
                    // No response received
                    console.error('No response received when fetching room card count:', error.request);
                } else {
                    // Client-side error
                    console.error('Client-side error fetching room card count:', error.message);
                }
            }
        };

        fetchRoomCardCount();
    }, [user.username]);

    const handleInputChange = (e) => {
        setRoomSettings({ ...roomSettings, [e.target.name]: e.target.value });
    };

    const startRoomExpiryTimer = (expiresAt) => {
        const expiryTime = new Date(expiresAt).getTime();
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeLeft = expiryTime - currentTime;

            if (timeLeft <= 0) {
                clearInterval(interval);
                setRoomExpiryTimer('Room expired');
            } else {
                const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const seconds = Math.floor((timeLeft / 1000) % 60);
                setRoomExpiryTimer(`${hours}h ${minutes}m ${seconds}s remaining`);
            }
        }, 1000);
    };

    const handleCreateRoom = async () => {
        try {
            const response = await axios.post(`${API_BASE_URLS.ROOM}/create`, {
                roomName: roomSettings.roomName,
                maxPlayers: roomSettings.maxPlayers,
                type: roomSettings.type,
                password: roomSettings.password,
                startTime: roomSettings.startTime,
                username: user.username // Sending the username
            }, {
                withCredentials: true
            });

            const data = response.data;
            if (response.status === 201) {
                setRoomCardCount(data.roomCardsCount);
                startRoomExpiryTimer(data.expiresAt);
                setRoomId(data.roomId);
                setIsRoomCreated(true);
                navigate(`/tournaments/manage-room/${data.roomId}`);
            } else {
                alert('Failed to create room: ' + data.message);
                console.error('Backend error creating room:', data.message);
            }
        } catch (error) {
            if (error.response) {
                // Backend error
                console.error('Backend error creating room:', error.response.data.message);
            } else if (error.request) {
                // No response received
                console.error('No response received when creating room:', error.request);
            } else {
                // Client-side error
                console.error('Client-side error creating room:', error.message);
            }
        }
    };

    const handleJoinRoom = async () => {
        try {
            const response = await axios.post(`${API_BASE_URLS.ROOM}/join/${roomId}`, {
                password: roomSettings.password,
                username: user.username // Sending the username
            }, {
                withCredentials: true
            });

            const data = response.data;
            if (response.status === 200) {
                alert('Joined room successfully');
            } else {
                alert('Failed to join room: ' + data.message);
                console.error('Backend error joining room:', data.message);
            }
        } catch (error) {
            if (error.response) {
                // Backend error
                console.error('Backend error joining room:', error.response.data.message);
            } else if (error.request) {
                // No response received
                console.error('No response received when joining room:', error.request);
            } else {
                // Client-side error
                console.error('Client-side error joining room:', error.message);
            }
        }
    };
    console.log(user.username);

    return (
        <div className="min-h-screen bg-[#13141f] flex flex-col text-white">
            <GameNavbar />
            <div className='flex flex-col items-center ml-20'>
                <div className="flex justify-between w-full m-5 p-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Menu
                    </button>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 rounded-md hover:from-purple-700 hover:to-pink-700">
                        Available Room Card Count: {roomCardCount}
                    </button>
                </div>
                <h1 className="text-3xl font-bold my-4">Create Room</h1>
                <div className="bg-[#1a1b26] p-6 rounded-lg w-96 shadow-md">
                    <InputField label="Room Name" type="text" value={roomSettings.roomName} onChange={handleInputChange} name="roomName" />
                    <InputField label="Max Players" type="number" value={roomSettings.maxPlayers} onChange={handleInputChange} name="maxPlayers" />
                    <div className="mb-4">
                        <label className="block mb-2">Type</label>
                        <select className="w-full p-2 bg-gray-800 text-white rounded-md" name="type" value={roomSettings.type} onChange={handleInputChange}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    {roomSettings.type === 'private' && (
                        <InputField label="Password" type="password" value={roomSettings.password} onChange={handleInputChange} name="password" />
                    )}
                    <div className="flex justify-between mt-4">
                        <button onClick={handleCreateRoom} className="bg-green-600 w-1/2 py-2 rounded-md hover:bg-green-700">
                            Create Room
                        </button>
                        {isRoomCreated && (
                            <button onClick={handleJoinRoom} className="bg-blue-500 w-1/2 py-2 rounded-md hover:bg-blue-600">
                                Join Room
                            </button>
                        )}
                    </div>
                    {roomExpiryTimer && (
                        <div className="mt-4 text-red-500">
                            {roomExpiryTimer}
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-8 mb-8">
                    <p>Already have a room? <span className="text-blue-500 hover:text-blue-600" onClick={() => navigate('/tournaments/join-room')}>Join a Room</span></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateRoomPage;
