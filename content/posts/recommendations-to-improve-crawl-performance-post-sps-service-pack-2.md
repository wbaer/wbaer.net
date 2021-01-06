---
title: 'Recommendations to Improve Crawl Performance Post SPS Service Pack 2'
date: Tue, 07 Feb 2006 23:08:00 +0000
draft: false
tags: ['Performance', 'Search']
---

**SharePoint Portal Server 2003** Service Pack 2, by default, will disable some features previously distributed in service pack 1; this article will key in on feaures specific to search and indexing recommendations to improve crawl performance post-service pack 2 and correct features disabled in service pack 2.

**Prevent the indexer from enumerating local groups on WSS crawled content.**

1\. Click **Start**, click **Run**, type **regedit**, and then click **OK**.

2\. Locate and then click the following registry subkey:

**HKEY\_LOCAL\_MACHINESoftwareMicrosoftSPSSearchGathering Manager**

3\. On the **Edit** menu, point to **New**, and then click **DWORD Value**.

4\. Type **IgnoreWSSLocalGroups**, and then press **ENTER**.

5\. Right-click **IgnoreWSSLocalGroups**, and then click **Modify**.

6\. In the **Value** data box, type **1**, and then click **OK**.

7\. On the **File** menu, click **Exit** to quit **Registry Editor**.

**Enable single threaded filter extensions.**

Add the WSSSingleThreadedFilterExtensions registry entry to the following registry subkey, and then specify the file name extensions that you want:

**HKEY\_LOCAL\_MACHINESoftwareMicrosoftSPSSearchGathering Manager**

To do this, follow these steps:

1\. Click **Start**, click **Run**, type **regedit**, and then click **OK**.

2\. Locate and then click the following registry subkey:

**HKEY\_LOCAL\_MACHINESoftwareMicrosoftSPSSearchGathering Manager**

3\. On the **Edit** menu, point to **New**, and then click **String Value**.

4\. Type **WSSSingleThreadedFilterExtensions**, and then press **ENTER**.

5\. Right-click **WSSSingleThreadedFilterExtensions**, and then click **Modify**.

6\. In the **Value** data box, type the file name extensions that you want. The following are two things to consider when you type file name extensions:

7\. Do not use a period character (.) before each file name extension that you type.

8\. Separate each file name extension with a semicolon character (;).

For example, if you want to use the single-threaded filter for .jpg files, for .pdf files, and for .gif files, type the following line in the Value data box:

**jpg;pdf;gif**

1\. Click **OK**, and then click **Exit** on the **File** menu to quit **Registry Editor**.

2\. Restart the **Microsoft SharePointPS Search** service. To do this, follow these steps:

3\. Click **Start**, click **Run**, type **cmd**, and then click **OK**.

4\. Stop the **Microsoft SharePointPS Search** service. To do this, type **net stop sharepointpssearch** at the command prompt, and then press **ENTER**.

5\. Start the Microsoft SharePointPS Search service. To do this, type **net start sharepointpssearch** at the command prompt, and then press **ENTER**.