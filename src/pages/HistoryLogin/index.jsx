import React, { useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; // Sử dụng React Router

const History = () => {
    const [filter, setFilter] = useState('Tất cả');
    const navigate = useNavigate();

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const activities = [
        { action: 'Đăng nhập', time: '12/05/2024 08:30 AM', browser: 'Chrome', device: 'Máy tính', ip: '111.111.111' },
        { action: 'Đăng xuất', time: '20/05/2024 09:30 AM', browser: 'Firefox', device: 'Samsung J7-Prime', ip: '222.222.222' },
        { action: 'Đăng nhập', time: '12/05/2023 09:30 AM', browser: 'Chrome', device: 'IPhone', ip: '222.222.222' },
        { action: 'Đăng nhập', time: '12/05/2023 09:30 AM', browser: 'Brave', device: 'Máy tính', ip: '222.222.222' },
        { action: 'Đăng xuất', time: '12/05/2023 09:30 AM', browser: 'Microsoft Edge', device: 'Máy tính', ip: '222.222.222' },
    ];
    const handleLogout = () => {
        // Xóa thông tin đăng nhập khỏi localStorage hoặc gọi API để đăng xuất
        localStorage.removeItem('token');

        // Điều hướng về trang đăng nhập
        navigate('/');
    };

    const protectAccForward = () =>{
        navigate('/acc_protect');
    }
    const informationForward = () =>{
        navigate('/info');
    }


    const historyForward = () =>{
        navigate('/history');
    }


    const filteredActivities = activities.filter(activity =>
        filter === 'Tất cả' || activity.action === filter
    );

    return (
        <div className={styles.contain}>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.container}>
                        <div className={styles.logo}></div>
                        <div className={styles.avatar}>
                            <img className={styles['avatar-image']} src="" alt="" />
                            <span className={styles.username}></span>
                        </div>
                    </div>
                    <div className={styles.function}>
                        <div className={styles['function-item']} onClick={informationForward}>
                            <h4>Thông tin tài khoản</h4>
                            <span>Quản lý thông tin đăng nhập và thông tin cá nhân</span>
                        </div>
                        <div className={styles['function-item'] } onClick={protectAccForward}>
                            <h4>Bảo vệ tài khoản</h4>
                            <span>Hỗ trợ bảo vệ tài khoản</span>
                        </div>
                        <div className={styles['function-item']} onClick={historyForward}>
                            <h4>Nhật kí hoạt động</h4>
                            <span>Lịch sử hoạt động của tài khoản</span>
                        </div>

                        <div className={styles['function-item'] } onClick={handleLogout}>
                            <h4>Đăng xuất</h4>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.title}>
                        <h2>Nhật ký hoạt động</h2>
                    </div>
                    <div className={styles['filter-container']}>
                        <label htmlFor="filter-select">Lọc theo:</label>
                        <select id="filter-select" className={styles['filter-select']} onChange={handleFilterChange}>
                            <option value="Tất cả">Tất cả</option>
                            <option value="Đăng nhập">Đăng nhập</option>
                            <option value="Đăng xuất">Đăng xuất</option>
                        </select>
                    </div>
                    <div className={styles['activity-log-header']}>
                        <div className={styles['activity-header-item']}>Hành động</div>
                        <div className={styles['activity-header-item']}>Thời gian</div>
                        <div className={styles['activity-header-item']}>Trình duyệt</div>
                        <div className={styles['activity-header-item']}>Thiết bị</div>
                        <div className={styles['activity-header-item']}>Địa chỉ IP</div>
                    </div>
                    <div className={styles['activity-log']}>
                        {filteredActivities.map((activity, index) => (
                            <div key={index} className={styles['activity-item']}>
                                <div className={styles['activity-icon']}></div>
                                <div className={styles['activity-details']}>
                                    <div className={styles['activity-details-item']}>{activity.action}</div>
                                    <div className={styles['activity-details-item']}>{activity.time}</div>
                                    <div className={styles['activity-details-item']}>{activity.browser}</div>
                                    <div className={styles['activity-details-item']}>{activity.device}</div>
                                    <div className={styles['activity-details-item']}>{activity.ip}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
