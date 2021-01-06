---
title: 'Availability of the Microsoft IT Site Delete Capture 1.0 Feature for SharePoint Products and Technologies'
date: Mon, 30 Apr 2007 18:14:00 +0000
draft: false
tags: ['Code Samples']
---

I'm pleased to announce the availability of the Microsoft IT Site Delete Capture 1.0 feature for **SharePoint Products and Technologies**.

The Microsoft IT Site Delete Capture feature 1.0 is a shared component library (DLL); by registering the Microsoft IT Site Delete Capture feature 1.0 shared component library in the Global assembly cache, **SharePoint Products and Technologies** administrators can intercept both site/web delete requests and archive the site/web to a resource local to the web front-end computer or UNC path before the site/web is removed the configuration and content databases. The Microsoft IT Site Delete Capture feature 1.0 also exposes functionality allowing **SharePoint Products and Technologies** administrators to send e-mail notification to the end-user indicating the site has been archived and deleted, additionally any failure in the event receiver will generate an e-mail message to the end-user indicating that the site/web has not been deleted. The message format, text, and language are stored in a flexible, culture-independent extensible markup language configuration file to support any localization requirement.

The Microsoft IT Site Delete Capture 1.0 will be a community driven effort and managed under CodePlex source control.  Discussion boards and bug management will be also provided by the CodePlex workspace.

To learn more about the Microsoft IT Site Delete Capture 1.0 feature visit [http://www.codeplex.com/governance](http://www.codeplex.com/governance).

The **SharePoint** Governance workspace is intended provide governance and manageability samples and tools designed to help IT Professionals management **SharePoint** Products and Technologies deployments.  Upcoming tools include an implementation of site/web lifecycle management based on the _Site Delete and Confirmation_ feature, the Microsoft IT Site Delete Capture 1.0 feature, and additional out-of-the-box functionality.  A sample auditing configuration solution deployment package will be introduced in the September-October timeframe that provides guidance on auditing and the management of content types across site collections.