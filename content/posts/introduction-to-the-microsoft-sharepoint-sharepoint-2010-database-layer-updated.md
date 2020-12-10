---
title: 'Introduction to the Microsoft SharePoint SharePoint 2010 Database Layer [UPDATED]'
date: Mon, 30 Nov 2009 14:48:44 +0000
draft: false
tags: ['Uncategorized']
---

Microsoft SharePoint Server 2010 introduces both new databases and databases whose distribution and purpose differs over previous versions of Microsoft SharePoint Products and Technologies. This post details the changes in the Microsoft SharePoint Server 2010 database layer. This section provides information about Shared Service Applications that have a database dependency and is not an exhaustive list of all Shared Service Applications available in Microsoft SharePoint Server 2010.  At the time of publication this is not 100% complete.

**Usage and Health Data Collection Service**

The Usage and Health Data Collection Service collects and logs SharePoint health indicators and usage metrics for analysis and reporting purposes.

_Logging Database_

The logging database is the Microsoft SQL Server, MSDE, or WMSDE database that stores health monitoring and usage data temporarily, and can be used for reporting and diagnostics.

**Search Service**

_Administration Database_

The Administration Database is what the Shared Services Provider database was in Microsoft Office SharePoint Server 2007 and is instantiated once per Search application aligning with the Administration Component. The Administration Database hosts the Search application configuration and access control list (ACL) for the content crawl.

_Property Database_

The Property Database stores crawled properties associated with the crawled data to include properties, history data, crawl queues, etc.

_Crawl Database_

The Crawl Databases host the crawled data and drives crawl - the Crawl Database is what the Search database was in Microsoft Office SharePoint Server 2007.

**Web Analytics Service**

The Web Analytics Service provides rich analytics giving you insights into your web traffic, search, and SharePoint assets enabling you to better understand your user and deployments. With SharePoint Web Analytics, you’ll be able to tailor the system to meet the needs of your users, optimize how they use and discover information, and create targeted content for your sites.

_Staging Database_

The Web Analytics Staging database is the working database that stores un-aggregated Fact Data, asset metadata, queued batch data, and provides short term retention of this content.

_Reporting Database_

The Web Analytics Reporting database stores aggregated standard report tables, Fact Data aggregated by Site Group, date, and asset metadata in addition to diagnostics information.

**Configuration Database**

The configuration database handles all administration of the deployment, directing requests to the appropriate database, and managing load-balancing for the back-end databases. When a front-end Web server receives a request for a page in a particular site, it checks the configuration database to determine which content database holds the site's data. You can run the configuration database on the same computer as a Web server or on a remote computer running Microsoft SQL Server. The configuration database concepts are relatively unchanged in Microsoft SharePoint Server 2010. In Microsoft Office SharePoint Server 2007 and Windows SharePoint Services 3.0 the SiteMap table was stored in the configuration database which provided information about which content database contains data for a given site. When Windows SharePoint Services or Microsoft Office SharePoint Server 2007 received the URL of a request, settings in this database determine which content database contains data for the site. In Microsoft SharePoint Server 2010 and Windows SharePoint Services 4.0 the SiteMap is serialized to disk to improve performance and reduce database callback operations that could result in contention when serving requests on large server farm deployments.

**Content Database**

The back-end content database stores all site content, including site documents or files in document libraries, list data, and Web Part properties, as well as user names and rights. All the data for a specific site resides in one content database on only one computer.

**Central Administration Content Database**

See also Content Database.

**Shared Services Provider (SSP)**

The Shared Services Provider layer is obsolete in Microsoft SharePoint Server 2010 replaced with Shared Services Applications, to understand changes in database design associated with the Shared Services Provider database, see also Search and People in this section.

**NOTE**

A Microsoft Office SharePoint Server 2007 Shared Services Provider when upgraded will result in a new Search, User Profile, Excel Services, Application Registry Backwards Compatability, and Managed Metadata Service shared services applications. New databases will be created as required to support the upgrade and Web application settings are preserved through establishing a proxy for each service application.

**User Profile Service**

The User Profile Service encompasses user profiles and My Sites.

_Profile Database_

The user profile database is a flexible database that stores and manages user and associated information. The database allows for a flexible schema that supports multiple data types. It can be queried and it can be updated. For example, a company can define the attributes of an employee record in the profile database. Then for each record, an employee object will be created and saved. This information is now usable in a number of ways, such as in WebParts, in the Web service, or to create rule based groups or roles.

1.  Properties
2.  Profiles
3.  Multiple values
4.  Vocabularies
5.  Colleagues
6.  Memberships
7.  Change Log

_Synchronization Database_

The synchronization database is used to store configuration and staging data for synchronization of profile data from external sources such as Active Directory.

_Social Tagging Database_

The social tagging database stores social tagging records and their respective Url which are coupled with information from the profile and taxonomy databases at the front-end layer at execution/request. This database is used to store social tags and notes created by users.

**Managed Metadata Service**

The Managed Metadata Service publishes a term store and, optionally, a set of content types.

_Term Store Database_

A database in which managed metadata is stored. The Web front end public APIs interact with the data layer to get or set data. The data layer talks to the term store directly if the shared service is local to the farm, or it talks to a backend Web service on an application server if the shared service is not local. The backend Web service then interacts with the data layer on the application server to get to the term store.

**State Service**

The State Service maintains temporary state information for InfoPath Forms Services.

_State Database_

The state database maintains temporary state information for InfoPath Forms Services.

**Business Data Connectivity Service**

The Business Database Connectivity Service provides a means for storing, securing, and administering external content types and related objects.

_Database_

Stores external content types and related objects.

**Secure Store Service**

The Secure Store Service replaces the Single Sign On Service in previous versions of the product.

This service provides storage and mapping of credentials such as account names and passwords. Portal site–based applications can retrieve information from third-party applications and back-end systems such as Enterprise Resource Planning (ERP) and Customer Relations Management (CRM) systems.

The use of Secure Store functionality enables users to authenticate without asking the user multiple times for the credentials needed to authenticate in that system.

_Store Database_

Provides storage and mapping of credentials such as account names and passwords.