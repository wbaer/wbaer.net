---
title: 'Navigating List View Thresholds in SharePoint Server 2016 IT Preview'
date: Thu, 27 Aug 2015 18:31:08 +0000
draft: false
tags: ['Performance', 'SharePoint', 'SharePoint Server 2016']
---

Overview
========

In SharePoint Server 2013 the List View Threshold specified the maximum number of list or library items that a database operation, such as a query, can process at the same time outside the daily time window set by the administrator during which queries are unrestricted. In SharePoint 2013 the List View Threshold is set to 5,000 or 20,000 for users and auditors respectively. Typically a users’ initial experience with List View Threshold is when it has been exceeded, the resultant error: The number of items in this list exceeds the list view threshold, which is 5000 items” as documented at [https://support.microsoft.com/en-us/kb/2759051/](https://support.microsoft.com/en-us/kb/2759051/).

The List View Threshold controls Front End and Backend interaction to prevent disruptions in service to other users whose Site Collections are contained in the same Content Database as the executing query which prompts the threshold.  For additional information see also List and library limits at [https://technet.microsoft.com/en-us/library/cc262787.aspx](https://technet.microsoft.com/en-us/library/cc262787.aspx).

The List View Threshold and subsequent boundary of 5,000 was designed to mitigate lock escalation within SQL Server, I.e. lock escalation occurs when a single Transact-SQL statement acquires at least 5,000 locks on a single non-partitioned table or index – effectively a row lock escalates to a table lock, blocking all subsequent requests – or otherwise converts many fine-grain locks into fewer coarse-grain locks preventing other operations from completing. Each view request within a List is effectively the result of a query against one or more database tables.

In SharePoint Server 2016 IT Preview databases are no longer subject to lock escalation; however, a List View Threshold is enabled (configurable) on a per Web Application basis.  In addition SharePoint Server 2016 IT Preview provides several new capabilities designed to mitigate potential performance degradation related to queries which may impact performance for other users.

List View Auto-Indexing
=======================

In SharePoint Server 2016 IT Preview a Timer Job (Large list column index management) examines the views in Lists that exceed 2,500 items. In the event a view definition would benefit from a column index, one is programmatically created. For example, if a view includes a filter for “WHERE A=1 AND B=2”, the Timer Job will create an index on either column A or column B. The specific choice depends on the other view definitions in the list, with the goal of minimizing the number of indexes created.

[![ColumnIndexManagement](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ColumnIndexManagement_thumb_3D1ADCA8.png "ColumnIndexManagement")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ColumnIndexManagement_65FE3F9E.png)

List View Auto-Indexing is applicable to Lists which are enabled for automatic management of indices which is the default configuration for Lists in SharePoint Server 2016 IT Preview. 

[![AutomaticIndexManagement](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/AutomaticIndexManagement_thumb_7DE63427.png "AutomaticIndexManagement")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/AutomaticIndexManagement_765664FF.png)

Automatic Index Management allows the Timer Job to maintain column indices on Lists to provide optimal query performance within views associated with the List.

Increased Effective Threshold
=============================

The List View Threshold is not only applicable to List views, but also includes any database operation which potentially involves scanning of a large number of rows (non-List view operations).

An example of a non-List view operation would be a scenario in which a non-privileged user is unable to create a column index in a List which exceeds 5,000 items as the result of that operation would require both the reading of more than 5,000 items from one database table and writing more than 5,000 items into another, in this case the NameValuePair index table.  Under these case SharePoint Server 2016 IT Preview improves support for a subset of these operations such as creating or removing a column index, permissions inheritance, and deleting a column.

Query Engine Improvements
=========================

In addition improvements have been made to the query engine on large Lists to enable it to better anticipate when a query should be throttled by recognizing specific query patterns that rely on built-in indexes such as Item Id, Document GUID, File Path, etc. and allow those operations.

Document Library Views
======================

Improvements in out of the box Document Library views have been improved to address throttling related to sort ordering.  For example, the default view on a Document Library is to sort folders before files.  In a large List scenario, this can result in the view to the throttled as it’s necessary for SQL to scan the entire List to find all of the folders in order to satisfy the sort criteria.  In SharePoint Server 2016 IT Preview the folder first sort criteria is omitted in the event it would result in throttling of the query. 

To learn more about SharePoint Server 2016 IT Preview see also [https://technet.microsoft.com/en-us/library/cc262787.aspx](https://technet.microsoft.com/en-us/library/cc262787.aspx "https://technet.microsoft.com/en-us/library/cc262787.aspx").