---
title: 'Microsoft Windows Server 2008 as a Host Operating System for Microsoft Virtual Server 2005'
date: Wed, 02 Jul 2008 14:48:00 +0000
draft: false
tags: ['Windows Server 2008']
---

Suppose you would like to use Windows Server 2008 as your host operating system, but the system does not provide support for Hyper-V.  The good news is that Microsoft Virtual Server 2005 will install and run under Windows Server 2008 providing the following conditions are met (**including the Virtual Server Administration Web site**):  see notes [http://support.microsoft.com/kb/948515](http://support.microsoft.com/kb/948515 "http://support.microsoft.com/kb/948515").

1.  You need to run Virtual Server 2005 R2 SP1
2.  You must have KB948515 applied to enable Windows Server 2008 host operating system support ([http://www.microsoft.com/downloads/details.aspx?FamilyID=a79bcf9b-59f7-480b-a4b8-fb56f42e3348&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=a79bcf9b-59f7-480b-a4b8-fb56f42e3348&displaylang=en "http://www.microsoft.com/downloads/details.aspx?FamilyID=a79bcf9b-59f7-480b-a4b8-fb56f42e3348&displaylang=en"))
3.  Internet Information Services 7.0 is configured to support the Virtual Server Administration Web site

**Obtaining Virtual Server 2005 R2 Service Pack 1**

Microsoft Virtual Server 2005 R2 Service Pack 1 (SP1) QFE contains the latest software updates for Virtual Server 2005 R2 SP1.

Download Microsoft Virtual Server 2005 R2 Service Pack 1 - [http://technet.microsoft.com/en-us/evalcenter/bb738033.aspx](http://technet.microsoft.com/en-us/evalcenter/bb738033.aspx "http://technet.microsoft.com/en-us/evalcenter/bb738033.aspx")

Release notes for Virtual Server 2005 R2 Service Pack 1 - [http://technet2.microsoft.com/windowsserver/en/library/60009f7c-9a6b-472c-949a-4f047e791dd21033.mspx?mfr=true](http://technet2.microsoft.com/windowsserver/en/library/60009f7c-9a6b-472c-949a-4f047e791dd21033.mspx?mfr=true "http://technet2.microsoft.com/windowsserver/en/library/60009f7c-9a6b-472c-949a-4f047e791dd21033.mspx?mfr=true")

**Obtaining KB948515**

This update for Microsoft Virtual Server R2 SP1 includes support for the following additional Host and Guest Operating Systems

**Additional Guest Operating System support:**  
Windows Vista® Ultimate Edition with Service Pack 1 (SP1)  
Windows Vista® Business Edition with Service Pack 1 (SP1)  
Windows Vista® Enterprise Edition with Service Pack 1 (SP1)  
Windows Server® 2008 Core  
Windows Server® 2008 Standard  
Windows Server® 2008 Datacenter  
Windows Server® 2008 Enterprise  
Windows Server® 2008 Small Business Server  
Windows XP Professional with Service Pack 3

**Additional Host Operating System support:**  
Windows Vista® Ultimate Edition with Service Pack 1 (SP1) (non-production use only)  
Windows Vista® Business Edition with Service Pack 1 (SP1) (non-production use only)  
Windows Vista® Enterprise Edition with Service Pack 1 (SP1)(non-production use only)  
Windows Server® 2008 Core  
Windows Server® 2008 Standard  
Windows Server® 2008 Datacenter  
Windows Server® 2008 Enterprise  
Windows Server® 2008 Small Business Server  
Windows XP Professional with Service Pack 3 (non-production use only)

Download details:  Virtual Server 2005 R2 Service Pack 1 Update - [http://www.microsoft.com/downloads/details.aspx?FamilyID=a79bcf9b-59f7-480b-a4b8-fb56f42e3348&displaylang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=a79bcf9b-59f7-480b-a4b8-fb56f42e3348&displaylang=en "http://www.microsoft.com/downloads/details.aspx?FamilyID=a79bcf9b-59f7-480b-a4b8-fb56f42e3348&displaylang=en")

**Configuring Internet Information Services 7.0**

To enable the Virtual Server Administration Web site on Windows Server 2008, Internet Information Services 7.0 should be configured as provided in the steps below:

On the host machine click Start and select Server Manager.

Click Roles.

Click Add Roles (see illustration).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MicrosoftWindowsServer2008asaHostOperati_871A/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MicrosoftWindowsServer2008asaHostOperati_871A/image_2.png)

On the Add Roles Wizard click Next >.

Select Web Server (IIS) from the list of available Roles.  Click Add Required Features on the Add features required for Web Server (IIS) page if prompted and then click Next >.

Click Next > on the Web Server (IIS) page.

On the Select Role Services page select the checkbox labeled CGI under Application Development.

On the Select Role Services page select the checkbox labeled Windows Authentication under Security.

On the Select Role Services page select the checkbox labeled IIS 6 Metabase Compatibility under Management Tools | IIS 6 Manageability Compatibility.

Accept the remaining default values and click Next > on the Select Role Services page.

Click Install on the Confirm Installation Selections page.

Click Close on the Installation results page.

The Web Server Role Services should appear similar to those as provided in the illustration below:

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MicrosoftWindowsServer2008asaHostOperati_871A/image_thumb_1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MicrosoftWindowsServer2008asaHostOperati_871A/image_4.png)

**NOTES**

If presented with a 401.2 error when browsing the Virtual Server Web application, ensure Windows Authentication is enabled both at the Web server and Web site levels, if the error persists, enable Anonymous Authentication for the Web site.  Authentication models can be configured in the Internet Information Services (IIS) Manager.

The Virtual Server Administration Web site requires scripting to be enabled for navigation.  To enable scripting, either add the Virtual Server Administration Web site to the Trusted Sites zone or optionally disable Internet Explorer Enhanced Security Configuration.

To configure Virtual Server settings using the Virtual Server Administration Web site you must run Internet Explorer as an Administrator in Windows Server 2008.

In the event an access denied-type message is presented when browsing the Virtual Server Administration Web site after performing the previous steps, reinstall Microsoft Virtual Server 2005 R2 Service Pack 1 after configuring Internet Information Services 7.0 as specified above.