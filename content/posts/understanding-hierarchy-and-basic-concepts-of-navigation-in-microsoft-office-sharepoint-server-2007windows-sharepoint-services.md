---
title: 'Understanding Hierarchy and Basic Concepts of Navigation in Microsoft Office SharePoint Server 2007/Windows SharePoint Services'
date: Tue, 10 Jul 2007 15:01:00 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'Uncategorized', 'Windows SharePoint Services 3.0']
---

_Web applications_ are the foundation of a SharePoint Products and Technologies server farm and host the root site collection, root and subordinate webs.  SharePoint Portal Server 2003 and Windows SharePoint Services 2.0 used the term Virtual Server to designate a Web application also known as a Web site in Internet Information Services.

A _root site_ \[collection\] is the term commonly applied to the what is the uppermost site collection within a server farm or otherwise referred to as the top-level site collection or alternatively portal site collection.  The root site \[collection\] can host any number of subordinate webs or _root webs_, each serving any number of subsequent _webs_.  A root site \[collection\] in Microsoft Office SharePoint Server 2007 hosts the Site Directory and Search Center webs and serves as an aggregation mechanism and provides search results through the native Search Center. 

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/1356ba95ff44_11999/image0_thumb3.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/1356ba95ff44_11999/image07.png)

Path-based _site_ \[collections\] were traditionally known as 'team' sites, a term coined in SharePoint Team Services.  Each site can host any number of _webs_ and subsequent webs.  Breadcrumb navigation is available in two contexts for both site \[collections\] and webs provided both inter and intra-site.  Intra-site breadcrumb navigation provides hierarchical navigation substance when within a site and/or web; whereas inter-site breadcrumb navigation provides hierarchical navigation relational to each site collection within a tier and can establish a connection to the root site \[collection\] where portal site mappings are applied and is referenced by using the 'Title' of a site \[collection\], web, List or Document Library.

This concept is also known as the _relationship chain_ where each object has a parent, where a parent is not available to an object, an orphan exists and can include, site \[collections\], webs, Lists and Document Libraries.  So to put it into context, breadcrumb navigation can be equated to a family tree of sorts, where site \[collections\] reside within the same level of the relationship chain there is no genealogy or navigational reference between the two.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/1356ba95ff44_11999/image0_thumb5.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/1356ba95ff44_11999/image011.png)

The image above shows both inter-site and intra-site breadcrumb navigation respectively.

Another method of structuring site \[collections\] within a SharePoint Products and Technologies deployments is to use managed paths as a designator to represent a logical navigation structure, as an example, a managed path 'HR' may be implement to host site \[collections\] and subsequent webs related to Human Resources.  Managed paths define which pieces of the URL namespace are controlled by Microsoft Windows SharePoint Services.  In Windows SharePoint Services 2.0 there were several possible options when using managed paths:

*   Explicit Inclusions:  Used if you want Windows SharePoint Services to manage a specific path, I.e. /path/, but not any paths beneath it, I.e. /path/anotherpath.
    
*   Explicit Exclusions:  Indicated to Include any site \[collections\] below the path.
    
*   Top-level Web site explicit inclusion:  Indicates only the root site \[collection\] should be handled by Windows SharePoint Services.
    
*   Top-level Web site wildcard inclusion:  Indicates every directory under the specified path is a Windows SharePoint Services root site \[collection\].
    
*   Exclusion:  Exclusion paths indicate a path that should not be handled by Windows SharePoint Services, in example if a Virtual Directory with the alias 'FabrikamApp' is created within a Web application through Internet Information Services, it's contents will not be managed by Windows SharePoint Services.
    

In Windows SharePoint Services 3.0 the implementation of managed paths has changed in comparison to previous versions, prior to implementing managed paths you should consult the Windows SharePoint Services 3.0 Technical Library at [http://technet2.microsoft.com/windowsserver/WSS/en/library/700c3d60-f394-4ca9-a6d8-ab597fc3c31b1033.mspx?mfr=true](http://technet2.microsoft.com/windowsserver/WSS/en/library/700c3d60-f394-4ca9-a6d8-ab597fc3c31b1033.mspx?mfr=true "http://technet2.microsoft.com/windowsserver/WSS/en/library/700c3d60-f394-4ca9-a6d8-ab597fc3c31b1033.mspx?mfr=true").

When using managed paths as a navigation provider it is also important to understand that users requesting <A href="http://%3cserver%3e/%3Cpath%3E/" mce\_href="http:////">http://<server>/<path>/ will be presented with a 404 since no content can reside at a managed path reference.  To mitigate the server standard 404, you can develop and present a user friendly 404 using Jingmei Li's instructions at [How to create your own custom 404 error page and handle redirect in SharePoint 2007 (MOSS)-](http://blogs.msdn.com/jingmeili/archive/2007/04/08/how-to-create-your-own-custom-404-error-page-and-handle-redirect-in-sharepoint-2007-moss.aspx "How to create your own custom 404 error page and handle redirect in SharePoint 2007 (MOSS)-").