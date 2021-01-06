---
title: 'Improve the Overall Full-Text Search Queries for Large Database Tables'
date: Mon, 03 Apr 2006 13:25:00 +0000
draft: false
tags: ['Performance', 'Search']
---

This post is a continuation on previous **SharePoint Portal Server 2003** performace recommendations and details basic steps to improve the overall full-text search queries for large database tables.  The steps detailed are most applicable to enterprise deployments and/or large databases with a large number of unique full-text index words.  The steps detailed below should be applied to each back-end SQL server(s).

> This problem occurs frequently if the total size of all the catalog files exceeds 256 megabytes (MB).  
> If you experience performance issues with a full-text index, you must change the **MaxPropStoreCachedSize** Registry key value in the Windows Registry. The Registry key path is:  
> HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftSearch1.0Indexer  
> The **REG\_DWORD** of the **MaxPropStoreCachedSize** key controls the memory, in megabytes (MB), that a catalog caches. The value of the **MaxPropStoreCachedSize** key is the maximum memory that each search instance can allocate.  
> The **MaxPropStoreCachedSize** value must be five percent more than the total size of all the catalog files. The size of the catalog files is the sum of the sizes of the category file extensions (\*.ps1 and \*.ps2). Adjust the **MaxPropStoreCachedSize** value accordingly to assure an optimum use of virtual address space. You must be cautious when you adjust the **MaxPropStoreCachedSize** value because a reduction in the cache size may affect the performance.

[http://support.microsoft.com/?id=303459](http://support.microsoft.com/?id=303459)