---
title: 'Document Encryption in SharePoint Portal Server'
date: Tue, 09 May 2006 15:18:00 +0000
draft: false
tags: ['SharePoint Portal Server 2003']
---

**Does SharePoint Portal Server support document encryption?**

**SharePoint Portal Server 2003**/**Microsoft Office SharePoint Server 2007** can be configured to leverage **Rights Managenent Service** (RMS) which allows for the encryption of documents through RMS policy each time a document is requested from a Document Library, the RMS policy will be applied to documents whether they are requested through the **Office** client, WebDav or FrontPage - RPC.

\* While **SQL Server 2005** supports certificate-based encryption within the store, encryption will have to be manually implemented through stored procedures using the new **SQL Server 2005** TSQL support and technologies for certificate management and encryption.  As a result, a **SharePoint Portal Server** implementation of these technologies is not supported.

**Are encrypted documents indexed?**

**Windows** RMS will provide the capability to envelope e-mail and **Office** Documents that provide limitations as to what actions a user can perform against that file through **Information Rights Management** (IRM) in **Microsoft Office 2003** in addition to adding the capacity to add document expiration, check-in limitations, and more. For additional information surrounding IRM I recommed visiting: [http://office.microsoft.com/en-gb/assistance/HA011401841033.aspx](http://office.microsoft.com/en-gb/assistance/HA011401841033.aspx). In **Microsoft Office SharePoint Server 2007** server integration with RMS and integration with other RMS systems permits policies set on Document Libraries to apply to files that have left the site; with this in mind, the immediate benefit results in the content within the Document Library to be indexed by **Microsoft Office SharePoint Server 2007**.

Before you can leverage RMS and IRM you must deploy an RMS system in your environment; for additional information on planning and deployment of an RMS system, visit [http://technet2.microsoft.com/windowsserver/en/technologies/featured/rms/default.mspx](http://technet2.microsoft.com/windowsserver/en/technologies/featured/rms/default.mspx).