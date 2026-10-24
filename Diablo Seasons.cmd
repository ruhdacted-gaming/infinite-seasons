@echo off
rem Opens the widget as a small standalone Edge window (no tabs or address bar).
rem A separate profile dir makes Edge honor the window size even if Edge is already open.
start "" msedge --app="file:///%~dp0widget.html" --window-size=400,760 --user-data-dir="%LOCALAPPDATA%\DiabloSeasonsWidget"
