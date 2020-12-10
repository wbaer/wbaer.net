---
title: 'Notes on SQL Server 2000/2005 Log Shipping with SharePoint Products and Technologies'
date: Thu, 13 Mar 2008 17:13:00 +0000
draft: false
tags: ['Replication and Availability', 'Uncategorized']
---

As Microsoft SharePoint Products and Technologies becomes more business critical for organizations, data protection and redundancy become primary objectives in any size[![paperclip](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/f5ed48e2ae02_56A2/paperclip_thumb.jpg)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/f5ed48e2ae02_56A2/paperclip_2.jpg) deployment. Disaster recovery and redundancy can be achieved using any of a collection of available technologies to include SQL Server 2005 Database Mirroring for redundancy and hardware or software-based replication solutions for disaster recovery or geographic replication.

One of the most seamless methods available to a SharePoint deployment for geographic replication is SQL Server 2000/2005 Log Shipping.  SQL Server 2000/2005 Log Shipping provides a mechanism by which you can increase the availability of SQL Server databases by automatically copying and restoring transaction logs associated with those databases to a standby server that can be within the same datacenter as the host server or a separate geographic location.

This article discusses the limitations and constraints associated with SQL Server 2000/2005 Log Shipping with SharePoint Products and Technologies.  To learn more about SQL Server 2000/2005 Log Shipping see the SQL Server 2000/2005 Books Online.

SQL Server 2000 Books Online:  [http://msdn2.microsoft.com/en-us/library/aa256841.aspx](http://msdn2.microsoft.com/en-us/library/aa256841.aspx "http://msdn2.microsoft.com/en-us/library/aa256841.aspx")

SQL Server 2005 Books Online:  [http://msdn2.microsoft.com/en-us/library/ms130214.aspx](http://msdn2.microsoft.com/en-us/library/ms130214.aspx "http://msdn2.microsoft.com/en-us/library/ms130214.aspx")

**Limitations and Constraints (SharePoint Products and Technologies)**

**Configuration Database (Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007)**

The configuration database and SharePoint 3.0 Central Administration content database are inter-dependent, therefore cannot be log shipped separately or at all for that matter due to hard-coded information about the servers (dbo.Objects), server roles, services provisioned on each of those servers, and other information specific to the host server farm. In a SQL Server 2000/2005 Log Shipping scenario you should consider configuring your standby server farm with a new configuration database and SharePoint 3.0 Central Administration database. Web parts, custom code/applications. and configuration settings should be reapplied to the standby server farm due to their dependencies on the configuration database in addition to the consideration that WFE-based components, including applications/customizations, GAC assemblies, etc. are not addressed in a log shipping scenario and require reapplication on the standby server farm.

**Search (Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007)**

The search database cannot be log shipped to the standby server farm due to synchronization dependencies on the Shared Services Provider and search index; failover to the standby server farm will require a re-crawl of your content to provide the search experience previously available on the primary server farm.  (See also notes specific to Content Databases - _Search_).

**NOTE** To mitigate the impact on recovering search, consider the using the native backup and restore in Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 to backup search components, e.g. index to be restored on the destination server farm, while this will still require a re-crawl of your SharePoint content, your external, non-SharePoint content will remain intact.  Also consider applications such as [SSPC](http://blah.winsmarts.com/2006-11-Solving_an_interesting_deployment_scenario_in_SharePoint_2007.aspx) ([http://blah.winsmarts.com/2006-11-Solving\_an\_interesting\_deployment\_scenario\_in\_SharePoint\_2007.aspx](http://blah.winsmarts.com/2006-11-Solving_an_interesting_deployment_scenario_in_SharePoint_2007.aspx "http://blah.winsmarts.com/2006-11-Solving_an_interesting_deployment_scenario_in_SharePoint_2007.aspx")) to backup and restore managed and crawled properties.

**Shared Services Provider Database (Microsoft Office SharePoint Server 2007)**

The Shared Services Provider database can be log shipped to a standby server farm; however, must be manually reconnected to the destination server farm and reassigned a  server provisioned with the index role in that farm.  The Shared Services Provider database can be restored using the SharePoint Administration Tool (STSADM) restoressp operation, see [http://technet.microsoft.com/en-us/library/cc262163.aspx](http://technet.microsoft.com/en-us/library/cc262163.aspx "http://technet.microsoft.com/en-us/library/cc262163.aspx").

**NOTE** The restoressp operation only applies to Microsoft Office SharePoint Server 2007 and requires an index server to execute successfully.

**Content Databases (Windows SharePoint Services 3.0)**

Windows SharePoint Services 3.0 content databases can be attached to the standby farm where they will reside in \*read-only mode, this will allow the content to be available for viewing and where desired crawled by the localized Windows SharePoint Services 3.0 or Microsoft Office SharePoint Server 2007 Search services.  \*IMPORTANT Applies only when the database load state is configured in standby mode, the recommended database load state is no recovery mode and users should be terminated in the database.  Read operations can potentially generate an exclusive lock on the destination database causing log shipping to become out of sync.

**NOTE** See [http://support.microsoft.com/kb/894631](http://support.microsoft.com/kb/894631 "http://support.microsoft.com/kb/894631") for important notes on Windows SharePoint Services 3.0 content databases configured as read-only.

**People**

People information will not be available in the standby server farm where the Shared Services Provider database is log shipped until the Shared Services Provider database is restored, an indexer assigned, and the associated people operations run; however, you may opt to discard the Shared Services Database, create a new Shared Services Provider on the standby server farm and enable operations to include Directory Services import, Audience Compilation, etc., this minimizes downtime in the event of failover since the operations will have already been configured and running as scheduled.

**Notes specific to Content Databases**

**_Search_**

In Microsoft Office SharePoint Server 2007 you will need to create a new Shared Service Provider on the standby farm to enable crawling of log shipped Windows SharePoint Services 3.0 content databases where the primary server farm is online; otherwise, you may optionally crawl the content post-failover where log shipping the Shared Services Provider database and the database has been reattached and assigned an indexer.  If you prefer to backup and restore the search components to the standby server farm from the primary server farm you will need to re-crawl the Windows SharePoint Services 3.0 content databases; however, any external content previously crawled, e.g. file shares, HTTP, etc. will not need to be re-crawled.

**_Site Collection Availability_**

Site collections created in the primary server farm will not be available for browsing in the destination server farm until the destination server farm site map has been updated with the corresponding entries, the site map table (dbo.SiteMap) stores a list of site collection URLs, associated identifiers including database identifiers, and upgrade information in addition to information about the site collection, for example, whether or not it is a host header-based site collection or path-based site collection..  You can refresh the site map by either detaching and re-attaching the Windows SharePoint Services 3.0 content databases through the SharePoint 3.0 Central Administration user interface, the SharePoint Administration Tool (STSADM) addcontentdb and deletecontentdb operations ([http://technet.microsoft.com/en-us/library/cc262486.aspx](http://technet.microsoft.com/en-us/library/cc262486.aspx "http://technet.microsoft.com/en-us/library/cc262486.aspx")), or optionally script the operation to run periodically through the Object Model using the SPContentDatabaseCollection Delete and Add methods.  See [http://support.microsoft.com/kb/894631](http://support.microsoft.com/kb/894631 "http://support.microsoft.com/kb/894631") for important notes on Windows SharePoint Services 3.0 content databases configured as read-only.

**_Profile and Membership Synchronization_**

When moving Windows SharePoint Services 3.0 content databases in Microsoft Office SharePoint Server 2007 you must prepare the content databases to be attached to the destination server by setting up the profile and membership synchronization service to prevent the synchronization service from failing and losing user privacy settings for those sites after the sites are moved.  The profile and membership synchronization service synchronizes user profile data down to the user information lists for all site collections to ensure consistent user data across the environment. The service also synchronizes site membership data back to the user profiles that store all of the sites where the user is a member. This site membership data is displayed on the user’s My Site.  For more information see [http://technet.microsoft.com/en-us/library/cc262122.aspx](http://technet.microsoft.com/en-us/library/cc262122.aspx "http://technet.microsoft.com/en-us/library/cc262122.aspx").

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/f5ed48e2ae02_56A2/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/f5ed48e2ae02_56A2/image_2.png)

The illustration above depicts a typical SQL Server 2000/2005 Log Shipping example where a (or) collection of Windows SharePoint Services 3.0 content databases are log shipped to a standby server and attached to the standby server farm as read-only.  The Shared Services Provider database denoted in red is offline until failover is complete and the Shared Services Provider database attached to the standby server (See Shared Services Provider Database (Microsoft Office SharePoint Server 2007) above), in this scenario, the content in the destination server farm cannot be crawled until the Shared Services Provider is  provisioned through restoring the database and assigning an Indexer in the standby server farm.  In some scenarios you may wish to create a new Shared Service Provider in the standby server farm to enable crawling of content and people and profile operations on the destination server farm while the host server farm is online.  Databases denoted in blue are those databases that cannot be log shipped to the standby server farm and should therefore be newly created on the standby server farm.

Next time - Implementing SQL Server 2000/2005 Log Shipping with SharePoint Products and Technologies

**Resources**

[Understanding Log Shipping](http://msdn2.microsoft.com/en-us/library/ms187103.aspx)

[Log Shipping in SQL Server 2000](http://msdn2.microsoft.com/en-us/library/aa496029.aspx)

[Using SQL Server Database Mirroring with Office SharePoint Server and Windows SharePoint Services](http://go.microsoft.com/fwlink/?LinkId=83725&clcid=0x409)

[How to enable Log Shipping (SQL Server Management Studio)](http://msdn2.microsoft.com/en-us/library/ms190640.aspx)

[How to enable Log Shipping (T-SQL)](http://msdn2.microsoft.com/en-us/library/ms188708.aspx)

[Database Maintenance for Microsoft SharePoint Products and Technologies](http://go.microsoft.com/fwlink/?LinkId=111531&clcid=0x409)