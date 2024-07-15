import React, { useContext, useEffect, useState } from "react";
import Friend from "../friend/friend";
import "./list.css";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import { GET_PEOPLE_CHAT_MES, GET_ROOM_CHAT_MES, Logout, SEND_CHAT, CREATE_ROOM, JOIN_ROOM } from "../../../api/action";
import { clearGroupMess, clearMessage, setGroups, saveMessage, saveGroupMess, logout, setFriends } from "../../../store/userSlice";
import ShowGroup from "../../../components/group/showgroup/GroupShow";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faMessage } from "@fortawesome/free-solid-svg-icons";

const List = (props) => {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const groups = infor.user.infor.groups;
  const userInfo = infor.user.infor; // Thêm dòng này để lấy thông tin người dùng
  const all = [...friends, ...groups];
  const [, , sendJsonMessage] = useContext(WebsocketContext);
  const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory
  const [name, setName] = useState("");

  const handleLogout = () => {
    const logoutAction = Logout(); // Hành động logout từ API
    sendJsonMessage(logoutAction); // Gửi yêu cầu logout qua WebSocket
    dispatch(logout());
    // Chuyển hướng về trang đăng nhập
    navigate("/");
  };

  const handleItemOnClick = (item) => {
    if (item.type === 0) {
      dispatch(clearMessage({ name: item.name }));
      const get_people_chat_mess = GET_PEOPLE_CHAT_MES(item.name);
      sender(get_people_chat_mess);
    } else if (item.type === 1) {
      dispatch(clearGroupMess({ nameGroup: item.nameGroup }));
      const get_room_chat_mess = GET_ROOM_CHAT_MES(item.nameGroup);
      sender(get_room_chat_mess);
    }
    props.setChatUser(item);
  };

  const handleGetPeopleChatMess = (payload) => {
    payload.data.forEach((item) => {
      const { name, to, mes } = item;
      const isSentByUser = name === infor.user.infor.email;
      dispatch(
          saveMessage({
            name: isSentByUser ? to : name,
            mess: { text: mes, isSentByUser },
          })
      );
    });
  };
  const handleGetRoomChatMess = (payload) => {
    payload.data.chatData.forEach((item) => {
      const { name, mes } = item;
      const isSentByUser = name === infor.user.infor.email;
      dispatch(
          saveGroupMess({
            nameGroup: respone.data.name,
            messGroup: { text: mes, isSentByUser },
          })
      );
    });
  };
  const handleSendChat = (payload) => {
    console.log(payload);
    const check = friends.every((item) => item.name !== payload.data.name);
    if (check) {
      const item = { name: payload.data.name, type: 0, actionTime: "" };
      dispatch(setFriends({ item }));
      sender(SEND_CHAT(payload.data.name, ""));
    }
  };
  useEffect(() => {
    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "SEND_CHAT":
          handleSendChat(respone);
          break;
        case "GET_PEOPLE_CHAT_MES":
          handleGetPeopleChatMess(respone);
          break;
        case "GET_ROOM_CHAT_MES":
          handleGetRoomChatMess(respone);
          break;
      }
    }
  }, [respone]);

  const findfriend = () => {
    let value = name;
    const send_chat = SEND_CHAT(value, "add friend");
    setName((pre) => "");
    sender(send_chat);
  };
  const joingroup = () => {
    let value = name;
    const join_room = JOIN_ROOM(value);
    setName((pre) => "");
    sender(join_room);
  };
  const creategroup = () => {
    let value = name;
    const create_room = CREATE_ROOM(value);
    setName((pre) => "");
    sender(create_room);
  };

  return (
      <div className="list">
        <div className="list_header">
          <div className="img">
            <Link to="/info">
              <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="avatar"
              />
            </Link>
            <div className="name">
              <span>{userInfo.name}</span>
            </div>
          </div>
          <div className="item log-out" onClick={handleLogout}>
            <div className="icon">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
          </div>
        </div>
        <div className="search">
          <div className="searchForm">
            <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Search..."
            />
          </div>
        </div>
        <div className="allbtn">
          <button className="btn left" onClick={findfriend}>
            FIND FRIEND
          </button>
          <button className="btn right" onClick={joingroup}>
            JOIN GROUP
          </button>
          <button className="btn middle" onClick={creategroup}>
            CREATE GROUP
          </button>
        </div>
        <div className="chatList">
          {all &&
              all.map((item) => {
                return item.type === 0 ? (
                    <Friend
                        key={item.name}
                        img={item.img}
                        name={item.nameGroup || item.name}
                        time={item.time}
                        message={item.message}
                        unread={item.unread}
                        onClick={() => handleItemOnClick(item)}
                    />
                ) : (
                    <ShowGroup
                        key={item.nameGroup}
                        nameGroup={item.nameGroup}
                        onClick={() => handleItemOnClick(item)}
                    />
                );
              })}
        </div>
      </div>
  );
};

export default List;
