---
title: 'Planning a 100,000+ My Site personal site deployment?  Notes...'
date: Tue, 10 Jun 2008 17:11:00 +0000
draft: false
tags: ['Capacity Planning', 'People and Profiles', 'Performance']
---

This topic has frequented my Inbox over the past months, planning a My Site personal site deployment for 100,000+ users.  In this post we'll examine the issues and potential solutions.

First it is important to understand that while a My Site personal site is a site collection in basic form, it’s instantiation via a browser request or managed code results in significantly greater overhead than a traditional collaboration-type site collection.  The majority of overhead is presented through the numerous data building operations that occur both on the private and public pages associated with the template, private.aspx and person.aspx respectively.

The My Site private page (private.aspx) is considered to be a private view that hosts information specific to you (or the site collection owner).  This information is presented in part based on your membership in a specific audience in many configurations.  The private page also serves as a host to your documents, alerts and subsequent alert results.  Private.aspx also provides the capability to view your Inbox, calendar, and other Exchange views.

The My Site personal site public page is intended to present information to be shared with other users and contains information such as personal and professional interests, shared links and documents.  The public page also provides out of the box functionality that can be used to determine organizational similarities between the user requesting your profile and themselves (also known as the Organization Hierarchy Web Part).  Other comparative Web Parts include In Common with You and Memberships.

The result of these two unique views presented in a My Site personal site is approximately a 50% more costly public view when compared to the private view as a result of resource intensive operations required to build and present the profile information for a specific user requesting the My Site personal site public page.

The majority of the information that is presented on the public page is derived from the profile database, since that content is isolated to a single database there are no options to spread the load across multiple database servers.  The database is the smallest unit of file system representation for SharePoint and cannot be logically partitioned (clustered indexing strategy comes in play here); however, you can physically partition the database and stripe the data files across dedicated physical disks to gain parallelism which will help with data access I/O.

**Topology**

A distributed topology provides the most efficient mechanism to support a large number of My Site personal sites and is commonly comprised of two or more independent server farms supporting the associated Web applications from unique geographic regions.  For example, server farm A in Seattle hosts the My Site host Foo, and an audience defined in the Shared Services Provider for domain users in the North America region is configured to use the My Site host Foo as their trusted My Site host (Figure 1) whereas server farm B in Dublin hosts the My Site host Bar, and an audience (Figure 2) defined in the Shared Services Provider for domain users in the EMEA region is configured to use the My Site host Bar as their trusted My Site host.  This topology generally requires a parent Shared Services Provider to which server farms A and B are consumers, a local Shared Services Provider can be configured; however, certain profile replication mechanisms should be in place to keep the SSP’s synchronized.  In either scenario when user B who is a member of an EMEA based domain users group, e.g. EuropeDomain Users requests Foo, the audience membership is read and subsequently the user is redirected to Bar, this process conversely applies to user C who is a member of a North America based domain users group, e.g. AmericaDomains Users.

[![clip_image002](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/Planninga100000MySitepersonalsitedeploym_C327/clip_image002_thumb.jpg)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/Planninga100000MySitepersonalsitedeploym_C327/clip_image002_2.jpg)

Figure 1 Trusted My Site host locations (Shared Services Provider administration)

[![clip_image002[5]](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/Planninga100000MySitepersonalsitedeploym_C327/clip_image002%5B5%5D_thumb.jpg)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/Planninga100000MySitepersonalsitedeploym_C327/clip_image002%5B5%5D.jpg)

Figure 2 Configure Trusted My Site host location and audience

\*An important consideration is the requirement to have two or more unique URI’s to supported the distributed topology, for example [http://mysite](http://mysite/) in North America and [http://mysiteemea](http://mysiteemea/) in EMEA.

**Planning**

Consider RAID 0+1 or 1+0 sets to supported the Shared Services Provider database and define a subsequent scale-up strategy.

Consider running profile synchronization operations during non-core business hours.

Consider removing costly Web Parts and determine their overall business value, this may include Organizational Hierarchy, In Common with You, and Memberships.

Consider a distributed topology where possible.

Remember the sizeable fraction of visits to a My Site personal site are from that of the site collection owner themselves.

RPS – Throughput can decline as the number of site collections in a given content database increase.

Consider Kerberos where possible to improve authentication performance and reduce overhead.

Plan for capacity and ensure a proper governance plan is endorsed and implemented.

**Resources**

About My Site  
[http://office.microsoft.com/en-us/sharepointserver/HA011605561033.aspx](http://office.microsoft.com/en-us/sharepointserver/HA011605561033.aspx)

About Audiences  
[http://office.microsoft.com/en-us/sharepointserver/HA011603031033.aspx](http://office.microsoft.com/en-us/sharepointserver/HA011603031033.aspx)

Plan for software boundaries (Office SharePoint Server)  
[http://technet.microsoft.com/en-us/library/cc262787.aspx](http://technet.microsoft.com/en-us/library/cc262787.aspx)

Planning and Monitoring SQL Server Storage for SharePoint: Performance Recommendations and Best Practices  
[http://go.microsoft.com/fwlink/?LinkID=105623&clcid=0x409](http://go.microsoft.com/fwlink/?LinkID=105623&clcid=0x409)