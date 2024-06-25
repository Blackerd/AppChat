import classNames from "classnames/bind";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setName, setEmail } from "../../store/userSlice";
//
import Styles from "./styles.module.css";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { isEmail, isPassValid } from "../../process/checkInput";
import { useNavigate } from "react-router-dom";
import { GET_USER_LIST, Login } from "../../api/action";
import { WebsocketContext } from "../../socket/WebsocketContent";
import { convertEmailToName } from "../../process/processString";
import BouncyComponent from "../../components/animation/bouncy";

// gửi email và pass đi với Login
// ở trạng thái chờ phản hồi
// khi nhận phản hồi thì kiểm tra phản hồi
const cx = classNames.bind(Styles);
function LogIn() {
  const inputEmail = useRef(); // trường input email show lỗi
  const inputPass = useRef(); // trường input pass show lỗi
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isReady, respone, sender] = useContext(WebsocketContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const handleOnChange = (e) => {
    setForm((pre) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  // const [allVal, setAllVal] = useState(respone);
  // console.log(allVal);
  // lúa này respone gửi về có 2 dạng
  // 1 nếu thành công
  // {event: 'LOGIN', status: 'success', data: {RE_LOGIN_CODE: 'nlu_1796764489'}}
  // 2 nếu trùng email user
  // {event: 'LOGIN', status: 'error', mes: 'Login error, Wrong Username or Password'}
  // 3 nếu nhấn quá nhiều
  // {event: 'LOGIN', status: 'error', mes: 'You are already logged in'}
  useEffect(() => {
    if (respone && respone.status === "success") {
      let name = convertEmailToName(form.email);
      dispatch(setName(name));
      dispatch(setEmail(form.email));
      sender(GET_USER_LIST());
      nav("/home");
    } else if (respone && respone.status === "error") {
      inputEmail.current.setError("Email hoặc password không đúng");
    }
  }, [respone]);

  const handleLoginBtn = () => {
    if (!isEmail(form.email)) {
      inputEmail.current.setError("Vui lòng nhập đúng email !!");
    }
    if (!isPassValid(form.password)) {
      inputPass.current.setError("Phải có ít nhất 6 kí tự");
    }
    if (isEmail(form.email) && isPassValid(form.password)) {
      const login = Login(form.email, form.password);
      sender(login, true);
    }
  };
  return isReady ? (
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
  ) : (
    <BouncyComponent></BouncyComponent>
  );
}

export default LogIn;
