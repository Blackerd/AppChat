import React from "react";
import Styles from "./styles.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

const ShowGroup = ({ nameGroup, onClick }) => {
  return (
      <div className={cx("friend")} onClick={onClick}>
        <div className={cx("friendItem")}>
          <div className={cx("item")}>
            <div className={cx("img")}>
              <img src="img/p2.jpg" alt="avatar"/>
            </div>
            <div className={cx("name")}>
              <div className={cx("info")}>
                <span>{nameGroup}</span>
                <span>{/* Thêm thời gian hoặc thông tin khác nếu cần */}</span>
              </div>
              <div className={cx("text")}>
                <span className={cx("message")}>asdasdasdasd</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ShowGroup;
