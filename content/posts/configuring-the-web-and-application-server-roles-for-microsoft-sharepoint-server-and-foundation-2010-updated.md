---
title: 'Configuring the Web and Application Server Roles for Microsoft SharePoint Server and Foundation 2010 [UPDATED]'
date: Sun, 06 Dec 2009 14:11:00 +0000
draft: false
tags: ['IT Pro Resources', 'SharePoint Foundation 2010', 'SharePoint Server 2010', 'Uncategorized']
---

I’ve had a couple of questions on configuring the Web and Application server roles on Windows Server 2008 to support Microsoft SharePoint Server and Foundation 2010.  This post will describe the minimal prerequisite configuration to support Microsoft SharePoint Server and Foundation 2010 on Windows Server 2008.

**NOTE**

PrerequisiteInstaller.exe can be used to programmatically configure Web and application servers and install the required prerequisite software.  See also [http://blogs.technet.com/wbaer/archive/2009/11/18/installation-notes-for-microsoft-sharepoint-server-and-microsoft-sharepoint-foundation-2010-beta.aspx](http://blogs.technet.com/wbaer/archive/2009/11/18/installation-notes-for-microsoft-sharepoint-server-and-microsoft-sharepoint-foundation-2010-beta.aspx "http://blogs.technet.com/wbaer/archive/2009/11/18/installation-notes-for-microsoft-sharepoint-server-and-microsoft-sharepoint-foundation-2010-beta.aspx").

**Required Roles**

*   Application Server
*   Web Server

**Role Services**

*   Application Server Foundation
*   Web Server (IIS) Support
*   COM+ Network Access
*   TCP Port Shaping
*   Windows Process Activation Service Support

*   HTTP Activation
*   Message Queuing Activation
*   TCP Activation
*   Named Pipes Activation

*   Distributed Transactions

*   Incoming Remote Transactions
*   Outgoing Remote Transactions
*   WSS-Atomic Transactions

**Features**

*   .NET Framework 3.0 Features

*   .NET Framework 3.0
*   XPS Viewer
*   WCF Activation

*   HTTP Activation
*   Non-HTTP Activation

*   Message Queuing

*   Message Queuing Services

*   Message Queuing Server

*   Remote Server Administration Tools

*   Remote Administration Tool

*   Web Server (IIS) Tools

*   Windows PowerShell
*   Windows Process Activation Service

*   Process Model
*   .NET Environment
*   Configuration API’s

Optionally you can configure the required Roles, Roles Services, and Features by running the following statement from an elevated command prompt:

start /w pkgmgr /iu:IIS-WebServerRole;IIS-WebServer;IIS-CommonHttpFeatures;  
IIS-StaticContent;IIS-DefaultDocument;IIS-DirectoryBrowsing;IIS-HttpErrors;  
IIS-ApplicationDevelopment;IIS-ASPNET;IIS-NetFxExtensibility;  
IIS-ISAPIExtensions;IIS-ISAPIFilter;IIS-HealthAndDiagnostics;  
IIS-HttpLogging;IIS-LoggingLibraries;IIS-RequestMonitor;IIS-HttpTracing;IIS-CustomLogging;  
IIS-Security;IIS-BasicAuthentication;IIS-WindowsAuthentication;IIS-DigestAuthentication;  
IIS-RequestFiltering;IIS-Performance;IIS-HttpCompressionStatic;IIS-HttpCompressionDynamic;  
IIS-WebServerManagementTools;IIS-ManagementConsole;IIS-IIS6ManagementCompatibility;  
IIS-Metabase;IIS-WMICompatibility;WAS-WindowsActivationService;WAS-ProcessModel;  
WAS-NetFxEnvironment;WAS-ConfigurationAPI;WCF-HTTP-Activation;  
WCF-NonHTTP-Activation