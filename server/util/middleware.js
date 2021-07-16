const { ALLOW_APP } = require('../config/app')
let redis = require('../util/redisDB')
const util = require('./common')

exports.checkAPP = (req, res, next) => {
    if (!ALLOW_APP.includes(req.headers.fapp)) {
        res.json(util.getReturnData(500, '请求来源不正确'))
    } else {
        next()
    }
}

//以中间件的形式判断Token是否有效
exports.checkUser = (req, res, next) => {
    console.log('检测用户登录情况')
    if ('token' in req.headers) {
        let key = req.headers.fapp + '_user_token_' + req.headers.token
        redis.get(key).then((data) => {
            if (data) {
                req.username = data.username
                next()
            } else {
                //key错误或登录过期->已经被自动删除
                res.json(util.getReturnData(403, '登录已经过期,请重新登录'))
            }
        })
    } else {
        res.json(util.getReturnData(403, '请登录'))
    }
}

exports.checkAdmin = (req, res, next) => { 
    console.log('检测管理员用户')
    if(req.username == 'admin'){
        //如果是管理员,则在Redis中增加一个power
        let key = req.headers.fapp + '_user_power_' + req.headers.token
        redis.set(key,'admin')
        next()
    }else{
        res.json(util.getReturnData(403,'权限不足'))
    }
}