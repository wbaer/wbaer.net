---
title: 'SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 3 (Failover)'
date: Wed, 01 Aug 2007 20:27:40 +0000
draft: false
tags: ['Capacity Planning']
---

Database mirroring is increasing in popularity and becoming an integral part of high availability and disaster recovery solutions within the SharePoint Products and Technologies arena. I've spent much of the last few months building labs, testing scenarios, impacts on platforms whether it be WSS or MOSS.  This post is the third and final on my series \[[SQL Server 2005 Database Mirroring and Windows SharePoint Services/Microsoft Office SharePoint Server 2007](http://blogs.technet.com/wbaer/archive/2007/04/23/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-1-introduction-overview-and-basics.aspx)\].

We know with asynchronous mirroring we can automatically manage SQL Server 2005 failover by introducing the witness role in our server farms, the most challenging question to answer is how to manage web front-end failover.  In this post I will **outline** several possible solutions for managing SharePoint Products and Technologies failover in a mirrored database architecture.

Solution # 1 Network Load Balancing

In a high-availability environment, you can create a NLB cluster to easily route client requests from the original principal server to a promoted mirror server without having to update each client directly. NLB setup and configuration are fairly painless; however, it comes with the requirement that each server be on the same subnet and the active mirror remain in a suspended state in the load balancing rotation.  With this in mind you should carefully consider the limitations when using native NLB, for example you will not be able to geo-cluster in most circumstances. 

Solution # 2 Manual Failover

Manual failover requires the least in respect to infrastructure and configuration; however, has the highest operational costs and without proper management and monitoring can present the largest client impact in the event the of a failover. The steps required to instantiate a manual failover of SharePoint Products and Technologies are described in the [first part of this series](http://blogs.technet.com/wbaer/archive/2007/04/23/sql-server-2005-database-mirroring-and-windows-sharepoint-services-3-0-microsoft-office-sharepoint-server-2007-part-1-introduction-overview-and-basics.aspx).

Solution #3 Custom Solutions (Example)

Custom solutions can be implemented monitoring the state of the principal and mirror servers redirecting the application calling the original principal server to the new principal server - typically implemented through a Windows service.

For example, using an aliasing scheme where SharePoint Products and Technologies accesses the SQL database server through an alternate name;  SharePoint Products and Technologies accessing the alternate name is redirected to the proper physical name of the principal server. Since SharePoint Products and Technologies is only aware of the alternate name and never accesses the physical name of either node it does not need to be failover aware.

From a logical perspective in the example solution proposed SharePoint Products and Technologies would make the request to the SQL alias, for example contoso, requests for contoso are intercepted and modified to reference the active principal node referenced in the web front-end server Registry as contoso1.  In a failover scenario, the Windows service would detect the principal role is on the new principal server, previously the mirror server, and replace the web front-end server Registry entry for contoso1 with the new principal physical server contoso2.