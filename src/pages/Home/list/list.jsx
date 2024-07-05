import React, { useContext, useEffect } from "react";
import Search from "../search/search";
import Friend from "../friend/friend";
import "./list.css";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import { GET_PEOPLE_CHAT_MES, GET_ROOM_CHAT_MES } from "../../../api/action";
import {
  clearGroupMess,
  clearMessage,
  setGroups,
  saveMessage,
  saveGroupMess,
} from "../../../store/userSlice";
import ShowGroup from "../../../components/group/showgroup/GroupShow";
import { setFriends } from "../../../store/userSlice";
import { SEND_CHAT } from "../../../api/action";

const List = (props) => {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const groups = infor.user.infor.groups;
  const all = [...friends, ...groups];

  const handleItemOnClick = (item) => {
    // props.handleDeleteFillInput();
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

  // Lọc và nhóm tin nhắn theo người nhận
  // const filteredList = {};

  // all.forEach((item) => {
  //   const key = item.nameGroup || item.name;
  //   if (!filteredList[key]) {
  //     filteredList[key] = item;
  //   }
  // });

  return (
    <div className="list">
      <h1>Chat</h1>
      <Search />
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
