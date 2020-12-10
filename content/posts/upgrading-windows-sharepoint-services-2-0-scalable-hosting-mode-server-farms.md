---
title: 'Upgrading Windows SharePoint Services 2.0 Scalable Hosting Mode Server Farms'
date: Sat, 31 Mar 2007 21:26:00 +0000
draft: false
tags: ['Migration &amp; Upgrade', 'SharePoint', 'Upgrade &amp; Migration']
---

In **Windows SharePoint Services 3.0** host header-based Site Collections can coexist with path-based site collections within a Web Application or optionally reside on multiple Web Applications.  Gradual, in-place, and database migration upgrade approaches can be applied to **Windows SharePoint Services 2.0** server farms in scalable hosting mode.  This differs from **Windows SharePoint Services 2.0** where a server farm was configured to run in scalable hosting mode preventing the introduction of path-based Site Collections to the server farm.

**Step 1  
**Install **Windows SharePoint Services 3.0** and run the **SharePoint Products and Technologies** Configuration Wizard.  See the **Windows SharePoint Services 3.0** Technical Library article Install **Windows SharePoint Services 3.0** and run the **SharePoint Products and Technologies** configuration wizard at [http://technet2.microsoft.com/windowsserver/WSS/en/library/b9490b1a-45de-45fd-9f4c-754dab1383e61033.mspx?mfr=true](http://technet2.microsoft.com/windowsserver/WSS/en/library/b9490b1a-45de-45fd-9f4c-754dab1383e61033.mspx?mfr=true) for detailed installation and deployement instructions.

NOTE If introducting the **Windows SharePoint Services 2.0** scalable hosting mode content databases to an existing server farm, proceed to **Step 3**.

**Step 2**  
Create a Web Application to host **Windows SharePoint Services 2.0** content.

**Step 3**  
Set the host header property on the **Windows SharePoint Services 3.0** server farm by running:

> `STSADM -o setproperty -pn v2usedhostheadermode -pv true`

Errors in the upgrade log such as the example below are indicative of the property not being set on the upgrade server farm.

`[RemoveFullUrlFromSitesTable] [3.0.38.0] [DEBUG] [3/30/2007 4:52:46 PM]: The v2 host header mode property could not be found.  This suggests that a v2 backup is being added to a newly-created v3 farm.  Since we cannot conclusively tell if this is from a v2 host header configuration, we assume that it was not.If this assumption is incorrect, run "stsadm -o setproperty -pn V2UsedHostHeaderMode -pv true", detach this database, and reattach the v2 backup. `

**Step 4  
**Add the **Windows SharePoint Services 2.0** content database to the Web Application using the addcontentdb operation.  See the **Windows SharePoint Services 3.0** Technical Library chapter Deploy a new farm, the migrate database (**Windows SharePoint Services**) at [http://technet2.microsoft.com/windowsserver/WSS/en/library/b9490b1a-45de-45fd-9f4c-754dab1383e61033.mspx?mfr=true](http://technet2.microsoft.com/windowsserver/WSS/en/library/b9490b1a-45de-45fd-9f4c-754dab1383e61033.mspx?mfr=true) for detailed instructions.

> `STSADM -o addcontentdb -url [http://webapplication/](http://webapplication/) -databaseserver databaseserver -databasename databasename`

**Step 5  
**Reset the host header property on the **Windows SharePoint Services 3.0** server farm.

> `STSADM -o setproperty -pn v2usedhostheadermode -pv false`

Host header mode in **Windows SharePoint Services 3.0** provides administrators a number of options when working with existing Site Collections on a Web Application, to backup, restore, and/or create a site collection as a host header-based site collection use the STSADM samples below:

Backup a path-based **Windows SharePoint Services 3.0** site collection using the command-line

> `STSADM –o backup –url [http://server/sites/sitecollection](http://server/sites/sitecollection) -filename E:backupfile.bak`

Backup a host header-based **Windows SharePoint Services 3.0** site collection using the command-line

> `STSADM –o backup –url [http://hostheadersitecollection/](http://hostheadersitecollection/) -filename E:backupfile.bak`

Restore a path-based site collection as host header-based site collection using the command-line

> `STSADM -o restore -url [http://hostheadersitecollection/](http://hostheadersitecollection/) -filename E:backupfile.bak -  
> hostheaderwebapplicationurl [http://webapplication/](http://webapplication/) –overwrite`

Create a **Windows SharePoint Services 3.0** host header-based site collection using the command-line

> `STSADM -o createsite -url [http://hostheadersitecollection/](http://hostheadersitecollection/) -ownerlogin <domain><username> -  
> owneremail <email address> -hhurl [http://webapplication/](http://webapplication/)`