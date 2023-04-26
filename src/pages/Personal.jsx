import React from 'react'
import PageHeader from "../components/PageHeader"
import styles from "../css/Personal.module.css"
import { useSelector,useDispatch } from 'react-redux'
import { Card, Image, Upload, Modal, Form, Input, Button } from "antd";
import PersonalInfoItem from '../components/PersonalInfoItem'
import { formatDate } from "../utils/tools";
import { PlusOutlined } from '@ant-design/icons';
import { updateUserInfoAsync } from "../redux/userSlice";

/**
 * 个人信息
 */
export default function Personal() {

    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch()

    function handleAvatar(newURL, key) {
        // 将仓库和服务器端的数据一起更新
        dispatch(updateUserInfoAsync({
            userId: userInfo._id,
            newInfo: {
                [key]: newURL
            }
        }))
    }
    return (
        <div>
            <PageHeader title="个人信息" />
            {/* 信息展示 */}
            <div className={styles.container}>
                {/* 基本信息 */}
                <div className={styles.row}>
                    <Card title="基本信息" extra={(<div className={styles.edit}>编辑</div>)}>
                    <PersonalInfoItem info={{ itemName: "登录账号", itemValue: userInfo.loginId }} />
                        <PersonalInfoItem info={{ itemName: "账号密码", itemValue: "**** **** ***" }} />
                        <PersonalInfoItem info={{ itemName: "用户昵称", itemValue: userInfo.nickname }} />
                        <PersonalInfoItem info={{ itemName: "用户积分", itemValue: userInfo.points }} />
                        <PersonalInfoItem info={{ itemName: "注册时间", itemValue: formatDate(userInfo.registerDate) }} />
                        <PersonalInfoItem info={{ itemName: "上次登录时间", itemValue: formatDate(userInfo.lastLoginDate) }} />
                        <div style={{ fontWeight: '100', height: '50px' }}>当前头像</div>
                        <Image src='https://inews.gtimg.com/newsapp_bt/0/13476339958/1000' width={100} />
                        <div style={{ fontWeight: '100', height: '50px' }}>上传新头像</div>
                        <Upload
                            action="/api/upload"
                            listType="picture-card"
                            maxCount={1}
                            onChange={(e) => {
                                if (e.file.status === "done") {
                                    // 说明上传完毕
                                    const url = e.file.response.data;
                                    // 处理用户头像的更新
                                    handleAvatar(url, 'avatar');
                                }
                            }}
                        >
                            <PlusOutlined />
                        </Upload>
                    </Card>
                </div>
                {/* 社交账号 */}
                <div className={styles.row}>
                    <Card title="社交账号" extra={(<div className={styles.edit}>编辑</div>)}></Card>
                </div>
                {/* 个人简介 */}
                <div className={styles.row}>
                    <Card title="个人简介" extra={(<div className={styles.edit}>编辑</div>)}></Card>
                </div>
            </div>
            {/* 修改信息的对话框 */}
        </div>
    )
}
