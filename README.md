\# 活动开发以及规范说明文档

\- __开发流程分析__

前端活动开发属于轻量级的网页应用，需求的功能欠丰富，使用框架反而增加了项目体积。建议继续使用原生js来开发单界面来处理类似应用程序。每个活动都有其共通性，规范化的开发流程会让开发周期变短，同时将代码片段以类似mvvm组件的方式进行拼接组装，做到代码的复用，对后期再开发和维护也减少了相当的成本。因此搭建脚手架进行开发流程的规范，以及利用一些第三方资源模块进行代码上的优化，相信可以节约不少的开发时间。

\- 活动优化建议

1.统一开发流程，节省重复搭建骨架的时间

2.规范代码，为后续维护打开便利的大门

3.利用模块化的方式进行开发，提高代码模块地复用性

4.对资源文件进行上线处理，发布流程尽量简化，减少手动处理流程

5.对服务器上的资源进行gzip，已达到最小化下载体积

6.提供共享仓库，让更多的开发者快速地参与到其中来

\- 安装了解使用脚手架

\`hcb-create-activity\`和\`generator-hcb-add-webpage\`是我们以后开发将会用到的脚手架，它主要解决了以上提到的开发过程中产生的问题，帮助诸位面对重复的应用时，能尽可能地节省时间，提高开发效率，它的安装过程和使用都非常简单，没有使用到任何框架。上手起来非常快，它的安装过程如下：

\*\*1.安装:\*\*

首先假设你的电脑上以及安装了\`node\`和\`npm\`。然后你需要安装yeoman脚手架管理器,然再安装这两个工具包

```javascript

npm install -g yo

npm install -g generator-hcb-create-activity

npm install -g generator-hcb-add-webpage
```

```

\*\*2.使用\*\*
```

新建项目文件夹切换到文件夹目录

```

```javascript

mkdir newfolder && cd newfolder\

yo hcb-create-activity
```

之后你会看到已经安装的本地脚手架, 此时会看到有一些基础的配置需要你填写:

```javascript

```

Developer: 开发者大名 缺省值(hcbstaff)

Version: 版本号 缺省值(0.1.1)

Prefix: 映射api前缀 缺省值(api)

useZepto: 是否使用zepto作为dom操作库,缺省值(true)

usewxApi: 该界面主页是否会用到微信api(false)

model:是否未移动开发模式（true）默认适配网页宽度，采用rem布局

TestDomain: 测试环境域名 缺省值(http://apptest.hcbkeji.com)

ProDomain: 正式环境域名 缺省值(http://app.hcbkeji.com)

PhpRoute: 接口路由 缺省值(php/option/activity)

Project: 项目名称 缺省值(activity)

Descriptions: 缺省值()

Email: 缺省值(alberteinstein007@126.com)

```

```

```

依次填写信息，等待几分钟加载完依赖模块后便可以看到再当前文件夹内生成了一个\`package.json\`, \`webpack.config.js\` 以及一个\`src\`目录，\`src\`目录结构如下所示：

```javascript

├─api //接口

├─assets //资源

│ └─img //图片

├─css //样式

├─html //入口文件

├─js //脚本

│ ├─others

│ └─tools

└─plugs//插件

└─newplugs
```

**3.开发**

开发流程与之前的开发写业务无异，但也有不同。建议开发者使用模块化开发机制，促进代码重复利用，推荐使用ES6语法。遇到会重复利用的UI，可以将模板存放再plugs目录下. 本地环境执行以下命令搭建本地服务器开始开发。每个页面在js里面都有其对应地入口文件，命名与html文件命名时相同地。在界面地头部引用了\`zepto.js\`, `$`符号作为全局变量在开发过程中随时调用。

```

```javascript
```

npm start

```

```

**4\. 添加新文件**

```

遇到多个界面的时候，我们需要用到另外的脚手架\`hcb-add-webpack\`快速添加模板界面，与使用上面的脚手架时是一样的方法, 切换到src目录下执行生成命令

```javascript

cd src/ && yo hcb-add-webpage
```

执行之后它立马会在\`src/\`目录下的 \`html\` \`css\` \`js\` 目录下生成对应的模板文件，然后再对应文件里面进行编码工作就好了。

**5\. 发布**

到了发布环节，我们保存好代码，再根目录下执行以下命令得到打包的前端工程文件

```

```javascript

npm run build
```

```

可以看到生成了以你的项目名称为名字的文件夹，里面包含了所有的静态资源、代码以及依赖模块。直接将它们部署待测试环境测试即可。

**6\. 测试**

测试服务器上需要提交代码，并且提交流程过于频繁，我们建议在本地搭建服务器进行测试。这个在脚手架中利用webpack搭建的本地服务器（默认9000端口）能够帮助我们在本地进行测试调试。调试代码和平时调试的大同小异，可以直接在浏览器中调试。而测试环境因为所有地代码都打包成了静态文件，无法直接在浏览器上调试。这也使得我们必须在本地经过测试稳定后才能够上传代码到测试服务器上。需要注意地是，我们开发环境中用默认用的\`api\`来替换后台的路由（新建项目时可以自己定义），所以当接口中有\`api\`这三个字母的话会被替换，这时我们手动修改\`webpack.config.js\`以适配接口（*例如后台地接口定义为api/route/activity/someinteractions,这时在配置\`Prefix\`请避免使用默认配置*。当然，在项目开发的前期和后台人员进行有效的沟通可以完全避免这个问题。

\- 上传代码

该脚手架发布在**\[npm\](https://www.npmjs.com/settings/constantince/packages)**平台上，代码则托管在**\[github\](https://github.com/constantince/generator-hcb-create-activity)**上。在后续开发中因为要封装组件，所以建议诸位在上面关注此项目并且适时地将自己地组件和模块推送到github上面，**但是**  由于脚手架跟公司项目关联较大，所以诸位可以把需要同步上传的业务文件发到svn上（svn地址找火哥要），我会定时更新到npm上去， 以帮助该项目的持续更新。推送路径为\`app/template/\`, 文件命名规则\`src\_yourfoldername\_yourfilename\`, 例如:\`src\_js\_tools_newTools.js\`, 后台会检测该文件模板生成的路径, 若是找不到文件夹则会新建。

\- 帮助文档以及引用资料

1.\[脚手架开发流程\](https://yeoman.io/authoring/)

2.\[Github 使用教程\](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

3.\[webpack官方文档\](https://webpack.js.org/)

4.\[HTML模板引擎使用教程\](https://github.com/PaulGuo/Juicer)
