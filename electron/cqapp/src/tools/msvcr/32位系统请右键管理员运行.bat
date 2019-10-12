@echo off
echo 开始拷贝
copy  "%~dp0\dll\32位msvcr100.dll" "C:\Windows\System32\msvcr100.dll"
if %errorlevel%==0 goto copysuc
if %errorlevel%==1 goto copyerr
pause
exit


:copysuc
echo 拷贝完成开始注册
regsvr32 msvcr100.dll
echo 注册完成,请重新发布
pause
exit


:copyerr
echo 拷贝错误,请确认是否通过  【在该文件上右键 以管理员身份运行】执行bat
pause
exit
