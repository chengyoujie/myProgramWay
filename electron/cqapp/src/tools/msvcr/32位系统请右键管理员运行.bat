@echo off
echo ��ʼ����
copy  "%~dp0\dll\32λmsvcr100.dll" "C:\Windows\System32\msvcr100.dll"
if %errorlevel%==0 goto copysuc
if %errorlevel%==1 goto copyerr
pause
exit


:copysuc
echo ������ɿ�ʼע��
regsvr32 msvcr100.dll
echo ע�����,�����·���
pause
exit


:copyerr
echo ��������,��ȷ���Ƿ�ͨ��  ���ڸ��ļ����Ҽ� �Թ���Ա������С�ִ��bat
pause
exit
