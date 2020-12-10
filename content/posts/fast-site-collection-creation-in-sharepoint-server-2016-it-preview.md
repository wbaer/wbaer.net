---
title: 'Fast Site Collection Creation in SharePoint Server 2016 IT Preview'
date: Wed, 26 Aug 2015 21:07:00 +0000
draft: false
tags: ['Fast Site Collection Creation', 'SharePoint', 'SharePoint Server 2016']
---

Fast Site Collection Creation is a new capability in SharePoint Server 2016 IT Preview that improves Site Collection creation performance by reducing Feature activation overhead. Similar to the approach associated with MinRole Site Collections that support Fast Site Collection Creation are Feature-optimized.

Fast Site Collection Creation is a mechanism designed to improve provision performance of Site Collections through instrumenting a copy operation using SPSite.Copy at the Content Database level.

The primary vehicle in addressing this scenario is the enablement of a Site Master or master copy of the Site Collection for an enabled Template that provides the source Site Collection when a request is made for creating a new Site Collection.

Enabling Fast Site Collection Creation is achieved using the new **Enable-SPWebTemplateForSiteMaster**Windows PowerShell.

**To access the SharePoint Management Shell**

1.  Start the SharePoint Management Shell.
    *   For Windows Server 2012:
        *   On the **Start** screen, click **SharePoint Management Shell**.

If **SharePoint Management Shell** is not on the **Start**screen:

*   Right-click **Computer**, click **All apps**, and then click **SharePoint Management Shell**.

To enable Fast Site Collection Creation enter Enable-SPWebTemplateForSiteMaster -Template <TEMPLATENAME> -CompatibilityLevel 15at the prompt.

Once Fast Site Collection Creation is enabled a new Site Master will need to be created for the respective Template(s). To create a new Site Master enter New-SPSiteMaster -ContentDatabase <CONTENTDB> -Template <TEMPLATENAME> at the prompt.

Provisioning of new Site Collections using Fast Site Collection Creation is achieved through including the new parameter –CreateFromSiteMasterwith the New-SPSite Windows PowerShell CmdLet as shown in the example below:

New-SPSite http://www.contoso.com/sites/<SITE> -Template <TEMPLATE> -ContentDatabase <CONTENTDB> -CompatibilityLevel 15 -CreateFromSiteMaster -OwnerAlias <OWNER>

Since Site Collections are now created by copying at Content Database level with Fast Site Collection Creation enabled, the Feature Activation that usually happens during regular Site Collection creation does not occur.

For Developers who have Feature-based customization using Site Collection provisioning logic, if there are features that perform special processing based on the current Site's information, these will be incorrect. To mitigate this scenario, Features should be marked to be activated post-copy, so their activation code executes after the Site is created.

To learn more about Windows PowerShell in SharePoint Server 2016 IT Preview see also [https://technet.microsoft.com/EN-US/library/ee806878(v=office.16).aspx](https://technet.microsoft.com/EN-US/library/ee806878(v=office.16).aspx).