---
title: 'Installation notice for the SharePoint Server Public Beta on Microsoft Windows Server 2008 R2 and Microsoft Windows 7'
date: Fri, 20 Nov 2009 04:54:39 +0000
draft: false
tags: ['IT Pro Resources', 'Migration &amp; Upgrade', 'SharePoint', 'SharePoint Server 2010']
---

If you will be installing the SharePoint Server Public Beta on Microsoft Windows Server 2008 R2 or Microsoft Windows 7 you will need to download and install an update from [http://connect.microsoft.com/VisualStudio/Downloads/DownloadDetails.aspx?DownloadID=23806](http://connect.microsoft.com/VisualStudio/Downloads/DownloadDetails.aspx?DownloadID=23806)  to resolve an issue that occurs in Microsoft SharePoint Server 2010 when provisioning Service Applications or when accessing pages that make service calls.  These operations will result in an error "System.Configuration.ConfigurationErrorsException: Unrecognized attribute 'allowInsecureTransport'. Note that attribute names are case-sensitive. (C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14WebClients<Service Area>client.config line <Line Number>)". 

If you have already installed Microsoft SharePoint Server 2010 on a server running Microsoft Windows Server 2008 R2 or Microsoft Windows 7, Microsoft SharePoint Server 2010 does not need to be reinstalled when the update becomes available; however, Service Applications that have been successfully provisioned without the update installed may need to be removed and re-provisioned once the update has been successfully applied.

Bill Baer, Technical Product Manager – US-SharePoint