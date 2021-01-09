---
title: 'Ghosts in the Machine?'
date: Fri, 10 Aug 2007 16:13:00 +0000
draft: false
tags: ['Application Templates', 'Code Samples', 'Performance', 'PRESCAN', 'Upgrade &amp; Migration']
---

Ghosted and unghosted pages are references not new to Microsoft Office SharePoint Server 2007, but have received increased interest as a result of their impact on upgrading from previous versions and more recently, the ability to manage pages in an unghosted state.

**Introduction**

_Ghosted_ is the preferred state of pages in a site collection, ghosted pages refer to site definition files cached in memory on the server at process startup of IIS.  By caching site definition files in memory performance and scalability are improved by reducing data storage and retrieval requirements.  Ghosted pages can be reused as a result across one or many site collections on the Web application.

_Unghosted_ pages are most commonly the result of customization through Microsoft FrontPage and/or Microsoft Office SharePoint Designer and are stored in the corresponding content database.  The contents of unghosted pages are routed through safe mode parsing in ASP.NET, which prevents server-side code from executing, and which depends entirely on the Safe Controls list specified in the web.config file of the wwwroot directory to determine which controls can be rendered at run time.  When upgrading unghosted pages in SharePoint Portal Server 2003 and or Windows SharePoint Services 2.0, some functionality is lost until the page is reset to its site definition (ghosted) and can include security trimming, navigation (Site Actions), Recycle Bin, and other core Microsoft Office SharePoint Server 2007 functionality.  The performance penalty of unghosted pages in Microsoft Office SharePoint Server 2007 is less evident when compared to previous versions due to enhancements in the .NET 2.0 runtime.

**So how do pages become unghosted?**

In most cases an unghosted page is the result of customization through Microsoft FrontPage and/or Microsoft Office SharePoint Designer 2007 - browser based modifications such as the manipulation of Web Parts will not cause the page to be unghosted.  In a change over Microsoft FrontPage, Microsoft Office SharePoint Designer users are presented with a prompt to indicate the page they are working with will no longer be associated with its specified site definition (see illustration).

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image0_thumb2.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image04.png)

**Reghosting**

In many cases users can resolve minor customizations through resetting the page to its site definition through both the Windows SharePoint Services 3.0 user interface and Microsoft Office SharePoint Designer; however, changes made within Web Part Zones will be retained after synchronizing the page with its site definition.  \[Site Settings | Look and Feel | Reset to site definition\]. 

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image0_thumb1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image03.png)

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image0_thumb3.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image07.png)

In some circumstances a page cannot be reghosted, for example if the page was not based on an existing page, was created from a blank page, imported from another application or editor or (most commonly) was associated with a site definition no longer available to the server farm - this can occur if a site definition was retired or a database migration approach was implemented and the upgrade definition not made available to the target server farm.  In many cases you can simply copy a known good <page>.aspx from an alternate location and retrofit it to restore functionality.

**C#**

Reghosting can be also accomplished through by a server farm administration calling the RevertAllDocumentContentStreams method of the Microsoft.SharePoint namespace on each SPWeb object.

Sample Code

```
        static void Main(string\[\] args)
        {
            string siteUrl = "";
            SPSite Site = new SPSite(siteUrl);
            foreach (SPWeb Web in Site.AllWebs)
            {
                Web.RevertAllDocumentContentStreams();
            }
        }
```

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).

**Microsoft Office SharePoint Designer 2007**

1.  In Office SharePoint Designer 2007, open the Web site where the customized page resides.
2.  Right-click the page that you want to reset to the site definition, and then click **Reset to Site Definition** on the shortcut menu.

**NOTE** A copy of the customized page is placed in the same directory where the reset page resides and is named _file name_\_copy(1), where _file name_ is the original file name - when reghosting a page through the Windows SharePoint Services 3.0 user interface a backup copy of the page is **not** created.

> **MasterPages**
> 
> If the customization was implemented on a MasterPage, the MasterPage and attached pages can be reset to their site definition through Microsoft Office SharePoint Designer 2007:
> 
> In Office SharePoint Designer 2007, open the Web site where the customized master page resides.
> 
> 1.  Right-click the master page that you want to reset, such as **default.master**, and then click **Reset to Site Definition** on the shortcut menu.
>     
>     **Note **  By default, in the **Folder List**, master pages are located in the **masterpages** folder, which is in the **\_catalogs** folder in the site.
>     
>     A warning message informs you that the master page's contents will be overwritten, but that a backup copy of the current page will be created.
>     
> 2.  Click **Yes**.

**Ghosted Pages and Upgrade**

Ghosted pages, though, in many cases can be upgraded safely depending on the extent of their customization (see introduction for caveats) should be considered for reghosting at the time they are upgraded.  The gradual upgrade approach allows administrators to reghost (reset to site definition) pages during the upgrade process and enables the reghosting of pages at a more granular level.  Reghosting in a gradual approach can be applied through the Upgrade user interface or optionally using the STSADM -o command line argument -Reghost in the upgrade operation, for example STSADM -o upgrade -sidebyside -url [http://www.contoso.com](http://www.contoso.com/) -sitelistpath <pathtoxml> -reghost.  This granularity allows you to decide where you would like to reghost and what customizations should be retained during the upgrade.  The database migration approach and inplace approaches both permit the upgrade of unghosted pages preserving the customizations; however, these pages will be upgraded in their existing state and will need to be reghosted post-upgrade to enable Microsoft Office SharePoint Server 2007 functionality.

**Locating Unghosted Pages**

Now that we understand ghosted vs. unghosted pages and their implication on upgrade, how do we determine where unghosted pages exist?

**PRESCAN**

**PRESCAN**.EXE has two primary purposes:

1.  It parses and saves List definitions with the associated Lists.  **SharePoint Portal Server 2003** Service Pack 2 already incorporates this feature whenever a list is modified; however, this process should be completed for all Lists, so prescan calls the **SharePoint Portal Server 2003** Service Pack 2 method to persist that data.
2.  **PRESCAN**.EXE will report on common issues that will result in a failed upgrade; therefore, running **PRESCAN**.EXE, addressing reported issues, and resolving those issues, and re-running **PRESCAN**.EXE to verify those fixes is a best practice when planning a **Microsoft Office SharePoint Server 2007**/**Windows SharePoint Services** 3.0  upgrade.  The most commonly detected issues are:
    *   **Database Orphans** This is a class of issue where an object exists, but the pointer with the parent object is broken and/or corrupt.   Classic examples include situations where a site exists in the content database; however, does not exist in the configuration database and a web that points to a site collection that no longer exists. 
    *   **Missing Site Definitions** This issue is rare at best ad exists when a site collection has been removed/deleted - sites under this classification will not be upgraded and in addition those sites will not render in **SharePoint Portal Server 2003**/**Windows SharePoint Services** 2.0.

**PRESCAN** can be used to identify custom Site Definitions, FrontPage customizations, Web Parts, etc.

PRESCAN.EXE will report and summarize any unghosted pages occurring in your environment (see illustrations).

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image0_thumb31.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image071.png)

The example above illustrates unghosted pages discovered by PRESCAN.EXE and reported in the application log file.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image0_thumb11.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/GhostsintheMachine_88BA/image031.png)

The example above illustrates a summary of unghosted pages.

**SQL**

Alternatively SQL can be leveraged (**not recommended on production databases**) to generate a report of unghosted pages in your content databases (see example).

> **SELECT**
> 
> **     Docs.DirName,**
> 
> **     Docs.LeafName**
> 
> **FROM** **Docs** **WHERE**
> 
> **     (Docs.Type = 0)**
> 
> **AND**
> 
> **(Docs.SetupPath IS NOT NULL)** **AND**
> 
> **     (dbo.Docs.DocFlags & 64 = 64)**

**Microsoft Office SharePoint Designer 2007**

You can also run a report in Office SharePoint Designer 2007 to list all of the customized pages in your site.

1.  In Office SharePoint Designer 2007, open the Web site for which you want to run the report.
2.  On the **Site** menu, point to **Reports**, point to **Shared Content**, and then click **Customized Pages**.
    
    The report opens with all pages in the site listed, and the **Customized** column indicates whether content has been customized for that page.
    
3.  To display only pages that have been customized, click the down arrow to the right of the **Customized** column, and then click **Yes**.
    
    The report now displays only pages that have been customized.
    

**Additional Resources**

[Joel Oleson's To Ghost or Not to Ghost, That is the Question](http://blogs.msdn.com/joelo/archive/2007/05/07/to-unghost-or-not-unghost-that-is-the-question.aspx)

[MSDN - Custom Site Defintiions](http://msdn2.microsoft.com/en-us/library/Aa978512.aspx)

[Microsoft.com - SharePoint Application Templates](http://sharepoint.microsoft.com/sharepoint/templates/default.aspx)

[This Blog - PRESCAN](http://blogs.technet.com/wbaer/archive/tags/PRESCAN/default.aspx)

[Microsoft.com - Upgrade Considerations for Customized Sites](http://office.microsoft.com/en-us/sharepointdesigner/HA101741391033.aspx)

[Technet - Determine How to Handle Customizations](http://technet2.microsoft.com/windowsserver/WSS/en/library/443d17f5-1085-4b7b-93ca-4e5dae335f761033.mspx)