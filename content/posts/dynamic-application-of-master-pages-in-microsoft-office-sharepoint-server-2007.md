---
title: 'Dynamic Application of Master Pages in Microsoft Office SharePoint Server 2007'
date: Fri, 11 Jan 2008 12:36:00 +0000
draft: false
tags: ['Governance', 'SDK', 'Uncategorized']
---

I've spent the past two months in various locations across the West coast speaking on governance in SharePoint Products and Technologies and one of the most common points of discussion is enabling a consistent look and feel across sites and Webs.  While most commonly this is achieved through employing a master page, many organizations either limit the distribution of Microsoft Office SharePoint Designer 2007 or do not use Microsoft Office SharePoint Designer 2007 in their organizations, while there are many articles across numerous blogs providing prescriptive guidance on master page development, Feature stapling, and other variations to support the implementation of master pages, I've yet to find a complete tutorial on implementing master pages using a combination of Feature stapling and a Feature Receiver.

**NOTE** Sample master pages can be downloaded from: [http://www.microsoft.com/downloads/details.aspx?FamilyID=7c05ca44-869a-463b-84d7-57b053711a96&DisplayLang=en](http://www.microsoft.com/downloads/details.aspx?FamilyID=7c05ca44-869a-463b-84d7-57b053711a96&DisplayLang=en "http://www.microsoft.com/downloads/details.aspx?FamilyID=7c05ca44-869a-463b-84d7-57b053711a96&DisplayLang=en").  [Click here](https://wbaer.officeisp.net/Shared%20Documents/MasterPage%20Resource%20Files.zip) to download sample master page resource files based on the Clarity master page included in the [Windows SharePoint Services 3.0 Sample: Example Master Pages](http://www.microsoft.com/downloads/details.aspx?FamilyID=7c05ca44-869a-463b-84d7-57b053711a96&DisplayLang=en).  The Clarity master page in this download was modified to support installation as a Windows SharePoint Services 3.0 solution package.

**Create the Solution Directory Structure**

The directory structure is important to the solution when it is to be compiled using MAKECAB.exe later in this article, to simplify the compilation using MAKECAB.exe you should create a directory structure relative to the location on which the files will be installed on the Web server(s), the directories when the solution is added and deployed to the server farm are relative to %commonprogramfiles%Microsoft SharedWeb Server Extensions12 in this example.

\+ Sample Master Page Solution

  + GAC _Hosts the Feature Receiver called by the Feature_

  +  TEMPLATES

    + FEATURES

      + Sample.MasterPage _Hosts the master page feature scoped at the Site level and MasterPages subdirectory._

        + MasterPages _Hosts the master page or master pages that will be used by the solution._

      + Sample.Stapler _Hosts the stapling Feature that makes the master page(s) available to the Site and Web scopes._

      + Sample.Web.Master _Hosts the master page feature scoped at the Web level._

    + LAYOUTS

      + <LocaleID>

        + Styles \*Optional _Hosts cascading stylesheets used by out of the box master pages and page layouts._

          + Sample \*Optional _Hosts cascading stylesheets used by the master page._

    + IMAGES

      + Sample \*Optional _Hosts images used by the master page._

**Create the Master Page Feature (Scope = Site)**

The master page feature contains both the files necessary to provision a Feature and the master page to be applied to newly created sites. The master page Feature directory should contain a directory to host the master page and two files, Feature.xml and ProvisionedFiles.xml.

**Feature.xml**

Feature.xml defines the base properties of the Feature and lists elements bound to it.

**NOTE** For more information see the Working with Features article on MSDN at [http://msdn2.microsoft.com/en-us/library/ms460318.aspx](http://msdn2.microsoft.com/en-us/library/ms460318.aspx "http://msdn2.microsoft.com/en-us/library/ms460318.aspx").

**Elements and Attributes**

The <Feature> element defines the Feature and specifies the location of assemblies, files, dependencies, and additional properties supporting the Feature.  In Feature.xml the Title attribute specifies the name of the Feature as it appears in the SharePoint Products and Technologies user interface and is supported by the Description attribute which can be used to specify additional descriptive text to identify the Feature.  It is best to provide a clear description of the Feature, it's purpose and scope in the Description attribute to easily identify the Feature in the SharePoint Products and Technologies user interface.  The Scope attribute specifies the scope at which the Feature applies itself, in this example, the scope is at the Site level.  The Hidden attribute specifies whether or not the Feature is visible in the SharePoint Products and Technologies user interface and the DefaultResourceFile specifies the default resource file used by the Feature.

The ElementManifests element specifies references to element manifests and element files that contain definitions for the Feature elements.

Example:

<!-- \_lcid="1033" \_version="12.0.4518" \_dal="1" \-->  
<!-- \_LocalBinding \-->  
<Feature  Id\="<GUID>"  
          Title\="**Sample Site Collection Master Page**"  
          Description\="**The sample master page provides an instant style ready to be applied to your SharePoint site.**"  
          Version\="**1.0.0.0**"  
          Scope\="**Site**"  
          Hidden\="**False**"  
          DefaultResourceFile\="**core**"  
          xmlns\="[**http://schemas.microsoft.com/sharepoint/**"](http://schemas.microsoft.com/sharepoint/)\>  
    <ElementManifests\>  
        <ElementManifest Location\="**ProvisionedFiles.xml**" /\>  
    </ElementManifests\>  
</Feature\>

ProvisionedFiles.xml

ProvisionedFiles.xml defines the resources that are provisioned on the Web server as a component of the underlying associated Feature.

Example:

<!-- \_lcid="1033" \_version="12.0.4518" \_dal="1" \-->  
<!-- \_LocalBinding \-->  
<Elements xmlns\="[**http://schemas.microsoft.com/sharepoint/**"](http://schemas.microsoft.com/sharepoint/)\>  
<Module Name\="**OSGMasterPages**" Url\="\_**catalogs/masterpage**" Path\="**MasterPages**" RootWebOnly\="**TRUE**">  
        <File Url\="Clarity.master" Type\="GhostableInLibrary">  
            <Property Name\="**ContentType**" Value\="**$Resources:cmscore,contenttype\_masterpage\_name**;" /\>  
            <Property Name\="**PublishingPreviewImage**" Value\="**/\_layouts/images/clarity/clarity.gif**" /\>  
            <Property Name\="**MasterPageDescription**" Value\="**Clarity Master Page**" /\>  
        </File\>  
</Module\>  
</Elements\>

In the example the preview image for the master page is stored in a subdirectory, clarity relative to %commonprogramfiles%Microsoft SharedWeb Server Extensions12BIN.  It is recommended to create resource directories to host supporting content to easily identify resources associated with the master page on the Web server file system.

**Create the Master Page Feature (Scope = Web)**

The master page feature contains both the files necessary to provision a Feature and the master page to be applied to newly created Webs. The master page Feature directory should contain two files, Feature.xml and ProvisionedFiles.xml.

**Feature.xml**

Example:

<!-- \_lcid="1033" \_version="12.0.4518" \_dal="1" \-->  
<!-- \_LocalBinding \-->  
<Feature  Id\="<**GUID**\>"  
          Title\="**Sample Web Master Page**"  
          Description\="**The sample master page provides an instant style ready to be applied to your SharePoint site**."  
          Version\="**1.0.0.0**"  
          ReceiverAssembly\="**SampleReceiver, Version=1.0.0.0, Culture=neutral,PublicKeyToken=<PKT>**"  
          ReceiverClass\="**SampleReceiver.FeatureReciever**"  
          Scope\="**Web**"  
          Hidden\="**False**"  
          DefaultResourceFile\="**core**"  
          xmlns\="[**http://schemas.microsoft.com/sharepoint/**"](http://schemas.microsoft.com/sharepoint/)\>  
    <ElementManifests\>  
        <ElementManifest Location\="**ProvisionedFiles.xml**" /\>  
    </ElementManifests\>  
    <Properties\>  
      <Property Key\="**MasterName**" Value\="**Clarity.master**" /\>  
    </Properties\>  
</Feature\>

The Web master page Feature has two notable differences in comparison to the sites master page Feature, the ReceiverAssembly attribute and its dependencies and the <Properties> element that defines the master page to be applied when the custom code is called in the Feature Receiver specifies in the ReceiverAssembly attribute and dependant attributes.

The ReceiverAssembly attribute specifies the assembly name (instructions later in this article).  The Version and Culture attributes specify the assembly version and Culture.  The PublicKeyToken attribute specifies the Public Key Token for the assembly.  Once the assembly is compiled in Visual Studio you can use the Strong Naming utility SN.exe or optionally copy the assembly to your Global Assembly Cache to retrieve the Public Key Token.  **NOTE** Assemblies must be signed to support installation in the Global Assembly Cache.

**ProvisionedFiles.xml**

<!-- \_lcid="1033" \_version="12.0.4518" \_dal="1" \-->  
<!-- \_LocalBinding \-->  
<Elements xmlns\="[**http://schemas.microsoft.com/sharepoint/**"](http://schemas.microsoft.com/sharepoint/)\></Elements\>

**Create the Master Page Stapling Feature**

**Feature.xml**

Feature.xml defines the base properties of the Feature and lists elements bound to it.  **NOTE** For information on Feature.xml elements and attributes used in this solution, see Elements and Attributes in the Create the Master Page Feature section at the top of this article.

Example:

<!-- \_lcid="1033" \_version="12.0.4518" \_dal="1" \-->  
<!-- \_LocalBinding \-->  
<Feature  Id\="<GUID>"  
          Title\="**Sample Stapler**"  
          Description\="**Sample stapler feature.**"  
          Version\="**1.0.0.0**"  
          Scope\="**Farm**"  
          Hidden\="**False**"  
          DefaultResourceFile\="**core**"  
          xmlns\="[**http://schemas.microsoft.com/sharepoint/**"](http://schemas.microsoft.com/sharepoint/)\>  
    <ElementManifests\>  
        <ElementManifest Location\="**ElementsManifest.xml**" /\>  
    </ElementManifests\>  
</Feature\>

The stapling Feature enables the association of a specific Feature with a site definition.  The stapling Feature directory should contain two files, Feature.xml (described above) and ElementManifest.xml.

**ElementManifest.xml**

ElementManifest.xml contains definitions for the Feature elements.

The <FeatureSiteTemplateAssociation> element specifies the site templates the Feature should be associated to.  In ElementManifest.xml the Id attribute specifies the globally unique identifier for the site template the Feature should be associated and the TemplateName attribute specifies the friendly name of the template associated with the globally unique identifier in the Id attribute.  In this example, the Feature is associated with an example collection of the out of the box site definitions for both sites and Webs, use additional Site Templates as needed by adding the identification values in the <Elements> element.

<!-- \_lcid="1033" \_version="12.0.4518" \_dal="1" \-->  
<!-- \_LocalBinding \-->  
<Elements xmlns\="[**http://schemas.microsoft.com/sharepoint/**"](http://schemas.microsoft.com/sharepoint/)\>  
  <!--Clarity.MasterPage Feature\-->   
  <FeatureSiteTemplateAssociation Id\="**<GUID>**" TemplateName\="**STS#0**" />   
  <FeatureSiteTemplateAssociation Id\="**<GUID>**" TemplateName\="**STS#1**" />   
  <FeatureSiteTemplateAssociation Id\="**<GUID>**" TemplateName\="**STS#2**" />

  <!--Clarity.Web.Master Feature\-->   
  <FeatureSiteTemplateAssociation Id\="**<GUID>**" TemplateName\="**STS#0**" />    
  <FeatureSiteTemplateAssociation Id\="**<GUID>**" TemplateName\="**STS#1**" />  
  <FeatureSiteTemplateAssociation Id\="**<GUID>**" TemplateName\="**STS#2**" />  
</Elements\>

**Create the Feature Receiver**

The Feature Receiver provides the ability to respond to Feature events which permit trapping and responding to an event that fires when a Feature is installed in the Web farm, added to a Web application, or when a Feature is removed.  For additional information on Feature Events see [http://msdn2.microsoft.com/en-us/library/ms469501.aspx](http://msdn2.microsoft.com/en-us/library/ms469501.aspx "http://msdn2.microsoft.com/en-us/library/ms469501.aspx") or for additional information using Feature Receivers to modify master page properties and application on a SPWeb object see [http://blogs.msdn.com/bgeoffro/archive/tags/branding/default.aspx](http://blogs.msdn.com/bgeoffro/archive/tags/branding/default.aspx).

The Feature Receiver is the core of the master page solution and enables a method by which an event is acted on when the Feature function or functions are called.  The Feature Receiver used in this example is called by the Clarity.Web.Master Feature.  Event handlers within the Feature Receiver class are fired when the Feature is installed, activated, uninstalled, and/or deactivated.  To instruct the SPWeb object to use the new Master Page you would supply the necessary code inside the FeatureActivated Event Handler.

**Create the SharePoint Solution Package**

The SharePoint solution package will contain the Feature resource files and receiver created in the steps above.  There are several applications available today specifically designed to create and compile SharePoint solution packages; however, most commonly the MAKECAB.exe application is used to create the solution package.  To download and learn more about MAKECAB.exe visit [http://support.microsoft.com/kb/310618](http://support.microsoft.com/kb/310618 "http://support.microsoft.com/kb/310618").  For solution packaging examples using MAKECAB.exe see [Deploying ProClarity Viewer 6.3 for SharePoint](http://blogs.technet.com/wbaer/archive/2007/09/21/deploying-proclarity-viewer-6-3-for-sharepoint.aspx "Deploying ProClarity Viewer 6.3 for SharePoint") and [Understanding Solution Packages in Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0](http://blogs.technet.com/wbaer/archive/2007/03/29/building-solutions-for-microsoft-office-sharepoint-server-2007-windows-sharepoint-services-3-0.aspx).

**Resources**

**Chris Johnson:  Feature Stapling in WSS v3** [http://blogs.msdn.com/cjohnson/archive/2006/11/01/feature-stapling-in-wss-v3.aspx](http://blogs.msdn.com/cjohnson/archive/2006/11/01/feature-stapling-in-wss-v3.aspx)

**Heather Solomon:  Create a Feature: Master Pages for Site Collections** [http://www.heathersolomon.com/blog/articles/servermstpageforsitecollect\_feature.aspx](http://www.heathersolomon.com/blog/articles/servermstpageforsitecollect_feature.aspx)

**Andrew Connell:  Adding Master Pages to WSS v3 Site Collections via Features** [http://andrewconnell.com/blog/archive/2006/10/21/4954.aspx](http://andrewconnell.com/blog/archive/2006/10/21/4954.aspx)

**Brett's SharePoint Blog:  Branding** [http://blogs.msdn.com/bgeoffro/archive/tags/branding/default.aspx](http://blogs.msdn.com/bgeoffro/archive/tags/branding/default.aspx) \*Great Code Samples