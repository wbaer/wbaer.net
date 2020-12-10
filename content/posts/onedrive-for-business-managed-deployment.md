---
title: 'OneDrive for Business Managed Deployment'
date: Wed, 13 Aug 2014 23:16:27 +0000
draft: false
tags: ['IT Pro Resources', 'OneDrive for Business']
---

Overview
========

**OneDrive for Business** is cloud storage **for business** similar to the personal experience provided by OneDrive. It's the place where employees can store, sync, and share their files across multiple devices with ease and security.  Built through the evolution of personal sites, OneDrive for Business provides the ability for an organization to provide their users enterprise grade data mobility across devices and screens and includes both a synchronization client for offline availability and simple upload experience and a Web UX to manage content through the rich capabilities of SharePoint.

Mobile View
-----------

[![OneDriveWeb](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/OneDriveWeb_thumb_71295D7F.png "OneDriveWeb")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/OneDriveWeb_7D94EFF7.png)

Web View
--------

[![OneDriveUX](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/OneDriveUX_thumb_030881FE.png "OneDriveUX")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/OneDriveUX_59FDE301.png)

Managed Deployment Overview
===========================

Organizations can deploy the OneDrive for Business synchronization client by allowing their users to download the rich client and/or app at [https://onedrive.live.com/about/en-us/download/](https://onedrive.live.com/about/en-us/download/ "Download") or optionally deploy to users using Click-To-Run technology for a managed, IT-led approach.

**Scenario**

**Steps**

**Example Configuration.xml**

IT Managed Internal OneDrive for Business Deployment

**Step 1** Customize a Click-To-Run for Office 365 installation as documented at [http://technet.microsoft.com/en-us/library/jj219422.aspx](http://technet.microsoft.com/en-us/library/jj219422.aspx "http://technet.microsoft.com/en-us/library/jj219422.aspx").

**Step 2** Create a custom Configuration.xml configuration file (see example and refer to the article above for additional guidance).

**Step 3** Download the OneDrive for Business Click-To-Run deployment source and copy to a network location accessible to the target users.

**Step 4** Specific configuration options and product ID details as documented at [http://technet.microsoft.com/en-us/library/jj219426.aspx](http://technet.microsoft.com/en-us/library/jj219426.aspx "http://technet.microsoft.com/en-us/library/jj219426.aspx").

Sample 

\\serversharesetup.exe /download \\servershareCustomConfiguration.xml.

<Add SourcePath="\\servershareC2R\_deploy" OfficeClientEdition="32" >

    <Product ID="GrooveRetail">

      <Language ID="en-us" />

    </Product>

  </Add>

IT Managed OneDrive for Business Silent Desktop Deployment

(SxS w/ Office 2010)

Refer to **Steps 1-3** above and configure the custom Configuration.xml to specify the configuration options for deployment as documented at [http://technet.microsoft.com/en-us/library/jj219426.aspx](http://technet.microsoft.com/en-us/library/jj219426.aspx "http://technet.microsoft.com/en-us/library/jj219426.aspx") (see example for additional guidance).

Sample

\\serversharesetup.exe /configure \\servershareCustomC2RConfig.xml

  <Add SourcePath="\\servershareC2R\_deploy" OfficeClientEdition="32" >

    <Product ID="GrooveRetail">

      <Language ID="en-us" />

    </Product>

  </Add>

<Display Level="None" AcceptEULA="TRUE" />

Resources
=========

OneDrive for Business \[[https://onedrive.live.com/about/en-us/business/](https://onedrive.live.com/about/en-us/business/ "https://onedrive.live.com/about/en-us/business/")\]

OneDrive for Business Plans and Pricing \[[https://onedrive.live.com/about/en-us/plans/](https://onedrive.live.com/about/en-us/plans/ "https://onedrive.live.com/about/en-us/plans/")\]

Download OneDrive for Business \[[https://onedrive.live.com/about/en-us/download/](https://onedrive.live.com/about/en-us/download/ "https://onedrive.live.com/about/en-us/download/")\]

Office Deployment Tool for Click-to-Run \[[http://technet.microsoft.com/en-us/library/jj219422.aspx](http://technet.microsoft.com/en-us/library/jj219422.aspx "http://technet.microsoft.com/en-us/library/jj219422.aspx")\]

Reference for Click-to-Run Configuration.xml File \[[http://technet.microsoft.com/en-us/library/jj219426.aspx](http://technet.microsoft.com/en-us/library/jj219426.aspx "http://technet.microsoft.com/en-us/library/jj219426.aspx")\]