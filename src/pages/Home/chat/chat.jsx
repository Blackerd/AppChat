import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Message from "../message/message";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import { SEND_CHAT, GET_PEOPLE_CHAT_MES } from "../../../api/action";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../../../store/userSlice";

const Chat = (props) => {
  const [isReady, response, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const [friend, setFriend] = useState(
      friends.find((item) => item.name === props.friend.name)
  );

  const [messages, setMessages] = useState([]); // State để lưu trữ danh sách tin nhắn
  const [newMessage, setNewMessage] = useState(""); // State để lưu trữ tin nhắn mới nhập vào
  const [uniqueMessages, setUniqueMessages] = useState({}); // State để loại bỏ tin nhắn trùng lặp

  useEffect(() => {
    setMessages(friend.listmessage); // Cập nhật danh sách tin nhắn khi người dùng thay đổi người nhận tin nhắn
  }, [friend]);

  useEffect(() => {
    // Cập nhật thông tin người nhận tin nhắn khi người dùng thay đổi
    setFriend(friends.find((item) => item.name === props.friend.name));
  }, [props.friend]);

  useEffect(() => {
    // Xử lý phản hồi từ server khi có tin nhắn mới được gửi hoặc nhận
    if (response) {
      if (response.status === "success") {
        switch (response.event) {
          case "SEND_CHAT":
            handleReceivedMessage(response.data); // Xử lý khi có tin nhắn được gửi đi
            break;
          case "GET_PEOPLE_CHAT_MES":
            handleReceivedPeopleChat(response.data); // Xử lý khi nhận tin nhắn từ người dùng khác
            break;
          default:
            break;
        }
      }
    }
  }, [response]);

  // Hàm xử lý khi nhận được tin nhắn từ người dùng khác
  const handleReceivedPeopleChat = (data) => {
    const listMessages = data.reverse().map((item) => {
      const isSentByUser = item.name === infor.user.infor.email;
      return { text: item.mes, isSentByUser };
    });

    listMessages.forEach((message) => {
      if (!uniqueMessages[message.text]) {
        setUniqueMessages((prev) => ({
          ...prev,
          [message.text]: message,
        }));
      }
    });
  };

  // Hàm xử lý khi nhận được tin nhắn từ server
  const handleReceivedMessage = (data) => {
    const { mes, name } = data;
    const isSentByUser = name === infor.user.infor.email;
    const newMessage = { text: mes, isSentByUser };

    dispatch(saveMessage({ name: friend.name, mess: newMessage }));

    if (!uniqueMessages[mes]) {
      setUniqueMessages((prev) => ({
        ...prev,
        [mes]: newMessage,
      }));
    }
  };

  // Hàm xử lý khi người dùng gửi tin nhắn
  const handleSendMessages = () => {
    if (newMessage.trim()) {
      // Gửi tin nhắn qua WebSocket
      const sendChatAction = SEND_CHAT(props.friend.name, newMessage);
      sender(sendChatAction);

      // Hiển thị tin nhắn người dùng vừa gửi lên màn hình
      const isSentByUser = true;
      const newMessageObj = { text: newMessage, isSentByUser };

      // Lưu tin nhắn vào Redux
      dispatch(saveMessage({ name: friend.name, mess: newMessageObj }));

      // Kiểm tra xem tin nhắn đã được gửi chưa
      if (!uniqueMessages[newMessage]) {
        setUniqueMessages((prev) => ({
          ...prev,
          [newMessage]: newMessageObj,
        }));
        setNewMessage("");
      }
    }
  };

  // Sử dụng useEffect để cập nhật messages từ uniqueMessages
  useEffect(() => {
    setMessages(Object.values(uniqueMessages));
  }, [uniqueMessages]);

  return (
      <div className="chatContainer">
        <div className="header">
          <div className="item">
            <div className="img">
              <img src="img/p1.jpg" alt="avatar" />
            </div>
            <div className="name">
              <div className="info">
                <span>{friend.name.split("@")[0]}</span>
              </div>
              <div className="icons">
                <FontAwesomeIcon className="icon" icon={faPhone} />
                <FontAwesomeIcon className="icon" icon={faVideo} />
                <FontAwesomeIcon className="icon" icon={faBars} />
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          {/* Hiển thị danh sách tin nhắn */}
          {messages.map((message, index) => (
              <Message
                  key={index}
                  text={message.text}
                  isSentByUser={message.isSentByUser}
              />
          ))}
        </div>
        <div className="footer">
          <input
              className="input"
              type="text"
              placeholder="Type message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="sendItem">
            <FontAwesomeIcon className="icon" icon={faFaceSmile} />
            <FontAwesomeIcon className="icon" icon={faPaperclip} />
            <div className="send" onClick={handleSendMessages}>
              <span>Send</span>
              <FontAwesomeIcon className="icon" icon={faPaperPlane} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Chat;
