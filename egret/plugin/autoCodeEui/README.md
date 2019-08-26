# AutoCodeEUI
根据当前编辑器中的exml 文件生成对应的代码

使用说明：

1.在编辑器中打开当前需要导出的exml文件。

2.使用快捷键 `ctr+shift+p` 打开输入框中输入`AutoCodeEUI` 按下回车即可

## 模板文件中的变量
> **auth** 当前使用者的名字，可在config中配置

> **time** 当前时间 yyyy-mm-dd hh:mm:ss

> **path** 当前exml文件的相对workspace路径

> **fileName** 当前exml的文件名(不含后缀)

> **baseClsName** 当前exml文件 去掉Skin,EuiSkin后的名字

> **moduleID** 根据当前 baseClsName 生成大写的常量值

> **varids** exml中所有的id变量声明字符串


# AutoCodeEUIConfig
打开当前的配置 `app.config.json`

使用说明：

1.使用快捷键 `ctr+shift+p` 打开输入框中输入`AutoCodeEUI` 按下回车即可打开配置文件

## 配置说明

说明：
> **auth** 当前使用者的名字，不填则默认使用计算机名   模板中的${auth}变量

> **defaultcreate** 默认create索引   如果当前文件名没有匹配到create[]中的keyword则使用的create[]的索引

> **moduleCodePath** module文件生成的路径

> **create** 创建文件的信息 `Array<{keyword, usemodule}>`

>> **keyword** 匹配exml文件名的关键字， 如果exml文件名中存在此关键字则使用此create创建文件  可以使用` | `分开多个关键字

>> **usemodule** 使用那些module 可以使用` , `分开多个moudle

> **module** 每一个生成模板的详细信息`{[id:string]:{id, name, file,  outdir, override, fileType}}`

>> **id** 模板的id标识

>> **name** 生成文件的后缀名

>> **file** 模板的文件名

>> **outdir** 导出在对应模块文件下的的文件夹名 

>> **override** 是否覆盖， 生成的文件如果不存在则新建，如果存在则override=true时覆盖，override=false时不覆盖

>> **fileType** 生成文件的文件类型


示例：
```
{
    "auth":"",
    "defaultcreate":0,
    "moduleCodePath":"src/game/module/",
    "create":
    [
        {"keyword":"View", "usemodule":"1"},
        {"keyword":"Panel", "usemodule":"1,4,5,6,7"},
        {"keyword":"Render", "usemodule":"2,3"}
    ],
    
    "module":
    {
        "1":{"id":1, "name":"View", "file":"View.txt", "outdir":"view", "override":true, "fileType":"ts"},
        "2":{"id":2, "name":"RenderView", "file":"RenderView.txt", "outdir":"view", "override":true, "fileType":"ts"},
        "3":{"id":3, "name":"Render", "file":"Render.txt", "outdir":"", "override":false, "fileType":"ts"},
        "4":{"id":4, "name":"MainView", "file":"MainView.txt", "outdir":"", "override":false, "fileType":"ts"},
        "5":{"id":5, "name":"Module", "file":"Module.txt", "outdir":"", "override":false, "fileType":"ts"},
        "6":{"id":6, "name":"Mediator", "file":"Mediator.txt", "outdir":"", "override":false, "fileType":"ts"},
        "7":{"id":7, "name":"Service", "file":"Service.txt", "outdir":"", "override":false, "fileType":"ts"}
    }
}
```
