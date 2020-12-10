---
title: 'Windows Server 2008 and Microsoft Office SharePoint Server 2007 - So happy together...'
date: Fri, 19 Oct 2007 18:06:00 +0000
draft: false
tags: ['Uncategorized', 'Windows Server 2008']
---

I've spent the last couple of weeks using SharePoint Products and Technologies with Windows Server 2008 (WS08), specifically running Microsoft Office SharePoint Server 2007 (MOSS) on Windows Server 2008 IIS 7.0 and Microsoft Office SharePoint Server 2007 SP1 in addition to check-in scenarios such as provisioning WS08 with WSS 3.0, introducing MOSS 2007, and ultimately SP1...I anticipated an improvement in performance, but the new implementation of the TCP/IP protocol suite AKA [Next Generation TCP/IP stack](http://www.microsoft.com/technet/community/columns/cableguy/cg0905.mspx) exceeded my expectations considering the Web front-ends I used were in our Singapore Data Center - a full 226ms of latency from Redmond.  I was most impressed by the ease of use with WS08 and the simplicity and effortless install and configuration of both WSS and MOSS despite IPv6 and their subsequent introduction to a production hosting farm as Web front-end servers.  They easily picked up configuration items from the configuration database and solution deployment was flawless.  Network Load Balancing was the next challenge, but again with little effort I was able to introduce the WS08 nodes into the load balancing rotation with Windows Server 2003 (WS03) machines...subscribe today - I'll have more on this topic as time progresses.

**Windows Server 2008 Resources**

Windows Server 2008 Homepage

[http://www.microsoft.com/windowsserver2008/default.mspx](http://www.microsoft.com/windowsserver2008/default.mspx "http://www.microsoft.com/windowsserver2008/default.mspx")

Release Candidate Evaluation Software

[Windows Server 2008 Release Candidate Evaluation Software](http://www.microsoft.com/windowsserver2008/audsel.mspx "Windows Server 2008 Release Candidate Evaluation Software")

IIS 7.0 in Windows Server 2008

[IIS 7.0 in Windows Server 2008](http://www.microsoft.com/windowsserver2008/iis/default.mspx "IIS 7.0 in Windows Server 2008")