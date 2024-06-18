import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useState } from "react";

//
import { useContext } from "react";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import {
  SEND_CHAT,
  CREATE_ROOM,
  JOIN_ROOM,
  CHECK_USER,
} from "../../../api/action";
//

const Search = () => {
  const [name, setName] = useState("");
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const findfriend = () => {
    // let value = name;
    // const check_user = CHECK_USER(value);
    // const send_chat = SEND_CHAT(value, "hi");
    setName((pre) => "");
    // sender(send_chat);
  };
  const joingroup = () => {
    let value = name;
    const join_room = JOIN_ROOM(value);
    setName((pre) => "");

    sender(join_room);
  };
  const creategroup = () => {
    let value = name;
    const create_room = CREATE_ROOM(value);
    setName((pre) => "");
    sender(create_room);
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="allbtn">
        <button className="btn left" onClick={findfriend}>
          FIND FRIEND
        </button>
        <button className="btn right" onClick={joingroup}>
          JOIN GROUP
        </button>
        <button className="btn middle" onClick={creategroup}>
          create GROUP
        </button>
      </div>
    </div>
  );
};
export default Search;
