---
title: 'SharePoint Server 2016 Beta 2 Hybrid Scenarios'
date: Wed, 25 Nov 2015 23:28:00 +0000
draft: false
tags: ['Hybrid', 'Hybrid and Coexistence', 'SharePoint', 'SharePoint Server 2016']
---

SharePoint Server 2016 Beta 2, released on November 18th, 2015, introduces several new hybrid capabilities that drive end-user familiarity and provide further abstraction of Office 365 when coexisting with SharePoint on-premises to include a new hybrid extensible App Launcher and profile redirection.

Extensible App Launcher
=======================

The [App Launcher](https://support.office.com/en-us/article/Meet-the-Office-365-app-launcher-79f12104-6fed-442f-96a0-eb089a3f476a) is a familiar feature in Office and it’s now been extended to SharePoint Server 2016. The App Launcher provides a common location to discover new apps and navigate SharePoint on-premises and Office 365.

[![clip_image002](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image002_thumb_5265FC60.png "clip_image002")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image002_295B5D64.png)

The extensible hybrid app launcher is designed to help you get to your Office 365 apps and services from SharePoint Server 2016 Beta 2.  The extensible App Launcher is enabled when enabling hybrid Team Sites and/or OneDrive for Business, once you enable this feature, you’ll see the Office 365 Delve and Video apps, along with your custom Office 365 tiles, appear in your SharePoint Server 2016 Beta 2 app launcher.

The Extensible Hybrid App Launcher is a SharePoint Server 2016 Beta 2 feature that requires Office 365 functionality which is scheduled to roll out during December 2015 and January 2016.

Learn more about the Extensible App Launcher at [http://go.microsoft.com/fwlink/?LinkId=715519](http://go.microsoft.com/fwlink/?LinkId=715519).

Profile Redirection
===================

Profile redirection is a component of the hybrid Team Sites feature introduced in SharePoint Server 2013 Service Pack 1.  Profile redirection, in a hybrid Team Sites configuration redirects cloud (hybrid) users to their profile in Office 365 powered by Office Delve ensuring hybrid users have a single place for their profile information.

Learn more about Profile Redirection at [http://go.microsoft.com/fwlink/p/?LinkId=708802](http://go.microsoft.com/fwlink/p/?LinkId=708802).

Hybrid Team Sites
=================

Hybrid Team Sites provides a solution to help hybrid users reconcile and rationalize site membership and discovery across SharePoint on-premises and Office 365.  For example, if you're a member of several team sites in your organization, you may want to start following them for easy access.  When you follow a team site, it gets listed on your Sites page.  When you follow sites, you can quickly navigate to libraries on these sites from OneDrive for Business or the Sites tile on-premises or in Office 365.

When a user follows a site, a link to that site is added to the user's [Followed Sites](https://support.office.com/en-us/article/Organize-documents-and-sites-in-Office-365-1A36030F-3E54-4C43-8401-B7BCD0D1C16B#BKMK_followsites) list. If you're using both SharePoint Server 2016 Beta 2 and SharePoint Online, your users will have different followed lists for sites in each location. Hybrid sites features consolidates the information from both locations into the SharePoint Online list in Office 365.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Sites.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Sites.png)

Learn more about Team Sites at [https://technet.microsoft.com/library/mt346108(v=office.16).aspx](https://technet.microsoft.com/library/mt346108(v=office.16).aspx).

OneDrive for Business
=====================

In SharePoint Server 2016 Beta 2, you can redirect users to OneDrive for Business in Office 365 when they click **OneDrive** or **Sites** in the navigation bar. This is known as _OneDrive for Business hybrid_.

With this feature, no matter where they are, users can quickly access their documents and any information that they choose to sync from their SharePoint sites. This best-of-both-worlds approach lets you keep your key business information in your own environment while allowing users the flexibility to access their documents from anywhere.

With this feature, you can continue to use your on-premises SharePoint farm while providing your users with an easy way to store, share, and collaborate in the cloud with OneDrive for Business in Office 365.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/OneDrive.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/OneDrive.png)

Learn more about hybrid OneDrive for Business at [https://technet.microsoft.com/en-us/library/dn627523.aspx](https://technet.microsoft.com/en-us/library/dn627523.aspx).

Search
======

SharePoint Server 2016 Beta 2 provides two discrete hybrid search scenarios, Cloud Hybrid Search introduced in August 2015 to SharePoint Server 2016 IT Preview and SharePoint Server 2013, in addition to the classic federated hybrid search scenario, introduced in SharePoint Server 2013.

Cloud Hybrid Search
-------------------

The Cloud Hybrid Search scenario represents the next generation in hybrid search and discovery.  With the cloud hybrid search solution, both your on-premises and Office 365 crawled content is unified in a search index hosted in Office 365.  When users query your search index in Office 365, they get search results from both on-premises and Office 365 content.  The content metadata is encrypted when it’s transferred to the search index in Office 365, so the on-premises content remains secure.  You configure search in Office 365, except for the crawling set-up, which you do on SharePoint Server.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Search%20Results.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Search%20Results.png)

Learn more about cloud hybrid search at [http://connect.microsoft.com/office/SelfNomination.aspx?ProgramID=8647&pageType=1](http://connect.microsoft.com/office/SelfNomination.aspx?ProgramID=8647&pageType=1).

In SharePoint Server 2016 Beta 2 a Cloud Search Service Application can be created in SharePoint Central Administration; however, onboarding requires running the onboarding script that can be downloaded via link above. 

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/2015-11-25.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/2015-11-25.png)

Federated Hybrid Search
-----------------------

Federated hybrid search is a hybrid search scenario in which a query issued by a user is federated or distributed across on-premises and Office 365 returning a set of results from each location as discrete entities.  In a federated hybrid search scenario on-premises crawled content is stored on-premises in the search index and Office 365 content in the search index in Office 365 with no affinity between the two data sets.  Federated hybrid search can be configured in inbound, outbound, or bi-directional hybrid topologies.

### Outbound

User searches from the SharePoint Server 2013 Search Center display hybrid results. This is called _outbound hybrid search_. For information about how to set up outbound hybrid search, see [Display hybrid search results in SharePoint Server 2013](https://technet.microsoft.com/en-us/library/dn197173.aspx).

### Inbound

User searches from the SharePoint Online Search Center display hybrid results. This is called _inbound hybrid search_. For information about how to set up inbound hybrid search, see [Display hybrid search results in SharePoint Online](https://technet.microsoft.com/en-us/library/dn197174.aspx).

Hybrid Scenario Picker
======================

The hybrid scenario picker is a new feature in Office 365 that simplifies the configuration and deployment of hybrid capabilities with SharePoint Server 2013 and SharePoint Server 2016.  You can use the scenario picker wizard to redirect OneDrive for Business to SharePoint Online, and/or to make a Server-to-Server (S2S)/OAuth connection for your SharePoint Hybrid features.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Scenario%20Picker.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Scenario%20Picker.png)

Learn more about the Hybrid Scenario Picker at [http://go.microsoft.com/fwlink/?LinkID=620229&clcid=0x409](http://go.microsoft.com/fwlink/?LinkID=620229&clcid=0x409).

Extranet Sites 
===============

An extranet site in SharePoint is a site that organizations create to let external users have access to relevant content and to collaborate with them. Extranet sites allow a way for partners to securely do business with your organization. The content for your partner is kept in one place and they have only the content and access they need. They don’t need to email the documents back and forth or use some tools that are not sanctioned by IT.

Traditionally, deploying a SharePoint _on-premises_extranet site involves complex configuration to establish security measures and governance, including granting access inside the corporate firewall, and expensive initial and on-going cost.

But with O365 SharePoint Hybrid extranet, partners connect directly to a members-only site in Office 365, without access to the corporate on-premises environment or any other Office 365 site. Office 365 Extranet sites can be accessed anywhere.

Learn more about hybrid Office 365 Extranets at  [http://go.microsoft.com/fwlink/?LinkID=537696&clcid=0x409](http://go.microsoft.com/fwlink/?LinkID=537696&clcid=0x409).

Document Collaboration
======================

Recently a new attachment option has been made available in Office 365. In Exchange 2016, this option, known as _document collaboration_, allows on-premises users to integrate attachments stored on OneDrive for Business directly in their Outlook on the web clients.

Learn more about Document Collaboration at [http://go.microsoft.com/fwlink/?LinkId=715521](http://go.microsoft.com/fwlink/?LinkId=715521).

Get Started with SharePoint Hybrid
==================================

SharePoint Hybrid is about connecting best of both worlds, on-premises and Cloud, together and achieve business values through hybrid pillars.

A hybrid solution can help your company get started in the cloud, taking a first step to explore the cloud functionality at own your pace. A hybrid environment enables enterprise users to be connected from almost anywhere to the resources and content they need.

Learn more about hybrid SharePoint at [http://hybrid.office.com/](http://hybrid.office.com/).