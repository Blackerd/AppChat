import { useContext, useEffect, useState } from "react";
import Menu from "./menu/menu";
import List from "./list/list";
import "./home.css";
import Chat from "./chat/chat";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../socket/WebsocketContent";
import {logout, setFriends, setGroups} from "../../store/userSlice";
import { RE_LOGIN ,GET_PEOPLE_CHAT_MES} from "../../api/action";
function Home() {
  //
  const [isReady, respone, sender] = useContext(WebsocketContext);
  // ==> ko được xóa
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const [name, setName] = useState("");
  useEffect(() => {
    // setName
    setName(infor.user.infor.name);
    //
    if (respone) {
      if ( respone.status === "success") {
        if(respone.event === "GET_USER_LIST"){
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

      }
    }
  }, [respone]);

  /**
   *không được xóa dòng trên !!!! ==>
   */

  //
  const [selected, setSelected] = useState(null);
  //
  return (
    <div className="container">
      <Menu name={name}></Menu>
      <List setChatUser={setSelected}></List>
      {/* {listFriends.length > 0 ? <Chat></Chat> : <></>} */}
      {selected && <Chat friend={selected} />}
    </div>
  );
}
export default Home;
