---
title: 'Site Directory in SharePoint Server 2010 [Updated 5/12/2010]'
date: Thu, 29 Apr 2010 10:35:00 +0000
draft: false
tags: ['Site Directory', 'SharePoint']
---

SharePoint Portal Server 2003 and Office SharePoint Server 2007 provided a Site Directory that was commonly used to “catalog” the collection of sites within a server farm environment, most commonly, organizations used categories to isolate like or related site collections and the built-in provisioning callback to ensure site collections were listed in the Site Directory on creation.

In SharePoint Server 2010 the Site Directory has been deprecated, meaning that on new installations of SharePoint Server 2010 you cannot create and have a functional Site Directory; however, the Web Template and configuration options associated with the Site Directory have been retained, though strictly for backwards compatibility support.

While deprecated in SharePoint Server 2010 there are several options available to administrators seeking to provide similar functionality:

*   If an organization has implemented the Site Directory in Office SharePoint Server 2007, on upgrade it will be retained as a fully functional Site Directory in SharePoint Server 2010 with new added benefits such as new multi-lingual support.
*   If an organization does not have a Site Directory to upgrade similar functionality can be achieved through:
    *   Implementing Tagging, Notes, etc. to provide the sorting and search functionality associated with the Site Directory.
    *   Implement the Links Web Part to provide a simple listing of site collections in the server farm environment.
    *   Implement an SPFeature that places a Managed Metadata field within the site creation user interface and leverage a specific Term Set that can be used for classification purposes to provide the “categorical” functionally of the Site Directory in Office SharePoint Server 2007.  For additional information on the SPFeature Class see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spfeature(v=office.14).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spfeature(v=office.14).aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spfeature(v=office.14).aspx").

**Alternative Solutions**

If you are seeking an alternative solution that requires minimal development effort to provide the capabilities offered by the Site Directory in Office SharePoint Server 2007, see also [http://spsitedirectory2010.codeplex.com/](http://spsitedirectory2010.codeplex.com/ "http://spsitedirectory2010.codeplex.com/") which provides a set of downloadable solutions to replicate the capabilities of the Site Directory.