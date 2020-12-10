---
title: 'Deploying ProClarity Viewer 6.3 for SharePoint'
date: Fri, 21 Sep 2007 16:13:00 +0000
draft: false
tags: ['Add-ons and Utilities', 'Code Samples', 'Uncategorized']
---

I was recently asked to deploy the ProClarity Viewer 6.3 for SharePoint Web Part - after downloading the package I realized that it was not offered in a deployable package, but rather a compressed archive of the .dwp, assembly, and resource files.  The challenge became offering a user experience similar to the previous ProClarity Viewer version so I decided to package the Web Part into a reusable solution.  For those interested or looking to create a deployable Web Part package I've documented the steps below:

**Step 1 Create a Manifest**

The Manifest file is a required configuration file that describes the contents and overall structure of the cabinet file.  STSADM will use the Manifest file to deploy the contents of the cabinet file when executing the addwppack operation.

`  <Assemblies>  
    <Assembly FileName="**SPSPageViewer.dll**">  
      <SafeControls>  
        <SafeControl Assembly="**SPSPageViewer**, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="SPSPageViewer" TypeName="*" Safe="True" />  
      </SafeControls>  
      <ClassResources>  
        <ClassResource FileName="**images/Book.gif**"/>  
        <ClassResource FileName="**images/Folder.gif**"/>  
        <ClassResource FileName="**images/Library.gif**"/>  
        <ClassResource FileName="**images/Page.gif**"/>  
        <ClassResource FileName="**images/TPMax2.gif**"/>  
        <ClassResource FileName="**images/TPMin2.gif**"/>  
        <ClassResource FileName="**images/Unknown.gif**"/>  
        <ClassResource FileName="**images/up.gif**"/>  
      </ClassResources>  
    </Assembly>  
  </Assemblies>  
  <DwpFiles>  
    <DwpFile FileName="**PasPageViewer.dwp**"/>  
  </DwpFiles>`

The <Assemblies> node contains the overall definitions for each of the assemblies being deployed, the child <Assembly> node uses the FileName attribute to define the assembly file name, in this case SPSPageViewer.dll, and contains the definitions for the class resources in addition to the XML for the SafeControls list.  The XML for the SafeControls list can be found in the ProClarity Viewer Web Part Setup Guide or optionally copied from the example above.  This information will be written to the web.config for the Web application(s) when the solution is deployed to the SharePoint Products and Technologies server farm using the SharePoint administration tool (STSADM).

The <ClassResources> node contains the base definitions for each class resource that will be deployed, the child <ClassResource> node uses the FileName attribute to define the class resource file name, in this case each of the images accompanying the Web Part are defined in a <ClassResource> node with their path relative to wpresources at a global or localized level.

The <DwpFiles> node contains the definitions for each .dwp file being deployed, the child node <DwpFile> uses the FileName attribute to define the file name of the .dwp file, in this case the .dwp file name accompanying the downloaded Web Part archive is PasPageViewer.dwp.

The complete Manifest file should appear as follows:

`<?xml version="1.0"?>  
<WebPartManifest xmlns="[http://schemas.microsoft.com/WebPart/v2/Manifest"](http://schemas.microsoft.com/WebPart/v2/Manifest%22)>  
  <Assemblies>  
    <Assembly FileName="SPSPageViewer.dll">  
      <SafeControls>  
        <SafeControl Namespace="SPSPageViewer" TypeName="*" />  
      </SafeControls>  
      <ClassResources>  
        <ClassResource FileName="images/Book.gif"/>  
        <ClassResource FileName="images/Folder.gif"/>  
        <ClassResource FileName="images/Library.gif"/>  
        <ClassResource FileName="images/Page.gif"/>  
        <ClassResource FileName="images/TPMax2.gif"/>  
        <ClassResource FileName="images/TPMin2.gif"/>  
        <ClassResource FileName="images/Unknown.gif"/>  
        <ClassResource FileName="images/up.gif"/>  
      </ClassResources>  
    </Assembly>  
  </Assemblies>  
  <DwpFiles>  
    <DwpFile FileName="PasPageViewer.dwp"/>  
  </DwpFiles>  
</WebPartManifest>`

**Step 2 Create a MakeCab Directives File**

The MakeCab directives file controls how files are compresses in a cabinet.

Create a logical file structure by copying Book.gif, Library.gif, Page.gif, TPMax.gif, TPMin.gif, Unknown.gif, and up.gif to /images.  \*You will need to create the images directory in your cabinet directory.  The directives file is also used to define the name of the cabinet file.

`;  
.Set CabinetNameTemplate=ProClarity63.cab  
.set DiskDirectoryTemplate=CDROM  
.Set CompressionType=MSZIP  
.Set UniqueFiles='ON'  
.Set Cabinet=on  
.Set DiskDirectory1=.  
"C:ProClarity63imagesBook.gif"    "imagesBook.gif"  
"C:ProClarity63imagesFolder.gif"    "imagesFolder.gif"  
"C:ProClarity63imagesLibrary.gif"    "imagesLibrary.gif"  
"C:ProClarity63imagesPage.gif"    "imagesPage.gif"  
"C:ProClarity63imagesTPMax2.gif"    "imagesTPMax2.gif"  
"C:ProClarity63imagesTPMin2.gif"    "imagesTPMin2.gif"  
"C:ProClarity63imagesUnknown.gif"    "imagesUnknown.gif"  
"C:ProClarity63imagesup.gif"        "imagesup.gif"  
"C:ProClarity63PasPageViewer.dwp"     "PasPageViewer.dwp"  
"C:ProClarity63SPSPageViewer.dll"    "SPSPageViewer.dll"  
"C:ProClarity63Manifest.xml"        "Manifest.xml"  
;*** <the end>`

**Step 3 Create the Cabinet**

To create the cabinet file execute **MakeCab.exe /F <filename>.ddf** where <filename> is the name of your directives file.  The cabinet file when a source destination is not specified is commonly created under C:Documents and Settings<user>.

**Step 4 Deployment**

To deploy the Web Part package, copy <cabinet>.cab to a location on one Web front-end server.

Execute STSADM -o addwppack -filename <cabinet>.cab \[-globallinstall\].

**Step 5 Verify Deployment**

The Web Part package will be listed in the list of available/deployed solutions to the SharePoint Products and Technologies server farm under SharePoint 3.0 Central Administration | Operations | Solutions Management (see image).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/0882acd48195_104F2/image_thumb.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/0882acd48195_104F2/image.png)

To review deployment details, retract, or remove the solution click <cabinet>.cab (see image).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/0882acd48195_104F2/image_thumb_1.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/0882acd48195_104F2/image_1.png)

**Step 6 Add the ProClarity Viewer to a Page**

To add the ProClarity Viewer Web Part to a page, navigate to a site collection and select Site Actions | Edit Page.

Select a Web Part zone and click Add Web Part.

Select ProClarity Viewer from the list of available Web Parts and click Add.