import React, { useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Sử dụng React Router


const AccountProtection = () => {
    const [toggleState, setToggleState] = useState(false);
    const navigate = useNavigate();

    const protectAccForward = () =>{
        navigate('/acc_protect');
    }
    const informationForward = () =>{
        navigate('/info');
    }


    const historyForward = () =>{
        navigate('/history');
    }


    const handleChangeInfo = (fieldId) => {
        const currentValue = document.getElementById(fieldId).textContent;
        const newValue = prompt(`Nhập giá trị mới cho ${fieldId}:`, currentValue);
        if (newValue !== null && newValue !== '') {
            document.getElementById(fieldId).textContent = newValue;
        }
    };
    const handleLogout = () => {
        // Xóa thông tin đăng nhập khỏi localStorage hoặc gọi API để đăng xuất
        localStorage.removeItem('token');

        // Điều hướng về trang đăng nhập
        navigate('/');
    };
    const handleToggleChange = () => {
        setToggleState(!toggleState);
    };

    return (
        <div className={styles.contain}>

        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.container}>
                    <div className={styles.logo}></div>
                    <div className={styles.avatar}>
                        <img className={styles.avatar} src="" alt="" />
                        <span className={styles.username}></span>
                    </div>
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
                    <div className={styles['function-item']} onClick={handleLogout}>
                            <h4>Đăng xuất</h4>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.title}>
                    <h2>Bảo vệ Tài Khoản</h2>
                </div>
                <div className={styles['title-info']}>
                    <h3>Khôi phục tài khoản</h3>
                    <div className={styles['info-item']}>
                        <label htmlFor="">Số CMND/Thẻ căn cước :</label>
                        <span id="identityNumber" onClick={() => handleChangeInfo('identityNumber')}>
                       </span>
                    </div>

                    <div className={styles['info-item']}>
                        <label>Ngày cấp :</label>

                    </div>
                    <div className={styles['info-item']}>
                        <label>Nơi cấp :</label>

                    </div>
                    <div className={styles['info-item']}>
                        <label>Số điện thoại :</label>

                    </div>
                    <div className={styles['info-item']}>
                        <label>Email :</label>

                    </div>
                </div>
                <div className={styles['title-info']}>
                <h3>Xác thực hai yếu tố</h3>
                </div>
                <div className={styles['toggle-switch']}>
                    <input type="checkbox" id="toggleSwitch" checked={toggleState} onChange={handleToggleChange} />
                    <label htmlFor="toggleSwitch">
                        <span className={styles['switch-label']}>{toggleState ? 'Bật' : 'Tắt'}</span>
                    </label>
                </div>
            </div>
        </div>
        </div>
    );
};


export default AccountProtection;