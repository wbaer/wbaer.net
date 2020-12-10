---
title: 'Database Mirroring, Notes and Considerations'
date: Fri, 01 Aug 2008 16:36:50 +0000
draft: false
tags: ['Capacity Planning', 'Uncategorized']
---

The question of Microsoft SQL Server 2005 Database Mirroring (DBM) continues to be a topic of discussion in implementation with Microsoft SharePoint Products and Technologies, attached is a set of key notes and considerations to take into account when implementing DBM.

Before implementing DBM with Microsoft SharePoint Products and Technologies, you must first understand that many applications are not natively aware of a Microsoft SQL Server 2005 Database Mirroring architecture in most cases.  With most applications, to include Microsoft SharePoint Products and Technologies, the application expectation is to consume storage from a single, specific source - generally a single instance (named or default) or cluster resource.

**High Availability and Connectivity**

DBM provides high availability (HA) at the database level, wherein a failure of a database is recoverable through its failover partner.  In addition, DBM also provides HA at the server level in which hardware failure is recoverable through the individual databases' failover partners.  In either scenario, the addressable database is that which is Principal, the Mirror database is in Recovery and cannot be addressed by the client application.  When database role reversal occurs, the addressable database resides on a separate physical instance, to which SharePoint is not configured to consume from.  By implementing Connection Aliases on the Web front-end computers using the SQL Server Client Network Utility, client connections can be redirected to the new instance hosting the Principal databases as a potential solution to these limitations.

In either scenario with DBM and Microsoft SharePoint Products and Technologies, due to the limitations as mentioned previously, a need to maintain database -> node majority is required - that being all databases as Principal should reside on the same SQL Server instance (think of it as a cluster group).  A bidirectional mirrored session, where one or more, but not all, databases reside on a separate physical instance as Principal will result in that content hosted in those databases to be unavailable to SharePoint (see the following illustrations).  In the event this occurs, the Web front-end computers Application Event Log will commonly provide two application events, not specific to the condition, but more over to overall database health.  The Event Id's in this scenario are 3760 and 5586.  By monitoring for the occurrence of these events in DBM, you can diagnose when a condition exists where database -> node majority is lost and reactively restore majority on either node and where necessary updating the Connection Alias on the Web front-end computers. 

An additional configuration that can be implemented as had been commonly implemented with Windows Server 2000 Domain Controllers is leveraging WLBS to provide a single cluster resource that the client application will use to establish its connections; however, in this scenario you need to be mindful of the NLB state to ensure that connections are not distributed, but are specific to only one node in the load balancing rotation which hosts the databases as Principal.  The server instance hosting the databases as Mirror should be suspended in WLBS to ensure client connections are not passed to it which will result in client errors, generally, presented as "An unexpected error has occurred." in the user interface.

The following illustrations examine several possible database level configurations and notes regarding each.

**Illustrations**

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DBM_AC13/image_thumb_1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DBM_AC13/image_4.png)

In the illustration above, connections are established to the server instance where all databases are Principal.  In this scenario, connections will be successful and there are no issues in your topology.  Failover to the partner will require either updating the Connection Alias or resuming the node in the load balancing rotation depending on the configuration used to establish the connection.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DBM_AC13/image_thumb_3.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DBM_AC13/image_8.png)

In the illustration above, connections are established to the server instance where the majority of databases are Principal.  In this scenario, connections are successful; however, content in Database B will not be served since the database is in Recovery.  Failover to the partner will require either updating the Connection Alias or resuming the node in the load balancing rotation depending on the configuration used to establish the connection and establishing database -> node majority.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DBM_AC13/image_thumb_4.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/DBM_AC13/image_10.png)

In the illustration above, connections are established to the server instance where all databases are Mirror.  In this scenario, connections will be unsuccessful.  Failover to the partner will require either updating the Connection Alias or resuming the node in the load balancing rotation depending on the configuration used to establish the connection.

**Operating Modes**

When running in high safety mode with automatic failure, implying a Witness server instance is configured in the DBM architecture, you should consider configuring the failover partner timeout value to a value that provides a level of assurance that the Principal database can sustain protracted issues, to include blocking, secure channel float, etc.  that may cause a bidirectional mirrored state inadvertently.  The default failover partner timeout value is 20 seconds, and generally 120 seconds offers increased level of protection with Microsoft SharePoint Products and Technologies.  To ensure database -> node majority and enforce failover only when a catastrophic issue occurs at the instance or server level, you should consider using the high safety without automatic failover DBM operating mode.  The high safety without automatic failover mode provides synchronous mirroring and requires manual intervention in the event one or more databases needs to be failover over to the failover partner.

**Recovery Models**

Another consideration when implementing DBM is that the databases participating in the DBM session must use the Full Recovery Model.  While Simple is the most commonly implemented Recovery model, you should keep aware that this may introduce operational complexity into your design and also ensure your operations staff and DBA's are familiar with the Full Recovery Model.

In conclusion, before implementing DBM, you should consider the impact on your topology and understand the support boundaries as documented in [White paper- Using database mirroring (Office SharePoint Server)](http://technet.microsoft.com/en-us/library/cc262910.aspx "White paper- Using database mirroring (Office SharePoint Server)") or [Using database mirroring with Windows SharePoint Services (white paper)](http://technet.microsoft.com/en-us/library/cc287861.aspx "Using database mirroring with Windows SharePoint Services (white paper").