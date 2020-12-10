---
title: 'Programmatically Modifying Portal Site Connection Properties'
date: Mon, 23 Jul 2007 22:49:00 +0000
draft: false
tags: ['Code Samples', 'Uncategorized']
---

I recently received a request asking 1) if a site collections portal site connection can be programmatically replaced or modified and 2) can this be accomplished on a schedule without implementing a provisioning intercept or callback based on Site Directory metadata.

First let's examine the first question:

1) Can a site collections portal site connection be programmatically replaced or modified...the simple answer is yes.  Using the Sites property of the Microsoft.SharePoint.Administration.WebApplication class to return a SPSiteCollection object representing a collection of site collections on a Web application.  Using the Sites property you can use an indexer to return a single site collection from the collection or alternately return all site collections in the collection.

In the latter you can use a local variable siteUrl to get the requested Web application or optionally specify a Url using System.Uri uri = new System.Uri([http://contoso](http://contoso/));.  The sample code below uses a siteUrl local variable that can be passed as an argument in a console application.

> ```
>             SPFarm GlobalAdministration = new SPFarm();
>             System.Uri uri = new System.Uri(http://www.contoso.com);
>             SPWebApplication WebApplication = SPWebApplication.Lookup(uri);
>             SPSiteCollection SiteCollections = WebApplication.Sites;
> 
> ```

Now that you've associated a Web application with the request you can iterate through the site collections in the collection:

> ```
> foreach (SPSite SiteCollection in SiteCollections)
> {
> 
> ```

To update the portal site connection you can:

> ```
> SiteCollection.PortalName = "Contoso Home";
> SiteCollection.PortalUrl = [http://www.consoto.com](http://www.consoto.com/);
> ```

Putting it all together:

> ```
>             SPFarm GlobalAdministration = new SPFarm();
>             System.Uri uri = new System.Uri(http://www.contoso.com);
>             SPWebApplication WebApplication = SPWebApplication.Lookup(uri);
>             SPSiteCollection SiteCollections = WebApplication.Sites;
>             Console.WriteLine("Web Application: " + WebApplication.DisplayName.ToString());
>             foreach (SPSite SiteCollection in SiteCollections)
>             {
>                         SiteCollection.PortalName = "Contoso Home";
>                         SiteCollection.PortalUrl = "http://www.consoto.com";
>         }
>     }
>     }
> }
> ```

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).

Now that we understand how to manipulate the portal site connection for a site collection we need to set the portal site Url based on a value in the existing Site Directory taxonomy.  You can use the SPListIemCollection Class (Microsoft.SharePoint) to return the collection of items for a List (Site Directory) using the Items property or one of the GetItems methods of the SPList class.  To return a single list item from the collection such as a taxonomy component use an indexer, in example the Site Directory uses a List (Sites) to host the List items – so the collection is assigned to a variable named Sites, use Sites\[index\] in C# or Sites(index) in VB 2005 where index would be the display name of a List field such as Division.  With the SiteDirectory metadata a portal site connection can be correlated using C#

```
If <condition> Then
```

statements.

Windows SharePoint Services SDK Documentation

[http://msdn2.microsoft.com/en-us/library/bb264594.aspx](http://msdn2.microsoft.com/en-us/library/bb264594.aspx "http://msdn2.microsoft.com/en-us/library/bb264594.aspx")

For additional information on using the SPListItemCollection Class see [http://msdn2.microsoft.com/en-us/library/ms417004.aspx](http://msdn2.microsoft.com/en-us/library/ms417004.aspx).

Happy coding...