---
title: 'Welcome to the Developer Dashboard'
date: Sat, 21 Nov 2009 16:35:58 +0000
draft: false
tags: ['Code Samples', 'SharePoint Foundation 2010', 'SharePoint Server 2010', 'Windows Powershell']
---

**About the Developer Dashboard**

The Developer Dashboard is an instrumentation framework  new to Microsoft SharePoint Foundation and Server 2010 that can help diagnose particularly, classes of bugs that are easy to introduce through custom code, but often difficult to isolate by providing information about the request execution time, the number and callstack of each SPRequest allocation, the number, callstack, and query text of WCF calls and more.

The Developer Dashboard appears in a frame on the bottom of each page and can exist in one of three (3) possible modes – On, Off, OnDemand.  When the Developer Dashboard is in the ‘On’ mode, it is always displayed in a frame on the bottom of the page for each request, conversely, when the Developer Dashboard is in the ‘Off’ mode, it is not displayed, and finally when the Developer Dashboard is in the ‘OnDemand’ mode, it can be displayed or hidden by selecting an icon on the upper right corner of a page.  (see illustrations).

_Developer Dashboard_

[![DeveloperDashboard](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/WelcometotheDeveloperDashboard_E820/DeveloperDashboard_thumb.png "DeveloperDashboard")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/WelcometotheDeveloperDashboard_E820/DeveloperDashboard_2.png)

_OnDemand Mode Icon_

[![ShowHideMe](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/WelcometotheDeveloperDashboard_E820/ShowHideMe_thumb_1.png "ShowHideMe")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/WelcometotheDeveloperDashboard_E820/ShowHideMe_4.png) 

**Using the Developer Dashboard**

The Developer Dashboard makes it easy for IT professionals and developers to identify common issues, for example, if a value exceeds acceptable ranges it will be displayed in red and by hovering your mouse over any value you can receive additional information about that value or how common methods to resolve it depending on the situation.

For developers you can monitor any piece of code by wrapping it in the SPMonitoredScope or even create custom monitors for your own resources through implementing  ISPScopedPerformanceMonitor and adding the monitor to the SPMonitoredScope.

**Enabling the Developer Dashboard**

The Developer Dashboard can be enabled and disabled through the SharePoint Administration Tool (STSADM) or through Windows PowerShell.  The following examples illustrate each method:

_STSADM_

‘On’ Mode

STSADM –o setproperty –pn developer-dashboard –pv On

‘Off’ Mode

STSADM –o setproperty –pn developer-dashboard –pv Off

‘OnDemand’ Mode

STSADM –o setproperty –pn developer-dashboard –pv OnDemand

But wait there’s more…

Suppose you’d like to only display the developer dashboard if one or more counters (acceptable values) are exceeded, there’s a way to do that too by running:

STSADM –o setproperty –pn developer-dashboard –pv expensiveoperationsonly

_Windows PowerShell_

See below.

_Scripted (Windows PowerShell)_

Optionally you can script the configuration of the Developer Dashboard – to do so copy the following script and save it to somefile.ps1.

Param (\[String\]$mode)

function Main()  
{  
  $dashboard = \[Microsoft.SharePoint.Administration.SPWebService\]::ContentService.DeveloperDashboardSettings;  
  $dashboard.DisplayLevel = $mode;  
  $dashboard.RequiredPermissions ='EmptyMask';  
  $dashboard.TraceEnabled = $true;  
  $dashboard.Update()

  Write-Host "Configured Developer Dashboard with mode $mode."  
}

Open the Microsoft SharePoint 2010 Shell and change directories to where you saved somefile.ps1 and run ./somefile.ps1 OnDemand (or optionally On or Off).