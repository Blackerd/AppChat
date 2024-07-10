import Styles from "./styles.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(Styles);
function ShowGroup(props) {
  return (
    <section className={cx("container")} onClick={props.onClick}>
      <div className={cx("group")}>
        <figure className={cx("holder")}>
          <img
            className={cx("holder-avatart")}
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
            srcset=""
          />
        </figure>
        <h4 className={cx("group__name")}>{props.nameGroup}</h4>
        <h5 className={cx("group_mess")}>asdasdasdasd</h5>
      </div>
    </section>
  );
}
export default ShowGroup;
