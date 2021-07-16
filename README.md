# CMS-
vuejs+Node.js开发实战 从入门到项目上线

## 项目运行：
1.启动redis服务
cmd进入到redis下执行 ：
```
redis-server.exe redis.windows.conf
```
redis的默认端口号是6379.  
check:  
这时候另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了。  
redis-cli.exe -h 127.0.0.1 -p 6379  
可以进入redis后台作业,确保redis服务开启就好  
  
2.启动API server  
在 /server  目录下执行 npm install  安装依耐包。  
安装完毕后 npm start 启动服务;启动成功会在控制台输出 '连接数据库成功'  

3.前端项目启动  
在 /serve-web 目录下执行npm install 安装依耐包。  
安装完毕后 npm run serve 启动前段项目  