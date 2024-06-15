import React, {useContext, useEffect, useState} from "react";
import Search from "../search/search";
import Friend from "../friend/friend";
import "./list.css";
import {useDispatch, useSelector} from "react-redux";
import {WebsocketContext} from "../../../socket/WebsocketContent";
import {GET_PEOPLE_CHAT_MES} from "../../../api/action";
import {clearMessage} from "../../../store/userSlice";

const List = (props) => {
    const [isReady, respone, sender] = useContext(WebsocketContext);
    const dispatch = useDispatch();
    const infor = useSelector((state) => state.reducer);
    const friends = infor.user.infor.friends;
    const groups = infor.user.infor.groups;
    const all = [...friends, ...groups];
  const temp = all;
    //

    const handleFriendClick = (item) => {
        if (item.type === 0) {
            dispatch(clearMessage({name:item.name}));
            const get_people_chat_mess = GET_PEOPLE_CHAT_MES(item.name);
            sender(get_people_chat_mess);
        }
        props.setChatUser(item);

    };
    return (
        <div className="list">
            <h1>Chat</h1>
            <Search/>
            <div className="chatList">
                {all &&
                    all.map((item) => (
                        <Friend
                            key={item.name}
                            img={item.img}
                            name={item.nameGroup || item.name.split("@")[0]}
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
