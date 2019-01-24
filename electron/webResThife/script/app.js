
const browser = document.getElementById("browser");
const devetools = document.getElementById("devetools");
const btnGo = document.getElementById("btnGo");
const btnRecode = document.getElementById("btnRecode");
const inputURL = document.getElementById("inputURL");


const pathblock = "_"
const savepolicy = SavePolicy_ChoiceSave; //保存策略

let config;
let isRecode = false;
let resid2url = {};

ipcRenderer.once('configdata', (event, arg) => {
    config = arg;
    if(config.mainurl)
    {
        browser.src = config.mainurl;
    }
    isRecode = config.isRecode||false;
    savepath = config.savepath || "D:/testsave/";
    refushRecodeShow();
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
        alert("Web Res Thife made by cyj 2018-09-23");
        break;
        case "use":
        alert("点击右上角的开始（或者右键记录）开始保存网页文件到本地， 点击暂停或者再次（右键点击记录）关闭保存");
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
          case "clear":
            browser.clearHistory();
            alert("清除完毕");
          break;
          case "devtools":
            browser.openDevTools();
          break;
      }
  })

  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;
  const menu = new Menu();
  menu.append(new MenuItem({ label: '记录', type: 'checkbox', checked: isRecode , click:recodeLoadFile}));
  menu.append(new MenuItem({ label: '设置为主页', click: function() {ipcRenderer.send('save', {mainurl:browser.src })}}))
//   menu.append(new MenuItem({ type: 'separator' }));
//   menu.append(new MenuItem({ label: '记录', type: 'checkbox', checked: true }));
  
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }, false);
// Modify the user agent for all requests to the following urls.

btnGo.onclick = function () {
    loadInputUrl();
}
btnRecode.onclick = function(){
    recodeLoadFile();
}

inputURL.onkeydown = function (e){
    if(e.keyCode == 13)
    {
       loadInputUrl();
    }
};

function loadInputUrl()
{
    let url = inputURL.value;
    if (!url) {
        alert("URL不能为空");
        return;
    }
    browser.src = url;
}


function recodeLoadFile()
{
    isRecode = !isRecode;
    refushRecodeShow();
    if(config)
    {
        config.isRecode = isRecode;
        saveConfig();
    }
}
function refushRecodeShow()
{
    if(menu && menu.items.length>0)
        menu.items[0].checked = isRecode;
    btnRecode.textContent = isRecode?"暂停":"开始";
}

function saveConfig()
{
    ipcRenderer.send('saveconfig', config)

}


browser.addEventListener("load-commit", (e)=>{
    inputURL.value = e.url;
});

browser.addEventListener("dom-ready", onReady);
function onReady() {
    browser.removeEventListener("dom-ready", onReady);
    const bro = browser.getWebContents();
    bro.setDevToolsWebContents(devetools.getWebContents())
    const filter = {
        urls: ['*']
    }
    console.log("======== Welcome Use WebResThife ==============")

    browser.addEventListener('new-window', (e) => {
        const protocol = url.parse(e.url).protocol;
        if (protocol === 'http:' || protocol === 'https:') {
            browser.src = e.url;
        }
    });

    // var browserWindow = browser;
    if (bro.debugger.isAttached() == false) {
        try {
            bro.debugger.attach("1.1");
        } catch (err) {
            console.log("Debugger attach failed : ", err);
        }
    }

    bro.debugger.on('detach', (event, reason) => {
        console.log("Debugger detached due to : ", reason);
    });


    bro.debugger.on('message', (event, method, params) => {
        // console.log(event, method, params);
        if(!isRecode)return;
        var url;
        
        if (method === 'Network.webSocketFrameReceived') {
            console.log("Network.webSocketFrameReceived" + params.response)
        }
        if (method != 'Network.responseReceived' && method != "Network.loadingFinished") return;

            // console.log('Event: responseReceived ' + params.requestId + '-' + params.response.url)
			if(method == 'Network.responseReceived')
			{
				url = params.response.url;
                resid2url[params.requestId]= url;
				
				try {
					url = decodeURI(url);
				} catch (e) {
					console.log("error:" + url)
				}
            }else if(method == "Network.loadingFinished")
            {
                url = resid2url[params.requestId];
            }
            if(!url)return;
            if (url.indexOf("data:") == 0) {
                var reg = /^data:(\w+)*[\/\\]*(\w+)*;*([\w|-]+)*;*(\w+)*,/gi;
                var arr = reg.exec(url);
                console.log("url:"+url+" data:", arr);
                var type = "text";
                if (arr) {
                    let hole = arr[0];
                    let type = arr[1] || "text";
                    let ext = arr[2] || "text";
                    if (ext == "javascript") ext = "js";
                    else if (ext == "x-icon") ext = "icon";
                    let encode = arr[3] || "utf8";
                    let datafdir = savepath + "/__DATA__";
                    if (fs.existsSync(datafdir) == false)
                        fs.mkdirSync(datafdir);
                    let datafpath = datafdir + "/" + Date.now() + pathblock + Math.floor(Math.random() * 1000000) + "." + ext;
                    fs.writeFileSync(datafpath, Buffer.from(url.replace(hole, ""), encode));
                    // console.log("写入文件：" + datafpath)
                }
                console.log("not found:"+url);
                return;
            }
            // console.log("Will getResponseBody : "+method+"    url:"+url);
            bro.debugger.sendCommand('Network.getResponseBody', {
                "requestId": params.requestId
            }, (error, result) => {
                if (!error || JSON.stringify(error) == "{}") {
                    var data;
                    var fpath = url;
                    try {
                        fpath = decodeURI(fpath);
                    } catch (e) {}
                    var fname = "";
                    fpath = fpath.replace(/http:\/\/|https:\/\/|ftp:\/\//gi, savepath);
                    var fwindex = fpath.lastIndexOf("?");
                    var fplist;
                    if (fwindex != -1) {
                        fplist = fpath.substring(0, fwindex).split("/");
                        if (fplist.length > 0)
                            fplist[fplist.length - 1] = fplist[fplist.length - 1] + fpath.substring(fwindex);
                    } else {
                        fplist = fpath.split("/");
                    }
                    var fdir = fplist[0]; //盘符
                    for (var i = 1; i < fplist.length; i++) {
                        var pname = fplist[i];
                        if (i == fplist.length - 1) {
                            pname = getFileNameByUrl(pname);
                            fplist[i] = pname;
                        } else { //逐层判断如果没有该文件夹则新生成个文件夹
                            pname = getFileRuleName(pname);
                            fdir = fdir + "/" + pname;
                            if (fs.existsSync(fdir) == false)
                                fs.mkdirSync(fdir);
                        }
                    }
                    fpath = fplist.join("/");
                    var fname = path.basename(fpath);
                    fpath = fdir + "/" + fname;
                    fs.writeFileSync(fpath, Buffer.from(result.body, (result.base64Encoded ? "base64" : "utf8")))
                    // console.log("写入文件：" + fpath)
                } else {
                    console.log(`getResponseBody error: ${JSON.stringify(error)}    url:${url}`);
                    //如果有错误的话直接用url加载下试试。

                }
            })

    });

    bro.debugger.sendCommand("Network.enable");

}