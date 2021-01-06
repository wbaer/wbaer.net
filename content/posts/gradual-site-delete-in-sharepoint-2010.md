---
title: 'Gradual Site Delete in SharePoint 2010'
date: Mon, 02 Aug 2010 08:25:13 +0000
draft: false
tags: ['IT Pro Resources', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

Overlooked often in SharePoint 2010 is the new Gradual Site Delete capability which was designed to mitigate unplanned site collection outages that occurred as the result of lock escalation in Windows SharePoint Server 3.0 and Office SharePoint Server 2007 when a large site collection was requested for deletion.  Before we describe Gradual Site Delete, we should understand the problem space from previous versions of the product.

In Windows SharePoint Services 3.0 and Office SharePoint Server 2007 two (2) independent stored procedures were called as a result of a request for site collection deletion, proc.DropSite which removed the dbo.SiteMap entry for the site collection from the configuration database, and proc.DeleteSite which removed the site collection and its content from its respective content database.

In Windows SharePoint Services 3.0 and Office SharePoint Server 2007 proc.DeleteSite stepped through all the of the tables in the content database corresponding to the Id of the site collection to be deleted, as a result there were roughly 35 tables touched as a part of the operation which occurred as a single homogenous operation.

Delete operations in SQL Server implement a lock on the deleted rows and if the number of rows that are to be deleted is more than a threshold (by default 5000), SQL Server in many cases may assume it is more efficient to escalate these row locks to table locks. Lock-escalation in this scenario freezes the whole table from other legitimate user requests and has the potential to result in performance degradation to the extent of server unresponsiveness.

In SharePoint 2010, mitigation occurs through a tiered process, Gradual Site Delete.  When a site collection is deleted, the site collection entry (pointer) in dbo.SiteMap is removed from the configuration database and from dbo.Sites in the corresponding content database. For all purposes of user access to the site collection Url or its content the site collection no longer exists and is inaccessible, or otherwise, the Url is no longer reserved.

The site collection deletion is then queued into a new table (dbo.SiteDeletion) in the hosting content database where it is marked to be gradually deleted.

At this point in the operation, a new Timer Job Definition \[Gradual Site Delete\] executes on a daily schedule \[configurable\], and will continuously attempt to delete all the data for all the site collections in its queue (dbo.SiteDeletion). It will delete the data in small enough batches of a maximum of 1000 rows through multiple transactions to avoid lock escalation, and can be resumed in the event any failure occurs so that it can attempt the delete process again if needed.  Once the site collection is fully deleted the dbo.SiteDeletion entry is removed.

Gradual Site Delete is a selectable operation when working with Windows PowerShell and/or the Object Model in which it can be implemented or bypassed.  See the resources below for additional information on how to access Gradual Delete through the the Object Model or Windows PowerShell.

**Resources**

[SPSite.Delete Method](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.delete.aspx) ([http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.delete.aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.delete.aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.delete.aspx"))

[Remove-SPSite](http://technet.microsoft.com/en-us/library/ee836144.aspx#section2) ([http://technet.microsoft.com/en-us/library/ee836144.aspx#section2](http://technet.microsoft.com/en-us/library/ee836144.aspx#section2 "http://technet.microsoft.com/en-us/library/ee836144.aspx#section2"))