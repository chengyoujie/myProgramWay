import urllib.request
import requests
import json
import os
from urllib import request
from bs4 import BeautifulSoup

home = "https://soundimage.org/"
headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'Content-Type': 'application/text',
        'Origin':home,
        'Referer':home,
        'Cookie':'_ga=GA1.1.745933505.1701338061; googtrans=/en/zh-CN; googtrans=/en/zh-CN; _ga_WKPVZX9PS8=GS1.1.1701842232.2.1.1701842781.0.0.0; _ga_85NTSLPZ3J=GS1.1.1701842232.2.1.1701842781.60.0.0'
    }
headers2 = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'Content-Type': 'application/text',
        'Origin':home,
        'Referer':home,
        'Accept-Encoding':'gzip, deflate, br',
        'Cookie':'_ga=GA1.1.745933505.1701338061; googtrans=/en/zh-CN; googtrans=/en/zh-CN; _ga_WKPVZX9PS8=GS1.1.1701842232.2.1.1701842781.0.0.0; _ga_85NTSLPZ3J=GS1.1.1701842232.2.1.1701842781.60.0.0'
    }

def down(url, dirname):
    if len(url) == 0:
        return
    result = url.split("?")
    link = result[0]
    items = link.split("/")
    name = items[len(items)-1]
    dirname = dirname.replace(" ", "")
    outpath = "D:/testdownsound/"+dirname
    if os.path.exists(outpath) == False :
        try:
            os.makedirs(outpath)
        except:
            outpath = "D:/testdownsound/NotFound"
            if os.path.exists(outpath) == False:
                os.makedirs(outpath)
        print("创建文件夹： "+outpath)
    with open(f'{outpath}/{name}','wb') as file:
        try:
            r = requests.get(link,headers=headers)
            if r.status_code == 200:
                file.write(r.content)
                print(f'{dirname}/{name}  下载成功')
        except:
            print(f'Error：{name}  下载失败，请检查网络或请求网址是否正确')
    # try:
    #     request.urlretrieve(link, outpath+"/"+name)
    # except:
    #     print("下载错误： "+link)
def findsound(url, dirname):
    response = requests.get(url, headers=headers2)
    response.encoding = "utf8"
    html = response.text
    soup = BeautifulSoup(html, "html.parser")
     #多个可以为class_= ["text", "bold"]
    # for ele in soup.find_all(class_="mejs-mediaelement"): 
    for sound in soup.find_all("audio"):
        print(sound.text)
        try:
            down(sound.text, dirname)
        except:
            print("下载 "+sound.text+" 错误")
# resp=urllib.request.urlopen("http://172.18.2.61/nslm_new/web/")#下载
# html=resp.read().decode("utf-8")
# soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
# print(soup.title)
# for ele in soup.select("#list"):
#     for item in ele.find_all("li"):
#         for link in item.find_all("a"):
#             print("http://old.shuren100.com"+link.attrs["href"], link.attrs["title"])
#             down("http://old.shuren100.com"+link.attrs["href"], link.attrs["title"])
    
# findimg("https://www.zcool.com.cn/work/ZNTM0MjAwOTY=.html")
##根据word来获取数据
response = requests.get(home, headers=headers)
response.encoding = "utf8"
response_txt = response.text
soup = BeautifulSoup(response_txt, "html.parser", from_encoding="utf-8")
for ele in soup.find_all(id="menu-free-music"): 
        print("find:")
        for lis in ele.find_all("li"):
            for href in lis.find_all("a"):
                print(href.attrs["href"])
                print(href.text)
                findsound(href.attrs["href"], href.text)
##print(response_txt)
