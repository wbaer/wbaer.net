---
title: 'Security at the Site-Collection Level in SharePoint Online'
date: Wed, 11 Oct 2017 17:56:55 +0000
draft: false
tags: ['Administration', 'Conditional Access', 'Security &amp; Compliance', 'Security and Compliance', 'SharePoint']
---

Balancing security and usability are core to ensuring people can collaborate effectively without interrupting the necessary flow of information across organizations.  With SharePoint Online we’ve been at work developing security and sharing controls that are scoped at the site collection level.  This allows Tenant administrators to configure more restrictive controls at the site collection level, than those that are configured at the Tenant level providing a balance between the need to protect corporate information and the requirement to collaborate effectively across and outside of the corporate boundary.

Site Collection Controls
========================

Restricted Domain Sharing Controls
----------------------------------

With SharePoint Online sites can be shared with users from specific domains by using the restricted domains setting. This is useful for a business-to-business extranet scenario where sharing needs to be limited to a particular business partner or external user. Administrators can configure external sharing by using either the domain allow list or deny list. This can be done at either the tenant level or the site collection level. Administrators can limit sharing invitations to a limited number of email domains by listing them in the allow list or opt to use the deny list, listing email domains to which users are prohibited from sending invitations. [![](https://msdnshared.blob.core.windows.net/media/2017/10/Control1-300x200.png)](http://wbaer.files.wordpress.com/2017/10/15d1b-control1.png) To configure restrict domains in external sharing in SharePoint Online at the site collection level:

1.  From the SharePoint Admin Center, select the **site collections **tab.
2.  Select a site collection, and then click **Sharing**.
3.  Under **Site collection additional settings**, select the **Limit external sharing using domain **check box.
4.  From the drop-down list, choose either **Don’t allow sharing with users from these blocked domains** to deny access to targeted domains or **Allow sharing only with users from these domains** to limit access to only to the domains you list.
5.  List the domains (maximum of 60) in the box provided, using the format _domain.com._. If listing more than one domain, separate each domain with a space or a carriage return.

Site-Scoped Conditional Access Policies
---------------------------------------

New to SharePoint Online are site-scoped conditional access policies.  Device-based policies for SharePoint and OneDrive in help administrators ensure data on corporate resources is not leaked onto unmanaged devices such as non-domain joined or non-compliant devices by limiting access to content to the browser, preventing files from being taken offline or synchronized with OneDrive on unmanaged devices at either the Tenant or site collection level. [![](https://msdnshared.blob.core.windows.net/media/2017/10/Control2-300x200.png)](https://msdnshared.blob.core.windows.net/media/2017/10/Control2.png) Site-scoped device-based access policies can be configured with [SharePoint Online Management Shell](http://www.microsoft.com/en-us/download/details.aspx?id=35588). Before you get started using PowerShell to manage SharePoint Online, make sure that the SharePoint Online Management Shell is installed, and you have connected to SharePoint Online. **NOTE** The Tenant-level device-based policy must be configured to Full Access prior to configuring site-scoped policies.```
Connect-SPOService -Url https://<URL to your SPO admin center>
$t2 = Get-SPOSite -Identity https://<Url to your SharePoint online>/sites/<name of site collection>
Set-SPOSite -Identity $t2.Url -ConditionalAccessPolicy AllowLimitedAccess
```Read more about site-scoped conditional access at [https://blogs.technet.microsoft.com/wbaer/2017/10/08/site-scoped-conditional-access-policies-in-sharepoint-online/](https://blogs.technet.microsoft.com/wbaer/2017/10/08/site-scoped-conditional-access-policies-in-sharepoint-online/).

Additional Controls
===================

**Allow users to Invite new partner users**:    In certain site collections, admins can optionally allow users to invite new partner users. In this model, an email invite is sent to the partner user and the user must redeem that invite to access the resource. See [Manage external sharing for your SharePoint Online environment ](https://support.office.com/en-us/article/Manage-external-sharing-for-your-SharePoint-Online-environment-c8a462eb-0723-4b0b-8d0a-70feafe4be85)for details. **Sharing by site owners only**:    Ability to have site collections where only site owners can bring in or share with new users. Site members, who are typically external partner users, can see only the existing site members in the site. This helps in governing what partners can see and with whom they can share documents. To learn more about security and compliance with SharePoint and OneDrive:

*   [Read more about how we secure your files](https://www.microsoft.com/en-us/download/details.aspx?id=53884)
*   [Review Office 365 Trust where we share our commitments and information about security, privacy, and compliance](https://products.office.com/en-us/business/office-365-trust-center-welcome?legRedir=true&CorrelationId=de8d945b-65d3-41bc-b5a5-41d503131554)
*   Stay up to date with our [security](https://blogs.office.com/security/) and [compliance](https://blogs.office.com/compliance/) blogs