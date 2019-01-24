//const electron = require("electron");

const {app, BrowserWindow, Menu, MenuItem} = require('electron');
let win ;
let kwin;
let answerwin;
// let childwin;
app.commandLine.appendSwitch('ppapi-flash-path',app.getPath('pepperFlashSystemPlugin'));
app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.013');


function createWindow()
{
	win = new BrowserWindow({width:1200, height:860, title:"==陈旭专用==",'webPreferences': {
		'plugins': true
	  }
	});
	const appurl = "";//"http://121.196.196.20/appdata/answer/";
	// answerwin = new BrowserWindow({width:600, height:500, parent:win, title:"==陈旭专用=="});
	// childwin = new BrowserWindow({width:800, height:300, parent:win, y:0, x:0});
	//win.webContents.openDevTools()
	if(appurl)
	{
		win.loadURL(appurl+"index.html")
	}else{
		win.loadFile('index.html')
	}
	console.log("-----START-------");
	//create menu 
	var menu = new Menu();
	menu.append(new MenuItem({label:"显示/隐藏 答案", click:function(){ win.webContents.send('showhide');}}))
	menu.append(new MenuItem({label:"刷新", click:function(){ win.webContents.send('refush', 0);}}))
	menu.append(new MenuItem({label:"开发者工具", click:function(){win.webContents.isDevToolsOpened()?win.webContents.closeDevTools():win.webContents.openDevTools()}}))
	menu.append(new MenuItem({label:"考试答案", click:function(){
		if(kwin){kwin.show();return;}
		kwin = new BrowserWindow({  width:800, height:860,  x:0, y:0, webPreferences: {'plugins': true}   });
		  	if(appurl)
			{
				kwin.loadURL(appurl+"kaoshi.html")
			}else{
				kwin.loadFile('kaoshi.html')
			}
			kwin.setMenu(null);
			kwin.on('closed', function() {
				kwin = null;
			  });
		//   win.webContents.send('kaoshi', win);
	}}))
	
	menu.append(new MenuItem({label:"清理缓存", click:function(){ win.webContents.send('clearn', 0);}}))
	menu.append(new MenuItem({label:"关于", click:function(){
		win.webContents.send('about', 0);
	}}))
	Menu.setApplicationMenu(menu);
	// console.log("browserWindow", BrowserWindow);
	// win.loadFile('index.html');
	// win.loadURL("http://hnzj.user.ghlearning.com/index")
	// win.webContents.debugger.attach("1.1");

	// var browserWindow= win;
	// try {
	// 	browserWindow.webContents.debugger.attach("1.1");
	//  } catch (err) {
	// 	console.log("Debugger attach failed : ", err);
	//  }
	 
	//  browserWindow.webContents.debugger.on('detach', (event, reason) => {
	// 	console.log("Debugger detached due to : ", reason);
	//  });
	 
	//  browserWindow.webContents.debugger.on('message', (event, method, params) => {
	// 	 console.log("---------------------------------------------")
	// 	console.log(event, method, params);
	// 	if(method != "Network.responseReceived")return;
	// 	var url = params.response.url;
	// 	if(url.indexOf("http://v.polyv.net/uc/exam/get?") == -1)
	// 	{
	// 	  return;
	// 	}
	// 	console.log("檢測到了："+url)
	// 	console.log(params);
	// 	browserWindow.webContents.debugger.sendCommand('Network.getResponseBody', {"requestId": params.requestId}, (error, result) => {
	// 		if(!result.body)return;
	// 	  var answer = JSON.parse(result.body);
	// 	  var txt = "";
	// 	  for(var i=0; i<answer.length; i++)
	// 	  {
	// 		  txt += "<div id='one'><div id='atitle'>"+answer[i].question+"</div><div id='atime'>显示时间："+answer[i].showTime+"</div><div id='aanswer'>正确答案：";
	// 		  var choices = JSON.parse(answer[i].choices);
	// 		  for(var j=0; j<choices.length; j++)
	// 		  {
	// 			  if(choices[j].right_answer)
	// 				txt += choices[j].answer
	// 		  }
	// 		  txt += "</div><div class='line'/></div>";
			  	
	// 	  }
	// 	//   answerwin.webContents.send('answer', txt);
	// 	//   answerwin.webContents.executeJavaScript("document.getElementById('answer').innerHTML ="+txt)
	// 	  console.log("result:::::::::::", answer);
		  
	// 	})
	//  });
	 
	//  browserWindow.webContents.debugger.sendCommand("Network.enable");


}
app.on('ready', createWindow);
app.on('close', ()=>{
	win = null;
})