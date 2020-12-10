---
title: 'Understanding PRESCAN.EXE in MOSS 2007'
date: Tue, 09 May 2006 21:57:00 +0000
draft: false
tags: ['Administration', 'PRESCAN', 'SharePoint', 'Upgrade &amp; Migration']
---

Prior to upgrading to **Microsoft Office SharePoint Server 2007**/**Windows SharePoint Services** 3.0 one of the prerequisites some of you may have already noticed is running **PRESCAN**.EXE from the installation directory.  This post will hopefully provide some insight into **PRESCAN**.EXE as well as best practices on when it should be run.

**PRESCAN**.EXE has two primary purposes:

1.  It parses and saves List definitions with the associated Lists.  **SharePoint Portal Server 2003** Service Pack 2 already incorporates this feature whenever a list is modified; however, this process should be completed for all Lists, so prescan calls the **SharePoint Portal Server 2003** Service Pack 2 method to persist that data.
2.  **PRESCAN**.EXE will report on common issues that will result in a failed upgrade; therefore, running **PRESCAN**.EXE, addressing reported issues, and resolving those issues, and re-running **PRESCAN**.EXE to verify those fixes is a best practice when planning a **Microsoft Office SharePoint Server 2007**/**Windows SharePoint Services** 3.0  upgrade.  The most commonly detected issues are:
    *   **Database Orphans** This is a class of issue where an object exists, but the pointer with the parent object is broken and/or corrupt.   Classic examples include situations where a site exists in the content database; however, does not exist in the configuration database and a web that points to a site collection that no longer exists. 
    *   **Missing Site Definitions** This issue is rare at best ad exists when a site collection has been removed/deleted - sites under this classification will not be upgraded and in addition those sites will not render in **SharePoint Portal Server 2003**/**Windows SharePoint Services** 2.0.

Typically these issues will manifest as a result of failed **STSADM** backup and restore sequences, but also can occur at the SQL level.

Depending on the nature and growth of your environment, **PRESCAN**.EXE is best run one (1) week prior to the production upgrade allowing time to address issues uncovered, and again prior to the upgrade itself to ensure that those previous issues have been resolved in addition to identifying new issues, if any.