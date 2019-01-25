from urllib import request
from http import cookiejar
import urllib
import json
import http
import re
import os

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

cookie = cookiejar.CookieJar();
handler = request.HTTPCookieProcessor(cookie)
opener = request.build_opener(handler)
resopnse = opener.open("http://pc.shuren100.com/web/user/center/user_id/212393/type/1/btype/121.html");
for item in cookie:
	print("Name: " + item.name +"Value:"+ item.value)
def loadpage(page, opener):
	posturl = "http://pc.shuren100.com/web/user/center.html";
	postdata = {"page": page,"type": 1,"btype": 121,"user_id": 212393}
	#headers = {"Content-type": "aapplication/x-www-form-urlencoded; charset=UTF-8","Connection":"keep-alive","Accept": "*/*"}
	headers={
	    'Accept': '*/*',
	    'Accept-Encoding': 'gzip, deflate',
	    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
	    'Cache-Control': 'no-cache',
	    'Connection': 'keep-alive'
	    }
	databyt = json.dumps(postdata);
	connection = http.client.HTTPConnection("pc.shuren100.com")
	#req = connection.request("Post", posturl, databyt, headers)
	#response = connection.getresponse()
	req = request.Request(posturl, urllib.parse.urlencode(postdata).encode("utf-8"), headers)
	response = opener.open(req);
	pagejsondata = response.read().decode('utf-8');
	pagedata = json.loads(pagejsondata);
	unitlist = pagedata['list'];
	print(unitlist)
	len = 0;
	for item in unitlist:
		print("Id:"+item['id']+"title:"+item['title']);
		#req = request.Request("http://pc.shuren100.com/web/article/index/id/"+id+".html", headers);
		urlstr= "http://pc.shuren100.com/web/article/index/id/"+item['id']+".html";
		response = opener.open(urlstr);
		htmlcontent = response.read().decode('utf8');
		matchgroup = re.search(r'/ueditor/php/upload.*?\.mp3', htmlcontent, re.M|re.I);
		mp3url = "http://pc.shuren100.com/"+matchgroup.group();
		path = os.path.join("D:/python/temp/load/",item['remark'].strip());
		if not os.path.exists(path):
			os.makedirs(path)
		if not os.path.exists(path):
			path = "D:/python/temp/load/";
		path = os.path.join(path, item['title'].strip()+".mp3")
		print("写入文件："+path)
		request.urlretrieve(mp3url, path);
		len = len + 1;
	if(len>0):
		return True;
	else:
		return False;
for i in range(1,34):	
	if not loadpage(i, opener):
		break;
#href="/ueditor/php/upload/file/20180817/1534503315836392.mp3"
