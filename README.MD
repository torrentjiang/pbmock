##### ui&数据库
```
```

##### 项目目录结构及说明

```
.
├── app //所有的页面
│   ├── example //页面名称
│   │   ├── components //页面内组件
│   │   │   ├── deleteModal
│   │   │   ├── list
│   │   │   ├── main
│   │   │   └── search
│   │   ├── models //页面所需要的接口
│   │   └── store //页面数据
│   ├── home
│   ├── login
├── components //站点内页公用组件
├── config //站点不同环境(dev、sit、uat、pit、prod)的配置文件，如接口host、环境
├── lib //站点内公用方法
├── public
│   └── js
├── router //站点导航菜单及路由
│   ├── navs //菜单相关配置
│   │   └── innerNavs
│   └── ts //读取菜单配置组装路由的文件
├── svg
├── template //页面站点模板文件,index.html
└── type 页面ts声明文件
```



##### 菜单相关配置

```
页面共3级菜单
.
├── index.tsx //router入口文件
├── navs //菜单配置
│   ├── index.ts //业务开发者不需要改此文件
│   ├── innerNavs //二三级菜单配置，文件名按照一级菜单的名称来命名新建
│   │   ├── index.ts
│   │   ├── menu1.ts
│   │   └── sysManage.ts
│   └── outsideNavs.ts //第一级菜单配置

当需要新建一个页面时，则需要先在第一级菜单配置里新建个菜单，然后根据一级菜单名称在innerNavs中新建一个对应的一级菜单名称的ts文件，在内部新建二三级菜单。

id命名规范
一级菜单 101、102、103...
二级菜单 101-01、101-02... `${一级菜单id}-${二级菜单id(十进制)}`
三级菜单名称 101-01-01、101-01-02 `${一级菜单id}-${二级菜单id(十进制)}-${二级菜单id(十进制)}`
```



##### 页面开发形式

- 技术栈

  react-hook（不要使用redux、mobox、dva）

- 本地开发
  ```
  npm i
  npm run dll
  npm start
  ```

- 访问地址
  ```
  http://localhost:8088/#/login
  http://localhost:8088/#/shop/list
  ```



##### 代码开发规范


### 服务器部署

- jenkins构建命令(npm使用6.4.1版本)

  ```
  cd ${WORKSPACE}
  node -v
  npm i
  npm run dll
  npm run build
  tar -zcvf dist.tar.gz ./dist
  ```

- nginx指向

  ```
  location ^~ /projectName {
                  root /opt/application/;
                  index index.htm index.html;
  }
  ```

  ps: *比如期望最后访问路径为：http://aaa.bbb.com/**project-a**/#/login，那么projectName则为project-a*
