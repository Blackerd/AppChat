import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faGear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Logout } from "../../../api/action";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import "./menu.css";
import { logout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import {Link, useHistory} from "react-router-dom"; // Import useHistory từ react-router-dom


const Menu = (props) => {
  const [, , sendJsonMessage] = useContext(WebsocketContext);
  const dispatch = useDispatch();
  const handleLogout = () => {
    const logoutAction = Logout(); // Tạo hành động đăng xuất sử dụng hàm Logout từ API
    sendJsonMessage(logoutAction); // Gửi yêu cầu đăng xuất qua WebSocket
    dispatch(logout());
    //  chuyển hướng về trang đăng nhập
    window.location.href = "/";
  };



  return (
    <aside id="aside">
      <div className="menu">
        <div className="img">
          <Link to="/info">
            <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="avatar"
            />
          </Link>
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
            <div className="logOut" onClick={handleLogout}>
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
