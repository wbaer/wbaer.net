---
title: 'Profiles and Properties - Questions and Answers'
date: Fri, 21 Sep 2007 16:43:00 +0000
draft: false
tags: ['People and Profiles']
---

A e-mail dialogue came up with a colleague surrounding Profiles and Properties in Microsoft Office SharePoint Server 2007, with the questions specific to profile cleanup and management of changes in profile properties.

1.  How are inactive user profiles managed...
2.  How do I manage Active Directory property changes in Microsoft Office SharePoint Server 2007's profile database...

After I sent my reply, I realized this was not the first time the question arrived in my inbox so I've decided to include the explanations here:

**Profile Cleanup**

User profiles are checked against the Active Directory to determine whether or not there is a matching Active Directory object. If a matching object exists, the bDeleted flag is removed or set if a matching object does not exist during an incremental import. Management of these objects where a match could not be determined is handled through the native MySite Cleanup Job through either deleting the MySite collection for the unmatched object or assigning permission to the user’s manager and generating an e-mail notification.

**Handling Active Directory Changes**

Common occurrences in most organizations are changes in a user’s Active Directory properties, for example, a name change as the result of marriage or some other event. The user may report that when uploading documents, updating list items, etc. their name is incorrect; however, their SharePoint profile references the correct information. To resolve such occurrences, delete the user profile from the Shared Service Provider an execute a profile import to introduce a “clean” data set into the SSP or optionally run STSADM –o migrateuser to migrate the user data properly, edit some property on the profile to trigger the synchronization job.