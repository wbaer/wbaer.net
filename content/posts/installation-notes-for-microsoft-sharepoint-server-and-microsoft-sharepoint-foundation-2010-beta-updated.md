---
title: 'Installation Notes for Microsoft SharePoint Server and Microsoft SharePoint Foundation 2010 Beta [UPDATED]'
date: Thu, 19 Nov 2009 03:03:00 +0000
draft: false
tags: ['Migration &amp; Upgrade', 'SharePoint']
---

Today we announced general availability of the public beta versions of [Microsoft SharePoint Server](http://go.microsoft.com/?LinkID=9694999) and Microsoft SharePoint Foundation 2010.  This post describes the prerequisite software requirements and provides links to additional hardware and software requirement resources for Microsoft SharePoint Server and Microsoft SharePoint Foundation 2010.

**Contents**

[Web and Application Server Preparation](http://blogs.technet.com/controlpanel/blogs/posteditor.aspx?SelectedNavItem=Posts&sectionid=4865&postid=3294968#Web)

[Database Server Preparation](http://blogs.technet.com/controlpanel/blogs/posteditor.aspx?SelectedNavItem=Posts&sectionid=4865&postid=3294968#Database)

[Additional Notes](http://blogs.technet.com/controlpanel/blogs/posteditor.aspx?SelectedNavItem=Posts&sectionid=4865&postid=3294968#Notes)

**Web and Application Server Preparation**

Microsoft SharePoint Server and Microsoft SharePoint Foundation 2010 provide the Microsoft SharePoint 2010 Products Preparation Tool (PrerequisiteInstaller.exe) to streamline the deployment of both installation and configuration of prerequisite requirements to support product installation.

PrerequisiteInstaller.exe can be executed from the installation source to install and configure the prerequisites required for the successful installation of Microsoft SharePoint Server and Microsoft SharePoint Foundation 2010.  The Microsoft SharePoint 2010 Products Preparation Tool requires an Internet connection to download updates that are not included on the installation media, if the Web or application servers do not have Internet connectivity, the updates can be downloaded and installed manually.

The Microsoft SharePoint 2010 Products Preparation Tool will also provision and configure the Web and Application Server roles on Microsoft Windows Server 2008 servers.

Microsoft “Geneva” Framework Runtime

[http://download.microsoft.com/download/F/3/D/F3D66A7E-C974-4A60-B7A5-382A61EB7BC6/MicrosoftGenevaFramework.amd64.msi](http://download.microsoft.com/download/F/3/D/F3D66A7E-C974-4A60-B7A5-382A61EB7BC6/MicrosoftGenevaFramework.amd64.msi)

**NOTE**

The most commonly experienced error where an incorrect version of the Microsoft “Geneva” Framework Runtime is installed is:

"Exception: System.IO.FileNotFoundException: Could not load file or assembly 'Microsoft.IdentityModel, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35' or one of its dependencies. The system cannot find the file specified."

This error will most frequently occur when running PSConfigUI.exe at Step 3 – Creating the configuration database or when accessing pages that make service calls as error:

"System.Configuration.ConfigurationErrorsException: Unrecognized attribute 'allowInsecureTransport'. Note that attribute names are case-sensitive. (C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14WebClients<service area>client.config line <line number>)".

To determine the version of the Microsoft “Geneva” Framework Runtime open C:WINDOWSassembly and locate Microsoft.IdentityModel.  Right-click Microsoft.IndentityModel and select Properties from the menu.  Use the General and Version tabs to determine the version installed.  If the version is not 1.x.x.x, uninstall the Microsoft “Geneva” Framework Runtime and install the current version from the link provided above.

Microsoft Sync Framework Runtime v1.0 (x64)

[http://download.microsoft.com/download/C/9/F/C9F6B386-824B-4F9E-BD5D-F95BB254EC61/Redist/amd64/Microsoft%20Sync%20Framework/Synchronization.msi](http://download.microsoft.com/download/C/9/F/C9F6B386-824B-4F9E-BD5D-F95BB254EC61/Redist/amd64/Microsoft%20Sync%20Framework/Synchronization.msi)

Microsoft Chart Controls for Microsoft .NET Framework 3.5

[http://download.microsoft.com/download/c/c/4/cc4dcac6-ea60-4868-a8e0-62a8510aa747/MSChart.exe](http://download.microsoft.com/download/c/c/4/cc4dcac6-ea60-4868-a8e0-62a8510aa747/MSChart.exe)

Microsoft Filter Pack 2.0

[http://www.microsoft.com/downloads/details.aspx?FamilyId=60C92A37-719C-4077-B5C6-CAC34F4227CC&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyId=60C92A37-719C-4077-B5C6-CAC34F4227CC&displaylang=en "http://www.microsoft.com/downloads/details.aspx?FamilyId=60C92A37-719C-4077-B5C6-CAC34F4227CC&displaylang=en")

Microsoft SQL Server 2008 Analysis Services ADOMD.NET

[http://download.microsoft.com/download/A/D/0/AD021EF1-9CBC-4D11-AB51-6A65019D4706/SQLSERVER2008\_ASADOMD10.msi](http://download.microsoft.com/download/A/D/0/AD021EF1-9CBC-4D11-AB51-6A65019D4706/SQLSERVER2008_ASADOMD10.msi)

Microsoft .NET Framework 3.5 Service Pack 1

**NOTE**

If you are installing Microsoft SharePoint Server or Microsoft SharePoint Foundation 2010 on a machine where Microsoft SQL Server 2008 Standard, Enterprise, or Developer Editions are installed this update is not required.  If you are performing a server farm or standalone installation using Microsoft SQL Server Express Edition you should install the Microsoft .NET Framework 3.5 Service Pack 1 using the link provided below.

[http://download.microsoft.com/download/2/0/e/20e90413-712f-438c-988e-fdaa79a8ac3d/dotnetfx35.exe](http://download.microsoft.com/download/2/0/e/20e90413-712f-438c-988e-fdaa79a8ac3d/dotnetfx35.exe "http://download.microsoft.com/download/2/0/e/20e90413-712f-438c-988e-fdaa79a8ac3d/dotnetfx35.exe")

Microsoft Windows Installer 4.5

**NOTE**

Windows Server 2008 Operating Systems will generally meet this requirement – special circumstances may apply in Server Core scenarios where this update needs to be manually installed

[http://download.microsoft.com/download/2/6/1/261fca42-22c0-4f91-9451-0e0f2e08356d/Windows6.0-KB942288-v2-x64.msu](http://download.microsoft.com/download/2/6/1/261fca42-22c0-4f91-9451-0e0f2e08356d/Windows6.0-KB942288-v2-x64.msu "http://download.microsoft.com/download/2/6/1/261fca42-22c0-4f91-9451-0e0f2e08356d/Windows6.0-KB942288-v2-x64.msu")

Windows Management Framework Core Package

**NOTE**

The Windows Management Framework Core package provides updated management functionality for IT Professionals. This package includes the following components: Windows PowerShell 2.0 and Windows Remote Management (WinRM) 2.0.

[http://www.microsoft.com/downloads/details.aspx?FamilyId=d37e25cf-db05-4b23-a852-cdf865d81b82&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyId=d37e25cf-db05-4b23-a852-cdf865d81b82&displaylang=en)

Microsoft SQL Server 2008 Native Client

**NOTE**

If you are installing Microsoft SharePoint Server or Microsoft SharePoint Foundation 2010 on a machine where Microsoft SQL Server 2008 Standard, Enterprise, or Developer Editions are installed this update is not required.  If you are performing a server farm or standalone installation using Microsoft SQL Server Express Edition you should install the Microsoft SQL Server 2008 Native Client using the link provided below.

[http://download.microsoft.com/download/3/5/5/35522a0d-9743-4b8c-a5b3-f10529178b8a/sqlncli.msi](http://download.microsoft.com/download/3/5/5/35522a0d-9743-4b8c-a5b3-f10529178b8a/sqlncli.msi)

_**Additional Updates**_

_Windows Server 2008 with Service Pack 2_

KB971831

[http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=KB971831&DownloadId=7285](http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=KB971831&DownloadId=7285)

_Windows Server 2008 with Service Pack 2 and Microsoft Windows Server 2008 R2_

KB959209 (Microsoft .NET Framework 3.5 Family Update)

[http://www.microsoft.com/downloads/details.aspx?FamilyID=98E83614-C30A-4B75-9E05-0A9C3FBDD20D&amp;displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=98E83614-C30A-4B75-9E05-0A9C3FBDD20D&amp;displaylang=en)

KB967190 (Update for .NET Framework 3.5 Service Pack 1)

[http://www.microsoft.com/downloads/details.aspx?FamilyID=c411b91e-4dab-4550-915c-e119204d0732&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=c411b91e-4dab-4550-915c-e119204d0732&displaylang=en "http://www.microsoft.com/downloads/details.aspx?FamilyID=c411b91e-4dab-4550-915c-e119204d0732&displaylang=en")

_Windows Server 2008 R2_

KB976642

[http://support.microsoft.com/kb/976462](http://support.microsoft.com/kb/976462)

**Database Server Preparation**

_Microsoft SQL Server 2005_

Microsoft SQL Server 2005 Service Pack 3

[http://www.microsoft.com/downloads/details.aspx?familyid=AE7387C3-348C-4FAA-8AE5-949FDFBE59C4&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=AE7387C3-348C-4FAA-8AE5-949FDFBE59C4&displaylang=en)

Cumulative Update 3 for Microsoft SQL Server 2005 Service Pack 3

[http://support.microsoft.com/kb/967909](http://support.microsoft.com/kb/967909 "http://support.microsoft.com/kb/967909")

_Microsoft SQL Server 2008_

Microsoft SQL Server 2008 Service Pack 1

[http://www.microsoft.com/downloads/details.aspx?familyid=66AB3DBB-BF3E-4F46-9559-CCC6A4F9DC19&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=66AB3DBB-BF3E-4F46-9559-CCC6A4F9DC19&displaylang=en)

Cumulative Update 2 for Microsoft SQL Server 2008 Service Pack 1

[http://support.microsoft.com/kb/970315](http://support.microsoft.com/kb/970315 "http://support.microsoft.com/kb/970315")

**NOTE**

The most commonly experience error where the installation does not meet the minimum the database server requirements is:

The current farm uses database from the following SQL server(s) whose versions are not supported.

<Instance Id>

SharePoint requires these SQL server(s) to be upgraded to minimum supported version before you can continue. Refer to the log file of this configuration wizard for more information about the minimum supported SQL versions and download instructions.

**Additional Notes**

For additional information on hardware and software requirements for Microsoft SharePoint Server 2010 see also [http://technet.microsoft.com/library/cc262485(office.14).aspx](http://technet.microsoft.com/library/cc262485(office.14).aspx "http://technet.microsoft.com/library/cc262485(office.14).aspx").

For additional information on hardware and software requirements for Microsoft SharePoint Foundation 2010 see also [http://technet.microsoft.com/library/cc288751(office.14).aspx](http://technet.microsoft.com/library/cc288751(office.14).aspx "http://technet.microsoft.com/library/cc288751(office.14).aspx").