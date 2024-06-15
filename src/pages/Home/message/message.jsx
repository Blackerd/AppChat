import React from "react";
import "./message.css";

const Message = ({ text, isSentByUser, key }) => {
  return (
    <div className={`message ${isSentByUser ? "user" : "friend"}`}>{text}</div>
  );
};
export default Message;
