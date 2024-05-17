import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import Styles from "./styles.module.css";
import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { isEmail, isPassValid } from "../../process/checkInput";
const cx = classNames.bind(Styles);
function LogIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const inputEmail = useRef();
  const inputPass = useRef();
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

  const handleLoginBtn = (e) => {
    if (!isEmail(email)) {
      inputEmail.current.setError("Vui lòng nhập đúng email !!");
    }
    if (!isPassValid(pass)) {
      inputPass.current.setError("Phải có ít nhất 6 kí tự");
    }
    if (isEmail(email) && isPassValid(pass)) {
      console.log("gui respeut ok !!!!!");
    }
  };
  const handleSigninBtn = () => {};
  return (
    <>
      <section className={cx("container")}>
        <div className={cx("form-container")}>
          <div className={cx("brand-logo")}></div>
          <div className={cx("brand-title")}>TWITTER</div>
          <form className={cx("inputs")}>
            <label htmlFor="email">Email</label>
            <InputComponent
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
          </form>
          <ButtonComponent title="Login " onClick={handleLoginBtn} />
          <ButtonComponent title="Sign In" onClick={handleSigninBtn} />
        </div>
      </section>
    </>
  );
}
// const query = useQuery();
// const searchQuery = query.get("a");
// console.log(typeof searchQuery);

//       // navigate(`/home?a=${passwordInputState}`);
//       // gửi dữ liệu cho server
//       // fetch(
//       //   `http://localhost:8080/api/user?email=${userNameInputState}&password=${passwordInputState}`
//       // )
//       //   .then((response) => {
//       //     if (!response.ok) {
//       //       throw new Error(
//       //         "Network response was not ok " + response.statusText
//       //       );
//       //     }
//       //     return response.json();
//       //   })
//       //   .then((data) => {
//       //     console.log(data); // Dữ liệu từ server
//       //     console.log("data was send");
//       //   })
//       //   .catch((error) => {
//       //     console.error("There was a problem with the fetch operation:", error);
//       //   });

//       // Dữ liệu gửi đi
//       const data = {
//         email: userNameInputState,
//         pass: passwordInputState,
//       };

//       // Gửi yêu cầu POST bằng fetch
//       fetch("http://localhost:8080/api/save", {
//         method: "POST", // Thiết lập phương thức là POST
//         headers: {
//           "Content-Type": "application/json", // Đặt header Content-Type
//         },
//         body: JSON.stringify(data), // Chuyển dữ liệu thành chuỗi JSON
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(
//               "Network response was not ok " + response.statusText
//             );
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("Success:", data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   };

export default LogIn;
