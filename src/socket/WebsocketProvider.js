import { useState, useRef, useEffect } from "react";
import { WebsocketContext } from "./WebsocketContent";
import useWebSocket from "react-use-websocket";
// import { io } from "socket.io-client";

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

  // const [isReady, setIsReady] = useState(false);
  // const [val, setVal] = useState(null);

  // const ws = useRef(null);

  // useEffect(() => {
  //   const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

  //   socket.onopen = () => setIsReady(true);
  //   socket.onclose = () => setIsReady(false);
  //   socket.onmessage = (event) => setVal(event.data);

  //   ws.current = socket;

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // const ret = [isReady, val, ws.current?.send.bind(ws.current)];
  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
}

export default WebsocketProvider;

// function WebsocketProvider({ children }) {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Kết nối tới server WebSocket

//     setSocket(newSocket);

//     console.log(messages);
//     // Nhận message từ server
//     newSocket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, [setSocket]);

//   const sendMessage = () => {
//     if (socket) {
//       socket.emit("message", "Hello from client!");
//     }
//   };
//   sendMessage();
//   const ret = [messages];

//   return (
//     <WebsocketContext.Provider value={ret}>
//       {children}
//     </WebsocketContext.Provider>
//   );
// }
// export default WebsocketProvider;
