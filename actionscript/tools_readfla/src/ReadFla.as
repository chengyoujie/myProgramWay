package
{
	import com.cyj.app.ToolsApp;
	import com.cyj.app.view.common.Alert;
	import com.cyj.utils.Log;
	import com.cyj.utils.file.FileManager;
	import com.cyj.utils.load.LoaderManager;
	import com.cyj.utils.load.ResData;
	import com.cyj.utils.load.ResLoader;
	
	import deng.fzip.FZip;
	import deng.fzip.FZipErrorEvent;
	import deng.fzip.FZipFile;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.filesystem.File;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;

	public class ReadFla extends EventDispatcher
	{
		private var loader:LoaderManager = new LoaderManager();
		private var file:FileManager = new FileManager();
		
//		private static var num:int = 0;
//		private static var delnum:int = 0;
		private var _file:File;
		private var _orgText:String;
		private var _replaceText:String;
		private var _content:String;
		
		
		public function ReadFla(file:File, orgText:String=null, replaceText:String=null)
		{
			_file = file;
			_orgText = orgText;
			_replaceText = replaceText;
			var zip:FZip = new FZip();
			zip.load(new URLRequest(_file.nativePath));
			zip.addEventListener(Event.COMPLETE, handleUnZip);
			zip.addEventListener(FZipErrorEvent.PARSE_ERROR, handleParserError);
			zip.addEventListener(IOErrorEvent.IO_ERROR, handleParserError);
		}
		
		private function handleDataLoaded(e:ResData):void
		{
			
		}
		
		private function handleParserError(e:Event):void
		{
			trace("error");	
		}
			
		public function get  content():String
		{
			return this._content;
		}
		
		private function handleUnZip(e:Event):void
		{
			var isreplace:Boolean = this._replaceText || this._orgText;
			
			var zip:FZip = e.currentTarget as FZip;
			var fc:int = zip.getFileCount();
			for(var i:int = 0;i<fc; i++)
			{
				var zipfile:FZipFile = zip.getFileAt(i);
				var key:String = zipfile.filename.substr(0, zipfile.filename.length - 4);
				if(zipfile.filename == "DOMDocument.xml")
				{
					var content:ByteArray = zipfile.content;
					var xmlstr:String = content.readMultiByte(content.bytesAvailable, "utf-8");
					this._content = xmlstr;
					//h5部分正则
					if(isreplace)
					{
						var org:RegExp = new RegExp(this._orgText, "gi");
						xmlstr = xmlstr.replace(org, this._replaceText);
						this._content = xmlstr;
						var byte:ByteArray = new ByteArray();
						byte.writeMultiByte(xmlstr, "utf-8");
						zipfile.content = byte;
					}
					this.dispatchEvent(new Event(Event.COMPLETE));
					//页游部分正则
//					xmlstr = xmlstr.replace(/sourceExternalFilepath=".*?[\\\/]junyou2015[\\\/]9y9y[\\\/](.*?)"/gi, "sourceExternalFilepath=\"D:/junyou2015/9y9y_bt/$1\"");
//					xmlstr = xmlstr.replace(/sourceExternalFilepath=".*?[\\\/]junyou2015[\\\/](.*?)"/gi, "sourceExternalFilepath=\"D:/junyou2015/$1\"");
//					var op:String = 'D:/workspace_client_xycs_hn/chuanqi2/assets/aaa.png'
//					var tos:String = './aaa.png'
//					trace(xmlstr);
//					xmlstr = xmlstr.replace(op, tos);
				}
//				dic["/" + key] = zipfile.content;
			}
			if(isreplace)
			{
				var out:ByteArray = new ByteArray();
				zip.serialize(out);
				try{
					file.saveByteFile(ToolsApp.view.outputFlaPath.text+"/"+_file.name, out);
				}catch(e:Error)
				{
					Alert.show("文件写入错误:"+_file.name+"  "+ToolsApp.view.outputFlaPath.text+"/"+_file.name); 
				}
				ToolsApp.delaNum ++;
				Log.log("当前处理完成："+ToolsApp.delaNum+"/"+ToolsApp.totalNum+"   "+_file.name);
				if(ToolsApp.delaNum >= ToolsApp.totalNum)
				{
					Alert.show("处理完成,共处理："+ToolsApp.delaNum+"个文件");
					Log.log("处理完成,共处理："+ToolsApp.delaNum+"个文件");
				}
			}else{
				Log.log("读取完毕"+_file.name);
			}
			
		}
		
		
	}
}