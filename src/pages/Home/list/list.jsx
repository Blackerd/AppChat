import React, { useContext, useEffect } from "react";
import Search from "../search/search";
import Friend from "../friend/friend";
import "./list.css";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import { GET_PEOPLE_CHAT_MES, GET_ROOM_CHAT_MES, SEND_CHAT } from "../../../api/action";
import {
  clearGroupMess,
  clearMessage,
  setGroups,
  saveMessage,
  saveGroupMess,
  setFriends
} from "../../../store/userSlice";
import ShowGroup from "../../../components/group/showgroup/GroupShow";

const List = (props) => {
  const [isReady, response, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const groups = infor.user.infor.groups;
  const currentUserEmail = infor.user.infor.email;
  const all = [...friends, ...groups];

  // Lọc danh sách để chỉ hiển thị các đoạn chat của người dùng hiện tại với người khác
  const filteredFriends = friends.filter((friend) => {
    const lastMessage = friend.listmessage[friend.listmessage.length - 1];
    return lastMessage && (lastMessage.isSentByUser || lastMessage.name !== currentUserEmail);
  });

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        if (response.event === "GET_PEOPLE_CHAT_MES") {
          const data = response.data;
          data.forEach((item) => {
            const { name, to, mes } = item;
            const isSentByUser = name === currentUserEmail;
            dispatch(
                saveMessage({
                  name: isSentByUser ? to : name,
                  mess: { text: mes, isSentByUser },
                })
            );
          });
        } else if (response.event === "GET_ROOM_CHAT_MES") {
          const data = response.data.chatData;
          data.forEach((item) => {
            const { name, mes } = item;
            const isSentByUser = name === currentUserEmail;
            dispatch(
                saveGroupMess({
                  nameGroup: response.data.name,
                  messGroup: { text: mes, isSentByUser },
                })
            );
          });
        }
      }
    }
  }, [response]);

  const handleGetPeopleChatMess = (payload) => {
    payload.data.forEach((item) => {
      const { name, to, mes } = item;
      const isSentByUser = name === currentUserEmail;
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
      const isSentByUser = name === currentUserEmail;
      dispatch(
          saveGroupMess({
            nameGroup: response.data.name,
            messGroup: { text: mes, isSentByUser },
          })
      );
    });
  };

  const handleSendChat = (payload) => {
    const check = friends.every((item) => item.name !== payload.data.name);
    if (check) {
      const item = { name: payload.data.name, type: 0, actionTime: "" };
      dispatch(setFriends({ item }));
      sender(SEND_CHAT(payload.data.name, ""));
    }
  };

  useEffect(() => {
    if (response && response.status === "success") {
      switch (response.event) {
        case "SEND_CHAT":
          handleSendChat(response);
          break;
        case "GET_PEOPLE_CHAT_MES":
          handleGetPeopleChatMess(response);
          break;
        case "GET_ROOM_CHAT_MES":
          handleGetRoomChatMess(response);
          break;
        default:
          break;
      }
    }
  }, [response]);

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

  return (
      <div className="list">
        <h1>Chat</h1>
        <Search />
        <div className="chatList">
          {filteredFriends &&
              filteredFriends.map((item) => {
                const lastMessage = item.listmessage[item.listmessage.length - 1];
                const isCurrentUser = lastMessage && lastMessage.isSentByUser;
                return (
                    <Friend
                        key={item.name}
                        img={item.img}
                        name={item.name}
                        lastMessage={lastMessage.text}
                        lastMessageTime={lastMessage.time}
                        unread={item.unread}
                        onClick={() => handleItemOnClick(item)}
                        isCurrentUser={isCurrentUser}
                    />
                );
              })}
        </div>
      </div>
  );
};

export default List;
