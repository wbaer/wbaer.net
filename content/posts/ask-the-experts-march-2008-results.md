---
title: 'Ask the Experts - March 2008 Results'
date: Tue, 01 Apr 2008 09:41:53 +0000
draft: false
tags: ['Ask the Experts', 'Uncategorized']
---

**The Index server, is it a single point of failure?**

One of the most common concerns is that of the index server role (Microsoft Office SharePoint Server 2007) as a single point of failure in a server farm; however, there is a misconception that you are limited to a single index server per server farm, while the index server role is limited within a server farm, the limitation is strictly association with a Shared Services Provider.  A Shared Services Provider can have only one (1) index server assigned; however, a server farm can host up to 20 Shared Services Providers (maximum, 3 (three) recommended) with a single search index associated with each index server supporting up to 50,000,000 items.

The general index server role rules in Microsoft Office SharePoint Server 2007 are:  the index role cannot be redundant; however the index server role can be deployed to multiple servers though those servers are not redundant for example the index role is configured to crawl content and generate content indexes - where these roles are deployed to multiple servers, each server will crawl different content.  An index server can be associated with multiple Shared Services Providers though indexes across Shared Services Providers cannot be combined, redundancy is provided through query server role where the query server role is distributed across multiple servers in a server farm as the content index will be propagated to those servers.

Index server redundancy can be achieved through various designs, including that of:

... a Shared Services Provider and index server in a separate secondary server farm crawling the same content as that of the index server in the primary server farm, this provides server farm level redundancy in the event of complete loss of the primary server farm

... or by establishing content sources and crawl rules assigned to specific Shared Services Providers you can optionally configure independent index servers assigned to those Shared Services Providers to minimize content index loss in the event a server fails

... or consider performing regular backups of the search components using the native backup and restore available in Microsoft Office SharePoint Server 2007 and in the event the primary index server fails, restore the backup to the secondary, standby index server or to the primary index server when restored.  (See also [2005 Log Shipping with SharePoint Products and Technologies](http://blogs.technet.com/wbaer/archive/2008/03/13/sql-server-2000-2005-log-shipping-notes-with-sharepoint-products-and-technologies.aspx "2005 Log Shipping with SharePoint Products and Technologies") for additional information on replication scenarios and limitations).  See [http://technet.microsoft.com/en-us/library/cc263441.aspx](http://technet.microsoft.com/en-us/library/cc263441.aspx "http://technet.microsoft.com/en-us/library/cc263441.aspx") for additional information on using the SharePoint Administration Tool (STSADM) backup operation.

... keep in mind in the event the index server is lost or fails the query servers will continue to use the locally available (propagated) content indexes until either the index service is restored; however, new or changed content will not be available to the results while the index role is unavailable.

The important thing to remember when designing a search topology is that careful planning and understanding the role-based limitations in a Microsoft SharePoint Products and Technologies server farm can help to create a redundant solution where the specific role may not natively support high availability/redundancy.

**How do I..**

Another question I received is much easier to provide an answer to; the question being a method to obtain information about a collection of sites to include hits and a count of site collections on a Web application.

```
 1: class Program
``````
 2: {
``````
 3:     static public string oUrl = null;
``````
 4:     static void Main(string\[\] args)
``````
 5:     {
``````
 6:         // Initialize a new instance of the System.Uri class.
``````
 7:         System.Uri uri = new System.Uri(oUrl);
``````
 8:         // Find the Web application with the specified URL as
``````
 9:         // defined in Program.oUrl.
``````
 10:         SPWebApplication WebApp = SPWebApplication.Lookup(uri);
``````
 11:         // Get a collection of all the sites in the Web application
``````
 12:         // defined by Program.oUrl
``````
 13:         SPSiteCollection Sites = WebApp.Sites;
``````
 14:  
``````
 15:         foreach (SPSite Site in Sites)
``````
 16:         {
``````
 17:             // Gets the number of SPSite objects in the collection of all 
``````
 18:             // sites in this Web application.
``````
 19:             Console.WriteLine(WebApp.Sites.Count.ToString());
``````
 20:             // Gets the full URL to the root Web site of the site collection.
``````
 21:             Console.WriteLine(Site.Url.ToString());
``````
 22:             // Gets the cummulative number of hits on the site collection, 
``````
 23:             // which is tracked by the usage analysis code.
``````
 24:             Console.WriteLine(Site.Usage.Hits.ToString());
``````
 25:         }
``````
 26:     }
``````
 27: }
```

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).

There are a variety of methods that can be used to obtain similar information including using the sum of site collections in each content database as reported by SharePoint 3.0 Central Administration and viewing storage information for a site collection under Site Settings | Storage space allocation; however, the API provides a method by which this information can be exposed across a collection of sites on a Web application.  The sample code above illustrates a method by which a site collection count, Url, and hits can be derived for a collection of all the sites in a Web application.  For general reporting and discovery purposes you should also consider the [SharePoint Asset Inventory Tool](http://blogs.technet.com/wbaer/archive/2008/02/21/announcing-the-beta-release-of-the-sharepoint-asset-inventory-tool.aspx).