---
title: 'Code Snippet - How to Locate Host Header-based Site Collections in Windows SharePoint Services 3.0'
date: Thu, 19 Apr 2007 21:48:00 +0000
draft: false
tags: ['Code Samples', 'Uncategorized', 'Upgrade &amp; Migration']
---

One of the great features in Windows SharePoint Services 3.0 is the ability to co-host both path-based and host header-based site collections within the same server farm and content databases. Now that you've introduced host header-based site collections to your server farm, how do you quickly identify those site collections within a server farm or content database that also hosts your path-based site collections? In this scenario the object model is extremely useful in reporting on those site collections, the Web application, and content database where they reside.

The following code example provides a basic object model approach to locating and returning those site collection via a Command Line application.

Before using the code example add references to the following in your Microsoft Visual Studio project:

*   Microsoft.SharePoint

In the code example each SPSite object (site collection), is represented within an SPSiteCollection object that consists of the collection of all site collections in the Web application, by exposing the HostHeaderIsSiteName member, host header-based site collections can be enumerated through the object model.

```
            //Let's get the set of Web applications installed with this service
            SPWebApplicationCollection WebApps = SPWebService.ContentService.WebApplications;
            //SPWebApplication Class represents an IIS load-balanced Web application installed on the farm
            //Step through the Web applications
            foreach (SPWebApplication WebApp in WebApps)
            {
                //Let's check the Web application status before we begin and write each available Web application to the console
                if (WebApp.Status.ToString() == "Online")
                Console.WriteLine(WebApp.DisplayName);
                {
                    SPSiteCollection SiteCollections = WebApp.Sites;
                    //Step through the site collectons
                    foreach (SPSite SiteCollection in SiteCollections)
                    {
                        //Let's check the site collection and determine whether a host header URL is the site name, 
                        //if TRUE we'll write the output to the console
                        if (SiteCollection.HostHeaderIsSiteName.Equals(true))
                        {
                        Console.WriteLine("Site Url=" + """ + SiteCollection.Url.ToString() + """ + " ContentDatabase=" + """ + SiteCollection.ContentDatabase.Name.ToString() + """);
                        }
                    }
                }
            }
```

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).