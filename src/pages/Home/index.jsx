import React, { useContext, useEffect, useRef, useState } from "react";
import Menu from "./menu/menu";
import List from "./list/list";
import "./home.css";
import Chat from "./chat/chat";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { logout, setFriends, setGroups } from "../../store/userSlice";
import { RE_LOGIN, GET_PEOPLE_CHAT_MES } from "../../api/action";
import GroupComponent from "../../components/group/GroupComponent";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isReady, response, sender] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const infor = useSelector((state) => state.reducer);
  if (infor.user.status !== "Auth") nav("/");

  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreateRoom = (payload) => {
    const item = { name: payload.data.name, type: 1, actionTime: "" };
    dispatch(setGroups({ item }));
  };

  const handleGetUserList = (payload) => {
    payload.data.forEach((item) => {
      return item.type === 0
          ? dispatch(setFriends({ item }))
          : dispatch(setGroups({ item }));
    });
  };

  useEffect(() => {
    setName(infor.user.infor.name);
    if (response && response.status === "success") {
      switch (response.event) {
        case "GET_USER_LIST":
          handleGetUserList(response);
          break;
        case "JOIN_ROOM":
        case "CREATE_ROOM":
          handleCreateRoom(response);
          break;
        default:
          break;
      }
    } else if (response && response.status === "error") {
      switch (response.event) {
        case "JOIN_ROOM":
          alert("Room not exist");
          break;
        default:
          break;
      }
    }
  }, [response]);

  useEffect(() => {
    // Chọn người đầu tiên trong danh sách để nhắn tin khi danh sách được load lên
    if (infor.user.infor.friends.length > 0 && !selectedUser) {
      setSelectedUser(infor.user.infor.friends[0]);
    }
  }, [infor.user.infor.friends]);

  const inputFillGroup = useRef();

  const handleDeleteFillInput = () => {
    if (inputFillGroup.current) {
      inputFillGroup.current.clearInput();
    }
  };

  return (
      <div className={"home"}>
        <div className="home-container">
          <div className={"navMenu"}>
            <Menu name={name} />
          </div>
          <div className="content-container">
            <div className="list-container">
              <List
                  setChatUser={setSelectedUser}
                  handleDeleteFillInput={handleDeleteFillInput}
              />
            </div>
            <div className="chat-container">
              {selectedUser && selectedUser.type === 0 && (
                  <Chat friend={selectedUser} ref={inputFillGroup} />
              )}
              {selectedUser && selectedUser.type !== 0 && (
                  <GroupComponent group={selectedUser} ref={inputFillGroup} />
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
