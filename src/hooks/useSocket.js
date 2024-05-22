import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
function useSocket() {
  const [socketUrl, setSocketUrl] = useState(`wss://ws.postman-echo.com/raw`);
  const socket = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection established."),
    //Will attempt to reconnect on all close events, such as server shutting down
  });
  const [lastJsonMessage, setLastJsonMessage] = useState(
    socket.lastJsonMessage
  );

  const [all, setAll] = useState([]);

  useEffect(() => {
    setLastJsonMessage((prev) => socket.lastJsonMessage);
    setAll((prev) => [...prev, socket.lastJsonMessage]);
  }, [socket.lastJsonMessage]);

  return { sender: socket.sendJsonMessage, lastJsonMessage, all };
}
export default useSocket;
