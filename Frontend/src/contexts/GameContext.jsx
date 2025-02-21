import { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [matchHistory, setMatchHistory] = useState([]);
    const [preRegisterData, setPreRegisterData] = useState([]);

    return (
        <GameContext.Provider value={{ matchHistory, setMatchHistory, preRegisterData, setPreRegisterData }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => useContext(GameContext);
