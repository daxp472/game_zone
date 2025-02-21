import { useState } from "react";
import axios from "axios";
import { useGameContext } from "../context/GameContext";
import { API_BASE_URL } from "../config";

const usePreRegister = () => {
    const { setPreRegisterData } = useGameContext();
    const [loading, setLoading] = useState(false);

    const preRegister = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/pre-register`, userData);
            setPreRegisterData(response.data);
        } catch (error) {
            console.error("Pre-registration failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return { preRegister, loading };
};

export default usePreRegister;
