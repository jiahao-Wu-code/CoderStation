import React from 'react'
import { Modal, Radio, Form, Input, Button, Row, Col, Checkbox, message } from "antd";
import styles from '../css/LoginForm.module.css'
import { useState, useRef, useEffect, } from 'react'
import { getCaptcha, userIsExit, addUser } from '../api/user';
import { initUserInfo, changeLoginStatus } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function LoginForm(props) {
    const [value, setValue] = useState(1)
    const dispatch = useDispatch();

    // 登录表单的状态数据
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });

    // 注册表单的状态数据
    const [registerInfo, setRegisterInfo] = useState({
        loginId: "",
        nickname: "",
        captcha: "",
    })

    const [captcha, setCaptcha] = useState(null);
    async function captchaClickHandle() {
        const result = await getCaptcha();
        setCaptcha(result);
    }
    useEffect(() => {
        captchaClickHandle()
    }, [props.isModalOpen])
    const loginFormRef = useRef();
    const registerFormRef = useRef();


    function loginHandle() { }

    // 注册逻辑
    async function registerHandle() {
        const res = await addUser(registerInfo);
        console.log("42>>>>", res);
        if (res.code === 0) {
            message.success("用户注册成功，默认密码为：123456")
            // 将用户信息更新到数据仓库中
            dispatch(initUserInfo(res.data))
            // 改变登录状态
            dispatch(changeLoginStatus(true))
            // 关闭弹窗
            handleCancel()
        } else {
            message.warning(res.msg)
            captchaClickHandle()
        }
    }

    // 关闭弹窗 表单内容清空
    function handleCancel() {
        setRegisterInfo({
            loginId: '',
            nickname: '',
            captcha: '',
        })
        setLoginInfo({
            loginId: '',
            loginPwd: '',
            captcha: '',
            remember: false
        })
        props.closeModal()
    }

    /**
     * @param {*} oldInfo 之前整体的状态
     * @param {*} newContent 用户输入的新的内容
     * @param {*} key 对应的键名
     * @param {*} setInfo 修改状态值的函数
     */
    function updateInfo(oldInfo, newContent, key, setInfo) {
        const obj = { ...oldInfo };
        obj[key] = newContent;
        setInfo(obj);
    }

    /**
     * 验证用户是否存在
     */
    async function checkLoginIdIsExist() {
        if (registerInfo.loginId) {
            const { data } = await userIsExit(registerInfo.loginId);
            console.log("data", data);
            // 该 loginId 已经注册过了
            if (data) {
                return Promise.reject("该用户已经注册过了");
            }
        }
    }




    function onChange(e) {
        setValue(e.target.value)
        captchaClickHandle();
    }
    function handleOk() {

    }


    // 登录注册表单

    let container = null;
    if (value === 1) {
        // 登录面板的 JSX
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    ref={loginFormRef}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    } else {
        // 注册面板的 JSX
        container = (
            <div className={styles.container}>
                <Form
                    name="basic2"
                    autoComplete="off"
                    ref={registerFormRef}
                    onFinish={registerHandle}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号，仅此项为必填项",
                            },
                            // 验证用户是否已经存在
                            { validator: checkLoginIdIsExist },
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input
                            placeholder="请输入账号"
                            value={registerInfo.loginId}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="请输入昵称，不填写默认为新用户xxx"
                            value={registerInfo.nickname}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="registercaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={registerInfo.captcha}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    // 渲染 验证码
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            注册
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }


    return (
        <div>
            <Modal title="注册 / 登录" open={props.isModalOpen} onOk={handleOk} onCancel={props.closeModal}>
                <Radio.Group
                    className={styles.radioGroup}
                    value={value}
                    onChange={onChange}
                    buttonStyle='solid'
                >
                    <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                    <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
                </Radio.Group>
                {/* 下面需要显示对应功能的表单 */}
                {container}
            </Modal>
        </div>
    )
}
