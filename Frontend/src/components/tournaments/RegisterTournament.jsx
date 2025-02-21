import { useState } from 'react';
import { motion } from 'framer-motion';

function RegisterTournament({ tournamentId }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRegistrationStatus('success');
    } catch (error) {
      setRegistrationStatus('error');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-700 pt-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Tournament Registration</h3>
        
        {registrationStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-600 text-white p-4 rounded-lg mb-4"
          >
            Successfully registered for the tournament!
          </motion.div>
        ) : registrationStatus === 'error' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600 text-white p-4 rounded-lg mb-4"
          >
            Failed to register. Please try again.
          </motion.div>
        ) : null}
        
        <motion.button
          onClick={handleRegister}
          disabled={isRegistering || registrationStatus === 'success'}
          className={`w-full md:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg font-medium
            ${(isRegistering || registrationStatus === 'success') ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'} 
            transition-all duration-200`}
          whileTap={{ scale: 0.95 }}
        >
          {isRegistering ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Registering...
            </div>
          ) : registrationStatus === 'success' ? (
            'Registered'
          ) : (
            'Register Now'
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default RegisterTournament;