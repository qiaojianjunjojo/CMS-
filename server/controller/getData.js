//所有获取数据的代码逻辑
let redis = require('../util/redisDB')
const util = require('../util/common')
const crypto = require('crypto') //nodejs自带的MD5算法

exports.getNavMenu = (req, res, next) => {
    let key = req.headers.fapp + '_nav_menu'
    redis.get(key).then((data) => {
        res.json(util.getReturnData(0, '', data))
    })
}

exports.getFooter = (req, res, next) => {
    let key = req.headers.fapp + '_footer'
    redis.get(key).then((data) => {
        res.json(util.getReturnData(0, '', data))
    })
}

exports.getLinks = (req, res, next) => {
    let key = req.headers.fapp + '_links'
    redis.get(key).then((data) => {
        console.log(data)
        res.json(util.getReturnData(0, '', data))
    })
}

exports.getIndexPic = (req, res, next) => {
    let key = req.headers.fapp + '_indexPic'
    redis.get(key).then((data) => {
        console.log(data)
        res.json(util.getReturnData(0, '', data))
    })
}

exports.getHotArticle = (req, res, next) => {
    let key = req.headers.fapp + '_a_view'
    redis.zrevrange(key, 0, 4).then(async (data) => {
        let result = data.map((item) => {
            return redis.get(item.member).then((data1) => {
                if (data1 && data1.show != 0) {
                    return {
                        'title': data1.title,
                        'date': util.getLocalDate(data1.time),
                        'id': data1.a_id,
                        'view': item.score
                    }
                } else {
                    return { 'title': '文章暂未上线', 'date': '', 'id': 0 }
                }
            })
        })
        let t_data = await Promise.all(result)
        res.json(util.getReturnData(0, '', t_data))
    })
}

//获取最新的文章列表
exports.getNewArticle = (req, res, next) => {
    let key = req.headers.fapp + '_a_time'
    //登录用户
    if ('token' in req.headers) {
        let pKey = req.headers.fapp + '_user_power_' + req.headers.token
        redis.get(pKey).then((power) => {
            //管理员权限
            if (power == 'admin') {
                redis.zrevrange(key, 0, -1).then(async (data) => {
                    let result = data.map((item) => {
                        return redis.get(item.member).then((data1) => {
                            if (data1) {
                                return {
                                    'title': data1.title,
                                    'date': util.getLocalDate(item.score),
                                    'id': data1.a_id,
                                    'show': data1.show
                                }
                            }
                        })
                    })
                    let tData = await Promise.all(result)
                    isAdmin = true
                    res.json(util.getReturnData(0, '', tData))
                })

            } else {
                //原文章是这么写的,这样会导致登录后的普通用户获取不到文章列表;修改后
                //res.json(util.getReturnData(1,'其他权限'))
                redis.zrevrange(key, 0, -1).then(async (data) => {
                    let result = data.map((item) => {
                        return redis.get(item.member).then((data1) => {
                            if (data1 && data1.show != 0) {
                                return {
                                    'title': data1.title,
                                    'date': util.getLocalDate(item.score),
                                    'id': data1.a_id,
                                }
                            } else {
                                return { 'title': '文章暂未上线', 'date': '', 'id': 0 }
                            }
                        })
                    })
                    let t_data = await Promise.all(result)
                    res.json(util.getReturnData(0, '', t_data))
                })
            }
        })
    } else {
        //普通游客,不需要登录
        redis.zrevrange(key, 0, -1).then(async (data) => {
            let result = data.map((item) => {
                return redis.get(item.member).then((data1) => {
                    if (data1 && data1.show != 0) {
                        return {
                            'title': data1.title,
                            'date': util.getLocalDate(item.score),
                            'id': data1.a_id,
                        }
                    } else {
                        return { 'title': '文章暂未上线', 'date': '', 'id': 0 }
                    }
                })
            })
            let t_data = await Promise.all(result)
            res.json(util.getReturnData(0, '', t_data))
        })
    }

}

//根据ID获取文章的基本内容
exports.getArticle = (req, res, next) => {
    let key = req.headers.fapp + '_article_' + req.params.id
    redis.get(key).then((data) => {
        if (data) {
            if (data.show == 1) {
                //获取文章分类详情
                redis.get(req.headers.fapp + '_a_type').then((type) => {
                    type.map((item) => {
                        if (item.uid == data.type) {
                            data.typename = item.name
                        }
                    })
                    //获取文章的阅读量
                    redis.zscore(req.headers.fapp + '_a_view', key).then((view) => {
                        data.view = view
                        //获取文章的点赞量
                        redis.zscore(req.headers.fapp + '_a_like', key).then((like) => {
                            data.like = like
                            res.json(util.getReturnData(0, 'success', data))
                        })
                    })
                })
            } else {
                res.json(util.getReturnData(403, '该文章已下线'))
            }
        } else {
            res.json(util.getReturnData(404, '该文章不存在'))
        }
    })
}

exports.getArticleTalk = (req, res, next) => {
    let key = req.headers.fapp + '_article_' + req.params.id + '_talk'
    redis.get(key).then((data) => {
        res.json(util.getReturnData(0, 'success', data))
    })
}

//获取文章分类
exports.getArticles = (req, res, next) => {
    let key = req.headers.fapp
    if ('tag' in req.body) {
        let tKeyMd5 = crypto.createHash('md5').update(req.body.tag).digest('hex')
        key = key + '_tag_' + tKeyMd5
        console.log(key)
    } else if ('type' in req.body) {
        key = key + '_a_type_' + req.body.type
        console.log(key)
    } else {
        res.json(util.getReturnData(1, '数据参数错误'))
        return
    }
    redis.get(key).then((async (data) => {
        if (!data) {
            res.json(util.getReturnData(1, '查无此分类！'))
        } else {
            let result = data.map((item) => {
                return redis.get(item).then((data1) => {
                    if (data1 && data1.show != 0) {
                        return {
                            'title': data1.title,
                            'date': util.getLocalDate(data1.time),
                            'id': data1.a_id
                        }
                    } else {
                        return { 'title': '文章暂未上线', 'date': '', 'id': 0 }
                    }
                })
            })
            let t_data = await Promise.all(result)
            res.json(util.getReturnData(0, '', t_data))
        }

    }))


}

exports.viewArticle = (req, res, next) => {
    let key = req.headers.fapp + '_article_' + req.params.id
    redis.zincrby(req.headers.fapp + '_a_view', key)
    res.json(util.getReturnData(0, 'success',))
}