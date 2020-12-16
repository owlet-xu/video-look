set shell = CreateObject("wscript.shell")
set args = wscript.Arguments

' 电话/手台独立程序启动路径
spPath = args(0)
rdPath = args(1)

' 电话/手台独立程序启动命令
spPathCmd = Chr(34) & args(0) & Chr(34) & " s"
rdPathCmd = Chr(34) & args(1) & Chr(34) & " s"

' 结束电话手台程序
spdaemonKill = Chr(34) & args(0) & Chr(34) & " k"
rddaemonKill = Chr(34) & args(1) & Chr(34) & " k"

If IsExitFile(rdPath) Then
  b = shell.run(rddaemonKill, 0, true)
  d = shell.run(rdPathCmd, 0)
End If

If IsExitFile(spPath) Then
  a = shell.run(spdaemonKill, 0, true)
  c = shell.run(spPathCmd, 0)
End If

' 判断文件是否存在
Function IsExitFile(filespec)
  Dim fso
  Set fso=CreateObject("Scripting.FileSystemObject")
  If fso.fileExists(filespec) Then
  IsExitFile=True
  Else IsExitFile=False
  End If
End Function
