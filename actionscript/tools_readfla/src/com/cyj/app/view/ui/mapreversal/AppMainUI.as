/**Created by the Morn,do not modify.*/
package com.cyj.app.view.ui.mapreversal {
	import morn.core.components.*;
	public class AppMainUI extends View {
		public var appName:Label = null;
		public var txtLog:Label = null;
		public var outputFlaPath:TextInput = null;
		public var btnInFlaPath:Button = null;
		public var inputFlaPath:TextInput = null;
		public var inputOrgTxt:TextInput = null;
		public var inputOutTxt:TextInput = null;
		public var btnReplace:Button = null;
		public var btnInFlaDirPath:Button = null;
		public var btnOutFlaDirPath:Button = null;
		public var inputPreViewTxt:TextArea = null;
		public var btnOpenOutDirPath:Button = null;
		protected static var uiXML:XML =
			<View width="650" height="620">
			  <Image skin="png.comp.blank" x="0" y="0" width="650" height="620"/>
			  <Label text="应用界面" x="10" y="3" color="0xff9900" stroke="0" width="600" height="32" align="center" size="18" var="appName"/>
			  <Label text="日志" x="2" y="565" width="645" height="49" color="0x33ff00" var="txtLog" wordWrap="true"/>
			  <Label text="made by cyj 2019.05.16" x="512" y="595" color="0x666666"/>
			  <Image skin="png.guidecomp.购买类控件底_1" x="53" y="225" width="550" height="328" sizeGrid="10,10,10,10,1"/>
			  <TextInput skin="png.guidecomp.textinput_文字输入底框_2" x="186" y="111" width="216" height="22" color="0xff6600" var="outputFlaPath" margin="3,2,2,2"/>
			  <Label text="导出Fla路径" x="101" y="111" color="0xff9900" stroke="0"/>
			  <Button label="选择文件" skin="png.guidecomp.btn_四字常规_1" x="410" y="65" labelColors="0xc79a84,0xe0a98d,0x93827a" labelStroke="0x0" var="btnInFlaPath"/>
			  <TextInput skin="png.guidecomp.textinput_文字输入底框_2" x="188" y="73" width="216" height="22" color="0xff6600" var="inputFlaPath" margin="3,2,2,2"/>
			  <Label text="Fla配置路径" x="103" y="73" color="0xff9900" stroke="0"/>
			  <TextInput skin="png.guidecomp.textinput_文字输入底框_2" x="135" y="169" width="141" height="22" color="0xff6600" var="inputOrgTxt" margin="3,2,2,2"/>
			  <TextInput skin="png.guidecomp.textinput_文字输入底框_2" x="318" y="170" width="153" height="22" color="0xff6600" var="inputOutTxt" margin="3,2,2,2"/>
			  <Button label="替换" skin="png.guidecomp.btn_四字常规_1" x="485" y="161" labelColors="0xc79a84,0xe0a98d,0x93827a" labelStroke="0x0" var="btnReplace"/>
			  <Label text="将字符串替换" x="47" y="168" color="0xff9900" stroke="0"/>
			  <Label text="为" x="291" y="170" color="0xff9900" stroke="0"/>
			  <Label text="DOMDocument.xml 预览" x="53" y="196" color="0xff9900" stroke="0"/>
			  <Button label="选择文件夹" skin="png.guidecomp.btn_四字常规_1" x="504" y="65" labelColors="0xc79a84,0xe0a98d,0x93827a" labelStroke="0x0" var="btnInFlaDirPath"/>
			  <Button label="选择文件夹" skin="png.guidecomp.btn_四字常规_1" x="412" y="103" labelColors="0xc79a84,0xe0a98d,0x93827a" labelStroke="0x0" var="btnOutFlaDirPath"/>
			  <TextArea text="TextArea" skin="png.guidecomp.textarea" x="55" y="227" width="548" height="326" color="0xcccc00" var="inputPreViewTxt" vScrollBarSkin="png.guidecomp.vscroll"/>
			  <Button label="打开文件夹" skin="png.guidecomp.btn_四字常规_1" x="503" y="102" labelColors="0xc79a84,0xe0a98d,0x93827a" labelStroke="0x0" var="btnOpenOutDirPath"/>
			</View>;
		public function AppMainUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}