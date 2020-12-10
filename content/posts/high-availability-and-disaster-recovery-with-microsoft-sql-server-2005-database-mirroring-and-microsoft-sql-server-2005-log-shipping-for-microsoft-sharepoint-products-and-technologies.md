---
title: 'High-Availability and Disaster Recovery with Microsoft SQL Server 2005 Database Mirroring and Microsoft SQL Server 2005 Log Shipping for Microsoft SharePoint Products and Technologies'
date: Sun, 20 Apr 2008 01:39:54 +0000
draft: false
tags: ['Capacity Planning', 'Replication and Availability', 'Uncategorized']
---

I've discussed on several occasions [Microsoft SQL Server 2005 Database Mirroring with Microsoft SharePoint Products and Technologies](http://blogs.technet.com/wbaer/search.aspx?q=Database+Mirroring&p=1) as a method by which database mirroring can provide intra-datacenter high-availability; however, am frequently asked how Microsoft SQL Server 2005 Database Mirroring can provide protection from datacenter failure.  While possible, you generally do not want to geographically distribute your principal and mirror instances due to potential problems with maintaining synchronicity and bandwidth/latency constraints instead maintaining and intra-datacenter session to provide local fault tolerance; however, you can implement Microsoft SQL Server 2005 Log Shipping in conjunction with Microsoft SQL Server 2005 Database Mirroring to provide a standby copy of your databases in the remote datacenter.

**General Assumptions**

Microsoft SQL Server 2005 Database Mirroring is installed and configured in [high-safety mode with a witness server (synchronous)](http://msdn2.microsoft.com/en-us/library/ms179344.aspx).

[![Mirroring w Witness](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/HighAvailabilityandDisasterRecoverywithM_12516/Mirroring%20w%20Witness_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/HighAvailabilityandDisasterRecoverywithM_12516/Mirroring%20w%20Witness_2.png)

The illustration above depicts Microsoft SQL Server 2005 Database Mirroring in high-safety mode with a witness server.  SQL01p is the principal server, SQL02m is the mirror server, and SQL01w is the witness server in the Microsoft SQL Server 2005 Database Mirroring session.

**Configure the Principal/Primary Server**

Configure Microsoft SQL Server 2005 Log Shipping on the principal Microsoft SQL Server 2005 server using either the Microsoft SQL Server Management Studio or Transact-SQL for each database to be mirrored using either a backup share on a separate host server or local folder.

See [notes on Log Shipping with Microsoft SharePoint Products and Technologies](http://blogs.technet.com/wbaer/archive/2008/03/13/sql-server-2000-2005-log-shipping-notes-with-sharepoint-products-and-technologies.aspx).

When the Microsoft SQL Server 2005 Log Shipping configuration has been applied on the Microsoft SQL Server 2005 Database Mirroring principal server, failover the databases to the Microsoft SQL Server 2005 Database Mirroring mirror server.

**Configure the Mirror/Primary Server**

Configure Microsoft SQL Server 2005 Log Shipping on the mirror Microsoft SQL Server 2005 server using Transact-SQL, Microsoft SQL Server Management Studio cannot be used to configure the mirror server where participating in a shared Microsoft SQL Server 2005 Log Shipping session.

When the Microsoft SQL Server 2005 Log Shipping configuration has been applied on the Microsoft SQL Server 2005 Database Mirroring mirror server, failover the databases to the Microsoft SQL Server 2005 Database Mirroring principal server.

**NOTE** When configuring Microsoft SQL Server 2005 Log Shipping on the mirror/primary server you will receive an error indicating a transactional log backup could not be generated because the database is in either NORECOVERY mode or STANDBY mode.  The error is expected due to the state of the databases and can be ignored.

[![Log Shipping](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/HighAvailabilityandDisasterRecoverywithM_12516/Log%20Shipping_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/HighAvailabilityandDisasterRecoverywithM_12516/Log%20Shipping_2.png)

The illustration above depicts both the principal and mirror configured as log shipping primary; however, in this scenario only the principal generates log backups.  In the event failover occurs within the Microsoft SQL Server 2005 Database Mirroring session, the new principal (previously mirror) will begin generating log backups at the log backup destination used by the original principal.

When the configuration of Microsoft SQL Server 2005 Log Shipping has been completed on the Microsoft SQL Server 2005 Database Mirroring pair, the log backup job will on the principal server will generate log backups on the backup share that will be applied by the primary server, the log backup job on the mirror server will continue to execute though will not generate logs until failover occurs within the Microsoft SQL Server 2005 Database Mirroring session.

**Resources**

[Microsoft SQL Server 2005 Database Mirroring](http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirror.mspx)

[Microsoft SQL Server 2000/2005 Log Shipping](http://msdn2.microsoft.com/en-us/library/ms187103.aspx)