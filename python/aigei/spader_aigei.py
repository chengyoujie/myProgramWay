import execjs
import json
import urllib
import os
import sqlite3
import re

from http import cookiejar
from bs4 import BeautifulSoup
from urllib import request
from win32.win32crypt import CryptUnprotectData

##创建Cookie
cookie = cookiejar.CookieJar();
#本地的cookie目录
cookiepath = os.environ['LOCALAPPDATA']+r"\Google\Chrome\User Data\Default\Cookies";
#查询cookie的sql语句  暂时读取本地所有的cookie
cookiesql = 'SELECT host_key, name, value, path, expires_utc, is_secure, encrypted_value '+'FROM cookies WHERE host_key like "%{}%";'.format("");

with sqlite3.connect(cookiepath) as conn:
	cursor = conn.cursor();
	for host_key, name, value, path, expires_utc, is_secure, encrypted_value in cursor.execute(cookiesql).fetchall():
		data = CryptUnprotectData(encrypted_value)[1].decode();
		cookieitem = cookiejar.Cookie(0, name, data, None, False, host_key, host_key.startswith('.'), host_key.startswith('.'),
			path, True, is_secure, expires_utc, False, None, None, {});
		cookie.set_cookie(cookieitem);
#=======cookie 读取完毕



##读取js文件
jsfile = open("./js/aigei_encrypt.js");
jsctx = execjs.compile(jsfile.read());

#伪装浏览器的头
headers={
	    'Accept': '*/*',
	    'Accept-Encoding': 'gzip, deflate',
	    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
	    'Cache-Control': 'no-cache',
	    'Connection': 'keep-alive'
	    }
handler = request.HTTPCookieProcessor(cookie);
opener = request.build_opener(handler);

#####开始爬取数据   列如：http://www.aigei.com/game2d/character/pn1

rooturl = "http://www.aigei.com/";
saveroot = "D:/python/temp/aigei/";

def spader_main(url):
	response = opener.open(url);
	html = response.read();
	soup = BeautifulSoup(html, "html.parser", from_encoding="utf8");
	pageurls = soup.find_all("span", class_="resc-info-href-block js-href");
	for pageitem in pageurls:
		url = rooturl + pageitem['name'].replace("|:|", "/").replace("|*|", ".");
		title = pageitem["title"];
		spader_pages(url, title);

def spader_pages(url, title):
	response = opener.open(url);
	html = response.read();
	soup = BeautifulSoup(html, "html.parser", from_encoding="utf8");
	pages = soup.find_all("span", class_="page-btn page-btn-size-defalut js-href");
	maxpage = 1;
	for page in pages:
		pagenum = 0;
		try:
			pagenum = int(page.get_text());
		except ValueError:
			pagenum = 0;
		if(pagenum > maxpage):
			maxpage = pagenum;
	for pagenum in range(1, maxpage+1):
		pageurl = url+"?order=name&page=%s" % pagenum;
		spader_items(pageurl, title);

def spader_items(url, title):
	response = opener.open(url);
	html = response.read();
	soup = BeautifulSoup(html, "html.parser", from_encoding="utf8");
	#假装界面加载完毕   rescViewLog(pageid, time, token)
	pattern = re.compile(r"rescViewLog\(['\"](\w+)['\"]\s*,\s*['\"](\w+)['\"]\s*,\s*['\"](\w+)['\"]\s*\)", re.MULTILINE|re.DOTALL);
	scripts = soup.find_all("script")
	pageid = None;
	time = "";
	token = "";
	for sc in scripts:
		pat = pattern.search(sc.text);
		if pat != None:
			pageid = pat.group(1);
			time = pat.group(2);
			token = pat.group(3);
			break;
	if pageid == None:
		print("Not Found rescViewLog()  in url:"+url);
		return False;
	## 发起页面确认请求
	
	encrydata = jsctx.call("dfu", "resc_view", pageid, time, token, None, None, None);
	req = request.Request(rooturl+"f/d/", urllib.parse.urlencode(encrydata).encode("utf8"), headers);
	opener.open(req);
	
	#处理页面中的每一项
	savedir = saveroot+title;
	if not os.path.exists(savedir):
		os.makedirs(savedir);
	downitems = soup.find_all("div", id=re.compile(r"unitBox_item"));
	for item in downitems:
		unitinfo = item.find("span", class_="item-info-bottom-down");##  id="itemDownBtn_32554366" item-down-type="item_image" itemid="32554366" 

		itemtype = unitinfo["item-down-type"];
		iteminfo = item.find("input", id=re.compile(r"itemInfoToken_"+itemtype))
		print(iteminfo)
		itemid = iteminfo["itemid"];
		itemtoken = iteminfo["token"];
		itemtime = iteminfo["extime"];

		filename = item.find("li", "resc-info-bottom-info resc-info-bottom-info-name")
		fname = filename["title"];
		filetype = item.find("li", class_="resc-info-bottom-info unit-info-row1");
		ftype = filetype.find("span").get_text();
		#print(itemtype+"  "+itemid+" "+itemtime+" "+itemtoken)
		downItem(savedir+"/"+fname+"."+ftype, itemtype, itemid, itemtime, itemtoken);


def downItem(path, itemtype, itemid, time, token, vscode=None):
	print("path:"+path+" "+itemtype+" "+itemid+" "+time+" "+token)
	encrydata = jsctx.call("dfu", itemtype, itemid, time, token, vscode, None, None);
	encrydata["isc"] = False;
	encrydata["ilg"] = False;
	encrydata["pkgItems"] = None;
	encrydata["confirm"] = False;
	postdata = jsctx.call("cqbj", encrydata);
	#print(postdata);
	req = request.Request(rooturl+"f/d/", urllib.parse.urlencode(postdata).encode("utf8"), headers);
	response = opener.open(req);
	data = response.read().decode("utf8");
	#print(data);
	jsondata = json.loads(data);
	state = jsondata["status"];
	if state == "success":
		msg = jsondata["message"];
		imgurl = jsctx.call("prest", msg);
		print("保存： "+path)
		request.urlretrieve(imgurl, path)
	elif state == "vcode-normal":
		print("验证码：")
	elif state == "notEnoughCoin":
		print("金币不足")
	else:
		print("down load Error:"+state+" itemID:"+itemid)


####开始爬取某一个页面的数据
#spader_main(rooturl+"game2d/character/pn2")
#spader_pages(rooturl+"view/71449.html", "测试检测页数")
#spader_items(rooturl+"view/71449.html?order=name&page=17", "测试下载页面图片")
downItem("D:/python/temp/aigei/测试下载页面图片/a.png","item_image", "32554332", "1548468000921", "1531586445")
#downItem("D:/python/temp/aigei/测试下载页面图片/a.png","item_image", "34389486", "1548478800843", "de455dbb80")