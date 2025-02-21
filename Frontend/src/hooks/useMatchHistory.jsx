import { useEffect, useState } from "react";
import axios from "axios";
import { useGameContext } from "../context/GameContext";
import { API_BASE_URL } from "../config";

const useMatchHistory = () => {
    const { matchHistory, setMatchHistory } = useGameContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/match-history`)
            .then(response => {
                setMatchHistory(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return { matchHistory, loading };
};

export default useMatchHistory;
