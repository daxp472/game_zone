import { createContext, useState, useEffect } from "react";
import { API_BASE_URLS } from "../config"; // ✅ Config se API URLs lena
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URLS.CHAT}/messages`);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
      setLoading(false);
    };

    loadMessages();
  }, []);

  const sendChatMessage = async (message) => {
    try {
      const { data } = await axios.post(`${API_BASE_URLS.CHAT}/send`, { message });
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendChatMessage, loading }}>
      {children}
    </ChatContext.Provider>
  );
};
