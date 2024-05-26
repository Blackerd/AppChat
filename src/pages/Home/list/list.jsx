import React, { useState } from "react";
import Search from "../search/search";
import Friend from "../friend/friend";
import "./list.css";
import ChatList from "../../data/index";
import Chat from "../chat/chat";

const List = (props) => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="list">
      <h1>Chat</h1>
      <Search />
      <div className="chatList">
        {props.listFriends.map((item) => (
          <Friend
            key={item.id}
            img={item.img}
            name={item.name}
            time={item.time}
            message={item.message}
            unread={item.unread}
            onClick={() => handleFriendClick(item)}
          />
        ))}
      </div>
      {/* {selectedFriend && <Chat friend={selectedFriend} />} */}
    </div>
  );
};

export default List;
