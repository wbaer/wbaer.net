---
title: 'Managing Sites Pages in SharePoint Server 2013 w/ OneDrive for Business Redirection in Service Pack 1'
date: Wed, 13 Aug 2014 23:50:36 +0000
draft: false
tags: ['Administration', 'SharePoint']
---

Overview
========

Service Pack 1 introduced new functionality that allows IT administrators to selectively redirect their users OneDrive for Business libraries to Office 365.  In addition to OneDrive for Business redirection, Service Pack 1 also allows for the redirection of users Sites pages to SharePoint Online.  When redirecting the Sites pages, when a user selects Sites on the navigation bar in SharePoint Server 2013 they are redirected to SharePoint Online.  Since there is no affinity between content followed across SharePoint Server 2013 and SharePoint Online, users are presented only with local (SharePoint Online) content followed.  In order to resolve the disconnected experience, IT can selectively deactivate following content in SharePoint Server 2013.

About OneDrive for Business
===========================

OneDrive for Business in SharePoint Server 2013 is personal online storage for users in an organization replacing SkyDrive Pro.

About Sites Page
================

The Sites page introduced in SharePoint Server 2013 is designed to provide users a unified location to create new sites and view sites they are following.

Discover Sites where Following Content is Activated
===================================================

Following Content Feature when enabled allows user to follow content on sites where the Feature is activated.  IT Professionals and Developers can identify sites where Following Content is activated through a variety of methods to include C# and Windows PowerShell.  Examples below.

C# Example
----------

```
namespace FindFollow
``````
{
``````
    using System;
``````
    using System.Collections.Generic;
``````
    using System.Globalization;
``````
    using System.Linq;
``````
    using System.Text;
``````
    using System.Threading.Tasks;
``````
    using Microsoft.SharePoint;
``````
    using Microsoft.SharePoint.Administration;
``````
    using Microsoft.Office.Server;
```

```
    class Program
``````
    {
``````
        static void Main(string\[\] args)
``````
        {
``````
            System.Globalization.CultureInfo culture = new System.Globalization.CultureInfo(1033);
``````
            SPFeatureDefinitionCollection featureCollection = SPFarm.Local.FeatureDefinitions;
```

```
            foreach (SPFeatureDefinition feature in featureCollection)
``````
            {
``````
                if (feature.GetTitle(culture) == "Feature\_Title")
``````
                {
``````
                    Guid id = feature.Id;
``````
                    SPWebCollection webCollection = SPContext.Current.Site.AllWebs\["Site"\].Webs;
```

```
                    foreach (SPWeb web in webCollection)
``````
                    {
``````
                        if (feature.Scope == SPFeatureScope.Web)
``````
                        {
``````
                            SPFeatureCollection collFeatureCollection = web.Features;
``````
  if (feature.DisplayName == "Following Content")
``````
                            {
``````
                                Console.WriteLine((feature.GetTitle(culture)) + " Activated on: " + web.Title + web.Url.ToString());
``````
                            }
``````
                        }
``````
                        web.Dispose();
``````
                    }
``````
                }
``````
            }
``````
        }
``````
    }
``````
}
```

Windows PowerShell Example
--------------------------

$id = 043C4BDD-9745-441a-A9A7-0BCD9B910319

$web = Get-SPWeb [http://wbaer.com.co](http://wbaer.com.co)

$feature = $web.Features\[$id\]

if ($feature –eq $null)  
{

    “Not Activated”  
}

else

{  
    “Activated”  
}

Deactivating Following Content
==============================

To disable users ability to follow content

C# Example
----------

```
using System;
``````
using System.Collections.Generic;
``````
using System.Linq;
``````
using System.Text;
``````
using System.Threading.Tasks;
``````
using Microsoft.SharePoint;
``````
using Microsoft.SharePoint.Administration;
``````
using Microsoft.Office.Server;
```

```
namespace DisableFollow
``````
{
``````
    class Program
``````
    {
``````
        static void Main(string\[\] args)
``````
        {
``````
            SPWebApplication webApp = SPWebApplication.Lookup(new Uri("http://wbaer.com.co"));
```

```
            foreach (SPSite site in webApp.Sites)
``````
            {
``````
                foreach (SPWeb web in site.AllWebs)
``````
                {
``````
                    web.Features.Remove(new Guid("{043C4BDD-9745-441a-A9A7-0BCD9B910319}"));
``````
                }
``````
            }
``````
        }
``````
    }
``````
}
```