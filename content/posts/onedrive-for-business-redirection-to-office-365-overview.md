---
title: 'OneDrive for Business Redirection to Office 365 Overview'
date: Sat, 22 Mar 2014 01:20:19 +0000
draft: false
tags: ['Hybrid', 'IT Pro Resources', 'Office 365', 'OneDrive for Business', 'SharePoint', 'SharePoint Server 2013']
---

At the 2014 SharePoint Conference we announced the new OneDrive for Business SKU in addition to changes in Service Pack 1 functionality that enable IT administrators to selectively redirect their users to OneDrive for Business in Office 365 from SharePoint Server 2013.

Planning
========

The initial prerequisite steps to implementing OneDrive for Business redirection to Office 365 in Service Pack 1 is choosing the most effective identity management/federation options to suit your business needs.  At minimum cloud identity is required to enable redirection to OneDrive for Business in Office 365 or otherwise organizations seeking a more integrated, seamless experience should consider Directory Synchronization with Password Synchronization or ADFS / SSO for integrated authentication and authorization experiences.

Identity Management
-------------------

A properly planned identity management solution is the basis for any hybrid topology and the key to the user experience.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Identity%20Requirements.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Identity%20Requirements.png)

### [](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Identity%20Requirements.png)Cloud Identity

Cloud identities provide the most rapid solution to provisioning users in Office 365 and is based on a separate discrete set of credentials established in Windows Azure Active Directory; however, no correlation exists between the cloud identity and the organizations’ identity primary identity provider (I.e. AD DS).  
Cloud identity provides a rapid, easy to configure scenario for smaller organizations as businesses can quickly establish, manage, and authenticate users with no change to their existing identity management systems or practices.  In a cloud identity scenario, users are discretely managed through a Web portal and Windows Azure Active Directory in the Microsoft cloud.

#### Advantages

*   Requires no additional hardware or change to existing identity management infrastructure
*   Simple management and control of user identity - suitable for organizations with 0-50 users

#### Disadvantages

*   Identity and authentication are management completely in the cloud without affinity to an on-premises AD store
*   Discrete credentials across SharePoint 2013 and Office 365
*   Disconnected user experiences
*   Cannot be combined / used with hybrid SharePoint 2013 / Office 365 hybrid topologies

### Directory Synchronization with Password Sync

Directory Synchronization enables an organization with an established on-premises Active Directory environment to leverage their existing on-premises and user and group accounts in Office 365 reducing overall operational costs providing easier user access to cloud services such as OneDrive for Business.  Directory Synchronization continously synchronizes on-premises user and group accounts with Windows Azure Active Directory.  Combining Directory Synchronization with Password Sync synchronizes user passwords in addition to user and group accounts to Windows Azure Active Directory allowing users to log into cloud services using the same credentials they use to log into their corporate network.

#### Advantages

*   Requires no additional hardware or change to existing identity management infrastructure
*   Eliminates the need to manually manage user and group accounts in Windows Azure Active Directory
*   Enables a integrated user authentication experience across on-premises and cloud services

#### Disadvantages

*   Somewhat disconnected user experience (users are required to log into cloud services)
*   If a user is in the scope of the password sync feature, the cloud account password is set to "Never Expire". This means that it is possible for a user's password to expire in the on-premises environment, but they can continue to log into cloud services using this expired password.
*   Users are authenticated against cloud services as opposed to on-premises Active Directory

#### Resources

Directory Synchronization Roadmap \[[http://technet.microsoft.com/en-us/library/hh967642.aspx](http://technet.microsoft.com/en-us/library/hh967642.aspx)\]  
Directory Sync with Password Sync Scenario \[[http://technet.microsoft.com/en-us/library/dn441214.aspx](http://technet.microsoft.com/en-us/library/dn441214.aspx)\]  
Identity and Authentication in Cloud (Poster) \[[http://www.microsoft.com/en-us/download/details.aspx?id=38193](http://www.microsoft.com/en-us/download/details.aspx?id=38193)\]

### Active Directory Federation Services and Single Sign-On

Active Directory Federation Services (AD FS) makes it possible for local and federated users to use claims-based single sign-on (SSO) to Web sites and services including cloud services such as Office 365. Organizations can use AD FS to enable your organization to collaborate securely across Active Directory domains with other external organizations by using identity federation reducing the need for duplicate accounts, management of multiple logons, and other credential management issues that can occur when establishing cross-organizational trusts.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/SSO.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/SSO.png)

### Advantages

*   Complete SSO experience with minimal to no credential prompts
*   Improved security over Directory Synchronizations (users are authenticated against on-premises Active Directory)
*   Required for complex hybrid scenarios

### Disadvantages

*   Additional infrastructure required (FS)
*   Added operational complexity

### Resources

Office 365 Single Sign-On with AD FS 2.0 Whitepaper \[[http://www.microsoft.com/en-us/download/details.aspx?id=28971](http://www.microsoft.com/en-us/download/details.aspx?id=28971)\]

Redirection
-----------

### OneDrive for Business

OneDrive for Business redirection in Service Pack 1 allows IT administrators to selectively determine which users should be redirected to Office 365 for OneDrive for Business through Audiences.

Audiences are part of a User Profile service application that enables organizations to target content to users based on their job or task. Audiences can be defined by one or a combination of the following items:

*   Membership in a distribution list
    
*   Membership in a Windows security group
    
*   Location in organizational reporting structure
    
*   By public properties in user profiles
    

For example, an organization may elect to redirect a subset of their users by creating a Security Group (OneDrive Cloud Users) that establishes the basis for an Audience in the User Profile Service Application.

### Sites Page

In addition to redirection of OneDrive for Business, IT administrators can additionally configure redirection of users Sites page to Office 365.  When redirection of the Sites page is configured users who are redirected to Office 365 will see followed sites and recommendations based on their Office 365 profile - these users will not see sites and recommendations based on on-premises SharePoint Server 2013.

### Resources

Plan for OneDrive for Business in SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/dn232145(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn232145(v=office.15).aspx)\]  
Redirect users to Office 365 with OneDrive for Business \[[http://technet.microsoft.com/en-us/library/dn627524(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn627524(v=office.15).aspx)\]  
How to redirect users to Office 365 with OneDrive for Business \[[http://technet.microsoft.com/en-us/library/dn627525(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn627525(v=office.15).aspx)\]  
Redirect users to Office 365 with OneDrive for Business: Scenario Overview \[[http://technet.microsoft.com/en-us/library/dn627523(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn627523(v=office.15).aspx)\]  
Overview of OneDrive for Business in SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/dn167720(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn167720(v=office.15).aspx)\]

Discovery
---------

In addition to configuring user redirection, IT administrators should also consider the implications of content discovery across SharePoint Server 2013 on-premises and Office 365.

A SharePoint 2013 / Office 365 hybrid topology supports one of three possible hybrid search topologies 1) one-way inbound, 2) one-way outbound, and 3) two-way.  Each search topology requires careful consideration and planning and they provide unique user experiences that should be evaluated against user needs and use case scenarios.

### Outbound Topology

A one-way outbound hybrid authentication topology enables hybrid service integration in a single direction. In a one-way outbound hybrid topology SharePoint Server 2013 on-premises consumes content and resources from Office 365. For example, search can be configured to allow federated users to see both local and remote search results in a SharePoint Server 2013 search portal.  An outbound search topology is implemented where SharePoint Online results should appear in a separate result block in SharePoint Server 2013 on-premises.  Outbound topologies are the most effective for use with OneDrive for Business redirection as they require minimal configuration and infrastructure requirements.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Outbound%20Topology.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Outbound%20Topology.png)

### Resources

Plan a one-way outbound hybrid topology \[[http://technet.microsoft.com/en-us/library/dn607307(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn607307(v=office.15).aspx)\]

Inbound Topology
----------------

A one-way inbound hybrid authentication topology enables hybrid service integration in a single direction. In a one-way inbound hybrid topology Office 365 consumes content and resources from SharePoint Server 2013 on-premises. For example, search can be configured to allow federated users to see both local and remote search results in an Office 365 search portal.  An inbound search topology is implemented where SharePoint Server 2013 on-premises results should appear in a separate result block in SharePoint Online.  Inbound topologies, unlike outbound topologies, require additional infrastructure (reverse proxy device) and are least commonly implemented when redirecting OneDrive for Business to Office 365 as both local and remote results are available only in SharePoint Online.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Inbound%20Topology.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Inbound%20Topology.png)

### Resources

Plan a one-way inbound hybrid topology \[[http://technet.microsoft.com/en-us/library/dn607316(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn607316(v=office.15).aspx)\]

Bidirectional Topology
----------------------

A two-way topology enables bidirectional hybrid service integration between SharePoint Server 2013 on-premises and Office 365. For example, search can be configured to allow federated users to see both local and remote search results in either SharePoint Server 2013 on-premises or SharePoint Online search portals.  Bidirectional topologies, like inbound topologies, require additional infrastructure (reverse proxy device) in addition to VPN and/or DirectAccess to support display of results across SharePoint Server 2013 on-premises and SharePoint Online.

[![ ](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Bidirectional%20Topology.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/Bidirectional%20Topology.png)

### Resources

Plan a two-way hybrid topology \[[http://technet.microsoft.com/en-us/library/dn607317(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn607317(v=office.15).aspx)\]

Demo
----

This demo illustrates the configuration of OneDrive for Business redirection in SharePoint Server 2013 Service Pack 1 in environment configured with Directory Synchronization with Password Sync.

\[View:~/cfs-file.ashx/\_\_key/communityserver-blogs-components-weblogfiles/00-00-00-48-65/1738.OneDrive-For-Business-Redirection-in-Service-Pack-1.mp4:0:0\]