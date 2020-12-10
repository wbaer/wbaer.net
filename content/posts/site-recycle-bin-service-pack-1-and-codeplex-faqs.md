---
title: 'Site Recycle Bin (Service Pack 1 and CodePlex) FAQs'
date: Sun, 24 Jul 2011 18:30:42 +0000
draft: false
tags: ['Recycle Bin', 'Service Pack 1', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

Do I need to uninstall the [Site Recycle Bin from CodePlex](http://governance.codeplex.com/) if I plan to use the Site Recycle Bin in Service Pack 1?

It depends on what you’re looking for.  The Site Recycle Bin available through CodePlex will capture deleted Site Collections and Sites to disk, Site Recycle Bin in Service Pack 1 copies the Site Collections and Sites to an auxiliary SQL table until they are permanently deleted at which point are managed by Gradual Site Deletion.  Once a Site Collection or site enters this Garbage Collection phase it will be managed by the Site Recycle Bin on CodePlex and copied to disk.  In theory you could have both.  The CodePlex Site Recycle Bin to provide archival and the Site Recycle Bin in Service Pack 1 to provide quick recovery and enable Site Collection administrators to perform self-service restores.

What happens to deleted Site Collections?  Do they ever get deleted?

These objects are purged.

There already is Web application property that controls the retention period for the Site Collection level Recycle Bin.  The same property is used for the deleted Site Collections themselves; when the Site Collection was deleted prior to a specified period (30 days), the timer job permanently removes it from the Content Database.  A Site Collection in the process of being permanently removed can no longer be restored.