//const electron = require("electron");
const fs = require('fs');
const path = require('path');

const {app, BrowserWindow, Menu, MenuItem, ipcMain, dialog} = require('electron');
let win ;
let config;
let datapath;

const WEBURL = "";//"http://121.196.196.20/appdata/webResThife/";//
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
	//初始化窗口
	win = new BrowserWindow({width:800, height:800});
	if(WEBURL)
	{
		win.loadURL(WEBURL+'index.html')
	}else{
		win.loadFile('index.html');
		win.webContents.openDevTools();
	}
	win.webContents.once('did-finish-load', function() {
		win.webContents.send("configdata", config);
	});
	// win.webContents.openDevTools();
	//设置菜单
	var menu = new Menu();
	var fileMenu = new MenuItem({label:"文件", click:()=>{  }, submenu:new Menu()})
	fileMenu.submenu.append(new MenuItem({label:"打开文件所在位置", click:()=>{ win.webContents.send("file", {oper:"open"})  }}))
	fileMenu.submenu.append(new MenuItem({label:"设置文件保存位置", click:()=>{ 
		dialog.showOpenDialog({
			defaultPath:config.savepath||"D:", 
			properties:["openDirectory"]}, 
			(filepath, bookmark)=>{
				if(filepath && filepath.length>0)//有可能用户取消选择， filepath = undefined
					win.webContents.send("file", {oper:"savepath", data:filepath[0]});
			});
		 }}
	));
	fileMenu.submenu.append(new MenuItem({type: 'separator'}));
	fileMenu.submenu.append(new MenuItem({label:"退出", click:()=>{app.quit();}}))
	menu.append(fileMenu)


	var webmenu = new MenuItem({label:"网页", click:()=>{ }, submenu:new Menu()});
	webmenu.submenu.append(new MenuItem({label:"主页", click:()=>{win.webContents.send("web", "main") }}));
	webmenu.submenu.append(new MenuItem({label:"后退", click:()=>{win.webContents.send("web", "pre") }}));
	webmenu.submenu.append(new MenuItem({label:"前进", click:()=>{win.webContents.send("web", "next") }}));
	webmenu.submenu.append(new MenuItem({label:"开发者工具", click:()=>{win.webContents.send("web", "devtools") }}));
	webmenu.submenu.append(new MenuItem({label:"清除历史", click:()=>{win.webContents.send("web", "clear") }}));
	menu.append(webmenu);
	

	var settingMenu = new MenuItem({label:"设置", click:()=>{}, submenu:new Menu()});
	menu.append(settingMenu);
	menu.append(new MenuItem({label:"说明", click:()=>{ win.webContents.send("abuout", "use") }}));
	menu.append(new MenuItem({label:"关于", click:()=>{ win.webContents.send("abuout", "made") }}));
	Menu.setApplicationMenu(menu)
}

ipcMain.on('saveconfig', (event, arg) => {
	for(let key in arg)
	{
		config[key] = arg[key];
	}
	try{
		fs.writeFileSync(datapath, JSON.stringify(config));
	}catch(e)
	{
		console.log("Error: saveConfig error", e);
	}
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
	app.quit();
})