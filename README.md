# 房源管理平台重构

## 返回状态码
```
103  token 超时,重新登录
104  权限验证失败,密码错误

200  数据返回成功
204  操作成功（对于数据的增删改）

304  本次请求（修改/新增）有重复记录

502  服务器挂掉
504  服务器连接超时
506  数据库异常
```
##  模块管理
  映射关系 0 楼盘管理 1 城市配置  2 用户管理

## 返回字段字典
```
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ctime` int(24) DEFAULT '0' COMMENT '用户创建时间',
  `utime` int(24) DEFAULT '0' COMMENT '用户更新时间',
  `name` varchar(225) DEFAULT '' COMMENT '用户登录信息',
  `status` int(24) DEFAULT '0' COMMENT '0 禁用, 1 启用',
  `password` varchar(225) DEFAULT '' COMMENT '用户-密码 MD5解码',
  `allcitys` int(11) DEFAULT '0' COMMENT '用户是否可以选择全部城市 0可以 1不可以',
  `allmenus` int(11) DEFAULT '0' COMMENT '用户是否可以看全部菜单 0可以 1不可以',
  `user_name` varchar(225) DEFAULT '' COMMENT '用户-昵称',
  `user_menus` varchar(225) DEFAULT '' COMMENT '用户菜单列表:0 楼盘管理 1 城市配置 2 用户管理 使用 # 号分割',
  `user_roles` int(11) DEFAULT '0' COMMENT '用户-角色:0超级管理员,1管理员,2用户',
  `user_citys` varchar(225) DEFAULT '' COMMENT '用户可以查看的城市:ID 拼接 #'
```


## 接口

### 1.登陆接口
#### 请求参数:
```
Query = {
  User: {
    name: 'admin',        //用户输入姓名
    Password: 'admin2018' //用户输入密码
  }
}
```
#### 返回参数:
```
Res = {
  code: 200|103|104,    //状态码
  message: '详细信息',
  data:{
    token: 'MTU0MTI2MDMxMi41OTA0MjI5OjNmZjljMzFmNGVmNzdkOWExYzU3M2Y5N2Q4M2QxYmY0MThjMGQ4MGQ=', //token
    user: {
      allcitys: 0|1,          // 城市权限   0全部,1部分
      allmenus: 0|1,          // 列表权限   0全部,1部分
      user_citys: '',         // 权限城市   当城市权限为1时,这个字段有值
      user_menus: [],         // 权限内的列表模块   当列表权限为1时,这个字段有值
      id: 1                   // 用户id
      name: 'admin'           // 用户名
      status: 1|0,            // 代表权限有没有开启   0 禁用, 1 启用
      user_name: '系统管理员', // 用户昵称
      user_roles: 0,          // 用户等级   0超级管理员,1管理员,2用户
    }
  }
```

### 2.城市列表接口
#### 请求参数:
```
Query = {
  User: {
    name: 'admin@zhuge.com',   // 用户名
    token: 'MTU0MTc3MzkyNS44MTgzOTE2OmMwNWFjMjMwMTQ4YzljNmJlOGE5M2U3OTFmY2M5ZWRiNDFkZmIzMjk='  // token
  }
}
```
#### 返回参数:
```
Res={
  "code": 200,
  "page": {
    "total": 339,
    "index": 1,
    "size": 10 
  }  
  data: [
    {
      "id": 1, 
      "name": "北京", //城市
      "url": "bj.fangzhur.com", 
      "is_proxy": 0, 
      "status": 0, //状态
      "logo": "city/logo/20140616174454.jpg",
      "add_time": 1346934434,
      "pid": 1,
      "is_hot": 1,
      "logogram": "bj",
      "lat": "39.917149",
      "lng": "116.403694",
      "img_s1": "city/logo/20140509171027.jpg",
      "img_s2": "city/logo/20140422185138.jpg",
      "img_s3": "city/logo/20140423105053.jpg",
      "sort": 1,
      "is_open": 1,
      "is_show": 2,
      "is_pay_type": 1,
      "is_sell": 1,
      "is_rent": 1,
      "is_newhouse": 1,
      "is_apartment": 0,
      "is_b": 1,
      "sell_db": 1,
      "rent_db": 1,
      "newhouse_db": 1,
      "city_fpy": "beijing",
      "u_line": null,
      "u_price": null,
      "u_property": null,
      "u_subway": null,
      "is_audit": 0
    }
  ]
}
```

### 3.楼盘点评列表接口
#### 请求参数:
```
Query = {
  User: {
    name: 'admin@zhuge.com',   // 用户名
    token: 'MTU0MjAzMjkxNy4wMjQ1MDk0OjAyN2I3Nzg3YzY3YjcwZTZmM2FhNjA3NmI5Y2QyMDM5OTI1OWU2NTk='  // token
  }
}
```
#### 返回参数:
```
Res={
  "code": 200,
  "page": {
    "total": 29,
    "index": 1,
    "size": 10 
  }  
  data: [
    {
      "id": 322, //ID
      "complex_id": 16, 
      "source_id": 2, //来源渠道
      "comment_source": "安居客", 
      "comment_showtime": "2018-02-04", 
      "comment_time": 0,//点评时间
      "comment_url": "https://ab.fang.anjuke.com/loupan/dianping-442839.html",
      "comment_content": "这个楼盘4000.5000还是可以考虑养老的。自己住或者都不行，这个所谓的达血城，学生不足几百人。买东西不方便，到哪里都远，三不沾，不沾眉山，不沾仁寿，不沾成都，说发展是催牛的，起码30年，人生有几个30年，看看30年后有没有县城的规模，即便有，看看四川那个县城是10000以上的房价。我开车到兴龙湖20分钟，20公里，请看清楚是20公里 ，远的很，因为现在没车，超速跑的，以后车多了肯定会堵车 ，起码到兴龙湖要一个小时。现在到华阳35分钟 到三环55分钟，以后要多久时间，你懂的", //点评内容
      "upload_status": 0,
      "pic_url": "",
      "pic_source_url": "",
      "comment_user": "ajk1911", //点评昵称
      "ctime": 1539084086,
      "utime": 0,
      "unique_key": "77d972d97b19ca4758701e4cfc574153",
      "price_score": null,
      "location_score": null,
      "traffic_score": null,
      "suit_score": null,
      "environ_score": null,
      "comprehensive_score": null,
      "user_id": null,
      "user_head": null,
      "buy_status": null,
      "extends": null
    },
  ]
}
```

### 4.账号管理
#### 请求参数:
```
Query = {
  User: {
    name: 'admin@zhuge.com',   // 用户名
    token: 'MTU0MTc3MzkyNS44MTgzOTE2OmMwNWFjMjMwMTQ4YzljNmJlOGE5M2U3OTFmY2M5ZWRiNDFkZmIzMjk=' //token
  },
   "filter": {
    "user_roles": 1,//用户角色
    "status": 1//启用状态
  },
  "page": {
    "index": 1,//分页页数
    "size": 5，//分页每页个数
  }
}
```
#### 返回参数:
```
Res={
  "code": 200,
  "page": {
    "total": 339,
    "index": 1,
    "size": 10 
  }  
  data: [
  
  ]
}
```

### 5.楼盘列表地铁线及地铁站
#### 请求参数：
```
Query = {
  {
    "city": "bj",
    "page": {
      "index": 1,
      "size": 10
    }
  }
}
```
####返回参数：
```
Res = {
  "message": "success",
  "code": 200,
  "time": 0.0064296722412109375,
  "page": {},
  "data": {
    "info": [
      {
        "_id": 1,
        "byname": [
          "15号线",
          "地铁15号线"
        ],
        "name": "15号线",
        "list_station": {
          "清华东路西口": 1,
          "六道口": 2,
          "北沙滩": 3,
          "奥林匹克公园": 4,
          "安立路": 5,
          "大屯路东": 6,
          "关庄": 7,
          "望京西": 8,
          "望京": 9,
          "望京东": 280,
          "崔各庄": 10,
          "马泉营": 11,
          "孙河": 12,
          "国展": 13,
          "花梨坎": 14,
          "后沙峪": 15,
          "南法信": 16,
          "石门": 17,
          "顺义": 18,
          "俸伯": 19
        }
      }
    ],
    "nums": 18,
    "case": 1
  }  
}
```

### 新房城区列表接口
#### 请求参数:
```
Query = {
  "filter": {},
  "sort": {
    "name": 1,
    "id": -1
  },
  "page": {
    "index": 1,
    "size": 30
  }
}
```

####返回参数
```
Res={
  "message": "success",
  "code": 200,
  "time": 0.09784770011901855,
  "page": {
    "index": 1,
    "size": 30,
    "total": 29
  },
  "data": [
    {
      "_id": 1,
      "loc": {
        "lat": 40.220804,
        "lng": 116.231254
      },
      "name": "昌平",
      "area_pinyin": "changping",
      "cityarea2List": [
        {
          "_id": 101,
          "name": "北七家",
          "area2_pinyin": "beiqijia"
        },
        {
          "_id": 102,
          "name": "昌平县城",
          "area2_pinyin": "changpingxiancheng"
        },
        {
          "_id": 103,
          "name": "回龙观",
          "area2_pinyin": "huilongguan"
        },
        {
          "_id": 104,
          "name": "霍营",
          "area2_pinyin": "huoying"
        },
        {
          "_id": 105,
          "name": "立水桥",
          "area2_pinyin": "lishuiqiao"
        },
        {
          "_id": 106,
          "name": "南邵",
          "area2_pinyin": "nanshao"
        },
        {
          "_id": 107,
          "name": "其他",
          "area2_pinyin": "qita8"
        },
        {
          "_id": 108,
          "name": "沙河",
          "area2_pinyin": "shahe"
        },
        {
          "_id": 109,
          "name": "小汤山",
          "area2_pinyin": "xiaotangshan"
        }
      ]
    }
  ]
}
```

### 楼盘点评来源渠道
#### 请求参数：
```
Query = {
  "city_fps": "bj",
  "service_type": 2
}
```

#### 返回参数：
```
Res = {
  "message": "success",
  "code": 200,
  "time": 0.06545019149780273,
  "page": {},
  "data": [
    {
      "company_id": null,
      "city_name": "北京",
      "source_id": 4,
      "service_type": 2,
      "city": "bj",
      "city_en": "beijing",
      "city_id": 1,
      "details_key": "beijing-lianjia-complex_details",
      "batch": 10000,
      "priority": 1,
      "etlstatus": "True",
      "source_owner": null,
      "name": "链家地产",
      "abbr": "链家地产",
      "source_en": "lianjia",
      "channel_son": null
    },
    },
}
```
### 地铁列表
#### 请求参数:
```
Query = {
  "city": "bj",
  "page": {
    "index": 1,
    "size": 10
  }
}
```
#### 返回参数:
```
Res={
  "message": "success",
  "code": 200,
  "time": 0.002191781997680664,
  "page": {},
  "data": {
    "info": [
      {
        "_id": 1,
        "byname": [
          "15号线",
          "地铁15号线"
        ],
        "name": "15号线",
        "list_station": {
          "清华东路西口": 1,
          "六道口": 2,
          "北沙滩": 3,
          "奥林匹克公园": 4,
          "安立路": 5,
          "大屯路东": 6,
          "关庄": 7,
          "望京西": 8,
          "望京": 9,
          "望京东": 280,
          "崔各庄": 10,
          "马泉营": 11,
          "孙河": 12,
          "国展": 13,
          "花梨坎": 14,
          "后沙峪": 15,
          "南法信": 16,
          "石门": 17,
          "顺义": 18,
          "俸伯": 19
        }
      },
}
```

### 售楼电话
#### 请求参数:
```
Query = {
  "cms_id": 117368
}
```
#### 返回参数:
```
Res={
  "message": "success",
  "code": 200,
  "time": 0.0025582313537597656,
  "page": {},
  "data": [
    {
      "bigcodetel": 4008108898,
      "extcode": 18897,
      "from": "app",
      "cms_id": 117368,
      "platform": 0,
      "channel": 0,
      "sale_phone": "0",
      "ctime": 1542283734,
      "utime": 1542283734
    },
  ]
}
```
### 楼盘基础信息修改(排序/审核状态)
#### 请求参数：
```
Query = {
  "user": {
    "token": "YicxNTQzNDY0MDM1Ljg3NzAzMDEnPz8_Yjc1MDM0MTEzODkzMjMwYWY3NDhkZTYwYzBkMjkxNGYzM2U3YTU4YQ=="
  },
  "filter": {
    "1": {
      "cms_id": 1,
      "top_weight": 2,
      "checked": 1
    }
  }
}
```
#### 返回参数：

Res = {
  "message": "success",
  "code": 204,
  "time": 0.004915475845336914,
  "page": {},
  "data": ""
}

