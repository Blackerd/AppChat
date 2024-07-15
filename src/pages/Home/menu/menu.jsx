import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faGear, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Logout } from "../../../api/action";
import { WebsocketContext } from "../../../socket/WebsocketContent";
import "./menu.scss"; // Import SCSS file
import { logout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom

const Menu = (props) => {
    const [, , sendJsonMessage] = useContext(WebsocketContext);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory

    const handleLogout = () => {
        const logoutAction = Logout(); // Hành động logout từ API
        sendJsonMessage(logoutAction); // Gửi yêu cầu logout qua WebSocket
        dispatch(logout());
        // Chuyển hướng về trang đăng nhập
        navigate("/");
    };

    return (
        <aside className="aside">
            <div className="menu">
                <div className="img">
                    <Link to="/info">
                        <img
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="avatar"
                        />
                    </Link>
                </div>
                <div className="menu-items">
                    <div className="item">
                        <div className="icon">
                            <FontAwesomeIcon icon={faMessage} />
                        </div>
                        {/*<span>{props.name}</span>*/}
                    </div>
                    <div className="item">
                        <div className="icon">
                            <FontAwesomeIcon icon={faGear} />
                        </div>
                    </div>
                    <div className="item log-out" onClick={handleLogout}>
                        <div className="icon">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Menu;
