---
title: 'Co-hosting Collaboration and Personal Site Collections within an Individual Web Application'
date: Mon, 19 Feb 2007 12:03:00 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'Upgrade &amp; Migration', 'Windows SharePoint Services 2.0']
---

One of the most common questions I receive is how to co-host traditional "team" and personal Site Collections (My Sites) within an individual Web Application in **Microsoft Office SharePoint Server 2007**. While possible, there are several important steps that you should be aware of.

The public profile page is a document specific to the SPSMSITEHOST site template (My Site Host); unless a My Site Host is defined in the server farm, public profile pages will not be available to users. A Web Application can have only one (1) root Site Collection, and as a result can host only one (1) site template. In a portal specific scenario, an Enterprise site template is generally applied to the root Site Collection, typically the Publishing or Collaboration portal. To ensure the public profile page is made available to the root Site Collection, it becomes necessary to establish a web under the root Site Collection that will host the My Site Host site template. In order to achieve this you will need to create a new web at http://<server>/<web> that will host the My Site Host site template containing person.aspx. Person.aspx is hosted in the %commonprogramfiles%Microsoft SharedWeb Server Extensions12TEMPLATESiteTemplatesSPSMSITEHOST directory.

There are several considerations that apply to this scenario:

· The SPSMSITEHOST template must be applied to the web hosting the public profile page.

· The web hosting the My Site Host site template cannot use an existing managed path, e.g. /personal or /sites.

· The Shared Services Provider (SSP) should be configured to use the root Site Collection + My Site Host web as the My Site Host. This can be configured under Shared Services Administration | User Profiles and My Sites | My Site settings | Personal Site Services.

· The root web application should have the managed path /personal defined in Central Administration to maintain URL differentiation between traditional "team" and personal Site Collections.

This process will permit continuation of the typical **SharePoint Portal Server 2003** configuration and Site Collection hosting model with one key difference:

· Personal Site Collections will be available to users through http://<server>/<user>.

· Public profile pages will be rendered to users through http://<server>/<public>?person.aspx?guid=<guid>.

The example scenario below illustrates a database migration approach upgrade where a root web application is selected as both the traditional "team" and personal Site Collection host:

**Step 1 Upgrade the \_SITE database using the database migration approach. See command line reference below:**

> `
> 
> STSADM -o -addcontentdb -url http://<rootwebapplication> -databaserver <SQLServer> -databasename <portal>_SITE
> 
> `

**Step 2 Upgrade the database hosting the personal site collections using the database migration approach. See command line reference below:**

> `
> 
> STSADM -o -addcontentdb -url http://<rootwebapplication>/personal databaserver <server> -databasename <personalsitesdb>
> 
> `

**Step 3 Create a new web under the root Web Application (http://<rootwebapplication>) using the My Site Host template. See command line reference below:**

> `
> 
> STSADM -o createweb -url http://<rootwebapplication>/public -template SPSMSITEHOST -title "Home" -description "Some Description"
> 
> `

**Step 4 Introduce the managed path /personal to the root Web Application if it does not already exist.**

**Step 5 Upgrade the \_PROF database using the database migration method. See command line reference below:**

> `
> 
> STSADM -o restoressp -title <ssptitle> -url http://<sspwebapplication> -ssplogin <domainusername> -mysiteurl http://<rootwebapplication>/public -indexserver <indexserver> -indexlocation "D:Program FilesMicrosoft Office Servers12.0DataOffice ServerApplications" -keepindex -sspdatabaseserver <databaseserver> -sspdatabasename <sspdatabasename> -ssppassword <password>
> 
> `

This process is beneficial to the database migration upgrade approach in scenarios where you are upgrading the **SharePoint Portal Server 2003** \_SITE, profile and content databases or optionally select to establish a new SSP in your server farm. If selecting to establish a new SSP; the root web application can be created prior to creating the SSP allowing for the establishment of the new root Site Collection as the My Site Host during the SSP creation.