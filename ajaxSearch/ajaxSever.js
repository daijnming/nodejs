//导入核心模块http
var http = require('http');
/**
 * 1. 能在特定的IP 特定端口上监听 客户端的请求
 * 2. 当请求到来的时候能执行监听函数，并返回响应
 *
 * 创建一个服务器
 * 指定监听函数 每当有客户端请求到来的时候执行的函数
 * request 代表客户端的请求，可以从中获取请求过来的信息
 * response 代表向客户端发的响应，可以通过它向客户端发响应
 *
 */
var fs = require('fs');
var mime = require('mime');
var path = require('path');
//node亲生的模块，帮助我们解析请求中的URL的
var url = require('url');
var users = [];
var server = http.createServer(function(request,response){
    //把url转成url对象
    var urlObj = url.parse(request.url,true);
    console.log(urlObj.pathname);
    if(urlObj.pathname=="/favicon.ico"){
        response.end();
    }

    //pathname 指的是路径名 问号和端口号中间的那一部分
    if(urlObj.pathname == '/'){
        console.log("根目录");
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./ajax.html',function(err,data){
            response.end(data);
        })
    }else if(urlObj.pathname == '/ajaxSever'){
        //每当服务器收到客户端发过来的一段数据的时候就会触发data事件
        var str = '';
        request.on('data',function(data){
            str+=data.toString();
        });
        //当所有的数据全部接收完毕的时候会会触发end事件，这时请求体的数据就接收完整了
        request.on('end',function(){
            //转成对象追加到用户列表里
            users.push(JSON.parse(str));
            //最后返回用户列表
            response.end(str);
        })
    }
    /*function isObjectValueEqual(a, b) {//判断两个引用类型的数据是否相等

        if(a==undefined){
            return false;
        }
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
    }*/
});
//在8080端口上进行监听 ，主机名是localhost
// 0 - 65535
// ps -ef | grep node
server.listen(8086,'localhost');