---
title: 'Resources for Virtualizing SharePoint 2010'
date: Mon, 27 Dec 2010 19:21:32 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2010', 'Virtualization']
---

As more organizations seek to reduce operating and capital expenditures, solve the challenges of datacenter density, and provide elasticity to their SharePoint deployments – virtualization becomes the focal point of discussion.  SharePoint 2010 provides more flexibility in support of virtualization and similar to other server technologies requires proper planning to ensure those goals are met.

**SharePoint 2010 Virtualization**

Support and Licensing

\[All elements of Microsoft SharePoint Server 2010 are fully supported when deployed in a Windows Server 2008 Hyper-V technology environment. In addition, any related or required supporting technologies are also supported.\]

\[Support for SharePoint Server 2010 virtualization includes third-party virtualization technologies that are hosted or hardware-based, and certified by Microsoft. For more information about certification and participating vendors, see the [Server Virtualization Validation Program (SVVP)](http://go.microsoft.com/fwlink/?LinkId=125649) ([http://go.microsoft.com/fwlink/?LinkId=125649](http://go.microsoft.com/fwlink/?LinkId=125649)).\]

\[Every element of a SharePoint farm that is installed on a virtual machine must comply with the licensing requirements for SharePoint Server 2010 as well as related and supporting technologies.\]

Source: [TechNet Library](http://technet.microsoft.com/en-us/library/ff607936.aspx)

Architecture

Prior to planning the physical architecture, a thoroughly planned and designed logical architecture should exist through which the physical architecture will ultimately be determined, and subsequently the underlying virtualization architecture.

_Architecture Resources_

[Virtualization Resource Center (SharePoint Server 2010)](http://technet.microsoft.com/sharepoint/ff602849.aspx)

> This SharePoint 2010 Resource Center provides information about [Hyper-V](http://technet.microsoft.com/#Hyper-V) to help you learn about virtualization, in addition to [articles](http://technet.microsoft.com/#KeyContent) and [models](http://technet.microsoft.com/#Model) to help you plan for, deploy, and use Microsoft SharePoint Server 2010 in a virtual environment.

[Virtualization Planning (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff607968.aspx)

> This TechNet article contains information designed to help you plan and implement a server virtualization solution for Microsoft SharePoint Server 2010 server farms.

[Plan virtual architectures (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff607811.aspx)

> This TechNet article discusses key considerations for planning virtual architectures by using Microsoft SharePoint Server 2010 server roles. This article does not include performance or capacity planning data or recommendations. It describes general guidance for planning virtual environments and includes example architectures for small, medium, and large size farms.

[Plan for virtualization (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff608127.aspx)

> This TechNet article describes the planning process to follow in order to successfully deploy Microsoft SharePoint Server 2010 in a virtual environment.

[Capacity Management and High Availability in a Virtual Environment (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff607864.aspx)

> This TechNet article provides information about capacity management and high availability for a virtual environment hosting Microsoft SharePoint Server 2010.

[Physical Architecture (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ee667264.aspx#Physical)

> This TechNet article describes the SharePoint 2010 physical architecture, which consists of one or more servers and the network infrastructure, enables you to implement the logical architecture for a SharePoint Server solution.

Business Continuity Management

Business continuity management plans will become slightly more complex to support the additional server roles that become part of the deployment, the host servers.  Business continuity management plans should include both the virtualization architecture and SharePoint 2010 taking both into consideration as server machines are distributed across the virtualization architecture.

_Business Continuity Management Resources_

[Business Continuity Management Resource Center (SharePoint Server 2010)](http://technet.microsoft.com/sharepoint/ff601831.aspx)

> This SharePoint 2010 Resource Center contains resources to help you set your business continuity management strategy, including [backup and recovery](http://technet.microsoft.com/#backup), [availability and disaster recovery](http://technet.microsoft.com/#availability), and [versioning and item-level recovery](http://technet.microsoft.com/#version).

[Hyper-V: Using Hyper-V and Failover Clustering](http://technet.microsoft.com/en-us/library/cc732181(WS.10).aspx)

> This TechNet guide walks you through the steps required to set up Hyper-V™ and the Failover Clustering feature to use these two technologies together.

[Capacity Management and High Availability in a Virtual Environment (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/ff607864.aspx)

> This TechNet article provides information about capacity management and high availability for a virtual environment hosting Microsoft SharePoint Server 2010.

[Planning for Backup (Hyper-V)](http://technet.microsoft.com/en-us/library/dd252619(WS.10).aspx)

> When you plan a backup and recovery strategy for a virtualized server environment, there are several factors to consider. You must consider the different types of backups you can make, the state of the virtual machine, and the type of storage being used by the virtual machines. This TechNet article discusses the advantages, disadvantages, and considerations for these factors.

**SQL Server Virtualization**

Support and Licensing

SQL Server 2008 Support and Licensing FAQ’s can be viewed at [SQL Server 2008 Virtualization FAQ](http://download.microsoft.com/download/5/2/4/524C3695-F45D-4046-AA85-98B7143D8D7C/SQL%20Server%202008%20-%20Product%20Information%20-%20Technologies%20-%20Virtualization%20FAQ%20v2.xps "SQL Server 2008 Virtualization FAQ").

_SQL Server Virtualization Resources_

[SQL Server 2008 Virtualization](http://www.microsoft.com/sqlserver/2008/en/us/virtualization.aspx "http://www.microsoft.com/sqlserver/2008/en/us/virtualization.aspx")

[High Performance SQL Server Workloads on Hyper-V](http://download.microsoft.com/download/D/F/8/DF89D22D-39C8-4728-A990-3BD4467891B7/HighPerformanceSQLServerWorkloadsOnHyper-V_Final.docx)

> This whitepaper describes the advantages of deploying Microsoft SQL Server database application workloads to a virtualization environment using Microsoft Windows Server 2008 R2 Hyper-V.  It demonstrates that Hyper-V provides the performance and scalability needed to run complex SQL Server workloads in certain scenarios.

[Running SQL Server 2008 in a Hyper-V Environment - Best Practices and Performance Recommendations](http://sqlcat.com/whitepapers/archive/2008/10/03/running-sql-server-2008-in-a-hyper-v-environment-best-practices-and-performance-recommendations.aspx)

> This document addresses right-sizing hardware to consolidate workloads and capacity planning challenges of running Microsoft SQL Server in a Hyper-V environment to include:
> 
> *   System resource overhead imposed by running SQL Server in a Hyper-V environment
> *   How well Hyper-V scales running SQL Server 2008
> 
> This whitepaper describes the series of test configurations run, which represented a variety of possible scenarios involving SQL Server running in Hyper-V.  The paper discusses the results and observations, and it also presents recommendations.

[Microsoft Exchange Server, SQL Server, SharePoint Server Mixed Workload on Microsoft Hyper-V and NetApp Fabric MetroCluster](http://media.netapp.com/documents/tr-3804.pdf)

> This document showcases the simplicity of architecting a robust infrastructure with Microsoft Windows Server 2008 R2 Hyper-V in a virtual environment with NetApp storage, to provide the ability to maintain HA for both the computing and storage resources between the primary and secondary sites and complete disaster recovery in the event of the loss of a whole site.

[The Benefits of Virtualizing Microsoft SQL Server in Hitachi Storage Environments](http://www.hds.com/assets/pdf/the-benefits-of-virtualizing-microsoft-sql-server-wp.pdf)

> This paper discusses the specific benefits that organizations can achieve by virtualizing Microsoft SQL Server in Hitachi Adaptable Modular Storage or Hitachi Universal Storage Platform environments.

[Microsoft SQL Server 2008 Server Consolidation](http://www.microsoft.com/sqlserver/2008/en/us/server-consolidation.aspx)

**Additional Resources**

TechNet Webcast: Microsoft Virtualization Best Practices for SharePoint (Level 200)  
[https://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032433237&CountryCode=US](https://msevents.microsoft.com/CUI/WebCastEventDetails.aspx?culture=en-US&EventID=1032433237&CountryCode=US)

TechNet Webcast: Deep Dive - Microsoft Virtualization Best Practices for SharePoint 2010 (Level 300)  
[http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032443103&EventCategory=5&culture=en-US&CountryCode=US](http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032443103&EventCategory=5&culture=en-US&CountryCode=US)

Blog Post: [SharePoint Virtualization Notes](http://blogs.technet.com/b/wbaer/archive/2010/06/24/sharepoint-2010-virtualization-notes.aspx)