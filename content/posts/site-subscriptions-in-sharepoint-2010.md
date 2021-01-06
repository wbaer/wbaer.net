---
title: 'Site Subscriptions in SharePoint 2010'
date: Fri, 07 May 2010 10:58:01 +0000
draft: false
tags: ['SharePoint Foundation 2010', 'SharePoint Server 2010']
---

New multi-tenancy features are an exciting concept in SharePoint 2010, particularly when considering the implications on hosting SharePoint for a variety of tenants, each requiring some method of partitioning, administration, and a method of reporting and control whether within the boundaries of an Enterprise or as a hosting provider.  In this post we’ll look at one of the layers of multi-tenancy in SharePoint 2010.

**Site Subscriptions**

SharePoint 2010 provides support for a concept known as site subscriptions.  Site subscriptions can be loosely described as a collection of sites that subscribe to a set of service partitions, settings, and individual features – site subscriptions are also known as tenants.  In summary we can approach site subscriptions as a loose association of content.  In the Object Model site subscriptions are represented through Microsoft.SharePoint.SPSiteSubscription.

The management of site subscriptions occurs through a new administration site template, Tenant Administration, that is used to manage many aspects of the site collections that subscribe from the subscription.

Creating a new site subscription object in SharePoint Server 2010 requires an administrator to:

1.  Create a SPSiteSubscription object
2.  Create and add a SPSite object to the SPSiteSubscription

Included below are both Windows PowerShell and Object Model examples that will enable the creation, assignment, identification, and deletion of site subscriptions in SharePoint 2010.

Creating Site Subscriptions with Windows PowerShell
---------------------------------------------------

**Create a Site Subscription**

$subscription\=New-SPSiteSubscription

**Create a Tenant Administration Site**

$site\=New-SPSite –Url http://<server>/<path>/<site> –Template TenantAdmin#0 –OwnerEmail [someone@example.com](mailto:someone@example.com) –OwnerAlias <domainuser> –SiteSubscription $subscription

Optionally when using an existing Tenant Administration site you can use:

$site\=Get-SPSite http://<server>/<path>/<site>

Set-SPSite –Identity $site –SiteSubcription $subscription

**Assign the Tenant Administration Site**

Set-SPSiteAdministration –Identity http://<server>/<path>/<site> –AdministrationSiteType TenantAdministration

Upon completion of the steps above (or below) you will have a new Tenant Administration site collection that will appear similar to the illustration below (click to enlarge).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SiteSubscriptionsinSharePoint2010_D9A7/image_thumb.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SiteSubscriptionsinSharePoint2010_D9A7/image_2.png)

On the Tenant Administration site collection select Manage Site Collections under SharePoint Sites to manage the properties of existing site subscription member site collections or add new sites to the site subscription (requires Self-Service Site Creation to be enabled on the Web application).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SiteSubscriptionsinSharePoint2010_D9A7/image_thumb_1.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SiteSubscriptionsinSharePoint2010_D9A7/image_4.png)

Creating Site Subscriptions through the Object Model
----------------------------------------------------

// Get an existing Tenant Administration Site  
using (SPSite site = new SPSite("[http://<server](http://<server)\>/<path>/<site>"))  
{  
    // Create a Site Subscription  
    SPSiteSubscription subscription = SPSiteSubscription.CreateSubscription(); // Add the Tenant Administration Site to the Site Subscription  
    subscription.Add(site);  
}

Locating a Site Subscription with Windows PowerShell
----------------------------------------------------

Get-SPSiteSubscription –Identity http://<server>/<path>/<site>

Optionally to get all site subscriptions you can use:

Get-SPSiteSubscription

Location a Site Subscription through the Object Model
-----------------------------------------------------

The SPFarm.SiteSubscriptions property can be used to get all site subscriptions available in the farm.  For additional information on the SPFarm.SiteSubscriptions property see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spfarm.sitesubscriptions(office.14).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spfarm.sitesubscriptions(office.14).aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spfarm.sitesubscriptions(office.14).aspx").

The SPSite.SiteSubscription property can be used to get the site subscription that the Site Collection is assigned.  For additional information on the SPSite.SiteSubscription property see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.sitesubscription(office.14).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.sitesubscription(office.14).aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spsite.sitesubscription(office.14).aspx").

The SPContext.SiteSubscription property can be used to get the site subscription that the site collection is assigned.  For additional information on the SPContext.SiteSubscription property see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spcontext.sitesubscription(office.14).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spcontext.sitesubscription(office.14).aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spcontext.sitesubscription(office.14).aspx").

Deleting a Site Subscription with Windows PowerShell
----------------------------------------------------

Remove-SPSiteSubscription -Identity [//">//">http://<server>/<path>/<site>](http://<server>/<path>/<site>)

Optionally to delete all site subscriptions you can use:

Get-SPSiteSubscription | Remove-SPSiteSubscription

Deleting a Site Subscription through the Object Model
-----------------------------------------------------

// Get the Tenant Administration Site  
using(SPSite site = new SPSite("[http://<server](http://<server)\>/<path>/<site>"))  
{  
    SPSiteSubscription subscription = site.Subscription;  
    subscription.Delete();  
}

Backing up a Site Subscription
------------------------------

The last scenario in this post to managing site subscriptions is the backup scenario.  The following Windows PowerShell examples can be used to backup and restore site subscriptions.

**Get the Site Subscription Id**

$id\=Get-SPSiteSubscription [http://<server](http://<server)\>/<path>/<site>

**Backup all Site Collections in the Site Subscription**

Get-SPSiteSubscription http://<server>/<path>/<site> -ReturnSites | Backup-SPSite –Path “\\<server><share>”+$\_.Title+”.bak”

**Backup the Site Subscription Settings**

Export-SPSiteSubscriptionSettings –id $id –path “\\<server><share><subscription>\_settings\_backup”

**NOTE**

http://<server>/<path>/<site> represents the full path to the Tenant Administration site collection.  Restoring a site subscription and its member sites is the opposite of the above, I.e. Import-, etc.