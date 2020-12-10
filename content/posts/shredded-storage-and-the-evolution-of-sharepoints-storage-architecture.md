---
title: 'Shredded Storage and the Evolution of SharePoint’s Storage Architecture'
date: Thu, 20 Dec 2012 18:07:31 +0000
draft: false
tags: ['SharePoint', 'SharePoint Server 2013', 'Shredded Storage']
---

A number of questions have been asked surrounding Shredded Storage in SharePoint 2013.  To better understand the benefit of Shredded Storage and what is provides from a relational database BLOB data storage perspective it's helpful to understand the evolution of SharePoint’s storage model.

Past and Present

SharePoint Portal Server 2001[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2068.image_thumb_0CDDBDE2.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1805.image_4E58703B.png)

SharePoint Portal Server 2001 represented the first commercially available version of SharePoint and utilized a unique, new storage model based on the Web Storage System originally implemented in Exchange Server 2000.  The Web Storage System (ironically WSS) implemented a hierarchical folder model for storing unstructured content (I.e. Word Documents, PowerPoint Presentations, etc.) \[see image below\] with support for accessing and updating the content through a set of APIs and Internet protocols.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6366.image_thumb_6C567E2F.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6354.image_3096E57C.png)

The Web Storage System also implemented a store-level event model that supported both synchronous and asynchronous processing in addition to a light-weight workflow engine.

[![Web Storage System](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3124.WebStorageSystem_thumb_2BB431C0.png "Web Storage System")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1882.WebStorageSystem_653741B7.png)

**Definitions**

CDO (Collaborative Data Objects)

CDO provides access to Outlook-compatible objects through a COM-based API.  For example, an application can connect to a MAPI store, and then perform operations against that store, including creating and processing calendar items, and resolving and handling mail recipients.

IFS (Installable File System)

The installable file system (IFS) provides access to the Microsoft Web Storage System that SharePoint Portal Server uses.

In SharePoint Portal Server 2001 IFS access is used for:

*   Read-only access to the document library
*   Microsoft FrontPage Server Extensions
*   Web Storage System development through IFS

SMB (Server Message Block)

SMB is an application-layer network protocol commonly used for providing shared access to files, printers, and serial ports.

SharePoint Portal Server 2003[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0003.image4_thumb_2E79E6B3.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8726.image4_6F886617.png)

SharePoint Portal Server 2003 fundamentally changed the semantics of BLOB storage by routing the binary stream associated with a file to one or more SQL Server content databases, which in addition to the file stored individual sites structured data.   Unlike SharePoint Portal Server 2001, SharePoint Portal Server 2003 stored all end-user data in SQL Server databases providing a number of advantages over the Web Storage System such as:

*   Storing list data, documents, and associated metadata in normalized tables
*   Support for transactional updates of documents and document metadata
*   A unified backup solution for documents and document metadata

The Web Storage System supported one database per site and table per list, the new relational database model in SharePoint Portal Server 2003 implemented a fixed database schema and number of databases per server to enable more effective horizontal scaling capabilities.

The primary storage tables in SharePoint Portal Server 2003 included the Sites, Docs, Lists, Links, and WebParts tables.

[![dbSchema](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7343.dbSchema_thumb_0D1A4117.png "dbSchema")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8741.dbSchema_3BDFF9B9.png)

dbo.Sites

In SharePoint Portal Server 2003 the Sites table stored settings that apply to individual site collections representing the top-level site of each site collection including the root site and My Site as related to the portal site.  Subordinate objects such as Webs and their corresponding settings were stored in the Webs tables.

dbo.Docs

The Docs table stored all documents within their respective site collections such  as documents in document libraries, attachment, list nodes, and customized users pages.

The Content column in Docs was defined to store unstructured content generated by users and was based on the image data type.  The image data type, removed in future versions of SQL Server, was a variable-length binary data from 0 through 2^31-1 (2,147,483,647) bytes (I.e. 2GB).

dbo.Lists

The Lists table contained a row for each list of all the sites in the database. This table contained settings for each list, specifying which lists or document libraries were included in the sites.

dbo.Links

The Links table contained links used in link fix-up to recalculate links.

dbo.Web Parts

The Web Parts table contained information about all the Web Parts and list views used in the sites.  Web Part personalization information were maintained in the Personalization table.

SharePoint Portal Server 2003 used foreign key relationships into tables and added two additional databases, the Profile and Services databases. The Profile database stored personal profiles and audience definitions for targeting of Web Parts and content, and the Services database supported search and indexing as well as subscriptions and subscription results.

Office SharePoint Server 2007[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6685.image_thumb_52BECB35.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8726.image_6888B392.png)

Office SharePoint Server 2007 carried forward the relational database storage model with notable exceptions including changes to the content database schema as related to the storage of unstructured content.

External BLOB Storage

Office SharePoint Server 2007 introduced new methods to support the externalization of user content (BLOBs) or unstructured data through External BLOB Storage.  External BLOB Storage in Office SharePoint Server 2007 ran in parallel to SharePoint's content databases enabling unstructured content to reside on alternate data stores with the structured content, such as site data, residing within the content database(s).  To coordinate the separate data stores a COM interface was necessary and was implemented servers where Office SharePoint Server 2007 was installed and used basic semantics to recognize save and open commands that invoked redirection to BLOB storage in the event a BLOB data stream required updating.  The implemented COM interface in External BLOB Storage is referred to as a provider (ISPExternalBinaryProvider) which was installed and registered on each Web server.

[![EBS](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6366.EBS_thumb_270E0139.png "EBS")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5773.EBS_2B848200.png)

SharePoint Server 2010[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4532.image_thumb_45784222.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4201.image_6AE23590.png)

SharePoint Server 2010 maintained the relational database storage model and further modified content database schema in addition to adding support for new BLOB externalization support solutions.

External BLOB Storage

SharePoint Server 2010 continued to provide support for External BLOB Storage; however, was deprecated in favor of new a unstructured data storage solution, Remote BLOB Storage.

Remote BLOB Storage

In response to deprecating support for External BLOB Storage, SharePoint Server 2010 introduced support for Remote BLOB Storage that leveraged built-in SQL Server 2008 capabilities.  Remote BLOB Storage is a SQL Server library API set that is provided as an add-on feature pack for SQL Server 2008 R2, SQL Server 2008 or SQL Server 2008 R2 Express.  Remote BLOB Storage provides two separate solutions, a FILESTREAM provider that enables basic storage of unstructured content on either the file system of a local or remote database server and an interface to allow 3rd party vendors to develop providers for the externalization of unstructured data through Remote BLOB Storage.

Functionally and at its most basic Remote BLOB Storage provides a similar solution to handling unstructured data as External BLOB Storage; however, supports new levels of overall granularity.  Whereas External BLOB Storage was a COM-based farm level implementation, Remote BLOB Storage is a .NET-based database level implementation meaning it can be implemented for a certain subset of content, but not other content.  With Remote BLOB Storage SQL Server and SharePoint Server 2010 jointly manage the data integrity between the database records and contents of the RBS external store on a per-database basis.

For additional information about Remote BLOB Storage and FILESTREAM in addition to more resources see also [http://blogs.technet.com/b/wbaer/archive/2011/02/22/filestream-and-sharepoint-2010.aspx](http://blogs.technet.com/b/wbaer/archive/2011/02/22/filestream-and-sharepoint-2010.aspx).

SharePoint Server 2013[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0003.image_thumb_2FAE59C5.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3542.image_7E22EC2F.png)

SharePoint Server 2013 maintains the relational database storage model for unstructured content and while improving IO efficiency.  Support for External BLOB Storage is removed in SharePoint Server 2013 while support for Remote BLOB Storage is retained.

Shredded Storage

SharePoint Server 2013 provides an improved level of IO and storage efficiency through a new storage capability known as Shredded Storage.

Shredded storage is a new data platform improvement in SharePoint 2013 related to the management of large binary objects (I.e. BLOBS such as PowerPoint Presentations, Word Documents, etc.).

Shredded Storage both improves I/O and reduces compute utilization when making incremental changes to document or storing documents in SharePoint 2013. Shredded Storage builds upon the Cobalt (I.e. File Synchronization via SOAP of HTTP) protocol introduced in SharePoint 2010.

See also [http://blogs.technet.com/b/wbaer/archive/2012/11/12/introduction-to-shredded-storage-in-sharepoint-2013.aspx](http://blogs.technet.com/b/wbaer/archive/2012/11/12/introduction-to-shredded-storage-in-sharepoint-2013.aspx "http://blogs.technet.com/b/wbaer/archive/2012/11/12/introduction-to-shredded-storage-in-sharepoint-2013.aspx") for an overview of Shredded Storage.

In SharePoint Server 2010 dbo.AllDocStreams stored the document stream and related data for documents with content streams, in SharePoint Server 2013 dbo.DocStreams replaces dbo.AllDocStreams where each row stores a portion of the BLOB.  New dbo.DocToStreams contains rows which correspond to those in dbo.DocStreams (read more below).

![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0358.image_57A63E84.png)

Notable SharePoint Server 2013 Schema Changes

*   dbo.AllDocStreams has been renamed to dbo.DocStreams.  Each row in dbo.DocStreams stores a chunk or portion of the BLOB.
*   A new DocToStreams table contains a pointer to a corresponding row in dbo.DocStreams.  The BLOB Sequence Number (BSN) is used to manage the BLOB sequence across dbo.AllDocVersions, dbo.DocsToStreams, and dbo.DocStreams.  NextBSN is used to manage the last BSN for each BLOB.
*   The BLOB access pattern is dbo.AllDocs/dbo.AllDocVersions > dbo.DocsToStreams > dbo.DocStreams.

File Storage Semantics

*   dbo.AllDocs contains a single row per file similar to SharePoint Server 2010.
*   dbo.AllDocVersions contains one or more rows per file and one row per file version.
*   dbo.DocsToStreams contains a number of rows that correspond to the number of BLOBs associated with the file.  Each row in dbo.DocsToStreams corresponds to a row in dbo.DocStreams based on the BSN which has the associated BLOB in the Content column (see Notable SharePoint Server 2013 Schema Changes)

Shredded Storage Frequently Asked Questions

Q:  Can I disable Shredded Storage?

A:  No, Shredded Storage is enabled by default and cannot be disabled.

Q:  Does Shredded Storage work with Remote BLOB Storage (RBS)?

A:  Yes, Shredded Storage works with Remote BLOB Storage.

Q:  Can I prevent a file from being shredded?

A:  Yes and no.  In the event shredding is not desired the FileWriteChunkSize property can be set to the MaxFileSize of 2GB resulting in a monolithic file; however, modifying the FileWriteChunkSize property can adversely affect latency and performance.