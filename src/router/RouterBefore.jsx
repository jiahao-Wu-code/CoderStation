import React from 'react'
import RouteConfig from '.'
import RouterBeforeConfig from './RouterBeforeConfig'
import { Alert } from 'antd'
// 路由导航守卫
export default function RouterBefore() {
    const currentPath = RouterBeforeConfig.find(item => item.path === location.pathname)
    function closeHandle() {
        location.pathname = "/";
    }

    if (currentPath) {
        if (currentPath.needLogin && !localStorage.getItem("userToken")) {
            return (
                <Alert
                    message="请先登录"
                    type="warning"
                    closable
                    onClose={closeHandle}
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px"
                    }}
                />
            )
        }
    }
    return (
        <RouteConfig />
    )
}
