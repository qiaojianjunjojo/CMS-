var express = require('express')
var router = express.Router()

var { articleTalk, getUserInfo, changeUserInfo, sendMail,
    getMails, getUserMail, getArticleType, articleLike,
    articleCollection, getCollection } = require('../controller/userNeedCheck')

router.post('/article/talk', articleTalk)   //V

router.get('/articleType', getArticleType)  //V

router.get('/info/:username', getUserInfo)  //v

router.post('/changeInfo', changeUserInfo)  //v

router.post('/mail/:username', sendMail) //发送私信 v

router.get('/mailsGet', getMails) //获取私信列表  v

router.get('/mailGet/:id', getUserMail) //获取私信详情by id v

router.get('/like/:id/:like', articleLike) //文章点赞/踩  V

router.get('/save/:id', articleCollection) //文章收藏功能  V

router.get('/saveList', getCollection) //获取用户 文章收藏 列表 v

module.exports = router