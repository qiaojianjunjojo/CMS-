let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

//用户注册Api
exports.userRegister = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let ip = req.ip
    if (username || password) {
        let key = 'book_user_info_' + username
        redis.get(key).then((user) => {
            if (user) {
                res.json(util.getReturnData(1, '用户已经存在'))
            } else {
                let userData = {
                    phone: 'phone' in req.body ? req.body.phone : '未知',
                    nikename: 'nikename' in req.body ? req.body.nikename : '未知',
                    age: 'age' in req.body ? req.body.age : '未知',
                    sex: 'sex' in req.body ? req.body.sex : '未知',
                    ip: ip,
                    username: username,
                    password: password,
                    login: 0  //用户是否被封停
                }
                redis.set(key, userData)
                res.json(util.getReturnData(0, '注册成功,请登录'))
            }
        })

    } else {
        res.json(util.getReturnData(1, '资料不完整'))
    }
}

//用户登录Api
exports.userLogin = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    let key = req.headers.fapp + '_user_info_' + username
    redis.get(key).then((data) => {
        if (data) {
            if (data.login == 0) {
                if (data.password != password) {
                    res.json(util.getReturnData(1, '用户名或者密码错误'))
                } else {
                    //生成Token 根据用户名和当前时间戳 生成MD5值
                    let token = crypto.createHash('md5').update(Date.now() + username).digest('hex')
                    let tokenKey = req.headers.fapp + '_user_token_' + token
                    delete data.password
                    redis.set(tokenKey, data)
                    redis.expire(tokenKey, 60*60*4) //设置过期时间 4小时 :单位秒
                    res.json(util.getReturnData(0, '登录成功', { token: token }))
                }
            } else {
                res.json(util.getReturnData(1, '用户被封停'))
            }
        } else {
            res.json(util.getReturnData(1, '用户名或者密码错误'))
        }
    })
}