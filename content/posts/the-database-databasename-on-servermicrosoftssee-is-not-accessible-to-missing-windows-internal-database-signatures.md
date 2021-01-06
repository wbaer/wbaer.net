---
title: 'The database  on serverMicrosoftSSEE is not accessible to missing Windows Internal Database signatures.'
date: Tue, 23 Oct 2007 17:40:00 +0000
draft: false
tags: ['Windows SharePoint Services 3.0']
---

A solution is available to administrators of SharePoint Products and Technologies deployments experiencing the following application event after introducing WSS October public update KB934525.

Event Type:

Error

Event Source:

Windows SharePoint Services 3

Event Category:

Topology

Event ID:

6800

Date:

10/17/2007

Time:

8:09:40 PM

User:

NA

Computer:

HOME

Description:

The database WSS\_Content on HOMEMicrosoft##SSEE is not accessible to missing Windows Internal Database signatures.

1.  Run the following STSADM operations to stop and start the SPWebService:

> `stsadm -o provisionservice -action stop -servicetype spwebservice -servicename ""`  
>   
> `stsadm -o provisionservice -action start -servicetype spwebservice -servicename ""`

2.  Instantiate the upgrade by executing psconfig.exe or psconfigui.exe.

The cause of this issue is the SPWebService instance failed to finish provisioning. The status of that service is marked as provisioning. However, it has done enough provisioning work so that the user sites are working and/or during upgrade, the upgrade code skipped any web service instances that are not online, upgrading the administration sites; however, skipping the user sites.