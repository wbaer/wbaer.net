---
title: 'Windows PowerShell Command Builder 2.0'
date: Mon, 12 Nov 2012 20:56:03 +0000
draft: false
tags: ['SharePoint', 'SharePoint Server 2010', 'SharePoint Server 2013', 'SPC219', 'Windows Powershell']
---

A new updated version of the Windows PowerShell Command Builder is now available.

The Windows PowerShell Command Builder for Microsoft SharePoint 2010, Microsoft SharePoint 2013, SharePoint Online, and Microsoft Office 365 is an HTML 5 application that is designed to help IT professionals and power users learn how to use Windows PowerShell for administrative tasks.  The Windows PowerShell Command Builder enables IT professionals and power users to visually assemble commands related to SharePoint 2010, SharePoint 2013, SharePoint Online, and Office 365 in the browser and take those commands to their respective products. 

The new HTML5-based Windows PowerShell Command Builder can be accessed at [http://technet.microsoft.com/en-us/sharepoint/jj672838.aspx](http://technet.microsoft.com/en-us/sharepoint/jj672838.aspx "http://technet.microsoft.com/en-us/sharepoint/jj672838.aspx") and provides many of the same capabilities as the previous Silverlight version such as offline access.  In addition to providing support for SharePoint Server 2010, SharePoint Foundation 2010, and Office 365, this version also introduces support for SharePoint Server 2013, SharePoint Foundation 2013, and SharePoint Online.

To learn more about the Windows PowerShell Command Builder read the [Windows PowerShell Command Builder Getting Started Guide](http://www.microsoft.com/download/en/details.aspx?id=27588).  To begin using the Windows PowerShell Command Builder see [SharePoint Server 2010 - Windows PowerShell TechNet](http://technet.microsoft.com/en-us/sharepoint/ff603532).

**NOTE**

The Windows PowerShell Command Builder constructs commands that can be used with SharePoint Foundation 2010, SharePoint Server 2010, SharePoint Foundation 2013, SharePoint Server 2013, SharePoint Online, and Office 365.

[SharePoint 2010 System Requirements](http://technet.microsoft.com/en-us/library/cc262749.aspx)

[SharePoint 2013 System Requirements](http://technet.microsoft.com/en-us/library/cc262485(v=office.15))

[Office 365 System Requirements](http://go.microsoft.com/fwlink/p/?LinkId=229662)

About Windows PowerShell

Windows PowerShell is a task-based command-line shell and scripting language that is designed especially for system administration. Built on the .NET Framework, Windows PowerShell helps IT professionals and power users control and automate the administration of the Windows operating system and applications that run on Windows, such as SharePoint.

#### **Windows PowerShell Names**

Windows PowerShell uses a "verb-noun" naming system, where each cmdlet name consists of a standard verb that is hyphenated with a specific noun.

**Verbs**

Windows PowerShell uses the term _verb_ to describe a word that implies an action even if that word is not a standard verb in the English language. For example, the term _New_ is a valid Windows PowerShell verb name because it implies an action even though it is not a verb in the English language.

Common verbs that are used within the Windows PowerShell profile for SharePoint 2010, SharePoint 2013, SharePoint Online, and Office 365 include:

*   Get
*   Set
*   Add
*   Remove
*   New

##### **Nouns**

Nouns are very much like nouns in any language. They describe specific types of objects that are important in system administration. Nouns generally describe what a command acts upon. It is easy to demonstrate how these two-part names make it easy to learn how to use Windows PowerShell by looking at a few examples of verbs and nouns.

**Verb**

**Noun**

**Cmdlet**

**Get**

SPSite

Get-SPSite

**Add**

SPUser

Add-SPUser

The Windows PowerShell Command Builder provides access to some of the most commonly used routine verb-noun combinations with SharePoint 2010, SharePoint 2013, SharePoint Online, and Office 365. Additional verbs and nouns are added periodically when the application is refreshed.

Using the Windows PowerShell Command Builder

To begin using the Windows PowerShell Command Builder, click the Windows PowerShell Command Builder link in the [Windows PowerShell for SharePoint Server 2013 Resource Center](http://technet.microsoft.com/en-us/sharepoint/jj672838). The Windows PowerShell Command Builder will open in the browser and default to the SharePoint Server 2013 product - meaning only those cmdlets available to SharePoint Server 2013 will be presented in the user interface.

#### The Windows PowerShell Command Builder User Interface

The Products dropdown includes SharePoint Foundation 2010, SharePoint Server 2010, SharePoint Foundation 2013, SharePoint Server 2013, SharePoint Online, and Office 365.

The Windows PowerShell Command Builder user interface distributes the necessary objects across the following three (3) dimensions: 1. Verbs, 2. Nouns, 3. Design Surface. The Verbs dimension contains verbs that are associated with the product that is selected in the Products dropdown. The Nouns dimension contains nouns that are associated with the product that is selected in the Products dropdown. The Design Surface is where verbs and nouns are combined to begin generating a Windows PowerShell command associated with the selected product.

[![Builder1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8132.Builder1_thumb_0B85BA4E.png "Builder1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4571.Builder1_0978E152.png)

Figure 1 Windows PowerShell Command Builder Environment

**NOTE**

All verb-noun combinations that are available to SharePoint Foundation 2010 are included in SharePoint Server 2010 in addition all verb-noun combinations that are available to SharePoint Foundation 2013 are included in SharePoint Server 2013.

#### Getting Started

The Windows PowerShell Command Builder provides an intelligent user experience. After you drag a verb or noun object on the Design Surface, the interface will hide either the verbs or nouns that are not associated with the verb or noun placed on the Design Surface.

To begin using the Windows PowerShell Command Builder, select a desired noun and drag it to the Design Surface. The noun will “snap” to the appropriate location in the Design Surface. Next select one of the available verbs and drag it to the Design Surface.

**NOTE**

On touch-enabled devices a single click on either a verb or noun will display a “Send” prompt that can be used in place of drag and drop where desired.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3823.image_thumb_09C4C8AD.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6253.image_66C47D09.png)

Figure 2 Send Prompt

As elements are placed on the Design Surface, the corresponding Windows PowerShell command will be constructed at the bottom of the Design Surface to include a hyperlink to the related online content. If the constructed command includes required or optional parameters, prompts on the Design Surface indicate where the information can be supplied.

The Windows PowerShell Command Builder minimizes the need to memorize complex cmdlet parameters and noun references by presenting a friendly description of those parameters or nouns. For example, to create a new site collection in SharePoint Foundation 2010 or 2013, the verb-noun combination and required parameters are constructed as follows:

New-SPSite -Identity http://www.contoso.com/

To simplify this construction, Windows PowerShell Command Builder provides a “user friendly” representation of both nouns and in many cases the parameters required to complete a command. For example, in the above example, the Windows PowerShell Command Builder represents the SPSite noun as Site and the -Identity parameter as Url in order to present this information in a user friendly, visual, and structured way.

The Windows PowerShell Command Builder provides access to the most common cmdlets and routine scenarios that are associated with the administration of SharePoint 2010, SharePoint 2013, SharePoint Online, and Office 365. However, Windows PowerShell Command Builder does not provide access to all cmdlets that are associated with these products. The Windows PowerShell Command Builder also provides access to a number of parameters that are associated with each cmdlet. However, Windows PowerShell Command Builder excludes those less commonly used with the respective cmdlet.

**NOTE**

The Windows PowerShell Command Builder supports both traditional and touch interactions. You can interact with elements in the Windows PowerShell Command Builder by using a mouse and pointer or optionally through natural touch on supported devices.

##### Using the Clipboard

The Windows PowerShell Command Builder supports copying constructed cmdlets to the Clipboard. To copy a constructed cmdlet, select the Copy to Clipboard button on the Design Surface. The copied cmdlet can then be pasted into a Windows PowerShell script, the SharePoint 2010 Management Shell, or other desired location to be saved or executed.

##### Clearing the Design Surface

The Windows PowerShell Command Builder Design Surface can be cleared in one of two ways:

*   Drag verbs and nouns back on their respective dimensions.
*   Select the Clear Design Surface button on the Design Surface.

The Clear Design Surface button is not displayed until elements are placed on the Design Surface.

Frequently Asked Questions

Q: I don’t see the verb-noun combination I’m looking for?

A: The initial release of the Windows PowerShell Command Builder provides access to the most common and routine cmdlets available to SharePoint 2010, SharePoint 2013, SharePoint Online, and Office 365. Later releases will introduce additional verb-noun constructs.

Q: Does the Windows PowerShell Command Builder support complex scripting, for example Piping and the Pipeline?

A: No. Windows PowerShell provides access to and supports complex tasks to multiple degrees of variety and preference of the individual constructing the command which cannot be accounted for programmatically. For advanced scripting support with Windows PowerShell see the [Windows PowerShell Owner’s Manual](http://go.microsoft.com/fwlink/?LinkID=187817).

Q: Can I customize the Windows PowerShell Command Builder?

A: No. The Windows PowerShell Command Builder does not support customization.

Additional Resources

To learn more about SharePoint 2010 Products cmdlets and concepts, see the [Windows PowerShell for SharePoint Server 2010 Resource Center](http://go.microsoft.com/fwlink/p/?LinkID=220221).

To learn more about SharePoint 2013 Products cmdlets and concepts, see the [Windows PowerShell for SharePoint 2013 Resource Center](http://technet.microsoft.com/en-us/sharepoint/jj672838).

To learn more about Windows PowerShell, see [Windows PowerShell](http://go.microsoft.com/fwlink/p/?LinkID=128426) in the Scripting library on TechNet.

To learn more about Windows PowerShell in the SharePoint Management Shell, see [Windows PowerShell in the SharePoint Management Shell](http://go.microsoft.com/fwlink/p/?LinkID=200922).

To access Windows PowerShell training for SharePoint Server 2010 Administrators, see the [Windows PowerShell for SharePoint Server 2010 Administrators](http://go.microsoft.com/fwlink/p/?LinkId=229676) video.

To learn more about SharePoint 2010 Products administration using Windows PowerShell, see [SharePoint 2010 Products administration by using Windows PowerShell](http://go.microsoft.com/fwlink/p/?LinkID=200912).