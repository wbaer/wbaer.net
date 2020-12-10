---
title: 'Service Connection Points and Governance with SharePoint Server 2010'
date: Wed, 28 Apr 2010 23:37:03 +0000
draft: false
tags: ['Governance', 'SharePoint Server 2010']
---

Keeping the trend going this week we'll look at _Active Directory Markers_ in SharePoint Server 2010. 

Governance is one of the key planning processes that should occur when considering the deployment of any technology, and SharePoint Server 2010 provides a number of tools and resources to facilitate the product and technology aspects of governance, one of which is the concept of Active Directory Markers to manage and control the uncontrolled proliferation of SharePoint in the Enterprise.

SharePoint Server 2010 uses the Service Connection Point Active Directory Schema (serviceConnectionPoint (SCP))) in order to publish service-specific data in the directory.  Administrators can use the data in a Service Connection Point to locate, connect to, and authenticate and instance of the service.

In order to use this new capability you must first create a container under CN=System,DC=<domain>,DC=com, where the values will reside and provide write access to the specific accounts that will write values to the container – in most cases the person or system account used to deploy SharePoint in your environment.

Configure Active Directory
--------------------------

1.  On a Domain Controller open ADSI Edit (ADSIEDIT.MSC).
2.  Right-click the ADSI Edit node and select **Connect to…**
    1.  On the Connection Settings dialog under Select a well-known Naming Context select **Default Naming Context** and click **OK**.
3.  Select the **Default naming context node** and expand the domain.
4.  Locate and right-click **CN=System** and select **New** | **Object…**
    1.  On the Create Object dialog under Select a class… select **container** and click **Next**.
    2.  In the Value: field enter **Microsoft SharePoint Products** and click **Next**.
    3.  On the Create Object dialog click **Finish**.
5.  Right click on the new container (Microsoft SharePoint Products) and select **Properties**.
    1.  On the CN=Microsoft SharePoint Products Properties dialog select the **Security** tab.
    2.  Click **Add…** and select the individual or service account that will have write permissions to the container on the Select Users, Computers, Service Accounts, or Groups dialog and click **OK**.
    3.  On the CN=Microsoft SharePoint Products Properties dialog under Permissions for <account> select the checkbox labeled **Write** under Allow and click **OK**.

Deployment and Validation
-------------------------

When SharePoint Server 2010 is deployed a Service Connection Point object is created as a GUID under the container created in the previous steps.

1.  Locate and right-click the GUID and then select **Properties**.

> The deployed server farm’s Topologies Web Service is created with the value presented as [:/Topology/topology.svc">http://<server>:<port>/Topology/topology.svc](http://<server>:<port>/Topology/topology.svc).

For additional information on Connection Points and Active Directory see also [http://msdn.microsoft.com/en-us/library/ms675738(v=VS.85).aspx](http://msdn.microsoft.com/en-us/library/ms675738(v=VS.85).aspx "http://msdn.microsoft.com/en-us/library/ms675738(v=VS.85).aspx").