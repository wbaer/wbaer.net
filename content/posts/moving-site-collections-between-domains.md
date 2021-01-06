---
title: 'Moving site collections between domains...'
date: Tue, 06 Nov 2007 10:49:00 +0000
draft: false
tags: ['Cross-Forest Hosting', 'Windows SharePoint Services 3.0']
---

Moving site collections between domains is not a common operation, but occurs frequently enough to provide some prescriptive guidance. 

**User Accounts**

SharePoint maintains the security identifiers of user accounts as opposed to just usernames, as a result, when restoring a site collection to a farm in a domain other than that where the original source site collection was located, those usernames are no longer recognized regardless as to whether or not those usernames were recreated in the target domain.  STSADM provides an operation suited to address this potential issue in the migrateuser operation which will effectively resolve the security identifiers of the users.

**Migrating User Accounts**

STSADM -o migrateuser migrates a user account in Microsoft Windows SharePoint Services 3.0 to a new user name and binary identifier (security identifier).

**Syntax**

stsadm -o migrateuser

   -oldlogin <domainname>

   -newlogin <domainname>

   \[-ignoresidhistory\]

\-oldlogin specifies the credentials of the source account (account to be migrated) and -newlogin the target account or destination credentials of the new account replacing the source account.  When specifying the -ignoresidhistory argument the security identifier history of the destination user is checked to determine and match the name of the old user or otherwise the meta data is ignored.