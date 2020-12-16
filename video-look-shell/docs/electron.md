# electron 
electron是基于Node.js和Chromium做的一个工具。electron是的可以使用前端技术实现桌面开发，并且支持多平台运行。

## 1. hello world
一个最简单的electron项目包含三个文件, package.json, index.html, main.js。 
package.json是Node.js项目的配置文件，index.html是桌面应用的界面页面，main.js是应用的启动入口文件。

package.json是应用的配置文件，代码如下：
```  json
{
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "repository": "https://github.com/electron/electron-quick-start",
  "keywords": [
    "Electron",
    "quick",
    "start",
    "tutorial",
    "demo"
  ],
  "author": "GitHub",
  "license": "CC0-1.0",
  "devDependencies": {
    "electron": "^2.0.2"
  }
}

```

index.html是应用的展示界面，代码如下：
```  html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
``` 

main.js是electron应用的入口文件。主要用户启动electron的界面。可以通过以下代码来启动electron界面。

```  javascript
const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
let win;
function createWindow() {
  // 创建窗口并加载页面
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/index.html`);

  // 打开窗口的调试工具
  win.webContents.openDevTools();
  // 窗口关闭的监听
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
```
## 2. 主进程与渲染进程
electron中，由package.json中的main.js运行出来的进程为主进程(Main Process)。主进程用于创建GUI界面以便web页面的展示。electron由Chromium负责页面的显示，所以当创建一个页面时，就会对应的创建渲染进程(Renderer Process)。 
主进程通过创建BrowserWindow对象来创建web显示页面，BrowserWindow运行在他自己的渲染进程中。当BrowserWindow被销毁时，对应的渲染进程也会终止。

在渲染进程中，直接调用原生的GUI接口是十分危险的。如果你想在渲染进程中使用原生的GUI的功能，需要让渲染进程与主进程进行通信，再由主进程去调用对应接口。那么主进程和渲染进程是如何进行通信的呢？ 

electron中，主进程与渲染进程的通信存在多种方法。这里介绍一种，通过ipcMain和ipcRenderer对象，以消息的方式进行通信。 
先来看下主进程如何向渲染进程发信息。 
首先，渲染进程通过接口ipcRenderer.on()来监听主进程的消息信息。主进程通过接口BrowserWindow.webContents.send()向所有渲染进程发送消息。

主进程给渲染进程发消息：
``` js
// renderer.js
// 引入ipcRenderer对象
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
// 设置监听
ipcRenderer.on('main-process-messages', (event, message) => {
  console.log('message from Main Process: ' , message);  // Prints Main Process Message.
});

// main.js
// 当页面加载完成时，会触发`did-finish-load`事件。
win.webContents.on('did-finish-load', () => {
  win.webContents.send('main-process-messages', 'webContents event "did-finish-load" called');
});
```

渲染进程给主进程发消息：

``` js
// renderer.js
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log('asynchronous-reply: %O %O', event, arg);
});
ipcRenderer.send('asynchronous-message', 'hello');

// main.js
ipcMain.on('asynchronous-message', (event, arg) => {
  // 返回消息
  event.sender.send('asynchronous-reply', 'ok');
});
```

渲染进程给渲染进程发消息：
``` js
// renderer1.js - 接收
ipcRenderer.on('rendererToRenderer',(event,args)=>{
                    console.log('rendererToRenderer, arg：${arg}');
                })
// renderer2.js - 发送
BrowserWindow.fromId(id).webContents.send('rendererToRenderer'
                , 'hello');

```



## 3. electron remote
在渲染进程中使用主进程模块,使用 remote 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息.  
官网链接：https://electronjs.org/docs/api/remote

#### 3.1  基础示例:

从渲染进程创建浏览器窗口
``` javascript
const {BrowserWindow} = require('electron').remote
  let win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
```

渲染进程获取全局对象
```  javascript
// main.js
global.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}

global.formIds = {
    renderer1: '-1',
    renderer2: '-1',
  }

// renderer.js

// 获取全局的方法
var fwithLocalCb = require('electron').remote.getGlobal('withLocalCallback');
var withLocalCb = fwithLocalCb();

// 获取全局的变量
var weixin1 = require('electron').remote.getGlobal('formIds').renderer1;

```


#### 3.2  方法
* remote.require(module) - 返回 any - 主进程中require(module) 返回的对象。 由其相对路径指定的模块将相对于主进程的入口点来解析。
* remote.getCurrentWindow() - 返回 BrowserWindow - 此网页所属的窗口。
* remote.getCurrentWebContents() - 返回 WebContents - 此网页的 web 内容。
* remote.getGlobal(name) - 返回 any-主进程中 name (例如 global[name]) 的全局变量。



## 4. webContents
渲染以及控制 web 页面
webContents 是 EventEmitter ( 所属Node.js, EventEmitter 的核心就是事件触发与事件监听器功能的封装 ) 的实例， 负责渲染和控制网页, 是 BrowserWindow 对象的一个属性   
官网链接：https://electronjs.org/docs/api/web-contents#webcontentsfromidid

#### 4.1  方法
* webContents.getAllWebContents()  
 返回 WebContents[] - 所有 WebContents 实例的数组。 包含所有Windows，webviews，opened devtools 和 devtools 扩展背景页的 web 内容。

* webContents.getFocusedWebContents()  
Returns WebContents - 此 app 中焦点的 web 内容，否则返回 null。

* webContents.fromId(id)  
Returns WebContents - 给定 id 的 WebContents 实例。   

示例： 利用webContents.fromId(id)，渲染进程renderer2给渲染进程renderer1发消息
``` js
// renderer1.js - 接收
ipcRenderer.on('rendererToRenderer',(event,args)=>{
                    console.log('rendererToRenderer, arg：${arg}');
                })
// renderer2.js - 发送
webContents.fromId(id).webContents.send('rendererToRenderer'
                , 'hello');

```

#### 4.2  事件

事件名 | 说明
- | -
 did-finish-load | 导航完成时触发，即选项卡的旋转器将停止旋转，并指派onload事件后。
did-fail-load | 这个事件类似于 did-finish-load, 不过是在加载失败或取消后触发，例如调用了 window.stop() 
did-frame-finish-load | 当框架完成导航（navigation）时触发
... | ...

示例：利用webContents事件监听特性和webContents.printToPDF()方法, 实现导航完成时存储内容至PDF文件。
``` js
// printToPDF-使用Chromium的预览打印自定义设置将窗口的网页打印为PDF
const {BrowserWindow} = require('electron')
  const fs = require('fs')
  
  let win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('http://github.com')
  
  win.webContents.on('did-finish-load', () => {
    // Use default printing options
    win.webContents.printToPDF({}, (error, data) => {
      if (error) throw error
      fs.writeFile('./tmp/print.pdf', data, (error) => {
        if (error) throw error
        console.log('Write PDF successfully.')
      })
    })
  })
```

## 5. 键盘快捷建
#### 5.1  全局快捷键

示例：全局键盘快捷键CommandOrControl+X
``` js
// main.js

const {app, globalShortcut} = require('electron')
  
  app.on('ready', () => {
    // 注册一个 'CommandOrControl+X' 的全局快捷键
    const ret = globalShortcut.register('CommandOrControl+X', () => {
      console.log('CommandOrControl+X is pressed')
    })
  
    if (!ret) {
      console.log('registration failed')
    }
  
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  })
  
  app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+X')
  
    // 清空所有快捷键
    globalShortcut.unregisterAll()
  })
```
#### 5.2  可用的功能键
* Command (缩写为Cmd)
* Control (缩写为Ctrl)
* CommandOrControl (缩写为 CmdOrCtrl)
* Alt
* Option
* AltGr
* Shift
* Super

#### 5.3  可用的普通按键
* 0 to 9
* A to Z
* F1 to F24
* 类似~, !, @, #, $的标点符号
* Plus
* Space
* Tab
* Backspace
* Delete
* Insert
* Return (等同于 Enter)
* Up, Down, Left and Right
* Home 和 End
* PageUp 和 PageDown
* Escape (缩写为 Esc)
* VolumeUp, VolumeDown 和 VolumeMute
* MediaNextTrack、MediaPreviousTrack、MediaStop 和 MediaPlayPause
* PrintScreen

## 6. seesion
管理浏览器会话、cookie、缓存、代理设置等。

官网链接：https://electronjs.org/docs/api/session#sesgetblobdataidentifier-callback

#### 6.1  实例属性
* session.cookies  ,查询和修改一个会话的cookies。

  示例：利用session.cookies设置、读取cookies的示例
``` js
var cookiesFuc = function (session){

    // 查询所有 cookies.
  session.defaultSession.cookies.get({}, function(error, cookies) {
    console.log(cookies);
  });
  
  // 查询与指定 url 相关的所有 cookies.
  session.defaultSession.cookies.get({ url : "http://www.github.com" }, function(error, cookies) {
    console.log(cookies);
  });
  
  // 设置 cookie;
  // may overwrite equivalent cookies if they exist.
  var cookie = { url : "http://www.github.com", name : "dummy_name", value : "dummy" };
  session.defaultSession.cookies.set(cookie, function(error) {
    if (error)
      console.error(error);
  });
 }

 module.exports = {
    cookiesFuc,cookiesFuc,
  }
```

* session.webRequest ,在一个请求生命周期的不同阶段，截取和修改其内容。
* ses.protocol ,注册自定义协议并拦截基于现有协议的请求。

## 7. shell
使用默认应用程序管理文件和 url。    
官网链接：https://electronjs.org/docs/api/shell

#### 7.1  方法
方法名称 | 描述
- | -
shell.showItemInFolder(fullPath) | 在文件管理器中显示给定的文件。如果可以, 选中该文件。
shell.openItem(fullPath) | 以桌面的默认方式打开给定的文件。
shell.openExternal(url[, options, callback]) | 以桌面的默认方式打开给定的外部协议URL。 （例如，在用户的默认邮件代理中打开 mailto: URLs）。
shell.moveItemToTrash(fullPath) | 将给定的文件移动到垃圾箱，并返回操作的布尔状态。
shell.beep() | 播放哔哔的声音.
shell.writeShortcutLink(shortcutPath[, operation], options) | 在shortcutPath位置创建或更新一个快捷连接
shell.readShortcutLink(shortcutPath) | 解析shortcutPath中的快捷链接。

示例:
``` js
const {shell} = require('electron')
  shell.openExternal('https://github.com');
  shell.showItemInFolder('D:\\test\\electron\\electron-quick-start\\main.js');
```

## 8. 系统托盘
添加图标和上下文菜单到系统通知区, 进程：主进程   
Tray 是一个 EventEmitter.    
官网链接：https://electronjs.org/docs/api/tray


平台限制：

* 在Linux上，如果支持，就使用应用程序指示器，否则将使用GtkStatusIcon。
* 在仅支持应用程序指标的Linux发行版中，必须安装libappindicator1才能使任务栏图标正常工作。
* 应用程序指标只有当它有一个上下文菜单时才会显示。
* 当在Linux上使用应用程序指标时，它的 click事件将被忽略
* 在Linux上，为了改变单独的MenuItem，你必须再次调用setContextMenu
* 如果要在所有平台上保持完全相同的行为, 则不应依赖 click 事件, 并且始终将上下文菜单附加到任务栏图标。
* 在 Windows 上, 建议使用 ICO 图标来获得最佳视觉效果。


#### 8.1  方法
方法 | 说明
- | - 
new Tray(image)  |   创建与image关联的新任务栏图标。
tray.destroy() | 立即销毁该任务栏图标
tray.setImage(image) | 设置image作为托盘中显示的图标
tray.setToolTip(toolTip) | 设置此托盘图标的悬停文本。
tray.setContextMenu(menu) | 设置此图标的上下文菜单。
tray.isDestroyed() | 返回 Boolean -判断托盘图标是否被销毁

还有很多仅仅windows系统支持 或 macOS系统支持的方法


#### 8.2  事件
事件名 | 说明
 - | -
click | 当该图标被点击时触发。
right-click | 当该图标被右击时触发。
double-click | 当该图标被双击时触发。
... | ...

还有很多仅仅windows系统支持 或 macOS系统支持的事件


示例代码：
```  javascript
  // 系统托盘
      const tray = new Tray('./assets/wechat.ico');
      const contextMenu = Menu.buildFromTemplate([
        {label:'rendererView1',type:'normal'},
      ])

      contextMenu.items[0].click = function (){
        var renderer1Window = windowFactory.createWindowWithReadyToShow(BrowserWindow, configData.renderer1_window_config);
        require('./app/ipc-handler/ipc-handler')(renderer1Window);
        global.formIds.renderer1 = renderer1Window.id;
      }

      tray.setContextMenu(contextMenu);
```

## 9. 关于NodeJs中./目录路径问题
* __dirname：总是返回被执行的js所在文件夹的绝对路径。
* prcess.cwd()：总是返回运行node命令时所在文件夹的绝对路径。

关于./的路径结论：

```
在require中使用是跟__dirname的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟prcess.cwd()效果相同，是相对于启动脚本所在的目录。
```
nodejs结合electron总结
electron的运行启动目录为package.json,执行npm start启动electron时，会在package.json文件所在目录启动node，通过node加载electron相关的组件，结合上面关于./路径的总结，可以得出结论：在electron->main.js中使用./实际上指定的目录是package.json文件夹所在的目录。

总结：
只有在require()时才使用相对路径(./,../)的写法，其他地方一律使用绝对路径，如下：
``` js
// 当前目录下
path.dirname(__filename) + 'test.js';

// 相邻目录
path.resolve(__dirname) + '../test.js';
```

## 10.  gulp
用自动化构建工具增强你的工作流程   
官网链接：https://www.gulpjs.com.cn/

* 易于使用
通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。

* 构建快速
利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。

* 插件高质
Gulp 严格的插件指南确保插件如你期望的那样简洁高质得工作。

* 易于学习
通过最少的 API，掌握 Gulp 毫不费力，构建工作尽在掌握：如同一系列流管道。

#### 10.1 环境准备
* 全局安装 gulp:
```
$ npm install --global gulp
```

* 作为项目的开发依赖（devDependencies）安装：
```
$ npm install --save-dev gulp
```

* 在项目根目录下创建一个名为 gulpfile.js 的文件：
```
var gulp = require('gulp');
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```

* 运行 gulp：
```
$ gulp
```

#### 10.2 示例
删除文件夹下的所有md文件
``` js
/// gulpfile.js
var gulp = require('gulp');
const del = require('del');
const gutil = require('gulp-util');

gulp.task('default1', function() {
  // 将你的默认的任务代码放在这
  gutil.log(gutil.colors.yellow("del README"));
});


gulp.task('clean:md', function (cb) {
    del.sync(['./OutApp/wechat-win32-x64/resources/app/*.md']);
    gutil.log(gutil.colors.yellow("del README"));
  });
  
  gulp.task('default', ['clean:md']);
```

## 11.  打包
将electron壳程序打包成生产环境所需的exe、msi等格式。
#### electron-packger方式
github地址：https://github.com/electron-userland/electron-packager

#### 11.1 添加配置
``` js
// package.json
"packager": "electron-packager .  wechat --out ./OutApp --platform=win32 --arch=x64  --asar=false  --electron-version=2.0.2 --overwrite --icon=./wechat.ico  --ignore=.gitignore"
```
* --out           // 输出目录
* --platform      // 参数：darwin、linux、mas、win32
* --arch          // 参数：ia32、x64、armv7l、arm64
* --icon          // 设置打包的时候的图标
* --asar          // 打包选项，是否在resource文件夹下面，生成app.asar文件。否则将会是个app文件夹加上自己的代码文件。
* --ignore        // 要排除掉的不打包的文件，可以叠加效果。主要是出于减少最终文件大小的考虑。

#### 11.2 启动
``` 
npm run-script packager
```

#### 11.3 electron-packer打包进阶
electron-packer结合gulp实现自定义打包策略   
主要步骤：
* 清除打包目录 - config/gulp/gulp-clean.js
* 拷贝安装包必须文件至临时目录 - config/gulp/copy.js
* 将临时目录打包成exe安装包 - config/gulp/package.js




## 12. 自动更新
版本号的设定需要符合语义化规则：https://semver.org/lang/zh-CN/

#### 12.1 自动更新服务环境准备   
* 下载electron-release-server-master 服务端。   
官网： https://github.com/ArekSredzki/electron-release-server


* 数据库安装  

```  sql
C:\Program Files\PostgreSQL\9.5\bin>psql.exe --username=postgres
Password for user postgres:
psql (9.5.2)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# CREATE ROLE electron_release_server_user ENCRYPTED PASSWORD 'MySecurePassword' LOGIN;
CREATE ROLE
postgres=# CREATE DATABASE electron_release_server OWNER "electron_release_server_user";
CREATE DATABASE
postgres=# CREATE DATABASE electron_release_server_sessions OWNER "electron_release_server_user";
CREATE DATABASE
postgres=#
                           
```


* 配置   
需要设置config/local.js file
```  javascript
    connections: {
        postgresql: {
        adapter: 'sails-postgresql',
        host: 'localhost',
        user: 'electron_release_server_user',
        password: 'MySecurePassword',
        database: 'electron_release_server'
        }
    },

    session: {
        // Recommended: 63 random alpha-numeric characters
        // Generate using: https://www.grc.com/passwords.htm
        secret: 'EB9F0CA4414893F7B72DDF0F8507D88042DB4DBF8BD9D0A5279ADB54158EB2F0',
        database: 'electron_release_server',
        host: 'localhost',
        user: 'electron_release_server_user',
        password: 'MySecurePassword',
        port: 5432
    }
```

* 启动
``` 
npm install
npm start
```

#### 12.2 更新服务操作基本流程：
1. 新建版本管理，版本号的设定需要符合语义化规则，例如：1.0.1
2. 上传.nupkg 和 .exe 文件，上传时应用平台选择windows32位，在JS中系统平台标识分别为：darwin（macOS）、linux（linux）、mas（移动系统）、win32（windows系统）,自动更新服务端本身有bug如果应用平台选择windows 64位自动更新服务程序会被识别为win64这个与node中能获取出的数据不对应。


#### 12.3 客户端配置
设置更新    
``` javascript
// main.js
const { app, autoUpdater, dialog } = require('electron')
const server = 'http://localhost:1337'
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`
  
  autoUpdater.setFeedURL(feed)

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60000)

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })
```