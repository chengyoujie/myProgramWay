package com.cyj.app.data
{
	import flash.filesystem.File;

	public class ToolsConfig
	{
		
		public var title:String;
		public var appName:String;
		public var version:String;
		public var versionconfig:String;
		
		
		
		private var _rarpath:String;
		public function set rarpath(value:String):void
		{
			_rarpath = value;
			_rarpath = _rarpath.replace(/\$apppath/gi, File.applicationDirectory.nativePath+"/");
		}
		public function get rarpath():String
		{
			return _rarpath;
		}


		public function ToolsConfig()
		{
		}
	}
}