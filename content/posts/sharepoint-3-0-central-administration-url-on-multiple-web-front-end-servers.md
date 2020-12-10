---
title: 'SharePoint 3.0 Central Administration URL on Multiple Web Front-end Servers'
date: Thu, 30 Aug 2007 15:36:07 +0000
draft: false
tags: ['Uncategorized', 'Windows SharePoint Services 3.0']
---

A coworker recently came to me asking how to change the SharePoint 3.0 Central Administration URL where two or more Web front-end servers host the Central Administration Web application, for example, where two WFEs are deployed, both will leverage the URL of the first server provisioned with the Central Administration Web application.  As many may have noticed, the path cannot be changed via the shortcut properties on the server, the reason is because the URL is Registry-based.  To change the SharePoint 3.0 Central Administration URL so that each server uses its locally provisioned Web application open the Registry editor and navigate to HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftShared ToolsWeb Server Extensions12.0WSS.  Locate CentralAdministrationURL and edit the value to reflect the desired location.

**Important** This article contains information about how to modify the registry. Make sure to back up the registry before you modify it. Make sure that you know how to restore the registry if a problem occurs. For more information about how to back up, restore, and modify the registry, click the following article number to view the article in the Microsoft Knowledge Base:

[256986](http://support.microsoft.com/kb/256986/) (http://support.microsoft.com/kb/256986/) Description of the Microsoft Windows registry