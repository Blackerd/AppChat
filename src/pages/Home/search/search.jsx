import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useState } from "react";

//
import { useContext } from "react";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import { SEND_CHAT, CREATE_ROOM } from "../../../api/action";
//

const Search = () => {
  const [name, setName] = useState("");
  const [isReady, respone, sender] = useContext(WebsocketContext);
  const handle = () => {
    // let value = name + "@gmail.com";
    let value = name;
    // const send_chat = SEND_CHAT(value, "hello");
    const create_room = CREATE_ROOM(value);
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
      <button onClick={handle}>find</button>
    </div>
  );
};
export default Search;
