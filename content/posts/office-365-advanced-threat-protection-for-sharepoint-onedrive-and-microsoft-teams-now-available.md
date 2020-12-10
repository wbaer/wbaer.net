---
title: 'Office 365 Advanced Threat Protection for SharePoint, OneDrive and Microsoft Teams now available'
date: Tue, 05 Dec 2017 15:12:39 +0000
draft: false
tags: ['Administration', 'ATP', 'OneDrive for Business', 'Safe Links', 'Security and Compliance', 'SharePoint']
---

When moving your organization to cloud services, security concerns add another layer of consideration; one of trust. Security and compliance is an ongoing process, not a steady state. It is constantly maintained, enhanced, and verified by highly-skilled, experienced and trained personnel. We strive to keep software and hardware technologies up to date through robust processes. To help keep Office 365 security at the top of the industry, we use processes such as the [Security Development Lifecycle](http://www.microsoft.com/security/sdl/default.aspx); we also employ techniques that throttle traffic and prevent, detect, and mitigate breaches. At Microsoft we continue systematic approach to disrupting attacks through eliminating weaknesses by eliminating the vectors of attack themselves by implementing architectural changes some of which leverage virtualization, containers, and other types of technologies. In April 2015 we launched Office 365 Advanced Threat Protection to help customers secure their environment from evolving security threats providing protection against unknown malware and viruses, real time, time-of-click protection against malicious URLs, and rich reporting and URL trace capabilities. In our continued effort to address the modern threat landscape, today we’re announcing General Availability of Office 365 Advanced Threat Protection for SharePoint, OneDrive, and Microsoft Teams. Office 365 Advanced Threat Protection SharePoint, OneDrive, and Microsoft Teams uses signals and smart heuristics as quality indicators to identify the files within your tenant that may contain malicious content, which includes correlating the file activity signals from SharePoint, OneDrive, and Microsoft Teams within your tenant with the [Microsoft Security Intelligence Graph](https://blogs.technet.microsoft.com/mmpc/tag/microsoft-intelligent-security-graph/) threat feeds. Examples of file activity signals include anonymous, company wide or explicit sharing, or activity from guest users. Threat feeds that Office 365 Advanced Threat Protection leverages include known malware in email or SharePoint, Windows Defender/Defender ATP detections, suspicious or risky logins or other indicators of irregular file activity within your tenant.

Getting Started
===============

Office 365 Advanced Threat Protection SharePoint, OneDrive, and Microsoft Teams can be configured in the Office 365 Security and Compliance Center. Learn more on configuring Office 365 Advanced Threat Protection for SharePoint, OneDrive, and Microsoft Teams at [https://support.office.com/en-us/article/Office-365-ATP-for-SharePoint-OneDrive-and-Microsoft-Teams-26261670-db33-4c53-b125-af0662c34607?ui=en-US&rs=en-US&ad=US](https://support.office.com/en-us/article/Office-365-ATP-for-SharePoint-OneDrive-and-Microsoft-Teams-26261670-db33-4c53-b125-af0662c34607?ui=en-US&rs=en-US&ad=US).

Resources
=========

Office 365 Advanced Threat Protection overview \[[https://support.office.com/en-us/article/Office-365-Advanced-Threat-Protection-overview-e100fe7c-f2a1-4b7d-9e08-622330b83653?ui=en-US&rs=en-US&ad=US](https://support.office.com/en-us/article/Office-365-Advanced-Threat-Protection-overview-e100fe7c-f2a1-4b7d-9e08-622330b83653?ui=en-US&rs=en-US&ad=US)\] Advanced Threat Protection safe attachments in Office 365 \[[https://support.office.com/en-us/article/ATP-safe-attachments-in-Office-365-6E13311E-92AE-495E-A619-56D770199170](https://support.office.com/en-us/article/ATP-safe-attachments-in-Office-365-6E13311E-92AE-495E-A619-56D770199170)\]

FaQ
===

**Can I block download of infected files in Office 365?** There is a tenant level configuration that allows or blocks the download of an infected file. This configuration is leveraged by the different native user experiences that are triggered within SPO, ODB and Teams. Tenant admins can be updated using a PowerShell script. Refer to [https://technet.microsoft.com/en-us/library/fp161390.aspx](https://technet.microsoft.com/en-us/library/fp161390.aspx) and the DisallowInfectedFileDownload parameter for additional details. **Is there a licensing requirement for ATP?** ATP is included in Office 365 Enterprise E5 and Office 365 Education A5. You can add ATP to the following Exchange and Office 365 subscription plans:

*   Exchange Online Plan 1
*   Exchange Online Plan 2
*   Exchange Online Kiosk
*   Exchange Online Protection
*   Office 365 Business Essentials
*   Office 365 Business Premium
*   Office 365 Enterprise E1
*   Office 365 Enterprise E3
*   Office 365 Enterprise F1
*   Office 365 Education A1
*   Office 365 Education A3

To buy Office 365 Advanced Threat Protection, see [Office 365 Advanced Threat Protection](https://go.microsoft.com/fwlink/p/?LinkId=294201). To compare features across plans, see [Compare Office 365 for Business plans](http://go.microsoft.com/fwlink/?LinkID=799177&clcid=0x409).