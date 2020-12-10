---
title: 'Implementing Azure Blob Storage (ABS) with SQL Server 2014 and SharePoint 2013 [Updated]'
date: Mon, 25 Aug 2014 20:34:31 +0000
draft: false
tags: ['Administration', 'Hybrid and Coexistence', 'SharePoint', 'SharePoint Server 2013', 'Windows Azure']
---

Overview
========

NOTE (8/26/2014)

With any solution that externalizes the unstructured content with SharePoint you need to understand the limitations and optimal use of those solutions as documented at [http://technet.microsoft.com/en-us/library/ff628583(v=office.15).aspx](http://technet.microsoft.com/en-us/library/ff628583(v=office.15).aspx "http://technet.microsoft.com/en-us/library/ff628583(v=office.15).aspx") to include related latency and performance requirements.

With any application organizations face consistent key challenges such as high efficiency and business value, complex configuration, and low total cost of ownership.  Extending applications to the cloud in hybrid scenarios addresses many of these challenges, whether distributing SharePoint content across on-premises and Office 365 while leveraging search as a service (hybrid search) or externalizing data, extending it to the cloud with Remote Blob Storage or related technologies.

SQL Server 2014 and Windows Azure Blob Storage provide a unique solution that balances the needs of IT with those of the business - SQL Server Data Files in Windows Azure which allows you to create a database in SQL Server running in on-premises or in a virtual machine in Windows Azure with a dedicated storage location for your data in Windows Azure Blob Storage.

[![Picture1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_thumb_45B15DDB.png "Picture1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_5B0C8292.png)

This enhancement especially simplifies to move databases between machines by using detach and attach operations. In addition, it provides an alternative storage location for your database backup files by allowing you to restore from or to Windows Azure Storage. Therefore, it enables several hybrid solutions by providing several benefits for data virtualization, data movement, security and availability, and any easy low costs and maintenance for high-availability and elastic scaling.

Prerequisites
-------------

SQL Server 2014 on-premises or as a Windows Azure Virtual Machine

Storage Account and Container in Windows Azure

When using SQL Server Data Files in Windows Azure feature, you need to create a storage account and a container in Windows Azure, create a SQL Server credential, which includes information on the policy of the container as well as a Shared Access Signature that is necessary to access the container.

Getting Started
===============

Create a Storage Account
------------------------

To store files and data in the Blob, Table, Queue, and File services in Azure, you must create a storage account in the geographic region where you want to store the data.

For step by step instructions on how to create a Storage Account using the Windows Azure Management Portal see [http://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-account/](http://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-account/ "http://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-account/").

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_098AB395.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_69D9491B.png)

Create a Container
------------------

All storage blobs reside in a container.   To create a container:

Sign in to the [Management Portal](https://manage.windowsazure.com/).

Click Storage from the list of available options and select the Storage Account created in the previous steps.

Click CONTAINERS from the list of available options.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_5ED46A26.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_31BCECA7.png)

On the CONTAINERS dialog click + Add and specify the name for the new container.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_72F01760.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_356028E6.png) 

**NOTE**

Keep the default access level ‘Private’.

By default, the container is private and can be accessed only by the account owner. To allow public read access to the blobs in the container, but not the container properties and metadata, use the "Public Blob" option. To allow full public read access for the container and blobs, use the "Public Container" option.

The following steps assume that a Windows Azure Storage container has been created, and a policy has been created with read, write, list, rights. Creating a policy on a container generates a SAS key which is safe to keep unencrypted in memory and needed by SQL Server to access the blob files in the container.

Create a Credential
-------------------

Creating a credential creates a record that contains the authentication information that is required to connect to a resource outside SQL Server. (such as Azure Blob Store).  To create a credential for Azure Blob Store requires a Windows Azure Store Container and a policy to allow read, write, and list rights.  Creating a policy generates a SAS key which SQL Server uses to access the blobs in the container.

### Syntax

CREATE CRENDENTIAL \[Container Url\] -- Specifies the name of the credential being created, I.e. the Windows Azure Storage Container

WITH IDENTITY = ‘SHARED ACCESS SIGNATURE’ -- Specifies the name of the account to be used when connecting outside the server, I.e. when used with a Windows Azure Storage Container this value is always ‘SHARED ACCESS SIGNATURE’.  A Shared Access Signature is a URI that grants restricted access rights to containers, blobs, queues, and tables for a specific time interval (see example below).

For information on creating and using Shared Access Signatures see [http://msdn.microsoft.com/en-us/library/azure/jj721951.aspx](http://msdn.microsoft.com/en-us/library/azure/jj721951.aspx "http://msdn.microsoft.com/en-us/library/azure/jj721951.aspx").

SECRET = ‘Secret’ -- Specifies the secret required for outgoing authentication.   In this scenario the SECRET represents the Shared Access Signature associated with the policy created on the container (see example below).

#### Example

USE master  
CREATE CREDENTIAL \[https://sqlcloud.blob.core.windows.net/data\]  
WITH IDENTITY \= 'SHARED ACCESS SIGNATURE',  
SECRET \= 'sr=c&se=2014-08-25T18%3B34%3B29Z&sp=rwl&sig=wJripFB9nq%2FrwlARE11TYS1OccKpFrpn6y3QuRS%2Fv4o%3D'

To view the credential created in the steps above use:

SELECT \* FROM sys.credentials

The sys.credentials Security Catalog View returns one row for each stored credential which includes:

name = Name of the credential. Is unique in the server.

credential\_identity = Name of the identity to use.

create\_date = Time at which the credential was created.

modify\_date = Time at which the credential was last modified.

target\_type = Type of credential. Returns NULL for traditional credentials such as SHARED ACCESS SIGNATURE.

target\_id = ID of the object that the credential is mapped to. Returns 0 for traditional credentials.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_39036525.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_4DF256E7.png)

Create a Database
-----------------

Creating a database does not differ significantly from creating a database in a traditional on-premises SQL Server storage scenario using the CREATE DATABASE statement.

### Syntax

CREATE DATABASE \[Name\] -- Is the name of the new database.

ON ( NAME = \[Database Name\], FILENAME = \[Data File Path and File Name\] ) -- Specifies that the disk files used to store the data sections of the database, data files, are explicitly defined.

LOG ON ( Name = \[Log Name\], FILENAME = \[Log File Path and File Name\] ) Specifies that the disk files used to store the database log, log files, are explicitly defined.

#### Example

CREATE DATABASE WSS\_Content  
ON ( NAME \= WSS\_Content, FILENAME \= '[https://sqlcloud.blob.core.windows.net/data/WSS\_Content.mdf'](https://sqlcloud.blob.core.windows.net/data/WSS_Content.mdf') )  
LOG ON ( NAME \= WSS\_Content\_Log, FILENAME \= '[https://sqlcloud.blob.core.windows.net/data/WSS\_Content.ldf'](https://sqlcloud.blob.core.windows.net/data/WSS_Content.ldf') )

Validate Database Creation
--------------------------

To validate the database and related files were created successfully in the container select Connect in SQL Server Management Studio and choose Windows Azure from the list of available options.  Specify the name of the storage account associated with the container and provide the related access key to access the container.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_49A08175.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_21D7EAA7.png)

Add Database(s) to SharePoint
-----------------------------

To add the database use the Mount-SPContentDatabase cmdlet which attaches an existing content database to the farm.

### Syntax

Mount-SPContentDatabase

**\-Name** _Specifies the existing content database to attach to the farm._

**\-DatabaseServer** Specifies the name of the host server for the content database specified in the **Name** parameter.

**\-WebApplication** Attaches the content database to the specified SharePoint web application.

#### Example

Mount-SPContentDatabase “WSS\_Content” –DatabaseServer CP-SQ-01 –WebApplication [http://sharepoint.wbaer.com.co](http://sharepoint.wbaer.com.co)

Summary
=======

SQL Server Data Files in Windows Azure simplifies migration processes by moving one database at a time between machines on-premises as well as between on-premises and cloud environments without any application changes and provides near limitless storage without the overhead of managing storage.