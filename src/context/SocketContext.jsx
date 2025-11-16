import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

const SocketContext = createContext(null);

export const SocketProvider = ({ storeId, children }) => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (!storeId) return;

    const socket = new SockJS("https://antone-unupbraiding-stephine.ngrok-free.dev/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      client.subscribe(`/topic/reservations/${storeId}`, (message) => {
        try {
          const payload = JSON.parse(message.body);
          toast.info(`🔔 Yeni randevu: ${payload.userName}`);
        } catch (err) {
          console.error("Socket mesaj parse hatası", err);
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, [storeId]);

  return <SocketContext.Provider value={{ stompClient }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
