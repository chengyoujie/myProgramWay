import urllib.request
from urllib import request
from bs4 import BeautifulSoup

def down(url, title):
    resp=urllib.request.urlopen(url)## 
    html=resp.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
    tag = soup.find_all(class_="audioBox-right")[0]
    name = tag.find_all("h3")[0].text
    if name=='':
        name = title+".mp3"
    link = "http://old.shuren100.com"+tag.find_all(class_="down")[0].find_all("a")[0].attrs["href"]
    print("开始下载",name, link)
    try:
        request.urlretrieve(link, "D:/testsound/"+name)
    except:
        print("下载错误： "+link)

resp=urllib.request.urlopen('http://old.shuren100.com/Home/Hearing/index/p_id/1/t_id/8/p/3.html')#下载第三页
# resp=urllib.request.urlopen('http://www.shuren100.com/Home/Hearing/index/p_id/2/t_id/10/p/2.html')#下载第二页
# resp=urllib.request.urlopen('http://www.shuren100.com/Home/Hearing/index/p_id/2/t_id/10/p/1.html')#下载第一页
html=resp.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
print(soup.title)
for ele in soup.select("#list"):
    for item in ele.find_all("li"):
        for link in item.find_all("a"):
            print("http://old.shuren100.com"+link.attrs["href"], link.attrs["title"])
            down("http://old.shuren100.com"+link.attrs["href"], link.attrs["title"])