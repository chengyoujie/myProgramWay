# AutoCodeEUI
根据当前编辑器中的exml 文件生成对应的代码

使用说明：

1.在编辑器中打开当前需要导出的exml文件。

2.使用快捷键 `ctr+shift+p` 打开输入框中输入`AutoCodeEUI` 按下回车即可 【或者直接按`F12`即可】

## 模板文件中的变量
> **auth** 当前使用者的名字，可在config中配置

> **time** 当前时间 yyyy-mm-dd hh:mm:ss

> **path** 当前exml文件的相对workspace路径

> **fileName** 当前exml的文件名(不含后缀)

> **baseClsName** 当前exml文件 去掉Skin,EuiSkin后的名字

> **moduleID** 根据当前 `shortName` 生成大写的常量值

> **varids** exml中所有的id变量声明字符串

> **interfaceIds** exml中所有的id 接口声明字符串

> **shortName** 当前的`baseClsName`去掉create配置中的keyword后的名字

> **skinName** exml中class对应的值即皮肤的名字 如果没有则使用`baseClsName`

## 模板中使用保护域
对于覆盖的文件中可能有部分代码希望不覆盖的时候可以在**模板文件**里加上保护域 如：

` /**area1--start**/ 这里是受保护的内容1 ... /**area1--end**/ `

` /**area2--start**/ 内容2 ... /**area2--end**/ `

    ...

生成代码后可以保护域中添加 内容，下次生成的时候保护域里的内容不变

注：area后面紧跟数字，要成对出现，`*` 号至少一个，   新增的话必须在**模板中新增**， 如果在已经生成的代码内新增会丢失的

# AutoCodeEUIConfig
打开当前的配置 `app.config.json`

使用说明：

1.使用快捷键 `ctr+shift+p` 打开输入框中输入`AutoCodeEUIConfig` 按下回车即可打开配置文件

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

>> **outdir** 导出在对应模块文件下的的文件夹名  如果是[xxxx/xxx]则表示导出在相对跟路径的文件夹 

>> **override** 是否覆盖， 生成的文件如果不存在则新建，如果存在则override=true时覆盖，override=false时不覆盖

>> **fileType** 生成文件的文件类型



示例：
```
{
    "auth":"",
    "defaultcreate":1,
    "moduleCodePath":"src/game/module/",
    "create":
    [
        {"keyword":"MainPanel", "usemodule":"1,4,5,6,8"},
        {"keyword":"View", "usemodule":"1"},
        {"keyword":"Panel", "usemodule":"1,10"},
        {"keyword":"Render", "usemodule":"2,3"}
    ],
    
    "module":
    {
        "1":{"id":1,    "name":"UI",        "file":"UI.txt",            "outdir":"[src/game/ui]",          "override":true, "fileType":"ts"},
        "2":{"id":2,    "name":"RenderUI",  "file":"RenderUI.txt",      "outdir":"[src/game/ui]",          "override":true, "fileType":"ts"},
        "3":{"id":3,    "name":"Render",    "file":"Render.txt",        "outdir":"view",                    "override":false, "fileType":"ts"},
        "4":{"id":4,    "name":"MainView",  "file":"MainView.txt",      "outdir":"view",                    "override":false, "fileType":"ts"},
        "5":{"id":5,    "name":"Module",    "file":"Module.txt",        "outdir":"",                        "override":false, "fileType":"ts"},
        "6":{"id":6,    "name":"Mediator",  "file":"Mediator.txt",      "outdir":"",                        "override":false, "fileType":"ts"},
        "8":{"id":8,    "name":"Model",     "file":"Model.txt",         "outdir":"model",                   "override":false, "fileType":"ts"},
        "10":{"id":10,  "name":"Panel",     "file":"Panel.txt",         "outdir":"view",                    "override":false, "fileType":"ts"}
    }
}
```
# AutoCodeEUIModule
打开当前模板文件

使用说明：

1.使用快捷键 `ctr+shift+p` 打开输入框中输入`AutoCodeEUIModule` 按下回车即可打开模板文件