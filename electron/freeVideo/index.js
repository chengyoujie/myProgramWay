//const electron = require("electron");
const fs = require('fs');
const path = require('path');
const os = require('os');
// const regedit = require('regedit');

const {app, BrowserWindow, Menu, MenuItem, ipcMain, dialog} = require('electron');
let win ;
let config;
let datapath;
const WEBURL = "http://121.196.196.20/appdata/freeVideo_1/";//
// const WEBURL = "";
// const Menu = remote.Menu;
// const MenuItem = remote.MenuItem;
// var menu = new Menu();
app.commandLine.appendSwitch('ppapi-flash-path',app.getPath('pepperFlashSystemPlugin'));
app.commandLine.appendSwitch('ppapi-flash-version', '27.0.0.130');


function createWindow()
{
	//加载配置
	datapath = app.getPath('userData');
	datapath = path.join(datapath, "config.json");
	try{
		if(fs.existsSync(datapath))
		{
			config = JSON.parse(fs.readFileSync(datapath));
		}else{
			config = {};
			fs.writeFileSync(datapath, "{}");
		}
	}catch(e){
		config = {};
		console.log("Error: readConfig error", e);
	}
	// console.log(app.getPath('pepperFlashSystemPlugin'));
	// //tes
	// var vwin = new BrowserWindow({width: 1028, height: 800, frame:false,
	// 	'webPreferences': {
	// 	  'plugins': true
	// 	}
	//   });
	// vwin.loadFile(WEBURL+'video.html');
	// vwin.webContents.once('did-finish-load', function() {
	// 	vwin.webContents.send("data", {url:"https://www.iqiyi.com/v_19rrc17tj8.html"});
	// });
	// vwin.webContents.openDevTools();
	// return;
	//初始化窗口
	win = new BrowserWindow({width: 1028, height: 800, frame:true,
		'webPreferences': {
		  'plugins': true
		}
	  });
	if(WEBURL)
	{
		win.loadURL(WEBURL+'login.html')
	}else{
		win.loadFile('login.html');
	}
	win.webContents.once('did-finish-load', function() {
		win.webContents.send("configdata", config);
	});
	
	//设置菜单
	var menu = new Menu();
	// var fileMenu = new MenuItem({label:"文件", click:()=>{  }, submenu:new Menu()})
	// fileMenu.submenu.append(new MenuItem({label:"退出", click:()=>{app.exit();}}))
	// menu.append(fileMenu)


	// var webmenu = new MenuItem({label:"网页", click:()=>{ }, submenu:new Menu()});
	// webmenu.submenu.append(new MenuItem({label:"主页", click:()=>{win.webContents.send("web", "main") }}));
	// webmenu.submenu.append(new MenuItem({label:"后退", click:()=>{win.webContents.send("web", "pre") }}));
	// webmenu.submenu.append(new MenuItem({label:"前进", click:()=>{win.webContents.send("web", "next") }}));
	// webmenu.submenu.append(new MenuItem({label:"刷新", click:()=>{win.webContents.send("web", "refush") }}));
	// webmenu.submenu.append(new MenuItem({label:"清除历史", click:()=>{win.webContents.send("web", "clear") }}));
	// if(!WEBURL)
	// {
	// 	webmenu.submenu.append(new MenuItem({type: 'separator'}));
	// 	webmenu.submenu.append(new MenuItem({label:"打开开发者工具", click:()=>{win.webContents.openDevTools(); }}));
	// }
	// menu.append(webmenu);
	

	// var settingMenu = new MenuItem({label:"设置", click:()=>{}, submenu:new Menu()});
	// menu.append(settingMenu);
	// menu.append(new MenuItem({label:"说明", click:()=>{ win.webContents.send("abuout", "use") }}));
	// menu.append(new MenuItem({label:"关于", click:()=>{ win.webContents.send("abuout", "made") }}));
	Menu.setApplicationMenu(menu)

	
	// regedit.createKey('HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\FreeVideo', function(err) {
	// 	console.log(err);
	//  })
	// var name = os.hostname();
	// var usinfo = os.userInfo();
}

ipcMain.on('saveconfig', (event, arg) => {
	for(let key in arg)
	{
		config[key] = arg[key];
	}
	saveConfig();
 })

 function saveConfig()
 {
	try{
		fs.writeFileSync(datapath, JSON.stringify(config));
	}catch(e)
	{
		console.log("Error: saveConfig error", e);
	}
 }



 ipcMain.on('openvideo', (event, arg) => {
	var vwin = new BrowserWindow({width: 1028, height: 800, frame:false,
		'webPreferences': {
		  'plugins': true
		}
	  });
	if(WEBURL)
	{
		vwin.loadURL(WEBURL+'video.html')
	}else{
		vwin.loadFile('video.html');
	}
	vwin.webContents.once('did-finish-load', function() {
		vwin.webContents.send("data", arg);
	});
 })
//  window.addEventListener('contextmenu', function (e) {
// 	e.preventDefault();
// 	menu.popup(remote.getCurrentWindow());
//   }, false);

app.on('ready', createWindow);
app.on('close', ()=>{
	win = null;
})
app.on('window-all-closed', () => {
	app.exit();
})