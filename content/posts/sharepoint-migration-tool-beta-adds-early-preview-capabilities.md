---
title: 'SharePoint Migration Tool Beta adds early preview capabilities'
date: Wed, 11 Apr 2018 12:04:38 +0000
draft: false
tags: ['FastTrack', 'Migration &amp; Upgrade', 'SharePoint Migration Tool']
---

In January we announced General Availability of our SharePoint Migration Tool \[[https://techcommunity.microsoft.com/t5/SharePoint-Blog/General-Availability-of-the-SharePoint-Migration-Tool-amp/ba-p/143689](https://techcommunity.microsoft.com/t5/SharePoint-Blog/General-Availability-of-the-SharePoint-Migration-Tool-amp/ba-p/143689)\], designed to simplify your journey to the cloud through a free, simple, and fast solution to migrate content from on-premises SharePoint sites and file shares to SharePoint or OneDrive in Office 365. Based on our continuous learning and experience from Microsoft FastTrack and feedback from you, we’re pleased to announce new capabilities available in the SharePoint Migration Tool through our new open beta. ![](https://msdnshared.blob.core.windows.net/media/2018/04/SplashScreen-939x1024.png)

Getting Started
===============

You can download the SharePoint Migration Tool Open Beta at [http://spmtreleasescus.blob.core.windows.net/betainstall/default.htm](http://spmtreleasescus.blob.core.windows.net/betainstall/default.htm).  Through the open beta you’ll have available to you the upcoming innovation we’re delivering to help you bring your information to the cloud and take advantage of the latest collaboration, intelligence, and security solutions with Office 365.

What’s new in Open Beta
=======================

List Support
------------

New List support allows you to migrate SharePoint Server 2013 Lists to include the following List Templates:

*   GenericList
*   DocumentLibrary
*   Survey
*   Links
*   Announcements
*   Contacts
*   Events
*   Tasks
*   DiscussionBoard
*   PictureLibrary
*   XMLForm
*   GanttTasks
*   Posts
*   Comments
*   Categories
*   MySiteDocumentLibrary
*   AdminTasks

![](https://msdnshared.blob.core.windows.net/media/2018/04/ListsLibraries-930x1024.png)

New On-Premises AuthN Support
=============================

Improvements in the AuthN support now allow you to connect to more on-premises sources with support for AD FS and more, to include:

*   NTLM
*   Kerberos
*   Forms
*   ADFS
    *   MFA
    *   SAML Claims
    *   Client certificates

Site Structure Creation
=======================

Now when migrating your on-premises Lists and documents the SharePoint Migration Tool will create the source site collection or the list for you if it doesn’t already exist, so you don’t have to manually create a destination site. Simply either enter a URL that exist or a valid new URL for the site and the tool will do the rest.

JSON Support
============

In the current version of the SharePoint Migration Tool you were limited to CSV as a repository for bulk migrations, now on top of supporting a CSV format for automated migration we will also support JSON which will allow you even more fine grain level of control including Task level setting to be different. ![](https://msdnshared.blob.core.windows.net/media/2018/04/JSON-930x1024.png)

Wrapping Up…
============

Whether you’re looking to migrate from file shares on-premises to SharePoint or OneDrive or from on-premises versions of SharePoint, the SharePoint Migration Tool is designed to support the smallest of migrations to large scale migrations with support for bulk scenarios. Learn more about the SharePoint Migration Tool at [https://support.office.com/en-us/article/Introducing-the-SharePoint-Migration-Tool-9c38f5df-300b-4adc-8fac-648d0215b5f7](https://support.office.com/en-us/article/Introducing-the-SharePoint-Migration-Tool-9c38f5df-300b-4adc-8fac-648d0215b5f7). Prepare your environment for migration using the SharePoint Migration Assessment Tool by learning more at [https://www.microsoft.com/en-us/download/details.aspx?id=53598](https://www.microsoft.com/en-us/download/details.aspx?id=53598).