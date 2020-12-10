---
title: 'More KB934525 Troubleshooting...'
date: Thu, 25 Oct 2007 18:33:00 +0000
draft: false
tags: ['Uncategorized', 'Windows SharePoint Services 3.0']
---

**Problem:**  web.config is Read-only

**Isolation**: Check upgrade.log at %commonprogramfiles%Microsoft SharedWeb Server Extensions12BINLOGS, looking for the following error:

`[IisWebSiteSequence] [ERROR] [10/17/2007 11:38:22 AM]: Access to the path 'C:InetpubwwwrootwssVirtualDirectories5003web.config' is denied.`

**Cause**: Insufficient user rights on the file (ACL); this can happen if the read-only flag is actively set the for the web.config and/or if using a source code management system to maintain web.config.

**Solution**: Ensure that Everyone has write access to web.config when running the SharePoint Products and Technologies Configuration Wizard and in addition ensure that the read-only flag is not enabled on the file and that no other process lock this file, for example, a virus scanning application.

**Problem:**  ASP.NET not Correctly Registered in the IIS Metabase

**Isolation**: Check upgrade.log at %commonprogramfiles%Microsoft SharedWeb Server Extensions12BINLOGS, looking for the following error:

`[SPIisWebSiteWssSequence] [ERROR] [10/10/2007 10:21:25 AM]: Action 3.0.3.0 of Microsoft.SharePoint.Upgrade.SPIisWebSiteWssSequence failed.  
[SPIisWebSiteWssSequence] [ERROR] [10/10/2007 10:21:25 AM]: InstallAspNet 566609673 failed.  
[SPIisWebSiteWssSequence] [ERROR] [10/10/2007 10:21:25 AM]:    at Microsoft.SharePoint.Upgrade.EnsureAspNetScriptMapInstalled.Upgrade()  
   at Microsoft.SharePoint.Upgrade.SPActionSequence.Upgrade()`

Be aware that the number between InstallAspNet and failed will vary this is the ID of the affected IIS site.

**Cause**: The ASP.NET registration in the Metabase is not correct and requires remediation.

**Solution**:

1.  Open a Command Prompt and navigate to the following directory “%windir%microsoft.netframeworkv2.0.50727”
2.  Execute the following command: “aspnet\_regiis.exe -i”

**NOTE** This will update all IIS Web sites/Virtual Servers to use .NET framework 2.0.  In the event that some IIS Web sites/Virtual Servers should use .NET Framework 1.1 or 1.0 they will need to be adjusted after executing aspnet\_regiis.exe -i successfully as an alternative you can try to run “aspnet\_regiis.exe –s W3SVC/number/ROOT” where number is the number between InstallAspNet and failed in the upgrade log.

**Problem:**  web.config is Missing

**Isolation**: Check upgrade.log at %commonprogramfiles%Microsoft SharedWeb Server Extensions12BINLOGS, looking for the following error:

`[AssemblyReferenceFixUp] [3.0.4.0] [ERROR] [10/18/2007 11:47:40 AM]: Application Web Config for this IIS site (944564711) could not be found at D:wwwrootwssVirtualDirectories5003web.config.`

**Cause**: web.config has been deleted by an administrator.

**Resolution**: Ensure that all web.config files for all configured SharePoint web applications exists before running the SharePoint Products and Technologies Configuration Wizard.

For all other issues, consider the following steps:

Clear Cache

1.  Navigate to C:Documents and SettingsAll UsersApplication DataMicrosoftSharePointConfig<GUID> in Windows Explorer
2.  Backup and delete the XML files in the <GUID> directory
3.  Change the content of the cache.ini to „1”
4.  Restart the Windows SharePoint Services Timer Service
5.  Restart the Windows SharePoint Services Administration Service
6.  Open a Command Prompt and navigate to the following directory %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN
7.  Execute the following command “psconfig -cmd upgrade -inplace b2b –force”

**NOTE** Do not use the SharePoint Products and Technologies user interface.