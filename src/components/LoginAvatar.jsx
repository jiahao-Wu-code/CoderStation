import React from 'react'
import { useSelector } from 'react-redux'
import { Button, List, Popover, Avatar } from 'antd';
import styles from '../css/LoginAvatar.module.css'

export default function LoginAvatar(props) {
    const { isLogin } = useSelector(state => state.user)
    const avatarUrl = 'https://inews.gtimg.com/newsapp_bt/0/13476339958/1000'
    let loginStatus = null;
    if (isLogin) {
        const content = (
            <List
                dataSource={['个人中心', '退出登录']}
                renderItem={(item) => {
                    return (<List.Item style={{ cursor: 'pointer' }}>{item}</List.Item>)
                }}
                size='large'
            />
        )
        loginStatus = (
            <Popover content={content} trigger='hover'>
                <div className={styles.avatarContainer}>
                    <Avatar size='large' src={avatarUrl}/>
                </div>
            </Popover>
        )
    } else {
        loginStatus = (<Button type="primary" onClick={props.loginHandle}>注册/登录</Button>)
    }
    return (
        <div>
            {loginStatus}
        </div>
    )
}
