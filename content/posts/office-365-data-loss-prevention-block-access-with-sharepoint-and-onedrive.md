---
title: 'Office 365 Data Loss Prevention Block Access with SharePoint and OneDrive'
date: Mon, 16 Oct 2017 16:32:52 +0000
draft: false
tags: ['Administration', 'Data Loss Prevention', 'OneDrive for Business', 'Policies', 'Policy Tip', 'Security and Compliance', 'SharePoint']
---

Last week we announced [Office 365 Data Loss Prevention Block Access](https://techcommunity.microsoft.com/t5/Security-Privacy-and-Compliance/Policy-Tips-in-SharePoint-Online-and-OneDrive-for-Business-at/ba-p/116158) ([https://techcommunity.microsoft.com/t5/Security-Privacy-and-Compliance/Policy-Tips-in-SharePoint-Online-and-OneDrive-for-Business-at/ba-p/116158](https://techcommunity.microsoft.com/t5/Security-Privacy-and-Compliance/Policy-Tips-in-SharePoint-Online-and-OneDrive-for-Business-at/ba-p/116158)) with SharePoint Online and OneDrive for Business.  Office 365 Data Loss Prevention Block Access prevents the potential for overexposure of sensitive information by allowing a Tenant administrator to configure Data Loss Prevention Policies limiting how and with whom sensitive information can be shared. For example, if a document is determined to contain sensitive information, for example U.S. Financial Data, a DLP policy can prevent that information from being shared externally or with guests while providing real-time policy information to the user attempting to initiate the share. Users are presented with a Policy Tip when viewing information about the document in addition to the option to view the specific policy that limits sharing of the document. ![](https://msdnshared.blob.core.windows.net/media/2017/10/PolicyTip-300x169.png) ![](https://msdnshared.blob.core.windows.net/media/2017/10/PolicyTip1-300x169.png) In addition, if the user attempts to share content that violates the policy configuration, they are notified at the time of sharing with a Policy Tip and link to additional information.

Configuring Office 365 Data Loss Prevention Block Access policies in the Security and Compliance Center
=======================================================================================================

To configure Office 365 Data Loss Prevention Block Access policies browse to [https://protection.office.com/](https://protection.office.com/), and expand **Data loss prevention**. Under **Data loss prevention** select **Policy**. Select **Create new policy** to create a policy and choose from one of the available templates. ![](https://msdnshared.blob.core.windows.net/media/2017/10/P1-300x169.png) Provide a **Name** and **Optional** description of the policy and click **Next**. ![](https://msdnshared.blob.core.windows.net/media/2017/10/P2-300x169.png) Select one or more locations to protect and click **Next**. ![](https://msdnshared.blob.core.windows.net/media/2017/10/P3-300x169.png) Under Policy settings select **Detect when this content is shared:** and choose **With people outside of my organization** and click **Next**. ![](https://msdnshared.blob.core.windows.net/media/2017/10/P4-300x169.png) On the **What do you want to do if we detect sensitive info?** dialog select **Restrict who can access to the content and override the policy** and click **Next**. ![](https://msdnshared.blob.core.windows.net/media/2017/10/P41-300x169.png) Optionally you can configure additional settings for the policy such as:

*   The ability to block specific people from accessing sensitive content that meets the criteria of the policy.
*   Allowing policy override with or without business justification.

![](https://msdnshared.blob.core.windows.net/media/2017/10/P42-300x169.png) Click **Next** to save the policy settings. On the Review your settings page, click **Create** to save and apply the policy. ![](https://msdnshared.blob.core.windows.net/media/2017/10/P5-300x169.png)

Configuring Existing DLP Policies
=================================

In addition to the creation of new policies, a Tenant administrator can use Windows PowerShell to configure existing data loss prevention policies for block access. To update one or more existing policies, connect to [Office 365 Security and Compliance Center PowerShell](https://technet.microsoft.com/en-us/library/mt587092(v=exchg.160).aspx), refer to the Windows PowerShell example below:```
Get-DlpComplianceRule | Where-Object {$\_.BlockAccess -eq 'true' -and $\_.BlockAccessScope -ne 'PerUser' -and $\_.AccessScope -eq 'NotInOrganization' -and $\_.NotifyUser -ne ''} | Set-DLPComplianceRule -BlockAccessScope 'PerUser'
```**NOTE** The script above will turn any DLP policy rules that previously blocked everyone (except Last Modifier, Owner, and Site Administrator) into a rule that only blocks access to external users.

Resources
=========

To learn more about data loss preventions policies in Office 365 visit [Overview of data loss prevention policies](https://support.office.com/en-us/article/Overview-of-data-loss-prevention-policies-1966b2a7-d1e2-4d92-ab61-42efbb137f5e) at [https://support.office.com/en-us/article/Overview-of-data-loss-prevention-policies-1966b2a7-d1e2-4d92-ab61-42efbb137f5e](https://support.office.com/en-us/article/Overview-of-data-loss-prevention-policies-1966b2a7-d1e2-4d92-ab61-42efbb137f5e).