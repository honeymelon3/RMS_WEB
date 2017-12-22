# 基于EPICS和web技术实时监测系统

```bash
Web应用程序具有跨平台、跨系统的特点，任何拥有浏览器的联网设备都可以通过Web端访问到网络上的数据资源。本论文介绍一种基于最新
的互联网技术Node.js、 Websocket、Echarts等实现Web端EPICS实时监控系统的方法，解决了制约Web在EPCIS实时监控系统中应用的
瓶颈。包括：通过EPICS事件回调来驱动数据交换，解决实时性问题；通过Websocket面向连接的通讯方式，解决频繁链接带来的服务器性
能下降；通过使用Bootstrap前端模版和Echarts数据可视化技术，实现实时数据的美观布局和科学展现，并讨论了使用canvas开发web
版界面编辑器的可行性。
```

## 日志：
```bask
2107-12-18
    mac 下安装node-epics 包以来的ffi和ref 包需要mac 安装xcode。
    cenots6.3 下安装node-epics 需要升级系统
    编译ffi 出错，node版本 降低至7.4.0

2017-12-19
    客户端的批量处理 引入async异步处理包。
    引入metronic-bootstrap框架，更新public
    更新index界面
    页面调转的初步设计
```

2017-12-20
    前端包管理软件bower
    编辑系统结构页，system_struct.html
    
2017/12/22
    申请百度云地址，47.100.41.42  修改安全组规则，开发80端口
    修改logo
    

