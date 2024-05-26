import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faHouse,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./menu.css";

const Menu = (props) => {
  return (
    <aside id="aside">
      <div className="menu">
        <div className="img">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
          />
        </div>
        <div className="menu">
          <div className="menuItem">
            <div className="item">
              <div className="icon">
                <FontAwesomeIcon icon={faMessage} />
              </div>
              <span>{props.name}</span>
            </div>
            <div className="item">
              <div className="icon">
                <FontAwesomeIcon icon={faGear} />
              </div>
              <span>Setting</span>
            </div>
            <div className="logOut">
              <div className="icon">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </div>
              <span>LogOut</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
