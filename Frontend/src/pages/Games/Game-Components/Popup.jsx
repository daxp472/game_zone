import React from 'react';
import { motion } from 'framer-motion';

const Popup = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center"
            >
                {children}
                <button 
                    className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all"
                    onClick={onClose}
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default Popup;
