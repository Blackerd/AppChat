import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import Styles from "./Styles.module.css";
import { useRef, useState } from "react";

const cx = classNames.bind(Styles);

function LogIn() {
  // xử lí chức năng cho form
  // trường username
  const checkIsEmail = (userName) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!userName || regex.test(userName) === false);
  };
  const userNameInput = useRef();
  const error_username = useRef();
  const [userNameInputState, setUserNameInputState] = useState("");
  const handleUserNameInput = (e) => {
    setUserNameInputState((prev) => e.target.value);
  };

  const handleOnBlurUsernameInput = () => {
    const isEmail = checkIsEmail(userNameInputState); // ok
    if (!isEmail) {
      error_username.current.innerText = "Trường này phải là email !";
    } else {
      error_username.current.innerText = "";
    }
  };

  // trường password
  const passwordInput = useRef();
  const error_pass = useRef();
  const [passwordInputState, setPasswordInputState] = useState("");
  const handlePasswordInput = (e) => {
    setPasswordInputState((prev) => e.target.value);
  };
  const handleOnBlurPasswordInput = () => {
    const isPassword = passwordInputState.length >= 6;
    if (!isPassword) {
      error_pass.current.innerText = "Mật khẩu phải lớn hơn 6 kí tự !";
    } else {
      error_pass.current.innerText = "";
    }
  };
  let navigate = useNavigate();
  // nut LogIn
  const handleLoginBtn = () => {
    const isEmail = checkIsEmail(userNameInputState); // ok
    const isPassword = passwordInputState.length >= 6;
    if (!isEmail)
      error_username.current.innerText = "Trường này phải là email !";
    if (!isPassword)
      error_pass.current.innerText = "Mật khẩu phải lớn hơn 6 kí tự !";
    if (isEmail && isPassword) {
      navigate(`/home?a=${passwordInputState}`);
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("form-container")}>
          <div className={cx("brand-logo")}></div>
          <div className={cx("brand-title")}>TWITTER</div>
          <div className={cx("inputs")}>
            <label className={cx("email-label")}>EMAIL</label>
            <input
              value={userNameInputState}
              onChange={handleUserNameInput}
              onBlur={handleOnBlurUsernameInput}
              ref={userNameInput}
              type="email"
              placeholder="example@test.com"
            />
            <div ref={error_username} className={cx("error-email")}></div>
            <div className={cx("pass-label")}>
              <label className={cx("password-text")}>PASSWORD</label>
              <Link className={cx("forgot")}>forgot password ?</Link>
            </div>
            <input
              value={passwordInputState}
              ref={passwordInput}
              onChange={handlePasswordInput}
              onBlur={handleOnBlurPasswordInput}
              type="password"
              placeholder="Min 6 charaters long"
            />
            <div ref={error_pass} className={cx("error-pass")}></div>
            <button className={cx("login")} onClick={handleLoginBtn}>
              LOGIN
            </button>
            <button
              className={cx("signup")}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
