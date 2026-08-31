@echo off
set E="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set D=c:\Users\Dzone\Downloads\content-personal-branding-website\_shots
%E% --headless=new --disable-gpu --no-first-run --allow-file-access-from-files --user-data-dir="%D%\_prof_e" --virtual-time-budget=15000 --dump-dom "file:///C:/Users/Dzone/Downloads/content-personal-branding-website/_shots/audit_text.html" > "%D%\audit_out.txt" 2>nul
echo dump-exit=%ERRORLEVEL%
findstr /c:"AUDIT::" "%D%\audit_out.txt"
