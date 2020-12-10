---
title: 'Introduction to Minimal Download Strategy in SharePoint 2013'
date: Mon, 12 Nov 2012 20:59:51 +0000
draft: false
tags: ['Minimal Download Strategy', 'SharePoint', 'SharePoint Server 2013', 'SPC219']
---

Introduction

Minimal Download Strategy in SharePoint 2013 improves rendering performance when browsing content where large parts of the page do not change providing a more fluid navigation experience. For example when navigating between a site’s home page and Shared Documents page only the content that has changed between the source and destination page (controls and placeholders in the content area) are downloaded and the Url subsequently updated where the chrome is persisted.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7633.image_thumb_16D5B655.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/7127.image_342B0E1F.png)

In a typical AJAX scenario controls interface with the server individually. Controls on the chrome in SharePoint are implemented with the Url at their core. Minimal Download Strategy implements a new download manager that interfaces between the client and server and retrieves the data as needed depending the initiating request. Each control on the page uses the download manager to update itself when necessary.

Chrome

In SharePoint the chrome is defined by the master page which in turn defines the overall layout, core styling, page behavior, location and size of the content area and includes any common controls shared across pages (I.e. navigation).

Content Area

The content area is defined by the content page which in turn inherits style and behavior from the master page and interacts with controls on the chrome.

In previous versions of SharePoint, unlike with Minimal Download Strategy, when a user navigated between pages the entire page (chrome and content area) were reloaded. Minimal Download Strategy significantly reduces the amount of data that needs to be downloaded and reduces the amount of markup, css, scripts, etc. that the browser needs to parse and render improving overall performance and provides smoother transitions.

Download Manager

As previously mentioned, Minimal Download Strategy is made possible through a new download manager that interfaces between the client and server. The download manager understands controls whose display context is the current Url, controls that can potentially change a Url (I.e. Quick Launch), controls that both have a display context of the current Url and change change a Url (breadcrumbs), and controls that do neither such as images.

Minimal Download Strategy uses a single .aspx file (start.aspx) for your pages, with the actual URL encoded in the text following the hashmark (‘#’). When navigating from page to page, only the changes between two compatible pages will be downloaded.

The download manager follows a subscriber/publisher model therefore each control must register its events with the download manager for example when navigation download starts, ends, is cancelled, or fails. The download manager is also responsible for managing the delta or the difference between the source and destination page.

Enabling and Disabling Minimal Download Strategy

In SharePoint 2013 Minimal Download Strategy is enabled by default and can be disabled where necessary on a per SPWeb basis using EnableMinimalDownload property and settings its value to False.

Conclusion

Minimal Download Strategy is a new feature in SharePoint 2013 that improves client rendering performance and fluidity when navigating from page to page by download only the changes between two compatible pages. Fewer bytes will be downloaded and the page will appear more quickly.

Resources

[Learn more about SharePoint Server 2013](http://sharepoint.microsoft.com/en-us/Pages/default.aspx)

[Learn more about SharePoint Server 2013](http://technet.microsoft.com/en-us/sharepoint/fp142366)