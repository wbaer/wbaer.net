---
title: 'Introduction to Machine Translation Services in SharePoint 2013'
date: Mon, 12 Nov 2012 21:29:25 +0000
draft: false
tags: ['Administration', 'Machine Translation Services', 'SharePoint', 'SharePoint Server 2013', 'SPC219']
---

Introduction

SharePoint Server 2013 introduces several new service applications; among them is the new Machine Translation Service. The new Machine Translation Service enables you to reach more people with new cloud-based translation services capable of translating not only sites, but also their content. These services have a comprehensive set of APIs, REST, and CSOM support, so content can be pre-translated when needed, or translated on the fly by users—asynchronously, synchronously, or streaming.

This article provides a Machine Translation Services overview including to references to other useful Machine Translation Services resources.

Machine Translation Services provides machine translation; machine translation is the use of software to translate text from one natural language such as English to another, such as German basically substituting one word in one natural language to its corresponding word in another (see illustration).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2577.image_thumb_1395329A.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4628.image_49F68076.png)

In Machine Translation Services the actual translation process is performed by a cloud-hosted machine translation service where processed requests are submitted.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5657.image_thumb_763F1928.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0336.image_035944D4.png)

There are a variety of methods that can be used to submit translation requests discussed further in this article.

Architecturally the Machine Translation Service shares several components with Word Automation Services introduced in SharePoint Server 2010 including Timer Jobs, Document Queues, etc.  To that extent if you’re working with the server Object Model you’ll find similarities between Machine Translation Services and Word Automation Services including the Queue Manager/Schedule and Timer Job infrastructure which are responsible for the scheduling and adding of jobs to the Queue Database which also shares similarities with the Word Automation Services implementation in addition to the Application Manager which manages downloading files from content databases, creating and managing Application Workers, adding documents to Application Worker queues, and writing files back to a specified location.

The Application Worker Process; however, is unique to Machine Translation Services.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2425.image_thumb_5EB43F2A.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7217.image_21738A63.png)

Machine Translation Services is capable of processing translation requests both synchronously and asynchronously.  Jobs submitted to the Machine Translation Service synchronously are processed when the translation service timer job (SharePoint Translation Services) executes on its configurable, default interval of 15 minutes. Conversely jobs submitted synchronously are instantly translated as the synchronous working queue is prioritized over the asynchronous working queue.

Asynchronous requests can be also be processed manually by running the SharePoint Translation Services Timer Job Definition through SharePoint 2013 Central Administration or optionally through Windows PowerShell (see example below):

> $job = Get-SPTimerJob “SharePoint Translation Services”
> 
> $job.Runnow()

For Object Model and REST-based code samples related to the Machine Translation Service see also [http://msdn.microsoft.com/en-us/library/jj163145(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/jj163145(v=office.15).aspx). 

Provisioning and Configuring the Machine Translation Service

Prerequisites

To provision and configure the Machine Translation Service your environment must meet the following minimum requirements:

The App Management Service is started.

Server-to-server and app authentication is configured.

The User Profile Service Application Proxy must be in the Default Proxy Group and the User Profile Service provisioned and configured.

Internet connectivity is available.

Provision and Configure the Machine Translation Service

To learn more about provisioning and configuring Machine Translation Service see also [http://technet.microsoft.com/en-us/library/jj553772(v=office.15).aspx](http://technet.microsoft.com/en-us/library/jj553772(v=office.15).aspx).

Resources

[Learn more about SharePoint Server 2013](http://sharepoint.microsoft.com/en-us/Pages/default.aspx)

IT Professionals

[Create and Configure Machine Translation Services in SharePoint 2013](http://technet.microsoft.com/en-us/library/jj553772(v=office.15).aspx)

Developers

[Machine Translation Services in SharePoint 2013](http://msdn.microsoft.com/en-us/library/jj163145(v=office.15).aspx)

[Server Object Model Code Samples](http://code.msdn.microsoft.com/SharePoint-2013-Access-86639c3d)

[Client Side Object Model Code Samples](http://code.msdn.microsoft.com/SharePoint-2013-Perform-a-8e53b06a)

Support

[The Machine Translation Service is not running when it should be running (SharePoint 2013)](http://technet.microsoft.com/en-us/library/jj219801(v=office.15).aspx)

[SharePoint Server 2013 Known Issues](http://office.microsoft.com/en-us/help/sharepoint-server-2013-known-issues-HA102919021.aspx)