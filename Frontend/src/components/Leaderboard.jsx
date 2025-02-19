import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'https://gamezone-leaderboard.onrender.com/api/leaderboard';

const LeaderboardDisplay = React.forwardRef(({ gameId }, ref) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${gameId}`);
      setLeaderboard(response.data.scores || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [gameId]);

  React.useImperativeHandle(ref, () => ({ fetchLeaderboard }));

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {leaderboard.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{entry.username}</td>
                <td className="px-4 py-2 font-bold text-blue-600">{entry.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center py-2">No scores yet. Be the first!</p>
      )}
    </div>
  );
});

const LeaderboardSection = ({ gameId, username, currentScore }) => {
  const [lastSubmittedScore, setLastSubmittedScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const timeoutRef = useRef(null);
  const leaderboardRef = useRef();

  // Fetch highest score from DB
  useEffect(() => {
    const fetchHighestScore = async () => {
      try {
        const response = await axios.get(`${API_URL}/${gameId}`);
        if (response.data.scores.length > 0) {
          setHighestScore(response.data.scores[0].score);
        }
      } catch (err) {
        console.error("Failed to fetch highest score", err);
      }
    };
    fetchHighestScore();
  }, [gameId]);

  const submitScore = async () => {
    try {
      const response = await axios.get(`${API_URL}/${gameId}`);
      const userScore = response.data.scores.find(s => s.username === username)?.score || 0;

      if (currentScore > lastSubmittedScore && currentScore > userScore) {
        await axios.post(`${API_URL}/${gameId}`, { username, score: currentScore });
        setLastSubmittedScore(currentScore);
        setSubmissionStatus({ type: 'success', message: 'New high score submitted!' });
        leaderboardRef.current?.fetchLeaderboard();
      }
    } catch (err) {
      console.error("Error submitting score:", err);
      setSubmissionStatus({ type: 'error', message: 'Server error. Try again later.' });
    }
  };

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(submitScore, 5000);
  }, [currentScore]);

  return (
    <div className="space-y-6">
      {submissionStatus && (
        <div className={`text-center p-2 rounded ${submissionStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submissionStatus.message}
        </div>
      )}
      <LeaderboardDisplay ref={leaderboardRef} gameId={gameId} />
      {currentScore > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-lg">Your current score: <span className="font-bold text-blue-600">{currentScore.toLocaleString()}</span></p>
          {lastSubmittedScore === currentScore && <p className="text-sm text-gray-500 mt-1">Score submitted to leaderboard</p>}
        </div>
      )}
    </div>
  );
};

export default LeaderboardSection;