---
title: 'Site-Scoped Limited Access Policies in SharePoint Online'
date: Sun, 08 Oct 2017 15:17:43 +0000
draft: false
tags: ['Administration', 'Conditional Access', 'Security &amp; Compliance', 'Security and Compliance', 'SharePoint']
---

In March 2017 we introduced device-based policies for SharePoint and OneDrive, that enable administrators to configure Tenant-level policies. Device-based policies for SharePoint and OneDrive help administrators ensure corporate data is not leaked onto unmanaged devices such as non-domain joined or non-compliant devices by limiting access to the content to the browser, preventing files from being taken offline or synchronized with OneDrive. On September 1st, 2017 we’ve continued to evolve our conditional access investments to address the ever-changing security landscape and business needs by introducing new levels of granularity with conditional access that allow administrators to scope device-based policies at the site collection level. In addition, this granular policy can be configured to allow users on unmanaged devices to edit Office Online documents in the browser. \[video width="1920" height="1080" mp4="https://msdnshared.blob.core.windows.net/media/2017/10/LimitedAccessPolicies.mp4"\]\[/video\] In the demonstration above, the Tenant is configured with a permissive device access policy, allowing full access from unmanaged devices to include desktop apps, mobile apps, and browsers.  The Marketing site inherits the policy configured at the Tenant; however, the Legal site has a policy configured less permissive than that configured at the Tenant level.  In addition, members of the Marketing site, while limited to browser only access on unmanaged devices, can continue to edit content they have access to provide a seamless collaborative experience.

**Configuring Policies**
========================

Once available in First Release Tenants site-scoped device-based access policies can be configured with [SharePoint Online Management Shell](http://www.microsoft.com/en-us/download/details.aspx?id=35588). Before you get started using PowerShell to manage SharePoint Online, make sure that the SharePoint Online Management Shell is installed and you have connected to SharePoint Online. **NOTE** The Tenant-level device-based policy must be configured to Full Access prior to configuring site-scoped policies.

1.  Connect-SPOService -Url https://<URL to your SPO admin center>
2.  $t2 = Get-SPOSite -Identity [https://<Url to your SharePoint online>/sites/<name of site collection>](https://%3curl%20to%20your%20sharepoint%20online%3e/sites/%3cname%20of%20site%20collection%3e)
3.  Set-SPOSite -Identity $t2.Url -ConditionalAccessPolicy AllowLimitedAccess