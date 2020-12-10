---
title: 'Intermittent Database Server Connectivity and Microsoft SharePoint Products and Technologies'
date: Tue, 06 Oct 2009 12:07:00 +0000
draft: false
tags: ['IT Pro Resources', 'SharePoint Tips', 'Uncategorized']
---

Intermittent connectivity to a database server hosting Microsoft SharePoint Products and Technologies databases can occur for a number of reasons.  In some cases it may be related to a simple database connection timeout configuration setting in Windows SharePoint Services or in other cases it may be one or more operating system and/or hardware configurations.  In this post we’ll examine several options and configuration settings that can be adjusted to help isolate or mitigate such occurrences.

Before we begin my apologies in advance for the flow, this started initially as  a collection of notes and thoughts.

**Monitoring**

Consider monitoring the following conditions to establish a history of database connectivity issues that can help to identify any potential patterns that can be useful in troubleshooting.  Correlate these events to the ULS, Event, and any other logging implementations.

Event Id 3760, Event Id 3355, and event Id 5586 are commonly related to database connectivity issues in Microsoft SharePoint Products and Technologies.  While other events can be raised at the application level, these are the most common.

Event Id information (Windows SharePoint Services Health Model)

Event Id 3760

[http://technet.microsoft.com/en-us/library/cc561036.aspx](http://technet.microsoft.com/en-us/library/cc561036.aspx "http://technet.microsoft.com/en-us/library/cc561036.aspx")

Event Id 3355

[http://technet.microsoft.com/en-us/library/cc561047.aspx](http://technet.microsoft.com/en-us/library/cc561047.aspx "http://technet.microsoft.com/en-us/library/cc561047.aspx")

Event Id 5586

[http://technet.microsoft.com/en-us/library/cc561042.aspx](http://technet.microsoft.com/en-us/library/cc561042.aspx "http://technet.microsoft.com/en-us/library/cc561042.aspx")

**Troubleshooting**

Let’s examine some possible areas of configuration at the various layers that can be evaluated or modified to mitigate issues with database connectivity.

**Database Timeout (Windows SharePoint Services)**

Consider incrementally increasing the database connection timeout setting used by Windows SharePoint Services depending on your latency variants between the application and database layer.  The default value is 15 seconds.  See [http://technet.microsoft.com/en-us/library/cc263314.aspx](http://technet.microsoft.com/en-us/library/cc263314.aspx "http://technet.microsoft.com/en-us/library/cc263314.aspx").

**TCP Offloading**

TCP Offloading can lead to intermittent issues when enabled, consider disabling TCP Offloading through configuring the Registry on the front-end Web and application servers.  See [http://support.microsoft.com/kb/904946/en-us](http://support.microsoft.com/kb/904946/en-us).

**TCP Chimney**

After you install Windows Server 2003 Service Pack 2 (SP2) or Windows Server 2003 Scalable Networking Pack (SNP) on a computer that has a TCP/IP Offload-enabled network adapter, you may experience many network-related problems.  Review the Knowledge Base article here ([http://support.microsoft.com/kb/948496/en-us](http://support.microsoft.com/kb/948496/en-us)) for options and instructions on how to disable SNP features in Windows Server 2003 (see also below for additional information).

**Scalable Networking Pack (SNP)**

After you install Windows Server 2003 Service Pack 2 (SP2) or Windows Server 2003 Scalable Networking Pack (SNP) on a computer that has a TCP/IP Offload-enabled network adapter, you may experience many network-related problems.  Consider disabling SNP features on front-end Web and application servers.

**Update Information**  
This update turns off default SNP features. After you install this hotfix, you can manually re-enable these features by modifying registry values. The following files are available for download from the Microsoft Download Center:

· Download the update for Windows Server 2003, x86-based versions (KB948496) package now. ([http://www.microsoft.com/downloads/details.aspx?FamilyId=062E954C-FDEC-45AF-A09C-5A05B8F010A5](http://www.microsoft.com/downloads/details.aspx?FamilyId=062E954C-FDEC-45AF-A09C-5A05B8F010A5))

· Download the update for Windows Server 2003, x64-based versions (KB948496) package now. ([http://www.microsoft.com/downloads/details.aspx?FamilyId=38E66572-5D47-4219-82D7-DB0C57478950](http://www.microsoft.com/downloads/details.aspx?FamilyId=38E66572-5D47-4219-82D7-DB0C57478950))

**High Stress Scenarios and SQLOLEDB**

You cannot access a SQL Server database by using the OLE DB provider for SQL Server when your application is in a high-stress scenario (KB7264) - Explains why you may receive "General Network Error" error messages when a large enterprise application that is in a high-stress scenario tries to access a SQL Server database.  
[http://support.microsoft.com/kb/907264/en-us](http://support.microsoft.com/kb/907264/en-us)

**Ephemeral Ports and MaxUserPort**

MaxUserPort can be critical in a couple of places for example when a client connects to a server.

Let’s first examine ephemeral ports - there are 5,000 ephemeral ports by default starting at 1025. With Internet Explorer when a connection is established it is on a port > 1025 (for outbound, client port) for a port 80 request and the server subsequently checks if a port in the 5,000 range is available.  If there are a substantial number of Web Parts deployed on a source page that result in additional calls, particularly authenticated connections, there is a time to live element that comes into play before the port can be reused. Once the ceiling of 5,000 is reached, we circle back around and start re-using ports, even if they are in use – this condition will basically appear as the inability to make an outbound connection or the connection simply disappears. On the front-end Web or application server where call is made we can increase MaxUserPort to help mitigate these occurrences. If you cannot leverage \*connection pooling in most cases you will require more ports so you will likely have to increase MaxUserPort.

\*Description of TCP/IP settings that you may have to adjust when SQL Server connection pooling is disabled (328476) - Describes certain TCP/IP settings that you may have to adjust when SQL Server connection pooling is disabled. You may have to change those TCP/IP settings for the operating system to deal with the higher stress levels.  
[http://support.microsoft.com/kb/328476/en-](http://support.microsoft.com/kb/328476/en-)

Basically anything that can cause the client to fail to open a TCP/IP socket to the computer that is running SQL Server can also cause Event Ids 3760, 3355, and 5586; however, with a stress related socket issue, the problem will occur intermittently as the stress increases and decreases.  In this scenario a front-end Web or application server may appear normal for hours or more with no errors, then the error occurs one or two times, and the front-end Web or application server then runs for several more hours with no errors. 

Basically in this context when you are experiencing this problem general database server connectivity will be normal at one point only to fail the next and subsequently works again at a subsequent point.

In summation stress-related socket issues in most circumstances occur sporadically where conversely actual connectivity problems with SQL Server will generally not exhibit this behavior, in most cases its all or none.

This is one of the most least common occurrences I’ve come across to date.  Most are related either to 1) a combination of SNP and interface features or 2) a SQL Server Connection Alias implementation (see below).

**SQL Server Connection Aliases**

If you are using SQL Server Connection Aliases to compliment Microsoft SQL Server Database Mirroring or optionally to make the database instance portable in support of migrations or operational functions, you should verify that Dynamically Determine Ports is not enabled in the SQL Server Client Network Utility.  When no port number is stored for the alias entry the DBNETLIB attempts to contact the server through a known UDP port to obtain the correct connection information to establish the connection, under certain scenarios this can result in losses of connectivity.

**Additional Considerations and Knowledge Base References**

The following references and knowledge base articles provide information and/or supporting documentation related to general connectivity issues that may be useful in isolating and resolving issues with intermittent database connectivity.

**KB196271** When you try to connect from TCP ports greater than 5000 you receive the error 'WSAENOBUFS (10055)'

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;196271](http://support.microsoft.com/default.aspx?scid=kb;EN-US;196271)

**KB120642** TCP/IP and NetBT configuration parameters for Windows 2000 or Windows NT

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;120642](http://support.microsoft.com/default.aspx?scid=kb;EN-US;120642)

**KB314067** How to troubleshoot TCP/IP connectivity with Windows XP

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;314067](http://support.microsoft.com/default.aspx?scid=kb;EN-US;314067)

**KB193602** Configuration options for WLBS hosts connected to layer 2 switches

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;193602](http://support.microsoft.com/default.aspx?scid=kb;EN-US;193602)

**KB227812** Only TCP/IP Should Be Bound to Virtual Network Adapter in WLBS Host

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;227812](http://support.microsoft.com/default.aspx?scid=kb;EN-US;227812)

**KB816792** How to configure TCP/IP Filtering in Windows Server 2003

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;816792](http://support.microsoft.com/default.aspx?scid=kb;EN-US;816792)

**KB914841** How to simplify the creation and maintenance of Internet Protocol (IPsec) security filters in Windows Server 2003 and Windows XP

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;914841](http://support.microsoft.com/default.aspx?scid=kb;EN-US;914841)

**KB287932** INF: TCP Ports Needed for Communication to SQL Server Through a Firewall

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;287932](http://support.microsoft.com/default.aspx?scid=kb;EN-US;287932)

**KB889647** How to change the TCP port that SharePoint Portal Server or SharePoint Server uses to connect to SQL Server

[http://support.microsoft.com/default.aspx?scid=kb;EN-US;889647](http://support.microsoft.com/default.aspx?scid=kb;EN-US;889647)

**KB942957** Security rules for Windows Firewall and for IPsec-based connections in Windows Vista and in Windows Server 2008

[http://support.microsoft.com/kb/942957](http://support.microsoft.com/kb/942957 "http://support.microsoft.com/kb/942957")

**KB904046** You experience intermittent communication failure between computers that are running Windows XP or Windows Server 2003

[http://support.microsoft.com/kb/904946/en-us](http://support.microsoft.com/kb/904946/en-us "http://support.microsoft.com/kb/904946/en-us")

**KB830471** You experience intermittent connectivity when you connect to a network from a computer that is running Windows XP or Windows Server 2003

[http://support.microsoft.com/kb/830471](http://support.microsoft.com/kb/830471 "http://support.microsoft.com/kb/830471")

**BLOG** Chris Gideon’s Blog \[#50070: Unable to connect to the database <Database Name>\]

[http://blogs.msdn.com/cgideon/archive/2006/05/24/605454.aspx](http://blogs.msdn.com/cgideon/archive/2006/05/24/605454.aspx "http://blogs.msdn.com/cgideon/archive/2006/05/24/605454.aspx")

**BLOG** Todd Carter’s Blog \[Database Disconnect Issues with SharePoint\]

[http://blogs.msdn.com/toddca/archive/2008/03/23/database-disconnect-issues-with-sharepoint.aspx](http://blogs.msdn.com/toddca/archive/2008/03/23/database-disconnect-issues-with-sharepoint.aspx "http://blogs.msdn.com/toddca/archive/2008/03/23/database-disconnect-issues-with-sharepoint.aspx")