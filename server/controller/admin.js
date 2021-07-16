let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto')

exports.setArticle = (req, res, next) => {
    let data = req.body.article
    //任何修改或者新上线的文章 都初始化 show = 0,需要审核才可以上线show =1
    data.show = 0
    let key = ''
    if ('a_id' in req.body.article) {
        key = req.headers.fapp + '_article_' + req.body.article.a_id
        redis.set(key, data)
        res.json(util.getReturnData(0, '修改成功'))
    } else {
        //新文章需要初始化点赞數0、观看數0、时间戳
        data.time = Date.now()
        key = req.headers.fapp + '_article_'
        redis.incr(key).then((id) => {
            data.a_id = id
            key = key + id
            redis.set(key, data)
            //存储分类及小标签
            let a_type = data.type
            redis.get(req.headers.fapp + '_a_type_' + a_type).then((data1) => {
                if (!data1) data1 = []
                data1.push(key)
                redis.set(req.headers.fapp + '_a_type_' + a_type, data1)
            })
            let tags = data.tag
            tags.map((item) => {
                let tKeyMd5 = crypto.createHash('md5').update(item).digest('hex')
                redis.get(req.headers.fapp + '_tag_' + tKeyMd5).then((data1) => {
                    if (!data1) data1 = []
                    data1.push(key)
                    redis.set(req.headers.fapp + '_tag_' + tKeyMd5, data1)
                })
            })
            //新文章需要建立新的有序集合：点赞数0 观看數0 时间戳
            redis.zadd(req.headers.fapp + '_a_time', key, Date.now())
            redis.zadd(req.headers.fapp + '_a_view', key, 0)
            redis.zadd(req.headers.fapp + '_a_like', key, 0)
            res.json(util.getReturnData(0, '新建文章成功'))
        })
    }
}

exports.showArticle = (req, res, next) => {
    let key = req.headers.fapp + '_article_' + req.body.a_id
    redis.get(key).then((data) => {
        if (!data) res.json(util.getReturnData(404, '没有该文章'))
        if (data.show == 1) {
            data.show = 0
        } else {
            data.show = 1
        }
        redis.set(key, data)
    })
    res.json(util.getReturnData(0, '文章修改成功'))
}

exports.setArticleType = (req, res, next) => {
    let data = req.body.type
    let key = req.headers.fapp + '_a_type'
    redis.set(key, data)
    //循环整个传递的值，依次创建唯一的ID对应的键值对
    data.map((item) => {
        let tKey = req.headers.fapp + '_a_type_' + item.uid
        redis.get(tKey).then((data1) => {
            if (!data1) {
                redis.set(tKey, [])
            }
            //如果这个对应的键值存在了，则说明都不用做
        })
    })
    res.json(util.getReturnData(0, '创建分类成功'))
}

exports.getAllUser = (req, res, next) => {
    let re = req.headers.fapp + '_user_info_*'
    redis.scan(re).then(async (data) => {
        let result = data[1].map((item) => {
            return redis.get(item).then((user) => {
                return {
                    'username': user.username,
                    'login': user.login,
                    'ip': user.ip
                }
            })
        })
        let tData = await Promise.all(result)
        res.json(util.getReturnData(0, '', tData))
    })
}

exports.stopLogin = (req, res, next) => {
    let key = req.headers.fapp + '_user_info_' + req.params.id
    redis.get(key).then((user) => {
        if (user.login == 0) {
            user.login = 1
        } else {
            user.login = 0
        }
        redis.set(key, user)
        res.json(util.getReturnData(0, '用户修改成功'))
    })
}

exports.setIndexPic = (req, res, next) => {
    let key = req.headers.fapp + '_indexPic'
    let data = req.body.indexPic
    redis.set(key, data)
    res.json(util.getReturnData(0, '修改成功'))
}

exports.setNavMenu = (req, res, next) => {
    let key = req.headers.fapp + '_nav_menu'
    let data = req.body.nav_menu
    redis.set(key, data)
    res.json(util.getReturnData(0, '修改成功'))
}

exports.setFooter = (req, res, next) => {
    let key = req.headers.fapp + '_footer'
    let data = req.body.footer
    redis.set(key, data)
    res.json(util.getReturnData(0, '修改成功'))
}

exports.setLinks = (req, res, next) => {
    let key = req.headers.fapp + '_links'
    let data = req.body.links      
    redis.set(key, data)
    res.json(util.getReturnData(0, '修改成功'))
}