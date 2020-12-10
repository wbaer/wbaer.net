---
title: 'Multi-tenancy in SharePoint 2010'
date: Fri, 10 Dec 2010 19:50:38 +0000
draft: false
tags: ['Administration', 'Hosting', 'SharePoint', 'SharePoint Server 2010']
---

The traditional and most accurate definition of multi-tenancy remains as a single instance of software that services multiple organizations or clients virtually partitioning its data and configuration allowing those clients to work within a customized application instance. SharePoint Server 2010 delivers new features and capabilities that contribute to supporting true multitenant architectures that are useful not only to hosting providers, but the Enterprise equally.

Multi-tenancy, when carefully planned and applied within the Enterprise, is one of many solutions that contribute to reduced cost, complexity, and overall management.

An airport is an example of multi-tenancy:

*   The airport provides the facilities to support operations and services such as concourses and terminals
*   Gates are rented by each airline from the airport authority, some airlines may rent an entire terminal building in their "hub" airport
*   Private companies contracted by one or more airlines at an airport provide food and beverage services to the airlines in addition to aircraft maintenance

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2148.image_thumb_0E8AA58B.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2654.image_6BA9E3DA.png)

In summary the airport authority provides the foundation to support the overall operations and airlines are tenants of the airport authority.

Similarly in SharePoint Server 2010, the organization provides the basic services required to support one or more solutions through SharePoint Server 2010 – the IT Professional creates tenants and delegates administrative control and routine operations to a tenant administrator who consumes services from the core offering provided by the organization.

In SharePoint 2010 multi-tenancy is offered through several key contributing solutions:

**Site Subscriptions**

Site subscriptions can be loosely described as a collection of sites that subscribe to a set of service partitions, settings, and individual features – site subscriptions are also known as tenants. In summary we can approach site subscriptions as a loose association of content. In the Object Model site subscriptions are represented through Microsoft.SharePoint.SPSiteSubscription.

**Tenant Administration**

The management of site subscriptions occurs through a new administration site template, Tenant Administration, which is used to manage many aspects of the site collections that subscribe from the subscription.

Creating a new site subscription object in SharePoint Server 2010 requires an administrator to:

1.  Create a SPSiteSubscription object
2.  Create and add a SPSite object to the SPSiteSubscription

**Feature Packs**

Feature Packs are a method by which allows the developer to group a collection of individual features (Site or Web scoped) into a larger overall package. Feature Packs are used to provide functionality or capabilities to individual site subscriptions in a multi-tenant model enabling or preventing access to certain functionality or solutions on a tenant by tenant basis.

**Partitioning**

Data, usage, and operational isolation are provided through many of these new capabilities. The ability to partition many of SharePoint 2010’s Service Applications enable individual and unique tenants to consume the Service Application while maintaining logical separation from other tenants also consuming from the partitioned Service Application.

Creating a new partitioned Service Application in SharePoint Server 2010 requires an administrator to:

1.  Create a partitioned Service Application using the -partitionmode flag
2.  Create a partitioned Service Application proxy using the -partitionmode flag

Multi-tenancy in SharePoint Server 2010 is a method by which both traditional hosters and Enterprises can gain value in both operation and data isolation.  Properly planned and implemented can help reduce operating expenditures and reduce the administrative burden on the IT Professional.