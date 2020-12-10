---
title: 'Microsoft Best Practices Analyzer for Windows SharePoint Services 3.0 and the 2007 Microsoft Office System Available!'
date: Fri, 16 Feb 2007 11:12:00 +0000
draft: false
tags: ['Best Practices Analyzer', 'Uncategorized']
---

The Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the **2007** **Microsoft Office System** is now available from the Microsoft Download Center!

The Microsoft Best Practices Analyzer programmatically collects settings and values from data repositories including Microsoft SQL Server, Registry, and Performance Monitor.  The data when collected is processed and a set of comprehensive best practice rules are applied to the topology.  Server farm administrators benefit from a detailed report listing of recommendations that can be applied to the environment resulting in performance and scalability improvements in additon to optimizing uptime.

[Download](http://www.microsoft.com/downloads/details.aspx?familyid=cb944b27-9d6b-4a1f-b3e1-778efda07df8&displaylang=en) \[[http://www.microsoft.com/downloads/details.aspx?familyid=cb944b27-9d6b-4a1f-b3e1-778efda07df8&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=cb944b27-9d6b-4a1f-b3e1-778efda07df8&displaylang=en)\] the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and **2007** **Microsoft Office System** today.

**Sample Microsoft Best Practices Analyzer Output** [![](https://wbaer.officeisp.net/Shared%20Picture%20Library/_w/BPASample_JPG.jpg)](https://wbaer.officeisp.net/Shared%20Picture%20Library/BPASample.JPG)

**Using the Microsoft Best Practices Analyzer for Windows SharePoint Services 3.0 and the 2007 Microsoft Office System**

1.  Download BestPracticeAnalyzer.exe  from [http://www.microsoft.com/downloads/details.aspx?familyid=cb944b27-9d6b-4a1f-b3e1-778efda07df8&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=cb944b27-9d6b-4a1f-b3e1-778efda07df8&displaylang=en).
2.  Save the file to a location on your server.
3.  Double-click **BestPractiveAnalyzer.exe** to extract the contents of the package.
4.  Open a Command Prompt and change the directory to the location of where you extracted **BestPracticeAnalyzer.exe**
5.  Run **sharepointbpa.exe -cmd analyze -substitutions SERVER\_NAME <ServerHostingCentralAdminWebApp>**.
6.  NOTE Replace **<ServerHostingCentralAdminWebApp>** with the server name of the machine hosting the Central Administration Web Application; any server in the server farm hosting the Central Administration Web Application can be used; this is required to obtain the server farm configuration data.
7.  The report will be generated as **sharepointbpa.report.htm** in your selected installation directory from Step 3 above.

The Microsoft Best Practices Analyzer for Windows SharePoint Services 3.0 and the 2007 Microsoft Office System can be run as often as required and should be run periodically to monitor and remediate issues that may have arised since the last run in the server farm.  See below for output after remediation (Incoming Mail Settings and DCLs were optionally not configured/remediated in this example):

[![](https://wbaer.officeisp.net/Shared%20Picture%20Library/_w/BPASample2_JPG.jpg)](https://wbaer.officeisp.net/Shared%20Picture%20Library/BPASample2.JPG)