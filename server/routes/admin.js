var express = require('express');
var router = express.Router();
var { setArticle, showArticle, setArticleType, getAllUser,
    stopLogin, setIndexPic, setNavMenu, setFooter, setLinks } = require('../controller/admin')

router.post('/setArticle', setArticle)  //发布 文章 v

router.post('/showArticle', showArticle)  // 文章上线,下线 v

router.post('/setArticleType', setArticleType)  // 添加 修改 分类 V

router.get('/getAllUser', getAllUser) //获取所有的用户

router.get('/stopLogin/:id', stopLogin) //封停用户

router.post('/setIndexPic', setIndexPic)  // 修改首页轮播图

router.post('/changeNav', setNavMenu)  // 修改导航内容

router.post('/setFooter', setFooter)  // 修改底部内容 

router.post('/setLinks', setLinks)  // 修改链接

module.exports = router;