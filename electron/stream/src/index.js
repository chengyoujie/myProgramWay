let electron = require("electron")
let app = electron.app;
let dialog = electron.dialog;
let BrowserWindow = electron.BrowserWindow;
let greenworks = require("greenworks")
let fs = require("fs");
let path = require("path")

function startGame() {
	let options = {
		width: 640,
		height: 1100,
		frame: true,
		title: "测试-cyj",
		icon: path.join(__dirname, "./../icon.ico"),
		webPreferences: {
			webSecurity:false,
      		nodeIntegration:true,
	    	contextIsolation:false,
      		enableRemoteModule:true
		}
	};
	var process = require("process");
  	process.activateUvLoop();

	let mainWindow = new BrowserWindow(options);
	mainWindow.removeMenu();


	mainWindow.webContents.executeJavaScript(` 

		function forceRefresh() {
			var canvas = document.getElementById("steamOverlayCanvasFix");
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			window.requestAnimationFrame(forceRefresh);
		}

		let steamOverlayCanvasFix = document.createElement('canvas');
		steamOverlayCanvasFix.style.position = 'fixed';
		steamOverlayCanvasFix.style.top = 0;
		steamOverlayCanvasFix.style.left = 0;
		steamOverlayCanvasFix.style.right = 0;
		steamOverlayCanvasFix.style.bottom = 0;
		steamOverlayCanvasFix.style.width = '100%';
		steamOverlayCanvasFix.style.height = '100%';
		steamOverlayCanvasFix.style.opacity = 0.01;
		steamOverlayCanvasFix.style['pointer-events'] = 'none';
		steamOverlayCanvasFix.style['z-index'] = -1;
		steamOverlayCanvasFix.id = 'steamOverlayCanvasFix';
		steamOverlayCanvasFix.width = 1;
		steamOverlayCanvasFix.height = 1;
		document.body.appendChild(steamOverlayCanvasFix);

		forceRefresh();
	`);

	mainWindow.on('close', e => {
        e.preventDefault(); 
        dialog.showMessageBox({
            type: 'info',
            title: '提示',
            message:'确认退出游戏？',
            buttons: ['确认', '取消'],
            cancelId: 1, 
        }).then(idx => {    
            console.log(idx)
            if (idx.response == 1) {
                console.log('index==1，取消关闭')
                e.preventDefault();
            } else {
                console.log('index==0，关闭')
                mainWindow = null
                app.exit();
            }
            })
        });

	mainWindow.on("closed", function () {
		mainWindow = null;
		try{
			fs.writeFileSync(getSaveUrl(),JSON.stringify(localSave));
		}
		catch(e){}
		
	});


	greenworks.getAuthSessionTicket((e)=>{
		let ticket = e.ticket.toString('hex');
		mainWindow.loadURL(`https://www.baidu.com/s?wd=参数 tick = ${ticket} `).then(() => {
			mainWindow.hide();
			mainWindow.show();
		});
	}, ()=>{
		app.quit();
	})
}


app.commandLine.appendSwitch("force_high_performance_gpu", 1);
app.commandLine.appendSwitch("force_discrete_gpu", 1);
app.commandLine.appendSwitch("in-process-gpu", 1);
app.commandLine.appendSwitch("high-dpi-support", 1);
app.commandLine.appendSwitch("force-device-scale-factor", 1);
app.on("window-all-closed", function () {
	app.quit();
}); 
app.on("ready", function () {
	try{
		greenworks.init();
		startGame();	
	}
	catch(e){
		alert("Error : "+e.message).then(()=>{
			app.quit();
		});
	}	
});






function alert(msg){
	return dialog.showMessageBox({
	 type:'warning', //弹出框类型
	 title:'提示',
	 message:msg,
	 buttons:['确定'],
   }); 
 }