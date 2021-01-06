---
title: 'Windows Rights Management Services, Microsoft SharePoint Products and Technologies, and Forest Boundaries'
date: Wed, 10 Jun 2009 13:40:24 +0000
draft: false
tags: ['Cross-Forest Hosting', 'Microsoft Office SharePoint Server 2007']
---

I recently was asked about the possibility of implementing Windows Rights Management Services with Microsoft Office SharePoint Server 2007 in a resource forest, or otherwise, the Microsoft Office SharePoint Server 2007 deployment was in a forest other than that where the users reside (login forest).  In this particular scenario, a one-way non-transitive trust was implemented, which provided an isolation boundary between the resource and login forest.

Microsoft Office SharePoint Server 2007 is generally supportive of the resource forest concept ([see posts tagged Cross-Forest Hosting](http://blogs.technet.com/wbaer/archive/tags/Cross-Forest+Hosting/default.aspx)) however, with the Windows Rights Management Services (RMS) cluster in a forest other than that of the resource forest, problems will surface in that SharePoint will need to obtain a RMS user certificate / RAC (from the /\_wmcs/certification pipeline) that is trusted by the RMS Licensing pipeline(s) configured in SharePoint 3.0 Central Administration – as a result there are two (2) requirements during the certification process that Microsoft Office SharePoint Server 2007 is unable to support when the RMS cluster resides outside of the resource forest:

1.  Authentication
2.  Boundaries

**Authentication**

Since Microsoft Office SharePoint Server 2007 is deployed in the resource forest, the identities associated with the individual IIS application pools are also most likely identities derived from the resource forest.  Those identities are not valid in the login forest because the one way trust is the wrong way in this particular scenario.

**Boundaries**

The RMS certification service can only issues certificates to identities from the same forest as the RMS cluster.

**Possible Solutions**

Deploy an RMS certification cluster in the resource forest and configure the RMS server in the login forest to trust the user certificates issues from this server or optionally (haven’t tested this theory ;-)), implement identities for the IIS application pools from the login forest.

The result of an implementation that does not meet the requirements of RMS will be presented in the Event Log on the front-end Web servers as:

Event Type:        Error

Event Source:    Windows SharePoint Services 3

Event Category:                IRM

Event ID:              5058

Date:                     6/10/2009

Time:                     8:47:07 PM

User:                     N/A

Computer:          <WFE\_SERVER>

Description:

Information Rights Management (IRM): There was a problem while trying to activate a rights account certificate.

Unspecified connection error. Try activating again later.

Additional Data

Error value: 8004cf3b

Server URL: [/\_wmcs/certification">/\_wmcs/certification">/\_wmcs/certification">https://<RMS\_CLUSTER>/\_wmcs/certification](https://<RMS_CLUSTER>/_wmcs/certification)

Event Type:        Error

Event Source:    Windows SharePoint Services 3

Event Category:                IRM

Event ID:              5133

Date:                     6/10/2009

Time:                     8:47:07 PM

User:                     N/A

Computer:          <SERVER>

Description:

Information Rights Management (IRM): There was a problem while obtaining a Rights Management Services (RMS) group identity certificate (GIC).

A GIC is an essential credential that allows a user to read/view rights protected documents.

Additional Data

Error value: 8004cf3b