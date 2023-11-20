import urllib.request
import requests
import json
from urllib import request
from bs4 import BeautifulSoup

headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'Content-Type': 'application/json',
        'Origin':'https://www.zcool.com.cn',
        'Referer':'https://www.zcool.com.cn/search/content?word=%E6%8D%95%E9%B1%BC',
        'Cookie':'psid=18bc69ab0f21079-08b1c29dbe66f6-26031151-1fa400-18bc69ab0f3f0e; sensorsdata2015jssdkchannel=%7B%22prop%22%3A%7B%22_sa_channel_landing_url%22%3A%22%22%7D%7D; sajssdk_2015_cross_new_user=1; customer=2; utmChannel=baidu:0:0:0:0; recentChannel=baidu:0:0:0:0; r_drefresh_count=1; Hm_lvt_03ca55d76ee116454b60ea50024c5ba7=1699844110; zid=1699844108qAZj; session=eyJjdXJyZW50VXNlciI6bnVsbH0=; session.sig=1VmncKqjATz0GMOcrellG1zEeXo; recommend_tip=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2218bc69ab0fa7aa-076b1b0a2f0e66-26031151-2073600-18bc69ab0fbf49%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThiYzY5YWIwZmE3YWEtMDc2YjFiMGEyZjBlNjYtMjYwMzExNTEtMjA3MzYwMC0xOGJjNjlhYjBmYmY0OSJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%2C%22%24device_id%22%3A%2218bc69ab0fa7aa-076b1b0a2f0e66-26031151-2073600-18bc69ab0fbf49%22%7D; Hm_lpvt_03ca55d76ee116454b60ea50024c5ba7=1699844591; z_ex_group=%7B%22search_content_ad_ui%22%3A%7B%22ui%22%3A%22zcool_search_content_ad_ui_row15%22%2C%22data%22%3A%22%22%7D%2C%22zcool_index_tab_ui%22%3A%7B%22ui%22%3A%22zcool_index_tab_ui_old%22%2C%22data%22%3A%22%22%7D%7D'
    }

def down(url):
    result = url.split("?")
    link = result[0]
    items = link.split("/")
    name = items[len(items)-1]
    try:
        request.urlretrieve(link, "D:/testsound/"+name)
    except:
        print("下载错误： "+link)
def findimg(url):
    response = requests.get(url, headers=headers)
    response.encoding = "utf8"
    html = response.text
    print(html)
    soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
     #多个可以为class_= ["text", "bold"]
    for ele in soup.find_all(class_=["sc-1n8zbuv-1","iBHdlb"]): 
        print("find:")
        for imgs in ele.find_all(class_=["sc-1gq6zpr-5","buyaIH","pictureBox"]):
            for img in imgs.find_all("img"):
                print(img.attrs["data-src"])
                down(img.attrs["data-src"])
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
word = "捕鱼游戏场景"
page = 4 #总共的页数
print("查找关键字："+word+" 共"+str(page)+"页")
for i in range(1, 4):
    print("遍历第"+str(i)+"页内容")
    data = {"cate_id":0,"city_id":0,"college_id":0,"column":4,"has_video":0,"word":word,"obj_type":0,"recommend_level":0,"sort":5,"time":0,"p":i,"ps":20}

    response = requests.post("https://www.zcool.com.cn/p1/search/content", json=data, headers=headers)
    response.encoding = "utf8"
    response_txt = response.text
    response_json = response.json
    jsonobj = json.loads(response_txt)
    for key in jsonobj["datas"]:
        if "content" in key :
            print(key["content"]["pageUrl"])
            findimg(key["content"]["pageUrl"])
        if "hellorfAlbums" in key:
            print("-----    "+key["hellorfAlbums"]["pageUrl"])

##print(response_txt)
