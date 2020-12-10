---
title: 'Understanding PRESCAN.EXE Errors'
date: Sat, 23 Dec 2006 02:26:00 +0000
draft: false
tags: ['Migration &amp; Upgrade', 'PRESCAN', 'SharePoint', 'Upgrade &amp; Migration']
---

\*UPDATED 5/22/2007 

I put together this post as a follow-up to my initial **PRESCAN** topic "[Understanding PRESCAN.EXE in MOSS 2007](http://blogs.technet.com/wbaer/archive/2006/05/09/427831.aspx)"; hopefully, this will provide insight into the most common **PRESCAN** errors administrators may encounter and remediation steps where available. These solutions may not fit every environment due to the natural differences in topologies, hosting models, versioning, and infrastructure.

**Error:**

**There is no Web named "/<path>/<site>".**

1.  The Content Database contains one or more orphaned Webs.  A Web may not have a parent **Windows SharePoint Services 2.0** site.

Find and repair orphaned Webs, Lists, and Document Libraries using **STSADM** -o databaserepair -url http://<server> -databasename <WSS2.0\_Content\_Database> \[-deletecorruption\].  This operation requires hotfix KBs [918742](http://support.microsoft.com/default.aspx?scid=KB;%5bLN%5d;918742) and/or [918744](http://support.microsoft.com/kb/918744/).  Joel Oleson has a great post on these hotfix KBs [here](http://blogs.msdn.com/joelo/archive/2006/07/12/663629.aspx).

**Error:**

**Cannot locate list definition required for upgrade. Check to ensure you have all templates and language packs installed.  
Error: Exception scanning web:** **http://<server****\>/<path>/<site>  
System.IO.FileNotFoundException: The system cannot find the file specified.**

1.  A **Windows SharePoint Services 2.0** language pack or **Windows SharePoint Services 2.0** application template is not installed.
2.  Templates used by **SharePoint Portal Server 2003** can be incorrectly identified during the pre-upgrade scan as custom templates unless you use the preupgradescanconfig.xml file when you perform the scan. This file contains additional logic to identify the portal site templates as standard templates used by **SharePoint Portal Server 2003** rather than as custom templates based on **Windows SharePoint Services 2.0**.
    

Install language packs and application templates as required or use the preupgradescanconfig.xml file when you perform the scan.

**Error:**

**\[UpgradeDiscussionLists\] \[3.0.87.0\] \[ERROR\] \[12/11/2006 5:06:15 PM\]: Data is Null. This method or property cannot be called on Null values.**

****\[UpgradeDiscussionLists\] \[3.0.87.0\] \[ERROR\] \[12/11/2006 5:06:15 PM\]: Item update failed for list 3cc63b2b-8a42-4ef3-bfa4-6e40f4827ec6, thread 20051208-1643-2400-a3fe-67a3e9495a11, ordering 20051208164324****

1.  Required fields are NULL on a List within a Web and/or **Windows SharePoint Services 2.0** site.  As an example, a Discussion Board may contain one or more posts with a blank Subject and/or Body field. 

Using the reported ListId, Identify the Web and/or **Windows SharePoint Services 2.0** site hosting the List and correct the input as necessary.

**Error:**

**Upgrade has encountered one or more lists that were not updated by Prescan.exe and must exit. The most likely reasons for Prescan to skip a list are covered in the Knowledge Base article at: http://go.microsoft.com/fwlink/?linkid=69958&clcid=0x409. For more information about which lists were not upgraded, see the upgrade log file at _LocationOfLogFile_.**

1.  The content database contains one or more orphaned lists. For example, a list may not have a parent **Windows SharePoint Services 2.0** site.
2.  The content database contains one or more **Windows SharePoint Services 2.0** sites that use an included path. Additionally, the included path is not defined on the server.

See [http://support.microsoft.com/kb/923904](http://support.microsoft.com/kb/923904) for additional information.

**Error:**

_**"PRESCAN failed for site /<prefix>/<site>.  The site could not be access through the SharePoint Object Model."**_

1.  A **Windows SharePoint Services 2.0** Inclusion path is missing.  Confirm all inclusion paths used by **Windows SharePoint Services 2.0** sites are available.

If **PRESCAN** fails on any Content Database you will receive an error when attempting to run the upgrade which will render as follows:

**The pre-upgrade scan tool has not yet been run on this database SPContentDatabase Name=Some\_Content\_Database Parent=SPDatabaseServiceInstance. You must run the pre-upgrade scan tool before you can continue with the upgrade process. Run the tool from the following path: C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions12binprescan.exe.**

**Error: Prescan has encountered sites or lists that were not updated because they cannot be accessed using the SharePoint Products and Technologies object model. The most likely reasons for Prescan to skip a list are covered in the Knowledge Base article at:** [**http://go.microsoft.com/fwlink/?linkid=69958&clcid=0x409**](http://go.microsoft.com/fwlink/?linkid=69958&clcid=0x409)**.**

**Error:**

**FAILED to persist field schema of lists in web \[insert URL of site\]**

**Error: The following site has not been scanned. Id = df843563-2961-41ff-ad61-0414c67d7305 and Url = abc/TestABC**

**Error: The following list has not been scrubbed: Id=6bfb5f3d-fa4b-4c71-b251-0778e0e1018a, Name=Web Part Gallery, Containing Web=abc/TestABC**

1.  The content database contains one or more orphaned lists. For example, a list may not have a parent **Windows SharePoint Services 2.0** site.

**Error:**

**The site [http://<server](http://%3cserver/)\>/<path>/<site> cannot be opened. The site might be corrupted. To fix this problem, delete the site and recreate it.**

**Error: The following site has not been scanned. Id = f85aaeee-b93e-491f-b2ff-88d449f1166f and Url = <path>/<site>  
**[**http://support.microsoft.com/kb/918744**](http://support.microsoft.com/kb/918744)

1.  The configuration database contains one or more orphaned or inaccessible site collections. Confirm the site exists or unlock the site collection in Central Administration. If the site does not exist, recreate the site collection and run **PRESCAN**.

**Error:**

**This server is not the indexer of this search application.**

1.  This issue occurs if the Windows SharePoint Services 3.0 database is hosted on a separate computer that is running Microsoft SQL Server. In this situation, the Windows SharePoint Services search logon account may not have the correct permission to access or to query the Windows SharePoint Services database on the computer that is running SQL Server.  To resolve this issue visit [http://support.microsoft.com/kb/923896/en-us](http://support.microsoft.com/kb/923896/en-us).

**Error:**

**An exception of type Microsoft.SharePoint.PostSetupConfiguration.PostSetupConfigurationTaskException was thrown.  Additional exception information: The pre-upgrade scan tool has not yet been run on all servers in the farm.  You must run the pre-upgrade scan tool before you can continue with the upgrade process.  Run the tool from the following path: c:program filescommon filesMicrosoft sharedweb server extensions12binprescan.exe.  After you have reviewed any issues found by the tool, you can run psconfig.exe again to continue the upgrade process.**

1.  This issue occurs if psconfig.exe was run prior to successfully running the pre-upgrade scan tool in the server farm.  Run the pre-upgrade scan tool and resolve any reported issues before running psconfig.

To determine where **PRESCAN** failed you can run the attached query against your content databases, the results of the SQL statement are the Site Collections in which **PRESCAN** was unable to properly scan and/or access through the **SharePoint** Object Model.

SELECT FullUrl, Id  
FROM Sites  
WHERE bitflags NOT LIKE '262144'

**Error:  “An outbound zone URL is configured for something other than the default zone on virtual server [http://fabrikam/](http://fabrikam/), and no default zone outbound URL is defined.  This is not supported, and must be corrected before upgrading.”**

1.  This error occurs when no defaultzoneoutgoingurl is defined for the Windows SharePoint Services 2.0 virtual server; in Windows SharePoint Services 2.0 it was valid to not have a URL in the default zone while subsequently having URLs in non-default zones.  You can correct this issue by using the stsadm.exe -o addzoneurl operation or alternatively accessing the values through the Object Model (code sample below).

> You can review the properties programmatically in the SPVirtualServer.Config object; a example of these values of the properties is attached below.
> 
> Example:
> 
> DefaultZoneOutgoingUrl = ""  
> IntranetZoneOutgoingUrl = ""  
> InternetZoneOutgoingUrl = ""  
> ExtranetZoneOutgoingUrl = "[http://fabrikam/](http://fabrikam/)"
> 
> The outgoing URLs are stored in the configuration database in the "Properties" field of "VirtualServers" table.  See an example of the "Properties" field value below:
> 
> `<?xml version="1.0" encoding="utf-16"?><properties><version value="1" /><filter><inclusions><inclusion>/</inclusion><inclusion>/sites/*</inclusion><inclusion>/personal/*</inclusion></inclusions><exclusions><exclusion>/uddi</exclusion><exclusion>/uddipublic</exclusion><exclusion>/mapaweb</exclusion></exclusions></filter><miscellaneous><property name="securityvalidation-expire" value="True" /><property name="virtualserverpermsmask" value="-1" /><property name="data-retrieval-services-oledb-providers" value="DB2OLEDB;IBMDADB2;MSDAORA;OraOLEDB.Oracle;SQLOLEDB" /><property name="extranetzoneoutgoingurl " value="[http://someurl/](http://someurl/)" /><property name="ssc-contact" value="no" /><property name="send-ad-email" value="True" /><property name="ssc" value="yes" /><property name="securityvalidation-enabled" value="True" /><property name="securityvalidation-timeout" value="30" /></miscellaneous></properties>`
> 
> To access the values through the Object Model in the event te STSADM operation does not resolve the issue, use the sample code below as guidance.
> 
> ```
> SPGlobalAdmin ga = new SPGlobalAdmin();
> SPVirtualServer vs = ga.OpenVirtualServer(new Uri(“http://” + System.Environment.MachineName));
> vs.Config.ExtranetZoneOutgoingUrl = null;
> vs.Config.Properties.Update();
> ```
> 
> You can then remove the <property name="extranetzoneoutgoingurl " value="[http://fabrikam/](http://fabrikam/)" /> property which should resolve the issue.