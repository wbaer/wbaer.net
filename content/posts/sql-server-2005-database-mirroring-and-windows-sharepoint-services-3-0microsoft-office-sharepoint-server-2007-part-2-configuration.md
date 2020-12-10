---
title: 'SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 2 (Configuration)'
date: Fri, 25 May 2007 17:19:00 +0000
draft: false
tags: ['Capacity Planning', 'Uncategorized']
---

This is the second part of a multi-part series on using [SQL Server 2005 Database Mirroring with SharePoint Products and Technologies](http://blogs.technet.com/wbaer/archive/2007/04/23/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-1-introduction-overview-and-basics.aspx).  This post will cover the basic configuration parameters required to enable the mirroring of content, configuration, and search databases.  Part 3 of this series will cover SharePoint Products and Technologies failover automation scripts and considerations.

**Basic SQL Server 2005 Database Mirroring Implementation for SharePoint Products and Technologies**

The most common implementation of SQL Server 2005 Database Mirroring includes all databases being installed on a single mirror partnership and the implementation of a witness (polling) server that provides automatic database failover between the principal and mirror servers when necessary.  A witness server additionally provides quorum capabilities for a mirroring partnership; as a result in the event a principal server is lost, the witness will bring the mirror server online.

The witness server does not serve as a content host nor perform intensive operations and as a result can be safely implemented on an application server in a SharePoint server farm in most circumstances.

After installing and configuring SQL Server 2005 you should test the communication channels between each server machine by confirming DNS name resolution and ensuring the latency between each node is within an acceptable parameter.

**Database Selection and Preparation**

To begin a database mirroring session you should identify the databases that will be mirrored.  To maximize availability and reduce any potential issues during failover, it is recommended to mirror each database within a **SharePoint Products and Technologies** deployment.  In a database mirroring partnership SQL Server allocates memory to each database mirroring connection, to avoid potential performance implications you should consider a database capacity that can support your environment and additionally host content in a minimum count of content databases.  See [Database Management Concepts for Large and Growing Content Databases](http://blogs.technet.com/wbaer/archive/2007/05/08/database-management-concepts-for-large-and-growing-content-databases.aspx "Database Management Concepts for Large and Growing Content Databases") for more information on capacity planning and design for content databases.

> **Set the Database Recovery Model to FULL on all Databases**

> On the SQL Server 2005 Principal server, click **Start**, **All Programs**, **Microsoft SQL Server 2005**, and then click **SQL Server Management Studio**.
> 
> Expand the **Databases** and **System Databases** node.
> 
> Right-click **master** and select **New Query** from the menu.
> 
> In the rightmost panel, enter the following SQL statement:
> 
> ALTER Database <databasename>  
> SET RECOVERY FULL;
> 
> Select **Query**, and then click **Execute** from the SQL Server Management Studio toolbar.
> 
> The results of the operation will be displayed in the rightmost **Results** panel.
> 
> **Backup SharePoint Products and Technologies Databases**
> 
> On the SQL Server 2005 Principal server, click **Start**, **All Programs**, **Microsoft SQL Server 2005**, and then click **SQL Server Management Studio**.
> 
> Expand the **Databases** and **System Databases** node.
> 
> Right-click **master** and select **New Query** from the menu.
> 
> In the rightmost panel, enter the following SQL statement:
> 
> BACKUP Database <databasename>  
> TO DISK = <'backuppath'>  
> WITH Format  
> Go
> 
> Select **Query**, and then click **Execute** from the SQL Server Management Studio toolbar.
> 
> The results of the operation will be displayed in the rightmost **Results** panel.
> 
> **Restore the SharePoint Products and Technologies Databases to the Mirror Server**
> 
> On the SQL Server 2005 Mirror server, click **Start**, **All Programs**, **Microsoft SQL Server 2005**, and then click **SQL Server Management Studio**.
> 
> Expand the **Databases** and **System Databases** node.
> 
> Right-click **master** and select **New Query** from the menu.
> 
> In the rightmost panel, enter the following SQL statement:
> 
> RESTORE Database <databasename>  
> FROM DISK = <'restorepath'>  
> WITH NORECOVERY  
> Go
> 
> Select **Query**, and then click **Execute** from the SQL Server Management Studio toolbar.
> 
> The results of the operation will be displayed in the rightmost **Results** panel.
> 
> **Backup Transaction Logs on the Principal Server**
> 
> On the SQL Server 2005 Principal server, click **Start**, **All Programs**, **Microsoft SQL Server 2005**, and then click **SQL Server Management Studio**.
> 
> Expand the **Databases** and **System Databases** node.
> 
> Right-click **master** and select **New Query** from the menu.
> 
> In the rightmost panel, enter the following SQL statement:
> 
> BACKUP LOG <databasename>  
> TO DISK = <'backuppath'>  
> WITH Format  
> Go
> 
> Select **Query**, and then click **Execute** from the SQL Server Management Studio toolbar.
> 
> The results of the operation will be displayed in the rightmost **Results** panel.
> 
> **Restore Transaction Logs to Mirror Server**
> 
> On the SQL Server 2005 Mirror server, click **Start**, **All Programs**, **Microsoft SQL Server 2005**, and then click **SQL Server Management Studio**.
> 
> Expand the **Databases** and **System Databases** node.
> 
> Right-click **master** and select **New Query** from the menu.
> 
> In the rightmost panel, enter the following SQL statement:
> 
> RESTORE LOG <databasename>  
> FROM DISK = <'restorepath'>  
> WITH FILE\=1, NORECOVERY  
> Go
> 
> Select **Query**, and then click **Execute** from the SQL Server Management Studio toolbar.
> 
> The results of the operation will be displayed in the rightmost **Results** panel.

**Configure Database Mirroring Connections**

> 1.  On the Principal server click **Start**, **All Programs**, **Microsoft SQL Server 2005**, and then click **SQL Server Management Studio**.
> 2.  Expand the **Databases** node.
> 3.  Right-click the database to mirrored and select **Properties** from the menu.
> 4.  On the **Database Properties - <databasename>** dialog, select **Mirroring** under the **Select a page** panel, and then click **Configure Security**.
> 5.  Click **Next>** on the **Configure Database Mirroring Security Wizard** or click **Cancel** to quit.
> 6.  On the **Include Witness Server** dialog, if a witness server will be configured (recommended), click **Yes** otherwise click **No**, and then click **Yes** to continue or **< Back** to return to the previous screen.
> 7.  On the **Choose Servers to Configure** dialog select **Principal server instance**, **Mirror server instance**, and **Witness server instance**, and then click **Next >** to continue.
> 8.  On the **Principal Server Instance** dialog select the **Principal server instance** from the menu, configure the **Listener port** to **14999** and specify **EndPoint\_Mirroring** in the **Endpoint name** field, select **Encrypt data sent through this endpoint**, and then click **Next >** to continue or **< Back** to return to the previous screen.
> 9.  On the **Mirror Server Instance** dialog select the **Mirror server instance** from the menu and click **Connect...**
> 10.  Configure the **Listener port** to **14999** and specify **EndPoint\_Mirroring** in the **Endpoint name** field, select **Encrypt data sent through this endpoint**, and then click **Next >** to continue or **< Back** to return to the previous screen.
> 11.  On the **Service Accounts** dialog review and confirm the settings, and then click **Next >** to continue or **< Back** to return to the previous screen.
> 12.  Click **Finish** to close the **Configure Database Mirroring Security Wizard**.
> 13.  On the **Configuring Endpoints** dialog ensure all actions are **Successful**; otherwise, return to the **Configure Database Mirroring Security Wizard** and resolve any conflicts or when all actions are **Successful** click **Close**.
> 14.  Confirm **High safety with automatic failover (synchronous) - Always commit changes at both the principal and mirror** is selected  under **Operating mode** and then select **Start Mirroring** to initialize database mirroring for the selected database.
> 15.  Click **Refresh** and confirm the **Status** is indicated as **Synchronized: the databases are fully synchronized**.  If there are any conflicts the **Status** will be commonly indicated as **This database has not been configured for mirroring**.
> 16.  Click **OK** to close the **Configure Database Mirroring Security Wizard**.
> 
> Repeat steps 1 - 16 for each database to be mirrored.

**Post Implementation Review and Testing**

*   To confirm the mirroring connection has been configured successfully confirm the principal server database(s) is indicated as **Principal, Synchronized**, and the mirror server database(s) is indicated as **Mirror, Synchronized / Restoring**.
*   To test failover restart the **MSSQLSERVER** service.

**Resources**

For additional information on SQL Server 2005 Database Mirroring with SharePoint Products and Technologies see [SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 1 (Introduction, Overview, and basics)](http://blogs.technet.com/wbaer/archive/2007/04/23/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-1-introduction-overview-and-basics.aspx).