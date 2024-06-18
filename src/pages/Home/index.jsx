import { useContext, useEffect, useState } from "react";
import Menu from "./menu/menu";
import List from "./list/list";
import "./home.css";
import Chat from "./chat/chat";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { logout, setFriends, setGroups } from "../../store/userSlice";
import { RE_LOGIN, GET_PEOPLE_CHAT_MES } from "../../api/action";
import GroupComponent from "../../components/group/GroupComponent";
function Home() {
  const [isReady, respone, sender] = useContext(WebsocketContext);
  // ==> ko được xóa
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const [name, setName] = useState("");
  console.log(respone);
  useEffect(() => {
    // setName
    setName(infor.user.infor.name);
    if (respone) {
      if (respone.status === "success") {
        if (respone.event === "GET_USER_LIST") {
          //vong lap nay de lay ra nhung nguoi cguoi tung chat va cac nhom
          const data = respone.data;
          data.map((item) => {
            if (item.type === 0) {
              dispatch(setFriends({ item }));
            } else if (item.type === 1) {
              dispatch(setGroups({ item }));
            }
          });
        }
        if (respone.event === "JOIN_ROOM") {
          let name = respone.data.name;
          let type = 1;
          let actionTime = "";
          let item = { name, type, actionTime };
          dispatch(setGroups({ item }));
        }
        if (respone.event === "CREATE_ROOM") {
          let name = respone.data.name;
          let type = 1;
          let actionTime = "";
          let item = { name, type, actionTime };
          dispatch(setGroups({ item }));
        }
      } else if (respone.status === "error") {
        if (respone.event === "JOIN_ROOM") {
          alert("Room not exist");
          return;
        }
      }
    }
  }, [respone]);

  /**
   *không được xóa dòng trên !!!! ==>
   */

  const [selected, setSelected] = useState(null);
  return (
    <div className="container">
      <Menu name={name}></Menu>
      <List setChatUser={setSelected}></List>
      {/* {listFriends.length > 0 ? <Chat></Chat> : <></>} */}
      {selected &&
        (selected.type === 0 ? (
          <Chat friend={selected} />
        ) : (
          <GroupComponent group={selected} />
        ))}
    </div>
  );
}
export default Home;
