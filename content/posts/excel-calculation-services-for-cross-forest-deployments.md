---
title: 'Excel Calculation Services for Cross-Forest Deployments'
date: Tue, 19 Jun 2007 11:43:00 +0000
draft: false
tags: ['Cross-Forest Hosting', 'Excel Calculation Services', 'Uncategorized']
---

While on vacation, yes working ;-), I was asked to look into an issue where Excel Calculation Services was deployed in a cross-forest environment; specifically where Excel Services is deployed on server A residing in Forest 1 and the clients requesting workbooks reside in Forest 2. Forest 2 does not trust Forest 1; however, Forest 1 trusts Forest 2. The Excel Calculation Services topology in this scenario was fairly basic where Excel Web Access, Web Services, and the Calculation Services are distributed across two network load-balanced web front-end servers and Excel Calculation Services and any UDF assemblies are hosted on a separate application server also servicing the Office SharePoint Server Search indexing service.

The Excel Calculation Services topology is supportive of a cross-forest deployment and only needed one minor adjustment. In a scenario such as that described above to allow workbooks in trusted file locations to be access across domains \[in this scenario, the Windows SharePoint Services Web application is defined as a Trusted File Location and includes all children in the trust\] Excel Calculation Services must be configured to allow cross domain access using the SharePoint administration tool (STSADM). To allow access across domains you will need to run the following STSADM operation on the application server hosting the Excel Calculation Services component:

> stsadm.exe -o Set-EcsSecurity -Ssp <SSP name> -AllowCrossDomainAccess true

**About the Components**

The Excel Calculation Services component is the “engine” of Excel Calculation Services and handles loading, calculation, session management, and external data refresh for workbooks.

The Excel Web Access component is a Web part used to display and enable interaction with Microsoft Office Excel workbooks in a browser.

The Excel Web Services component is a Web service hosted in Microsoft Office SharePoint Server 2007 that provides methods that a developer can use as an API to build custom applications based on Microsoft Office Excel workbooks.

**Basic Component Distribution**

![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/ExcelCalculationServicesforCrossForestDe_7A94/clip_image002.gif)