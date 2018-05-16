# vue-ts-daily

基于Vue.js的2.5.13版本和TypeScript编写的模仿原生应用的WebApp.

**注意：** 本源码采用了Typescript的2.6.2版本,由于Typescript在2.7版本后加入了新特性,因此会产生报错,请降级到2.7以下.

[项目演示地址](http://day.xiaomuzhu.top/)

![扫描二维码](http://omrbgpqyl.bkt.clouddn.com/18-5-15/73469590.jpg)

## 前言

为什么做这个项目？

1. 学习vue全家桶，很长一段时间在用React。
2. 利用PWA技术来模仿原生应用,来探究PWA与原生的差异。
3. 作者声称2.5之后vue增强了对TS的支持，探究TS在vue中的支持情况。

那么为什么模仿一款"习惯养成APP"而不是饿了么、美团、头条等著名APP？

原生APP与WebApp最大的区别就是离线能力，我们希望做一款以离线能力为主的app，这种类型的app绝大多数都是工具类的，例如番茄闹钟、效率工具等等，诸如美团、头条这种app离线场景价值有限（离线怎么点餐看新闻啊？缓存里的应该叫旧闻了）。

这个项目跟其他Vue仿饿了么和qq音乐的项目有何不同?

1. 我们全程Typescript编写,组件完全Class化,写法更贴近Angular,ts是构建健壮应用的必备良药,众多团队在ts化自己的项目了,而github上我找不到任何一个ts+vue的完整app,此项目可以供你学习.

2. 我们利用了pwa技术,pwa目前已经被ios支持(虽然支持得烂),所以,开花结果是迟早的事情,vue+pwa的项目也是十分有限,尤其是在vue-cli 3.0之后就没有相关的项目供参考了.

## 技术栈

vue2.5 + Typescript + vuex + vue-router

## 项目启动


## 开发环境
> MacOS 10.12.6 node10.0.0

## 项目截图
首页

![](http://omrbgpqyl.bkt.clouddn.com/18-5-15/98606536.jpg)

习惯管理

![](http://omrbgpqyl.bkt.clouddn.com/18-5-15/60061652.jpg)