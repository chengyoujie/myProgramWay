@echo off
SET confUrl=%1

for /f "delims=" %%a in ("%~dp0../../..") do set "developUrl=%%~fa"

node %developUrl%/tool/ConfigPack/src/jsTool/index.js %confUrl%

cd %confUrl%
call svn up
copy "%confUrl%\XmlData\export\config.zzp" "%developUrl%\Game\laya\assets\mainRes\config\"
copy "%confUrl%\XmlData\export\effect.json" "%developUrl%\Game\laya\assets\mainRes\config\"
copy "%confUrl%\XmlData\export\ConfigData.d.ts" "%developUrl%\Game\src\declare\"
copy "%confUrl%\XmlData\export\ConditionType.ts" "%developUrl%\Game\src\core\enums\"
copy "%confUrl%\XmlData\export\config.zzp" "%developUrl%\Game\bin\mainRes\config\"
copy "%confUrl%\XmlData\export\effect.json" "%developUrl%\Game\bin\mainRes\config\"

start %confUrl%/XmlData
cd /d %~dp0
pause