---
title: 'What’s new in SharePoint Server 2016 Installation and Deployment'
date: Wed, 13 May 2015 00:04:32 +0000
draft: false
tags: ['Microsoft Ignite', 'SharePoint', 'SharePoint Server 2016']
---

At Microsoft Ignite in Chicago, IL we disclosed the initial infrastructure investments we’re making in SharePoint Server 2016.  This article describes initial investments made in installation and deployment of SharePoint Server 2016. 

**NOTE** Features and capabilities are subject to change.

System Requirements
===================

**Scenario**

**Deployment type and scale**

**Processor**

**RAM**

**Hard disk**

**Database server running a single SQL instance**

Development or evaluation installation with the minimum recommended services

64-bit, 4 cores

12-16 GB

80 GB for system drive

100 GB for second drive

**Database server running a single SQL instance**

Pilot, user acceptance test running all available services

64-bit, 4 cores

16-24 GB

80 GB for system drive

100 GB for second drive and additional drives

**Web server or application server in a three-tier farm**

Development or evaluation installation with the minimum number of services

64-bit, 4 cores

8-12 GB

80 GB for system drive

80 GB for second drive

**Web server or application server in a three-tier farm**

Pilot, user acceptance test running all available services

64-bit, 4 cores

12-16 GB

80 GB for system drive

80 GB for second drive and additional drives

**NOTE** Disk space and number of drives depends on the amount of content and the method chosen to distribute data for a SharePoint environment.

Deployment Scenarios
====================

 

**SharePoint Server 2013**

**SharePoint Server 2016**

**Workgroup**

Unsupported

Unsupported

**Domain Controller**

Developer Installation

Developer Installation

**Client OS**

Unsupported

Unsupported

**Dynamic Memory**

Unsupported

Unsupported

**Windows Web Server**

Unsupported

Unsupported

Operating System Requirements
=============================

SharePoint Server 2016 is supported on Windows Server 2012 R2 and Windows Server Technical Preview. Evaluation copies of both operating systems can be downloaded from the TechNet Evaluation Center:

*   Windows Server 2012 R2  
    [http://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2012-r2](http://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2012-r2)
*   Windows Server Technical Preview  
    [http://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-technical-preview](http://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-technical-preview)

.NET Framework
--------------

The required version of .NET Framework is different for Windows Server 2012 R2 and Windows Server Technical Preview “Threshold”.

*   Windows Server 2012 R2: SharePoint 16 requires .NET Framework 4.5.2
*   Windows Server Technical Preview "Threshold": SharePoint 16 requires .NET Framework 4.6 Preview, which comes with Windows Server Technical Preview "Threshold".

**NOTE **Beginning January 13, 2016, .NET Framework 4.5.2 will be the minimum version of .NET Framework 4.x supported by Microsoft. See the Microsoft .NET Framework Support Lifecycle Policy FAQ at [http://support.microsoft.com/gp/Framework\_FAQ](http://support.microsoft.com/gp/Framework_FAQ) for more information.

Prerequisites
-------------

SharePoint Server 2016 prerequisites are similar to those required to install SharePoint Server 2013 and can be installed manually or with the Prerequisite Installer:

All the required prerequisites are installed by the SharePoint Prerequisite installer.

The SharePoint Server 16 Prerequisite Installer (prerequisiteinstaller.exe) installs the following software, if it has not already been installed on the target server:

**Application Server Role, Web Server (IIS) Role**. You can enable the Web Server (IIS) role and the Application Server role in Server Manager. However if the server is not connected to the Internet, the [http://support.microsoft.com/en-us/kb/2765260](http://support.microsoft.com/en-us/kb/2765260) article has an Offline method that explains how to use several Window PowerShell cmdlets to add and enable these roles.

**Microsoft SQL Server 2012 Native Client**. Installs with the Microsoft SQL Server 2012 Feature Pack \[[http://www.microsoft.com/en-us/download/details.aspx?id=29065](http://www.microsoft.com/en-us/download/details.aspx?id=29065)\]

The Microsoft® SQL Server® 2012 Feature Pack is a collection of stand-alone packages which provide additional value for Microsoft® SQL Server® 2012. It includes the latest versions of:

*   Tool and components for Microsoft® SQL Server® 2012.
*   Add-on providers for Microsoft® SQL Server® 2012.

**Microsoft ODBC Driver 11 for SQL Server** \[[http://www.microsoft.com/en-us/download/details.aspx?id=36434](http://www.microsoft.com/en-us/download/details.aspx?id=36434)\]

> Microsoft ODBC Driver 11 for SQL Server is a single dynamic-link library (DLL) containing run-time support for applications using native-code APIs to connect to Microsoft SQL Server 2005, 2008, 2008 R2, SQL Server 2012, SQL Server 2014 and Windows Azure SQL Database.   This redistributable installer for Microsoft ODBC Driver 11 for SQL Server installs the client components needed during run time to take advantage of new SQL Server 2012 features, and optionally installs the header files needed to develop an application that uses the ODBC API.

**Microsoft Sync Framework Runtime v1.0 SP1 (x64)** \[[http://www.microsoft.com/en-us/download/details.aspx?id=17616](http://www.microsoft.com/en-us/download/details.aspx?id=17616)\]

> Microsoft Sync Framework is a comprehensive synchronization platform that enables collaboration and offline scenarios for applications, services, and devices. Developers can build synchronization ecosystems that integrate any application and any type of data, using any protocol over any network. This service pack is intended to fix a handful of bugs as well as to transition to a public-facing change tracking API that is new in SQL Compact 3.5 SP2.

**Windows Server AppFabric 1.1** \[[http://www.microsoft.com/en-us/download/details.aspx?id=27115](http://www.microsoft.com/en-us/download/details.aspx?id=27115)\]

AppFabric is a set of integrated technologies that make it easier to build, scale, and manage Web and composite applications that run on IIS. AppFabric targets applications built using ASP.NET, Windows Communication Foundation (WCF), and Windows Workflow Foundation (WF).

It provides out-of-the-box capabilities for you to easily build and manage composite applications, including:

*   Enhanced design and development tools in Visual Studio to build rich composite applications

*   Management and monitoring of services and workflows via integration with IIS Manager and Windows PowerShell

*   Distributed in-memory application cache to improve application performance

**Cumulative Update Package 1 for Microsoft AppFabric 1.1 for Windows Server (KB2671763)** \[[http://support.microsoft.com/en-us/kb/2671763](http://support.microsoft.com/en-us/kb/2671763)\]

> Cumulative update package 1 for Microsoft AppFabric 1.1 for Windows Server. This hotfix package resolves several issues and adds several features that are described at [https://support.microsoft.com/en-us/kb/2671763](https://support.microsoft.com/en-us/kb/2671763 "https://support.microsoft.com/en-us/kb/2671763").

**Microsoft Identity Extensions** \[[http://www.microsoft.com/en-us/download/details.aspx?id=15373](http://www.microsoft.com/en-us/download/details.aspx?id=15373)\]

> Microsoft Federation Extensions for SharePoint 3.0 enables interoperable federated access to SharePoint 3.0 sites using the WS-Federation standard. It is built using the Windows Identity Foundation and supports use of ADFS 2.0 as an identity provider.

**Microsoft Information Protection and Control Client** \[[http://go.microsoft.com/fwlink/?LinkID=528177](http://go.microsoft.com/fwlink/?LinkID=528177)\]

> The Active Directory Rights Management Services (AD RMS) Client 2.x is software designed for your computers to help protect access to and usage of information flowing through applications that use AD RMS.

**Microsoft WCF Data Services 5.0** \[[http://www.microsoft.com/en-us/download/details.aspx?id=29306](http://www.microsoft.com/en-us/download/details.aspx?id=29306)\]

> WCF Data Services 5.0 enables creation and consumption of data services for the Web according to version 3 of the Open Data Protocol (OData), which facilitates data access and change via standard HTTP verbs. WCF Data Services 5.0 includes .NET Framework server and client libraries as well as Silverlight client libraries.

**Microsoft WCF Data Services 5.6** \[[http://www.microsoft.com/en-us/download/details.aspx?id=45308](http://www.microsoft.com/en-us/download/details.aspx?id=45308)\]

> This installer will update the NuGet packages referenced by the WCF Data Services item templates to version 5.6.3. This installer also makes the code generation (the “Add Service Reference”) for consuming OData V3 endpoints available for all current and future .Net 4.5.X versions.

**Microsoft .NET Framework 4.5.2** \[[http://support.microsoft.com/en-us/kb/2934520](http://support.microsoft.com/en-us/kb/2934520)\]

> The Microsoft .NET Framework 4.5.2 is a highly compatible, in-place update to the .NET Framework 4.5.1, the .NET Framework 4.5, and the .NET Framework 4. However, it can run side by side with the .NET Framework 3.5 Service Pack 1 (SP1) and earlier versions of the .NET Framework.
> 
>   
> The .NET Framework 4.5.2 for Windows 8.1, Windows RT 8.1, and Windows Server 2012 R2 is available on Windows Update and on Windows Server Update Service (WSUS).

**Update for Microsoft .NET Framework to disable RC4 in Transport Layer Security (KB2898850)** \[[http://www.microsoft.com/en-us/download/details.aspx?id=42883](http://www.microsoft.com/en-us/download/details.aspx?id=42883)\]

> Resolved a security issue that has been identified that could allow an unauthenticated remote attacker to compromise a system and gain access to information.

**Visual C++ Redistributable Package for Visual Studio 2013** \[[http://www.microsoft.com/en-us/download/details.aspx?id=40784](http://www.microsoft.com/en-us/download/details.aspx?id=40784)\]

> The Visual C++ Redistributable Packages install run-time components that are required to run applications that are developed by using Visual Studio 2013, on computers that don't have Visual Studio 2013 installed. These packages install run-time components of these libraries: C Runtime (CRT), Standard C++, ATL, MFC, C++ AMP, and OpenMP.

SharePoint Database Server Requirements
=======================================

SharePoint Server 2016 requires SQL Server 2014 for its databases. You can download SQL Server from the TechNet Evaluation Center at [http://www.microsoft.com/en-us/evalcenter/evaluate-sql-server-2014](http://www.microsoft.com/en-us/evalcenter/evaluate-sql-server-2014).   In addition SharePoint Server 2016 will support SQL Server 2016.  For additional information on SQL Server 2016 see also [http://www.microsoft.com/en-us/server-cloud/products/sql-server-2016/](http://www.microsoft.com/en-us/server-cloud/products/sql-server-2016/ "http://www.microsoft.com/en-us/server-cloud/products/sql-server-2016/").

MinRole (v1) Overview
=====================

One of the early new infrastructure advancements in SharePoint Server 2016 is a new concept, MinRole. MinRole is designed to transform guidance into code, simplifying deployment and scale with SharePoint ensuring a request is served end-to-end by the receiving server based on the origination of the request (I.e. end user or batch processing) and role of the destination server.

In previous versions of SharePoint, installation is role agnostic, which being a SharePoint servers’ role was only defined by what services were provisioned and its placement in a SharePoint Farm topology.  In many cases to serve a request, whether end user initiated or otherwise, the request traversed the scope of the SharePoint topology.

In addition, for each role there were specific documented recommendations to address performance and capacity planning, see also [Streamlined Topologies for SharePoint Server 2013](http://download.microsoft.com/download/6/6/7/66777910-576E-4909-9A09-A12697881800/sps-2013-streamlined-topology-model.pdf "Streamlined Topologies for SharePoint Server 2013"). 

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image1_thumb_50B4D58C.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image1_7AFEEC05.png)

In SharePoint Server 2016 documentation was put into code based on the experience of running SharePoint at scale in Office 365.  MinRole provides an out-of-the-box experience that provides topology recommendations, simplifies on-premises server farm deployments, and reduces the unit of scale to simplify capacity planning while providing predictable performance characteristics through enabling selective provisioning of SharePoint server roles based on position and function within a topology. 

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image10_thumb_2A779D96.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image10_00727E0C.png)

MinRole enables an administrator to select the appropriate server role for a specific server when provisioning SharePoint Server 2016 based on five (5) predefined configurations:

**Role Name**

**Description**

**Special Load**

_Reserved for services to be isolated from other services, I.e. 3rd party, PerformancePoint, etc._

**Web Front End**

_Services end user requests, optimized for low latency._

**Single Server Farm**

_Provisions all services on the server for a single server deployment.  This role is provided for evaluation and development purposes._

**Search**

_Reserved for Search services._

**Application**

_Services the backend jobs or the requests triggered by backend jobs, optimized for high throughput._

**Distributed Cache**

_Services distributed cache for the farm. Optionally, the server assigned to this role can load balance end user requests among the web front ends._

A predefined server role is configured and optimized for its intended purpose provisioning the expected services designed to support its function within a server farm environment.

In SharePoint Server 2016 MinRole can be instrumented through the PSConfig GUI or command line.

PSConfig and Windows PowerShell
-------------------------------

MinRole adds a new command line parameter, localserverrole, that can be used to specify the role that should be assigned to a specific server when configuring SharePoint Products and Technologies and accepts the following values:

*   SpecialLoad
*   WebFrontEnd
*   SingleServerFarm
*   Search
*   Application
*   DistributedCache

### Example 1 PSConfig.exe

[![clip_image002](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image002_thumb_026A0FD9.jpg "clip_image002")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image002_19FF2C9B.jpg)

psconfig.exe -cmd configdb -create –server \[Database Server Name\] –database \[Configuration Database Name\] –user \[Farm Service Account\] –password \[Farm Service Account Password\] –passphrase \[Passphrase\] –admincontentdatabase \[Central Administration Content Database Name\] -localserverrole SingleServerFarm

### Example 2 Windows PowerShell

New-SPConfigurationDatabase –DatabaseName \[Configuration Database Name\] –DatabaseServer \[Database Server\]  
       –AdministrationContentDatabaseName \[Central Administration Content Database Name\] –Passphrase (ConvertTo-SecureString   
       \[Passphrase\] –AsPlaintext –Force) –FarmCredentials (Get-Credential) -localserverrole SingleServerFarm

PSConfigUI.exe
--------------

MinRole provisioning is available through PSConfigUI.exe in addition to PSConfig.exe.

### Example 1 PSConfigUI.exe

[![clip_image003](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image003_thumb_40884BEC.png "clip_image003")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image003_51D69220.png) 

### Demo Video

[http://1drv.ms/1EBogcv](http://1drv.ms/1EBogcv "http://1drv.ms/1EBogcv")

**NOTE** Sequences shortened.

Health Rules and Compliance
---------------------------

To ensure role-based servers remain in compliance with their specified configuration – SharePoint Server 2016 includes new SharePoint Health Analyzer Health Rules to evaluate individual server role compliance and notify administrators of any changes to a predefined server role. 

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image11_thumb_2A59E2AD.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image11_3FB276B3.png) 

For example, if a server role is provisioned as a Web Front End and an unexpected service (I.e. Search) is provisioned on that machine, the SharePoint Health Analyzer will detect the deviation and generate a warning indicating the server is out of compliance in addition to providing an option to programmatically resolve the issue and bring the server back within compliance with its configured role definition.  

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_58B7C815.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_5173E048.png)

The Health Rules that monitor the status of server roles scan daily comparing the service instances on servers to their expected configuration (per the assigned role) and generated a Health Report detailing any deviation from the assigned role to include:

*   Service instances that are stopped, but we were expecting them to be started​
*   Service instances that are started, but we were expecting them to be stopped​

**NOTE** The Special Load role is exempt from scanning.

Administrators can change the scan schedule and/or disable the scan entirely in addition to disabling the auto-fix capabilities designed to ensure a server remains within compliance with its assigned role.  In the event automatic fix is disabled, MinRole will not enforce compliance with the servers’ assigned role.   In addition MinRole provides support for automatic provisioning of services assigned to a servers’ respective role.

In conclusion, MinRole improves performance and reliability through ensuring an incoming request is served by the receiving server, reducing server to server interaction, reducing dependencies, and improving speed – enabling a model based on unit scale that provides better load distribution and proper sizing when compared to SharePoint Server 2013.

**NOTE** SharePoint Server 2016 does not support standalone installation which automatically installed SQL Server Express Edition and configured the farm on a single computer.

You can deploy SQL Server and then configure the SharePoint farm separately using SharePoint Farm Configuration Wizard in Central Administration.

Upgrade and Migration
=====================

SharePoint Server 2016 will support upgrade from SharePoint Server 2013.  To upgrade from SharePoint Server 2013 to SharePoint Server 2016, you can use the database-attach method to upgrade. In the database-attach method, you first create and configure a SharePoint Server 2016 farm. Then you copy the content and service application databases from the SharePoint Server 2013 farm, and then attach and upgrade the databases.  This upgrades the data to the new version.

**NOTE** Site collections provisioned in backward compatible SharePoint 2010 (14) mode, must be upgraded to 2013 prior to upgrading to SharePoint Server 2016.  For additional information on upgrading site collections to SharePoint 2013 see also [https://technet.microsoft.com/en-us/library/jj219650.aspx](https://technet.microsoft.com/en-us/library/jj219650.aspx "Upgrade a site collection to SharePoint 2013").

Additional Resources
====================

Learn more about the evolution of SharePoint, roadmap, futures, and the road ahead:

BLOG The Evolution of SharePoint \[[http://blogs.office.com/2015/02/02/evolution-sharepoint/](http://blogs.office.com/2015/02/02/evolution-sharepoint/ "http://blogs.office.com/2015/02/02/evolution-sharepoint/")\]

BLOG SharePoint Server 2016 Update \[[http://blogs.office.com/2015/04/16/sharepoint-server-2016-update/](http://blogs.office.com/2015/04/16/sharepoint-server-2016-update/ "http://blogs.office.com/2015/04/16/sharepoint-server-2016-update/")\]

VIDEO The Evolution of SharePoint: Overview and Roadmap \[[https://channel9.msdn.com/Events/Ignite/2015/FND2203](https://channel9.msdn.com/Events/Ignite/2015/FND2203 "https://channel9.msdn.com/Events/Ignite/2015/FND2203")\]

SLIDES The Evolution of SharePoint: Overview and Roadmap \[[http://video.ch9.ms/sessions/ignite/2015/decks/FND2203\_Baer.pptx](http://video.ch9.ms/sessions/ignite/2015/decks/FND2203_Baer.pptx "http://video.ch9.ms/sessions/ignite/2015/decks/FND2203_Baer.pptx")\]

Learn more about platform investments in SharePoint Server 2016:

VIDEO What’s new for IT Professionals in SharePoint 2016 \[[https://channel9.msdn.com/Events/Ignite/2015/BRK2188](https://channel9.msdn.com/Events/Ignite/2015/BRK2188 "What's New for IT Professionals in SharePoint Server 2016")\]

SLIDES What’s new for IT Professionals in SharePoint 2016 \[[http://video.ch9.ms/sessions/ignite/2015/decks/BRK2188\_Walters.pptx](http://video.ch9.ms/sessions/ignite/2015/decks/BRK2188_Walters.pptx "Slides")\]

**Next month**:  What’s new in SharePoint Server 2016 Operations and Management
---
### Comments:
#### 
[Microsoft SharePoint / Project Server 2019 x64 MSDN logiciel cracké gratuit](https://all-downloads.com/microsoft-sharepoint-project-server-2019-x64-msdn "") - <time datetime="2019-09-03 05:49:32">Sep 2, 2019</time>

\[…\] See full information here . \[…\]
<hr />
#### 
[Microsoft SharePoint/Project Server 2019 x64 MSDN - Downloadly](https://downloadly.net/sharepoint-server/ "") - <time datetime="2020-03-21 14:09:28">Mar 6, 2020</time>

\[…\] See full information here . \[…\]
<hr />
