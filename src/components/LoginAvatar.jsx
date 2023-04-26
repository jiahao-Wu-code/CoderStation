import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, List, Popover, Avatar } from 'antd';
import styles from '../css/LoginAvatar.module.css'
import { clearUserInfo, changeLoginStatus } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginAvatar(props) {
    const { isLogin } = useSelector(state => state.user)
    const avatarUrl = 'https://inews.gtimg.com/newsapp_bt/0/13476339958/1000'
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 点击 退出登录 / 个人中心
    function listClickHandle(item) {
        if (item === '个人中心') {
            navigate('/personal')
        } else {
            // 退出登录
            // 清除 token
            localStorage.removeItem('userToken');
            // 清除 仓库登录状态
            dispatch(clearUserInfo)
            dispatch(changeLoginStatus(false))
            navigate('/')
        }
    }
    let loginStatus = null;
    if (isLogin) {
        const content = (
            <List
                dataSource={["个人中心", "退出登录"]}
                size="large"
                renderItem={(item) => {
                    return (
                        <List.Item style={{ cursor: "pointer" }} onClick={() => listClickHandle(item)}>{item}</List.Item>
                    )
                }}
            />
        );
        loginStatus = (
            <Popover content={content} trigger="hover" placement="bottom">
                <div className={styles.avatarContainer}>
                    <Avatar src={avatarUrl} size="large" />
                </div>
            </Popover>
        );
    } else {
        loginStatus = (<Button type="primary" onClick={props.loginHandle}>注册/登录</Button>)
    }
    return (
        <div>
            {loginStatus}
        </div>
    )
}
