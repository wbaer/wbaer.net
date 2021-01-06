---
title: 'Master Page Example'
date: Thu, 03 Jul 2008 15:29:00 +0000
draft: false
tags: ['Code Samples']
---

I used the sample master pages at [http://office.microsoft.com/en-us/sharepointdesigner/HA102223711033.aspx](http://office.microsoft.com/en-us/sharepointdesigner/HA102223711033.aspx) in several Feature Stapling/Receiver demonstrations over the past year and was asked if I could provide the solution package I compiled using the Clarity master page (see image) in conjunction with a Feature Receiver to update the master page on both site collections and Webs.  I've finally gotten around to uploading the .wsp, so for those interested it can be downloaded [here](https://wbaer.officeisp.net/Shared%20Documents/Clarity%20Master%20Page.wsp).

![](http://office.microsoft.com/global/images/default.aspx?AssetID=ZA102264171033)

**Usage:**

Copy the Clarity Master Page.wsp to a location on a Web front-end computer.

Open a Command Prompt and change directories to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.

Run STSADM -o addsolution -filename "<path>Clarity Master Page.wsp" and wait for the operation to complete.

Run STSADM -o deploysolution -name "Clarity Master Page.wsp" -immediate -force -allowGacDeployment and wait for the operation to complete.

Run STSADM -o execadmsvcjobs and wait for the operation to complete.

**NOTE** Existing site collections will not be affected and can be modified either through SPD or the SharePoint UI.

Newly created site collections **and** Webs will receive the Clarity master page.