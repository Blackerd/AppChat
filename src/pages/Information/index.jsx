import React, { useState } from 'react';
import styles from './styles.module.css';

function Information() {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');


    const handleChangeInfo = (fieldName, setValue) => {
        const currentValue = {
            number,
            password,
            email,
            name,

        }[fieldName];
        const newValue = prompt(`Nhập giá trị mới cho ${fieldName}:`, currentValue);
        if (newValue !== null && newValue !== '') {
            setValue(newValue);
        }
    };

    return (
        <div className={styles.contain}>
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.container}>
                    <div className={styles.logo}></div>
                    <div className={styles.avatar}>
                        <img className={styles.avatar} src="" alt="" />
                        <span className={styles.username}>{name}</span>
                    </div>
                </div>
                <div className={styles.function}>
                    <div className={styles['function-item']}>

                        <h4>Thông tin tài khoản</h4>
                        <span>Quản lý thông tin đăng nhập và thông tin cá nhân</span>

                    </div>

                    <div className={styles['function-item']}>
                        <h4>Bảo vệ tài khoản</h4>
                        <span>Hỗ trợ bảo vệ tài khoản</span>
                    </div>
                    <div className={styles['function-item']}>
                        <h4>Nhật kí hoạt động</h4>
                        <span>Lịch sử hoạt động của tài khoản</span>
                    </div>
                    <div className={styles['function-item']}>
                        <h4>Giấy phép</h4>
                        <span>Tải và chia sẻ giấy phép</span>
                    </div>
                    <div className={styles['function-item']}>
                        <h4>Đăng xuất</h4>
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
                        <span id="number">{number}</span>
                        <button onClick={() => handleChangeInfo('number', setNumber)}>Thay đổi</button>
                    </div>
                    <div className={styles['info-item']}>
                        <label htmlFor="password">Mật khẩu :</label>
                        <span id="password">{password}</span>
                        <button onClick={() => handleChangeInfo('password', setPassword)}>Thay đổi</button>
                    </div>
                    <div className={styles['info-item']}>
                        <label htmlFor="email">Email :</label>
                        <span id="email">{email}</span>
                        <button onClick={() => handleChangeInfo('email', setEmail)}>Thay đổi</button>
                    </div>
                </div>
                <div className={styles['title-info']}>
                    <h3>
                        Thông tin cá nhân
                        <button onClick={() => handleChangeInfo('name', setName)}>Thay đổi</button>
                    </h3>
                    <div className={styles['info-item']}>
                        <label htmlFor="name">Họ và Tên :</label>
                        <span id="name">{name}</span>
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
