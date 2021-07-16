var express = require('express');
var router = express.Router();
var { getNavMenu, getFooter, getLinks, getIndexPic,
  getHotArticle, getNewArticle, getArticle,
  getArticleTalk, getArticles, viewArticle } = require('../controller/getData')

router.get('/getFooter', getFooter); //v
//获取菜单
router.get('/getNavMenu', getNavMenu); //v

router.get('/getLinks', getLinks);  //v

router.get('/getIndexPic', getIndexPic);  //v

router.get('/getHotArticle', getHotArticle); //v

router.get('/getNewArticle', getNewArticle);  //v
//获取文章详情
router.get('/getArticle/:id', getArticle);  //v
//获取文章评论
router.get('/getArticleTalk/:id', getArticleTalk); //v

//获取文章分类
router.post('/getArticles', getArticles); //v

router.get('/viewArticle/:id', viewArticle); //记录文章浏览量 v

module.exports = router;
