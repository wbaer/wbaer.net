---
title: 'Yammer Redirection in SharePoint Server 2013 Service Pack 1'
date: Mon, 11 Aug 2014 23:36:17 +0000
draft: false
tags: ['Administration', 'Code Samples', 'Hybrid', 'Service Pack 1', 'SharePoint', 'SharePoint Server 2013', 'Yammer']
---

In previous articles I discussed redirecting OneDrive for Business to Office 365 in SharePoint Server 2013 Service Pack 1.  In addition to new functionality that allows IT administrators to redirect OneDrive for Business and Sites pages to Office 365, Service Pack 1 also allows IT administrators to activate Yammer as the default social experience for SharePoint Server 2013.

When activated, the Newsfeed link in the navigation bar is replaced with a Yammer link that directs users to the organizations’ Yammer network. 

![Yammer Configuration page in Central Admin](http://i.technet.microsoft.com/dynimg/IC713988.gif "Yammer Configuration page in Central Admin")

While a simplified Activate/Deactivate configuration is provided in Service Pack 1, proper identity management planning is required to deliver a consistent and integrated user experience.

For organizations with an established Active Directory and identity management infrastructure and practices

Directory Synchronization with Office 365 is a distinct configuration that provides an integrated identity solution for applications within the Office 365 suite with the exception of Yammer.  Integrated identity with Yammer requires a separate implementation of a directory synchronization solution provided by Yammer, Yammer Directory Sync (DSync).

Similar to Directory Synchronization, Yammer Directory Sync (DSync) is a Windows application that automates user provisioning in your Yammer network by querying your Active Directory (AD) host(s).

Sites Page
==========

The Sites page introduced in SharePoint Server 2013 is designed to provide users a unified location to create new sites and view sites they are following.

Managing Sites Page Redirection
-------------------------------

Service Pack 1 also includes within OneDrive for Business redirection the option to redirect users Sites page to Office 365.

### Example 1 C#

```
        static void Main(string\[\] args)
``````
        {
``````
            SPSecurity.RunWithElevatedPrivileges(delegate()
``````
            {
``````
                SPWebApplication webApp = SPWebApplication.Lookup(new Uri("http://sharepoint.spc.com.co"));
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
                        if (web.Features != null)
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
            });
``````
        }
```

### Example 1 Windows PowerShell

This example can be used to deactivate a specific Feature across all sites within the specified Web application.

$webApp = Get-SPWebApplication -Identity [http://sharepoint.contoso.com](http://sharepoint.contoso.com)

$webApp | Get-SPSite -limit all | ForEach-Object {Disable-SPFeature -Identity “FeatureName” -Url $\_.Url}

The **Uninstall-SPFeature** cmdlet removes the specified feature definition from the collection of feature definitions in the farm.

Uninstall-SPFeature –Identity

Other Social Capability Considerations
--------------------------------------

In addition to addressing scenarios such as Following Content you should also consider the management of other SharePoint Server 2013 social capabilities such as:

*   Removing the SharePoint Server social web parts from My Sites and Team Sites.
*   Hiding user interface controls that provide social functionality.

For additional information on replacing the social features in SharePoint Server 2013 with equivalent Yammer features in a SharePoint Server 2013 on-premises deployment see also [http://technet.microsoft.com/en-us/library/dn270535(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn270535(v=office.15).aspx "http://technet.microsoft.com/en-us/library/dn270535(v=office.15).aspx").

Resources
=========

[Add Yammer to the navigation bar for SharePoint 2013](http://technet.microsoft.com/en-us/library/dn627521(v=office.15).aspx) \[[http://technet.microsoft.com/en-us/library/dn627521(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn627521(v=office.15).aspx "http://technet.microsoft.com/en-us/library/dn627521(v=office.15).aspx")\]