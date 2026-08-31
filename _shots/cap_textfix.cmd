@echo off
rem mobile text-alignment verification shots (v2)
rem Workaround: headless=new clamps window min width (~500px), so 320/390px
rem --window-size requests rendered at ~500 CSS px. Fix: capture a full-width
rem harness page holding an iframe pinned to EXACT 320/390 CSS px - inner doc
rem media queries therefore see true mobile widths. Desktop line untouched.
set E="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set U="file:///C:/Users/Dzone/Downloads/content-personal-branding-website/index.html"
set S=file:///C:/Users/Dzone/Downloads/content-personal-branding-website/_shots
set P=c:\Users\Dzone\Downloads\content-personal-branding-website\_shots

%E% --headless=new --disable-gpu --hide-scrollbars --no-first-run --allow-file-access-from-files --user-data-dir="%P%\_prof_m1" --virtual-time-budget=9000 --window-size=520,26000 --screenshot="%P%\mobtext_320.png" %S%/cap_frame_320.html 2>nul
echo ONE code=%ERRORLEVEL%

%E% --headless=new --disable-gpu --hide-scrollbars --no-first-run --allow-file-access-from-files --user-data-dir="%P%\_prof_m2" --virtual-time-budget=9000 --window-size=520,26000 --screenshot="%P%\mobtext_390.png" %S%/cap_frame_390.html 2>nul
echo TWO code=%ERRORLEVEL%

%E% --headless=new --disable-gpu --hide-scrollbars --no-first-run --force-device-scale-factor=1 --user-data-dir="%P%\_prof_c" --virtual-time-budget=7000 --window-size=1440,3400 --screenshot="%P%\desk_after_textfix.png" %U%
echo THREE code=%ERRORLEVEL%

echo FOUR audit
%E% --headless=new --disable-gpu --no-first-run --allow-file-access-from-files --user-data-dir="%P%\_prof_maud" --virtual-time-budget=9000 --dump-dom "file:///C:/Users/Dzone/Downloads/content-personal-branding-website/_shots/audit_text.html" 2>nul | findstr /C:"AUDIT::"

dir "%~dp0*.png" | findstr /i ".png"
