---
title: 'Microsoft Office SharePoint Server 2007 to Windows SharePoint Services 3.0 Site-Level Migration'
date: Wed, 02 Jan 2008 06:25:00 +0000
draft: false
tags: ['Migration &amp; Upgrade', 'SharePoint', 'Upgrade &amp; Migration']
---

I was recently asked a question regarding moving sites between Microsoft Office SharePoint Server 2007 and Windows SharePoint Services 3.0 Web applications and whether or not there are any prerequisites associated with such a move.  While moving sites can be an arduous and on occasion, a complicated task, moving between variations in platform only adds to the complexities associated with site-level moves.  Many of the Features available to Microsoft Office SharePoint Server 2007 sites are not available to Windows SharePoint Services 3.0 and the existence of these features in the host site will cause any migration effort to fail.  Among the Features that should be deactivated on the original or host site prior to export are the Office SharePoint Server Enterprise Site and Standard Site Features; which can be deactivated through the SharePoint Products and Technologies user interface by navigating to <A href="http://%3cserver%3e/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site" mce\_href="http:///sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site">http://<server>/sites/site/web/\_layouts/ManageFeatures.aspx?Scope=Site; however, there many Features not visible through the SharePoint Products and Technologies user interface that will cause import failures in this scenario including Features such as:

*   BaseWeb
*   AnalyticsLinks
*   DataConnectionLibrary
*   SlideLibrary
*   RelatedLinksScopeSettingsLink

To deactivate those Features not exposed through the SharePoint Products and Technologies user interface use the SharePoint Administration Tool (STSADM) deactivatefeature operation prior to the export (see example).  Some Features such as the DataConnectionLibrary are available through SharePoint 3.0 Central Administration | Operations | Manage farm features; however, in many cases it is not feasible to deactivate the Feature at that scope to support a single site-level move, in these scenarios the SharePoint Administration Tool provides a greater level of granularity in Feature management.

**Example:**

**STSADM -o deactivatefeature -name BaseWeb -url** <A href="http://%3cserver%3e/sites/site/web" mce\_href="http:///sites/site/web">**/sites/site/web">/sites/site/web">/sites/site/web">/sites/site/web">/sites/site/web">/sites/site/web">/sites/site/web">http://<server>/sites/site/web** **-force**

Search Helper Content

Fatal Error: Could not find Feature TransMgmtLib

Fatal Error: Could not find Feature BaseWeb

Fatal Error: Could not find Feature DataConnectionLibrary

Fatal Error: Could not find Feature SlideLibrary

Fatal Error: Could not find Feature RelatedLinksScopeSettingsLink