package com.cyj.app.view
{
	import com.cyj.app.SimpleEvent;
	import com.cyj.app.ToolsApp;
	import com.cyj.app.data.ToolsConfig;
	import com.cyj.app.view.common.Alert;
	import com.cyj.app.view.ui.mapreversal.AppMainUI;
	import com.cyj.utils.Log;
	import com.cyj.utils.cmd.CMDManager;
	import com.cyj.utils.load.ResData;
	import com.cyj.utils.load.ResLoader;
	import com.cyj.utils.md5.MD5;
	
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.filesystem.File;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.utils.flash_proxy;
	import flash.utils.getTimer;
	
	import morn.core.handlers.Handler;
	import morn.core.managers.TipManager;
	
	import org.asmax.util.ZipWriter;
	
	public class ToolsView extends AppMainUI
	{
		
		public static const EVENT_END_SVN_LOG:String = "EVENT_END_SVN_LOG";
		public static const EVENT_END_SVN_EXPORT:String = "EVENT_END_SVN_EXPORT";
		public static const EVENT_END_SVN_ITEM_EXPORT:String = "EVENT_END_SVN_ITEM_EXPORT";
		public static const EVENT_END_RAR_COMPLETE:String = "EVENT_END_RAR_COMPLETE";
		public static const EVENT_END_UP_COMPLETE:String = "EVENT_END_UP_COMPLETE";
		public static const EVENT_END_DEL_COMPLETE:String = "EVENT_END_DEL_COMPLETE";
		
		private var _curProjectResDic:Object;
		
//		private var _deleteNum:int = 0;
//		private var _totalNum:int = 0;
//		private var _testExportTime:int = 0;
//		private var _testZipTime:int = 0;
//		private var _zipPackName:String = "test.zip";
//		private var _testUpTime:int= 0;
//		private var svnlog:Array = [];
//		private var _isRuning:Boolean = false;
		
		private var errorMsg:String = "";
		private var changeFilesLog:String= "";
		private var _showReadFla:ReadFla;
		
		public function ToolsView()
		{
			super();
			initEvent();
		}
		/** 初始化界面  **/		
		public function initView():void
		{
//			new ReadFla(new File("D:/junyou2017/h5_xuanyuanjian2/ui/lib.fla"));
			inputFlaPath.text = ToolsApp.localCfg.lastInputPath;
			outputFlaPath.text = ToolsApp.localCfg.lastOutputPath;
			inputOrgTxt.text = ToolsApp.localCfg.lastOrgTxt;
			inputOutTxt.text = ToolsApp.localCfg.lastReplaceTxt;
			
		}
		/** 初始化事件 **/
		private function initEvent():void
		{
			//init
			btnInFlaPath.clickHandler = new Handler(this.SetInFlaPath, [false]);
			btnInFlaDirPath.clickHandler = new Handler(this.SetInFlaPath, [true]);
			btnOutFlaDirPath.clickHandler = new Handler(this.SetOutFlaPath, [true]);
			btnReplace.clickHandler = new Handler(this.handleStartReplace);
			btnOpenOutDirPath.clickHandler = new Handler(this.handleOpenOutDirPaht);
			inputPreViewTxt.editable = false;
			inputPreViewTxt.scrollBar.touchScrollEnable = false;
			inputFlaPath.addEventListener(FocusEvent.FOCUS_OUT, this.handleSaveToLocal);
			outputFlaPath.addEventListener(FocusEvent.FOCUS_OUT, this.handleSaveToLocal);
			inputOrgTxt.addEventListener(FocusEvent.FOCUS_OUT, this.handleSaveToLocal);
			inputOutTxt.addEventListener(FocusEvent.FOCUS_OUT, this.handleSaveToLocal);
			
		} 
		
		private function handleOpenOutDirPaht()
		{
			var file:File = new File(this.outputFlaPath.text);
			if(file.exists)
			{
				file.openWithDefaultApplication();
			}else{
				Alert.show("文件夹不存在"+this.outputFlaPath.text);
			}
			
		}
		
		private function handleSaveToLocal(e:Event):void
		{
			var target = e.currentTarget;
			if(target == inputFlaPath)
			{
				ToolsApp.localCfg.lastInputPath = inputFlaPath.text;
			}else if(target == inputOrgTxt)
			{
				ToolsApp.localCfg.lastOrgTxt = inputOrgTxt.text;
			}else if(target == outputFlaPath)
			{
				ToolsApp.localCfg.lastOutputPath = outputFlaPath.text;
			}else if(target == inputOutTxt)
			{
				ToolsApp.localCfg.lastReplaceTxt = inputOutTxt.text;
			}
		}
		
		private function SetInFlaPath(isDir:Boolean):void
		{
			ToolsApp.file.openFile(this.handleSetInPath, isDir, inputFlaPath.text);
			
		}
		
		private function handleSetInPath(path:String):void
		{
			this.inputFlaPath.text = path;
			ToolsApp.localCfg.lastInputPath = path;
			var file:File = new File(path);
			if(file.exists)
			{
				_showReadFla = new ReadFla(file);
				_showReadFla.addEventListener(Event.COMPLETE, this.handleShowPreView);
			}else{
				Alert.show("文件不存在"+path);
			}
		}
		
		private function handleShowPreView(e:Event):void
		{
			if(_showReadFla)
			{
				inputPreViewTxt.text = _showReadFla.content;
				_showReadFla.removeEventListener(Event.COMPLETE, this.handleShowPreView);
			}
		}
		
		private function SetOutFlaPath(isDir:Boolean):void
		{
			ToolsApp.file.openFile(this.handleSetOutPath, isDir, outputFlaPath.text);
		}
		
		private function handleSetOutPath(path:String):void
		{
			this.outputFlaPath.text = path;
			ToolsApp.localCfg.lastOutputPath = outputFlaPath.text;
		}
		
		private function handleStartReplace():void
		{
			ToolsApp.delaNum = 0;
			ToolsApp.totalNum = 0;
			ToolsApp.localCfg.lastOrgTxt = inputOrgTxt.text;
			ToolsApp.localCfg.lastReplaceTxt = inputOutTxt.text;
			var files:File = new File(inputFlaPath.text);
			if(!files.exists)
			{
				Alert.show("当前文件不存在"+inputFlaPath.text);
				return;
			}
			var f:File;
			var fs:Array;
			if(files.isDirectory)
				fs = files.getDirectoryListing();
			else
				fs = [files];
			for(var i:int=0; i<fs.length; i++)
			{
				f = fs[i];
				if(f.name.indexOf(".fla") != -1)
				{
					ToolsApp.totalNum ++;
					_showReadFla = new ReadFla(f, inputOrgTxt.text, inputOutTxt.text);
				}
			}
			_showReadFla.addEventListener(Event.COMPLETE, this.handleShowPreView);
		}
		
	}
}