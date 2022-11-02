@echo off
SET dp0=%~dp0
if "%1" == "" (goto none) else (goto normal)

:: 没有输入后面参数的情况
:none
node %dp0%/scripts/run/index.js h
set /p cmd=请输入命令 
node %dp0%/scripts/run/index.js %cmd%
pause
exit

rem 输入了后面参数的情况
:normal
node %dp0%/scripts/run/index.js %*
