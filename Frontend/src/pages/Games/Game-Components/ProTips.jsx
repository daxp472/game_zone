import React from 'react';
import { Lightbulb } from 'lucide-react';

const ProTips = () => {
    const tips = [
        "Tap lightly for better control!",
        "Avoid sharp drops, maintain a steady rhythm.",
        "Time your taps carefully near obstacles.",
        "Focus on the gap ahead, not the bird.",
        "Practice makes perfect—keep going!"
    ];

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mt-5 max-w-md mx-auto">
            <h2 className="text-xl font-bold flex justify-center items-center gap-2 mb-8">
                <Lightbulb className="text-yellow-300" /> Pro Tips
            </h2>
            <ul className="list-disc list-inside space-y-3 pl-5">
                {tips.map((tip, index) => (
                    <li key={index} className="opacity-90 hover:opacity-100 transition-opacity text-left">
                        {tip}
                    </li>
                ))}
            </ul>
            <div className="mt-4"></div> {/* Extra space below tips */}
        </div>
    );
};

export default ProTips;
