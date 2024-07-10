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
  const [uniqueMessages, setUniqueMessages] = useState(new Map());

  useEffect(() => {
    setMessages(friend.listmessage);
  }, [friend]);

  useEffect(() => {
    setFriend(friends.find((item) => item.name === props.friend.name));
  }, [props.friend]);

  useEffect(() => {
    if (respone) {
      if (respone.status === "success") {
        if (respone.event === "SEND_CHAT") {
          let mess = respone.data.mes;
          let nameSender = respone.data.name;
          if (nameSender === friend.name) {
            dispatch(
              saveMessage({
                name: nameSender,
                mess: { text: mess, isSentByUser: false },
              })
            );
            setNewMessage("");
            if (!uniqueMessages.has(mess)) {
              uniqueMessages.set(mess, { text: mess, isSentByUser: false });
              setMessages([...uniqueMessages.values()]);
            }
            return;
          }
          dispatch(
            saveMessage({
              name: nameSender,
              mess: { text: mess, isSentByUser: false },
            })
          );
          setNewMessage("");
        }
        if (respone.event === "GET_PEOPLE_CHAT_MES") {
          const listmess = respone.data;
          listmess.reverse().forEach((item) => {
            let name = item.name; // sender
            let to = item.to; // receiver
            let text = item.mes;
            let a = name === infor.user.infor.email;
            if (!uniqueMessages.has(text)) {
              uniqueMessages.set(text, { text, isSentByUser: a });
              dispatch(
                saveMessage({
                  name: friend.name,
                  mess: { text, isSentByUser: a },
                })
              );
              setMessages([...uniqueMessages.values()]);
            }
          });
        }
      }
    }
  }, [respone]);

  const handleSendMessages = () => {
    if (newMessage.trim()) {
      dispatch(
        saveMessage({
          name: friend.name,
          mess: { text: newMessage, isSentByUser: true },
        })
      );
      const send_chat = SEND_CHAT(props.friend.name, newMessage);
      sender(send_chat);

      if (!uniqueMessages.has(newMessage)) {
        uniqueMessages.set(newMessage, { text: newMessage, isSentByUser: true });
        setMessages([...uniqueMessages.values()]);
        setNewMessage("");
      }
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
