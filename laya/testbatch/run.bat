@echo off
SET dp0=%~dp0
if "%1" == "" (goto none) else (goto normal)

:: û�����������������
:none
node %dp0%/scripts/run/index.js h
set /p cmd=���������� 
node %dp0%/scripts/run/index.js %cmd%
pause
exit

rem �����˺�����������
:normal
node %dp0%/scripts/run/index.js %*
