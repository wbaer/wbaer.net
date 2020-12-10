---
title: 'ULS Viewing Like a Boss (ULS Viewer is now available)'
date: Fri, 22 Aug 2014 23:44:21 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2010', 'SharePoint Server 2013', 'ULS Viewer', 'Unified Logging Service']
---

I’m excited to announce we’ve published a new and improved version of the ULS Viewer.

About the Unified Logging Service
=================================

The Unified Logging Service (ULS) is the primary logging mechanism in SharePoint to make it easier to develop applications, expose in-depth information for debugging, and vehicle to isolate problems or threshold issues when they are encountered.  ULS writes events to the Trace Log and stores them in the file system.

For Developers ULS logs act as an extension of existing development tools as another debugging facility, in some scenarios, mitigating the need to attach a debugger to isolate an event.

For IT Professionals and support personnel ULS logs provide enough information and metadata to help determine the course of action necessary in resolution of an event and expedite support escalations where required.

The ULS Viewer provides a solution the enables presentation of ULS Log entries in a human readable format to aid in troubleshooting.

New ULS Viewer Features
=======================

Monitor multiple servers simultaneously, because we know you need to troubleshoot more than just a standalone server…

[![ULS1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ULS1_thumb_64233EE2.png "ULS1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ULS1_7B4EB960.png)

Personalize the output with the option to edit formatting.

[![ULS2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ULS2_thumb_03687667.png "ULS2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/ULS2_05A26E72.png)

Support for locating a specific log line within one or more ULS Logs based on a command line argument which enables other tools and solutions can leverage ULS Viewer as an external log viewer.

**Example:**

ulsviewer.exe –fileat:<logpath>@<time>

> Time format is yyyy/MM/ddTHH:mm:ss.FF

Support for opening multiple ULS Log files in a single tab based on a command line argument which enables other tools and solutions can leverage ULS Viewer as an external log viewer.

**Example:**

ulsviewer <file1> <file2> ... -combine

Optionally you can combine with "-fileat":

**Example:**

ulsviewer -fileat:<file1>@<time> <file2> ... -combine

Fixed in ULS Viewer
===================

Resolved updating defined filters while in paused state which provides IT Professionals and Developers an additional tool to isolate issues in high trace flow environments.

Fixed Find Again command missing matching entries.

Fixed issues with multi-line messages.

Applies more strict filter with RegEx when finding the uls log files in the log folder so that non-uls log files are not picked.

Download
========

To download the ULS Viewer visit [http://www.microsoft.com/en-us/download/details.aspx?id=44020](http://www.microsoft.com/en-us/download/details.aspx?id=44020).