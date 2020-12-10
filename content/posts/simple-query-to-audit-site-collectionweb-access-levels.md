---
title: 'Simple Query to Audit Site Collection/Web Access Levels'
date: Sun, 10 Dec 2006 00:44:00 +0000
draft: false
tags: ['Code Samples', 'Uncategorized']
---

> USE SELECT DISTINCT t1.siteID,t2.webID, t2.title \[accessLevel\],t3.tp\_login,CONVERT(DECIMAL(6,2),((CONVERT(DECIMAL,t4.diskUsed)/1024)/1024)) \[diskUsed MB\], t6.fullUrlFROM DBO.RoleAssignment t1 JOIN DBO.roles t2 ON t2.siteID = t1.siteID AND t2.roleID = t1.roleID AND t2.roleID = 1073741829 JOIN DBO.userInfo t3 ON t3.tp\_siteID = t1.siteID AND t3.tp\_id = t1.principalID JOIN DBO.sites t4 ON t4.\[id\] = t1.siteID JOIN DBO.perms t5 ON t5.siteID = t1.siteID AND t5.scopeID = t1.scopeID JOIN webs t6 ON t6.\[id\] = t5.webID