import urllib.request
import requests
import json
from urllib import request
from bs4 import BeautifulSoup
##模型网下载https://www.cgmodel.com/
headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'Content-Type': 'text/html; charset=utf-8',
        'Origin':'https://www.cgmodel.com/',
        'Referer':'https://www.cgmodel.com/',
        'Cookie':'PHPSESSScrf=04fbc58ffe80f3cd41bd08ac29cad14b; PHPSESSID=4690adf0e44c695f9e1905d84c8e5d99; Hm_lvt_253badd3caf00d35c7f2811cc8d77627=1699842224,1700449493; Hm_lpvt_253badd3caf00d35c7f2811cc8d77627=1700449493'
    }

def down(url):
    result = url.split("?")
    link = result[0]
    items = link.split("/")
    name = items[len(items)-1]
    try:
        print("下载："+link)
        request.urlretrieve(link, "D:/testsound2/"+name)
    except:
        print("下载错误： "+link)
#查找详细页的资源
def finddetail(url):
    response = requests.get(url, headers=headers)
    response.encoding = "utf8"
    html = response.text
    soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
    for ele in soup.find_all(id="listImgthumb"):
        for link in ele.find_all(name="li"):
            down("https:"+link.attrs["data-rel"])

def findimg(url):
    response = requests.get(url, headers=headers)
    response.encoding = "utf8"
    html = response.text
    soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
    for ele in soup.find_all(class_=["model-list-con"]): 
        for link in ele.find_all("a",class_=["model-list-img"]):
            finddetail(link.attrs["href"])

word = "卡通鱼"
page = 4
url = "https://search.cgmodel.com/model.html?field="+word+"&page="
for i in range(1, 4):
    print("开始查找 资源 "+word+"  第："+i+" 页")
    newurl = url+i
    findimg(newurl)
