---
title: 'Managing Master Merge in Microsoft Office SharePoint Server 2007'
date: Mon, 03 Dec 2007 09:34:00 +0000
draft: false
tags: ['Performance', 'Uncategorized']
---

Master merge compiles all index data comprised of both in-memory and disk-based structures into one disk-based structure to prevent the degradation of the search service. SPS 2001 allowed administrators to manipulate the master merge schedule through HKEY\_LOCAL\_MACHINESoftwareMicrosoftSearch1.0CatalogNamesSharePointPortalServerworkspace\_nameIndexer:ci:MidNightMasterMergeTimeDelta, but only to a limited degree of the specification of minutes past 12:00 A.M. that master merge should occur. Microsoft Office SharePoint Server 2007 does not provide an out of the box mechanism for manipulating the scheduling of the master merge process; however, options are available to script a scheduled master merge operation.

In Microsoft Office SharePoint Server 2007 content indexes are propagated from the index server to each query server in the Web farm, the full index is propagated during query server initialization and only incremental changes in the index are propagated on an ongoing or continual basis. Depending on your environments rate of change, you may seek to control propagation of incremental changes to mitigate potential performance issues as a result of the size of your corpus or available bandwidth between servers.

The attached script can be used to force master merge if the document count since the preceding master merge is greater than a specified percentage, for example, a setting of 5% will provide room to crawl x number of documents without starting a master merge the next day. The out of the box master merge starts on the conclusion of a crawl and the number of documents updated since the previous master merge is greater than 10%.

To use this script, save the attached code as .vbs and run on each query server in your Web farm - it will perform the same operation on all Shared Service Providers that are serviced on the Web farm. Execute the script as cscript .vbs 5% or optionally call the script as a scheduled task through a batch or command file.

`Sub ScheduleMasterMerge( AppName, Pct )  
  dim cdocsInMasterIndex, cDocsInShadowIndexes, PctActual  
  
  Set globalAdmin = WScript.CreateObject("OSearch.GatherMgr.1", "")  
  set application = globalAdmin.GatherApplications(AppName)  
  set project = application.GatherProjects("Portal_Content")  
  cdocsInMasterIndex = project.StatusInfo(3)  
  cDocsInShadowIndexes = project.StatusInfo(4)  
  
  if 0 <> cDocsInShadowIndexes+cdocsInMasterIndex Then  
    PctActual = 100 * cDocsInShadowIndexes/(cDocsInShadowIndexes+cdocsInMasterIndex)  
  
    if PctActual > Pct then  
      project.ForceMerge(0)   
      Wscript.Echo "Successfully scheduled Master Merge."  
      end if   
    else  
  wscript.Echo "No documents in index. Scheduling failed."  
  end if  
  
End Sub  
  
dim RegPath  
dim Pct  
dim Keys  
const HKEY_LOCAL_MACHINE = &H80000002  
RegPath = "SoftwareMicrosoftOffice Server12.0SearchApplications"  
  
  Pct = CLng(wscript.arguments(0))  
  
  Set oReg=GetObject("winmgmts:{impersonationLevel=impersonate}!\.rootdefault:StdRegProv")  
  oReg.EnumKey HKEY_LOCAL_MACHINE, RegPath, Keys  
  For Each subkey In Keys  
    call ScheduleMasterMerge( subkey,Pct )  
  Next`