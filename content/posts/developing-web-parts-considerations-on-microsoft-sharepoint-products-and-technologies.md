---
title: 'Developing Web Parts, considerations on Microsoft SharePoint Products and Technologies'
date: Tue, 08 Jul 2008 12:24:15 +0000
draft: false
tags: ['Code Samples']
---

**Background Information**

Web Parts as defined by MSDN are an integrated set of controls for creating Web sites that enable end-users to modify the content, appearance, and behavior of Web pages in a browser.

In Windows SharePoint Services 3.0 Web Parts ultimately derive from the [ASP.WebPart](http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.webparts.webpart.aspx) (System.Web.UI.WebControls.WebParts) base class; however, Windows SharePoint Services 3.0 also has a Web Part base class (Microsoft.SharePoint.WebPartPages.WebPart) derived from the ASP.WebPart class.  If you are developing Web Parts you can elect to derive from either the Asp.WebPart or WSS.WebPart; however you should carefully consider your approach before developing custom Web Parts for use with Windows SharePoint Services 3.0.  To help define the differences, we'll examine each class and their respective pros and cons.

**ASP.NET Web Parts**

When deriving from the ASP.WebPart your Web Part derives directly from the ASP.WebPart class which does not have a dependency on Windows SharePoint Services 3.0 code so it can be used in both ASP.NET Web sites or a Windows SharePoint Services 3.0 site collection/Web.  To ensure the Web Part customization is sustainable you should consider using the ASP.WebParts.  ASP.WebParts are exportable using the .webpart extension, can be displayed in SPD using attribute markup and are persisted to the Windows SharePoint Services store in binary Web Part format.

**Hybrid (ASP.NET 2.0 + Windows SharePoint Services Web Parts)**

Hybrid Web Parts typically derive from the Wss.WebPart base class; however, adhere to the design guidelines for ASP.WebParts though the dependency on WSS.WebPart implies its use strictly in a Windows SharePoint Services 3.0 site collection/Web.  Hybrid Web Parts should be considered only where features provided in the WSS.WebParts class are required, for example, client-side connections.  Hybrid Web Parts can also be used in version to version upgrades where the existing legacy hybrid Web Part cannot be retired in favor of a ASP.WebPart.  Hybrid Web Parts are exportable using the .webpart extension, can be displayed in SPD using attribute markup and are persisted to the Windows SharePoint Services store in binary Web Part format.

**Windows SharePoint Services Web Parts**

WSS Web Parts derive from the WSS.Web Part base class and meet the guidelines as provided by the Windows SharePoint Services 2.0 Web Part design guidelines.  The WSS.WebPart class is obsolete and is retained solely for backwards compatibility.  Wss.WebParts are exportable using the .dwp extension, can be displayed in SPD using XML Markup and are persisted to the WSS store in a compressed XML format.

The bottom line is, if you are considering developing custom Web Parts you should consider deriving from the System.Web.UI.WebControls.WebParts.WebPart class and referencing the MSDN guidance on developing ASP.NET Web Parts to ensure the Web Parts to maximize interoperability and sustainability.

**Resources**

Working with ASP.NET 2.0 Web Parts and Windows SharePoint Services 3.0

[http://msdn.microsoft.com/en-us/library/bb153523.aspx](http://msdn.microsoft.com/en-us/library/bb153523.aspx "http://msdn.microsoft.com/en-us/library/bb153523.aspx")

Discover Significant Developer Improvements in SharePoint Services (Integration with ASP.NET 2.0 Web Parts)

[http://msdn.microsoft.com/en-us/magazine/cc163578.aspx](http://msdn.microsoft.com/en-us/magazine/cc163578.aspx "http://msdn.microsoft.com/en-us/magazine/cc163578.aspx")

Use Windows SharePoint Services as a Platform for Building Collaborative Apps, Part 2

[http://msdn.microsoft.com/en-us/magazine/cc188713.aspx](http://msdn.microsoft.com/en-us/magazine/cc188713.aspx "http://msdn.microsoft.com/en-us/magazine/cc188713.aspx")

Windows SharePoint Services Developer Center

[http://msdn.microsoft.com/en-us/sharepoint/default.aspx](http://msdn.microsoft.com/en-us/sharepoint/default.aspx "http://msdn.microsoft.com/en-us/sharepoint/default.aspx")

Developing Web Parts (Developer Center)

[http://www.microsoft.com/click/SharePointDeveloper/](http://www.microsoft.com/click/SharePointDeveloper/)

Windows SharePoint Services Version Comparison

[http://office.microsoft.com/en-us/sharepointtechnology/FX101862291033.aspx?ofcresset=1&mode=print](http://office.microsoft.com/en-us/sharepointtechnology/FX101862291033.aspx?ofcresset=1&mode=print "http://office.microsoft.com/en-us/sharepointtechnology/FX101862291033.aspx?ofcresset=1&mode=print")