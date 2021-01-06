---
title: 'Configuring SharePoint Products and Technologies for Cross-Forest Deployments'
date: Wed, 21 Feb 2007 17:22:00 +0000
draft: false
tags: ['Cross-Forest Hosting']
---

![](https://wbaer.officeisp.net/TechNet/pPicker.png)

People Picker works both cross-domain and cross-forest in one and two way trust environments.

People Picker will issue queries to all two-way trusted domains and two-way trusted forests to search People & Groups out-of-the-box. \*People Picker uses the Windows SharePoint Services Web Application logon identity to access the target domain/forest.  If the Web Application pool does not have access to the target domain/forest, People Picker will need to be configured to use an account with access to the target domain/forest using the following STSADM operations:

> `STSADM –o setapppassword –password <password>`

which establishes the Credential Key used to encrypt/decrypt the service logon identity in the configuration database. This must be configured identically on all servers that have the Windows SharePoint Services Web Application service configured.

**NOTE** This operation not required in scenarios where the target domain/forest is trusted. Each server farm should use a unique credential key.

> `STSADM.exe –o setproperty –pn peoplepicker-searchadforests –pv <domain(s)/forests(s)> -url http://<webapp>`

The format of

> `<domain(s)/forests(s)>`

is a list of

> `forest:DnsName,LoginName,Password`

or

> `domain:DnsName,LoginName,Password`

separated by a semicolon where necessary in scenarios where the target forest/domain is trusted, People Picker can be configured using

> `forest:DnsName`

or

> `domain:DnsName`