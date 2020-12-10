---
title: 'SPS Gathering Manager Recommendations'
date: Thu, 09 Mar 2006 16:48:00 +0000
draft: false
tags: ['Performance', 'Search', 'Uncategorized']
---

I recently came across an issue with a customer that uses large files in **WSS**, notably, .CAD files; as a result these files were either - one, not indexed or two, indexing did not gather the required information from the file to provide useful search criteria.  To remidy the issue MaxDownloadSize was increased to 64MB while leaving the MaxGrowFactor at 4, this will essentially permit the index filter to produce up to 256MB (64 x 4) of text from a given file, the default setting in SPS is 16MB MaxDownloadSize and 4 MaxGrowFactor, limiting the index filter to 64MB max.

To set the MaxDownloadSize on an Index/Job server:

1.  On the taskbar, click **Start**, and then click **Run**.
2.  Type **regedit**, and then click **OK**.
3.  In **Registry Editor**, navigate to **HKEY\_LOCAL\_MACHINESoftwareMicrosoftSPSSearchGathering Manager**.
4.  In the details pane, right-click **MaxDownloadSize**, and then click **Modify**.
5.  In the **Edit DWORD Value** dialog box, in the **Value** data box, type the number for the maximum size of file that can be crawled. Ensure that **Base** is specified as **Decimal**.
6.  Click **OK**. Close **Registry Editor**.
7.  Perform an **Incremental (inclusive)** crawl.

To set the MaxGrowFactor on an Index/Job server:

1.  On the taskbar, click **Start**, and then click **Run**.
2.  Type **regedit**, and then click **OK**.
3.  In **Registry Editor**, navigate to **HKEY\_LOCAL\_MACHINESoftwareMicrosoftSPSSearchGathering Manager**.
4.  In the details pane, right-click **MaxGrowFactor**, and then click **Modify**.
5.  In the **Edit DWORD Value** dialog box, in the **Value** data box, type the number for the grow factor which is multiplied by the **MaxDownloadSize** to determine the maximum size of a file that can be indexed. Ensure that **Base** is specified as **Decimal**.
6.  Click **OK**. Close **Registry Editor**.
7.  Perform an **Incremental (inclusive)** crawl.