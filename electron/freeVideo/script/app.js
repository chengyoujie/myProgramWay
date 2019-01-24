// const browser = document.getElementById("browser");
// // const devetools = document.getElementById("devetools");
// const btnIQiYi = document.getElementById("btnIQiYi");
const sel = document.getElementById("sel");
const btnPre = document.getElementById("btnPre");
const btnNext = document.getElementById("btnNext");
const btnRefush = document.getElementById("btnRefush");
const openVideoWin = document.getElementById("openVideoWin");

let config;
let curseldata;

ipcRenderer.once('configdata', (event, arg) => {
    config = arg;
    if(config.mainurl)
    {
        browser.src = config.mainurl;
    }
  })

 
ipcRenderer.on('file', (event, arg) => {
    switch(arg.oper){
        case "open":
            shell.openItem(savepath);
        break;
        case "savepath":
            config.savepath = arg.data;
            saveConfig();
        break;
    } 
  });
  ipcRenderer.on("abuout", (event, arg)=>{
    switch(arg)
    {
        case "made":
        alert("Web Res Thife made by cyj 2018-09-24");
        break;
        case "use":
        alert("点击左上角列表可选择视频播放网站，如有没打开解析的播放器可右键  '播放器中打开'。  在播放器中无法解析可选择右上角的其他解析地址解析");
        break;
    }
    
  })

  
  ipcRenderer.on("web", (event, arg)=>{
      switch(arg)
      {
          case "main":
          browser.src = config.mainurl||"http:www.baidu.com";
          break;
          case "pre":
            browser.goBack();
          break;
          case "next":
            browser.goForward();
          break;
          case "refush":
            browser.reload();
          break;
          case "clear":
            browser.clearHistory();
            alert("清除完毕");
          break;
      }
  })

  btnPre.onclick = function()
  {
      browser.goBack();
  }
  btnNext.onclick = function()
  {
      browser.goForward();
  }
  btnRefush.onclick = function()
  {
    browser.reload();
  }
  openVideoWin.onclick = function()
  {
    dealVideoView(browser.src, true, false)
  }
  

  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;
  const menu = new Menu();
  menu.append(new MenuItem({ label: '播放器中打开', click: function() {   ipcRenderer.send('openvideo', {url:browser.src });  }}))
  menu.append(new MenuItem({ label: '设置为主页', click: function() {ipcRenderer.send('save', {mainurl:browser.src })}}))
//   menu.append(new MenuItem({ type: 'separator' }));
//   menu.append(new MenuItem({ label: '记录', type: 'checkbox', checked: true }));
  
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }, false);
// Modify the user agent for all requests to the following urls.

function saveConfig()
{
    ipcRenderer.send('saveconfig', config)
}



// browser.addEventListener('new-window', (e) => {
//     const protocol = url.parse(e.url).protocol;
//     console.log("new window :"+e.url)
//     if (protocol === 'http:' || protocol === 'https:') {
//         dealVideoView(e.url, true);
//     }
// });

function dealVideoView(vdurl, isNew, checkURL=true)
{
    if(checkURL==false)
    {
        ipcRenderer.send('openvideo', {url:vdurl});
        return;
    }
    var reg = curseldata && curseldata.reg;
    if(!reg)return;
    reg.lastIndex = 0;//初始化lastIndex
    if(reg.exec(vdurl))
    {
        console.log("find video url:"+vdurl);
        // vdurl = "http://000o.cc/jx/ty.php?url="+vdurl;
        ipcRenderer.send('openvideo', {url:vdurl});
    }else{
        // var blackreg = curseldata && curseldata.blackreg;
        // if(blackreg)
        // {
        //     blackreg.lastIndex = 0;
        //     if(blackreg.exec(vdurl)){
        //         console.log("即将进行跳转");
        //         return;
        //     }
                
        // }
        console.log("not found "+vdurl);
        for(let i=0; i<seldata.length; i++)
        {
            let reg = seldata[i].reg;
            if(reg)
            {
                reg.lastIndex = 0;
                if(reg.exec(vdurl))
                {
                    ipcRenderer.send('openvideo', {url:vdurl});
                    return;
                }
            }
        }
        if(browser.src != vdurl)
            browser.src = vdurl;
    }
    
}

browser.addEventListener("dom-ready", onReady);
function onReady() {
    browser.removeEventListener("dom-ready", onReady);
//     const bro = browser.getWebContents();
//     bro.setDevToolsWebContents(devetools.getWebContents())
//     const filter = {
//         urls: ['*']
//     }
//     console.log("======== Welcome Use FreeVideo ==============")

    browser.addEventListener('new-window', (e) => {
        const protocol = url.parse(e.url).protocol;
        if (protocol === 'http:' || protocol === 'https:') {
            dealVideoView(e.url, true);
        }
    });

    // browser.addEventListener('did-navigate-in-page', (e)=>{
        // console.log("did-navigate-in-page:",e);
    // })

    
    // browser.addEventListener('did-navigate', (e)=>{
        // console.log("did-navigate:",e);
    // })

    
    browser.addEventListener('will-navigate', (e)=>{
        // console.log("will-navigate:",e);
        const protocol = url.parse(e.url).protocol;
        if (protocol === 'http:' || protocol === 'https:') {
            dealVideoView(e.url, true);
        }
        e.preventDefault();
    })

    
    // browser.addEventListener("load-commit", (e)=>{
    //     console.log("网页加载完成",e.url);
    //     dealVideoView(e.url, false);
    // });

//     // var browserWindow = browser;
//     if (bro.debugger.isAttached() == false) {
//         try {
//             bro.debugger.attach("1.1");
//         } catch (err) {
//             console.log("Debugger attach failed : ", err);
//         }
//     }

//     bro.debugger.on('detach', (event, reason) => {
//         console.log("Debugger detached due to : ", reason);
//     });


//     bro.debugger.on('message', (event, method, params) => {
//         // console.log(event, method, params);
//         if (method === 'Network.responseReceived') {

//             // console.log('Event: responseReceived ' + params.requestId + '-' + params.response.url)
//             var url = params.response.url;
//             // console.log("=======NetWork Response Received : "+url)
//             // bro.debugger.sendCommand('Network.getResponseBody', {
//             //     "requestId": params.requestId
//             // }, (error, result) => {
               
//             // })
//         }
//         // if (method === 'Network.webSocketFrameReceived') {
//         //     console.log("Network.webSocketFrameReceived" + params.response)
//         // }

//     });

//     bro.debugger.sendCommand("Network.enable");

}


var seldata = [
    {id:1, name:"爱奇艺", url:"https://www.iqiyi.com/", reg:/^https*:\/\/(www\..*?iqiyi.*?\/(a|v)_.*?)/gi},//http://so.iqiyi.com/links/  http://www.iqiyi.com/v_19rr2rp7b4.html
    {id:2, name:"优酷", url:"http://www.youku.com/", reg:/^https*:\/\/.*?youku.*?\/v_show.*?/gi},
    {id:3, name:"腾讯", url:"https://v.qq.com/", reg:/^https*:\/\/.*?qq.*?\/x\/cover.*?/gi},
    {id:4, name:"土豆", url:"http://www.tudou.com/", reg:/^https*:\/\/.*?tudou.*?\/v\/.*?/gi},
    {id:5, name:"PPTV", url:"http://www.pptv.com/", reg:/^https*:\/\/.*?pptv.*?\/show\/.*?/gi},
    {id:6, name:"搜狐", url:"https://tv.sohu.com/", reg:/^https*:\/\/.*?sohu.*?\/album\/.*?/gi},
    {id:7, name:"芒果", url:"https://www.mgtv.com/movie/", reg:/^https*:\/\/.*?mgtv.*?\/[b|l]\/.*?/gi},
]
curseldata = seldata[0];
browser.src = curseldata.url;
for (var i in  seldata)
{
    var opt = document.createElement ("option");
    opt.value = seldata[i].url;
    opt.innerText = seldata[i].name;
    sel.appendChild (opt);
}
sel.onchange = function (e)
{
    var index = sel.selectedIndex;
    if(index<0)return;
    curseldata = seldata[index];
    if(curseldata)
    {
       browser.src = curseldata.url;
    }
}

