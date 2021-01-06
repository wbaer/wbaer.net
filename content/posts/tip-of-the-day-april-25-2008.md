---
title: 'Tip of the Day, April 25, 2008'
date: Fri, 25 Apr 2008 17:00:17 +0000
draft: false
tags: ['SharePoint Tips']
---

Tip of the day:  Deleting orphaned Timer Jobs

Open SharePoint Central 3.0 Central Administration and click Operations.

Select Timer job definitions under Global Configuration.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/TipoftheDayApril252008_C4EA/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/TipoftheDayApril252008_C4EA/image_2.png)

Select the orphaned Timer Job from the list of Timer Jobs.

Locate the Globally Unique Identifier (GUID) for the Timer Job in the browser address bar.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/TipoftheDayApril252008_C4EA/image_thumb_1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/TipoftheDayApril252008_C4EA/image_4.png)

Copy the GUID to the clipboard and replace %2D in the GUID with hyphens.  For example the entry in the illustration above should appear as fc42d1d3-1e94-4dee-998d-e0086b6f8300.

Open a Command Prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.

Run stsadm -o deleteconfigurationobject {guid} where {guid} is the GUID captured in the previous steps.

**NOTE** Use this process to manage other orphaned configuration objects in addition to Timer Jobs!