---
title: 'Scripting SharePoint with Powershell'
date: Fri, 17 Aug 2007 11:37:00 +0000
draft: false
tags: ['Windows Powershell']
---

C# has long been the developers preference when working with Microsoft SharePoint Products and Technologies; however, since the release of Microsoft Office SharePoint Server 2007/Windows SharePoint Server 3.0 Powershell has become more widely used to support the automation of common administrative tasks - though C# is and will long be integral in application development, Powershell provides both simplicity and flexibility for the automation of routine tasks.  For example, let's assume an administrator would like to programmatically provision a Web application outside of the SharePoint administration tool and/or the SharePoint 3.0 Central Administration user interface.

In this example (C#) you can reference the Microsoft.SharePoint.Administration Namespace and call the SPWebApplicationBuilder class to create a new SPWebApplication object.

static void Main(string\[\] args)  
{  
    SPWebApplicationBuilder pWebApp = new SPWebApplicationBuilder(SPFarm.Local);  
    int iPort = 80;  
    pWebApp.Port = iPort;  
    SPWebApplication WebApplication = pWebApp.Create();

    WebApplication.Provision();

    SPSite SiteCollection = WebApplication.Sites.Add("/", "contoso\\wbaer", "wbaer@contoso.com");

    SiteCollection.Close();  
}

Using Powershell, the underlying concept remains the same with reduction in overall code:

\[system.reflection.assembly\]::LoadWithPartialName("Microsoft.Sharepoint")  
$webAppBuilder=new-object Microsoft.SharePoint.Administration.SPWebApplicationBuilder( \[Microsoft.SharePoint.Administration.SPFarm\]::Local)  
$webAppBuilder.Port=80  
$webApp=$webAppBuilder.Create()  
$webApp.Provision()  
$webApp.Sites.Add("/","contosowbaer",[wbaer@contoso.com](mailto:wbaer@contoso.com))

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).

While Powershell does not provide specific out-of-the-box functionality for Microsoft SharePoint Products and Technologies as you can see from the example code above, the scripting possibilities are open through native access to .NET objects.  If you read an article, for example, [Powerful Command Line Administration for SharePoint](http://www.microsoft.com/technet/technetmag/issues/2007/01/CommandPrompt/default.aspx) in the January 2007 issue of TechNet Magazine you will immediately find areas where common administrative functions can be scripted with Powershell reducing the operational overhead associated with managing a Microsoft SharePoint Products and Technologies deployment.

**So what exactly is Powershell?**

Powershell is a command line shell and scripting language and as such provides the ability to accelerate automation through system administration utilities, consistent syntax, naming conventions, .NET and COM integration, etc.

**Where can I learn more about Powershell?**

[Windows Powershell Home](http://www.microsoft.com/windowsserver2003/technologies/management/powershell/default.mspx)

[Windows Powershell: Frequently Asked Questions](http://www.microsoft.com/windowsserver2003/technologies/management/powershell/faq.mspx)

[Windows Powershell Newsgroup](http://www.microsoft.com/communities/newsgroups/en-us/default.aspx?dg=microsoft.public.windows.powershell&cat=en_US_3750E87B-4971-4A5C-A537-45F5D7ABBECC&lang=en&cr=US)

[Windows Powershell Team Blog](http://blogs.msdn.com/powershell)

[Windows Powershell Quick Reference](http://www.microsoft.com/downloads/info.aspx?na=22&p=8&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=&u=%2fdownloads%2fdetails.aspx%3fFamilyID%3ddf8ed469-9007-401c-85e7-46649a32d0e0%26DisplayLang%3den)