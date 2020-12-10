---
title: 'Search Scale and Resiliency Improvements in SharePoint Server 2016 IT Preview'
date: Fri, 28 Aug 2015 23:21:10 +0000
draft: false
tags: ['Performance', 'SharePoint', 'SharePoint Server 2016']
---

Improvements in performance and scale in SharePoint Server 2016 IT Preview search now allow search to scale up to 500 million items, an increase of 250 million items SharePoint Server 2013 \[http://technet.microsoft.com/en-us/library/cc262787.aspx#Search\] based on 10 million items per index partition.  In SharePoint Server 2013 and SharePoint Server 2016 IT Preview each index partition contains a subset of the whole search index. If the number of indexed items is high in relation to how much memory the server has, affects the query response time negatively.  SharePoint Server 2016 IT Preview has been improved to support 20 million items per index partition, where 500 million items are based on 25x index partitions.

In addition to improving the search scale boundaries as described above, SharePoint Server 2016 IT Preview makes a number of general performance optimizations in the query path to reduce overall latency, implements changes in merge scheduling reducing peak disk and memory usage from ~210% steady state consumption to ~140% enabling larger index partitions while avoiding a large resource buffer.

While improvements in scale and performance allow substantially larger index partitions, as the number of partitions increase, so does the need for resiliency.  SharePoint Server 2016 IT Preview implements new failover logic for serving queries between index replicas which improves the ability to respond to overload to include immediate recovery when the overload is removed.

To learn more about SharePoint Server 2016 IT Preview see also [https://technet.microsoft.com/en-us/library/cc303422(v=office.16).aspx](https://technet.microsoft.com/en-us/library/cc303422(v=office.16).aspx "https://technet.microsoft.com/en-us/library/cc303422(v=office.16).aspx").