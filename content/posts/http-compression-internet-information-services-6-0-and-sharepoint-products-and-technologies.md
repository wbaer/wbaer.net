---
title: 'HTTP Compression, Internet Information Services 6.0, and SharePoint Products and Technologies'
date: Wed, 30 Jan 2008 20:44:00 +0000
draft: false
tags: ['Performance']
---

A recent discussion on Garbage Collection management on 64-bit Web servers hosting Microsoft Office SharePoint Server 2007 led into a discussion on rendering performance, particularly steps to reduce overall rendering time at the client.  While monitoring client rendering can be achieved to some degree through measuring TTLB - purely in ensuring pages are served in a timely manner (see [ASP.NET Performance Monitoring, and When to Alert Administrators](http://msdn2.microsoft.com/en-us/library/ms972959.aspx) for monitoring recommendations), there are too many variables that can result in overall performance variations to include browser, hardware, machine state, etc.  The most commonly implemented measures to improve client-side performance are object and output caching natively within Microsoft Office SharePoint Server 2007; however, often overlooked as a performance improvement mechanism is HTTP compression in Internet Information Services 6.0.  This article describes the basic steps to enabling HTTP compression in Internet Information Services 6.0.

**Step 1 Enable Compression (Global)**

1.  Open a Command Prompt and run the following script: `cscript C:InetpubAdminScriptsadsutil.vbs set w3svc/filters/compression/parameters/HcDoStaticCompression true` to enable compression on all Web applications installed on the current server farm.  (See later in this article references to enabling compression on sites and site elements).

**Step 2 Specify File Extensions**

1.  Open a Command Prompt and run the following script: `cscript adsutil.vbs SET W3SVC/Filters/Compression/Deflate/HcFileExtensions "css js"` to enable static compression on the file extensions denoted within the "" string.  CSS (Cascading Stylesheets) and JS (JavaScript) will provide the most in respect to performance gains with SharePoint Products and Technologies, for example, see the attached image of the compressed files directory on a single page view.  **NOTE** The size and location of the compression directory for static compression can be configured through modifying the **HcCompressionDirectory**, **HcDoDiskSpaceLimiting**, and **HcMaxDiskSpaceUsed** metabase properties.  Always backup the IIS Metabase before making any changes, for additional information on backing up the IIS Metabase visit [http://www.microsoft.com/technet/serviceproviders/wbh4\_5/CMSU\_DR\_Run\_CONC\_Back\_Up\_IIS\_Metabase.mspx?mfr=true](http://www.microsoft.com/technet/serviceproviders/wbh4_5/CMSU_DR_Run_CONC_Back_Up_IIS_Metabase.mspx?mfr=true "http://www.microsoft.com/technet/serviceproviders/wbh4_5/CMSU_DR_Run_CONC_Back_Up_IIS_Metabase.mspx?mfr=true").

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/407635c7c244_E0AB/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/407635c7c244_E0AB/image_2.png)  
**The sample image assumes a single render of a Microsoft Office SharePoint Server 2007 Publishing Page**

**Step 3 Create a Web Service Extension**

Create a Web Service Extension referencing the gzip assembly for compression:

1.  Open Internet Information Services 6.0 Manager, expand the **<SERVER\_NAME> (local computer)** node and right-click the **Web Service Extensions** node.
2.  Select **Add a new Web service extension...** from the menu.
3.  Specify a descriptive name for your Web Service Extension, for example, Compression, IIS Compression, etc. in the **Extension name:** field.
4.  Click **Add...** under **Required files...** and a reference to **C:WINDOWSSystem32inetsrvgzip.dll**.
5.  Select the checkbox labeled **Set extension status to allowed** and click **OK** on the New Web Service Extension window.

**Step 4 Configure the IIS MetaBase**

1.  Open C:WINDOWSsystem32inetsrvMetaBase.xml in a text editor (Notepad)
2.  Locate the `<IISCompressionScheme>` element.
3.  Find the **HcScriptFileExtension** metabase property and add aspx and asmx to the existing list ensuring the entries conform to the existing format, next modify the **HcFileExtensions** metabase property to specify any additional files to be compressed aside from those configured in the previous steps through adsutil.vbs.  The **HcScriptFileExtension** metabase property specifies dynamic files to be compressed when HTTP compression is enabled whereas the **HcFileExtensions** metabase property specifies static files.  **NOTE** Changes should be applied to both the deflate and gzip compression schemes.
4.  Modify the **HcDynamicCompressionLevel** to a value between 0 and 10, 0 being low compression and 10 being maximum compression.  The **HcDynamicalCompressionLevel**

> **NOTE** You should consider testing the impact of varying compression levels in a laboratory environment closely monitoring CPU utilization and potential impact to your Web servers.  Typically a compression level between 7 and 9 provides optimum performance vs. CPU load in most circumstances.  If you are running IIS 7.0 see [http://msdn2.microsoft.com/en-us/library/bb386460(vs.85).aspx](http://msdn2.microsoft.com/en-us/library/bb386460(vs.85).aspx "http://msdn2.microsoft.com/en-us/library/bb386460(vs.85).aspx") for a description of IIS 6.0 to IIS 7.0 Metabase property mappings.
> 
> **Sample MetaBase.xml \[Snippet\]**
> 
> <IIsCompressionScheme Location\="**/LM/W3SVC/Filters/Compression/deflate**"  
>         HcCompressionDll\="**%windir%system32inetsrvgzip.dll**"  
>         HcCreateFlags\="**0**"  
>         HcDoDynamicCompression\="**TRUE**"  
>         HcDoOnDemandCompression\="**TRUE**"  
>         HcDoStaticCompression\="**FALSE**"  
>         HcDynamicCompressionLevel\="**9**"  
>         HcFileExtensions\="**htm  
>             html  
>             css  
>             js**"  
>         HcOnDemandCompLevel\="**10**"  
>         HcPriority\="**1**"  
>         HcScriptFileExtensions\="**asp  
>             exe**"  
> \>  
> </IIsCompressionScheme\>  
> <IIsCompressionScheme Location\="**/LM/W3SVC/Filters/Compression/gzip**"  
>         HcCompressionDll\="**%windir%system32inetsrvgzip.dll**"  
>         HcCreateFlags\="**1**"  
>         HcDoDynamicCompression\="**TRUE**"  
>         HcDoOnDemandCompression\="**TRUE**"  
>         HcDoStaticCompression\="**TRUE**"  
>         HcDynamicCompressionLevel\="**9**"  
>         HcFileExtensions\="**htm  
>             html  
>             css  
>             js**"  
>         HcOnDemandCompLevel\="**10**"  
>         HcPriority\="**1**"  
>         HcScriptFileExtensions\="**asp  
>             exe  
>             axd**"  
> \>  
> </IIsCompressionScheme\>

In the sample metabase snippet above both deflate and gzip are enabled, it is not recommended to disable one or the other due to potential for unintended consequences such as failure to compress responses to a particular browser, e.g. compatibility issues.  In some cases you may wish to enable compression at only the site or site element level as opposed to global application.  To disable compression open a Command Prompt and run the following script:  `cscript C:InetpubAdminScriptsadsutil.vbs set w3svc/filters/compression/parameters/HcDoStaticCompression false`.  To enable compression on sites or individual site elements see [http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/25d2170b-09c0-45fd-8da4-898cf9a7d568.mspx?mfr=true](http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/25d2170b-09c0-45fd-8da4-898cf9a7d568.mspx?mfr=true "http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/25d2170b-09c0-45fd-8da4-898cf9a7d568.mspx?mfr=true").

**Step 5 Restart the World Wide Web Publishing Service**

1.  Open a Command Prompt and enter `NET STOP W3SVC` and allow the World Wide Web Publishing Service to stop.  When the World Wide Web Publishing Service has stopped, enter `NET START W3SVC`.

To determine whether or not affordable gains were provided through enabling HTTP compression you should baseline server performance both prior to and following enabling of HTTP compression using the Processor% Processor Time and Network InterfaceBytes Sent/sec performance monitor counters.  Generally where the Processor% Processor Time value exceeds 80%, HTTP compression is not recommended.

Regardless on whether or not you elect to leverage HTTP compression the important takeaway from this conversation is that SharePoint Products and Technologies performance can be improved beyond the native concepts available to the platform such as Site Output and BLOB Caching which I am planning separate posts to provide prescriptive guidance on implementation.

**Resources**

[Enabling HTTP Compression (IIS 6.0)](http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/5bce429d-c4a7-4f9e-a619-5972497b932a.mspx?mfr=true)

[Using HTTP Compression for Faster Downloads (IIS 6.0)](http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/25d2170b-09c0-45fd-8da4-898cf9a7d568.mspx?mfr=true)

[Customizing the File Types IIS Compresses (IIS 6.0)](http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/5bce429d-c4a7-4f9e-a619-5972497b932a.mspx?mfr=true)

[Troubleshooting HTTP Compression in IIS 6.0](http://blogs.msdn.com/mike/archive/2007/12/06/troubleshooting-http-compression-in-iis6.aspx)