---
title: 'Site Recycle Bin (Microsoft IT Site Delete Capture) for Microsoft SharePoint Foundation and Microsoft SharePoint Server 2010 Frequently Asked Questions'
date: Tue, 15 Dec 2009 15:58:20 +0000
draft: false
tags: ['IT Pro Resources', 'SharePoint Foundation 2010', 'SharePoint Server 2010', 'Uncategorized']
---

**Question:**

Will the Microsoft IT Site Delete Capture available at [www.codeplex.com/governance](http://www.codeplex.com/governance) work with SharePoint 2010?

**Answer:**

Yes.

**Question:**

In Microsoft SharePoint Foundation and Microsoft SharePoint Server 2010 there is a Timer Job Definition called Gradual Site Delete, will the Microsoft IT Site Delete Capture work when this Timer Job Definition is enabled and what is this Timer Job Definition?

**Answer:**

Yes, the Microsoft IT Site Delete Capture will work with the Gradual Site Delete Timer Job Definition.

The Gradual Site Delete Timer Job Definition is designed to mitigate the impact of large site deletion in Microsoft SharePoint Foundation and Microsoft SharePoint Server 2010 environments.  Specifically as an example in Microsoft Office SharePoint Server 2007, when a site was deleted it called a stored procedure, proc.DeleteSite which walked through all of the tables in the content database and deleted the rows corresponding to the Id of the site being deleted, as a result up to 35 tables were touched as part of the site deletion process as a single transaction.  Knowing this delete operations will take a lock on the deleted rows and if the number of deleted rows exceeds a specific threshold, by default 5,000, SQL Server, in some cases, in the interest of efficiency will escalate the row locks to table locks – referred to as lock escalation.  Lock escalation will prevent user requests on the entire table which can leave the server unresponsive.

The Gradual Site Delete Timer Job Definition resolves this issue through implementing a process by which when a site collection is deleted the site entry (pointer) in dbo.SiteMap is removed from the configuration database and from dbo.Sites in the corresponding content database.  From an end user experience the site is deleted  and all access through the site Url in addition to its content is unavailable.  From this point the site deletion is then queued into dbo.SiteDeletion in the host content database where it is marked to be gradually deleted, this is where the Gradual Site Delete Timer Job Definition comes into play.  The Timer Job Definition \[Gradual Site Delete\] executes on a Daily schedule \[configurable\], and will continuously attempt to delete all the data for all the sites in its queue (dbo.SiteDeletion). It will delete the data in batches of a maximum of 1000 rows through multiple transactions to avoid escalation and can be resumed  in the event any failure occurs so that it can attempt the delete process again if required, once the site is completed deleted the dbo.SiteDeletion entry is removed.

Since the SiteDeleted event on which the Microsoft IT Site Delete Capture depends is called prior to calling the stored procedures there is no impact its the logic.