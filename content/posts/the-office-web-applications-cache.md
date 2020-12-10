---
title: 'The Office Web Applications Cache'
date: Wed, 01 Sep 2010 09:06:30 +0000
draft: false
tags: ['Office Web Applications', 'SharePoint Server 2010', 'Uncategorized']
---

The Office Web Applications cache is used by Word and PowerPoint Web Applications to create a version of a document requested for viewing through the browser improving performance and reducing resource consumption on server machines by making cached versions of a document or presentation available in cases where there are multiple requests for the same document.  An important step in information architecture planning should include aligning the appropriate resources for the Office Web Applications cache through understand the frequency of browser requests and dynamics of the data requested.

The Office Web Applications cache occurs in two (2) distinct tiers, on the server file system and within a “specialized” site collection hosted on a per Web application basis.  Document or presentation requests made through the Office Web Applications are served through both caches as the images are rendered for client consumption.  Both cache locations are used by all site collections within a Web application where the Office Web Applications features activated.

For example, when a client requests a document, the document is rendered through an AppServerHost.exe process and the document subsequently is cached to the server file system cache located on each server from which the content is propagated to the site collection cache which exists on a per Web application basis.  Subsequent requests for the document are rendered from the site collection cache.

Documents existing in the site collection cache are organized into subfolders within a document library (cache) representing the date on which the request was initiated.  For example, if a user requests a Word document on September 1st, 2010, a new subfolder is created within the cache document library labeled date\_09-01-2010.

**Cache Creation**

The Office Web Applications cache is created when the Office Web Apps Cache Creation Timer Job definition (see illustration) executes ensuring a cache exists for each Web application.  The Office Web Apps Cache Creation Timer Job definition runs by default every 5 minutes.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6283.image_thumb_39126E97.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0842.image_46C52A9F.png)

The location of the site collection is based on the round robin load balancing logic associated with the creation of site collections in available content databases.  In scenarios where high utilization of the Office Web Applications is anticipated, isolation of this cache should be considered. 

Isolation of the Office Web Applications cache will require the creation of a new content database to receive the cache and moving the existing cache to the new content database.  See example Windows PowerShell script below:

$WebApp = http://<webapplication> $CacheDb = New-SPContentDatabase -Name Contoso\_OfficeWebApps\_Cache -WebApplication $WebApp -DatabaseServer <serverinstance> Get-SPOfficeWebAppsCache -WebApplication $WebApp | Move-SPSite -DestinationDatabase $CacheDb

**Cache Locations**

Server File System Location

The server file system cache is located at C:WindowsTemppowerpointcache and C:WindowsTempwaccache and is not configurable.  Proper planning should include understanding both disk space and performance requirements to sustain Office Web Applications usage patterns in your organization.

Web Application Cache Location

The site collection cache is used in conjunction with the server file system cache and is configurable by a Farm administrator.  The following settings can be configured:

*   Cache Size
*   Expiration Period
*   Location

_Cache Size_

The Office Web Applications site collection cache size specifies the amount of space in bytes allocated to render documents.  A larger cache size is recommend to reduce resource consumption and optimize overall performance to support concurrent requests for the same document or presentation.

See the example Windows PowerShell script below:

$SizeinBytes = 1024 \* 1024 \* 1024 \* 100 Get-SPWebApplication | Set-SPOfficeWebAppsCache -ExpirationPeriodInDays 15 -MaxSizeInBytes $SizeinBytes

The Windows PowerShell script in this example will configure the cache size to 100GB (the default cache size is 100GB) with a 15 day expiration period.  The cache size and expiration period should be configured to support your organizations utilization of the Office Web Applications.  Increasing the cache size and expiration period can help reduce server resource consumption and optimize overall performance.  When configuring a larger cache size you should consider isolating the site collection cache to its own unique content database for the Web application where the Office Web Applications Features have been activated.

_Expiration Period_

The expiration period specifies the amount of time in days content should remain in the cache before the contents are removed.  The default retention period is 30 days.  A longer expiration period is suitable to support frequent requests over a long period for the same documents or presentations; however, depending on your organizations usage patterns a longer expiration period can result in a larger overall cache size.  Proper profiling and planning should be considered to ensure the cache has proper capacity.

_Location_

The location of the Office Web Applications cache can be configured on a per Web application basis.

**NOTE**

When configuring cache size and expiration period the general rules to follow are:

*   Where documents and presentations are accessed frequently and subject to change infrequently, a larger cache size and expiration period can help to improve performance.
*   Where documents and presentations are subject to change frequently, a smaller cache size and shorter expiration period can help to improve performance.

**Clearing the Cache**

To clear the Office Web Applications cache you will need to clear the server file system cache and the Site Collection cache for the Web application.

1.  Delete the cache files from the server file system cache
2.  Delete the cache files from the site collection cache

To clear the site collection cache (step 2)

Open the SharePoint 2010 Management Shell and enter Get-SPOfficeWebAppsCache at the prompt.  This will return the Office Web Applications site collection cache Url for each Web application in the farm.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2086.image_thumb_2203ED5B.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6470.image_29FB8FBD.png)

Enter the desired Office Web Applications site collection cache Url in the browser.

From the Office Web Applications site collection cache navigate to All Content | cache.  (see illustration).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4130.image1_thumb_07C38437.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5810.image1_017CADA9.png)

Select and delete all folders within the cache.

**NOTE**

The Office Web Apps Expiration Timer Job definition is installed once per Web application and is responsible for expiring old documents and presentations to ensure the site collection cache utilization remains within the configured storage limits.  The Office Web Apps Expiration Timer Job definition runs by default nightly.