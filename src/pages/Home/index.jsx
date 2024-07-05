import { useContext, useEffect, useRef, useState } from "react";
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
  const [isReady, respone, sender] = useContext(WebsocketContext);
  // ==> ko được xóa
  const dispatch = useDispatch();
  const nav = useNavigate();

  const infor = useSelector((state) => state.reducer);
  if (infor.user.status !== "Auth") nav("/");
  const [name, setName] = useState("");

  const handleCreateRoom = (payload) => {
    const item = { name: payload.data.name, type: 1, actionTime: "" };
    dispatch(setGroups({ item }));
  };
  const hanldeGetUserList = (payload) => {
    payload.data.forEach((item) => {
      return item.type === 0
        ? dispatch(setFriends({ item }))
        : dispatch(setGroups({ item }));
    });
  };

  useEffect(() => {
    // setName
    setName(infor.user.infor.name);
    if (respone && respone.status === "success") {
      switch (respone.event) {
        case "GET_USER_LIST":
          hanldeGetUserList(respone);
          break;
        case "JOIN_ROOM":
        case "CREATE_ROOM":
          handleCreateRoom(respone);
          break;
        default:
          break;
      }
    } else if (respone && respone.status === "error") {
      switch (respone.event) {
        case "JOIN_ROOM":
          alert("Room not exist");
          break;
        default:
          break;
      }
    }
  }, [respone]);

  /**
   *không được xóa dòng trên !!!! ==>
   */

  const [selected, setSelected] = useState(null);
  const inputFillGroup = useRef();
  const handleDeleteFillInput = () => {
    if (inputFillGroup.current) {
      inputFillGroup.current.clearInput();
    }
  };
  return (
    <div className="container">
      <Menu name={name}></Menu>
      <List
        setChatUser={setSelected}
        handleDeleteFillInput={handleDeleteFillInput}
      ></List>
      {selected &&
        (selected.type === 0 ? (
          <Chat friend={selected} ref={inputFillGroup} />
        ) : (
          <GroupComponent group={selected} ref={inputFillGroup} />
        ))}
    </div>
  );
}
export default Home;
