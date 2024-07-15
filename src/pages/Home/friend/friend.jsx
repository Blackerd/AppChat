import React from "react";
import "./friend.css";

const Friend = ({ img, name, lastMessage, lastMessageTime, unread, onClick, isCurrentUser }) => {
  const getLastMessageText = () => {
    if (!lastMessage) return "Chưa có tin nhắn";

    if (isCurrentUser) {
      return `Bạn: ${lastMessage}`;
    } else {
      return `Friend: ${lastMessage}`;
    }
  };

  return (
      <div className="friend" onClick={onClick}>
        <div className="friendItem">
          <div className="item">
            <div className="img">
              <img src={img} alt="avatar" />
            </div>
            <div className="name">
              <div className="info">
                <span>{name}</span>
                <span>{lastMessageTime}</span>
              </div>
              <div className="text">
                <span>{getLastMessageText()}</span>
                {unread > 0 && <div className="unread">{unread}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Friend;
