---
title: 'Introduction to Upgrade in SharePoint Server 2013'
date: Tue, 17 Jul 2012 14:47:00 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2013', 'SPC219', 'Upgrade &amp; Migration']
---

Introduction

Changing software can be difficult, SharePoint Server 2013 simplifies the upgrade process, empowers the user, and improves resiliency and manageability through new features and capabilities designed to balance the needs of users with those of IT.

What’s new in upgrade…

*   Deferred Site Collection Upgrade
*   Site Collection Health Checks
*   Evaluation Site Collections
*   Deprecated Upgrade Approaches

Separation of Schema and Site Collection Upgrade

Upgrade in SharePoint 2013 separates the aspects of site collection and schema upgrade improving performance and resiliency related to the upgrade process. When attaching a content database for upgrade schema elements to include security changes, Table Value Functions, Stored Procedures, etc. are upgraded to SharePoint 2013 schema and objects at the site collection level and below are retained in backward compatible SharePoint 2010 mode, site collection level objects are comprised primarily of sites, content, features, and coded site actions.

Deferred Site Collection Upgrade

Deferred Site Collection Upgrade enables a server farm administrator to defer the aspect of site collection upgrade to administrators of that site collection. Deferred Site Collection Upgrade takes advantage of the separation of schema and site collection upgrade enabling site collections in a content database upgraded to SharePoint 2013 to remain in a backward compatible SharePoint 2010 mode which is the default state for site collections in upgraded content databases. Site collections can then be upgraded independently by site collection administrators or alternatively can up upgraded by the server farm administrator through Windows PowerShell.

Configuring and Using Deferred Site Collection Upgrade

_Using the User Interface_

Deferred Site Collection Upgrade empowers site collection administrators to upgrade their individual site collections on their own schedule. When Deferred Site Collection Upgrade is enabled site collection administrators are notified through System Status Notifications that an upgrade is available. Site collection administrators can choose to upgrade immediately or temporarily dismiss the message and retain their site collection in a backward compatible SharePoint 2010 mode.

When a site collection administrator chooses to upgrade their site collection they can use the options available under Site Settings | Site Collection Administration to start the upgrade process.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/5314.DeferredSiteCollectionUpgrade.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/5314.DeferredSiteCollectionUpgrade.png)

Following the completion of upgrade, whether successful or failed, site collection administrators can view the upgrade log associated with that individual site collection in ULS format. The site collection upgrade log is useful in quickly identifying issues that may have been reported during the upgrade process and isolating those issues that are apparent in the user interface following an upgrade.

_Using Windows PowerShell_

Deferred Site Collection Upgrade while providing flexibility to site collection administrators can also be initiated by server farm administrators using Windows PowerShell. This method benefits server farm administrators by making available the performance and resiliency of schema and site collection upgrade when content databases are attached to a SharePoint 2013 farm and the flexibility to upgrade site collections over a fixed period of time.

Deferred Site Collection Upgrade can be enabled or disabled by a server farm administrator by setting the **SPSite.AllowSelfServiceUpgrade** property to False.

Windows PowerShell example using SPSite.AllowSelfServiceUpgrade:

> Set-SPSite –Identity [http://sharepoint.contoso.com](http://sharepoint.contoso.com) –AllowSelfServiceUpgrade <Option>

The SPSite.AllowSelfServiceUpgrade property is also available in SharePoint Online. An example of use in SharePoint Online follows:

> Set-SPOSite -Identity http://sharepoint.contoso.com -AllowSelfServiceUpgrade <Option>

The <Option> parameter values include $true or $false where $true enables Deferred Site Collection Upgrade and $false disables Deferred Site Collection Upgrade.

To learn more about the SPSite.AllowSelfServiceUpgrade property see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.allowselfserviceupgrade(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.allowselfserviceupgrade(v=office.15).aspx).

For IT organizations opting to perform site collection upgrades on behalf of their users, the Upgrade-SPSite cmdlet can be used as such in the following Windows PowerShell example:

> Get-SPSite -ContentDatabase WSS\_Content -Limit All | Upgrade-SPSite –VersionUpgrade

To queue all site collection within one or more content databases the _–QueueOnly_ parameter can be included in the above example (see Throttling later in this post).

System Status Notifications

System Status Notifications apprise site collection administrators and users of events that occur throughout the lifecycle of a SharePoint deployment such as available upgrade when leveraging Deferred Site Collection Upgrade, Evaluation Site Collections when offered in the environment, when a database is set to read-only mode, and when maintenance is performed in an environment such as when site collections are upgraded.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3644.image_thumb_2E3D46BF.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5707.image_4C7BEBE7.png)

Page rendering coexistence or compatibility range enables a server farm administrator to specify under which version of SharePoint a site collection can be provisioned in. SharePoint 2013 supports provisioning site collections in a backward compatible SharePoint 2010 mode where site collections features and visuals are limited to that provided by SharePoint 2010 or SharePoint 2013 mode where site collections features and visuals are limited to those provided by SharePoint 2013. A content database upgraded to SharePoint 2013 is capable of supporting both backward compatible SharePoint 2010 and SharePoint 2013 mode site collections. Page rendering coexistence enables a server farm administrator and developers to retain solutions and customizations developed explicitly for SharePoint 2010 in a SharePoint 2013 environment when using a backward compatibility model. SharePoint 2013 installs the necessary style sheets, JavaScript, features, templates, and assemblies necessary for processing and rendering content designed for SharePoint 2010.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/1050.PageRenderingCoexistence_Win8E.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/1050.PageRenderingCoexistence_Win8E.png)

Configuring Page Rendering Coexistence

The various site provisioning modes can be configured by a server farm administrator by setting the _**SPWebApplication.CompatibilityRange**_ property for the Web application.

> $w = Get-SPWebApplication –Url http://sharepoint.contoso.com
> 
> $w.CompatibilityRange = \[Microsoft.SharePoint.SPCompatibilityRange\]::<Mode>
> 
> $w.Update()

<Mode> parameter values include _OldVersions_, _NewVersion_, and _AllVersions_ where OldVersions specifies site collections should be limited to SharePoint 2010 mode, NewVersion specifies site collections should be limited to SharePoint 2013 mode, and AllVersions specifies site collections can be created in both SharePoint 2010 and SharePoint 2013 mode.

Site Collection Health Checks

Site Collection Health Checks are designed to support site collection administrators when performing self-service upgrades of their site collections and report known issues that may prevent a successful upgrade, and offer guidance on how to resolve those issues. In some cases an option is present to resolve those issues programmatically through the user interface, such as in the case of resetting a page to its definition.

Site Collection Health Checks can be run any time prior to the upgrade in addition to being available following the upgrade for routine maintenance of a site collection. Site Collection Health Checks are automatically run prior to upgrading a site collection – in the event an issue is discovered that would prevent a successful upgrade the site collection administrator will not be able to upgrade their site collection until that issue is resolved.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/4214.SiteCollectionHealthChecks.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/4214.SiteCollectionHealthChecks.png)

Site Collection Health Checks are available through Site Settings on individual site collections or can be run using Windows PowerShell:

> Test-SPSite -Identity [http://sharepoint.contoso.com](http://sharepoint.contoso.com)

To learn more about Site Collection Health Checks and Test-SPSite parameters refer to [http://technet.microsoft.com/en-us/library/jj219720(v=office.15).aspx](http://technet.microsoft.com/en-us/library/jj219720(v=office.15).aspx "http://technet.microsoft.com/en-us/library/jj219720(v=office.15).aspx").

Evaluation Site Collections

Site Collections Administrators can choose to perform an immediate upgrade (available through Site Settings) or optionally request an evaluation upgrade Site collection.

SharePoint Server 2013 enables site collection administrators to request a preview of their site prior to committing their production site collection to upgrade. This enables the site collection administration and users to validate the look, feel, and functionality of a site collection and establish a plan to address any issues without impacting their production content.

Evaluation Site Collections provide the same overall functionality that the production site collection on which it is based provides to include Search, customizations, and any associated Timer Job Definitions run on the Web application or server farm. Timer Job Definitions are responsible for the creation and subsequent management of Evaluation Site Collections. The Create Upgrade Evaluation Site Collections Timer Job Definition (runs daily between 1:00 and 1:30 A.M.) when run creates any Upgrade Evaluation Site Collections requested by their site collection administrator. Upgrade Evaluation Site Collections are created through two possible methods dependent on the version of Microsoft SQL Server used by the server farm.

*   SQL Server Snapshot

> If the server farm uses Microsoft SQL Server Enterprise or Datacenter editions Upgrade Evaluation Site Collections are created through leveraging native snapshot capabilities. There is no outage of the production site collection under these circumstances.

*   Backup and Restore

> If the server farm uses Microsoft SQL Server Standard edition or an edition that does not support snapshots, Upgrade Evaluation Site Collections are created through SharePoint backup and restore APIs. The production site collection will be placed in read-only mode for the duration of this process. The site collection administrators and users are notified of the read-only status through System Status Notifications.

An Upgrade Evaluation Site Collection is initially created as a copy of the production site collection on which it is based and then upgraded through the Upgrade Site Collections Timer Job Definition (runs every 1 minute).

Upgrade Evaluation Site Collections are set to automatically expire based on a fixed amount of time managed through the Delete Upgrade Evaluation Site Timer Job Definition (runs daily between 1:00 and 1:30 A.M.). The default expiration schedule for Upgrade Evaluation Site Collection is 30 days and supports configuration by a server farm administrator. The site collection administrator and users of an Upgrade Evaluation Site Collection are notified through System Status Notifications that the site collection is an Upgrade Evaluation Site Collection and its related expiration date.

Upgrade Evaluation Site Collections are deleted automatically when either the Upgrade Evaluation Site Collection expires or the production site on which it is based is upgraded by either the server farm administrator or site collection administrator.

Configuring Evaluation Site Collections

The server farm administrator, if desired, can prevent the request and creation of Upgrade Evaluation Site Collections using the **SPSite.AllowSelfServiceUpgradeEvaluation** property for one or more site collections.

**NOTE**

Content created or uploaded in an Upgrade Evaluation Site Collection is not replicated to the production site collection on which it is based and content created or uploaded in the production site collection is not replicated to the Upgrade Evaluation Site Collection after it is created.

Throttling

SharePoint Server 2013 introduces new throttling capabilities related to upgrade to prevent possible downtime where large volumes of site collections are simultaneously upgraded by their site collection administrators. Upgrade throttling capabilities are distributed across the Web application, content database, and content level limiting simultaneous upgrade to a predefined concurrency number – upgrade requests exceeding the maximum specified concurrency rate are placed in a queue to be processed when resources are available based on the concurrent executing upgrades.

Configuring Upgrade Throttling

The default maximum concurrency at the Web application level is limited to 5 concurrent upgrades per Web application instance. For example, in an environments where a single Web applications exists spanning two Web servers a maximum of 10 concurrent upgrades can be processed at any one point in time, all other upgrades across those Web applications are queued until resources become available for processing those upgrades.

A server farm administration can increase or decrease the default concurrency rate using the **SPWebApplication.SPSiteUpgradeThrottleSettings.AppPoolConcurrentUpgradeSessionLimit** property.

Windows PowerShell example using AppPoolConcurrentUpgradeSessionLimit

> $w = Get-SPWebApplication –Url http://sharepoint.contoso.com
> 
> $w.SiteUpgradeThrottleSettings.AppPoolConcurrentUpgradeSessionLimit=<Value>
> 
> $w.Update()

To learn more about _SPSiteUpgradeThrottlingSettings_ members see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spsiteupgradethrottlesettings\_members(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spsiteupgradethrottlesettings_members(v=office.15).aspx).

The default maximum concurrency at the content database level is limited to 10 concurrent upgrades per content database. For example, in an environment where only a single content database and Web application exist on a single server, a maximum of 5 concurrent upgrade can run at any one point in time based on the default concurrency rate set at the Web application level. In the event a single Web application exists that spans two Web servers, 10 concurrent upgrades can be processed.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7888.image_thumb_079B8DE7.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6303.image_40E21AA9.png)

A server farm administrator can increase or decrease the default concurrency rate using the **SPContentDatabase.ConcurrentSiteUpgradeSessionLimit** property.

To learn more about SPContentDatabase.ConcurrentSiteUpgradeSessionLimit see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spcontentdatabase.concurrentsiteupgradesessionlimit(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spcontentdatabase.concurrentsiteupgradesessionlimit(v=office.15).aspx).

Optionally the queue can be bypassed using the –Unthrottled parameter of the Upgrade-SPSite cmdlet.

> Upgrade-SPSite <http://site> -VersionUpgrade \[-Unthrottled\]

On-Premises Capabilities and Features

On-premises installations of SharePoint 2013 provide server farm and site collection administrators the full suite of upgrade capabilities described previously and enable configuration of those capabilities across the server farm.

SharePoint Online Capabilities and Features

SharePoint Online makes available to site collection administrators Deferred Site Collection Upgrade, Site Collection Health Checks, and Upgrade Evaluation Site Collections. Capabilities and features scoped at the Web application and farm level are not available to consumers of SharePoint Online which include:

*   Scheduling of Upgrade Evaluation Site Collection creation
*   Scheduling of Upgrade Evaluation Site Collection deletion
*   Configuration of upgrade throttling
*   Enabling/disabling of the creation Upgrade Evaluation Site Collections

Deprecated Upgrade Methods

SharePoint Server 2013 improves the way IT Professionals can approach upgrading, from Deferred Site Collection Upgrade to new Upgrade Evaluation Site Collections. In SharePoint Server 2013, the In-place Upgrade approach is now unavailable for upgrading from prior versions of SharePoint products. The In-place Upgrade approach allowed an administrator to install a newer version of SharePoint on the same hardware as the existing, older version of SharePoint; however, as a result there was no method to overcome failure beyond restoring the original environment from backup. SharePoint Server 2013 focuses on improving your upgrade options while providing support for the upgrade approach designed to be the most resilient: the Database Attach approach.

A database attach upgrade enables you to move to new hardware or a new farm. During a database attach upgrade, you detach all of the content databases from an existing farm and then attach the databases to a new server farm installation. When you attach the databases to the new server farm, the upgrade process runs and upgrades the data in place. The database attach approach is designed to provide a greater level of safety in the event the upgrade process fails or an error is encountered, because the original environment is not affected.

While the In-place Upgrade approach has been removed in SharePoint Server 2013 for version to version upgrades (i.e., SharePoint Server 2010 -> SharePoint Server 2013), you can continue to use it in build to build scenarios, such as the installation of a cumulative update or service pack.

In summary, upgrade has been redesigned to support the needs of both the server farm and site collection administrators, and their users – as a result improving performance, resiliency, and adoption.

Resources

[Learn more about SharePoint Server 2013](http://technet.microsoft.com/sharepoint)

[Learn more about upgrade and migration in SharePoint Server 2013](http://technet.microsoft.com/en-US/sharepoint/fp142375)

[Use Windows PowerShell to upgrade to SharePoint 2013 and migrate data](http://technet.microsoft.com/en-us/library/ee906560(office.15))

[Troubleshoot site collection upgrade issues in SharePoint 2013](http://technet.microsoft.com/en-us/library/jj219648(v=office.15).aspx)

[Review site collections upgraded to SharePoint 2013](http://technet.microsoft.com/en-us/library/jj219531(v=office.15).aspx)

[SharePoint Server 2013 Upgrade Training](http://www.microsoft.com/resources/msdn/en-us/office/media/courseviewer/CourseViewerR5MOD1.htm?CourseXmlFile=http://www.microsoft.com/resources/msdn/en-us/office/media/courseviewer/SharePoint2013TrainingITPro_MOD1.xml&Operation=LoadModule&Module=12)