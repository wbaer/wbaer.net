---
title: 'Step-by-Step: Provisioning the Web Analytics Service Application on Microsoft SharePoint Server 2010 Beta'
date: Sat, 21 Nov 2009 20:47:00 +0000
draft: false
tags: ['IT Pro Resources', 'SharePoint Server 2010']
---

**Prerequisites**

Usage and Health Data Collection and the Session State Service Application have been provisioned on the farm.

**Provisioning the Web Analytics Service Application**

Open SharePoint 2010 Central Administration.

Select Manage service applications under Application Management.

Select New | Web Analytics Service Application on the ribbon user interface.

[![CA](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheWebAnalyticsSer_DD57/CA_thumb.png "CA")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheWebAnalyticsSer_DD57/CA_2.png)

On the Create Web Analytics Service Application dialog specify the name for the new Web Analytics Service Application or accept the default name, usually Web Analytics Service Application 1.

Provide a name for the new Application Pool.

Provide the name of the default database server where the Web Analytics reporting and staging databases will be hosted and specify the desired retention period.

[![A2_thumb](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheWebAnalyticsSer_DD57/A2_thumb_thumb.png "A2_thumb")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheWebAnalyticsSer_DD57/A2_thumb_2.png)

Click OK on the new Create Web Analytics Service Application dialog to provision the new service application.

On a single server deployment select System Settings from SharePoint 2010 Central Administration and then click Services on Server.

From the list of available services start the Web Analytics Data Processing Service and Web Analytics Web Service. 

[![Untitled picture](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheWebAnalyticsSer_DD57/Untitled%20picture_thumb.png "Untitled picture")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/StepbyStepProvisioningtheWebAnalyticsSer_DD57/Untitled%20picture_2.png)

_Data is logged into .usage files on the front-end Web servers where it is processed into the staging database created in the previous steps through the Timer Job infrastructure.  The data in the staging database is retained for 30 days and transitioned into the reporting database for longer term retention as specified in the retention period when the service application was created.  The information is subsequently surfaced through a variety of Web Parts by the Web Analytics Web Service._

**NOTE**

If you have installed Microsoft SharePoint Server 2010 in a server farm environment with one or more application servers start the Web Analytics Data Processing Service and Web Analytics Web Service on the application server where the service will run.

Following the successful completion of the steps above you will having a running instance of the Web Analytics Service Application.

To confirm Web Analytics is running, select Monitoring from SharePoint 2010 Central Administration and then select View Web Analytics reports under Reporting.  You should see a blue bar with the text Date Range 10/21/2009 - <current date -1> (UTC <time zone specifics> Change Settings.