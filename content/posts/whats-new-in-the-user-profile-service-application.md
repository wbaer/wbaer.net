---
title: 'What''s new in the User Profile Service Application'
date: Tue, 03 Apr 2012 16:17:00 +0000
draft: false
tags: ['Service Pack 1', 'SharePoint', 'SharePoint Server 2010']
---

The User Profile Service Application stores information about users in a centralized location used by SharePoint’s social computing features to support natural collaboration.  The User Profile Service Application is also required when provisioning My Site personal sites, enabling certain social computing features such as newsfeeds, and the creation and distribution of user profiles across server farms or sites.

To learn more about the User Profile Service Application see also [http://technet.microsoft.com/en-us/library/ee662538.aspx](http://technet.microsoft.com/en-us/library/ee662538.aspx).

The User Profile Service Application is based on technologies provided through ForeFront Identity Manager which provides a comprehensive solution for identity and credential management and identity-based access policies.

To learn more about ForeFront Identity Manager see also [http://www.microsoft.com/en-us/server-cloud/forefront/identity-manager.aspx](http://www.microsoft.com/en-us/server-cloud/forefront/identity-manager.aspx).

Since RTM the User Profile Service Application has been incrementally improved through Cumulative Updates and Service Packs to improve both its performance and resiliency.  Recent improvements include:

*   Parallel SharePoint, Active Directory, and Business Connectivity Services import and export support
*   ForeFront Identity Manager performance improvements
*   Reduction of full table scans and indexing specific user properties
*   Batch import of Business Connectivity Services user properties
*   Removed automatic provisioning of users and groups to ILM MA
*   Programmatic cleanup of large run histories
*   Resolution of AD-Contact objects in ForeFront Identity Manager as opposed to SharePoint Server 2010

As a result of these improvements there has been a dramatic reduction of the time required to import user information into SharePoint.  For example, inside of Microsoft on the RTM version of SharePoint Server 2010 with 100,000 users our profile import duration for full synchronization commonly required 2 weeks to complete and 2-3 days to support an incremental synchronization.  This same scenario on SharePoint Server 2010 with the December 2011 Cumulative Update has been reduced to 120-140 for a full synchronization and 6 hours for an incremental synchronization.

If you’re experience delays in importing users and properties or are just looking to improve the security, reliability, and performance of your SharePoint 2010 environment we recommend installing the latest Cumulative Update or Service Pack.

**Resources**

[Download SharePoint Server 2010 Service Pack 1](http://support.microsoft.com/kb/2460045 "Download SharePoint Server 2010 Service Pack 1")  
[Download the SharePoint Server 2010 February 2012 Cumulative Update](http://support.microsoft.com/kb/2597150 "Download the SharePoint Server 2010 February 2012 Cumulative Update")