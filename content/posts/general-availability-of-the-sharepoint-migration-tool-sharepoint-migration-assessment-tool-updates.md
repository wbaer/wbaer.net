---
title: 'General Availability of the SharePoint Migration Tool & SharePoint Migration Assessment Tool Updates'
date: Thu, 11 Jan 2018 00:03:53 +0000
draft: false
tags: ['FastTrack', 'Migration &amp; Upgrade', 'OneDrive for Business', 'SharePoint']
---

GENERAL AVAILABILITY TODAY Taking advantage of cloud services doesn’t have to be difficult or a long-phased migration project.  Today we're excited to announce General Availability of the SharePoint Migration Tool, a simple, and fast migration solution to help you migrate content from on-premises SharePoint sites and file shares to SharePoint or OneDrive in Office 365. Based on the learning and experience from Microsoft FastTrack, the SharePoint Migration Tool from Microsoft  was designed to help you bring your information to the cloud and take advantage of the latest collaboration, intelligence, and security solutions with Office 365. With a few simple clicks in the intuitive user interface, you can quickly and easily migrate files from file shares, SharePoint sites, or support bulk migrations. ![](https://msdnshared.blob.core.windows.net/media/2018/01/SPMT_Blog-1024x683.png) Whether you’re looking to migrate from file shares on-premises to SharePoint or OneDrive or from on-premises versions of SharePoint, the SharePoint Migration Tool supports the smallest of migrations to large scale migrations with support for bulk scenarios.

SharePoint Migration Assessment Tool Updates
============================================

In parallel to releasing the SharePoint Migration Tool, we’re also making it easier to ensure your migration is successful by helping you remediate common migration issues before they occur through improvements to the SharePoint Migration Assessment Tool.  Improvements in the latest release include: **A Unified Download Package**

*   SMAT.exe will determine the version of SharePoint on which it’s installed and run the appropriate tool based on the parameters passed to it. Works on both SharePoint 2010 and SharePoint 2013.

**New and Updates Assessment Scans**

*   New Assessment Scans
    *   Custom Permission Levels. Enumerates and reports on all locations that a custom permission level has been created.
    *   External Lists – Enumerates and reports on all external lists (BCS connected) in the environment.

*   Changes to existing assessment scans
    *   Default filter added to site language to exclude 1033.
    *   Default filter added to Customized Pages to exclude anything under \_catalogs.
    *   Retry logic added to calls to remote resources such as SQL Server. This will help the scans succeed in environments with suspect connectivity. -r switch  added to command line to enable an operator to specify the number of retries. Default is 3.

**Improved Identity Mapping Support**

*   Ability to generate a full identity report that provides a comprehensive view of the users and groups that have access to the SharePoint environment and if they were able to be mapped to Azure Active Directory identities.
*   Ability to generate an identity mapping file that can be consumed by SPMT or other tool that can use the SMAT identity mapping format.
*   New identity mapping scans configured in the same scandef.json file as the assessment scans.
    *   **SharePoint Identity Scanner** - Discovers all the users and groups that have access to SharePoint.
    *   **Active Directory Identity Scanner** - If the identities found in SharePoint are Windows accounts, lookup Active Directory information for the users and groups. This data is useful to track down identities that did not have a mapping in Azure Active Directory.
    *   **Azure Active Directory Identity Scanner** - Look up users and groups found in SharePoint in the Azure Active Directory tenant the user logged into. Determine if there is an Exact Match, Partial Match, or No Match.
        *   **ExactMatch** – Windows SID in SharePoint matches the OnPremisesSecurityIdentifier in Azure AD.
        *   **PartialMatch** – Claim value in SharePoint matches UPN or email. Display Name in SharePoint matches Display Name in Azure AD.
        *   **NoMatch** – Unable to find an exact/partial match.

While the SharePoint Migration Tool and SharePoint Migration Assessment Tool provide support for many migration scenarios, we recognize your needs may differ in scope and complexity.  For more complex migrations, support with adoption and usage, or help planning Microsoft FastTrack includes resources, tools, and experts to make your rollout of Office 365 a success. To learn more about Microsoft FastTrack visit [https://fasttrack.microsoft.com/office](https://fasttrack.microsoft.com/office).  In addition, consider one of Microsoft’s many partners that can help ensure your migration to Office 365 is both seamless and successful.

Getting Started
===============

To get started and download the new SharePoint Migration Tool from Microsoft visit [https://aka.ms/spmt](http://aka.ms/spmt). To get started and download the SharePoint Migration Assessment Tool visit [https://aka.ms/smat](https://aka.ms/smat).