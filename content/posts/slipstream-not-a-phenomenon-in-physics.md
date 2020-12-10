---
title: 'Slipstream, not a phenomenon in Physics'
date: Thu, 01 Nov 2007 10:03:44 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'Uncategorized', 'Windows SharePoint Services 3.0']
---

Slipstream is a common term used at Microsoft to define the merging of patches or updates into the original installation sources of a program.

What are the benefits of slipstreaming....

Creating a slipstream image reduces the operational overhead required to introduce a specific build of software to include Windows SharePoint Services 3.0 and/or Microsoft Office SharePoint Server 2007 into an environment.  For example, if an organization has standardized on a specific set of updates and/or patches that will be applied in a given configuration, these updates and/or patches can be included in the original installation sources and subsequently installed with the source application.  Slipstreaming a Windows SharePoint Services 3.0 and/or Microsoft Office SharePoint Server 2007 is a simple process providing you have access to the original and update sources...

Example (Windows SharePoint Services 3.0 + KB941422):

To install a specific Windows SharePoint Services 3.0 build such as 12.0.6039 which is the build number associated with KB941422:

1.  Download [Windows SharePoint Services 3.0](http://www.microsoft.com/downloads/details.aspx?familyid=D51730B5-48FC-4CA2-B454-8DC2CAF93951&displaylang=en) to C:TEMP on a Web front-end server
2.  Open a Command Prompt and navigate to C:TEMP
3.  Enter C:TEMPSharePoint.exe /extract:C:WSS and depress Enter
    
    [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image.png)
    
4.  The contents of SharePoint.exe will be extracted to C:WSS

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_1.png)

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_2.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_2.png)

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_3.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_3.png)

1.  Download Windows SharePoint Services 3.0 KB941422 to C:TEMP on a Web front-end server
2.  Open a Command Prompt and navigate to C:TEMP
3.  Enter C:TEMPwss-kb941422-fullfile-x64-glb.exe /extract:C:WSSUpdates and depress Enter
    
    [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_8.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_8.png)
    
4.  The contents of wss-kb941422-fullfile-x64-glb.exe will be extracted to C:WSSUpdates

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_5.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_5.png)

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_6.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_6.png)

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_thumb_7.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/SlipstreamnotaphenomenoninPhysics_52B2/image_7.png)

When setup.exe is executed from C:WSS, Windows SharePoint Services 3.0 (RTM - build 12.0.4518) will be installed and KB941422 applied during the installation process.  The end result is an installation of Windows SharePoint Services 3.0 build 12.0.6039 without the requirement of installing KB941422 separately and the requirement of running the SharePoint Products and Technologies Configuration Wizard to upgrade binaries on each server machine in the server farm.