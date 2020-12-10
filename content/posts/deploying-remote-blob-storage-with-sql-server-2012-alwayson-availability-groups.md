---
title: 'Deploying Remote BLOB Storage with SQL Server 2012 AlwaysOn Availability Groups'
date: Thu, 23 May 2013 19:24:10 +0000
draft: false
tags: ['Administration', 'AlwaysOn', 'Remote BLOB Storage', 'SharePoint', 'SharePoint Server 2013']
---

AlwaysOn Availability Groups can provide a high-availability and disaster recovery solution for SQL Server Remote Blob Store (RBS) BLOB objects (blobs).  AlwaysOn Availability Groups protects any RBS metadata and schemas stored in an availability database by replicating them to the secondary replicas.

AlwaysOn Availability Groups Overview
=====================================

The AlwaysOn Availability Groups feature is a high-availability and disaster-recovery solution that provides an enterprise-level alternative to database mirroring. Introduced in SQL Server 2012, AlwaysOn Availability Groups maximizes the availability of a set of user databases for an enterprise. An availability group supports a failover environment for a discrete set of user databases, known as availability databases, that fail over together. An availability group supports a set of read-write primary databases and one to four sets of corresponding secondary databases. Optionally, secondary databases can be made available for read-only access and/or some backup operations.

An availability group fails over at the level of an availability replica. Failovers are not caused by database issues such as a database becoming suspect due to a loss of a data file, deletion of a database, or corruption of a transaction log.

See also [AlwaysOn Availability Groups (SQL Server)](http://msdn.microsoft.com/en-us/library/hh510230.aspx).

Remote BLOB Store Overview
==========================

SQL Server Remote BLOB Store (RBS) is an optional add-on component that lets database administrators store binary large objects in commodity storage solutions instead of directly on the main database server.

**Unstructured Data**

Unstructured data refers to information that does not adhere to a defined model or does not fit well into relational tables in SharePoint unstructured data can refer to Microsoft Office document file formats, video, audio, and related file types.

**Structured Data**

Structured data in SharePoint refers to the metadata associated with its corresponding unstructured data or BLOB.  Relational databases are most often cited as examples of structured data.

**SQL Server and Unstructured Data Storage**

There are three (3) approaches to storing unstructured data with SQL Server, RBS, SQL BLOB, and FILESTREAM:

*   Remote BLOB Storage (RBS) in which SharePoint relies on a new layer in SQL Server to read or update BLOB data stored outside of the database on separate BLOB Stores (file system or dedicated BLOB stores)
*   SQL BLOB which refers to traditional BLOB storage with SharePoint, BLOB data is stored along side the structured metadata in the Content Database
*   FILESTREAM

See also [Remote BLOB Store](http://msdn.microsoft.com/en-us/library/gg316768(v=sql.105).aspx).

FILESTREAM Overview
-------------------

FILESTREAM is implemented on the varbinary(max) datatype instructing the database engine to store unstructured data on the file system through a FILESTREAM filegroup that contains file system directories instead of the files themselves also known as data containers.  Data containers are the interface between database engine storage and file system storage.  varbinary is the binary data type designation for binary large objects stored in SharePoint 2010 content databases and refers to variable-length binary data. (MAX) refers to a value that max indicates that the maximum storage size is 2^31-1 bytes or otherwise 2GB.  Remote BLOB Storage does not provide a mechanism to exceed to the 2GB file size limit imposed by SharePoint.

In SharePoint 2013 remote BLOB data is referenced by a unique identifier in content databases configured for RBS (see illustration).

[![Drawing1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0871.Drawing1_thumb_09523D3F.png "Drawing1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6735.Drawing1_29D97CF1.png)

FILESTREAM offers several benefits as related to performance 1) FILESTREAM uses the NT system cache for caching file data reducing the effect that FILESTREAM data has on Database Engine performance and 2) the SQL Server buffer pool is not used; therefore, memory is available for query processing.

FILESTREAM provides optimum value in scenarios where SharePoint is used to storage large BLOB data such as video files that will benefit from FILESTREAM or BLOB data that exceeds 1MB.

High Availability Considerations
================================

AlwaysOn Availability Group Protection
--------------------------------------

The protection for RBS BLOB data depends on the BLOB Store Location:

BLOB Store Location

Protected

same database that contains the RBS metadata

Yes

Another database in the same instance of SQL Server

Yes

Another database in a different instance of SQL Server

Yes

third-party BLOB store

To protect this BLOB data, use the high-availability mechanisms of the BLOB store provider.

Database Mirroring Protection
-----------------------------

Database mirroring does not support FILESTREAM since a FILESTREAM filegroup cannot be created on the principal server and database mirroring cannot be configured for a database that contains FILESTREAM filegroups. If the FILESTREAM provider is used to store BLOB data locally (within the same content database) the database cannot be configured for database mirroring.

If the FILESTREAM provider is configured to store the BLOB data within a separate SQL database or when using a 3rd party BLOB store, the content database can be mirroring; however, database mirroring will apply only to the content database and not the BLOB data. The BLOB data needs to be handled separately and kept in sync with the associated metadata (content database). For FILESTREAM BLOB databases, this can be done through log shipping.

To learn about the differences between FILESTREAM and SQL Server Remote BLOB Store see also [http://blogs.msdn.com/b/sqlrbs/archive/2009/11/18/sql-server-remote-blob-store-and-filestream-feature-comparison.aspx](http://blogs.msdn.com/b/sqlrbs/archive/2009/11/18/sql-server-remote-blob-store-and-filestream-feature-comparison.aspx).

Step 1 Failover Availability Group(s) to the Secondary Replica
==============================================================

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  On the Connect to Server dialog, enter the name of the Availability Group Listener and click **Connect**.
3.  In **SQL Server Management Studio**, expand **AlwaysOn High Availability**, and then expand **Availability Groups**.
4.  Right-click the desired **Availability Group** and select **Failover…** from the list of available options.
5.  On the Failover Availability Group: <Availability Group> dialog click **Next >**.
6.  On the Failover Availability Group: <Availability Group> dialog select or accept the Secondary Replica and click **Next >**.
7.  On the Failover Availability Group: <Availability Group> dialog click **Connect…** to connect to the Secondary Replica and click **Next >**.
8.  On the Failover Availability Group: <Availability Group> dialog click **Finish** to initiate manual failover of the Availability Group.

See also [Planned Manual Failover (Without Data Loss)](http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover) \[[http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover](http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover "http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover")\] under [Failover and Failover Modes (AlwaysOn Availability Groups)](http://msdn.microsoft.com/en-us/library/hh213151.aspx).

Step 1.1 Enable FILESTREAM on the Primary Replica
-------------------------------------------------

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, point to **Configuration Tools**, and then click **SQL Server Configuration Manager**.
2.  In the list of services, right-click **SQL Server Services**, and then click **Open**.
3.  In the **SQL Server Configuration Manager** snap-in, locate the instance of SQL Server on which you want to enable FILESTREAM.
4.  Right-click the instance and then click **Properties**.
5.  In the **SQL Server Properties** dialog box, click the **FILESTREAM** tab.
6.  Select the **Enable FILESTREAM for Transact-SQL access** check box.
7.  If you want to read and write FILESTREAM data from Windows, click **Enable FILESTREAM for file I/O streaming access**. Enter the name of the Windows share in the **Windows Share Name** box.
8.  If remote clients must access the FILESTREAM data that is stored on this share, select **Allow remote clients to have streaming access to FILESTREAM data**.
9.  Click **Apply**.
10.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
11.  In Query Editor, enter the following Transact-SQL code:

> EXEC sp\_configure filestream\_access\_level, 2
> 
> In Query Editor, enter the following Transact-SQL code:
> 
> RECONFIGURE

Step 2 Failover the Availability Group(s) to the Primary Replica
================================================================

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  On the Connect to Server dialog, enter the name of the Availability Group Listener and click **Connect**.
3.  In **SQL Server Management Studio**, expand **AlwaysOn High Availability**, and then expand **Availability Groups**.
4.  Right-click the desired **Availability Group** and select **Failover…** from the list of available options.
5.  On the Failover Availability Group: <Availability Group> dialog click **Next >**.
6.  On the Failover Availability Group: <Availability Group> dialog select or accept the Secondary Replica and click **Next >**.
7.  On the Failover Availability Group: <Availability Group> dialog click **Connect…** to connect to the Secondary Replica and click **Next >**.
8.  On the Failover Availability Group: <Availability Group> dialog click **Finish** to initiate manual failover of the Availability Group.

See also [Planned Manual Failover (Without Data Loss)](http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover) \[[http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover](http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover "http://msdn.microsoft.com/en-us/library/hh213151.aspx#ManualFailover")\] under [Failover and Failover Modes (AlwaysOn Availability Groups)](http://msdn.microsoft.com/en-us/library/hh213151.aspx).

Step 2.1 Enable FILESTREAM on the Secondary Replica
---------------------------------------------------

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, point to **Configuration Tools**, and then click **SQL Server Configuration Manager**.
2.  In the list of services, right-click **SQL Server Services**, and then click **Open**.
3.  In the **SQL Server Configuration Manager** snap-in, locate the instance of SQL Server on which you want to enable FILESTREAM.
4.  Right-click the instance and then click **Properties**.
5.  In the **SQL Server Properties** dialog box, click the **FILESTREAM** tab.
6.  Select the **Enable FILESTREAM for Transact-SQL access** check box.
7.  If you want to read and write FILESTREAM data from Windows, click **Enable FILESTREAM for file I/O streaming access**. Enter the name of the Windows share in the **Windows Share Name** box.
8.  If remote clients must access the FILESTREAM data that is stored on this share, select **Allow remote clients to have streaming access to FILESTREAM data**.
9.  Click **Apply**.
10.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
11.  In Query Editor, enter the following Transact-SQL code:

> EXEC sp\_configure filestream\_access\_level, 2
> 
> In Query Editor, enter the following Transact-SQL code:
> 
> RECONFIGURE

Step 3 Provision the RBS Data Store
===================================

  1.  Click **Start**, click **All Programs**, click **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  On the Connect to Server dialog, enter the name of the Availability Group Listener and click **Connect**.
3.  Expand **Databases**.
4.  Select the content database for which you want to create a BLOB store, and then click **New Query**.
5.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
6.  In Query Editor, enter the following Transact-SQL code:

> USE \[Database Name\]
> 
> IF not exists (SELECT \* FROM sys.symmetric\_keys WHERE name \= N'##MS\_DatabaseMasterKey##')create master key encryption by password \= N'Admin Key Password !2#4'

> In Query Editor, enter the following Transact-SQL code:

> USE \[Database Name\]
> 
> IF not exists (SELECT groupname FROM sysfilegroups WHERE groupname=N'RBSFilestreamProvider')alter database \[Database Name\] add filegroup RBSFilestreamProvider contains filestream

> In Query Editor, enter the following Transact-SQL code:

> USE \[Database Name\]
> 
> alter database \[Database Name\] add file (name = RBSFilestreamFile, filename \= 'c:BlobStore') to filegroup RBSFilestreamProvider
> 
> **NOTE**
> 
> The Blob Store directory will be provisioned on both the Primary and Secondary Replicas.

Step 4 Install the Microsoft SQL Server 2008 R2 Remote Blob Store
=================================================================

Download the x64 package for the Microsoft SQL Server 2012 Remote Blob Store from [http://www.microsoft.com/downloads/en/details.aspx?FamilyID=ceb4346f-657f-4d28-83f5-aae0c5c83d52&displaylang=en](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=ceb4346f-657f-4d28-83f5-aae0c5c83d52&displaylang=en).

Open a Command Prompt with Administrator permissions and execute the following command to install RBS.MSI downloaded in the previous step:

> msiexec /qn /lvx\* rbs\_install\_log.txt /i RBS.msi TRUSTSERVERCERTIFICATE=true FILEGROUP=PRIMARY DBNAME="<Database Name>" DBINSTANCE="<Instance Name>" FILESTREAMFILEGROUP=RBSFilestreamProvider FILESTREAMSTORENAME=FilestreamProvider\_1

**NOTE**

Specify the full path to RBS.MSI in the above state, i.e. C:UsersAdministratorDesktopRBS.MSI. Replace the values for DBNAME and DBINSTANCE to match your environment.

On additional Web/Application servers open a Command Prompt with Administrator permissions and execute the following command to install RBS.MSI downloaded in the previous step:

Step 5 Enable Remote BLOB Storage
=================================

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statement to set the content database to be configured:

> $database=Get-SPContentDatabase –Identity “Database Name”

> In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to gets the object that holds settings that determine how the content database uses Microsoft SQL Server Remote Blob Storage:

> $rbs=$database.RemoteBlobStorageSettings

> In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to determine if RBS has been installed for the selected content database:

> $rbs.Installed()

**NOTE**

The result of $rbs.Installed() should be True, if the result is False, verify RBS.MSI has been installed successfully by reviewing rbs\_install\_log.txt. Ensure the install statement was running In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statement to enable RBS for the selected content database:

> $rbs.Enable()

> In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statements to set the RBSprovider for the selected content database:

> $rbs.SetActiveProviderName($rbs.GetProviderNames()\[0\])
> 
> $rbs

**NOTE**

The result of $rbs should be:

Enabled

ActiveProviderName

MinimumBlobStorageSize

UpgradePersistedProperties

True

FileStreamProvider

0

()

_Appendix for Table 1_

**Enabled** specifies whether or not RBS has been enabled for the selected content database.

**ActiveProviderName** is name of the SQL Remote Blob Storage provider new files will be stored in. This will be null if new files will not be stored using SQL Remote Blob storage.

**MinimumBlobStorageSize** refers to the minimum size a BLOB may be to be considered RBS storage worthy, BLOB data exceeding the specified MinimumBlobStorageSize will be stored in the RBS data store.

Step 5.1 Configure the MinimumBlobStorageSize
---------------------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statements to configure the MinimumBlobStorageSize at 1MB:

> $database = Get-SPContentDatabase “Database Name”
> 
> $database.RemoteBlobStorageSettings.MinimumBlobStorageSize=1048576
> 
> $database.Update()

**UpgradePersistedProperties** specifies the collection of field names and values for fields that were deleted or changed.

Step 6 Validate Installation
============================

To validate the FILESTREAM configuration and RBS installation:

1.  Click **Start**, click **All Programs**, click **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  Expand **Databases**.
3.  Select the content database for which you want to create a BLOB store, and then click **New Query**.
4.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
5.  In Query Editor, enter the following Transact-SQL code:

> USE \[Database Name\]
> 
> SELECT \* FROM dbo.DatabaseInformation

Confirm that both the RBSCollectionId and RBSProvider rows are available.

Step 7 Test the RBS Data Store
==============================

1.  Select a desired Document Library on a site in the configured content database.
2.  Upload a file that is greater than 1 MB.
3.  On the computer that contains the RBS data store, click **Start**, and then click **Computer**.
4.  Browse to the RBS data store directory.
5.  Browse to the file list and open the folder that has the most recent modified date (other than $FSLOG). In that folder, open the file that has the most recent modified date. Verify that this file has the same size and contents as the file that you uploaded. If it does not, ensure that RBS is installed and enabled correctly.

The data store directory structure will appear similar to that in the following diagram.

[![Drawing1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7356.Drawing1_thumb_61ABC114.png "Drawing1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1882.Drawing1_41FCE74C.png)

Resources
=========

[FILESTREAM Overview](http://go.microsoft.com/fwlink/?LinkID=166020&clcid=0x409)

[How to: Enable FILESTREAM](http://msdn.microsoft.com/en-us/library/cc645923.aspx)

[AlwaysOn Availability Groups (SQL Server)](http://msdn.microsoft.com/en-us/library/hh510230.aspx)

[Remote BLOB Storage (SQL Server Whitepaper)](http://download.microsoft.com/download/9/5/2/9521D8DA-5D3C-4817-BB9D-B5B1BD293365/SQL_Server_2008_R2_Remote_Blob_Storage.docx)

[Microsoft SQL Server AlwaysOn Solutions Guide for High Availability and Disaster Recovery](http://msdn.microsoft.com/en-us/library/hh781257.aspx)

[SQL Server 2012 High Availability](http://www.microsoft.com/en-in/sqlserver/future-editions/mission-critical/SQL-Server-2012-high-availability.aspx)