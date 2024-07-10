import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import React from "react";
import {FaArrowLeft} from "react-icons/fa";


function Information() {

    const navigate = useNavigate();

    const handleLogout = () => {


        navigate('/home');
    };
    const informationForward = () =>{
        navigate('/info');
    }

    const protectAccForward = () =>{
        navigate('/acc_protect');
    }


    const historyForward = () =>{
        navigate('/history');
    }


    const changeEmail=()=>{
        navigate('/email')
    }
    const changePassword=()=>{
        navigate('/pass')
    }

    const changeNumber=()=>{
        navigate('/number')

    }

    const changeInfo=()=>{
        navigate('/personalinfo')

    }




    return (
        <div className={styles.contain}>
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.container}>
                    <div className={styles.avatar}>

                        <div className={styles['back-arrow']} onClick={() => navigate('/home')}>
                            &#8592; {}
                        </div>
                        <img
                            className={styles.avatar}
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="Avatar"
                        /></div>
                </div>
                <div className={styles.function}>
                    <div className={styles['function-item']} onClick={informationForward}>

                        <h4>Thông tin tài khoản</h4>
                        <span>Quản lý thông tin đăng nhập và thông tin cá nhân</span>

                    </div>

                    <div className={styles['function-item']} onClick={protectAccForward}>
                        <h4>Bảo vệ tài khoản</h4>
                        <span>Hỗ trợ bảo vệ tài khoản</span>
                    </div>
                    <div className={styles['function-item']} onClick={historyForward}>
                        <h4>Nhật kí hoạt động</h4>
                        <span>Lịch sử hoạt động của tài khoản</span>
                    </div>


                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.title}>
                    <h2>Thông Tin Tài Khoản</h2>
                </div>
                <div className={styles['title-info']}>
                    <h3>Thông tin đăng nhập</h3>
                    <div className={styles['info-item']}>
                        <label htmlFor="number">Số điện thoại :</label>
                        <button onClick={changeNumber}>Thay đổi</button>
                    </div>
                    <div className={styles['info-item']}>
                        <label htmlFor="password">Mật khẩu :</label>
                        <button onClick={changePassword}>Thay đổi</button>
                    </div>
                    <div className={styles['info-item']} >
                        <label htmlFor="email" >Email :</label>
                        <button onClick={changeEmail}>Thay đổi</button>
                    </div>
                </div>
                <div className={styles['title-info']}>
                    <h3>
                        Thông tin cá nhân
                        <button onClick={changeInfo}>Thay đổi</button>
                    </h3>
                    <div className={styles['info-item']}>
                        <label htmlFor="name">Họ và Tên :</label>
                    </div>
                    <div className={styles['info-item']}>
                        <label htmlFor="sex">Giới tính :</label>
                    </div>
                    <div className={styles['info-item']}>
                        <label htmlFor="dob">Ngày sinh :</label>
                    </div>
                    <div className={styles['info-item']}>
                        <label htmlFor="address">Địa chỉ :</label>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
}

export default Information;
