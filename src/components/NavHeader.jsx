import React from 'react';
import { NavLink } from "react-router-dom";
import { Input, Select, Button, Space } from "antd";

function PageHeader() {
    const options = [
        {
            label: '问答',
            value: 'issue',
        },
        {
            label: '书籍',
            value: 'book',
        },
    ]
    return (
        <div className="headerContainer">
            {/* 头部 logo */}
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            {/* 头部导航 */}
            <nav className="navContainer">
                <NavLink to="/" className="navgation">问答</NavLink>
                <NavLink to="/books" className="navgation">书籍</NavLink>
                <NavLink to="/note" className="navgation">笔记</NavLink>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Space.Compact>
                    <Select defaultValue="问答" options={options} size="large" />
                    <Input.Search placeholder="请输入要搜索的内容" allowClear
                        enterButton="搜索"
                        size="large"
                        style={{
                            width: "80%"
                        }} />
                </Space.Compact>
            </div>
            {/* 登录按钮 */}
            <div className="loginBtnContainer">
                <Button type="primary" size="large">注册/登录</Button>
            </div>
        </div>
    );
}

export default PageHeader;