vue项目知识点工具测试
---
# 工程结构说明

``` shell
violet-seed
├── dist                                 构建的目标dist目录
│   ├── css
│   ├── fonts
│   ├── images
│   ├── img
│   ├── js
│   ├── themes
│   ├── config.json
│   ├── favicon.ico
│   └── index.html
├── doc                                  项目相关文档输出
│   └── skin
├── public                               静态资源目录
│   ├── images                           静态图片
│   ├── themes                           静态样式文件
│   ├── config.json                      应用配置信息 
│   ├── favicon.ico                      站点图标
│   └── index.html                       静态主页   
├── src                                  源文件目录
│   ├── api                              服务访问目录  命名约定xxx-service
│   ├── assets                           公共资源，此处资源import使用，是会被webpack打包编译的资源
│   │   ├── fonts                            -字体
│   │   ├── icons                            -小图标
│   │   ├── imgs                             -图片
│   │   └── styles                           -全局样式文件
│   ├── components                       公共组件，项目内公共使用的模块
│   ├── directives                       vue指令
│   ├── filters                          vue过滤器
│   ├── lang                             国际化词条，多语言文件
│   │   ├── en.json                          -英文词条
│   │   ├── es.json                          -西语词条
│   │   ├── index.ts                         -i18n处理
│   │   └── zh.json                          -中文词条
│   ├── models                           客户端实体对象，命名约定xxx-info
│   ├── router                           全局路由控制
│   ├── skin                             皮肤处理目录
│   ├── store                            状态管理器目录，分模块
│   │   ├── modules                      分模块状态管理器
│   │   ├── getters.ts                   各模块状态state统一导出
│   │   └── index.ts                     store初始化及导出
│   ├── utils                            通用帮助组件
│   │   ├── appconfig.ts                 应用配置初始化类
│   │   ├── event.ts                     vue消息管道(使用了vuex后不建议使用eventbus)
│   │   └── validate.ts
│   ├── views                            业务视图组件，原则上尽量扁平化，层次不要太深。如超过10个视图的项目，可以再考虑子目录
│   │   ├── dabout
│   │   │   ├── about.scss               组件样式文件，建议独立
│   │   │   ├── about.vue                组件vue文件，建议template与ts可以并存于此文件。也可依据实际情况将ts分离
│   │   │   └── zh.json                  国际化词条文件，研发时。 构建时会通过gulp统一进行合并到lang目录
│   │   ├── dashboard                    同上。。。 
│   │   │   ├── dashboard.scss
│   │   │   ├── dashboard.vue
│   │   │   └── zh.json
│   ├── App.vue                          vue根组件
│   ├── main.ts                          vue根启动入口
│   ├── shims-tsx.d.ts                   tsx的ts声明文件
│   └── shims-vue.d.ts                   vue的ts声明文件
├── tests                                单元测试目录
│   └── unit
├── themes                               换肤使用的样式文件
│   ├── black
│   └── white
├── babel.config.js                      babel配置文件
├── gulpfile.js                          gulp构建配置文件
├── package-lock.json                    package锁定版本文件
├── package.json                         npm包配置文件
├── postcss.config.js                    css插件配置
├── README.md                            项目md文件
├── tsconfig.json                        ts配置文件
├── tslint.json                          ts静态质量检查配置文件
└── vue.config.js                        vue配置文件，vue-cli3简化了原有版本webpack相关所有配置信息，提供了默认配置，如果需要自定 义部分配置，可使用此文件进行全局处理
```  

## 发包
```
npm run build
```
生成dist文件夹