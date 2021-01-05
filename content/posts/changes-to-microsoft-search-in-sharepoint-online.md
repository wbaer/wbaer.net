---
title: 'Changes to Microsoft Search in SharePoint Online'
date: Mon, 04 Jan 2021 16:57:20 +0000
draft: false
tags: ['Microsoft Search', 'FQL', 'KQL', 'Search']
---

Last month we shared [changes we're making to Microsoft Search in SharePoint Online](https://techcommunity.microsoft.com/t5/microsoft-search-blog/we-re-making-changes-to-search-in-sharepoint-online/ba-p/1971119) as we continue our journey of bringing Microsoft Search to your favorites productivity apps and services in Microsoft 365.  As a result of this announcement, we've seen questions as to whether FQL (FAST Query Language) is being deprecated as a result of these changes.  The simple answer is **no** FAST query language is not being deprecated; however, there are some features of FAST query language that are being deprecated:

* **COUNT** operator: Specifies the of number query term occurrences an item must include for the item to be returned as a result.  
* **FILTER** operator: Current behavior is that this FQL operator impacts ranking of results. After deprecation, FQL queries will work as before, but the ranking may be impacted. 
* **Dynamic rank** ‘weight’ parameter to the ‘string’ operator: The parameter will be ignored. Apart from that, the query will work as before. 
* Per string configuration of linguistics on/off: Enables linguistics control where stemming is not applied to the expressions enclosed in the affected string() operator.  After deprecation, FQL queries will work as before, but the ranking may be impacted. 
* FQL dynamic rank difference between OR and ANY: After, FQL queries will work as before, but the ranking may be impacted. 