---
title: 'SharePoint 2010 Virtualization Notes'
date: Thu, 24 Jun 2010 13:02:00 +0000
draft: false
tags: ['SharePoint Foundation 2010', 'SharePoint Server 2010', 'Virtualization']
---

I just wrapped up a great webcast this morning with Avanade and NetApp discussing the virtualization of SharePoint and was excited to see the audience today is largely planning a virtualization layer for SharePoint 2010, many to support server consolidation in legacy datacenters with limited resources understanding that SharePoint's adoption and improvements in vertical and horizontal scale will result in larger more scenario concentrated deployments, others looking to reduce OpEx and CapEx, and still others looking at virtualization to afford the ability to support resource throttling - providing resources in times of high demand and scaling resources back in times of low demand making the most efficient use of their hosts.

While today’s webcast focused on NetApp storage solutions, Avanade’s deployment and experience, and improvements in SharePoint 2010, I’ve also recently provided a number of Webcasts on TechNet with FPWeb.net and our Hyper-V team here at Microsoft where we discussed not only best practices with SharePoint 2007 and 2010 to include basic topology examples, but also the use of virtualization in hosting scenarios.  Those sessions can be found here:

TechNet Webcast: Microsoft Virtualization Best Practices for SharePoint (Level 200)  
[https://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032433237&CountryCode=US](https://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032433237&CountryCode=US)

TechNet Webcast: Deep Dive - Microsoft Virtualization Best Practices for SharePoint 2010 (Level 300)  
[http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032443103&EventCategory=5&culture=en-US&CountryCode=US](http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032443103&EventCategory=5&culture=en-US&CountryCode=US)

Business continuity management is another area of virtualization discussed across Webcasts, where we enforce the idea that you need to plan for both the virtualization layer and within that, the SharePoint implementation - while it adds some additional complexity when compared to strict physical deployments, it does bring with it compelling opportunities, particularly when looking at the capabilities offered in Hyper-V R2.

Also important when planning virtualization is deciding upon and differentiating between virtualization technology, i.e. Microsoft Windows Server 2008 R2 or Hyper-V Server 2008 R2.

Microsoft Hyper-V Server 2008 R2 is an affordable (free) entry point to implementing virtualization with minimal overhead since it provides only the Windows Hypervisor.  Microsoft Hyper-V Server 2008 R2 provides features such as host clustering, Live Migration, in addition to support 1TB of memory and 8 processors on the host operating system.    If you’re looking to gain application failover or guest virtualization rights you should consider Windows Server 2008 R2.  For additional details on deciding between Microsoft Hyper-V Server 2008 R2 and Windows Server 2008 R2 see the decision matrix here [http://www.microsoft.com/hyper-v-server/en/us/default.aspx](http://www.microsoft.com/hyper-v-server/en/us/default.aspx "http://www.microsoft.com/hyper-v-server/en/us/default.aspx").

To learn more about Microsoft Hyper-V Server 2008 R2, Windows Server 2008 R2, and the virtualization of a SharePoint 2010 deployment, see also the resources provided below.

**Additional Resources**

Microsoft Hyper-V Server 2008 R2  
[http://www.microsoft.com/hyper-v-server/en/us/default.aspx](http://www.microsoft.com/hyper-v-server/en/us/default.aspx)

Windows Server 2008 R2  
[http://www.microsoft.com/windowsserver2008/en/us/default.aspx](http://www.microsoft.com/windowsserver2008/en/us/default.aspx)

Virtualization Planning (SharePoint Server 2010)  
[http://technet.microsoft.com/en-us/library/ff607968.aspx](http://technet.microsoft.com/en-us/library/ff607968.aspx)

Virtualization Support and Licensing (SharePoint Server 2010)  
[http://technet.microsoft.com/en-us/library/ff607936.aspx](http://technet.microsoft.com/en-us/library/ff607936.aspx)

TechNet Webcast: Clusters and Virtualization: Guest Clustering vs. Host Clustering (Level 300)  
[http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=103244884](http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=103244884)

Microsoft Virtualization Team Blog  
[http://blogs.technet.com/b/virtualization/](http://blogs.technet.com/b/virtualization/)

**Whitepapers**

How Microsoft.com Moved to a Virtualized Infrastructure  
[http://technet.microsoft.com/en-us/library/ff728013.aspx](http://technet.microsoft.com/en-us/library/ff728013.aspx)

**Case Studies, Videos, Webcasts**

How Microsoft IT Reduced Operating Expenses Using Virtualization  
[http://technet.microsoft.com/en-us/library/ff700539.aspx](http://technet.microsoft.com/en-us/library/ff700539.aspx)

Virtualization Cuts Capital and Operating Expenses by 75 Percent at Microsoft  
[http://technet.microsoft.com/en-us/library/ff684119.aspx](http://technet.microsoft.com/en-us/library/ff684119.aspx)