---
title: 'Renaming Content Databases'
date: Mon, 16 Jun 2008 13:37:27 +0000
draft: false
tags: ['SharePoint Tips']
---

I received an inquiry this morning on what procedural steps are required to rename a Windows SharePoint Services 3.0 content database and decided to make the information more broadly available.

**Step 1 Detach Content Database**

Detach the Windows SharePoint Services 3.0 content database from its associated Web application in either Windows SharePoint Services 3.0 or Microsoft Office SharePoint Server 2007 using the steps as outlined below:

1.  On a Web front-end computer open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
2.  Enter STSADM -o deletecontendb -url <http://<virtualServer> -databasename <databaseName> -databaseserver <databaseServer> and press Enter to detach the content database (Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007).  For additional information on the addcontentdb operation see [http://technet.microsoft.com/en-us/library/cc287664(TechNet.10).aspx](http://technet.microsoft.com/en-us/library/cc287664(TechNet.10).aspx "http://technet.microsoft.com/en-us/library/cc287664(TechNet.10).aspx").

**NOTE** Content databases optionally can be detached from their associated Web application using the SharePoint 3.0 Central Administration interface.  For additional information on managing and removing content databases using the SharePoint 3.0 Central Administration user interface see [http://technet.microsoft.com/en-us/library/cc262440(TechNet.10).aspx#section3](http://technet.microsoft.com/en-us/library/cc262440(TechNet.10).aspx#section3 "http://technet.microsoft.com/en-us/library/cc262440(TechNet.10).aspx#section3").  In Microsoft Office SharePoint Server 2007 you should run the STSADM preparetomove operation prior to detaching content databases.  This prevents the synchronization service from failing and losing user privacy settings for those sites after the sites are moved.

**Step 2 Rename Content Database**

Rename the content database (Microsoft SQL Server 2005 instructions)

1.  Connect to your database server and open SQL Server Management Studio.
2.  In Object Explorer connect to an instance of the SQL Server 2005 Database Engine, and then expand that instance.
3.  Set the database to single-user mode.  See [http://msdn.microsoft.com/en-us/library/ms345598.aspx](http://msdn.microsoft.com/en-us/library/ms345598.aspx "http://msdn.microsoft.com/en-us/library/ms345598.aspx") for instructions on how to set single-user mode using the SQL Server Management Studio.
4.  Expand the Databases node, right-click the database to rename, and then click Rename.
5.  Enter the new database name, and then click OK.

**NOTE** Renaming databases using SQL Server Management Studio will only rename the database, to rename the data and transaction log files you must use Transact-SQL following the steps as documented in the SQL Server 2005 Books Online at [http://msdn.microsoft.com/en-us/library/ms174269.aspx](http://msdn.microsoft.com/en-us/library/ms174269.aspx "http://msdn.microsoft.com/en-us/library/ms174269.aspx").  Any time a database is renamed you should consider backing up the master database.

**Step 3 Attach Content Database**

After the database has been renamed on the database server, reattach the content database to its associated Web application be following the steps below:

1.  On a Web front-end computer open a command prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.
2.  Enter STSADM -o addcontentdb -url <http://<virtualServer> -databasename <databaseName> -databaseserver <databaseServer> and press Enter to attach the content database (Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007).  When using a SQL login you supply the appropriate credentials using the -databaseuser and -databasepassword arguments.  To reconfigure the site warning and site maximum count for the content database, pass the -sitewarning and -sitemax arguments.  For additional information on the addcontentdb operation see [http://technet.microsoft.com/en-us/library/cc288692(TechNet.10).aspx](http://technet.microsoft.com/en-us/library/cc288692(TechNet.10).aspx "http://technet.microsoft.com/en-us/library/cc288692(TechNet.10).aspx").

**NOTE** Content databases optionally can be attached to their associated Web application using the SharePoint 3.0 Central Administration interface.  For additional information on managing and adding content databases using the SharePoint 3.0 Central Administration user interface see [http://technet.microsoft.com/en-us/library/cc262440(TechNet.10).aspx#section1](http://technet.microsoft.com/en-us/library/cc262440(TechNet.10).aspx#section1 "http://technet.microsoft.com/en-us/library/cc262440(TechNet.10).aspx#section1").

Ensure all dependencies are updated to reference the new database name to include monitoring, backups, mirroring, etc.