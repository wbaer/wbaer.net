---
title: 'ULS Viewer and SharePoint 2010'
date: Wed, 27 Aug 2014 19:47:02 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2010', 'ULS Viewer']
---

So you downloaded the ULS Viewer and fired up on your SharePoint 2010 environment only to see something like this?

> \----
> 
> System.TypeInitializationException: The type initializer for 'UlsGump.AboutForm' threw an exception. ---> System.TypeLoadException: Could not load type 'System.Reflection.CustomAttributeExtensions' from assembly 'mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089'.
> 
>    at UlsGump.AboutForm..cctor()
> 
>    --- End of inner exception stack trace ---
> 
>    at UlsGump.MainForm.MainForm\_Load(Object sender, EventArgs e)
> 
>    at System.Windows.Forms.Form.OnLoad(EventArgs e)
> 
>    at System.Windows.Forms.Control.CreateControl(Boolean fIgnoreVisible)
> 
>    at System.Windows.Forms.Control.CreateControl()
> 
>    at System.Windows.Forms.Control.WmShowWindow(Message& m)
> 
>    at System.Windows.Forms.Control.WndProc(Message& m)
> 
>    at System.Windows.Forms.Form.WndProc(Message& m)
> 
>    at System.Windows.Forms.NativeWindow.Callback(IntPtr hWnd, Int32 msg, IntPtr wparam, IntPtr lparam)

The problem lies in that the ULS Viewer (well mscorlib) is looking for the .NET 4 version of mscorlib.  Installing [Microsoft .NET Framework Version 4.5](http://go.microsoft.com/fwlink/p/?LinkId=250950) should resolve the issue.

SharePoint 2010 installs Microsoft .NET Framework Version 3.5 SP1 whereas SharePoint 2013 installs [Microsoft .NET Framework Version 4.5](http://go.microsoft.com/fwlink/p/?LinkId=250950).