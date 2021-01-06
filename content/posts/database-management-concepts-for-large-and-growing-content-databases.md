---
title: 'Database Management Concepts for Large and Growing Content Databases'
date: Tue, 08 May 2007 08:39:00 +0000
draft: false
tags: ['Capacity Planning']
---

With the introduction of **Windows SharePoint Services 3.0** and **Microsoft Office SharePoint Server 2007** the desire to reduce the number of content databases supporting a Web application has become a growing requirement to leverage both technologies such as SQL Server 2005 Database Mirroring, log shipping, and reduce the operational requirements to manage a high-volume of content databases.

As a general rule, reducing the number of content databases will most often result in overall larger content databases hosting more site collections.  Before considering redesigning your database architecture or reconsidering your current design, it is important to understand the method by which a content database is created, hosted, and exists on the SQL database server. 

The instructions provided in this post detail the administration of content databases using the **SharePoint** 3.0 Central Administration user interface, **SharePoint** administration tool (STSADM), and SQL Server Management Studio (SQL Server 2005).  Transact-SQL statements are not provided and direct manipulation of any **SharePoint Products & Technologies** databases is **not** recommended.

**Creating Content Databases**

A content database can be created through the **SharePoint** 3.0 Central Administration user interface or optionally through the **SharePoint** administration tool (STSADM).  When a content database is created, the location of the data and log file is determined by the default database settings established on the SQL database server.  A content database is created with a PRIMARY filegroup hosting one (1) data file (.mdf) and one (1) transaction log (.ldf). 

A data file can have either a .mdf or .ndf extension and serves as the physical storage for all of the data on the disk.  Pages are read into the buffer cache when a data request is made for read/write purposes.  After the data has been written to in the buffer cache, it is then written to the data file.

The transaction log can have the .ldf extension and records the modifications that have occurred in the content database as well as the initiating transactions.  The information that was stored in memory within the log cache is committed to the transaction log.

> **Creating Content Databases using the SharePoint 3.0 Central Administration User Interface**
> 
> To create a content database using the **SharePoint** 3.0 Central Administration user interface click Start, All Programs, Microsoft Office Server, and the click SharePoint 3.0 Central Administration from a web front-end computer.
> 
> Click the Application Management tab and select Content databases under SharePoint Web Application Management.
> 
> Select the Web application that the new content database will be assigned and click Add a content database.
> 
> From the Add Content Database user interface, specify the database name, authentication, search, and capacity settings and click OK to commit the changes.
> 
> Database capacity settings can be determined by deciding the maximum desired size of the content database / the maximum desired/permissible site quota template for the Web application.  So a maximum content database size of 450 GB / a maximum possible quota of 5 GB = 90 site collections per content database, the site warning level is typically set to a percentage of the maximum number of site collections, in this case the result would be 81  using 10% of 90 maximum site collections.
> 
> **Creating Content Databases using the SharePoint Administration Tool**
> 
> To create a content database using STSADM open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
> 
> From the command prompt run the following operation:
> 
> `STSADM -o addcontentdb -url http://<webapplication> -databasename <contentdatabasename>` where -url specifies the Web application to which the content databases will be assigned and `-databasename` specifies the name of content database to be created.  If your database server is on a separate server you will need to use the `-databaseserver` parameter to specify the database server name.  Other parameters available to the `addcontentdb` operation include:
> 
> `-databaseuser` (specifies the username used to connect to the database server \*where Windows authentication is not used)
> 
> `-databasepassword` (specifies the password associated with the username used to connect to the database server \*where Windows authentication is not used)
> 
> `-sitewarning` (specifies the number of sites before a warning event is generated)
> 
> `-sitemax` (specifies the maximum number of site collections this content database can host)
> 
> When using STSADM to create a content database you will need to run the `spsearch` operation to associate a content database with a specific server that is running the **Windows SharePoint Services** search service. 
> 
> To associate a content database with a specific server that is running the **Windows SharePoint Services** search service open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
> 
> From the command prompt run the following operation:
> 
> `STSADM -o spsearch -action attachcontentdatabase -databaseserver <contentdatabaseservername> -databasename <contentdatabasename> -searchserver <searchserver>`

**Removing Content Databases**

By detaching the content database through **SharePoint 3.0** Central Administration user interface or optionally through STSADM a content database can be made unavailable to **SharePoint Products and Technologies** for purposes of administration, maintenance, and/or archival.

> **Detaching a Content Database using the SharePoint 3.0 Central Administration User Interface**
> 
> To detach a content database using the **SharePoint 3.0** Central Administration user interface click Start, All Programs, Microsoft Office Server, and the click SharePoint 3.0 Central Administration from a web front-end computer.
> 
> Click the Application Management tab and select Content databases under SharePoint Web Application Management.
> 
> Select the Web application from which the content database will be removed.
> 
> Click the Database Name of the content database to be detached from the Web application.
> 
> Select the checkbox labeled Remove content database and click **OK** to commit the change.
> 
> **Detaching a Content Database using the SharePoint Administration Tool**
> 
> To detach a content database using STSADM open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
> 
> From the command prompt run the following operation:
> 
> `STSADM -o deletecontentdb -url http://<webapplication> -databasename <contentdatabasename>` where `-url` specifies the Web application from which the content databases will be detached and `-databasename` specifies the name of content database to be detached. If your database server is on a separate server you will need to use the `-databaseserver` parameter to specify the database server name.

Following the completion of any maintenance operations where the content database was detached, you will need to use the **SharePoint** 3.0 Central Administration user interface or optionally, STSADM to reattach the content database and associate it with a specific server that is running the **Windows SharePoint Services** search service.  (See **Moving and Renaming Content Databases** below.)

**NOTE** When moving a content database from one server farm to another, the `preparetomove` operation should be run against each content database before it is detached from the server farm to prevent synchronization errors when introduced to the destination server farm.  For information about `preparetomove` parameters run `STSADM -help preparetomove` from %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.

**Moving and Renaming Content Databases**

A content database can optionally be moved across SQL database server where required to support storage limitations, capacity planning, access performance improvements on an alternate SQL database server, rename the database, or for general server maintenance operations. Moving a content database requires the content database be detached from the SQL database server and **Windows SharePoint Services**/**Microsoft Office SharePoint Server 2007** before the content database can be moved. Moving a content database can include moving either the data file(s), transaction log(s), or all files simultaneously. When moving a content database in **Microsoft Office SharePoint Server 2007**, you should always run the STSADM operation, `preparetomove` to avoid synchronization errors when reattached to the Web application. (See **Detaching a Content Database using the SharePoint Administration Tool**)

> **Detaching a Content Database using the SharePoint Administration Tool**
> 
> To detach a content database using STSADM open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
> 
> From the command prompt run the following operation:
> 
> `STSADM -o deletecontentdb -url http:// -databasename` where `-url` specifies the Web application from which the content databases will be detached and `-databasename` specifies the name of content database to be detached.  
> If your database server is on a separate server you will need to use the `-databaseserver` parameter to specify the database server name.
> 
> **Detaching a Content Database (SQL Server 2005)**
> 
> **NOTE** When detaching a content database from a SQL database server, it is recommended to first detach the content database from the Web application in **Windows SharePoint Services 3.0**/**Microsoft Office SharePoint Server 2007**.
> 
> 1.  Connect to the server instance in SQL Server 2005 Management and expand the Databases node.
> 2.  Right-click the content database to be detached, select Tasks, and then select Detach from the context menu.
> 
> **NOTE** Active connections must be closed before the content database can be attached; to avoid interrupting user requests or closing pending requests resulting in possible data loss, content databases should only be detached during a maintenance window or when users are not actively accessing its data.
> 
> To close active connections, select the Drop Connections checkbox from the Detach Database user interface and click OK to commit the changes.
> 
> **Renaming a Content Database (SQL Server 2005)**
> 
> **NOTE** To rename a content database it must first be detached from the Web application in **Windows SharePoint Services 3.0**/**Microsoft Office SharePoint Server 2007**.
> 
> 1.  Connect to the server instance in SQL Server 2005 Management and expand the Databases node.
> 2.  Right-click the content database and select Properties from the context menu.
> 3.  Click Options under Select a page in the Database Properties user interface.
> 4.  In the Restrict Access field, select SINGLE\_USER, and then click OK to commit the changes.
> 5.  After the content database access has been set to SINGLE\_USER, right-click the content database and select Rename from the context menu.
> 6.  Enter a new name for the content database and press Enter to commit the change.
> 7.  Right-click the content database and select Properties from the context menu.
> 8.  Click Options under Select a page in the Database Properties user interface.
> 9.  In the Restrict Access field, select MULTI\_USER, and then click OK to commit the changes.
> 
> After the content database has been renamed it will need to be reattached to the Web application in **Windows SharePoint Services 3.0**/**Microsoft Office SharePoint Server 2007**.  The data file(s) and transaction log(s) can optionally be renamed while the content database is detached from the SQL database server on the file system, for more information on renaming data file(s) and transaction log(s) see [http://msdn2.microsoft.com/en-us/library/ms174269.aspx](http://msdn2.microsoft.com/en-us/library/ms174269.aspx "http://msdn2.microsoft.com/en-us/library/ms174269.aspx").
> 
> **Reattaching Content Databases using the SharePoint 3.0 Central Administration User Interface**
> 
> To attach a content database using the **SharePoint** 3.0 Central Administration user interface click Start, All Programs, Microsoft Office Server, and the click SharePoint 3.0 Central Administration from a web front-end computer.
> 
> Click the Application Management tab and select Content databases under SharePoint Web Application Management.
> 
> Select the Web application that the new content database will be assigned and click Add a content database.
> 
> From the Add Content Database user interface, specify the database name, authentication, search, and capacity settings and click OK to commit the changes.
> 
> **Reattaching Content Databases using the SharePoint Administration Tool**
> 
> To reattach a content database using STSADM open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
> 
> From the command prompt run the following operation:
> 
> `STSADM -o addcontentdb -url http://<webapplication> -databasename <contentdatabasename>` where -url specifies the Web application to which the content databases will be assigned and `-databasename` specifies the name of content database to be assigned.  If your database server is on a separate server you will need to use the `-databaseserver` parameter to specify the database server name.  Other parameters available to the `addcontentdb` operation include:
> 
> `-databaseuser` (specifies the username used to connect to the database server \*where Windows authentication is not used)
> 
> `-databasepassword` (specifies the password associated with the username used to connect to the database server \*where Windows authentication is not used)
> 
> `-sitewarning` (specifies the number of sites before a warning event is generated)
> 
> `-sitemax` (specifies the maximum number of site collections this content database can host)
> 
> When using STSADM to reattach a content database you will need to run the `spsearch` operation to associate a content database with a specific server that is running the **Windows SharePoint Services** search service. 
> 
> To associate a content database with a specific server that is running the **Windows SharePoint Services** search service open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
> 
> From the command prompt run the following operation:
> 
> `STSADM -o spsearch -action attachcontentdatabase -databaseserver <contentdatabaseservername> -databasename <contentdatabasename> -searchserver <searchserver>`

**Deleting Content Databases**

To delete the content database and physical files associated with a content database you must delete the database from the SQL database server.

1.  Connect to the server instance in SQL Server 2005 Management and expand the Databases node.
2.  Right-click the content database and select Delete from the context menu.

**NOTE** Active connections must be closed before the content database can be deleted.  This operation will remove the data file(s) and transaction log(s) from the file system of the SQL database server.

To close active connections, select the Drop Connections checkbox from the Delete Database user interface and click OK to commit the changes.

**Repartitioning Content Databases**

As a content database grows it may become necessary to introduce additional data files to support the growth and sustain operation efficiency.  By introducing data files a content database can be grown to support additional content through the introduction of new site collections or by repartitioning existing content databases.

To repartition an existing content database into separate data files it is often easiest to begin with one existing content database that will serve as the primary data file in the PRIMARY filegroup. To reduce the overhead associated with repartitioning a content database, it is best to use the largest content database as the primary data file. After deciding on a content database to serve as the primary data file you can use the steps detailed in the section **Performance and Benefits (Multiple Data Files)** below to add a secondary file. Repartitioning a content database requires the backup, removal, and restore of existing site collections into a target content database. You should carefully review the size of existing content databases and the limitations associated with the STSADM backup and restore operations (see [http://support.microsoft.com/kb/889236](http://support.microsoft.com/kb/889236)).  For additional information on the **SharePoint** administration tool, see Stsadm.exe command-line tool (Office SharePoint Server) at:  [http://technet2.microsoft.com/Office/en-us/library/188f006d-aa66-4784-a65b-a31822aa13f71033.mspx?mfr=true](http://technet2.microsoft.com/Office/en-us/library/188f006d-aa66-4784-a65b-a31822aa13f71033.mspx?mfr=true "http://technet2.microsoft.com/Office/en-us/library/188f006d-aa66-4784-a65b-a31822aa13f71033.mspx?mfr=true"). 

> **'Stopping' a Content Database to Repartition**
> 
> Repartitioning a content database requires that the database to be repartitioned is set to ‘stopped’ in **SharePoint** 3.0 Central Administration to prevent the introduction of new site collections and set to read-only to prevent the introduction of content during the repartitioning process. To ensure the content database where the new data files have been established receives the site collections from the content database being repartitioned you will need to ‘stop’ all other content databases in the server farm to ensure site collections are not written to those databases or optionally set the maximum number of sites that can be hosted in the content database to a value exceeding that of any other content database in the server farm through the **SharePoint** Central Administration 3.0 user interface.

> **'Stopping' a Content Database using the SharePoint 3.0 Central Administration User Interface**
> 
> To 'stop' a content database using the **SharePoint** 3.0 Central Administration user interface click Start, All Programs, Microsoft Office Server, and the click SharePoint 3.0 Central Administration from a web front-end computer.
> 
> Click the Application Management tab and select Content databases under SharePoint Web Application Management.
> 
> Select the Web application on which the content database will be 'stopped'.
> 
> Click the Database Name of the content database to be 'stopped' on the Web application.
> 
> Select Offline from the Database status dropdown menu and click **OK** to commit the change.

> **Reducing Overhead when Repartitioning Content Databases**
> 
> By growing the data files to a size supportive of the site collections to be introduced or to a maximum size as desired in your database architecture you can reduce the overhead associated with incremental growth of the data file during the repartitioning and the reduce the possibility of fragmentation. Before deciding on leveraging multiple data files you should read the remainder of this article to understand the concepts and instructions to maximize performance and administration operations.

**Performance and Benefits (Multiple Data Files)**

The use of multiple data files improve database performance by allowing a database to be created across multiple disks, controls or RAID systems. When a content database is "striped" across multiple disks more read/write heads can access the data in parallel simultaneously. For instance a 450GB content database made up of three (3) data and one (1) log file enables four (4) read/write heads to access data in parallel speeding up database operations.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DatabaseDesignConceptsforLargeandGrowing_B075/DBFileExample_thumb1.jpg)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DatabaseDesignConceptsforLargeandGrowing_B075/DBFileExample3.jpg)

**Managing Growth**

Content database administration can be reduced by allowing a content database to grow by a designated capacity, either incrementally or by a defined percentage. Proportional fill strategy is used across all of the data files within the filegroup composed of these data and log files, when the files in the file group are full, files will be automatically expanded one at a time in round-robin load balancing scheme.  Growth can be managed more granularly using manual file growth options, but as a result, requires the most administration overhead to monitor the growth.  Autogrowth enables files to grow incrementally or at defined percentages reducing the administration overhead associated with management of data file growth and can more granularly managed through establishing a maximum data file size.

**General Rules**

A file or filegroup cannot be used by more than one database, the content\_database\_1.mdf and content\_database\_2.ndf objects cannot be used by any other content database other than the content\_database\_1 database.

A file can be a member of only one filegroup (See above).

Transaction log files are never a part of a filegroup.

**Best Practices**

1.  Smaller content databases or those under 400-500 GB will work well with a single data file and a single transaction log file.
2.  Create data files on as many different available physical disks as possible.  This will improve performance, because of parallel disk I/O if the files are located on different physical disks.
3.  Do not put the transaction log file or files on the same physical disk that has the other files and filegroups.
4.  The number of files in a filegroup should be equal to or less than the number of CPU cores available to the SQL database server.
5.  Use manual file growth options.

**Database Design Limitations**

While there are benefits associated with leveraging files there are also limitations. Site collections and their associated content cannot span multiple data files, meaning that documents, lists, etc. will reside in the same data file as the site collection. This in effect limits exposing the performance gains associated with placing different tables that are used in the same join queries in different filegroups to leverage parallel disk I/O searching for joined data or putting heavily access tables (_AllDocs_) and the nonclustered indexes on different filegroups. 

**SharePoint Products & Technologies** do not support the use of multiple filegroups; therefore, SQL Server 2005 technologies including piecemeal restore cannot be leveraged on a content database.  When designing a content database it is important to determine a suitable maximum capacity that facilitates the ability to provide efficient restore and supports a restore server farm environment, specifically when determining storage requirements for a restore server farm environment.  Since **SharePoint Products and Technologies** limits a database to using on one filegroup, all data files within that filegroup must be restored to make available the content database composed of those data files.

**Creating Data Files (SQL Server 2005)**

> **New Content Databases**
> 
> A newly created content database provides the best foundation for the introduction of files since it does not require the manipulation of a content database hosting production content.  To introduce files to a content database follow the steps detailed in the section **Existing Content Databases** below.
> 
> **Existing Content Databases**
> 
> The use of files is not limited to only new content databases, but can be applied to existing content databases in the server farm. By introducing new data files you can benefit from the performance and administration aspects of files in SQL Server 2005.
> 
> 1.  Connect to the server instance in SQL Server 2005 Management and expand the Databases node.
> 2.  Select the content database that will be expanded through the introduction of a new files.
> 3.  Right-click the content database and select Properties from the context menu.
> 4.  From the Database Properties dialog, select Files.
> 5.  Two files will already exist, the primary data and log file that were created when the content databases was added to the server farm.
> 6.  Click Add to add a new file.
> 7.  Specify a logical name for the new file and select the secondary file group from Filegroup group column to associate the new file with the secondary filegroup.
> 8.  Expand the data file to the desired size by providing a value correspond to the desired size in megabytes in the Initial Size (MB) column.
> 9.  By default the growth is set to 1MB increments, this should be modified to reflect a value of 10% or greater to reduce the overhead associated with growth of the data file reducing the possibility of fragmentation.
> 10.  Specify the path where the new file will be created, to maximize the performance by enabling parallel disk I/O provide a location on a separate physical disk for this data file.
> 11.  Click OK to create the new file.

**Conclusion**

Large and growing content database can be extended through the introduction of secondary/additional data files to increase capacity, reduce administration overhead, and improve data access performance when implemented and managed appropriately, as a result larger content databases can host a significantly greater amount of site collections when compared to smaller content databases and subsequently maximize the exposure of a database that has gone suspect or offline to consumers of the service.  It is important to understand the design aspects and limitations of content databases and implement an efficient scale and sustainability strategy when considering redesigning your database architecture.  See the resources below for additional information on capacity planning for SharePoint Products and Technologies.

**Resources**

[Scale, Performance, and Capacity Planning](http://blogs.msdn.com/sharepoint/archive/2007/03/08/scale-performance-and-capacity-planning.aspx) (Microsoft SharePoint Products and Technologies Team Blog)

[Sample Data for Capacity Planning](http://blogs.msdn.com/joelo/archive/2007/04/21/sample-data-for-capacity-planning.aspx) (Joel Oleson's SharePoint Land)

[Plan for Performance and Capacity](http://technet.microsoft.com/en-us/library/cc262971.aspx) (TechNet)

[Planning and Architecture for Office SharePoint Server 2007](http://technet.microsoft.com/en-us/library/cc261834.aspx) (TechNet)