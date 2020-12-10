---
title: 'Durable Links in SharePoint Server 2016 IT Preview'
date: Tue, 22 Sep 2015 19:39:56 +0000
draft: false
tags: ['SharePoint', 'SharePoint Server 2016']
---

Prerequisites
=============

*   [SharePoint Server 2016 IT Preview](http://www.microsoft.com/en-us/download/details.aspx?id=48712)
*   [Office Online Server Preview](http://www.microsoft.com/en-us/download/details.aspx?id=49028)

Overview
========

Durable Links provide a resource Id based link for Web Application Open Platform Interface Protocol (WOPI) documents served by SharePoint and Office Online Server. The resource Id assigned to individual documents is stored in the content database related to the source document. When using Durable Links when a user selects a link to a specific document, SharePoint Server 2016 IT Preview looks up the file by the resource Id and opens it in Office Online Server Preview.  Durable Links allow documents to be moved and renamed without affecting the integrity of the linking Url associated with a document.

[![WOPI1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/WOPI1_thumb_21961951.png "WOPI1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/WOPI1_3E0DE9CF.png)

Example (Renaming a Document)
-----------------------------

In the illustration below a document exists with the Title property Lorem Ipsum Dolor Sit Amet.docx with the absolute Url [https://<server>/Shared%20Documents/Lorem%20Ipsum%20Dolor%20Sit%20Amet.docx?d=w6143f2e64bb84649aef201322eacd269](https://<server>/Shared%20Documents/Lorem%20Ipsum%20Dolor%20Sit%20Amet.docx?d=w6143f2e64bb84649aef201322eacd269).

[![DurableLinks_1.0](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/DurableLinks_1.0_thumb_0FDE30D9.png "DurableLinks_1.0")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/DurableLinks_1.0_72D2F15F.png)

In the illustration below the source document Lorem Ipsum Dolor Sit Amet (Final).docx with the absolute Url [https://<server>/Shared%20Documents/Lorem%20Ipsum%20Dolor%20Sit%20Amet%20(Final).docx?d=w6143f2e64bb84649aef201322eacd269](https://<server>/Shared%20Documents/Lorem%20Ipsum%20Dolor%20Sit%20Amet%20(Final).docx?d=w6143f2e64bb84649aef201322eacd269).

[![DurableLinks_2.0](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/DurableLinks_2.0_thumb_2E4D9324.png "DurableLinks_2.0")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/DurableLinks_2.0_7=29E.png)

In either scenario the link will return the original document based on the resource Id assigned to the document (w6143f2e64bb84649aef201322eacd269).

To learn more about new and improved features in SharePoint Server 2016 IT Preview visit [https://msdn.microsoft.com/en-us/library/mt346121(v=office.16).aspx](https://msdn.microsoft.com/en-us/library/mt346121(v=office.16).aspx "https://msdn.microsoft.com/en-us/library/mt346121(v=office.16).aspx").