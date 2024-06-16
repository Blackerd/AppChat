import React, { useContext, useEffect, useState } from "react";
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
} from "../../../store/userSlice";

const List = (props) => {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const friends = infor.user.infor.friends;
  const groups = infor.user.infor.groups;
  const all = [...friends, ...groups];

  const handleFriendClick = (item) => {
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
        {all &&
          all.map((item) => (
            <Friend
              key={item.name}
              img={item.img}
              name={item.nameGroup || item.name}
              time={item.time}
              message={item.message}
              unread={item.unread}
              onClick={() => handleFriendClick(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default List;
