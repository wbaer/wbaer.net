---
title: 'Distributed Cache in SharePoint Server 2016 IT Preview'
date: Fri, 18 Sep 2015 18:18:04 +0000
draft: false
tags: ['Distributed Cache', 'PowerPoint Automation Services', 'SharePoint', 'SharePoint Server 2016']
---

Overview
========

The Distributed Cache service provides in-memory caching services to several features in SharePoint Server 2016 IT Preview.

Some of the features that use the Distributed Cache service include:

*   Newsfeeds
*   Authentication
*   OneNote client access
*   Security Trimming
*   Page load performance

These features use the Distributed Cache for quick data retrieval. The Distributed Cache service stores data in memory and does not have a dependency on databases in SharePoint Server 2016 IT Preview. However, some SharePoint features may store data in both the Distributed Cache and databases.

Distributed Cache Improvements in SharePoint Server 2016 IT Preview
===================================================================

SharePoint Server 2016 IT Preview improves Distributed Cache performance and resiliency through a change which switches off NTLM authentication between SharePoint and the cache cluster; instead relying on encryption of cache data before transport.  In SharePoint Server 2013 under load/high scale – the cluster would start getting unresponsive to calls from SharePoint due to authentication overhead. i.e. every call from SharePoint, the cluster had to authenticate the call with AD.  This change also allows SharePoint Server 2016 IT Preview Distributed Cache clusters to scale up the number of client connections to help with throughput.

Topologies with MinRole and Distributed Cache
=============================================

The Distributed Cache component is on by default in the SingleServerFarm role and in the Cache role for SharePoint Server 2016 IT Preview. 

To learn more about MinRole roles and services see also [https://technet.microsoft.com/en-us/library/mt346114(v=office.16).aspx](https://technet.microsoft.com/en-us/library/mt346114(v=office.16).aspx "https://technet.microsoft.com/en-us/library/mt346114(v=office.16).aspx").

MinRole Roles and Distributed Cache
-----------------------------------

**Role Name**

**Display Name**

**Description**

**Distributed Cache**

WebFrontEnd

Front End

Services end user requests.  Optimized for low latency.

No

Application

Application

Services backend jobs or requests triggered by backend jobs.  Optimized for high throughput.

No

Cache

Distributed Cache

Services Distributed Cache.  Servers assigned to this role can load balance end user requests among Web Front End servers.

Yes

Search

Search

Reserved for Search services.

No

Custom

Custom

Reserved for services to be isolated from other services, I.e. 3rd party, PerformancePoint, etc.

No

SingleServerFarm

Single Server Farm

Provisions all services on the server for a single server deployment.  This role is provided for evaluation and development purposes.

Yes

Single Server Farm Example
--------------------------

All services isolated to the scope of single machine to include Distributed Cache.

[![SingleServerFarm](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/SingleServerFarm_thumb_4C5A86B2.png "SingleServerFarm")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/SingleServerFarm_6A390AB3.png)

Content + Search Farm Example
-----------------------------

All services isolated with the scope of a server farm.  Distributed Cache hosted on one or more dedicated servers.

[![ContentandSearchFarm](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ContentandSearchFarm_thumb_7BABFC3C.png "ContentandSearchFarm")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ContentandSearchFarm_359B3F29.png)

Content Farm + Search Farm Example
----------------------------------

Services distributed across one or more content farms and one dedicated search farm.  Distributed cache hosted on one or more dedicated servers with the scope of the content farm.

[![ContentSearchFarm](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ContentSearchFarm_thumb_68F99336.png "ContentSearchFarm")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ContentSearchFarm_2BD5D7B1.png)

Content + Service Farm Example
------------------------------

Services distributed across one or more content farms and one dedicated service farms.  Distributed cache hosted on one or more dedicated servers with the scope of the content and/or service farm.

[![ContentServiceFarm](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ContentServiceFarm_thumb_63410A41.png "ContentServiceFarm")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ContentServiceFarm_46385B79.png)