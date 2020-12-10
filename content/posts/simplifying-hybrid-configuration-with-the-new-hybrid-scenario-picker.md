---
title: 'Simplifying Hybrid Configuration with the new Hybrid Scenario Picker'
date: Thu, 13 Aug 2015 17:57:37 +0000
draft: false
tags: ['Hybrid', 'Hybrid and Coexistence', 'SharePoint Server 2013']
---

This month we continued to invest in simplifying the Office 365 and SharePoint 2013 hybrid experience with the new hybrid scenario picker available in the Office 365 Administration Center.

Overview
========

The hybrid scenario picker is designed to help customers get up and running quickly with in-market and future hybrid scenarios by providing quick access to hybrid scenarios such as OneDrive for Business and SharePoint Sites in addition to programmatically configuring hybrid prerequisites to include Server-to-Server (S2s) and OAuth connections.

[![H1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/H1_thumb_6C04A82C.png "H1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/H1_7633B1E8.png)

Scenarios
=========

The current hybrid scenario picker experience provides access to two (2) core scenarios supported with SharePoint Server 2013 and the upcoming release of SharePoint Server 2016 Preview.

[![H2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/H2_thumb_261605BD.png "H2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/H2_102C936D.png)

**SharePoint Hybrid OneDrive for Business** – The Hybrid OneDrive option redirects your on-premises My Sites/OneDrive host to SharePoint Online OneDrive for Business. Once the wizard completes, any click of the OneDrive link from on-premises will redirect to OneDrive in the Cloud. The redirection is complete and users may begin moving or syncing files to the Cloud for storage, right away.  The wizard also configures a sever-to-server (S2S/OAuth) connection between SharePoint Server on-premises and SharePoint Online.

**SharePoint Hybrid Site Features** – The Hybrid SharePoint Sites option configures a server-to-server (S2S/OAuth) connection that allows you to join features of your team site to your SharePoint Online site collection in Office 365.  OneDrive for Business redirection is also configured when you click this option. Note that, depending on what hybrid features you want to use, there may be other steps that you need to complete when this wizard finishes.  For example, if you want to configure SharePoint Server search as a hybrid of SharePoint Online and SharePoint Server on-premises.

Prerequisites
=============

To successfully configure a hybrid Office 365 and SharePoint 2013 experience using the hybrid scenario picker your SharePoint Server 2013 farm should have the August PU installed, ports 80 and 443 should be open for outbound connections, and users synchronized with Office 365 using Azure Active Directory Sync (AAD Sync).

Resources
=========

To learn more about hybrid Office 365 and SharePoint scenarios see also [https://technet.microsoft.com/en-us/library/jj838715.aspx](https://technet.microsoft.com/en-us/library/jj838715.aspx "Hybrid Resource Center").