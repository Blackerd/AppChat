import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Message from "../../pages/Home/message/message";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { SEND_CHAT_TO_ROOM, GET_ROOM_CHAT_MES } from "../../api/action";
import { useDispatch, useSelector } from "react-redux";
import { saveGroupMess } from "../../store/userSlice";
import Styles from "./styles.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

function GroupComponent(props) {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const groups = infor.user.infor.groups;
  const [group, setGroup] = useState(
    groups.find((item) => item.nameGroup === props.group.nameGroup)
  );

  const [messages, setMessages] = useState(group.listmessage);
  const [newMessage, setNewMessage] = useState("");
  //save message into friend in redux
  useEffect(() => {
    setMessages((p) => group.listmessage);
  }, [group]);
  useEffect(() => {
    setGroup((pre) =>
      groups.find((item) => item.nameGroup === props.group.nameGroup)
    );
  }, [props.group]);
  useEffect(() => {
    if (respone) {
      if (respone.status === "success") {
        if (respone.event === "SEND_CHAT" && respone.data.type === 1) {
          let mess = respone.data.mes;
          let nameSender = respone.data.name;
          let namegroup = respone.data.to;
          if (nameSender !== infor.user.infor.email) {
            dispatch(
              saveGroupMess({
                name: nameSender,
                mess: { text: mess, isSentByUser: false },
              })
            );
            setNewMessage("");
            const newChat = [...messages, { text: mess, isSentByUser: false }];
            setMessages(newChat);
            return;
          }
          // data:{id: 0, name: 'doxuanhau@gmail.com', type: 0, to: 'ka@gmail.com', mes: '123123123123123'}
          // event:"SEND_CHAT"
          // status:"success"
          dispatch(
            saveGroupMess({
              name: nameSender,
              mess: { text: mess, isSentByUser: false },
            })
          );
          setNewMessage("");
        }
        if (respone.event === "GET_ROOM_CHAT_MES") {
          const listmess = respone.data.chatData;
          // createAt: "2024-06-16 09:14:18";
          // id: 31810;
          // mes: "asdasdasdasd";
          // name: "doxuanhau@gmail.com";
          // to: "hauvanhungnguoiban@gmail.com";
          // type: 1;
          listmess.reverse().map((item) => {
            let name = item.name; //sender
            let to = item.to; // retriver
            let text = item.mes;
            let a = name === infor.user.infor.email;
            dispatch(
              saveGroupMess({
                nameGroup: to,
                messGroup: { text: text, isSentByUser: a },
              })
            );
            // const newChat = [...messages, { text: text, isSentByUser: a }];
            setMessages((pre) => [...pre, { text: text, isSentByUser: a }]);
          });
        }
      }
    }
  }, [respone]);
  //

  const handleSendGroupMessages = () => {
    if (newMessage.trim()) {
      //
      dispatch(
        saveGroupMess({
          name: group.nameGroup,
          mess: { text: newMessage, isSentByUser: true },
        })
      );

      const send_chat_to_room = SEND_CHAT_TO_ROOM(
        props.group.nameGroup,
        newMessage
      );
      sender(send_chat_to_room);

      //
      const newChat = [...messages, { text: newMessage, isSentByUser: true }];
      setMessages(newChat);
      setNewMessage("");
    }
  };

  return (
    <div className={cx("chatContainer")}>
      <div className={cx("header")}>
        <div className={cx("item")}>
          <div className={cx("img")}>
            {/* <img className={cx("imgin")} src="img/p1.jpg" alt="avatar" /> */}
          </div>
          <div className={cx("name")}>
            <div className={cx("info")}>
              <span>{group.nameGroup.split("@")[0]}</span>
            </div>
            <div className={cx("icons")}>
              <FontAwesomeIcon className={cx("icon")} icon={faPhone} />
              <FontAwesomeIcon className={cx("icon")} icon={faVideo} />
              <FontAwesomeIcon className={cx("icon")} icon={faBars} />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("main")}>
        {messages.map((message, index) => (
          // <Message
          //   key={index}
          //   text={message.text}
          //   isSentByUser={message.isSentByUser}
          // />
          <div
            className={cx(
              "message",
              `${message.isSentByUser ? "user" : "friend"}`
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={cx("footer")}>
        <input
          className={cx("input")}
          type="text"
          placeholder="Type message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className={cx("sendItem")}>
          <FontAwesomeIcon className={cx("icon")} icon={faFaceSmile} />
          <FontAwesomeIcon className={cx("icon")} icon={faPaperclip} />
          <div className={cx("send")} onClick={handleSendGroupMessages}>
            <span>Send</span>
            <FontAwesomeIcon className={cx("icon")} icon={faPaperPlane} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupComponent;
