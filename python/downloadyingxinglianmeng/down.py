import urllib.request
from urllib import request
from bs4 import BeautifulSoup
import gzip
import re
import struct
import os
import requests

def savelocal(url):
    name = url.replace("http://8.129.58.72:8080/", "")
    if(url == "http://8.129.58.72:8080/models/126_0.lmesh" 
    or url == "http://8.129.58.72:8080/models/126_0.lanim"
    or url == "http://8.129.58.72:8080/models/133_0.lmesh"
    or url == "http://8.129.58.72:8080/models/222_0.lmesh"
    or url == "http://8.129.58.72:8080/models/222_0.lanim"
    ):##68， 126 133 有问题
        print("126有问题跳过去")
        return
    p = "D:/test3d/"+name
    print("开始下载",url + " --> " +p)
    dir = os.path.dirname(p)
    try:
        if not os.path.exists(dir):
            os.makedirs(dir)
        #下载
        # r=requests.get(url)
        # with open(p, 'wb+') as f:
        #     f.write(r.content)
        #     f.close()
        request.urlretrieve(url, p)
    except:
        print("下载错误： "+url)

def readStr(resp):
    strlen = struct.unpack("H", resp.read(2))[0]
    return struct.unpack(str(strlen)+"s", resp.read(strlen))[0].decode("utf-8")
    
def parseMesh(name, skin):
    meshUrl = "http://8.129.58.72:8080/models/"+name+"_"+skin+".lmesh"
    resp = urllib.request.urlopen(meshUrl)
    magic = struct.unpack("i", resp.read(4))[0]
    if (magic != 604210091):
        print("解析错误"+meshUrl)
    version = struct.unpack("i", resp.read(4))[0]
    # strlen = struct.unpack("H", resp.read(2))[0]
    animFile = readStr(resp)##struct.unpack(str(strlen)+"s", resp.read(strlen))[0].decode("utf-8")
    textureFile = readStr(resp)
    print("Start Load "+name+"_"+skin)
    if(len(re.findall(r"^\d+$", name))>0 and int(name)<498):
        print("小于68的先跳过去")
        return
    savelocal(meshUrl)
    #http://8.129.58.72:8080/models/1_0.lmesh
    #http://8.129.58.72:8080/models/1_0.lanim
    #http://8.129.58.72:8080/textures/1/annie_base_2012_cm.png
    savelocal("http://8.129.58.72:8080/models/"+animFile+".lanim")
    savelocal("http://8.129.58.72:8080/textures/"+name+"/"+textureFile+".png")
    # savelocal("http://8.129.58.72:8080/models/"+name+"_0.lanim")
    ##savelocal("http://8.129.58.72:8080/models/"+name+"_0.lmesh", name)
    


def download(url):
    resp = urllib.request.urlopen(url)
    data = resp.read()
    try:
        data = gzip.decompress(data)
    except:
        pass
    html = data.decode("utf-8")
    soup = BeautifulSoup(html, "html.parser", from_encoding="utf-8")
    tags = soup.find(id="champions")
    btns = tags.find_all("button")
    for btn in btns:
        modelInfo = re.findall(r"loadModel\s*\(\s*'(\w+)',\s*(\w+)\)",btn["onclick"])[0]
        modelName = modelInfo[0]##loadModel('1', 0)
        modelSkin = modelInfo[1]
        parseMesh(modelName, modelSkin)

##champions

download("http://8.129.58.72:8080/index.html")
