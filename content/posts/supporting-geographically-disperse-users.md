---
title: 'Supporting Geographically Disperse Users'
date: Fri, 01 Oct 2010 22:58:25 +0000
draft: false
tags: ['Administration', 'Office Web Applications', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010', 'Windows Server 2008']
---

BranchCache
===========

If you manage a centralized, regional, or distributed infrastructure with a distributed or clustered user base, a combination of Windows 7 and Windows Server 2008 R2 may be the best pairing to mitigate the impact of bandwidth and latency penalties that are commonly incurred under such distributions.

Windows 7 and Windows Server 2008 R2 introduce a new feature (BranchCache) that can reduce wide area network (WAN) utilization and enhance Microsoft SharePoint Products and Technologies responsiveness when users access content in a central office from branch office locations. When you enable BranchCache, a copy of the content that is retrieved from the Web server is cached within the branch office. If another client in the branch requests the same content, the client can download it directly from the local branch network without needing to retrieve the content by using the Wide Area Network (WAN).

The three (3) basic deployment models where BranchCache should be considered can be described as:

Centralized where a single datacenter serves geographically remote users.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1300.image_thumb_67E5D60A.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2047.image_11A950FE.png)

Regional where geographically disperse datacenters serve users clustered around those datacenters.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4520.image_thumb_4BF4A112.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3036.image_7F9D0D70.png)

Distributed where geographically disperse datacenters serve geographically disperse users.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1067.image_thumb_01A9E66D.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3146.image_314804F9.png)

BranchCache can be implemented in two modes, Hosted or Distributed Cache. The Hosted Cache mode is where a one or more servers configured with Windows Server 2008 R2 acts a host in the branch office. The clients in the branch office are configured with the FQDN of the server acting as the host and will request resources from the Hosted Cache when available, if the Hosted Cache is not available, it is retrieved from the content server by using the WAN and then offered to the Hosted Cache so that subsequent clients can benefit. The Hosted Cache mode is supported for use with Microsoft SharePoint Products and Technologies.

The Distributed Cache mode is intended to support smaller regional models (less than 50 clients) where it is not possible to deploy a dedicated server to the branch office(s) and operates as a peer to peer model. In this mode, local Windows 7 clients keep a copy of the content and make it available to other authorized clients that request the same data; however, unlike Hosted Cache mode, this configuration works across a single subnet only, in addition, clients that hibernate or otherwise disconnect from the network are not able to provide content to requesting clients.

Configuring BranchCache with Microsoft SharePoint Products and Technologies
===========================================================================

### Configuring Web Servers

The configuration of Web Servers in preparation for BranchCache requires only installing the BranchCache role on the server machine through the Server Manager or optionally the Command Prompt.

1.  Open Server Management on each Web server by clicking Start | All Programs | Administrative Tools | Server Manager.
2.  On the Server Manager dialog select the Roles node.
3.  On the Server Manager dialog in the Roles window, select Add Role.
4.  On the <> dialog select BranchCache from the list of available options and click Next.

### Configuring the Hosted Cache Server

#### Install the BranchCache Feature

1.  Open Server Manager on the Hosted Cache server by clicking Start | Administrative Tools | Server Manager.
2.  On the Server Manager dialog select the Features node.
3.  On the Server Manager dialog in the Features window, select Add Features.
4.  On the Add Features Wizard select BranchCache from the list of available Features and click Next.
5.  On the Confirm Installation Selections dialog click Install.
6.  On the Installation Results dialog click Close.

#### Enable Hosted Cache Server Mode

1.  Open an elevated Command Prompt on the Hosted Cache server by clicking Start | All Programs | Accessories | Command Prompt.
2.  Enter netsh branchcache set service mode=HOSTEDSERVER in the Command Prompt and press Enter.

#### Configure the Cache

1.  Open an elevated Command Prompt on the Hosted Cache server by clicking Start | All Programs | Accessories | Command Prompt.
2.  Enter netsh branchcache set localcache directory=<drive>:<share>
3.  Enter netsh branchcache set cachesize size=<size in percent> percent=TRUE

#### Create a new Certificate

1.  On the Hosted Cache server open Microsoft Management Console by clicking Start | Run… and entering MMC in the Open… field.
2.  On the Microsoft Management Console click File | Add / remove snap-in.
3.  On the Add or Remove Snap-ins dialog select Certificates from the list of available snap-ins and click Add.
4.  On the Certificate snap-in dialog select Computer account from the list of available options and click Next.
5.  On the Select Computer dialog select Local computer (the computer this console is running on) and click Finish.
6.  On the Add or Remove Snap-ins dialog click OK.
7.  On the Console1 – \[Console Root\] dialog expand the Certificates (Local Computer) | Personal | nodes and then select Certificates.
8.  On the Console1 – \[Console Root\] dialog select Action | All Tasks | Import…
9.  On the Certificate Import Wizard\* dialog click Next.
10.  On the Console1 – \[Console Root\] dialog double-click the certificate imported from the previous steps and select Details on the Certificate dialog.
11.  On the Certificate dialog select Thumbprint and copy the Thumbprint.
12.  Paste the copied Thumbprint into a text editor and remove any spaces.
13.  Open an elevated Command Prompt on the Hosted Cache server by clicking Start | All Programs | Accessories | Command Prompt.
14.  Enter netsh http add sslcert ipport:0.0.0.443 certhash=<paste from text editor> appid= and press Enter.
15.  Enter netsh branchcache show status all to confirm the configuration

\* The Hosted Cache server requires a certificate with the Server Authentication EKU. Follow the steps on the Certificate Import Wizard to install your certificate. Once the certificate has been imported, follow the remaining steps in this section.

#### Configure Client Machines

Refer to [http://technet.microsoft.com/en-us/library/dd637820(WS.10).aspx](http://technet.microsoft.com/en-us/library/dd637820(WS.10).aspx "http://technet.microsoft.com/en-us/library/dd637820(WS.10).aspx").

BranchCache can be used with Windows SharePoint Services 3.0, Microsoft Office SharePoint Server 2007, Microsoft SharePoint Foundation 2010, and Microsoft SharePoint Server 2010.

Learn more here [http://technet.microsoft.com/en-us/library/dd755969(WS.10).aspx](http://technet.microsoft.com/en-us/library/dd755969(WS.10).aspx).

Office Document Cache (Upload Center)
=====================================

Office Document Cache (ODC) is a concept new to Office 2010. ODC is a client repository that is used both when Office files are downloaded and uploaded to a server. In a download scenario, the files is downloaded to the cache and opened from that location, conversely, when a file is saved the document is saved to the cache where the upload occurs in the background asynchronously.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0486.image_thumb_5F05A7F1.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1057.image_592B0458.png)

In the interest of performance, ODC manages changes differentially in that only file differentials are sent across the wire, so in the event a user edits a document, only those changes are transmitted as opposed to the entire document.

ODC uses the File Synchronization via SOAP over HTTP (FSSHTTP) protocol which requires both Microsoft SharePoint Foundation or Server 2010 and Office 2010 and supports Office Xml formats, for example docx, pptx, and xlsx.

The benefits of the Office Document Cache can be summarized as follows:

*   Clients can access documents even if the server is offline if the document has been previously downloaded to the cache.
*   Reduction in network utilization to support remote clients.
*   More efficient user experience by providing background data transfers.

SharePoint Workspace
====================

Microsoft SharePoint Workspace replaces Microsoft Office Groove enabling fast, anytime, anywhere access to your Microsoft SharePoint team sites.

SharePoint Workspace allows users to synchronize SharePoint Server 2010 document libraries with SharePoint Workspace so you can access, view and edit files anytime and anywhere from your computer. Lists such as Discussion, Tasks, and custom lists are supported as well. You can even synchronize Business Connectivity Services lists so access to your backend systems is easy and painless.

To learn more see [http://www.microsoft.com/office/2010/en/sharepoint-workspace/default.aspx](http://www.microsoft.com/office/2010/en/sharepoint-workspace/default.aspx).

Office Web Applications
=======================

The Office Web Applications online companions to Word, Excel, PowerPoint, and OneNote that provide the ability to work with Office documents from virtually anywhere with a supported browser.  Office Web Applications enable remote users to access only segments of information as opposed to downloading the entire document, spreadsheet, or presentation providing improved time to first page rendering when compared to the Office client in a similar scenario.

**Browser View**

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1376.image_thumb_1CB28FAE.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7750.image_36F2F8D2.png)

**Client View**

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2134.image_thumb_1A9590E5.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4682.image_49C77C7C.png)

Mobile Views
============

Mobile Views in SharePoint 2010 provide a version of pages optimized for mobile devices.  Mobile Views are effectively a standard SharePoint list view marked for additional use as a mobile list view. For more information see [http://msdn.microsoft.com/en-us/library/ms462572.aspx](http://msdn.microsoft.com/en-us/library/ms462572.aspx "http://msdn.microsoft.com/en-us/library/ms462572.aspx").

**List Item View**

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7737.image_thumb_7F108EE1.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2541.image_2DD64784.png)

**Thumbnail Preview**

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6254.image_thumb_6B832F40.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0407.image_05576570.png)

Next Generation TCP/IP Stack
============================

Beyond BranchCache and Office Document Cache both Windows Vista/7 and Windows Server 2008 (incl. R2) feature the Next Generation TCP/IP stack which is a complete redesign of TCP/IP functionality for both Internet Protocol version 4 (IPv4) and Internet Protocol version 6 (IPv6).

Performance enhancements to increase throughput in high-bandwidth, high-latency, and high-loss networking environments included in the Next Generation TCP/IP Stack include, for example, receive window auto-tuning which continuously determines the optimal receive window size by measuring the bandwidth-delay product and the application retrieve rate, and adjusts the maximum receive window size based on changing network conditions.

Despite supporting scalable windows in Windows Server 2003 and Windows XP the maximum receive window size still limits throughput because it is a fixed maximum size for all TCP connections, which can enhance throughput for some connections and decrease throughput for others. Additionally, the fixed maximum receive window size for a TCP connection does not vary with changing network conditions. In Windows Vista and Windows Server 2008 scaling is enabled by default allowing up to a 16 MB window size. As the data flows over the connection, the Next Generation TCP/IP stack monitors the connection, measures the current bandwidth-delay product for the connection and the application receive rate, and adjusts the receive window size to optimize throughput.

For additional information on improvements in network throughput and task completion times see also [Enhanced Network Performance with Microsoft Windows Vista and Windows Server 2008](http://download.microsoft.com/download/4/B/4/4B455E48-72C4-4A04-B9A5-892FD497087A/Tolly208306MicrosoftIPStack-FINALREV.pdf) which examines the benefits of Next Generation TCP/IP Stack across a combination of Windows XP with Service Pack 2 and Windows Vista with Service Pack combined with Windows Server 2003 R2 and Windows Server 2008.

Windows Internet Explorer 8.x
=============================

Internet Explorer 8 can help further improvement performance for distributed users through increasing the number of parallel connections per server from 2 to 6, effectively tripling the number of elements that can be requested from a server in parallel translating into faster page download times when bandwidth is available. In Internet Explorer 7 there was the concept of blocking external scripts, in Internet Explorer 8 when an external scripts is encountered, it continues parsing on a second thread to ensure that it can continue downloading page elements as fast as possible resulting in both faster and more efficient downloads. The JScript engine included with Windows Internet Explorer 8.x speeds up many common user scenarios. Windows Internet Explorer 8.x includes improvements to widely-used JScript functionality such as faster string, array, and lookup operations and changes to the core architecture to reduce the cost of functions calls, object creation, and lookup patterns for variables scoped to the window or objects.

General
=======

Search SharePoint Products and Technologies with Windows 7 Search Connectors
----------------------------------------------------------------------------

Windows Search Connectors are simply OSDX files that represent syndication syntax that references one or more resources.  Windows Search Connectors allow you to search the content of the location specified in the OSDX file from the Windows Shell.

The following example can be used to create a Windows 7 Search Connector for SharePoint.  This example assumes the Information Worker Demonstration Virtual Machine that can be downloaded from [http://www.microsoft.com/downloads/details.aspx?FamilyID=751fa0d1-356c-4002-9c60-d539896c66ce&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=751fa0d1-356c-4002-9c60-d539896c66ce&displaylang=en "http://www.microsoft.com/downloads/details.aspx?FamilyID=751fa0d1-356c-4002-9c60-d539896c66ce&displaylang=en").  Modify the values to suit your individual specifics.

Copy the Xml below into a new text document.

<?xml version="1.0" encoding="UTF-8"?>  
  <OpenSearchDescription xmlns="[http://a9.com/-/spec/opensearch/1.1/"](http://a9.com/-/spec/opensearch/1.1/") xmlns:ms-ose="[http://schemas.microsoft.com/opensearchext/2009/"](http://schemas.microsoft.com/opensearchext/2009/")\>  
    <ShortName>**Contoso Intranet Search**</ShortName>  
    <Description>**Search Contoso Intranet.</**Description>   
    <Url type="application/rss+xml" template="**[http://intranet.contoso.com/SearchCenter/\_layouts/srchrss.aspx?k={searchTerms}&amp;s=All%20Sites](http://intranet.contoso.com/SearchCenter/_layouts/srchrss.aspx?k={searchTerms}&amp;s=All%20Sites"/)"/**\>  
    <Url type="text/html" template="**[http://intranet.consoto.com/SearchCenter/Pages/Results.aspx?k={searchTerms}&amp;s=All%20Sites](http://intranet.consoto.com/SearchCenter/Pages/Results.aspx?k={searchTerms}&amp;s=All%20Sites"/)"/**\>  
    <ms-ose:ResultsProcessing format="application/rss+xml">  
    <ms-ose:LinkIsFilePath>-1</ms-ose:LinkIsFilePath>  
    </ms-ose:ResultsProcessing>  
</OpenSearchDescription>

Save the document as ContosoIntranet.odsx.

Double-click ContosoIntranet.odsx to install the connector.