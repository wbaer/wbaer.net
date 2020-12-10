---
title: 'HOW TO: Rename Search Service Application Databases on the “Same” Server'
date: Wed, 18 Dec 2013 18:29:39 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2013']
---

There are a number of articles that describe how to rename and move the Search Service Application databases in SharePoint Server 2013; however, limited guidance on renaming the Search Service Application databases on the same server.  The process itself differs little from the former, but worth documenting.

Step 1 Suspend the Search Service
=================================

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to suspend the search service:

> $SearchService = Get-SPEnterpriseSearchServiceApplication <Search Service Application Name> Suspend-SPEnterpriseSearchServiceApplication -Identity $SearchService

Step 2 Set Original Search Service Application Databases to Read Only
=====================================================================

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  On the Connect to Server dialog, enter the name of the server and click **Connect**.
3.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
4.  In Query Editor, enter the following Transact-SQL code:

> USE master
> 
> ALTER DATABASE <Database Name> SET READ\_ONLY

Repeat steps 1-4 for each Search Service Application database (Administration, Analytics Reporting, Crawl and Links Stores.

Step 3 Backup the Administration, Analytics Reporting, Crawl, and Links Store databases
=======================================================================================

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  On the Connect to Server dialog, enter the name of the server and click **Connect**.
3.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
4.  In Query Editor, enter the following Transact-SQL code:

> USE master
> 
> BACKUP DATABASE <Database Name> TO DISK ‘<drive>:<path>’
> 
> GO

Repeat steps 1-4 for each Search Service Application database (Administration, Analytics Reporting, Crawl and Links Stores.

Step 3 Restore the Administration, Analytics Reporting, Crawl and Links Store Databases
=======================================================================================

1.  On the **Start** menu, point to **All Programs**, point to **Microsoft SQL Server 2012**, and then click **SQL Server Management Studio**.
2.  On the Connect to Server dialog, enter the name of the server and click **Connect**.
3.  In SQL Server Management Studio, click **New Query** to display the Query Editor.
4.  In Query Editor, enter the following Transact-SQL code:

> USE master  
> GO  
> RESTORE FILELISTONLY  
>    FROM <Old Database Name>  
>   
> RESTORE DATABASE <New Database Name>  
>    FROM <Old Database Name>  
>    WITH RECOVERY,  
>    MOVE '<Old File Name>\_data' TO <Drive>:Program FilesMicrosoft SQL Server<Instance>MSSQLDATA<New File Name>.mdf',  
>    MOVE <Old File Name>\_log' TO <Drive>:Program FilesMicrosoft SQL Server<Instance>MSSQLDATA<New File Name>.ldf'  
> GO

Repeat steps 1-4 for each Search Service Application database (Administration, Analytics Reporting, Crawl and Links Stores.

**NOTE**

The Transact SQL above is used to rename both the logical and physical files on restore.  The new databases will be restored as RO, to return to RW use the Transact SQL below:

USE master

ALTER DATABASE <Database Name> SET READ\_WRITE

Step 4 Associate Renamed Database with the Search Topology
==========================================================

Step 4.1 Associate the Search Administration Database
-----------------------------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to associate the new Search Administration database with the Search Service Application:

> $SearchService = Get-SPEnterpriseSearchServiceApplication <SearchServiceApplicationName> $SearchService | Set-SPEnterpriseSearchServiceApplication \[-DatabaseName "<New Database Name>"\] -DatabaseServer "<Original Server Name>"

**NOTE**

\-DatabaseServer is a required parameter.  In this step use the existing database server (instance) name.

Step 4.2 Associate the Analytics Reporting Database
---------------------------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to associate the new Analytics Reporting database with the Search Service Application:

> Add-SPServerScaleOutDatabase -ServiceApplication $SearchService -DatabaseServer <Original Server Name> \[-DatabaseName <New Database Name>\] $temp = Get-SPServerScaleOutDatabase -ServiceApplication $SearchService Remove-SPServerScaleOutDatabase -Database $temp\[0\] -ServiceApplication $SearchService

**NOTE**

\-DatabaseServer is a required parameter.  In this step use the existing database server (instance) name.

Step 4.3 Associate the Crawl Store Database
-------------------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to associate the new Crawl Store database with the Search Service Application:

> $CrawlDatabase0 = (\[array\]($SearchService | Get-SPEnterpriseSearchCrawlDatabase))\[0\] $CrawlDatabase0 | Set-SPEnterpriseSearchCrawlDatabase \[-DatabaseName "<New Database Name>"\] -DatabaseServer "<Original Server Name>"

**NOTE**

\-DatabaseServer is a required parameter.  In this step use the existing database server (instance) name.

Step 4.4 Associate the Links Store Database
-------------------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to associate the new Links Store database with the Search Service Application:

> $LinksDatabase0 = (\[array\]($SearchService | Get-SPEnterpriseSearchLinksDatabase))\[0\] $LinksDatabase0 | Set-SPEnterpriseSearchLinksDatabase \[-DatabaseName "<New Database Name>"\] -DatabaseServer "<Original Server Name>"

**NOTE**

\-DatabaseServer is a required parameter.  In this step use the existing database server (instance) name.

Step 5 Resume the Search Service
================================

Step 5.1 Wait on the Search Service to come ‘Online’
----------------------------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement:

> Get-SPEnterpriseSearchServiceInstance -Identity <Search Server>

Check the response and wait for the status to report ‘Online’.  Once ‘Online’ proceed to **Step 5.2 Resume the Search Service**.

Step 5.2 Resume the Search Service
----------------------------------

1.  On the **Start** menu, click **All Programs**.
2.  Click **Microsoft SharePoint 2013 Products**.
3.  Click **SharePoint 2013 Management Shell**.
4.  In the SharePoint 2013 Management Shell, enter the following Windows PowerShell statement to resume the Search Service:

> $SearchService = Get-SPEnterpriseSearchServiceApplication <Search Service Application Name> Resume-SPEnterpriseSearchServiceApplication -Identity $SearchService

Troubleshooting
===============

_The search application Guid on server ServerName did not finish loading. View the event logs on the affected server for more information._

This error message is indicative of login issues.  In the event the Search Service Application fails to load, script the login from the original SSA databases and restore the information to the new SSA databases.

_'Sharepoint\_Search\_Service\_Application\_CrawlStoreDB\_4d7dcfead0eb46ab9ee4399a430584b8' on SQL Server instance '<my server name>' not found._

or

_SQL database login failed. Additional error information from SQL Server is included below._

_Login failed for user 'NT AUTHORITYANONYMOUS LOGON'._

These error messages are indicative of orphaned Search Service Application databases.  To remove the orphaned databases open the SharePoint 2013 Management Shell and enter:

Get-SPDatabase | Where{$\_.Exists -eq $false}

This command will return databases reported to SharePoint 2013 that do not exist on the default database server.  To remove the reported orphaned databases enter:

Get-SPDatabase | Where{$\_.Exists -eq $false} | ForEach {$\_.Delete()}