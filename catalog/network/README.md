# 网络相关
网络五层

    应用层  http
    传输层  TCP/UDP
    网络层  ip
    数据链路层
    物理层

## TCP/UDP

1. UDP: 是一种面向无连接的一种方式,想发送数据不需要像TCP那样发送前需要3次握手建立连接，在传输层只会加一个UDP协议的标志就直接发送，所以它具有不可靠的特性，它不会关注数据的有序和丢包行为，他只管发，没有任何限制数据发送速率的算法。因为它的不可靠性，所以它是高效的，他不会像TCP那样关注数据，而且它支持多种传输方式，一对一，一对多，多对多的方式。在一些实时性要求较高的地方就可以使用该协议，比如直播，电话会议。

2. TCP: 是一种面向连接的方式，在发送数据前需要经过3次握手先建立连接，才能发送数据，首先客服端发送一个SYN给服务端，服务端收到后发送一个SYN+ACK给客户端，最后客户端发送一个ACK给服务端建立连接。断开连接需要4次挥手

## HTTP/HTTPS

Http请求主要包括

- 请求头/响应头
    Get /host.index?params=xxx HTTP/1.1    请求行

    HTTP/1.1 200 OK                        响应行

    其他属性...

- 请求体/响应体
  Get请求没有请求体将业务数据放入url中，post请求将业务数据放入请求体中

### HTTP缓存机制

1. 强缓存 
    - 通过cache-control，expires控制

2. 协商缓存
    - 通过Etag last-modified控制

### 常见的状态码

1. 2XX  成功
    - 200 OK   成功，一切正常
    - 204 No content  请求成功，但是响应报文不含实体的主体部分
2. 3XX  重定向
    - 301  永久重定向
    - 302  临时重定向
    - 304  资源未改变，使用缓存
    - 307  类似302，只不过要按照现在的请求方式去请求
3. 4XX  客户端的错误
    - 400  请求报文存在语法错误
    - 403  请求资源被服务器拒绝
    - 404  请求资源在服务器中没有
4. 5XX  服务器端的错误
    - 500 服务器在执行请求时发生错误
    - 503 服务器暂时停机或者超负荷，无法处理请求

### TLS协议

1. https还是通过http来传输信息，但是在表示层会通过TLS协议进行加密
2. TLS协议加密方式分为对称加密和非对称加密
    - 对称加密
    - 非对称加密

## HTTP1.X / HTTP2

1. http2使用多路复用技术解决在http1在请求限制问题，浏览器限制了在同一域名下的请求数量，因此会出现队头阻塞问题。但是http2 使用多路复用技术，只采用一个Tcp连接，如果一旦丢包的情况，tcp将会重新等待数据，会堵塞后续的数据传输。而http1它可以重新开启一个tcp连接
2. http2采用二进制传输
3. Header压缩，会在两端维护一个索引表，已经发送过的请求头字段将不再发送，减小请求头的大小
4. 服务端push，服务端可以在一次请求后主动发送其他的资源

## 缓存位置

1. 按优先级依次查
 - memory cache         内存缓存，一般较小的资源，进程结束就清空
 - service worker cache 实现离线缓存，因为需要拦截，所以要求是https协议 
 - HTTP cache           强缓存 协商缓存
 - push cache           http2

2. HTTP cache 机制

 - 强缓存 通过属性cache-control（设置的是时间段，优先级高于expires）和expires（设置的是时间戳，依赖本地时间）设置
 - 协商缓存 通过设置last-modified和Etag，这两个互补使用，他们不同在于对文件资源是否发生变化的监听上不同

## 本地存储

 - cookie
 - webStorage  localStorage与sessionStorage
 - IndexDB

 ## 跨域

 1. 浏览器为了保障安全遵循同源策略，同源策略即指协议，域名，端口三者一致则满足同源，否则会发生跨域的行为。

 ### 解决跨域的形式

 1. JSONP，通过标签的src属性来进行跨域请求，与后台协商好，让后端处理好返回的内容，是一个执行函数，响应内容作为参数传回来。内容传回后会立即执行，因此返回执行函数的定义需要提前做好，以便接受数据。
 
 2. CORS，后端设置响应头
    - Access-Control-Allow-Origin: *                  设置可以跨域的请求源```*```表示支持所有
    **非简单请求将会进行预检请求**
    - Access-Control-Request-Method: POST               设置可接受跨域的请求方法
    - Access-Control-Request-Headers: X-PINGOTHER       设置可接受跨域的请求自定义头
    - Access-Control-Max-Age: 86400                     设置本次预请求的的有效时间，再该时间段不需要再进行预请求
    **再该跨域下携带cookie**
    - Access-Control-Allow-Credentials: true            设置该字段后浏览器才会把cookie给你的网页同样再请求时需要为XMLHttpRequest的实例对象设置withCredentials 为true

 3. 后端代理

 ## cookie的属性

1. name:    一个属性的名字
2. value:   一个属性的值
3. domain:  该cookie所属的域名
4. path:    该cookie的路径
5. expires/Max-age: 不设置为页面cookie，即当浏览器关闭后销毁。前者表示一个时间戳，后前表示一个时间断
6. size:    cookie大小
7. httponly:    通过页面js脚本不能获得cookie，所以可以用来防止XSS
8. secrue:  规定只能在https协议下使用cookie
9. samesite:    该属性的值有strict和lax，严格模式下一旦跨站点访问都不携带cookie，lax就放松一些，在get请求表单可以携带和预加载，以及链接










