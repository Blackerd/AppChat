import React, { useContext, useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFaceSmile, faPaperclip, faPaperPlane, faPhone, faVideo } from "@fortawesome/free-solid-svg-icons";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import { SEND_CHAT, GET_PEOPLE_CHAT_MES } from "../../../api/action";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../../../store/userSlice";
import Message from "../message/message";
import IconsPicker from "react-icons-picker";
import EmojiPicker from "emoji-picker-react";

const Chat = (props, ref) => {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.reducer.user.infor); // Lấy email người đang đăng nhập
  const { friends } = useSelector((state) => state.reducer.user.infor);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State để quản lý hiển thị bảng chọn emoji

  useEffect(() => {
    setCurrentFriend(friends.find((item) => item.name === props.friend.name));
  }, [props.friend, friends]);

  const handleGetPeopleChatMess = (payload) => {
    const listmess = payload.data.reverse().map((item) => ({
      text: item.mes,
      sender: item.name,
    }));

    // Debugging to check email and message sender
    console.log("Current User Email:", currentFriend.name);
    console.log("Messages from Server:", listmess);

    // Lọc và cập nhật tin nhắn cho đúng với người đang đăng nhập và đối phương
    const filteredMessages = listmess.map((item) => ({
      text: item.text,
      // kiểm tra tin nhắn có phải của người gửi không
      isSentByUser: item.sender === currentFriend.name,
    }));
    // Lưu tin nhắn vào danh sách tin nhắn của người dùng
    dispatch(saveMessage({
      name: currentFriend.name,
      messages: filteredMessages,
    }));
    // Cập nhật tin nhắn hiển thị trên giao diện theo 2 bên người gửi và nhận

    setMessages(filteredMessages);
  };


  const handleSendChatResponse = (payload) => {
    const isSentByUser = payload.data.name === email;
    console.log(`New Message: ${payload.data.mes}, Sender: ${payload.data.name}, isSentByUser: ${isSentByUser}`);
    const newChat = [
      ...messages,
      {
        text: payload.data.mes,
        isSentByUser: payload.data.name === email,
      },
    ];
    setMessages(newChat);
    setNewMessage("");
  };

  useEffect(() => {
    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "SEND_CHAT":
          handleSendChatResponse(respone);
          break;
        case "GET_PEOPLE_CHAT_MES":
          handleGetPeopleChatMess(respone);
          break;
        default:
          break;
      }
    }
  }, [respone]);

  const handleSendMessages = () => {
    if (newMessage.trim()) {
      sender(SEND_CHAT(props.friend.name, newMessage));
      const newChat = [
        ...messages,
        { text: newMessage, isSentByUser: true },
      ];
      setMessages(newChat);
      setNewMessage(""); // Xóa nội dung tin nhắn sau khi gửi
    }
  };



  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn chặn hành động mặc định của Enter (thường là submit form)
      handleSendMessages(); // Gọi hàm gửi tin nhắn
    }
  };

  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    clearInput() {
      setNewMessage("");
    },
  }));

  const handleEmojiSelect = (event, emojiObject) => {
    const { emoji } = emojiObject;
    sender(SEND_CHAT(props.friend.name, emoji)); // Gửi emoji đến server
    setShowEmojiPicker(false); // Đóng bảng chọn emoji sau khi chọn xong
  };

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker); // Đảo ngược trạng thái hiển thị của bảng chọn emoji
  };


  return (
      <div className="chatContainer">
        <div className="header">
          <div className="item">
            <div className="img">
              <img src="img/p1.jpg" alt="avatar" />
            </div>
            <div className="name">
              <div className="info">
                <span>{props.friend.name.split("@")[0]}</span>
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
          {console.log(messages)}
          {messages.map((message, index) => (
              <Message key={index} text={message.text} isSentByUser={message.isSentByUser} />
          ))}
        </div>
        <div className="footer">
          <input
              className="input"
              type="text"
              placeholder="Nhập tin nhắn..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Bắt sự kiện Enter
              ref={inputRef}
          />
          <div className="sendItem">
            <FontAwesomeIcon className="icon" icon={faFaceSmile} onClick={handleEmojiPickerToggle} />
            <FontAwesomeIcon className="icon" icon={faPaperclip} />
            <div className="send" onClick={handleSendMessages}>
              <span>Gửi</span>
            </div>
          </div>
          {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
          )}
        </div>
      </div>
  );
};

export default forwardRef(Chat);
