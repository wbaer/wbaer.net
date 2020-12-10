---
title: 'Windows SharePoint Services 3.0 Security Updates Version(s) Explained'
date: Tue, 23 Oct 2007 15:43:00 +0000
draft: false
tags: ['Uncategorized', 'Windows SharePoint Services 3.0']
---

I was recently asked by one of our Premier Field Engineers in Charlotte, NC about the versioning information displayed in SharePoint 3.0 Central Administration after installing recent Windows SharePoint Services 3.0 security updates and decided it would be beneficial to expand the audience for others seeking an answer to this question.

**Question**:

_In relation to the October patches for MOSS/WSS – should the database version show up correctly in CA? or is it expected that it would should up like this:_

_In CA – Operations -> Servers in Farm  
All FE’s and App’s show up as 12.0.0.6039  
But the cluster running the WSS Database shows 12.0.0.4518?_

_I checked a content DB and the versions table shows 12.0.0.6039..._

**Answer**: 

Although WSS shows as build 12.0.0.6040 you will see it display 12.0.0.6039 in Site Settings since the EULA changed in 6040 which did not make any binary changes from 12.0.0.6039 to 12.0.0.6040.    Your Windows SharePoint Services Database in the Central Administration user interface will reflect the RTM build version 12.0.0.4518 since a binary change does not occur on the backend.