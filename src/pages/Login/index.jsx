import classNames from "classnames/bind";
import { useEffect, useRef, useState, useCallback } from "react";
//
import useSocket from "../../hooks/useSocket";
import { Login } from "../../api/action";
//
import Styles from "./styles.module.css";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { isEmail, isPassValid } from "../../process/checkInput";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(Styles);
function LogIn() {
  const nav = useNavigate();
  //
  const { sender, lastJsonMessage, all } = useSocket();
  useEffect(() => {
    if (lastJsonMessage) {
      console.log(lastJsonMessage);
      nav("/home");
    }
  }, [lastJsonMessage]);
  //
  const [form, setForm] = useState({ email: "", password: "" });
  const handleOnChange = (e) => {
    setForm((pre) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };
  const inputEmail = useRef();
  const inputPass = useRef();

  const handleLoginBtn = () => {
    if (!isEmail(form.email)) {
      inputEmail.current.setError("Vui lòng nhập đúng email !!");
    }
    if (!isPassValid(form.password)) {
      inputPass.current.setError("Phải có ít nhất 6 kí tự");
    }
    if (isEmail(form.email) && isPassValid(form.password)) {
      // const data = { email: form.email, password: form.password };

      sender(Login(form.email, form.password), true);
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
              name="email"
              inputValue={form.email}
              placeholder="example@gmail.com"
              onChange={handleOnChange}
              onBlur={() =>
                !isEmail(form.email)
                  ? inputEmail.current.setError("Vui lòng nhập đúng email .")
                  : inputEmail.current.setError("")
              }
              ref={inputEmail}
            />
            <label htmlFor="password">Password </label>
            <InputComponent
              name="password"
              inputValue={form.password}
              placeholder="The PassWord must At least has 6 letter ."
              onChange={handleOnChange}
              onBlur={() =>
                !isPassValid(form.password)
                  ? inputPass.current.setError("Ít nhất phải có 6 kí tự .")
                  : inputPass.current.setError("")
              }
              ref={inputPass}
            />
          </form>
          <ButtonComponent title="Login " onClick={handleLoginBtn} />
          <ButtonComponent to="/signup" title="Sign Up" />
        </div>
      </section>
    </>
  );
}

export default LogIn;
