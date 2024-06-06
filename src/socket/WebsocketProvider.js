import { useState, useEffect } from "react";
import { WebsocketContext } from "./WebsocketContent";
import useWebSocket from "react-use-websocket";

function WebsocketProvider({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState([]);
  const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } =
    useWebSocket("ws://140.238.54.136:8080/chat/chat", {
      onOpen: () => {
        setIsReady(true);
        console.log("Websocket connected !!");
      },
    });
  useEffect(() => {
    setVal((prev) => lastJsonMessage);
  }, [lastJsonMessage]);

  const ret = [isReady, val, sendJsonMessage];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
}

export default WebsocketProvider;
