---
title: 'SharePoint and Read-Only Domain Controllers (RODC)'
date: Fri, 05 Sep 2014 00:44:37 +0000
draft: false
tags: ['AD DS', 'Administration', 'RODC', 'SharePoint', 'SharePoint Server 2013']
---

_The question of read-only domain controllers (RODC) and SharePoint comes up frequently in conversation and on forums, whether not supported, and what potential issues can be expected if implemented with SharePoint.  This article will help address some of these questions._

FAQ
===

_Q:  Can I use a read-only domain controller (RODC) with SharePoint 2013?_

A:  Yes; however, there are limitations and constraints with certain operations (see below).  An implementation of RODC with SharePoint should assume a writable replication partner.  Introducing an RODC into an environment does impact applications that interact with AD DS to include SharePoint.  An RODC implementation should be thoroughly validated in an isolated non-production environment to understand constraints, limitations, performance, and any potential issues that may not exist with conventional, writable domain controllers.  In addition performance should be carefully monitored where connectivity between the RODC and partner replication server (writable domain controller) is limited.  In conclusion, an RODC implementation with SharePoint must include a writable partner replication server.

For additional information on RODC known issues see [http://technet.microsoft.com/en-us/library/cc725669(v=ws.10).aspx](http://technet.microsoft.com/en-us/library/cc725669(v=ws.10).aspx "http://technet.microsoft.com/en-us/library/cc725669(v=ws.10).aspx").

For RODC placement considerations see [http://technet.microsoft.com/en-us/library/cc732632(v=ws.10).aspx](http://technet.microsoft.com/en-us/library/cc732632(v=ws.10).aspx "http://technet.microsoft.com/en-us/library/cc732632(v=ws.10).aspx").

Q:  What is a RODC?

A:  An RODC is a revised version of a domain controller, introduced in Windows Server 2008 that hosts read-only partitions of AD DS.

RODC’s are most commonly implemented to address a variety of scenarios to include:

*   Placing domains controller where physical security cannot be guaranteed.
*   Domain controllers deployed with additional active server roles.
*   Domain controllers used in Extranet or application-facing roles.
*   Scenarios where low network bandwidth exists, I.e. branch office scenarios.

Q:  How does it work?

A:  Except for account passwords and other filtered attributes, an RODC holds the same user accounts and attributes that a writable domain controller holds. Clients, however, are not able to write changes directly to the RODC. Local applications that request Read access to the directory obtain access, whereas Lightweight Directory Access Protocol (LDAP) applications that perform a Write operation are referred to a writable domain controller in a hub site.

Q:  In what scenarios does SharePoint require a writable domain controller?

A:  There are a number of individual scenarios where a Write operation is required, some of which are base SharePoint functionality, and others workload dependent.

**NOTE** This is not an exhaustive list.

Installation/Configuration
--------------------------

SharePoint implements Service Connection Points that are created during installation and configuration.  Service Connection Points object represents one or more instances of a service that is available in a network.  For additional information on SharePoint and Service Connection Points see also [http://blogs.technet.com/b/wbaer/archive/2010/04/28/service-connection-points-and-governance-with-sharepoint-server-2010.aspx](http://blogs.technet.com/b/wbaer/archive/2010/04/28/service-connection-points-and-governance-with-sharepoint-server-2010.aspx "http://blogs.technet.com/b/wbaer/archive/2010/04/28/service-connection-points-and-governance-with-sharepoint-server-2010.aspx").

Profile Synchronization
-----------------------

If you'll export property values from SharePoint to AD DS, the synchronization account must have Create Child Objects (this object and all descendants) and Write All Properties (this object and all descendants) permissions on the organizational unit (OU) with which you are synchronizing.

**NOTE** Replicate Directory Changes does not require a writable domain controller.

The Replicate Directory Changes permission enables the synchronization account to read AD DS objects and to discover AD DS objects that have been changed in the domain.  The Replicate Directory Changes permission allows an account to query for the changes in the directory. This permission does not allow an account to make any changes in the directory.

People Picker
-------------

People picker is unable to resolve users in a trusted forest if the only domain controller SharePoint can access is read-only.   For additional information on People Picker and RODC’s see also [http://support.microsoft.com/kb/970612/en-us](http://support.microsoft.com/kb/970612/en-us "http://support.microsoft.com/kb/970612/en-us").

Managed Service Accounts
------------------------

SharePoint 2010 introduced the concept of a managed service account with works in correlation with AD DS to enable automatic password management, which can better isolate these services from other services on the computer.  Registering a managed account in SharePoint, allows SharePoint to change the credentials for a managed account at a specified interval.

Incoming E-mail and Provisioning Contacts
-----------------------------------------

Incoming E-mail implements the SharePoint Directory Management service to connect SharePoint sites to the user directory which allows users to create and manage e-mail distribution groups from SharePoint in addition to creating contacts in the user directory.  The SharePoint Directory Management service communicates with AD DS.

Publishing SharePoint on an Active Directory Service Connection Point
---------------------------------------------------------------------

See also **Installation/Configuration** above.

Conclusion
==========

In most cases an organization should not experience the issues listed above as a RODC implementation should include writable partner replication servers.

In Extranet and perimeter network scenarios, writer operations will fail, RODC is not a candidate in such scenarios; however, where connectivity exists between and RODC and a partner replication server, a write operation will return a referral to a writable domain controller – if connectivity to a writable domain controller is not available, then Write operations fail regardless of whether the application uses LDAP or ADSI.

For additional RODC planning and deployment information see also [http://technet.microsoft.com/en-us/library/cc771744(v=WS.10).aspx](http://technet.microsoft.com/en-us/library/cc771744(v=WS.10).aspx "http://technet.microsoft.com/en-us/library/cc771744(v=WS.10).aspx").