import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
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
import { saveMessage, setFriends } from "../../../store/userSlice";

const Chat = (props, ref) => {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const [friend, setFriend] = useState(
      friends.find((item) => item.name === props.friend.name)
  );

  const [messages, setMessages] = useState(friend.listmessage);
  const [newMessage, setNewMessage] = useState("");
  //save message into friend in redux
  useEffect(() => {
    setMessages((p) => friend.listmessage);
  }, [friend]);
  useEffect(() => {
    setFriend((pre) => friends.find((item) => item.name === props.friend.name));
  }, [props.friend]);

  const handleGetPeopleChatMess = (payload) => {
    const listmess = payload.data;
    listmess.reverse().map((item) => {
      // let name = item.name; //sender
      // let to = item.to; // retriver
      // let text = item.mes;
      // let a = name === infor.user.infor.email;
      dispatch(
          saveMessage({
            name: friend.name,
            mess: {
              text: item.mes,
              isSentByUser: item.name === infor.user.infor.email,
            },
          })
      );
      setMessages((pre) => [
        ...pre,
        { text: item.mes, isSentByUser: item.name === infor.user.infor.email },
      ]);
    });
  };

  const handleSendChatRespone = (payload) => {
    // data:{id: 0, name: 'doxuanhau@gmail.com', type: 0, to: 'ka@gmail.com', mes: '123123123123123'}
    // event:"SEND_CHAT"
    // status:"success"

    const newChat = [
      ...messages,
      {
        text: payload.data.mes,
        isSentByUser: payload.data.name === infor.user.infor.email,
      },
    ];
    setNewMessage((prev) => "");
    setMessages((pev) => newChat);
  };
  useEffect(() => {
    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "SEND_CHAT":
          handleSendChatRespone(respone);
          break;
        case "GET_PEOPLE_CHAT_MES":
          handleGetPeopleChatMess(respone);
          break;
        default:
          break;
      }
    }
  }, [respone]);
  //

  const handleSendMessages = () => {
    if (newMessage.trim()) {
      sender(SEND_CHAT(props.friend.name, newMessage));
      //
      const newChat = [...messages, { text: newMessage, isSentByUser: true }];
      setNewMessage("");
      setMessages(newChat);
    }
  };
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    clearInput() {
      setNewMessage((p) => "");
    },
  }));

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
              ref={inputRef}
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

export default forwardRef(Chat);