---
title: 'Planning for *Additional* Storage with Microsoft SharePoint Products and Technologies - Recycle Bin'
date: Tue, 13 Nov 2007 11:27:42 +0000
draft: false
tags: ['Capacity Planning']
---

This will be the first of a series focusing on those areas of storage that are commonly overlooked when planning storage for Microsoft SharePoint Products and Technologies. In this post we'll look at the native Recycle Bin in Microsoft Office SharePoint Server 2007 and Windows SharePoint Services 3.0 to understand its fundamental aspects and impacts on storage.

The Recycle Bin enables end-users to easily recover content deleted within a site collection and is configured in two separate and unique stages referred to as the 1st and 2nd stage each with its own configuration properties.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6c136ed6a9c2_73CD/image_thumb_2.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6c136ed6a9c2_73CD/image_6.png)

The 1st stage Recycle Bin is configured using a numeric representation that defines the duration an item can exist in the Recycle Bin (SPWebApplication.RecycleBinRetentionPeriod Property), the default value of this property is 30 days; while the assumption is often made that this number is unique to the 1st stage Recycle Bin, conversely it applies to both the 1st and 2nd stage Recycle Bins and is based on the initial delete date of the content.

The 2nd stage Recycle Bin is configured on a percentage of quota value or more specifically a quota allocation (SPWebApplication.RecycleBinRetentionPeriod Property) as opposed to a duration as with the 1st stage Recycle Bin. This quota is configured to 50% of the live site quota by default, for example, a Web application with a default quota template of 1 gigabyte applied to a site collection can potentially result in a site collection consuming up to 1.5 gigabytes in a content database or more so, a Web application can be 50% larger than planned.  Though the 2nd stage Recycle Bin can be disabled entirely, you should carefully consider the recovery costs that can arise when content is requested for recovery - many organizations choose to increase the duration an item can exist in the 1st stage as a mitigation strategy.

Windows SharePoint Services 3.0 uses an automated cleanup service based on the initial delete date of a specific item and applies to both the 1st and 2nd stage Recycle Bins enabled as a Timer Job (see illustration).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6c136ed6a9c2_73CD/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6c136ed6a9c2_73CD/image_2.png)

Controlling the size of the 2nd stage Recycle Bin is an essential practice to managing storage for a site collection. The automated cleanup service will purge both the 1st and 2nd stage Recycle Bins when the initial delete date for a specific item or collection of items has reached its configured duration. Reducing the storage allocation for the 2nd stage Recycle Bin to purge items as the configured quota is reached on a more frequent basis can provide for the better management of storage; however, again may increase recovery costs where content becomes necessary to be restored from a conventional backup resource.