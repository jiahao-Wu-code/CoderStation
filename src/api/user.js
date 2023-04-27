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
export function addUser(newUserInfo) {
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
export function userLogin(loginInfo) {
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
export function getUserById(id) {
    return request({
        url: `/api/user/${id}`,
        method: 'GET',
    })
}


/**
 * 
 * 恢复登录状态
 */
export function getInfo() {
    return request({
        url: `/api/user/whoami`,
        method: 'GET',
    })
}


/**
 * 获取积分前十的用户
 */
export function getUserByPointsRank() {
    return request({
        url: "/api/user/pointsrank",
        method: "GET",
    })
}

/**
 * 根据 id 修改用户
 */
export function editUser(userId, newUserInfo) {
    return request({
        url: `/api/user/${userId}`,
        method: "PATCH",
        data: newUserInfo
    })
}

/**
 * 验证用户账号密码是否正确
 */
export function checkPassword(userId, loginPwd){
    return request({
      url : "/api/user/passwordcheck",
      method : "POST",
      data : {
        userId,
        loginPwd
      }
    })
  }