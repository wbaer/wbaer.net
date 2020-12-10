---
title: 'Service Pack 1 - Site Recycle Bin'
date: Tue, 28 Jun 2011 20:00:00 +0000
draft: false
tags: ['Administration', 'Service Pack 1', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

**Site Recycle Bin**

Service Pack 1 introduces long awaited Site Recycle Bin functionality that enables self-service recovery of site collections and sites. In the past IT Professionals were tasked with restoring entire databases to recover deleted site collections and sites and would generally require expensive restore environments to support the task. Now in Service Pack 1 administrators can quickly and easily recover site collections and sites accidentally deleted by their owners in a process similar to that of the Recycle Bin we have for Lists, Libraries, and Documents.

The Site Recycle Bin leverages [Gradual Site Delete](http://blogs.technet.com/b/wbaer/archive/2010/08/02/gradual-site-delete-in-sharepoint-2010.aspx) through implementing a delay between Gradual Site Delete and permanent deletion of the deleted Site Collection.

_User Interface_

Users are presented with new text when deleting Sites instructing users that all site content will be sent to the site collection Recycle Bin (see Figure 1 Deleting [http://sharepoint.contoso.com/sites/customers/Fabrikam](http://sharepoint.contoso.com/sites/customers/Fabrikam)).

Figure 1 Deleting [http://sharepoint.contoso.com/customers/Fabrikam](http://sharepoint.contoso.com/customers/Fabrikam)

[![DeleteSite1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7382.DeleteSite1_thumb_54E2D937.png "DeleteSite1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2570.DeleteSite1_1C382F2A.png)

_Site Restore_

Site Collection administrators can restore deleted Sites in the same manner through which Items, Lists, and Libraries are restored through the Recycle Bin; however, the size of the Site is not reported through the user interface which differs from content to include Items, Lists, and Libraries.  To restore a Site, the Site Collection administrator selects the checkbox next to the Site to be restored and selects Restore Selection (see Figure 2 Restoring [http://sharepoint.contoso.com/sites/customers/Fabrikam](http://sharepoint.contoso.com/sites/customers/Fabrikam)).

Figure 2 Restoring [http://sharepoint.contoso.com/sites/customers/Fabrikam](http://sharepoint.contoso.com/sites/customers/Fabrikam)

[![DeleteSite2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1512.DeleteSite2_thumb_3B7AD5FD.png "DeleteSite2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4743.DeleteSite2_7BB0EF77.png)

**NOTE**

In the event the Site has been recreated using the same Url, the Site must first be renamed or deleted for the restore to succeed; however, when restoring My Site personal sites, any newly created My Site personal site using the same Url as the Site to be restored is overwritten.

The Site Recycle Bin in SharePoint 2010 leverages the retention policies specified at the Web application level for the Recycle Bin in SharePoint 2010.

**Object Model**

SPWebApplication.GetDeletedSites(Url) returns a SPDeletedSitesCollection that contains all SPDeletedSites with the specified Url.

SPDeletedSiteCollection

SPDeletedSiteCollection represents a collection of SPDeleteSite objects or Site Collections that are associated with a particular Web application, including a top-level Web site and all its sub-sites.

SPDeletedSite

SPDeletedSite represents a collection of deleted sites in a Web application, including a top-level Web site and all its subsites.

_SPDeletedSite Properties_

SiteId returns the Site Id (GUID) associated with the specified SPDeletedSite.

Url returns the Url associated with the specified SPDeletedSite.

ContentDatabaseId returns the Id of the Content Database associated with the deleted Site.

Restore restores the deleted site collection.

To learn more about Service Pack 1 for SharePoint 2010 see my post on the SharePoint Team Blog at [http://sharepoint.microsoft.com/blog/Pages/BlogPost.aspx?pID=973](http://sharepoint.microsoft.com/blog/Pages/BlogPost.aspx?pID=973 "http://sharepoint.microsoft.com/blog/Pages/BlogPost.aspx?pID=973").