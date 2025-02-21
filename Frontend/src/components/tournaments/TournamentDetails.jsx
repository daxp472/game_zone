import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import RegisterTournament from './RegisterTournament';

function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState({
    id: 1,
    title: "Pro Gaming League",
    game: "Mini Militia",
    startDate: "2024-03-20",
    endDate: "2024-03-25",
    prizePool: "$5000",
    participants: "32/64",
    status: "Registering",
    description: "Join the ultimate gaming tournament and compete against the best players worldwide!",
    rules: [
      "Players must be at least 16 years old",
      "Valid game account required",
      "No cheating or exploitation allowed",
      "Be respectful to all participants"
    ],
    schedule: [
      { round: "Qualifiers", date: "March 20-21" },
      { round: "Quarter Finals", date: "March 22" },
      { round: "Semi Finals", date: "March 23" },
      { round: "Finals", date: "March 25" }
    ]
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-xl"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6">{tournament.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tournament Details</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-gray-400">Game:</span> {tournament.game}</p>
                  <p><span className="text-gray-400">Start Date:</span> {tournament.startDate}</p>
                  <p><span className="text-gray-400">End Date:</span> {tournament.endDate}</p>
                  <p><span className="text-gray-400">Prize Pool:</span> {tournament.prizePool}</p>
                  <p><span className="text-gray-400">Participants:</span> {tournament.participants}</p>
                  <p><span className="text-gray-400">Status:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                      tournament.status === 'Registering' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {tournament.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{tournament.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Rules</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {tournament.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Schedule</h3>
                <div className="space-y-2">
                  {tournament.schedule.map((event, index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span>{event.round}</span>
                      <span>{event.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <RegisterTournament tournamentId={tournament.id} />
        </div>
      </motion.div>
    </div>
  );
}

export default TournamentDetails;