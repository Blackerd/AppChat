import Styles from "./styles.module.css";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
const cx = classNames.bind(Styles);

function ButtonComponent(props) {
  return (
    <>
      <button className={cx("btn")} onClick={props.onClick}>
        {props.title}
      </button>
    </>
  );
}

export default ButtonComponent;
