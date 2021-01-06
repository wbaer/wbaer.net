---
title: 'Installing Windows SharePoint Services 3.0 on Windows Server 2008'
date: Wed, 31 Oct 2007 00:06:00 +0000
draft: false
tags: ['Windows Server 2008', 'Windows SharePoint Services 3.0']
---

On October 29, 2007 [we announced that Windows SharePoint Services 3.0 bits will not be included on the Windows Server 2008 media](http://blogs.technet.com/windowsserver/archive/2007/10/29/windows-server-2008-and-windows-sharepoint-services-3-0-update.aspx); however, will remain available as a separate download, as a result changing the installation routine.  For those who used evaluation and release candidate builds of Windows Server 2008, Windows SharePoint Services 3.0 was included as a server role, adding the role subsequently configured supporting roles and role services - as a clean installation, this configuration must be performed by the server administrator and includes adding the Web Server (IIS)) role and role services.

**Prerequisites for Windows SharePoint Services 3.0**

**Adding the Web Server (IIS)) Role using Server Manager**

The Server Manager is designed to guide server administrators through the process of installing, configuring, and managing server roles and features that are part of Windows Server 2008, for more information on using the Server Manager visit [http://technet2.microsoft.com/windowsserver2008/en/library/18dd1257-2cd1-48f0-91f1-3012cf0fcc831033.mspx?mfr=true](http://technet2.microsoft.com/windowsserver2008/en/library/18dd1257-2cd1-48f0-91f1-3012cf0fcc831033.mspx?mfr=true "http://technet2.microsoft.com/windowsserver2008/en/library/18dd1257-2cd1-48f0-91f1-3012cf0fcc831033.mspx?mfr=true").

1.  Open Server Manager
2.  Click Start, Administrative Tools, and then click Server Manager
3.  Select Add Roles under Roles Summary
    
    [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/InstallingWindowsSh.0onWindowsServer2008_11BE3/image_thumb_7.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/InstallingWindowsSh.0onWindowsServer2008_11BE3/image_7.png)
    
4.  Follow the onscreen prompts and select Web Server (IIS)) from the list of available roles

**Adding Web Server (IIS)) Role Services**

Role services provide the functionality aspects of a role, role services are typically configured when a role is added.  Use the list below to determine what Web Server (IIS)) role services are required by Windows SharePoint Services 3.0.

**Web Server (IIS) Role and Role Services Required by SharePoint Products and Technologies**

> Web Server
> 
> *   Common HTTP Features
>     *   Static Content
>     *   Default Document
>     *   Directory Browsing
>     *   HTTP Errors
> 
> Application Development
> 
> *   ASP.NET
> *   .NET Extensibility
> *   ISAPI Extensions
> *   ISAPI Filters
> 
> Health and Diagnostics
> 
> *   HTTP Logging
> *   Logging Tools
> *   Request Monitor
> *   Tracing
> 
> Security
> 
> *   Basic Authentication
> *   Windows Authentication
> *   Digest Authentication
> *   Request Filtering
> 
> Performance
> 
> *   Static Content Compression
> *   Dynamic Content Compression
> 
> Management Tools
> 
> *   IIS Management Console
> 
> IIS 6 Management Compatibility
> 
> *   IIS 6 Metabase Compatibility

**Features**

Features describe an auxiliary or supporting function of a server and augment the functionality of an existing role.

*   .NET Framework 3.0 Features \*Required
    *   .NET Framework 3.0

*   Network Load Balancing \*Optional

*   Remote Server Administration Tools \*Optional
    *   Remote Administration Tools
        *   Web Server (IIS)) Tools

1.  Open Server Manager
2.  Select Add Features under Features Summary
    
    ![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/InstallingWindowsSh.0onWindowsServer2008_11BE3/image_thumb_6.png)
    
3.  Select .NET Framework 3.0 Features and click Next
    
    [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/InstallingWindowsSh.0onWindowsServer2008_11BE3/image_thumb_9.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/InstallingWindowsSh.0onWindowsServer2008_11BE3/image_9.png)
    
4.  Follow the onscreen prompts to complete the installation, you can return to the Server Manager at any time to add additional roles

**Installing Windows SharePoint Services 3.0**

1.  Download [Windows SharePoint Services 3.0](http://www.microsoft.com/downloads/details.aspx?familyid=D51730B5-48FC-4CA2-B454-8DC2CAF93951&displaylang=en)
2.  Run SharePoint.exe and follow the onscreen prompts to complete the installation

For more information on installing/deploying Windows SharePoint Services see the [Windows SharePoint Services 3.0 Technical Library](http://technet2.microsoft.com/windowsserver/WSS/en/library/700c3d60-f394-4ca9-a6d8-ab597fc3c31b1033.mspx) [Deployment for Windows SharePoint Services 3.0 Technology](http://technet2.microsoft.com/windowsserver/WSS/en/library/1f505e96-60e2-41ac-bf5d-9739105f047c1033.mspx?mfr=true) content.

**NOTE** On current Windows Server 2008 builds use the /RMTLAUNCH parameter with setup.exe to install Windows SharePoint Services 3.0.