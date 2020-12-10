---
title: 'SharePoint Server 2013 Extranet and Office 365 External Sharing Considerations'
date: Wed, 08 May 2013 23:08:09 +0000
draft: false
tags: ['Administration', 'Security and Compliance', 'SharePoint']
---

Introduction
============

What is an Extranet?  A common definition for the term Extranet is a network that enables controlled access to external users or an extension of an organization’s intranet extended to external users to include customers, partners, suppliers, etc. in isolation from other internet or intranet users.

Extranet topologies with SharePoint Products have become an increasingly popular solution to enable collaboration with partners, customers, and external users; however, can be complex to implement and maintain over time.

SharePoint Server 2013 Extranet Environments
============================================

Traditional extranet environments encompass a private network securely extended to share a portion of an organization’s information and/or process with remote employees, partners, or customers. Extranet environments can provide the breadth of functionality provided to internal users such as branded informational content, personalized content and views based on user profiles, collaborative content which can include documents, lists, libraries, etc., and document repositories. Extranet environments provide content and services through a single, unified location, which complies with corporate and/or governmental regulatory and security requirements.

Extranet environments enable support of remote employees or geographically disperse users through a seamless authentication experience, and can enable external partners to participate in business processes with a consistent security context including partner isolation and internal data segregation, limited authorization on an as needed basis and restriction of data across a broad range of supported partners. In addition to remote employees and partners, an extranet can provide customers with access to targeted content, segmentation controls to mitigate data cross-pollenization, and limitation of content access and search results based on audience profiles.

SharePoint Server 2013 provides flexible options for the configuration of extranet access to sites and site data such as providing Internet-facing access to a subset of sites and site data in an environment or by making available the breath of SharePoint capabilities available over the Internet. Extranet content is typically hosted within an organizations’ corporate network and made available through an edge network or in some cases through an environment isolated within a perimeter network.

[![clip_image002](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4452.clip_image002_thumb_39D59264.png "clip_image002")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3771.clip_image002_7358A25B.png)

Figure 1 illustrates a common Extranet environment with SharePoint Server 2013

Extranet Advantages
-------------------

*   Data isolation within a trusted network, external access can be isolated to a perimeter network
    
*   Data maintenance within a single location
    
*   Can be comprised of a single environment that facilitates both internal and external collaboration with granular access controls
    
*   Can be implemented with a separate or shared AD infrastructure
    

Extranet Disadvantages
----------------------

*   Additional network and infrastructure configuration required increases cost and complexity

For customers seeking only to share limited content and/or collaborate short-term without the need for a seamless logon experience or whose extranet environment is not subject to corporate or governmental policies, Office 365 provides an external sharing experience that can be leveraged to make data available over the Internet to remote employees, customers, and partners.

Office 365 External Sharing
===========================

External Sharing in Office 365 enables an organization to extend access to sites and site data with users that are not members of the Office 365 subscription or do not have accounts within the source Office 365 subscription. Individuals who do not have user accounts for the source SharePoint Online environment are considered “external users”. External users can be comprised of vendors or customers, for example. Activating the external sharing feature in SharePoint Online allows a site collection to invite external users to use the site and/or site content through email-based invitation.

In Office 365 Enterprise plans, an organization can choose to manage external sharing centrally through the SharePoint Online Administration Center, enabling or disabling external sharing globally or through specifying more granular sharing options such as allowing sharing only with sign-in at the site collection level. Additionally management of external sharing can be achieved through using Windows PowerShell.

In Office 365 Small Business plans, the administration experience for the management of external sharing is provided through a simplified on/off switch within the Office 365 Service Settings.

External Sharing can be implemented in one of three ways when using Office 365:

There are three ways that you can do this:

*   You can share an entire site by inviting external users to sign in to your site using a [Microsoft account](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/redir/XT103433664.aspx?CTT=5&origin=HA102894713) or a [Microsoft Office 365 user ID](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/redir/HA102816060.aspx?CTT=5&origin=HA102894713).
*   You can share individual documents by inviting external users to sign in to your site using a [Microsoft account](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/redir/XT103433664.aspx?CTT=5&origin=HA102894713) or a [Microsoft Office 365 user ID](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/redir/HA102816060.aspx?CTT=5&origin=HA102894713).
*   You can send users a guest link that they can use to view individual documents on your site anonymously.

**NOTE** External Sharing in Office 365 requires SharePoint Online Enterprise (E1), SharePoint Online Enterprise (E3 & E4), SharePoint Online Midsized Business.  External Sharing is available in all commercial Office 365 offerings.

External Sharing Advantages
---------------------------

*   Simplified sharing model with granular access capabilities
*   Cost-effective
*   Light-weight solution to basic data sharing where complex business logic is not required or access to other internal resources/capabilities is required

External Sharing Disadvantages
------------------------------

*   Organizations who elect to share data using Office 365 external sharing should be cautioned that shared data will be isolated from on-premises data resulting in two distinct data siloes. Capabilities to include metadata, etc. will also be isolated to the shared data environment as opposed to being consumed from on-premises services.
*   Organizations who elect to share sites or site content should consider isolating such data from internal business sites as granting external users access to a site and/or sub-sites that share permissions with the parent site providing access to sensitive content. In the event there is an ongoing need to collaborate with customers and/or partners, an organization should consider configuring a site explicitly used to enable external sharing configured with unique permissions to isolate it from other sites in the subscription.

Additional Resources
====================

Overview of publishing to Internet, intranet, and extranet sites in SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/jj635881.aspx](http://technet.microsoft.com/en-us/library/jj635881.aspx)\]

Design Sample: Extranet with Dedicated Zones for Authentication for SharePoint 2013 \[[http://www.microsoft.com/en-us/download/details.aspx?id=30368\]](http://www.microsoft.com/en-us/download/details.aspx?id=30368%5d%20)

Plan for Internet, intranet, and extranet publishing sites in SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/jj635878.aspx](http://technet.microsoft.com/en-us/library/jj635878.aspx)\]

Share sites or documents with people outside your organization \[[http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/share-sites-or-documents-with-people-outside-your-organization-HA102894713.aspx?CTT=5&origin=HA102476183](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/share-sites-or-documents-with-people-outside-your-organization-HA102894713.aspx?CTT=5&origin=HA102476183)\]

Share a site with external users \[[http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/share-a-site-with-external-users-HA102476183.aspx](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/share-a-site-with-external-users-HA102476183.aspx)\]

Manage external sharing for your SharePoint online environment \[[http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/manage-external-sharing-for-your-sharepoint-online-environment-HA102849864.aspx?CTT=5&origin=HA102476183](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/manage-external-sharing-for-your-sharepoint-online-environment-HA102849864.aspx?CTT=5&origin=HA102476183)\]

What is an external user? \[[http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/what-is-an-external-user-HA104036809.aspx](http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/what-is-an-external-user-HA104036809.aspx "http://office.microsoft.com/en-us/office365-sharepoint-online-enterprise-help/what-is-an-external-user-HA104036809.aspx")\]