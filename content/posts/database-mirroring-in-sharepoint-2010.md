---
title: 'Database Mirroring in SharePoint 2010'
date: Mon, 03 May 2010 12:01:40 +0000
draft: false
tags: ['SharePoint Server 2010']
---

Database mirroring provides an additional layer of resiliency, specifically, in highly available architectures, by providing a level of granularity not available to failover clustering.  For additional information on database mirroring see also [http://technet.microsoft.com/en-us/library/ms189852.aspx](http://technet.microsoft.com/en-us/library/ms189852.aspx "http://technet.microsoft.com/en-us/library/ms189852.aspx") (SQL Server 2008) or [http://technet.microsoft.com/en-us/library/ms189852(SQL.90).aspx](http://technet.microsoft.com/en-us/library/ms189852(SQL.90).aspx "http://technet.microsoft.com/en-us/library/ms189852(SQL.90).aspx") (SQL Server 2005).

In Office SharePoint Server 2007 database mirroring was a complex to implement, primarily due to the fact that our connection strings were both in managed code and the unmanaged SQL layer which required an administrator deploying database mirroring to leverage SQL Server Client Connection Aliases across front-end Web and application servers - beyond that - database mirroring in Office SharePoint Server 2007 also required databases as principal to maintain node majority, meaning all databases as principal had to reside on the same instance and subsequently failover had to occur moving all databases as a single unit.  In Office SharePoint Server 2007 a database connection string would appear as **Data Source=<Database Server>;Initial Catalog=<Database>;Integrated Security=True;Enlist=False;Connection Timeout=15**, so in the event SQL Server Client Connection Aliases were not implemented an administrator, through code or through detaching and reattaching the databases, would need to update the connection string(s) to specify the new database server where the databases as principal reside post-failover.

When using connection aliases it was also important to ensure the configuration specified the port on which the database server listened due to changes in DBNETLIB.

**DBNETLIB**

In Office SharePoint Server 2007 to avoid connection interrupts it was important to specify the port that the SQL Server listened on.  SQL Server clients use DBNETLIB to perform port detection and handles the protocol preference order when secondary protocol attempts are necessary.  When you enable the Client Configuration Utility, no port number is stored for the alias entry and DBNETLIB attempts to contact the server through a known UDP port to obtain the correct connection information – over time this can result in connection interrupts.

Additional Information

[http://msdn.microsoft.com/en-us/library/aa177042(SQL.80).aspx](http://msdn.microsoft.com/en-us/library/aa177042(SQL.80).aspx)

[http://support.microsoft.com/kb/816649](http://support.microsoft.com/kb/816649)

In SharePoint Server 2010 support for database mirroring is provided natively enabling seamless and automatic (depending on [Operating Mode](http://technet.microsoft.com/en-us/library/ms191456.aspx)) failover, in comparison, in SharePoint Server 2010 a database connection string would appear as **Data Source=<Principal Database Server>;Failover Partner=<Mirror Database Server>;Integrated Security=True;Enlist=False;Connection Timeout=15**.

With that said in SharePoint Server 2010 we have an ADO.NET connection object,  so in the event the primary connection string cannot connect, the ADO.NET connection string object will attempt the secondary connection string.  The failover time will vary depending on a number of conditions to include network conditions; however, in most cases when operating in the High Availability mode the connection at the SQL layer is updated within seconds, minimizing the impact of failover on end users; in High Safety and High Performance operating modes, ADO.NET will attempt the primary connection string until the specified timeout threshold has been reached prior to attempting the secondary connection string.

Configuration
-------------

In many cases the SharePoint 2010 Central Administration user interfaces exposes entry points used to configure the failover partner in a database mirroring session; however, some database (i.e. Configuration) database do not have a UI entry point – in these scenarios you can use Windows PowerShell or the Object Model to configure the failover partner for the selected databases (examples follow):

**SharePoint 2010 Central Administration (Content Database)**

To configure a content database for database mirroring through SharePoint 2010 Central Administration:

1.  On the SharePoint 2010 Central Administration Home page select **Manage content databases** under Application Management.
2.  Select the Web application which the content database is associated from the Managed Content Databases page and then select the database to be configured from the list of available content databases.
3.  On the Manage Content Database Settings page specify the failover partner in the field labeled **Failover Database** Server and click **OK**.

**NOTE**

When using a DBA-created database, you can specify the failover database server in the Failover Database Server field when adding new content databases through the SharePoint 2010 Central Administration user interface, Windows PowerShell, or the Object Model.

Prior to configuring a database for database mirroring with SharePoint Server 2010 the database should first be configured for database mirroring on the SQL Server.  For additional information on configuring databases for database mirroring with SQL Server see also [http://technet.microsoft.com/en-us/library/ms190941.aspx](http://technet.microsoft.com/en-us/library/ms190941.aspx "http://technet.microsoft.com/en-us/library/ms190941.aspx") (SQL Server 2008) or [http://technet.microsoft.com/en-us/library/ms190941(SQL.90).aspx](http://technet.microsoft.com/en-us/library/ms190941(SQL.90).aspx "http://technet.microsoft.com/en-us/library/ms190941(SQL.90).aspx") (SQL Server 2005).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DatabaseMirroringinSharePoint2010_8C45/image_thumb.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DatabaseMirroringinSharePoint2010_8C45/image_2.png)

**SharePoint 2010 Central Administration (Service Application Databases)**

Service Applications vary in their respective UI entry points, most commonly, the failover partner can be specified through the properties dialog for most Service Applications.  For those Service Applications with specialized management user interfaces, such as Search, database mirroring can be configured through those pages.

1.  On the SharePoint 2010 Central Administration Home page select **Application Management**.
2.  On the Application Management page select **Manage service applications** under Service Applications.
3.  On the Manage Service Applications page, select the Service Application to configure from the list of available Service Applications, and then select **Properties** from the Ribbon.
4.  On the properties dialog for the Service Application specify the failover partner in the field labeled **Failover Database Server** and click **OK**.

**NOTE**

When using a DBA-created database, you can specify the failover database server in the Failover Database Server field when creating new Service Application databases through the SharePoint 2010 Central Administration user interface, Windows PowerShell, or the Object Model.

Prior to configuring a database for database mirroring with SharePoint Server 2010 the database should first be configured for database mirroring on the SQL Server.  For additional information on configuring databases for database mirroring with SQL Server see also [http://technet.microsoft.com/en-us/library/ms190941.aspx](http://technet.microsoft.com/en-us/library/ms190941.aspx "http://technet.microsoft.com/en-us/library/ms190941.aspx") (SQL Server 2008) or [http://technet.microsoft.com/en-us/library/ms190941(SQL.90).aspx](http://technet.microsoft.com/en-us/library/ms190941(SQL.90).aspx "http://technet.microsoft.com/en-us/library/ms190941(SQL.90).aspx") (SQL Server 2005).

**Windows PowerShell**

The following example illustrates how a failover partner can be specified for a database through Windows PowerShell.

Param (\[String\]$database,\[String\]$server)

function Main()  
{  
  $db = get-spdatabase | where {$\_.Name \-eq $database}  
  $db.AddFailoverServiceInstance($server)  
  $db.Update()  
}

Main

**Object Model**

The following example illustrates the Object Model syntax that can be used to specify a failover partner for a database.

string mirrorServer = ContentDatabaseSection.FailoverDatabaseServer;

SPDatabase db = GetDatabase();

db.AddFailoverServiceInstance(mirrorServer);

db.Update();