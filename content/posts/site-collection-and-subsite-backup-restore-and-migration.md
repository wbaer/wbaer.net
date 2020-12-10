---
title: 'Site Collection and subsite Backup, Restore, and Migration'
date: Tue, 31 Oct 2006 02:25:00 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'Uncategorized', 'Windows SharePoint Services 3.0']
---

I received an inquiry this week asking how to migrate an existing Site Collection as a subsite of a new parent Site Collection without having the availability of SMIGRATE in **Microsoft Office SharePoint Server 2007**/**Windows SharePoint Services 3.0**. The answer are new STSADM parameters, import and export, which has been made available in STSADM. The import/export feature is based on the new Content Migration APIs; Recycle Bin state and alerts are not included in STSADM -o export - the requirement that the new Site Collection or subsite exists, remains as with previous versions of STSADM when using the restore parameters. A benefit of the export parameter is that security settings will be included if desired; whereas, in SMIGRATE WSSUserUtil was required to capture and import web security. Sample syntax of the new parameters follows:

> `stsadm -help export`  
> `  [stsadm -o export -url URL -f filename]`  
> `stsadm -help import`  
> `  [stsadm -o import -url URL -includesecurity]`  

For more information on Content and site migration visit http://technet2.microsoft.com/Office/en-us/library/16a7e571-3531-4a4e-baa7-f348a9f9d1d11033.mspx?mfr=true