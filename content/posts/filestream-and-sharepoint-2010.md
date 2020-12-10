---
title: 'FILESTREAM and SharePoint 2010'
date: Tue, 22 Feb 2011 18:33:30 +0000
draft: false
tags: ['Administration', 'FILESTREAM', 'Remote BLOB Storage', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

FILESTREAM is a new feature in SQL Server 2008 that enables the storage of unstructured data on a NTFS file system.  FILESTREAM (local or remote) is supported in SharePoint 2010 as one mechanism of reducing capital expenditures through enabling the storage of large binary unstructured data on content addressable or commodity storage.

**Unstructured Data**

Unstructured data refers to information that does not adhere to a defined model or does not fit well into relational tables in SharePoint unstructured data can refer to Microsoft Office document file formats, video, audio, and related file types.

**Structured Data**

Structured data in SharePoint refers to the metadata associated with its corresponding unstructured data or BLOB.  Relational databases are most often cited as examples of structured data.

**SQL Server and Unstructured Data Storage**

There are three (3) approaches to storing unstructured data with SQL Server, RBS, SQL BLOB, and FILESTREAM:

*   Remote BLOB Storage (RBS) in which SharePoint relies on a new layer in SQL Server to read or update BLOB data stored outside of the database on separate BLOB Stores (file system or dedicated BLOB stores)
*   SQL BLOB which refers to traditional BLOB storage with SharePoint, BLOB data is stored along side the structured metadata in the Content Database
*   FILESTREAM

**FILESTREAM Overview**

FILESTREAM is implemented on the varbinary(max) datatype instructing the database engine to store unstructured data on the file system through a FILESTREAM filegroup that contains file system directories instead of the files themselves also known as data containers.  Data containers are the interface between database engine storage and file system storage.  varbinary is the binary data type designation for binary large objects stored in SharePoint 2010 content databases and refers to variable-length binary data. (MAX) refers to a value that max indicates that the maximum storage size is 2^31-1 bytes or otherwise 2GB.  Remote BLOB Storage does not provide a mechanism to exceed to the 2GB file size limit imposed by SharePoint.

In SharePoint 2010 remote BLOB data is referenced by a unique identifier in content databases configured for RBS (see illustration).

[![FILESTREAM](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1185.FILESTREAM_thumb_193B66D4.png "FILESTREAM")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5086.FILESTREAM_44437AA6.png)

FILESTREAM offers several benefits as related to performance 1) FILESTREAM uses the NT system cache for caching file data reducing the effect that FILESTREAM data has on Database Engine performance and 2) the SQL Server buffer pool is not used; therefore, memory is available for query processing.

FILESTREAM provides optimum value in scenarios where SharePoint is used to storage large BLOB data such as video files that will benefit from FILESTREAM or BLOB data that exceeds 1MB.

**FILESTREAM and Business Continuity Management**

Database mirroring does not support FILESTREAM since a FILESTREAM filegroup cannot be created on the principal server and database mirroring cannot be configured for a database that contains FILESTREAM filegroups. If the FILESTREAM provider is used to store BLOB data locally (within the same content database) the database cannot be configured for database mirroring.

If the FILESTREAM provider is configured to store the BLOB data within a separate SQL database or when using a 3rd party BLOB store, the content database can be mirroring; however, database mirroring will apply only to the content database and not the BLOB data. The BLOB data needs to be handled separately and kept in sync with the associated metadata (content database). For FILESTREAM BLOB databases, this can be done through log shipping.

To learn about the differences between FILESTREAM and SQL Server Remote BLOB Store see also [http://blogs.msdn.com/b/sqlrbs/archive/2009/11/18/sql-server-remote-blob-store-and-filestream-feature-comparison.aspx](http://blogs.msdn.com/b/sqlrbs/archive/2009/11/18/sql-server-remote-blob-store-and-filestream-feature-comparison.aspx "http://blogs.msdn.com/b/sqlrbs/archive/2009/11/18/sql-server-remote-blob-store-and-filestream-feature-comparison.aspx").

The instructions that follow are designed to be used on a single-server deployment for demonstration purposes and implements the local FILESTREAM Provider.

**Enable FILESTREAM on the target SQL Server Instance**

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2008 R2**, point to **Configuration Tools**, and then click **SQL Server Configuration Manager**.
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

**Provision the RBS Data Store**

1.  Click **Start**, click **All Programs**, click **Microsoft SQL Server 2008**, and then click **SQL Server Management Studio**.
2.  Expand **Databases**.
3.  Select the content database for which you want to create a BLOB store, and then click **New Query**.
4.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
5.  In Query Editor, enter the following Transact-SQL code:

> use \[Database Name\]
> 
> if not exists (select \* from sys.symmetric\_keys where name = N'##MS\_DatabaseMasterKey##')create master key encryption by password = N'Admin Key Password !2#4'

> In Query Editor, enter the following Transact-SQL code:

> use \[Database Name\]
> 
> if not exists (select groupname from sysfilegroups where groupname=N'RBSFilestreamProvider')alter database \[Database Name\] add filegroup RBSFilestreamProvider contains filestream

> In Query Editor, enter the following Transact-SQL code:

> use \[Database Name\]
> 
> alter database \[Database Name\] add file (name = RBSFilestreamFile, filename = 'c:BlobStore') to filegroup RBSFilestreamProvider

**Install the Microsoft SQL Server 2008 R2 Remote Blob Store**

Download the x64 package for the Microsoft SQL Server 2008 R2 Remote Blob Store from the Microsoft SQL Server 2008 R2 Feature Pack at [http://www.microsoft.com/downloads/en/details.aspx?FamilyID=ceb4346f-657f-4d28-83f5-aae0c5c83d52&displaylang=en](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=ceb4346f-657f-4d28-83f5-aae0c5c83d52&displaylang=en).

Open a Command Prompt with Administrator permissions and execute the following command to install RBS.MSI downloaded in the previous step:

> msiexec /qn /lvx\* rbs\_install\_log.txt /i RBS.msi TRUSTSERVERCERTIFICATE=true FILEGROUP=PRIMARY DBNAME="<Database Name>" DBINSTANCE="<Instance Name>" FILESTREAMFILEGROUP=RBSFilestreamProvider FILESTREAMSTORENAME=FilestreamProvider\_1

**NOTE**

Specify the full path to RBS.MSI in the above state, i.e. C:UsersAdministratorDesktopRBS.MSI. Replace the values for DBNAME and DBINSTANCE to match your environment.

**Enable Remote BLOB Storage**

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2010 Products**.
3.  Click **SharePoint 2010 Management Shell**.
4.  In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statement to set the content database to be configured:

> $database=Get-SPContentDatabase –Identity “Database Name”

> In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statement to gets the object that holds settings that determine how the content database uses Microsoft SQL Server Remote Blob Storage:

> $rbs=$database.RemoteBlobStorageSettings

> In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statement to determine if RBS has been installed for the selected content database:

> $rbs.Installed()

**NOTE**

The result of $rbs.Installed() should be True, if the result is False, verify RBS.MSI has been installed successfully by reviewing rbs\_install\_log.txt. Ensure the install statement was running In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statement to enable RBS for the selected content database:

> $rbs.Enable()

> In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statements to set the RBSprovider for the selected content database:

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

Table 1

_Appendix for Table 1_

**Enabled** specifies whether or not RBS has been enabled for the selected content database.

**ActiveProviderName** is name of the SQL Remote Blob Storage provider new files will be stored in. This will be null if new files will not be stored using SQL Remote Blob storage.

**MinimumBlobStorageSize** refers to the minimum size a BLOB may be to be considered RBS storage worthy, BLOB data exceeding the specified MinimumBlobStorageSize will be stored in the RBS data store.

FILESTREAM performance data shows BLOB data exceeding 1MB provides the most efficient streaming performance.   See also [http://msdn.microsoft.com/en-us/library/cc949109(SQL.100).aspx](http://msdn.microsoft.com/en-us/library/cc949109(SQL.100).aspx "http://msdn.microsoft.com/en-us/library/cc949109(SQL.100).aspx").

[![FILESTREAM Performance](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2262.FILESTREAM-Performance_thumb_11AFF767.png "FILESTREAM Performance")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5383.FILESTREAM-Performance_1FEE7057.png)

To configure the MinimumBlobStorageSize:

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2010 Products**.
3.  Click **SharePoint 2010 Management Shell**.
4.  In the SharePoint 2010 Management Shell, enter the following Windows PowerShell statements to configure the MinimumBlobStorageSize at 1MB:

> $database = Get-SPContentDatabase “Database Name”
> 
> $database.RemoteBlobStorageSettings.MinimumBlobStorageSize=1048576
> 
> $database.Update()

**UpgradePersistedProperties** specifies the collection of field names and values for fields that were deleted or changed.

**Validate Installation**

To validate the FILESTREAM configuration and RBS installation:

1.  Click **Start**, click **All Programs**, click **Microsoft SQL Server 2008**, and then click **SQL Server Management Studio**.
2.  Expand **Databases**.
3.  Select the content database for which you want to create a BLOB store, and then click **New Query**.
4.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
5.  In Query Editor, enter the following Transact-SQL code:

> USE \[Database Name\]
> 
> SELECT \* FROM dbo.DatabaseInformation

Confirm that both the RBSCollectionId and RBSProvider rows are available.

**Test the RBS Data Store**

1.  Select a desired Document Library on a site in the configured content database.
2.  Upload a file that is greater than 1 MB.
3.  On the computer that contains the RBS data store, click **Start**, and then click **Computer**.
4.  Browse to the RBS data store directory.
5.  Browse to the file list and open the folder that has the most recent modified date (other than $FSLOG). In that folder, open the file that has the most recent modified date. Verify that this file has the same size and contents as the file that you uploaded. If it does not, ensure that RBS is installed and enabled correctly.

The data store directory structure will appear similar to that in the following diagram.

[![FILESTREAM](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6153.FILESTREAM_thumb_3811DAB2.png "FILESTREAM")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5822.FILESTREAM_186300EA.png)

**NOTE**

In the event error "The URL '<Document Library>/File' is invalid.  It may refer to a nonexistent file or folder, or refer to a valid file or folder that is not in the current Web.” is displayed when uploading documents greater than the configured MinimumBlobStorageSize open SQL Server Configuration Manager and enable Enable FILESTREAM for file I/O streaming access and restart the SQL Server (MSSQLSERVER) service.

**Additional Resources**

*   [Overview of Remote BLOB Storage (SharePoint Foundation 2010](http://technet.microsoft.com/en-us/library/ee748607.aspx)[)](http://technet.microsoft.com/en-us/library/ee748607.aspx)
*   [Plan for remote BLOB storage (RBS) (SharePoint Foundation 2010](http://technet.microsoft.com/en-us/library/ff628569.aspx)[)](http://technet.microsoft.com/en-us/library/ff628569.aspx)
*   [FILESTREAM](http://go.microsoft.com/fwlink/?LinkID=166020&clcid=0x409) [Overview](http://go.microsoft.com/fwlink/?LinkID=166020&clcid=0x409)
*   [How to: Enable](http://msdn.microsoft.com/en-us/library/cc645923.aspx) [FILESTREAM](http://msdn.microsoft.com/en-us/library/cc645923.aspx)
*   Install [and configure Remote BLOB Storage (RBS) with the FILESTREAM provider(SharePoint Foundation 2010](http://technet.microsoft.com/en-us/library/ee663474.aspx)[)](http://technet.microsoft.com/en-us/library/ee663474.aspx)
*   [Install](http://technet.microsoft.com/en-us/library/ff628969.aspx) [and configure Remote BLOB Storage (RBS) without the FILESTREAM provider (SharePoint Foundation 2010](http://technet.microsoft.com/en-us/library/ff628969.aspx)[)](http://technet.microsoft.com/en-us/library/ff628969.aspx)
*   [Set a content database to use Remote BLOB Storage (RBS) (SharePoint Foundation 2010](http://technet.microsoft.com/en-us/library/ee748605.aspx)[)](http://technet.microsoft.com/en-us/library/ee748605.aspx)
*   [Migrate content into or out of Remote BLOB Storage (RBS) (SharePoint Foundation 2010](http://technet.microsoft.com/en-us/library/ff628255.aspx)[)](http://technet.microsoft.com/en-us/library/ff628255.aspx)
*   [Disable Remote BLOB Storage (RBS) on a content database (SharePoint Foundation 2010)](http://technet.microsoft.com/en-us/library/ff628257.aspx)
*   [Overview of Remote BLOB Storage (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ee748649.aspx)
*   [Plan for Remote BLOB Storage (RBS) (SharePoint Server 2010](http://technet.microsoft.com/en-us/library/ff628583.aspx)[)](http://technet.microsoft.com/en-us/library/ff628583.aspx)
*   [Install and configure Remote BLOB Storage (RBS) with the FILESTREAM provider (SharePoint Server 2010](http://technet.microsoft.com/en-us/library/ee748631.aspx)[)](http://technet.microsoft.com/en-us/library/ee748631.aspx)
*   [Install and configure Remote BLOB Storage (RBS) without the FILESTREAM provider (SharePoint Server 2010](http://technet.microsoft.com/en-us/library/ff629463.aspx)[)](http://technet.microsoft.com/en-us/library/ff629463.aspx)
*   [Set a content database to use Remote BLOB Storage (RBS) (SharePoint Server 2010](http://technet.microsoft.com/en-us/library/ee748641.aspx)[)](http://technet.microsoft.com/en-us/library/ee748641.aspx)
*   [Migrate content into or out of Remote BLOB Storage (RBS) (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff628254.aspx)
*   [Maintain Remote BLOB Storage (RBS) (SharePoint Server 2010](http://technet.microsoft.com/en-us/library/ff943565.aspx)[)](http://technet.microsoft.com/en-us/library/ff943565.aspx)
*   [Disable Remote BLOB Storage (RBS) on a content database (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff628259.aspx)
*   [Remote BLOB Storage (SQL Server White Paper)](http://download.microsoft.com/download/9/5/2/9521D8DA-5D3C-4817-BB9D-B5B1BD293365/SQL_Server_2008_R2_Remote_Blob_Storage.docx)
*   [Managing Unstructured Data with SQL Server 2008](http://download.microsoft.com/download/a/c/d/acd8e043-d69b-4f09-bc9e-4168b65aaa71/SQL2008UnstructuredData.doc)