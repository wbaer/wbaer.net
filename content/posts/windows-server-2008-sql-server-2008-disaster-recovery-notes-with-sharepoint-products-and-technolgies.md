---
title: 'Windows Server 2008, SQL Server 2008 Disaster Recovery Notes with SharePoint Products and Technolgies'
date: Fri, 29 Aug 2008 13:37:20 +0000
draft: false
tags: ['Capacity Planning', 'Windows Server 2008']
---

In recent months there has been a great deal of discussion and debate on disaster recovery and high availability with Microsoft SharePoint Products and Technologies and with the recent releases of both Microsoft SQL Server 2008 and Windows Server 2008 there are open opportunities to leverage components available natively to these technologies and compliment a SharePoint Products and Technologies disaster recovery design.

One of the most significant challenges has been overcoming latency penalties applied through distance between the active and passive datacenters, particularly with Microsoft SQL Server Log Shipping since we're dealing with SMB and a synchronous process.  This is where both SQL Server 2008 and Windows Server 2008 come in...

SQL Server 2008 introduces backup compression which can be further integrated in the Microsoft SQL Server Log Shipping configuration (see also [http://msdn.microsoft.com/en-us/library/ms188168.aspx](http://msdn.microsoft.com/en-us/library/ms188168.aspx "http://msdn.microsoft.com/en-us/library/ms188168.aspx")).  By compression the Transaction Log backups and scheduling an aggressive backup schedule in the configuration and administrator can apply a general level of predictability surrounding the size and number of Transaction Log backups and make more efficient use of bandwidth where working with limited throughput and maintaining synchronicity is a concern.

To compliment a Microsoft SQL Server Log Shipping configuration, an administrator can leverage the improvements made to Distributed File System in Windows Server 2008 to optimize WAN performance when copying Transaction Log backups to a remote Secondary server instance.  Windows Server 2008 DFSR improvements include:

*   RPC Asynchronous Pipe vs. Multiple RPC Calls in Windows Server 2003 R2
*   Asynchronous I/Os vs. Synchronous I/Os in Windows Server 2003 R2
*   Unbuffered I/Os vs. Buffered I/Os in Windows Server 2003 R2
*   Low Priority I/Os vs. Normal Priority I/Os in Windows Serve 2003 R2
*   16 Concurrent File Downloads vs. 4 Concurrent File Downloads in Windows Server 2003 R2

In this scenario, Windows Server 2008 DFSR would be configured with the Microsoft SQL Server 2008 backup and load shares as members of a replication group actively replicating Transaction Log backups generated in through the Microsoft SQL Server 2008 Log Shipping configuration.  The Microsoft SQL Server Log Shipping Copy job would be disabled permitting DFSR to perform replication between the shares.

So what about my Domain Controllers?

Windows Server 2008 introduces support for Read-Only Domain Controllers and additionally Windows Server 2008 DFSR improvements can be realized providing AD DS schema version 31.