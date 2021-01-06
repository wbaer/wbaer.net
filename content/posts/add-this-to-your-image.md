---
title: 'Add this to your image...'
date: Tue, 10 Jun 2008 23:58:00 +0000
draft: false
tags: ['Internet Information Services', 'Windows Server 2003', 'Windows Server 2008']
---

One of the most common configuration inconsistencies I find in SharePoint farms is the Web application path, in most scenarios the Web applications are provisioned under the default root path of C:InetpubwwwrootwssVirtualDirectories.  This is usually the result of oversight during the provisioning process. 

Windows SharePoint Services 3.0 provides a configuration field (see screenshot) that allows administrators to configure the path to the Web application host directory; however, in many cases, this setting is overlooked.  Unfortunately, once a Web application has been provisioned, the only reliable method of moving the Web application is to delete and recreate the Web application on the server farm.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/Addthistoyourimage_EA5C/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/Addthistoyourimage_EA5C/image_2.png)

Windows SharePoint Services 3.0 derives the directory information from the Web server registry setting at **HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftInetStpPathWWWRoot**, this path is subsequently appended with wssVirtualDirectories.   To ensure Web applications are provisioned on the proper disk volume, modify the Registry values later in this post on your Web front-end computers to reference the desired path.  This can be modified either prior to or after Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 has been installed; however, any pre-existing Web applications will not reflect the path change (see above).

A Microsoft Internet Information Services best practice is to avoid using the default path (c:inetpubwwwroot) and moving Web content to a non-system directory.  By configuring the WWWRoot default path it provides a safeguard for oversight and promotes consistency across Web servers.

Configure the WWWRoot Default Path (Windows Server 2003)

1.  Click **Start**, and then select **Run…**
2.  In the **Open** field enter **Regedit** and click **OK**.
3.  Locate the **HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftInetStp** key and modify the PathWWWRoot Value data to **D:Inetpubvroots**.
4.  Locate the **HKEY\_LOCAL\_MACHINESYSTEMControlSet001ControlContentIndexCatalogsWeb** key and modify the Location Value data to **d:inetpub**.
5.  Locate the **HKEY\_LOCAL\_MACHINESYSTEMControlSet003ControlContentIndexCatalogsWeb** key and modify the Location Value data to **d:inetpub**.
6.  Locate the **HKEY\_LOCAL\_MACHINESYSTEMCurrentControlSetControlContentIndexCatalogsWeb** key and modify the Location Value data to **d:inetpub**.
7.  Repeat steps 1 through 3 on each Web front-end and application server.

Strikes by recommendation of Todd Carter.  Thanks! 

Some of the Registry keys in the steps above may not be available on all Web servers depending on configuration and Operating System versions.  Always backup the registry before modifying any Registry settings.