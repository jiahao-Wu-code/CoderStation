import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Input, Select, Space } from "antd";
import LoginAvatar from './LoginAvatar';
import { useNavigate } from 'react-router-dom';

function PageHeader(props) {
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
    const navigate = useNavigate()

    const [searchOption, setSearchOption] = useState('issue')

    function onSearch(value) {
        if (value) {
            // 搜索框有内容，需要进行搜索操作
            navigate('/searchPage', {
                state: {
                    value,
                    searchOption
                }
            })
        } else {
            // 搜索框没有内容，跳转到首页
            navigate("/");
        }
    }

    function onChange(val) {
        setSearchOption(val)
    }


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
                    <Select defaultValue="问答" options={options} size="large" onChange={onChange} />
                    <Input.Search placeholder="请输入要搜索的内容" allowClear
                        enterButton="搜索"
                        size="large"
                        style={{
                            width: "80%"
                        }}
                        onSearch={onSearch}
                    />
                </Space.Compact>
            </div>
            {/* 登录按钮 */}
            <div className="loginBtnContainer">
                <LoginAvatar loginHandle={props.loginHandle} />
            </div>
        </div>
    );
}

export default PageHeader;