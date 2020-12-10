---
title: 'Interesting find on Event Id’s 3760 and 5586…'
date: Thu, 11 Jun 2009 13:30:00 +0000
draft: false
tags: ['Uncategorized']
---

I was recently asked to look at an issue in which SharePoint would intermittently drop its connection to SQL.  Taking the typical course of action, I started looking at the Application Event Logs, Trace (ULS) logs, etc.  I noticed in the Application Event Logs event Id 3760 and 5586 occurred every hour on the hour.  The initial event Id 3760 indicated authentication issues, the Domain Controllers did not see issue that corresponded to the events reported by SharePoint; Scalable Networking Pack Features, MaxConcurrentAPI, etc. settings looked clean across the machines as well, event Id 5586 immediately followed event Id 3760.

Product:

Windows SharePoint Services

ID:

3760

Source:

Windows SharePoint Services 3

Details:

SQL Database ‘<Configuration Database>’ on SQL Server instance ‘<SQL Server>’ not found. Additional error information from SQL Server is included below.

Cannot open database "<Configuration Database>" requested by the login. The login failed.  
Login failed for user ‘<DomainUsername>’.

For more information, see Help and Support Center at http://go.microsoft.com/fwlink/events.asp.

Product:

Windows SharePoint Services

ID:

5586

Source:

Windows SharePoint Services 3

Details:

Unknown SQL Exception 10060 occurred. Additional error information from SQL Server is included below.

An error has occurred while establishing a connection to the server.  When connecting to SQL Server 2005, this failure may be caused by the fact that under the default settings SQL Server does not allow remote connections. (provider: TCP Provider, error: 0 - A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.)

For more information, see Help and Support Center at [http://go.microsoft.com/fwlink/events.asp](http://go.microsoft.com/fwlink/events.asp).

I did some research and came across Todd Carter’s post and considered IPSec as a potential problem, ran IPSec diagnostics, and eventually after parsing the diagnostic logs ruled out IPSec as a potential cause.  While walking through the environments' configuration I noticed a SQL Server Connection Alias was implemented on the SharePoint WFE and application servers.  Typically a Connection Alias is used when an administrator would like to redirect a SQL connection with the existing SQL Server to another SQL Server instance on any machine or more commonly make a connection to a SQL Server using a specific protocol (e.g. TCP, Named Pipes, etc) with specific parameter (e.g. TCP port, pipe name), the database design consisted of two (2) SQL servers in a Database Mirroring architecture so the implementation of a Connection Alias was expected. 

While checking the information in the SQL Server Client Network Utility I noticed that the option to dynamically determine port was selected, since the SQL server instance was configured to listen on 1433 and not an alternative port, I configured the fixed port and protocol in the Client Network Utility.  **NOTE** When no port number is stored for the alias entry the DBNETLIB attempts to contact the server through a known UDP port to obtain the correct connection information to establish the connection.   After configuring the connection parameters to use the fixed port of 1433 the issue subsided.  Going back to the failures, parsing Trace Log data, the connectivity drops appeared to correlate to the execution of built-in Timer Jobs which taking the dynamic port detection into account seems to have been the cause of the problem.