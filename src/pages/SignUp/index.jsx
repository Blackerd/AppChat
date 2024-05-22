import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Styles from "./Styles.module.css";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { isEmail, isPassValid, isConfirmPass } from "../../process/checkInput";
//
import { REGISTER } from "../../api/action";
//
const cx = classNames.bind(Styles);
function Signup() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const handleOnChange = (e) => {
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const inputEmail = useRef();
  const inputPass = useRef();
  const inputConfirm = useRef();

  const handleSigninBtn = (e) => {
    if (!isEmail(form.email)) {
      inputEmail.current.setError("Vui lòng nhập đúng email !!");
    }
    if (!isPassValid(form.password)) {
      inputPass.current.setError("Phải có ít nhất 6 kí tự");
    }
    if (!isConfirmPass(form.confirm, form.password)) {
      inputConfirm.current.setError("Mật khẩu xác thực không đúng !!");
      return;
    }
    if (isEmail(form.email) && isPassValid(form.password)) {
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
            <label htmlFor="password">Password</label>
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
            <label htmlFor="password">Confirm PassWord</label>
            <InputComponent
              name="confirm"
              type="password"
              inputValue={form.confirm}
              placeholder="Confirm your Password ."
              onChange={handleOnChange}
              onBlur={() =>
                !isConfirmPass(form.confirm, form.password)
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

export default Signup;
