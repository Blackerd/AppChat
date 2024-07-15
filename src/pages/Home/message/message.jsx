import React from "react";
import "./message.css";

const Message = ({ text, sender, isSentByUser }) => {
    return (
        <div className={`messageContainer ${isSentByUser ? "sent" : "received"}`}>
            <div className={`messageBox ${isSentByUser ? "sentMessage" : "receivedMessage"}`}>
                <p className="messageText">{text}</p>
                {!isSentByUser && <p className="messageSender">{sender}</p>}
            </div>
        </div>
    );
};

export default Message;
