---
title: 'People Picker Port/Protocol Requirements'
date: Wed, 21 Jan 2009 16:37:53 +0000
draft: false
tags: ['People Picker', 'Ports &amp; Protocols']
---

While working on a deployment this week, the OOB _People Picker_ caught my attention and I realized there was not a great deal of documentation available on its requirements and troubleshooting.  Driving this thinking was the nature of the deployment on which it was to be configured - a cross forest, secured deployment with Web front-end servers in a firewalled perimeter network.

**Purpose**

The _People Picker_ enables an end-user to specify a name or partial name when provisioning a user on a site collection and have the input resolved and validated against a directory source.  (see illustration).  If more than one potential match exists, all related results will be displayed in the dialog.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6b6df042cbf3_12FF9/image_thumb_1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6b6df042cbf3_12FF9/image_4.png)

Conceptually the port requirements become clear, 1) we know we are executing an LDAP query against a directory source impersonating an account with access to that source, binding to the users container and a SearchResultCollection object to hold a collection of SearchResults returned by the FindAll method (see example later in this article) and 2) we require name resolution to resolve a directory server at the destination.  Specifically when you enter a name or partial name in the user interface the Windows API will return a SID for that account, once the SID has been acquired, the People Picker attempts to retrieve additional information about that user from the Active Directory.  Quite clearly under these conditions we will require either port 389 LDAP or port 636 sLDAP, or where a Domain Controller is granted the Global Catalog role, 3268 and 3269, and in both cases 53 DNS, 445 Directory Services in addition to authentication protocols, Kerberos, Kerberos-Adm, and Kerberos-IV.  A complete list of ports and protocols required to successfully instantiate and execute a People Picker request are as follows (WFE):

TCP/UDP 135, 137, 138, 139 (RPC)  
TCP/UDP 389 by default, customizable (LDAP)  
TCP 636 by default, customizable (LDAP SSL)  
TCP 3268 (LDAP GC)  
TCP 3269 (LDAP GC SSL)  
TCP/UDP 53 (DNS)  
TCP/UDP 88 (Kerberos)  
TCP/UDP 445 (Directory Services)  
TCP/UDP 749 (Kerberos-Adm) \[Opt.\]  
TCP port 750 (Kerberos-IV) \[Opt.\]

**Troubleshooting**

Troubleshooting occurrences where the _People Picker_ either cannot resolve a known user name or the connection times out is a process by which there are several opportunities.

**Review the Event Viewer and Trace Logs for errors.**

The Event Viewer can be used to diagnose any application errors that may be preventing the _People Picker_ from resolving a name or partial name, in addition to the Event Viewer, the Trace Logs provide valuable information on diagnosing issues with the _People Picker_.  If a search query fails, check the Trace Logs filtering by the requested name or partial name, use the exception message or stack trace information to determine the appropriate course of action.  Most errors are caused by either an unreachable directory service or timeouts due to latent connectivity between the WFE and Directory Services server(s)...keep in mind the default Active Directory search timeout for the _People Picker_ is 30 seconds.

**Develop similar functionality using the .NET DirectoryServices namespace DirectoryEntry and DirectorySearcher classes.**

**Sample Code**

```
//Initialize a new instance of the DirectoryEntry class that binds to the specified Active Directory object
DirectoryEntry de = new DirectoryEntry("LDAP://OU=USERACCOUNTS,DC=CONTOSO,DC=COM");
//Set the user name to use when authenticating the client
de.Username = contoso\\user;
//Set the password to use when authenticating the client
de.Password = <password>;
//Initialize a new instance of the DirectorySearcher class with the specified search filter
DirectorySearcher ds = new DirectorySearcher(de);
//Sets a value indicating the LDAP format filter string.
ds.Filter = "(SAMAccountName=jdoe)";
//Executes a search and returns only the first entry that is found.
SearchResult rs = ds.FindOne();
de = rs.GetDirectoryEntry);
Console.WriteLine(de.Name);
```

The C# code will enable searching for a specific user from the specified object thereby replicating base People Picker functionality.  Proper exception handling will provide a good source for determining where a potential issue may exist.

**Check Configuration**

Check the Configuration Database and Web application property bags, _People Picker_ configuration values are stored in the Web application and Configuration Database objects with the values exposed through the properties bag.

Confirm the necessary ports and protocols to traffic the request are available using PortQry or similar application and consider, in the case of PortQry, putting together an XML template that captures these requirements and validate using that template with each build out.

**Resources**

[Configuring the People Picker](http://blogs.technet.com/wbaer/archive/2007/02/21/configuring-sharepoint-products-and-technologies-for-cross-forest-deployments.aspx)