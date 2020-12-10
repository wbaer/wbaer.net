---
title: 'Service Pack 1 Move-SPSite w/ ''shallow copy'''
date: Fri, 22 Jul 2011 19:58:53 +0000
draft: false
tags: ['Administration', 'Remote BLOB Storage', 'Service Pack 1', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

Service Pack 1 introduces a new method of moving Site Collections between Content Databases where RBS is used known as ‘shallow copy’.

**Overview**

What is ‘shallow copy’?

‘Shallow copy’ refers to moving structured content without moving the underlying unstructured content.  With SharePoint 2010 Products ‘shallow copy’ moves the structured Site Collection data across Content Databases without moving the unstructured data which is comprised of user created content such as PowerPoint Presentations, Word Documents, etc.

What is a ‘shallow copy’ migration?

‘Shallow copy’ migration refers to a migration technique in which structured Site Collection data is moved across Content Databases while the unstructured BLOB data remains untouched in its originally configured BLOB store.

What is a deep copy migration?

Deep copy refers to a migration technique is which unstructured BLOB data is passed through the Object Model when its associated Site Collection is moved across Content Databases, I.e. download and upload of BLOB data.

**Benefits**

‘Shallow copy’ capabilities provide a number of benefits, for example, shallow copy migration enables seamless movement of Site Collections across Content Databases while improving performance through enabling the unstructured data to remain in the originally configured BLOB store.  In scenarios where the same RBS provider is configured in both the source and destination Content Database the structured Site Collection data is moved without copying the underlying BLOB data – transferring only the ownership information between Content Databases.

In many SharePoint 2010 Products deployments unstructured BLOB data comprises 80% or more of the total content, ‘shallow copy’ helps administrators avoid deep copy migration significantly reducing the time required to move Site Collections between Content Databases.

**Prerequisites**

The following prerequisites are required to implement ‘shallow copy’ migrations.

SQL Server 2008 R2 Public Cumulative Update  
SharePoint Server 2010 Service Pack 1

Administrators can leverage ‘shallow copy’ functionality in Service Pack 1 through both the Object Model and Windows PowerShell using the Move-SPSite Windows PowerShell CmdLet with the -RbsProviderMapping parameter.  The -RbsProviderMapping parameter defines the mapping between the RBS providers in the source and destination Content Databases.

Move-SPSite -Identity siteUrl -DestinationDatabase databaseName -RbsProviderMapping  
    @{"sourceProvider1"="targetProvider1", "sourceProvider2"="targetProvider2"}

When using the -RbsProvideMapping parameter the ownership of the RBS pool (subset of the BLOB store documents) used by the specified Site Collection is transferred from the source to the destination Content Database without moving the underlying unstructured data associated with that Site Collection.

‘Shallow copy’ is also an efficient migration method when moving from EBS to RBS.  In an EBS to RBS scenario the EBS token is moved from the source to the destination Content Database.

For additional information on Remote BLOB Store Architecture see [http://msdn.microsoft.com/en-us/library/gg316769.aspx](http://msdn.microsoft.com/en-us/library/gg316769.aspx).

For additional information on the Move-SPSite CmdLet see [http://technet.microsoft.com/en-us/library/ff607915.aspx](http://technet.microsoft.com/en-us/library/ff607915.aspx "http://technet.microsoft.com/en-us/library/ff607915.aspx").