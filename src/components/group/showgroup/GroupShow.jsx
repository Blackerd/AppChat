import Styles from "./styles.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(Styles);
function ShowGroup(props) {
  return (
    <section className={cx("container")} onClick={props.onClick}>
      <div className={cx("group")}>
        <h4 className={cx("group__name")}>{props.nameGroup}</h4>
        <div className={cx("group_mess")}></div>
      </div>
    </section>
  );
}
export default ShowGroup;
