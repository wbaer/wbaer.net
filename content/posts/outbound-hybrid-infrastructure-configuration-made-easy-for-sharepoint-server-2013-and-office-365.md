---
title: 'Outbound Hybrid Infrastructure Configuration Made Easy for SharePoint Server 2013 and Office 365'
date: Fri, 28 Mar 2014 23:00:57 +0000
draft: false
tags: ['Hybrid', 'Hybrid and Coexistence', 'OneDrive for Business', 'SharePoint', 'SharePoint Server 2013']
---

Over the past several weeks since we’ve released Service Pack 1 for SharePoint Server 2013 I’ve configured several PoC and demo environments with OneDrive for Business redirection to Office 365 with an outbound hybrid search topology.  Over the course of configuring these environments I found it to be easier to programmatically configure the more complex aspect (outbound infrastructure) and hopefully will be able to share the solution soon…

The solution I put together is a Windows Form (makes it easy to redistribute and iterate upon), simplifies the configuration and scripting of outbound infrastructure (example below).

The root domain is populated at runtime based on the machine (should be a WFE) from where the application is run.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_0719444A.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_0785773F.png)

The application next gets a list of all SPWebApplications on the local SPFarm, creates a list, and populates a combobox.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_621B83D0.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_7059FCC0.png)

The application then takes the Personal Information Exchange (.pfx) certificate to be used for the STS and converts it to Base64 Encoded (.cer).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_2421F312.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_0473194A.png)

The application then creates the Windows PowerShell script necessary to configure the outbound infrastructure for hybrid search.

////TODO Add Syntax Highlighting.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_48B61147.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_621E1481.png)

The next step is the Configure tab which executes the script created in the previous steps and configures the outbound infrastructure.

Looking forward to sharing the solution soon, but any feedback is appreciated.