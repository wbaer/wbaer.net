---
title: 'Stress Testing Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0'
date: Thu, 02 Aug 2007 14:28:00 +0000
draft: false
tags: ['Capacity Planning', 'Performance']
---

TechReady5 concluded on Friday and I'm finally returning to work after several customer sessions that immediately followed and one question was shared between the two - what do you recommend or what are you using to monitor performance and how do you determine load and stress when architecting a SharePoint Products and Technologies infrastructure?  The answer is, there are a variety of tools to stress test your Microsoft SharePoint Products and Technologies deployment; let's cover some them:

**SPSiteBuilder**

SPSiteBuilder was originally a component of the SharePoint Utility Suite. As many of you know there are no future plans to redevelop this application set and SPSiteBuilder packaged with the SharePoint Utility Suite won't work with Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0. The good news is that making the application compatible with Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0 does not require a great deal of effort or a large investment of time.

Let's step through fixing the code to support Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0:

First locate the line:

> globalAdmin = new SPGlobalAdmin();  
> virtualServer = globalAdmin.OpenVirtualServer(uri);

SPGlobalAdmin is maintained for backward comparability; replace the globalAdmin variable with Farm and the SPGlobalAdmin() method with new SPFarm().

> Farm = new SPFarm();

Now we need to replace the OpenVirtualServer() method since it is obsolete and use the Lookup() method of the WebApplication object.

> WebApp = WebApplication.Lookup(uri);

Now locate the line:

> if (!virtualServer.Config.Prefixes.Contains(strPrefix))  
> virtualServer.Config.Prefixes.Add(strPrefix, Microsoft.SharePoint.Administration.SPPrefixType.WildcardInclusion);

This enumeration member is obsolete in Windows SharePoint Services 3.0 because it is no longer necessary to tell Windows SharePoint Services which URL paths should not be handled by Windows SharePoint Services. So we should replace it with the WebApp variable we specified earlier.

>   
> if (!webApp.Prefixes.Contains(strPrefix))  
> webApp.Prefixes.Add(strPrefix, Microsoft.SharePoint.Administration.SPPrefixType.WildcardInclusion);  
> }

  
Finally to complete the retrofit we need to replace all instances of globalAdmin with Farm and all instances of virtualServer with WebApp and ensure we are referencing Microsoft.SharePoint.dll from a Windows SharePoint Services 3.0 build and recompile.

**[MOSSDW.EXE](http://www.codeplex.com/sptdatapop)**

MOSSDW.EXE is a performance testing tool that provides data population/stress testing capabilities for Microsoft Office SharePoint Server 2007.  If your plans include only data population, consider retrofitting SPSiteBuilder to support Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0 as described above.

[WSSDW.EXE](http://www.codeplex.com/sptdatapop)

WSSDW.EXE is a performance testing tool that populates data for testing deployments of Windows SharePoint Services 3.0 (see also SPSiteBuilder and MOSSDW.EXE).

**[Excel Services Ocracoke Performance Testing Sample Scripts](http://www.codeplex.com/sptdatapop)**

Excel Services Ocracoke Performance Testing Sample Scripts are performance testing scripts used in conjunction with MOSSDW.EXE that provide data population/stress testing capabilities for Excel Services.

[Internet Information Services (ISS) 6.0 Resource Kit Tools](http://www.microsoft.com/downloads/details.aspx?familyid=56FC92EE-A71A-4C73-B628-ADE629C89499&displaylang=en)

The IIS 6.0 Resource Kit Tools can help you administer, secure, and manage IIS; using the Web Capacity Analysis Tool Version 5.2 you can stress test your application.

[IIS Diagnostic Toolkit](http://www.microsoft.com/downloads/details.aspx?familyid=9BFA49BC-376B-4A54-95AA-73C9156706E7&displaylang=en)

The IIS Diagnostic Toolkit is a compiled set of tools aimed at reducing the overall time to resolve problems with Internet Information Services (IIS) products.  Use Debug Diagnostics 1.0 to run diagnostic tests for web servers hosting SharePoint Products and Technologies.

[Web Application Stress Tool](http://www.microsoft.com/downloads/details.aspx?FamilyID=e2c0585a-062a-439e-a67d-75a89aa36495&DisplayLang=en)

The Web Application Stress Tool is designed to realistically simulate multiple browsers requesting pages from a web site. You can use this tool to gather performance and stability information about your web application. This tool simulates a large number of requests with a relatively small number of client machines.

**[SQLIO.EXE Disk Subsystem Benchmark Tool](http://www.microsoft.com/downloads/details.aspx?familyid=9a8b005b-84e4-4f24-8d65-cb53442d9e19&displaylang=en)**

The I/O system is important to the performance of SQL Server. When configuring a new server for SQL Server or when adding or modifying the disk configuration of an existing system, it is good practice to determine the capacity of the I/O subsystem prior to deploying SQL Server.  SQLIO.EXE can be used to determine the I/O capacity of a given configuration.  An example of what we may see on a typical day during peak usage on a x64 A/P cluster hosting 100+ databases and supports 8 unique server farms, each with a local Shared Service Provider is:

> IOs/sec:  7808.43
> 
> MBs/sec:    15.25
> 
> sqlio v1.5.SG  
> using system counter for latency timings, 3579545 counts per second  
> parameter file used: param.txt  
> file c:testfile.dat with 2 threads (0-1) using mask 0x0 (0)  
> 2 threads writing for 360 secs to file c:testfile.dat  
> using 8KB sequential IOs  
> enabling multiple I/Os per thread with 8 outstanding  
> using specified size: 100 MB for file: c:testfile.dat  
> initialization done  
> CUMULATIVE DATA:  
> throughput metrics:  
> IOs/sec: 3434.19  
> MBs/sec: 26.82  
> latency metrics:  
> Min\_Latency(ms): 0  
> Avg\_Latency(ms): 4  
> Max\_Latency(ms): 282

**[SQLIOsim](http://support.microsoft.com/kb/231619)**

SQLIOsim simulates the I/O patterns of Microsoft SQL Server 2005, of SQL Server 2000, and of SQL Server 7.0. The I/O patterns of these versions of SQL Server resemble one another.  You can use SQLIOsim to simulate read, write, checkpoint, backup, sort, and read-ahead activities for Microsoft SQL Server 2005  (see also SQLIO.EXE Disk Subsystem Benchmark Tool).

**[Performance/System Monitor](http://msdn2.microsoft.com/en-us/library/aa830465.aspx)**

This is a standard component of the Windows operating system. You can use it to monitor performance objects and counters and instances of various hardware and software components.

Joel Oleson has a good list of counters for measuring Web front-end and backend performance - [http://blogs.msdn.com/joelo/archive/2007/01/16/good-list-of-performance-counters.aspx](http://blogs.msdn.com/joelo/archive/2007/01/16/good-list-of-performance-counters.aspx "http://blogs.msdn.com/joelo/archive/2007/01/16/good-list-of-performance-counters.aspx").

NOTE At minimum consider monitoring PhysicalDiskDisk Transfers per second or LogicalDiskDisk Transfers per second measuring the amount of IO reads and writes per second to the database drives (see illustration).

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StressTestingMOSS_10B1E/image%7B0%7D_thumb%5B9%5D.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StressTestingMOSS_10B1E/image%7B0%7D%5B19%5D.png)

**[Microsoft Operations Manager (MOM)](http://www.microsoft.com/mom/)**

You can install MOM agents on individual servers that collect data and send it a centralized MOM server. The data is stored in the MOM database, which can be a dedicated SQL Server or the Microsoft SQL Server 2000 Desktop Engine (MSDE) version of Microsoft SQL Server. MOM is suitable for collecting large amounts of data over a long period of time.   MOM packs to consider for a typical SharePoint Products and Technologies deployment include:

> **Microsoft Operations Manager Packs**
> 
> Microsoft Windows SharePoint Services  
> Microsoft SharePoint Portal Server 2003  
> Microsoft SQL Server 2000 & 2005  
> Microsoft Internet Information Server 6  
> Microsoft Cluster Service  
> Microsoft Windows 2003 Server
> 
> **Web Site Monitoring**
> 
> Web Sites and Services MP

Management Pack Catalog - [http://www.microsoft.com/technet/prodtechnol/mom/catalog/catalog.aspx?vs=2005](http://www.microsoft.com/technet/prodtechnol/mom/catalog/catalog.aspx?vs=2005 "http://www.microsoft.com/technet/prodtechnol/mom/catalog/catalog.aspx?vs=2005").

**[Stress tools such as Application Center Test (ACT)](http://support.microsoft.com/kb/307492/)**

You can use tools such as ACT to simulate clients and collect data during the duration of a test.

**[Network Monitor (NetMon)](http://msdn2.microsoft.com/en-us/library/ms709187.aspx)**

You use NetMon to monitor the network traffic. You can use it to capture packets sent between client and server computers. It provides valuable timing information as well as packet size, network utilization, addressing, and routing information and many other statistics that you can use to analyze system performance.

**[SQL Profiler](http://msdn2.microsoft.com/en-us/library/ms181091.aspx)**

Identify slow and inefficient queries, deadlocks, timeouts, recompilations, errors, and exceptions for any database interactions.  For example, one measure we implement is identifying queries exceeding two (2) seconds excluding search.  Profiling can be used when reports of latency are received in conjunction with monitoring the web front-end components of the server farm.

**[SQL Query Analyzer](http://msdn2.microsoft.com/en-us/library/aa216945(SQL.80).aspx)**

This tool is also installed with SQL Server. You can use it to analyze the execution plans for SQL queries and stored procedures. This is mostly used in conjunction with the SQL Profiler.

[SQLDiag](http://support.microsoft.com/kb/298475)

Collects valuable information about the configuration of the computer running SQL Server, the operating system, and the information that is reported to the SQL Server error logs.

**SharePoint Products and Technologies Performance and Capacity Planning Resources**

[Plan for availability (Windows SharePoint Services)](http://http/technet2.microsoft.com/windowsserver/WSS/en/library/965b2f19-4c88-4e85-af16-32531223aec71033.mspx?mfr=true)

[Plan for availability (Microsoft Office SharePoint Server 2007)](http://technet2.microsoft.com/Office/en-us/library/9ccfb27f-ecba-4b7d-b9a0-88fac71478a31033.mspx)

[Plan for performance and capacity (Microsoft Office SharePoint Server 2007)](http://technet2.microsoft.com/Office/en-us/library/8dd52916-f77d-4444-b593-1f7d6f330e5f1033.mspx)

[Determining the hardware requirements for a single farm (Microsoft Office SharePoint Server 2007)](http://technet2.microsoft.com/Office/en-us/library/031b0634-bf99-4c23-8ebf-9d58b6a8e6ce1033.mspx?mfr=true)

[Performance and capacity planning (Windows SharePoint Services)](http://technet2.microsoft.com/Office/en-us/library/558ea523-8191-4c02-b3ff-2f3dbfa852b51033.mspx)

[Performance and capacity planning factors (Microsoft Office SharePoint Server 2007)](http://technet2.microsoft.com/Office/en-us/library/9f3cfe3f-01b5-406e-8615-04735ae422861033.mspx?mfr=true)

[Estimate performance and capacity requirements for Windows SharePoint Services collaboration environments (Microsoft Office SharePoint Server 2007)](http://technet2.microsoft.com/Office/en-us/library/0a7b2b45-f633-46d2-a4fd-78691d4b8f631033.mspx)

[Microsoft Office SharePoint Server 2007 on HP ProLiant Servers - Performance Summary](http://h71019.www7.hp.com/ActiveAnswers/cache/497613-0-0-0-121.html)

[White Paper: Intel Performance Testing of Windows SharePoint Services](http://technet2.microsoft.com/WindowsServer/WSS/en/library/75e692ce-4bba-46c3-951d-e1d9325329821033.mspx)