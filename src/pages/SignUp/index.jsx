import classNames from "classnames/bind";
import { useEffect, useRef, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Styles from "./Styles.module.css";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { isEmail, isPassValid, isConfirmPass } from "../../process/checkInput";
import { login as auth } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { REGISTER } from "../../api/action";
//
// gửi email và pass đi với REGISTER
// ở trạng thái chờ phản hồi
// khi nhận phản hồi thì kiểm tra phản hồi

//
const cx = classNames.bind(Styles);
function Signup() {
  const inputEmail = useRef(); // trường input email show lỗi
  const inputPass = useRef(); // trường input pass show lỗi
  const inputConfirm = useRef(); // trường input confirm show lỗi
  const nav = useNavigate();
  const dispatch = useDispatch();
  // //
  const [isREady, respone, sender] = useContext(WebsocketContext);

  // console.log(respone);
  // lúa này respone gửi về có 2 dạng
  // 1 nếu thành công
  // {event: 'REGISTER', status: 'success', data: 'Creating a successful account'}
  // 2 nếu trùng email user
  // {event: 'REGISTER', status: 'error', mes: 'Creating account error, Duplicate Username'}

  useEffect(() => {
    if (respone) {
      if (respone.status === "success") {
        respone.status = "";
        nav("/");
      } else if (respone.status === "error") {
        inputEmail.current.setError("Tài khoản đã tồn tại !!");
      }
    }
  }, [respone]);

  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const handleOnChange = (e) => {
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

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
      const register = REGISTER(form.email, form.password);
      sender(register, true);
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
