import React from "react";
import "./message.css";

const Message = ({ text, isSentByUser }) => {
  return (
      <div className={`message ${isSentByUser ? "user" : "friend"}`}>{text}</div>
  );
};
export default Message;