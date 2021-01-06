---
title: 'KB934525 Troubleshooting "Cannot start service SPAdmin on computer ''.''."'
date: Mon, 15 Oct 2007 15:12:00 +0000
draft: false
tags: ['Windows SharePoint Services 3.0']
---

I've come across a handful of posts regarding KB934525 for Windows SharePoint Services and failure to start the Windows SharePoint Services Administration service.  I've attached some basic troubleshooting steps that may provide resolution to issues where psconfig fails with **Cannot start service SPAdmin on computer '.'.**  For those who have installed the KB and have experienced issues where the service has failed to start, Option 4 is the recommended solution. 

**UPDATE Oct. 15, 2007 18:50** If you are unable to successfully initialize and complete the SharePoint Products and Technologies Configuration Wizard (psconfig) after following the steps in Option 4 below, consider Options 1 through 3; otherwise, uninstall WSS from the server, reinstall WSS, extract the contents of the KB using the steps provided in Option 3 below and install from the extracted STS.msp and following the remaining steps in Option 4 to start SPAdmin and complete configuration.

**UPDATE Oct. 16, 2007 13:15** I received information indicating you may also experience the attached error in your server farm to which Option # 4 resolves:

`The schema version (3.0.149.0) of the database WSS_Content_<databasename> on <databaseserver><instance> is not consistent with the expected database schema version (3.0.151.0) on <database>.  Connections to this database from this server have been blocked to avoid data loss.  Upgrade the web front end or the content database to ensure that these versions match.`

**UPDATE Oct. 23, 2007 14:52**

See below on steps to resolve The database WSS\_Content on HOMEMicrosoft##SSEE is not accessible to missing Windows Internal Database signatures.

**Option # 1** 

*   Start the Windows SharePoint Services Administration service using the Services applet (Start, Run, Services.msc) and run SharePoint Products and Technologies Configuration Wizard.

**Option # 2** 

*   Start the SPAdmin service under the context of a local administrator on the server where the SPAdmin service failed to start when running the SharePoint Products and Technologies Configuration Wizard (psconfig.exe) and run SharePoint Products and Technologies Configuration Wizard.

> `net start spadmin`

**Option # 3** 

*   Download wssv3-kb934525-fullfile-x86-glb.exe from [http://www.microsoft.com/downloads/details.aspx?familyid=76FC2225-2802-46E5-A294-A842E3841877&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=76FC2225-2802-46E5-A294-A842E3841877&displaylang=en).

> Extract wssv3-kb934525-fullfile-x86-glb.exe and run the installation by executing C:tempSTS.msp (see below).  
>   
> `<drive>:wssv3-kb934525-fullfile-x86-glb.exe /extract:c:temp.`

**Option # 4** 

*   On the machine where psconfig failed to start the SPAdmin service run:

> `%commonprogramfiles%Microsoft SharedWeb Server Extensions12BINpsconfig -cmd upgrade -inplace b2b -wait -force`

Modify the service timeout values in the Registry:

> `HKLMSYSTEMCurrentControlSetControl add/modify DWORD value ServicesPipeTimeout to 60000 (60 seconds)`  
>   
> `HKEY_LOCAL_MACHINESYSTEMCurrentControlSetControl add/modify STRING value WaitToKillServiceTimeout to 120000 (120 seconds)`

Restart the server machine.

**UPDATE Oct. 23, 2007 14:52**

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