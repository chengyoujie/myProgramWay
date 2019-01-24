const browser = document.getElementById("browser");
const btnMax = document.getElementById("btnMax");
const btnMin = document.getElementById("btnMin");
const btnLock = document.getElementById("btnLock");
const sel = document.getElementById("sel");
const btnClose = document.getElementById("btnClose");


let data;
let selectitem;
let win = remote.getCurrentWindow();


const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const menu = new Menu();
menu.append(new MenuItem({ label: '始终显示在最前',type: 'checkbox', checked: win.isAlwaysOnTop() , click: function() 
    {  
        if(win.isAlwaysOnTop())
        {
            win.setAlwaysOnTop(false);  
            menu.MenuItem
        }else{
            win.setAlwaysOnTop(true);  
        }
        menu.items[0].checked = isRecode;
    }
}))
menu.append(new MenuItem({ label: '刷新' , click: function() 
    {  
        browser.reload();
    }
}))
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }, false);

ipcRenderer.once('data', (event, arg) => {
    data = arg;
    refushView();
})

function refushView()
{
    if(!selectitem)
    {

        alert("当前没有选择解析地址");
        return;
    }
    if(data && data.url)
    {
        browser.src = selectitem.url+data.url;
        console.log("实际用的URL:"+browser.src);
    }else{
        alert("面板参数错误："+JSON.stringify(data));
    }
}


btnMax.onclick = function()
{
    if(win.isMaximized())
    {
        win.unmaximize();
    }else{
        win.maximize();
    }
   
}

btnMin.onclick = function()
{
    win.minimize();
}

btnLock.onclick = function()
{
    if(win.isAlwaysOnTop())
    {
        win.setAlwaysOnTop(false);  
    }else{
        win.setAlwaysOnTop(true);  
    }
}

btnClose.onclick = function()
{
    win.close();
}

function refushButtonShow()
{
    if(win.isMaximized())
    {
        btnMax.innerText = "回"
    }else{
        btnMax.innerText = "口"
    }
}

sel.onchange = function (e)
{
    var index = sel.selectedIndex;
    if(index<0)return;
    selectitem = seldata[index];
    if(selectitem)
    {
        refushView();
    }
}


browser.addEventListener("dom-ready", onReady);
function onReady() {
    browser.removeEventListener("dom-ready", onReady);
    // browser.openDevTools();
    refushButtonShow();
    win.on("maximize", refushButtonShow);
    win.on("unmaximize", refushButtonShow);
}

var seldata = [
    {name:"优质线路1",url:"http://000o.cc/jx/ty.php?url="},
    {name:"优质线路2",url:"http://www.wmxz.wang/video.php?url="},
    {name:"优质线路3",url:"http://yun.mt2t.com/yun?url="},
    {name:"优质线路4",url:"http://aikan-tv.com/?url="},
    {name:"优质线路5",url:"http://www.sfsft.com/admin.php?url="},


    // {name:"通用解析7",url:"http://www.yydy8.com/Common/?url="},
    // {name:"迅雷磁力链",url:"http://apiv.ga/magnet/"},
    // {name:"万能接口",url:"aikan-tv.com/tong.php?url="},
    // {name:"爱奇艺vip接口",url:" aikan-tv.com/qy.php?url="},
    // {name:"腾讯VIP解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"优酷VIP解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"乐视VIP解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"芒果VIP解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"搜狐VIP解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"A站解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"B站解析接口",url:" aikan-tv.com/tong.php?url="},
    // {name:"万能解析接口",url:"http://www.vipjiexi.com/tong.php?url="},
    // {name:"通用解析9",url:"http://api.mp4la.net/?url="},
    // {name:"通用解析10",url:"http://yyygwz.com/index.php?url="},
    // {name:"通用解析11",url:"http://v.72du.com/api/?url="},
    // {name:"通用解析12",url:"http://api.47ks.com/webcloud/?v="},
    // {name:"通用解析13",url:"http://jx.71ki.com/index.php?url="},
    // {name:"通用解析14",url:"http://www.97zxkan.com/jiexi/97zxkanapi.php?url="},
    // {name:"通用解析16",url:"http://www.bbshanxiucao.top/video.php?url="},
    // {name:"通用解析17",url:"http://www.xiguaso.com/api/index.php?url="},
    // {name:"通用解析18",url:"http://www.kppev.cn/jiexi/5/1/1.php?url="},
    // {name:"通用解析19",url:"http://api.mp4la.net/?url="},
    // {name:"通用解析20",url:"http://v.72du.com/api/?url="},
    // {name:"通用解析21",url:"http://api.47ks.com/webcloud/?v="},
    // {name:"通用解析22",url:"http://jx.71ki.com/index.php?url="},
    // {name:"通用解析23",url:"http://000o.cc/jx/ty.php?url="},
    // {name:"通用解析24",url:"http://5qiyi.sdyhy.cn/5qiyi/5qiyi2.php?url="},
    // {name:"通用解析25",url:"http://vip.sdyhy.cn/ckflv/?url="},
    // {name:"通用解析26",url:"http://player.gakui.top/?url="},
    // {name:"通用解析27",url:"http://qtzr.net/s/?qt="},
    // {name:"乐视解析",url:"http://apn.zhibo99.cn/mdparse/letv.php?id="},
    // {name:"优酷云解析1",url:"http://api.baiyug.cn/vip/index.php?url="},
    // {name:"优酷云解析2",url:"http://977345961.kezi.wang/ykyun/c.php?vid="},
    // {name:"通用解析1",url:"https://api.47ks.com/webcloud/?v="},
    // {name:"通用解析2",url:"http://api.mp4la.net/?url="},
    ];
for (var i in  seldata)
{
    var opt = document.createElement ("option");
    opt.value = seldata[i].url;
    opt.innerText = seldata[i].name;
    sel.appendChild (opt);
}
selectitem = seldata[0];

