# shell工程加载UI资源两种方式
这里会介绍壳工程加载UI资源的两种不同方式，调试模式加载，发布模式加载。

1. 在config.json文件节点找到debug_config,将isDebug设置为ture，将loadURL指向UI工程宿主的web服务。
```  json
"seed_window_config": {
    "loadURL":"http://localhost:4200",                                       // 调试模式时使用的url
    "loadPath": "./node_modules/@owlet/angular-seed/dist/index.html",      // 发布模式时引用已经打包好的前段工程
    "isShowDevTools": false,                                                 // 是否开启调试工具栏
    "isDebug": false,                                                        // true：调试模式  ， false：发布模式
    "width": 800,                                                            // 壳程序窗体宽度
    "height": 600,                                                           // 壳程序窗体高度
    "frame": true,                                                           // true：有边框窗体，false：无边框窗体
    "resizable": false,                                                      // true：壳窗体尺寸可拉申，false：壳窗体尺寸不可拉申。
    "show":false,                                                            // true：窗体立即显示，false：在以后调用widnow.show后窗体再显示
    "webPreferences": {
      "nodeIntegration": true                                                // true：页面上使用node语法，false：页面上禁用node语法。
    }
  },
``` 
``` js
// main-process/main-window.js

var createWindowWithReadyToShow = function (BrowserWindow,config) {
  var mainWindow;
  // Create the browser window.
  mainWindow = new BrowserWindow(config)
  var logger = BrowserWindow.logger;
  if(config.isDebug){
    mainWindow.loadURL(config.loadURL); 
    //Open the DevTools.
    if(config.isShowDevTools){
      mainWindow.webContents.openDevTools()
    }
  }else{
    mainWindow.loadURL(`file://${path.dirname(__filename)}/../../../${config.loadPath}`); 
    if(config.isShowDevTools){
      mainWindow.webContents.openDevTools()
    }
  }
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    logger.info("web finish load...");
  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    logger.info("web closed...");
    mainWindow = null
  })
  return mainWindow;
};
``` 
2. 在ui工程执行npm start(在ui工程中我们通常会使用webpack宿主一个web服务),宿主一个web服务。
3. 在壳工程执行npm start 启动壳程序。
4. 到此就可以达到两个工程交互时调试。


