# node-blog 接口文档

> 项目地址：[manage.tzpcc.cn](https://manage.tzpcc.cn)

> 本地地址: localhost:3001

## 目录

[1.管理员接口](#1管理员接口)
* [管理员的登录和注册](#管理员的登录和注册)
* [获取管理员信息](#获取管理员信息)
* [获取管理员列表](#获取管理员列表)
* [获取管理员数量](#获取管理员数量)
* [退出登录](#退出登录)

[2.用户接口](#2用户接口)

[3.文章接口](#3文章接口)

[4.评论接口](#4评论接口)

[5.图片上传接口](#5图片上传接口)

## 接口列表

### 1.管理员接口

#### 1、管理员的登录和注册

##### 请求的 url：

```
/api/admin/login
```

##### 请求的方式：

```
POST
```

##### 参数类型

| 参数         | 是否必须 | 类型   | 说明       |
| ------------ | -------- | ------ | ---------- |
| user_name    | Y        | string | 管理员名称 |
| password     | Y        | string | 管理员密码 |
| super_secret | N        | string | 超级密码   |

##### 返回示例

```javascript
{
  code: 0,
  message: '登录成功'
}
or
{
  code: 0,
  message: '注册成功'
}
```

#### 2、获取管理员信息

##### 请求的 url：

```
/api/admin/info
```

##### 请求的方式：

```
GET
```

##### 参数类型

| 参数 | 是否必须 | 类型 | 说明 |
| ---- | -------- | ---- | ---- |


##### 返回示例

```javascript
{
  admin: '管理员',
  avatar: '',
  create_address: 'xx省 xx市',
  create_time: '2018-04-08 23:49:21',
  id: 19,
  type: 1,
  user_name: 'vdfgd'
}
```

#### 3、获取管理员列表

##### 请求的 url：

```
/api/admin/list
```

##### 请求的方式：

```
GET
```

##### 参数类型

| 参数   | 是否必须 | 类型   | 说明       |
| ------ | -------- | ------ | ---------- |
| limit  | N        | number | 显示的数量 |
| offset | Y        | number | 开始的数量 |

##### 返回示例

```javascript
;[
  {
    admin: '管理员',
    avatar: '',
    create_address: 'xx省 xx市',
    create_time: '2018-04-08 23:49:21',
    id: 19,
    type: 1,
    user_name: 'vdfgd'
  },
  {
    admin: '管理员',
    avatar: '',
    create_address: 'xx省 xx市',
    create_time: '2018-04-07 23:49:21',
    id: 18,
    type: 1,
    user_name: 'hxjsjjdxn'
  },
  ...共limit条数据
]
```

#### 4、获取管理员数量

##### 请求的 url：

```
/api/admin/count
```

##### 请求的方式：

```
GET
```

##### 参数类型

| 参数 | 是否必须 | 类型 | 说明 |
| ---- | -------- | ---- | ---- |


##### 返回示例

```javascript
{
  code: 0,
  count: 19
}
```

#### 5、退出登录

##### 请求的 url：

```
/api/admin/logout
```

##### 请求的方式：

```
GET
```

##### 参数类型

| 参数 | 是否必须 | 类型 | 说明 |
| ---- | -------- | ---- | ---- |


##### 返回示例

```javascript
{
  code: 0,
  message: '退出成功'
}
```

### 2.用户接口

### 3.文章接口

### 4.评论接口

### 5.图片上传接口

##### 请求的 url：

```
/api/admin/upload
```

##### 请求的方式：

```
POST
```

##### 参数类型

| 参数     | 是否必须 | 类型     | 说明            |
| -------- | -------- | -------- | --------------- |
| formData | Y        | FormData | 图片的 FormData |

##### 示例

```javascript
fileInput.addEventListener('change', () => {
  const formData = new FormData()
  formData.append('image', fileInput.files[0])
  axios.post('/api/admin/upload', formData)
}
```

##### 返回示例

```javascript
{
  code: 0,
  image: {
    hash: "FivStBp0zsL6E0fmqylJsHzJvVFJ",
    key: "2018/04/13/1523549488070/162baa05119.jpg",
    url: "https://blog.image.tzpcc.cn/2018/04/13/1523549488070/162baa05119.jpg"
  }
}
```
