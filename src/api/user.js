import request from './request'

/**
 * 
 * @returns 获取验证码
 */
export function getCaptcha() {
    return request({
        url: 'res/captcha',
        method: 'GET',
    })
}


/**
 * 
 * @param {String} loginId 用户登录账号
 * @returns 
 */
export function userIsExit(loginId) {
    return request({
        url: `/api/user/userIsExist/${loginId}`,
        method: 'GET',
    })
}

/**
 * 用户注册
 * @param { Object } newUserInfo 用户注册信息
 * @returns 
 */
export function addUser(newUserInfo){
    return request({
        url: `/api/user`,
        method: 'POST',
        data: newUserInfo
    })
}

/**
 * 用户登录
 * @param {} loginInfo 登录信息
 * @returns 
 */
export function userLogin(loginInfo){
    return request({
        url: `/api/user/login`,
        method: 'POST',
        data: loginInfo
    })
}

/**
 * 根据 ID 获取用户信息
 * @param {String} id 
 * @returns 
 */
export function getUserById(id){
    return request({
        url: `/api/user/${id}`,
        method: 'GET',
    })
}


/**
 * 
 * 恢复登录状态
 */
export function getInfo(){
    return request({
        url: `/api/user/whoami`,
        method: 'GET',
    })
}