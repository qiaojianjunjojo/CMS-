let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

exports.articleTalk = (req, res, next) => {
    if ('a_id' in req.body && 'talk' in req.body) {
        let talk = { talk: req.body.talk, time: Date.now(), username: req.username }
        let key = req.headers.fapp + '_article_' + req.body.a_id + '_talk'
        redis.get(key).then((data) => {
            let tData = []
            if (data) {
                data.push(talk)
                redis.set(key, data)
            } else {
                tData.push(talk)
                redis.set(key, tData)
            }
            res.json(util.getReturnData(0, '评论成功'))
        })
    } else {
        res.json(util.getReturnData(1, '评论错误'))
    }
}
//获取文章分类列表
exports.getArticleType = (req, res, next) => {
    redis.get('book_a_type').then((data) => {
        res.json(util.getReturnData(0, '', data))
    })
}

exports.getUserInfo = (req, res, next) => {
    let key = req.headers.fapp + '_user_info_' + req.params.username
    redis.get(key).then((data) => {
        if (data) {
            if (req.params.username == req.username) {
                //查看自己的资料
                delete data.password
            } else {
                //查看他人的资料
                delete data.password
                delete data.phone
            }
            res.json(util.getReturnData(0, '', data))
        } else {
            res.json(util.getReturnData(1, '用户不存在'))
        }
    })
}

exports.changeUserInfo = (req, res, next) => {
    let key = req.headers.fapp + '_user_info_' + req.username
    redis.get(key).then((data) => {
        if (data) {
            let userData = {
                username: req.username,
                phone: 'phone' in req.body ? req.body.phone : data.phone,
                nikename: 'nikename' in req.body ? req.body.nikename : data.nikename,
                age: 'age' in req.body ? req.body.age : data.age,
                sex: 'sex' in req.body ? req.body.sex : data.sex,
                password: 'password' in req.body ? req.body.password : data.password,
                login: data.login //用户是否被封停
            }
            redis.set(key, userData)
            res.json(util.getReturnData(0, '修改成功'))
        } else {
            res.json(util.getReturnData(1, '修改失败'))
        }
    })
}
//发送私信
exports.sendMail = (req, res, next) => {
    let checkKey = req.headers.fapp + '_user_info_' + req.params.username
    //验证用户是否存在
    redis.get(checkKey).then((user) => {
        if (user && req.body.text) {
            let userKey1 = req.headers.fapp + '_user_' + req.username + '_mail'  //发送者
            let userKey2 = req.headers.fapp + '_user_' + req.params.username + '_mail' //接受者
            let mailKey = req.headers.fapp + '_mail_'
            //保证两个用户之间只可能出现一次对话
            redis.get(userKey1).then((mail) => {
                if (!mail) mail = []
                let has = false
                for (let i = 0; i < mail.length; i++) {
                    if (mail[i].users.indexOf(req.params.username) > -1) {
                        has = true
                        //对话已经存在，直接写
                        mailKey = mailKey + mail[i].m_id
                        redis.get(mailKey).then((mailData = []) => {
                            mailData.push({ text: req.body.text, time: Date.now(), read: [] })
                            redis.set(mailKey, mailData)
                            res.json(util.getReturnData(0, '发送私信成功'))
                            next()
                        })
                    }
                }
                if (!has) {
                    //新对话,需获取唯一ID
                    redis.incr(mailKey).then((m_id) => {
                        mailKey = mailKey + m_id
                        redis.set(mailKey, [{ text: req.body.text, time: Date.now(), read: [] }])
                        //更新接受者的私信列表
                        mail.push({ m_id: m_id, users: [req.username, req.params.username] })
                        redis.set(userKey1, mail)
                        //写第二个用户
                        redis.get(userKey2).then((mail2) => {
                            if (!mail2) mail2 = []
                            mail2.push({ m_id: m_id, users: [req.username, req.params.username] })
                            redis.set(userKey2, mail2)
                            res.json(util.getReturnData(0, '发送新私信成功'))
                        })
                    })
                }
            })
        } else {
            res.json(util.getReturnData(1, '用户不存在,发送失败'))
        }
    })
}

//获取私信列表
exports.getMails = (req, res, next) => {
    let userKey1 = req.headers.fapp + '_user_' + req.username + '_mail'
    redis.get(userKey1).then((mail) => {
        res.json(util.getReturnData(0, '', mail))
    })
}

exports.getUserMail = (req, res, next) => {
    let userKey1 = req.headers.fapp + '_user_' + req.username + '_mail'
    let rData = {}
    redis.get(userKey1).then((mail) => {
        if (!mail) res.json(util.getReturnData(0, '', []))
        let has = false
        //获取内容
        for (let i = 0; i < mail.length; i++) {
            if (mail[i].m_id == req.params.id) {
                has = true
                mail[i].users.splice(mail[i].users.indexOf(req.username), 1)
                rData.toUser = mail[i].users[0]
                let key = req.headers.fapp + '_mail_' + req.params.id
                redis.get(key).then((data) => {
                    //将自己的username 写入最后一笔私信的 read属性,代表已读
                    if (data[data.length - 1].read.indexOf(req.username) < 0) {
                        data[data.length - 1].read.push(req.username)
                    }
                    //构造返回内容
                    rData.mail = data
                    redis.set(key, data)
                    res.json(util.getReturnData(0, '', rData))
                    next()
                })
                break;
            }
        }
        if (!has) {
            res.json(util.getReturnData(1, '请求错误'))
        }
    })
}

//文章点赞和踩功能
exports.articleLike = (req, res, next) => {
    let member = req.headers.fapp + "_article_" + req.params.id //文章id
    let like = req.params.like //0踩 1赞
    if (like == 0) {
        redis.zincrby(req.headers.fapp + '_a_like', member, -1)
    } else {
        redis.zincrby(req.headers.fapp + '_a_like', member)
    }
    res.json(util.getReturnData(0, 'success'))
}

//文章收藏功能
exports.articleCollection = (req, res, next) => {
    let key = req.headers.fapp + '_user_' + req.username + '_collection' //用户的收藏列表
    let a_key = req.headers.fapp + '_article_' + req.params.id           //文章信息
    redis.get(a_key).then((data) => {
        if (data) {
            //获取原本存在于数据库中的用户数据
            redis.get(key).then((tData) => {
                if (!tData) tData = []
                let exist = false
                tData.map((item) => {
                    if (item.a_id == req.params.id) {
                        exist = true
                    }
                })
                if (exist) {
                    res.json(util.getReturnData(1, '文章已收藏过啦！'))
                }
                else {
                    tData.push({ time: Date.now(), a_id: req.params.id, title: data.title })
                    redis.set(key, tData)
                    res.json(util.getReturnData(0, 'success'))
                }

            })
        } else {
            res.json(util.getReturnData(1, '文章不存在'))
        }
    })
}

exports.getCollection = (req, res, next) => {
    let key = req.headers.fapp + '_user_' + req.username + '_collection'
    redis.get(key).then((data) => {
        res.json(util.getReturnData(0, '', data))
    })
}