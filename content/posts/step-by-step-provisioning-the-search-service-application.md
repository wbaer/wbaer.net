---
title: 'Step-by-Step: Provisioning the Search Service Application'
date: Mon, 23 Nov 2009 12:30:06 +0000
draft: false
tags: ['IT Pro Resources', 'SharePoint Server 2010']
---

**Contents**

[Provisioning the Search Service Application](#Provisioning)

[Moving Query Components](#Moving)

[Creating Mirror Query Components](#CreatingMirror)

[Creating Query Components](#CreatingQuery)

[Creating Crawl Components](#CreatingCrawlComponents)

[Creating Crawl Databases](#CreatingCrawlDatabases)

[Creating Property Databases](#CreatingProperty)

**Provisioning the Search Service Application**

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

Select **New** | **Search Service Application** on the ribbon user interface.

[![CA](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/CA_thumb.png "CA")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/CA_2.png)

On the Create Search Service Application dialog specify the name for the new Search Service Application or accept the default name, usually Search Service Application 1.

Provide a name for the new Search Administration Web Service Application Pool or use an existing Application Pool.

Provide a name for the new Search Administration Site Settings and Query Web Service or use an existing Application Pool.

[![CA2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/CA2_thumb.png "CA2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/CA2_2.png)

Click **OK** on the new Create New Search Service Application dialog to provision the new service application

Once the Search Service Application has been successfully provisioned on the server farm you will have a 1x1x1 topology or otherwise 1 Search Administration, 1 Crawl, and 1 Query component on the machine hosting SharePoint 2010 Central Administration and all associated databases on the default database server.

[![Topology](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology_thumb.png "Topology")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology_2.png)

**NOTES**

The Search administration (Admin) topology does not scale out - there can be on one (1) search administration component and one (1) search administration database per Search Service Application.

The Crawl topology can be scaled out by adding Crawl Components or Crawl Databases.  Crawl Components can have a many-to-one relationships with Crawl Databases.

The Query topology can be scaled out by adding Property Databases or by adding Query Components.  Index Partitions subdivide the full-text index.   A new Query Component can either be the first component in a new partition (see above illustration (Query Component 0)) or an additional component in an existing partition.

In the public beta, Index Partitions have a many-to-one relationship with Property Databases.

**Moving Query Components**

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

On the Services Applications page, select the Search Service Application.

On the Search Administration page, locate the Search Application Topology section and click **Modify**.

On the Topology for Search Service Application: Search Service Application page, locate the Index Partition category. (The default Query Component is typically named Query Component 0). Click Query Component 0 and then click **Edit Properties**.

On the Edit Query Component page, select a server in the topology from the **Server** drop-down list and then click **OK**.  This will move the Query Component to the selected server.

[![EditQueryComponent](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/EditQueryComponent_thumb.png "EditQueryComponent")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/EditQueryComponent_2.png)

**Creating Mirror Query Components**

When you create a Mirror Query Component, you create a replica of the Index Partition on another server.  You will typically create new Mirror Query Components when you need to increase throughput or availability.

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

On the Services Applications page, select the Search Service Application.

On the Search Administration page, locate the Search Application Topology section and click **Modify**.

On the Topology for Search Service Application: Search Service Application page, locate the Index Partition category. (The default Query Component is typically named Query Component 0). Click **Query Component 0** and then click **Add Mirror**.

[![AddMIrror](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddMIrror_thumb.png "AddMIrror")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddMIrror_2.png)

On the Add mirror query component dialog, select a server in the topology from the **Server** drop-down list and then click **OK**.

[![AddMirrorComponent](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddMirrorComponent_thumb.png "AddMirrorComponent")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddMirrorComponent_2.png) 

Repeat the steps for each server in the topology as required.

**Creating Query Components**

When you create a new Query Component, you create a new Index Partition which subdivides the full-text index.  You will typically create new Query Components and Index Partitions when the total number of items in your Index exceed the recommend scale for a single Index Partition, or when you need to increase throughput or availability.

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

On the Services Applications page, select the Search Service Application.

On the Search Administration page, locate the Search Application Topology section and click **Modify**.

On the Topology for Search Service Application:  Search Service Application 1, select **New** | **Index Partition and Query Component**.

[![Topology2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_thumb.png "Topology2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_2.png)

On the Add Query Component dialog, select a server in the topology from the **Server** drop-down list, Property Database, and specify the location of the Index Partition.

[![AddQueryComponent](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddQueryComponent_thumb_1.png "AddQueryComponent")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddQueryComponent_4.png)

Click **OK** on the Add Query Component dialog to save the changes and create the new Query Component.

**Creating Crawl Components**

You will typically create new Crawl Components to improve the overall crawl speed and subsequently freshness of the content and to improve availability.

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

On the Services Applications page, select the Search Service Application.

On the Search Administration page, locate the Search Application Topology section and click **Modify**.

On the Topology for Search Service Application:  Search Service Application 1, select **New** | **Crawl Component**.

[![Topology2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_thumb.png "Topology2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_2.png)

On the Add Crawl Component dialog specify the server where the Crawl Component will be hosted, the Crawl Database to which the Crawl Component will be associated, and the temporary location on the Index.

[![AddCrawlComponent](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddCrawlComponent_thumb.png "AddCrawlComponent")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddCrawlComponent_2.png)

Click **OK** on the Add Crawl Component dialog to save the changes and create the new Crawl Component.

**Creating Crawl Databases**

You will typically create new Crawl Databases to improve the overall crawl speed and subsequently freshness of the content and in correlation to the creation of new Crawl Components.

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

On the Services Applications page, select the Search Service Application.

On the Search Administration page, locate the Search Application Topology section and click **Modify**.

On the Topology for Search Service Application:  Search Service Application 1, select **New** | **Crawl Database**.

[![Topology2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_thumb.png "Topology2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_2.png)

On the Add Crawl Database dialog specify the database server where the Crawl Database will reside, the database name, and optionally the select whether the Crawl Database will be dedicated to hosts specified in Host Distribution Rules.

Host Distribution Rules are useful in specifying:

1\. A particular host that is processed by a one or more Crawler Databases.  
2\. A particular host is processed by only one or more Crawler Database.

Host Distribution Rules are commonly used to support large and complex content corpuses that require horizontal scale (scale out) topologies.

[![AddCrawlDB](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddCrawlDB_thumb.png "AddCrawlDB")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddCrawlDB_2.png)

Click **OK** on the Add Crawl Database dialog to save the changes and create the new Crawl Database.

**Creating Property Databases**

You will typically create new Property Databases to support the horizontal scale (scale out) of the Query Component(s).

Open SharePoint 2010 Central Administration.

Select **Managed service applications** under **Application Management**.

On the Services Applications page, select the Search Service Application.

On the Search Administration page, locate the Search Application Topology section and click **Modify**.

On the Topology for Search Service Application:  Search Service Application 1, select **New** | **Property Database**.

[![Topology2](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_thumb.png "Topology2")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/Topology2_2.png)

On the Add Property Database dialog specify the database server where the Property Database will reside and the database name.

[![AddPropertyDatabase](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddPropertyDatabase_thumb.png "AddPropertyDatabase")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheSearchServiceAp_89A3/AddPropertyDatabase_2.png)

Click **OK** on the Add Property Database dialog to save the changes and create the new Property Database.