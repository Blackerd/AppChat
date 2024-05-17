import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Styles from "./Styles.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);
function SignUp() {
  const checkIsEmail = (userName) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!userName || regex.test(userName) === false);
  };
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const error_email = useRef();
  const error_pass = useRef();
  const error_pass_confirm = useRef();

  const handleEmail = (e) => {
    setEmail((prev) => e.target.value);
  };
  const handlePassWord = (e) => {
    setPassword((prev) => e.target.value);
  };
  const handleConfirmPass = (e) => {
    setConfirmPass((prev) => e.target.value);
  };

  const handleOnBlurEmail = () => {
    const isEmail = checkIsEmail(email);
    if (!isEmail) {
      error_email.current.innerText = "Trường này phải là email !";
    } else {
      error_email.current.innerText = "";
    }
  };
  const handleOnBlurPassWord = () => {
    const isPassword = password.length >= 6;
    if (!isPassword) {
      error_pass.current.innerText = "Mật khẩu phải lớn hơn 6 kí tự !";
    } else {
      error_pass.current.innerText = "";
    }
  };
  const handleOnBlurConfirmPassWord = () => {
    if (confirmPass && confirmPass !== password) {
      error_pass_confirm.current.innerText = "Mật khẩu xác thực không đúng !";
    } else {
      error_pass_confirm.current.innerText = "";
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("form-container")}>
          <div className={cx("brand-logo")}></div>
          <div className={cx("brand-title")}>TWITTER</div>
          <div className={cx("inputs")}>
            <label htmlFor="email" className={cx("email-label")}>
              EMAIL
            </label>
            <input
              value={email}
              onChange={handleEmail}
              onBlur={handleOnBlurEmail}
              id="email"
              type="email"
              placeholder="example@test.com"
            />
            <div ref={error_email} className={cx("error-email")}></div>
            <label htmlFor="password" className={cx("password-text")}>
              PASSWORD
            </label>
            <input
              value={password}
              onChange={handlePassWord}
              onBlur={handleOnBlurPassWord}
              id="password"
              type="password"
              placeholder="Min 6 charaters long"
            />
            <div ref={error_pass} className={cx("error-pass")}>
              {" "}
            </div>
            <label htmlFor="confirmPass" className={cx("password-text")}>
              Confirm Password
            </label>
            <input
              value={confirmPass}
              onChange={handleConfirmPass}
              onBlur={handleOnBlurConfirmPassWord}
              id="confirmPass"
              type="password"
              placeholder="Min 6 charaters long"
            />
            <div
              ref={error_pass_confirm}
              className={cx("error-pass-confirm")}
            ></div>
            <button
              className={cx("signupBtn")}
              onClick={() => {
                if (
                  checkIsEmail(email) &&
                  password.length >= 6 &&
                  confirmPass === password
                ) {
                  navigate(-1);
                } else {
                  error_pass_confirm.current.innerText =
                    "Mật khẩu xác thực không đúng !";
                  error_pass.current.innerText =
                    "Mật khẩu phải lớn hơn 6 kí tự !";
                  error_email.current.innerText = "Trường này phải là email !";
                }
              }}
            >
              Sign Up
            </button>
            <Link to={`/`} className={cx("hasAccount")}>
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
