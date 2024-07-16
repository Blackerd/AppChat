import React, { useEffect, useRef } from "react";
import "./message.css";

const Message = ({ text, sender, isSentByUser, img }) => {
    const messageRef = useRef(null);

    useEffect(() => {
        // Cuộn tới phần tử tin nhắn cuối cùng khi component được render hoặc tin nhắn mới được thêm vào
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <div ref={messageRef} className={`messageContainer ${isSentByUser ? "sent" : "received"}`}>
            <div className={`messageBox ${isSentByUser ? "sentMessage" : "receivedMessage"}`}>
                {!isSentByUser && (
                    <div className="avatar">
                        <img src="img/p1.jpg" alt="avatar"/>
                    </div>
                )}
                <p className="messageText">{text}</p>
                {!isSentByUser && <p className="messageSender">{sender}</p>}
            </div>
        </div>
    );
};

export default Message;
