# CMS-
vuejs+Node.js开发实战 从入门到项目上线

## 项目运行：
1.启动redis服务
cmd进入到redis下执行 ：
```
redis-server.exe redis.windows.conf
```
redis的默认端口号是6379  
check:  
这时候另启一个在/redis目录另起一个cmd 窗口，原来的不要关闭，不然就无法访问服务端了。  
执行```redis-cli.exe -h 127.0.0.1 -p 6379```  
可以进入redis后台作业,确保redis服务开启就好  
(redis中已经有了一些测试数据了)
![...](https://github.com/qiaojianjunjojo/CMS-/blob/main/picture/1.PNG)
  
2.启动API server  
在 /server  目录下执行 ```npm install```  安装依耐包。  
安装完毕后执行```npm start``` 启动服务;  
启动成功会在控制台输出 '连接数据库成功'  
这时候就可以用一些API测试工具(postman/swagger)去测试了  
![...](https://github.com/qiaojianjunjojo/CMS-/blob/main/picture/2.PNG)

3.前端项目启动  
在 /serve-web 目录下执行npm install 安装依耐包。  
安装完毕后 npm run serve 启动前端项目  
前端采用目前比较流行的vue vue-router这一套的spa解决方案,详情参考package.json  
  
## 主页
![...](https://github.com/qiaojianjunjojo/CMS-/blob/main/picture/3.PNG)  

## 文章详情
![...](https://github.com/qiaojianjunjojo/CMS-/blob/main/picture/4.PNG)

## 文章发布
![...](https://github.com/qiaojianjunjojo/CMS-/blob/main/picture/5.PNG)