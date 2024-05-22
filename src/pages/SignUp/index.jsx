import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Styles.module.css";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { isEmail, isPassValid, isConfirmPass } from "../../process/checkInput";
const cx = classNames.bind(Styles);
function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setCofirm] = useState("");

  const inputEmail = useRef();
  const inputPass = useRef();
  const inputConfirm = useRef();
  const handleEmailOnChange = (e) => {
    setEmail((prev) => {
      return e.target.value;
    });
  };
  const handlePassOnChange = (e) => {
    setPass((prev) => {
      return e.target.value;
    });
  };

  const handleConfirmOnChange = (e) => {
    setCofirm((prev) => {
      return e.target.value;
    });
  };

  const handleSigninBtn = (e) => {
    if (!isEmail(email)) {
      inputEmail.current.setError("Vui lòng nhập đúng email !!");
    }
    if (!isPassValid(pass)) {
      inputPass.current.setError("Phải có ít nhất 6 kí tự");
    }
    if (!isConfirmPass(confirm, pass)) {
      inputConfirm.current.setError("Mật khẩu xác thực không đúng !!");
    }
    if (isEmail(email) && isPassValid(pass)) {
      console.log("gui respeut ok !!!!!");
    }
  };

  return (
    <>
      <section className={cx("container")}>
        <div className={cx("form-container")}>
          <div className={cx("brand-logo")}></div>
          <div className={cx("brand-title")}>TWITTER</div>
          <form className={cx("inputs")}>
            <label htmlFor="email">Email</label>
            <InputComponent
              typeOf="text"
              id="email"
              inputValue={email}
              placeholder="example@gmail.com"
              onChange={handleEmailOnChange}
              onBlur={() =>
                !isEmail(email)
                  ? inputEmail.current.setError("Vui lòng nhập đúng email .")
                  : inputEmail.current.setError("")
              }
              ref={inputEmail}
            />
            <label htmlFor="password">Password</label>
            <InputComponent
              typeOf="password"
              id="password"
              inputValue={pass}
              placeholder="The PassWord must At least has 6 letter ."
              onChange={handlePassOnChange}
              onBlur={() =>
                !isPassValid(pass)
                  ? inputPass.current.setError("Ít nhất phải có 6 kí tự .")
                  : inputPass.current.setError("")
              }
              ref={inputPass}
            />
            <label htmlFor="password">Confirm PassWord</label>
            <InputComponent
              typeOf="password"
              id="password"
              inputValue={confirm}
              placeholder="Confirm your Password ."
              onChange={handleConfirmOnChange}
              onBlur={() =>
                !isConfirmPass(confirm, pass)
                  ? inputConfirm.current.setError(
                      "Mật khâu xác thực không đúng !"
                    )
                  : inputConfirm.current.setError("")
              }
              ref={inputConfirm}
            />
          </form>
          <ButtonComponent title="Sign Up" onClick={handleSigninBtn} />
          <Link className={cx("link")} to="/">
            Did you have an account? Sign in
          </Link>
        </div>
      </section>
    </>
  );
}
// const query = useQuery();
// const searchQuery = query.get("a");
// console.log(typeof searchQuery);

export default Signup;
