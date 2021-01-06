---
title: 'Backup - Microsoft Office SharePoint Server 2007 Search'
date: Tue, 13 Mar 2007 11:44:00 +0000
draft: false
tags: ['Capacity Planning', 'Search']
---

One of the most critical components of **Microsoft Office SharePoint Server 2007** to many businesses is search and often is a key component of business processes. To ensure consistent and recoverable content is available to end-users, it becomes necessary to periodically backup the search components in the event of a catastrophic failure or issues requiring the rebuilding of the search component. Since re-crawling all content sources may not be practical or efficient in many cases, **Microsoft Office SharePoint Server 2007** has streamlined the search component backup and restore process. Some key notes follow:

The ability to query an index relies on two key search components:

1.  The index file propagated to the front-end web servers from the designated query server machine
2.  The Shared Services Provider Search database

> **NOTE** Backing up only the index file requires the SSP in addition to be searchable by users.How do I backup my index file and SSP Search database?

**Microsoft Office SharePoint Server 2007** has made the index backup and restore process heterogeneous, meaning a server farm’s index file and SSP search database can be backed up and restored from one central location, in this case, Central Administration.

**Step 1**

Open **Central Administration** and select the **Operations** tab.

Under the **Backup and Restore** options, select **Perform a backup**.

From the **Perform a Backup – Step 1 of 2: Select Component to Backup** window, select the Shared Services Provider component, this component includes the sub-components of the SSP content database, Shared Services database, User Profile Application, Session State Shared Application and the index component on the file system.

Click **Continue to Backup Options**

**Step 2**

From the **Start Backup – Step of 2: Select Backup Options** window, specify the type of backup as either **Full** or **Differential** and the backup file location. A Full backup will backup all of the components selected in step 1 including all history, a Differential backup can be run periodically to backup any and all changes to the component selected in step 1 since the previous Full backup.

Click **OK** to commit the changes.

**Step 3**

The backup status will be displayed once the Timer Job is scheduled and committed in the **Backup and Restore Status** window. This page also supplies options to view the history of previous backup and restore operations. History logs are stored in the directory specified to host the backup files and can also be reviewed by selecting the **Backup and Restore** | **Backup and restore history** option under the **Operations** tab in **Central Administration**.  Alternatively STSADM can be used to display a history of backup and restore operations that have been run using -o backuphistory; use STSADM -help backuphistory to generate a list of available commands.

**Step 4**

If the backup process is not indicated in the **Backup and Restore Status** window, verify the SharePoint Timer Service is running – additionally you can inspect the **Timer Job Definitions** under the **Operations** tab in **Central Administration** by checking the status of the Backup/Restore job.