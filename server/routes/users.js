var express = require('express');
var router = express.Router();
var { userLogin, userRegister } = require('../controller/user')
var { checkUser } = require('../util/middleware')

/* GET users listing. */
router.use('/user', checkUser, require('./userNeedCheck'))  //以中间件的形式判断Token是否有效

router.post('/register', userRegister)

router.post('/login', userLogin)

module.exports = router;
