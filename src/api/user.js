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

export function addUser(newUserInfo){
    return request({
        url: `/api/user`,
        method: 'POST',
        data: newUserInfo
    })
}