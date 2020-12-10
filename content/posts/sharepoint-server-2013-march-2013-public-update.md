---
title: 'SharePoint Server 2013 March 2013 Public Update'
date: Thu, 09 May 2013 20:18:05 +0000
draft: false
tags: ['Administration', 'Cumulative Updates', 'SharePoint', 'SharePoint Server 2013']
---

The March 2013 Public Update for SharePoint Server 2013 was released on March 12, 2013 and in addition to resolving several issues, features new and added capabilities such as the ability to configure multiple app domains in when using AAM or Host Header configurations.  For a complete list of fixes included in this update see also [Description of the SharePoint Server 2013 update: March 12, 2013](http://support.microsoft.com/kb/2767999).

NOTE

Ensure adequate disk space is available to extract the SharePoint Server 2013 March 2013 Public Update content.  The SharePoint Server 2013 March 2013 Public Update is 565 MB, 1.65 GB extracted.  A minimum of 2 GB available disk space should exist to install the SharePoint Server 2013 March 2013 Public Update.

Patching servers with the Search service installed requires a specialized installation process.

1.  [Download the SharePoint Server 2013 March 2013 Public Update](http://download.microsoft.com/download/5/1/C/51CA768E-C79E-41BA-91D4-7F7D929B0BFE/ubersrvsp2013-kb2767999-fullfile-x64-glb.exe)
2.  Stop the SharePoint Timer Service, SharePoint Server Search 15, and SharePoint Search Host Controller services (open a Command Prompt and run each command in the order below):

1.  NET STOP SPTimerV4 _(Performs host deployment and management for SharePoint search components)_
2.  NET STOP OSearch15 (Sends notifications and performs scheduled tasks for SharePoint)
3.  NET STOP SPSearchHostController (Administers and crawls content from repositories)

4.  Install the [SharePoint Server 2013 March 2013 Public Update](http://technet.microsoft.com/en-us/library/ff806338(v=office.15)).

For additional information on patching Search servers see also [How to install update packages on a SharePoint farm where search component and high availability search topologies are enabled](http://blogs.technet.com/b/tothesharepoint/archive/2013/03/13/how-to-install-update-packages-on-a-sharepoint-farm-where-search-component-and-high-availability-search-topologies-are-enabled.aspx).

NOTE

Installation of the SharePoint Server 2013 March 2013 Public Update will require a reboot of each server where the SharePoint Server 2013 March 2013 Public Update is installed.  The SharePoint Timer Service, SharePoint Server Search 15, and SharePoint Search Host Controller services are set to start automatically and should be stopped using the process above prior to running the SharePoint Products Configuration Wizard.

1.  Run the [SharePoint Products Configuration Wizard](http://technet.microsoft.com/en-us/library/cc263093(v=office.14).aspx)
2.  Start the x services in the order specified below:

1.  NET START SPSearchHostController
2.  NET START OSearch15
3.  NET START SPTimerV4

The SharePoint Server 2013 March 2013 Public Update establishes a baseline for future Public and Cumulative Updates from Microsoft for SharePoint Server 2013 and is required to support the installation of future updates.  The resulting build number for the SharePoint Server 2013 March 2013 Public Update is15.0.4481.1005.

FAQ

**Q:**  Is there a difference between Public and Cumulative Updates?

**A:**  Yes.  Public Updates are released monthly and are broad in distribution containing both security fixes and critical non-security fixes.  Cumulative Updates are released every two months and contain approved hotfixes.

**Q:**  Do I need to install the SharePoint Server 2013 March 2013 Public Update?

**A:**  The SharePoint Server 2013 March 2013 Public Update establishes a baseline for future product updates and must be installed to support the installation of future product updates.

Resources

[Description of the SharePoint Server 2013 update: March 12, 2013](http://support.microsoft.com/kb/2767999)

[Update center for Office, Office servers, and related products](http://technet.microsoft.com/en-US/office/ee748587.aspx)