---
title: 'Introduction to Shredded Storage in SharePoint 2013 [RTM Update]'
date: Mon, 12 Nov 2012 21:26:00 +0000
draft: false
tags: ['Security and Compliance', 'SharePoint', 'SharePoint Server 2013', 'Shredded Storage', 'SPC219']
---

Introduction

Shredded storage is a new data platform improvement in SharePoint 2013 related to the management of large binary objects (I.e. BLOBS such as Microsoft PowerPoint Presentations, Microsoft Word Documents, etc.).

Shredded Storage is both improves I/O and reduces compute utilization when making incremental changes to document or storing documents in SharePoint 2013. Shredded Storage builds upon the Cobalt (I.e. File Synchronization via SOAP of HTTP) protocol introduced in SharePoint 2010.

Cobalt

In SharePoint 2010 when saving a document, such as a documented opened from SharePoint with the Office 2010 client, only the incremental change to the document are submitted over the network from the client to the server; however, the document is coalesced on the Web server requiring a full read from the database server, and subsequently the new file inclusive of the change are written to the database server.

Shredded Storage at its most basic is designed to ensure the write cost of updating a document is proportional to the size of the change, and not of the file itself.

SharePoint 2013 allows content to be stored either a monolithic stream or as a collection of independent BLOBs (Shredded Storage). When shredded the data associated with a file such as Document.docx is distributed across a set of BLOBs associated with the file. The independent BLOBS are each assigned a unique ID (offset) to enable reconstruction in the correct order when requested by a user.

In SharePoint 2010 when a file is uploaded to a Document Library/List a single row is created in AllDocStreams to host the BLOB associated with the upload. As previously discussed, on subsequent edits to the file only the changes bytes (incremental change) are sent to the server across the network reducing the clients overall bandwidth utilization; however, in order to coalesce the changes, the file is read from the database server by the web server where the merge occurs and the file sent back to the database server for storage. In SharePoint 2010 this process improved the reliability of file I/O operation; however, the web server incurred a penalty as the result of the change. Shredded Storage improves on the SharePoint 2010 model by breaking an individual BLOB into “shredded BLOBS” that are stored in new database Table, DocStreams. Each BLOB contains a numerical Id representative of the source BLOB when coalesced. When a client updates a file only the shredded BLOB that corresponds to the change is updated with the update occurring on the database server as opposed to the Web server. As a result File IO operations are reduced by ~2x when compared to FSSHTTP in SharePoint 2010 and the storage footprint significantly reduced.

SharePoint 2010 BLOB Storage

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0334.image_thumb_635F99B5.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7271.image_22CD7313.png)

SharePoint 2013 BLOB Storage

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8838.image_thumb_25365937.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8357.image_27BF8AF5.png)

For example, suppose a user is working with a 10MB Microsoft PowerPoint Presentation and makes a change either adding a new slide, removing a slide, modifying attributes, etc. and saves the file back to the document library where it was initially accessed. The improved protocols associated with Shredded Storage identify the rows (in the new DocStreams table) necessary to be updated to support the change and updates the BLOB associated with that change in the corresponding row.

DocStreams

Within each content database a new data table DocStreams exists where each shredded BLOB is stored in an individual row.

Several new columns are present in the DocStreams table that represent a shredded BLOB including:

*   BSN: The BSN of the stream binary piece.
*   Data: Contains a subset of the binary data of the stream binary piece unless the stream binary piece is stored in Remote BLOB Storage.
*   Offset: The offset into the stream binary piece where this subset data belongs.
*   Length: The size, in bytes, of this subset data of the stream binary piece.
*   RbsId: If this stream binary piece is stored in remote BLOB storage, this value MUST contain the remote BLOB storage identifier of a subset of the binary data of the stream binary piece. Otherwise it MUST be NULL.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7608.image_thumb_55C91548.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8863.image_3AD091D4.png)

Shredded Storage Schema 

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1460.image_thumb_110902E2.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0358.image_57A63E84.png)

Shredded Storage is enabled by default and cannot be disabled. (enabled by default) can be both enabled and disabled on the server farm through available storage APIs.

FileReadChunkSize

SharePoint 2010 introduced a new FileReadChunkSize property as a control associated with the BLOB cache which enabled a server farm administrator to control the size of incremental reads when a client requested a file.

The BLOB Cache was particularly useful when serving rich media from SharePoint as the FileReadChunkSize property could be used to server files smaller than the FileReadChunkSize (100 KB) in a single SQL Server round trip and files up to the _LargeFileChunkSize_ (5 MB) served directly from SQL Server without disk buffering, resulting in low latency.

Another advantage that the BLOB cache provides is HTTP range request support. This enables a browser (or other client application) to request pieces of a file instead of the entire file. For example, if a browser only needs the last 1 MB of a 10 MB file, it can make a range request and the cache will serve only the last 1 MB. Without the BLOB cache, SharePoint Server ignores the HTTP range request and serves all 10 megabytes. The BLOB cache will help increase throughput by reducing unnecessary network load.

FileWriteChunkSize

In SharePoint 2013 a new property loosely related to FileReadChunkSize is provided to allow control of the size of a shredded BLOB. The size of shredded BLOBS can be configured by a server farm administrator in a manner similar to updating FileReadChunkSize with SharePoint 2010 using the FileWriteChunkSize property value. Configuring the FileWriteChunkSize property should be thoroughly tested in a non-production environment prior to committing any changes as a performance penalty may be incurred when too small a chunk size is configured and large file such as video files are being used frequently.

Resources

[Learn more about SharePoint Server 2013](http://sharepoint.microsoft.com/en-us/Pages/default.aspx)