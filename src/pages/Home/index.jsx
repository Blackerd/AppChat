import { useContext, useEffect, useState } from "react";
import Menu from "./menu/menu";
import List from "./list/list";
import "./home.css";
import Chat from "./chat/chat";
import { useDispatch, useSelector } from "react-redux";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { setFriends } from "../../store/userSlice";
function Home() {
  //
  const [isReady, respone, sender] = useContext(WebsocketContext);
  // ==> ko được xóa
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.reducer);
  const [name, setName] = useState("");
  const [listFriends, setListFriends] = useState([]);
  useEffect(() => {
    // setName
    setName(infor.user.infor.name);
    //
    if (respone) {
      if (respone.event === "GET_USER_LIST" && respone.status === "success") {
        dispatch(setFriends({ friends: respone.data }));
        setListFriends(respone.data);
      }
    }
  }, [respone]);

  /**
   *không được xóa dòng trên !!!! ==>
   */
  return (
    <div className="container">
      <Menu name={name}></Menu>
      <List listFriends={listFriends}></List>
      <Chat></Chat>
    </div>
  );
}
export default Home;
