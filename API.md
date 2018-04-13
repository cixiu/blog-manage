# node-blog 接口文档

> 项目地址：[manage.tzpcc.cn](https://manage.tzpcc.cn)

> 本地地址: localhost:3001

## 目录

[1.管理员接口](#1管理员接口)

* [1、管理员的登录和注册](#1管理员的登录和注册)
* [2、获取管理员信息](#2获取管理员信息)
* [3、获取管理员列表](#3获取管理员列表)
* [4、获取管理员数量](#4获取管理员数量)
* [5、退出登录](#5退出登录)

[2.用户接口](#2用户接口)

* [1、用户的登录和注册](#1用户的登录和注册)
* [2、获取文章列表](#2获取文章列表)
* [3、获取用户列表](#3获取用户列表)
* [4、获取用户数量](#4获取用户数量)
* [5、退出登录](#5退出登录)

[3.文章接口](#3文章接口)

* [1、创建文章](#1创建文章)
* [2、获取用户信息](#2获取用户信息)
* [3、获取文章总数](#3获取文章总数)
* [4、删除文章](#4删除文章)
* [5、获取文章详情](#5获取文章详情)
* [6、修改文章](#6修改文章)

[4.评论接口](#4评论接口)

* [1、创建评论](#1创建评论)
* [2、获取文章的评论列表](#2获取文章的评论列表)
* [3、点赞评论](#3点赞评论)
* [4、回复评论](#4回复评论)

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
  code: 0,
  data: {
    admin: '管理员',
    avatar: '',
    create_address: 'xx省 xx市',
    create_time: '2018-04-08 23:49:21',
    id: 19,
    type: 1,
    user_name: 'vdfgd'
  }
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

#### 1、用户的登录和注册

##### 请求的 url：

```
/api/user/login
```

##### 请求的方式：

```
POST
```

##### 参数类型

| 参数      | 是否必须 | 类型   | 说明     |
| --------- | -------- | ------ | -------- |
| user_name | Y        | string | 用户名称 |
| password  | Y        | string | 用户密码 |

##### 返回示例

```javascript
{
  code: 0,
  message: '登录成功',
  data: {
    username: 'dsfdsf',
    id: 1,
    avatar: '',
    createAt: 1523599480,
    create_time: '2018-04-13 14:04:40',
    create_address: 'xx省 xx市',
  }
}
or
{
  code: 0,
  message: '注册成功',
  data: {
    username: 'dsfdsf',
    id: 1,
    avatar: '',
    createAt: 1523599480,
    create_time: '2018-04-13 14:04:40',
    create_address: 'xx省 xx市',
  }
}
```

#### 2、获取用户信息

##### 请求的 url：

```
/api/user/info
```

##### 请求的方式：

```
GET
```

##### 参数类型

| 参数    | 是否必须 | 类型   | 说明      |
| ------- | -------- | ------ | --------- |
| user_id | Y        | number | 用户的 id |

##### 返回示例

```javascript
{
  code: 0,
  data: {
    username: 'dsfdsf',
    id: 1,
    avatar: '',
    createAt: 1523599480,
    create_time: '2018-04-13 14:04:40',
    create_address: 'xx省 xx市',
  }
}
```

#### 3、获取用户列表

##### 请求的 url：

```
/api/user/list
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
    avatar: '',
    createAt: 1523599389809,
    create_address: '浙江省 杭州市',
    create_time: '2018-04-13 14:03:09',
    id: 4,
    username: 'gfsjkjlkds'
  },
  {
    avatar: '',
    createAt: 1523357798554,
    create_address: '浙江省 杭州市',
    create_time: '2018-04-10 18:56:38',
    id: 3,
    username: 'dhsfajhd,ja'
  },
  ...共limit条数据
]
```

#### 4、获取用户数量

##### 请求的 url：

```
/api/user/count
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
/api/user/logout
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

### 3.文章接口

#### 1、创建文章

> 注意：需要超级管理员登录才能创建文章

##### 请求的 url:

```
/api/article/create
```

##### 请求的方式

```
POST
```

##### 参数类型

| 参数        | 是否必须 | 类型   | 说明       |
| ----------- | -------- | ------ | ---------- |
| categorys   | Y        | array  | 文章的分类 |
| title       | Y        | string | 文章的标题 |
| screenshot  | Y        | string | 文章的封面 |
| content     | Y        | string | 文章的内容 |
| description | Y        | string | 文章的描述 |

##### 返回示例

```javascript
{
  code: 0,
  message: '文章发布成功!'
}
```

#### 2、获取文章列表

##### 请求的 url

```
/api/article/list
```

##### 请求的方式

```
GET
```

##### 参数类型

| 参数     | 是否必须 | 类型                 | 说明           |
| -------- | -------- | -------------------- | -------------- |
| limit    | N        | number (默认 10)     | 显示的数量     |
| offset   | Y        | number               | 开始的数量     |
| category | N        | string (默认'all')   | 文章的分类     |
| sort     | N        | 'recently' \| 'read' | 列表的排序方式 |

##### 返回示例

```javascript
;[
  {
    author: '辞修',
    category: [{ _id: '5ac9a8f681d69d0d9c3902a0', title: 'node' }],
    comment_count: 0,
    create_time: '2018-04-08 13:30:30',
    description: ' 广告费↵...',
    id: 1,
    last_update_time: '2018-04-08 13:30:30',
    screenshot: '',
    title: '测试',
    views_count: 30
  },
  ...共limit条
]
```

#### 3、获取文章总数

##### 请求的 url

```
/api/article/count
```

##### 请求的方式

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
  count: 18
}
```

#### 4、删除文章

> 注意：需要超级管理员登录才能删除文章

##### 请求的 url

```
/api/article/delete
```

##### 请求的方式

```
GET
```

##### 参数类型

| 参数 | 是否必须 | 类型   | 说明      |
| ---- | -------- | ------ | --------- |
| id   | Y        | number | 文章的 id |

##### 返回示例

```javascript
{
  code: 0,
  message: '文章删除成功!!!'
}
```

#### 5、获取文章详情

##### 请求的 url

```
/api/article/detail
```

##### 请求的方式

```
GET
```

##### 参数类型

| 参数   | 是否必须 | 类型    | 说明       |
| ------ | -------- | ------- | ---------- |
| id     | Y        | number  | 文章的 id  |
| update | N        | boolean | 是否是更新 |

##### 返回示例

```javascript
{
  code: 0,
  data: {
    author: '辞修',
    category: [{ _id: '5ac9a8f681d69d0d9c3902a0', title: 'node' }],
    comment_count: 0,
    create_time: '2018-04-08 13:30:30',
    content: '<p> 广告费</p>',
    description: ' 广告费↵...',
    id: 1,
    last_update_time: '2018-04-08 13:30:30',
    screenshot: '',
    title: '测试',
    views_count: 30
  }
}
```

#### 6、修改文章

> 注意：需要超级管理员登录才能修改文章

##### 请求的 url

```
/api/article/update
```

##### 请求的方式

```
POST
```

##### 参数类型

| 参数       | 是否必须 | 类型   | 说明       |
| ---------- | -------- | ------ | ---------- |
| categorys  | Y        | array  | 文章的分类 |
| title      | Y        | string | 文章的标题 |
| screenshot | Y        | string | 文章的封面 |
| content    | Y        | string | 文章的内容 |
| id         | Y        | number | 文章的 id  |

##### 返回示例

```javascript
{
  code: 0,
  message: '更新文章成功!!'
}
```

### 4.评论接口

#### 1、创建评论

##### 请求的 url

```
/api/comments/:articleId/create
```

##### 请求的方式

```
POST
```

##### 参数类型

| 参数      | 是否必须 | 类型   | 说明                               |
| --------- | -------- | ------ | ---------------------------------- |
| articleId | Y        | number | 评论的文章的 id (作为 params 传递) |
| userId    | Y        | number | 评论的用户 id                      |
| content   | Y        | string | 评论的内容                         |

##### 返回示例

```javascript
{
  code: 0,
  data : {
    content: "<p>测试评论</p>↵",
    createAt: 1523605328579,
    id: 1,
    isLiked: false,
    likedUser: [],
    likesCount: 0,
    respComment: false,
    respUserId: 0,
    respUserInfo: {id: 0, blogUser: "辞修"},
    subComments: [],
    subCount: 0,
    topComment: [],
    updateAt: "2018-04-13 15:42:08",
    userId: 4,
    userInfo: {
      avatar: "",
      createAt: 1523599389809,
      create_address : "浙江省 杭州市",
      create_time: "2018-04-13 14:03:09",
      id: 4,
      username: "gfsjkjlkds"
    }
  }
}
```

#### 2、获取文章的评论列表

##### 请求的 url

```
/api/comments/:articleId/list
```

##### 请求的方式

```
GET
```

##### 参数类型

| 参数      | 是否必须 | 类型   | 说明                               |
| --------- | -------- | ------ | ---------------------------------- |
| articleId | Y        | number | 评论的文章的 id (作为 params 传递) |
| userId    | Y        | number | 用户的 id                          |

##### 返回示例

```javascript
{
  code: 0,
  data: {
    articleId: 1,
    count: 1,
    comments: [
      {
        content: "<p>测试评论</p>↵",
        createAt: 1523605328579,
        id: 1,
        isLiked: false,
        likedUser: [],
        likesCount: 0,
        respComment: false,
        respUserId: 0,
        respUserInfo: {id: 0, blogUser: "辞修"},
        subComments: [],
        subCount: 0,
        topComment: [],
        updateAt: "2018-04-13 15:42:08",
        userId: 4,
        userInfo: {
          avatar: "",
          createAt: 1523599389809,
          create_address : "浙江省 杭州市",
          create_time: "2018-04-13 14:03:09",
          id: 4,
          username: "gfsjkjlkds"
        }
      }
    ]
  }
}
```

#### 3、点赞评论

##### 请求的 url

```
/api/comments/:articleId/like
```

##### 请求的方式

```
POST
```

##### 参数类型

| 参数      | 是否必须 | 类型   | 说明                               |
| --------- | -------- | ------ | ---------------------------------- |
| articleId | Y        | number | 评论的文章的 id (作为 params 传递) |
| commentId | Y        | number | 文章评论的 id                      |
| userId    | Y        | number | 用户的 id                          |

##### 返回示例

```javascript
{
  code: 0,
  isLiked: true,
  likesCount: 1,
  message: '点赞成功'
}
```

#### 4、回复评论

##### 请求的 url

```
/api/comments/:articleId/:commentId/:userId/reply/:respUserId
```

##### 请求的方式

```
POST
```

##### 参数类型

| 参数       | 是否必须 | 类型                    | 说明                               |
| ---------- | -------- | ----------------------- | ---------------------------------- |
| articleId  | Y        | number                  | 评论的文章的 id (作为 params 传递) |
| commentId  | Y        | number                  | 文章评论的 id (作为 params 传递)   |
| userId     | Y        | number                  | 用户的 id (作为 params 传递)       |
| respUserId | Y        | number                  | 回复用户的 id (作为 params 传递)   |
| content    | Y        | string                  | 回复的内容                         |
| isReply    | N        | boolean (default=false) | 是否是对评论的回复                 |

##### 返回示例

```javascript
{
  code: 0,
  data: {
    content: "<p>回复评论测试</p>↵",
    createAt: 1523607349867,
    id: 1,
    isLiked: false,
    likedUser: [],
    likesCount: 0,
    respComment: false,
    respUserId: 4,
    respUserInfo: {
      avatar: "",
      createAt: 1523599389809,
      create_address : "浙江省 杭州市",
      create_time: "2018-04-13 14:03:09",
      id: 4,
      username: "gfsjkjlkds"
    },
    subComments: [],
    subCount: 0,
    topComment: [],
    updateAt: "2018-04-13 15:42:08",
    userId: 4,
    userInfo: {
      avatar: "",
      createAt: 1523599389809,
      create_address : "浙江省 杭州市",
      create_time: "2018-04-13 14:03:09",
      id: 4,
      username: "gfsjkjlkds"
    }
  }
}
```

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
