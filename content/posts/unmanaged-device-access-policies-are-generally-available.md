---
title: 'Unmanaged Device Access Policies are Generally Available'
date: Tue, 01 May 2018 22:08:10 +0000
draft: false
tags: ['Administration', 'Conditional Access', 'OneDrive for Business', 'Policies', 'Security and Compliance', 'SharePoint']
---

In March 2017 we introduced device-based policies for SharePoint and OneDrive, that enable administrators to configure Tenant-level policies. Device-based access policies for SharePoint and OneDrive help administrators ensure corporate data is not leaked onto unmanaged devices such as non-domain joined or non-compliant devices by limiting access to the content to the browser, preventing files from being taken offline, printed, or synchronized with OneDrive. On September 1st, 2017 we continued to evolve our conditional access investments to address the ever-changing security landscape and business needs by introducing new levels of granularity with conditional access that allow administrators to scope device-based policies at the site collection level.  In addition, this granular policy can be configured to allow users on unmanaged devices to edit Office Online documents in the browser. ![](https://msdnshared.blob.core.windows.net/media/2018/05/LimitedAccess-1024x683.png) Today we’re pleased to say that these policies are now available worldwide, in addition to new site-scoped policies that are available with this update.  This is our major milestone in the conditional access policy journey in SharePoint and OneDrive. In a world that’s mobile, social, and about getting things done you’re expected to manage a growing number of devices, both managed and unmanaged that can access corporate content.  The corporate boundary as a result, has shifted from the firewall to the employee.  The need for protecting access from the unmanaged devices is ever increasing. This unmanaged device access policy is the right solution for your need.

What’s new in this update?
==========================

In this update to device-based policies at the site collection level you can:

*   Blocks users from accessing sites or the tenant from unmanaged devices
*   Allows users to preview only Office file types in the browser
*   Allows office file types to be editable or read-only in the previewer
*   Based on the sensitivity of a site's contents, admins can now set access control from unmanaged devices on different sites to be full access, limited access, or block access

\[video width="1920" height="1080" mp4="https://msdnshared.blob.core.windows.net/media/2017/10/LimitedAccessPolicies.mp4"\]\[/video\] In the demonstration above, the Tenant is configured with a permissive device access policy, allowing full access from unmanaged devices to include desktop apps, mobile apps, and browsers.  The Marketing site inherits the policy configured at the Tenant; however, the Legal site has a policy configured less permissive than that configured at the Tenant level.  In addition, members of the Marketing site, while limited to browser only access on unmanaged devices, can continue to edit content they have access to provide a seamless collaborative experience.

Configuring Device Access Policies Overview
===========================================

For complete instructions on enabling device-access policies refer to the support documentation at [https://support.office.com/en-us/article/Control-access-from-unmanaged-devices-5ae550c4-bd20-4257-847b-5c20fb053622?ui=en-US&rs=en-US&ad=US](https://support.office.com/en-us/article/Control-access-from-unmanaged-devices-5ae550c4-bd20-4257-847b-5c20fb053622?ui=en-US&rs=en-US&ad=US). Unmanaged device access policies can be configured with [SharePoint Online Management Shell](http://www.microsoft.com/en-us/download/details.aspx?id=35588). Before you get started using PowerShell to manage SharePoint Online, make sure that the SharePoint Online Management Shell is installed and you have connected to SharePoint Online. **NOTE** The Tenant-level device-based policy must be configured to Full Access prior to configuring site-scoped policies.

1.  Connect-SPOService -Url https://<URL to your SPO admin center>
2.  $t2 = Get-SPOSite -Identity https://<Url to your SharePoint online>/sites/<name of site collection>
3.  Set-SPOSite -Identity $t2.Url -ConditionalAccessPolicy AllowLimitedAccess

The following parameters can be used with -ConditionalAccessPolicy AllowLimitedAccess for both the organization-wide setting and the site-level setting: **\-AllowEditing $false** Prevents users from editing files in the browser and copying and pasting file contents out of the browser window. **\-LimitedAccessFileType -OfficeOnlineFilesOnly** Allows users to preview only Office files in the browser. This option increases security but may be a barrier to user productivity. **\-LimitedAccessFileType -WebPreviewableFiles** (default) Allows users to preview Office files and other file types (such as PDF files and images) in the browser. Note that the contents of file types other than Office files are handled in the browser. This option optimizes for user productivity but offers less security for files that aren't Office files. **\-LimitedAccessFileType -OtherFiles** Allows users to download files that can't be previewed, such as .zip and .exe. This option offers less security. External users, because they most likely use unmanaged devices, access will also be controlled when you use conditional access policies to block or limit access from unmanaged devices. If users have shared items with specific external people (who must enter a verification code sent to their email address) and you want those external users to access shared items from their devices, then you can exempt them from this policy by running the following cmdlet. Set-SPOTenant -ApplyAppEnforcedRestrictionsToAdHocRecipients $false

Licensing
=========

1.  1.  This feature has a dependency on Azure Active Directory Conditional Access Policy.
    2.  To learn more about Azure Conditional Access policies work, refer to [https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access-azure-portal](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-conditional-access-azure-portal).

Resources
=========

As workforces become more globally distributed and the productivity barrier extended beyond the firewall, device-access policies allow you to provide a seamless collaborative experience across an array of devices, both managed and unmanaged, while keeping your most sensitive content that way.  To learn more about security and compliance with SharePoint & OneDrive visit [https://aka.ms/SharePoint-Security](https://aka.ms/SharePoint-Security).