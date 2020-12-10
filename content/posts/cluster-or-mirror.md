---
title: 'Cluster or mirror?'
date: Wed, 15 Aug 2007 23:33:00 +0000
draft: false
tags: ['Capacity Planning', 'Uncategorized']
---

Should I cluster or mirror?  A few short months ago, the answer to that question would have been easy, now with the increasing popularity of database mirroring to achieve redundancy and geographic replication the answer is split...while each solution provides its own unique benefits, those benefits can be distributed across the answer to what are trying to achieve?

Database mirroring replays transaction log records on a standby server and as a result can failover more rapidly in most cases than a traditional SQL cluster with no loss of committed data; however, as a relatively new solution available to SharePoint Products and Technologies database mirroring has the highest operational costs when considering the learning curve required for the server support staff and database administrators.  While a database mirroring partnership can failover automatically through the implementation of a witness server (high availability/synchronous), there are no methods to enable automatic failover of SharePoint Products and Technologies introducing the added cost of developing a mechanism to manage the failover of the SharePoint service in the event the principal server is lost.  In many cases additional hardware will be required to support the witness server role in a mirroring partnership.  Also inherent of database mirroring is the requirement to duplicate storage across the principal and mirror servers; SharePoint Products and Technologies will consume only from one single physical server at a time unless databases are mirrored in a bidirectional manner.  To offset storage costs database mirroring can leverage traditional DAS storage and/or consume its storage from a SAN.

Clustering is the most common database architecture and as such is the least expensive in operational overhead.  Clustering enables running the same application on two or more servers providing a high availability solution if one of the servers fails.  Cluster software (Cluster Service) natively handles the failover process enabling SharePoint Products and Technologies to run uninterrupted on the second server.  Clustering when compared to mirroring offers greater processing power in addition to scalability since it does not carry the same two (2) physical server limitation as database mirroring and shares resources across each member node, reducing storage costs when compared to database mirroring; however, clustering comes with the requirement of shared storage and does not support the DAS storage options of database mirroring.  Geographic redundancy is limited with clustering since technology limits the distance by which two (2) servers can be separated, Fibre Channel for instance provides the greatest overall distancing, but is limited to a few miles.

Database mirroring and clustering both are capable of data replication, commonly through backing up the transaction logs from a database to a different server and applied there on a standby database (log shipping).  Before you consider log shipping in either a mirroring or clustered database architecture you should carefully review the latency between the publishing and subscribing servers.

There are many other considerations to understand prior to implementing either solution as part of your database architecture for SharePoint Products and Technologies that are not mentioned here that should be carefully reviewed and are complimented by an appropriate implementation plan.

In Microsoft IT we have a mixture, though unbalanced, distribution of SQL server clusters and mirror partnerships and by slowly introducing database mirroring in limited locations as one more option in our SharePoint Products and Technologies database architecture we allow allow more efficient growth and sustainability by not overburdening our operations staff with the support and maintenance learning curve and allow them to continue focusing on current deployments while gradually evolving our database mirroring architecture.

For additional information on SQL Server Database Mirroring with SharePoint Products and Technologies, see my three part series:

[SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 1 (Introduction, Overview, and basics)](http://blogs.technet.com/wbaer/archive/2007/04/23/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-1-introduction-overview-and-basics.aspx)

[SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 2 (Configuration)](http://blogs.technet.com/wbaer/archive/2007/05/25/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-2-configuration.aspx)

[SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 3 (Failover)](http://blogs.technet.com/wbaer/archive/2007/08/01/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-3-failover.aspx)

**Additional Resources**

[Database Mirroring in SQL Server 2005](http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirror.mspx)

[Inside Microsoft.com - Getting Started with Database Mirroring](http://www.microsoft.com/technet/technetmag/issues/2007/03/InsideMSCOM/default.aspx)

[Database Mirroring Best Practices and Performance Considerations](http://www.microsoft.com/technet/prodtechnol/sql/2005/technologies/dbm_best_pract.mspx)

[SQL Server 2005 Failover Clustering White Paper](http://www.microsoft.com/downloads/details.aspx?familyid=818234dc-a17b-4f09-b282-c6830fead499&displaylang=en)

[Top Tips for SQL Server Clustering](http://www.microsoft.com/technet/technetmag/issues/2007/03/SQLClusters/default.aspx?loc=en)