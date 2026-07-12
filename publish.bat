@echo off
set MESSAGE=%*
if "%MESSAGE%"=="" set MESSAGE=Portfolio improvements

git add .
git commit -m "%MESSAGE%"
git push
