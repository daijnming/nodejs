//导入核心模块http
var http = require('http');
var mime=require('mime');
var path=require('path');
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
var server = http.createServer(function(request,response){
    var url = request.url;
    //如果访问收藏图标的话，直接返回404记得加return
    if(url == '/favicon.ico'){
        return response.end('404');
    }
    //如果没有指定文件名，或访问的是根目录，那么可以重定向到默认首页
    if(url == '/'){
        url = 'index.html';
    }
    response.setHeader('Content-Type',mime.lookup(url)+';charset=utf-8');//设置响应头
    /*if(url == '/index.html'){
        //指定文件的路径 设置编码 得到data就是字符串类型的
        response.setHeader('Content-Type',mime.lookup(url)+';charset=utf-8');//设置响应头
        fs.readFile('./index.html','utf8',function(err,data){
            console.log(data);
            response.write(data);
            response.end();
        })
    }else if(url == '/index.css'){
        response.setHeader('Content-Type',mime.lookup(url)+';charset=utf-8');//设置响应头
        fs.readFile('./index.css','utf8',function(err,data){
            console.log(data);
            response.write(data);
            response.end();
        })
        //http://localhost/abc
    }else if(url == '/index.js'){//判断URL的时候一定是/开头的
        response.setHeader('Content-Type',mime.lookup(url)+';charset=utf-8');//设置响应头
        //读取文件的时候，因为是相对当前目录，所以一定要加点
        //如果 读文件的时候写/index.js，读取当前根目录下面的index.js
        fs.readFile('./index.js','utf8',function(err,data){
            response.write(data);
            response.end();
        })
    }*/

    //判断文件是否存在，如果存在则读取并返回给客户端
    //如果不存在，则报404 Not Found
    fs.exists("."+url,function(exists){
        if(exists){
            fs.readFile("."+url,function(err,data){
                if(err){
                    response.statusCode("404");
                    //如果读取文件出错了，则也报404错误
                    response.end();
                }else{
                    //response.statusCode('200');
                    response.write(data);
                    response.end();
                }
            })
        }else{
            response.statusCode("404");
            response.end();
        }
    })

})
server.listen(8086,'localhost');