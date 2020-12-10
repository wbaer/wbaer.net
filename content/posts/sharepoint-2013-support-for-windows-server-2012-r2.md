---
title: 'SharePoint 2013 Support for Windows Server 2012 R2'
date: Sun, 22 Sep 2013 18:20:21 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2013']
---

Summary
=======

Currently, Microsoft SharePoint Server 2013 is not supported for installation on computers running the Windows Server 2012 R2 operating system.   Installing SharePoint Server 2013 on a computer that is running Windows Server 2012 R2 could lead to unexpected behavior, therefore, Microsoft does not support SharePoint Server 2013 in Windows Server 2012 R2.

SharePoint Server 2013 with Service Pack 1 and SharePoint Foundation 2013 with Service Pack 1 will offer support for Windows Server 2012 R2. The release date for Service Pack 1 for SharePoint Server 2013 and SharePoint Foundation 2013 is to be determined. This article will be updated as more information becomes available.

More Information
================

Issue # 1

Running the Prerequisite Installer results in error:

Application Server Role, Web Server (IIS) Role:  
configuration error

Error Details

2013-09-17 11:47:58 -  
Created thread for installer

2013-09-17 11:47:58 -  
"C:Windowssystem32ServerManagerCmd.exe" -inputpath  
"C:Users<user>AppDataLocalTempPreAC72.tmp.XML"

2013-09-17 11:47:58 -  
Error: Unable to install (2)

2013-09-17 11:47:58 -  
Error: \[In HRESULT format\] (-2147024894)

2013-09-17 11:47:58 -  
Last return code (2)

2013-09-17 11:47:58 -  
Reading the following DWORD value/name...

2013-09-17 11:47:58 -  
Flags

2013-09-17 11:47:58 -  
from the following registry location...

2013-09-17 11:47:58 -  
SOFTWAREMicrosoftUpdatesUpdateExeVolatile

2013-09-17 11:47:58 -  
Reading the following string value/name...

2013-09-17 11:47:58 -  
PendingFileRenameOperations

2013-09-17 11:47:58 -  
from the following registry location...

2013-09-17 11:47:58 -  
SYSTEMCurrentControlSetControlSession Manager

2013-09-17 11:47:58 -  
Reading the following registry location...

2013-09-17 11:47:58 -  
SOFTWAREMicrosoftWindowsCurrentVersionWindowsUpdateAuto  
UpdateRebootRequired

2013-09-17 11:47:58 -  
Error: The tool was unable to install Application Server Role, Web Server (IIS)  
Role.

2013-09-17 11:47:58 -  
Last return code (2)

2013-09-17 11:47:58 -  
Options for further diagnostics: 1. Look up the return code value 2. Download  
the prerequisite manually and verify size downloaded by the prerequisite  
installer. 3. Install the prerequisite manually from the given location without  
any command line options.

2013-09-17 11:47:58 -  
Cannot retry

Applies To
==========

Applies to SharePoint Foundation 2013, SharePoint Server 2013