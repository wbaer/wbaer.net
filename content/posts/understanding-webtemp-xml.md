---
title: 'Understanding webtemp*.xml'
date: Sun, 25 Mar 2007 11:34:00 +0000
draft: false
tags: ['Code Samples', 'Uncategorized']
---

In **Microsoft Office SharePoint Server 2007**/**Windows SharePoint Services 3.0** webtemp\*.xml contains a set of <Template> elements within a <Template> element that contain a set of site definitions available in the Template Selection user interface and define how to instantiate a Web site.  <Template> elements where the <Configuration> element does not contain a <ProvisionAssembly> (Example 3) attribute indicate the <Template> element applies to a single site definition and not a portal site definition.  The <ProvisionAssembly> attribute is equal to the Microsoft.SharePoint.Publishing namespace which provides the fundamental publishing infrastructure in **Microsoft Office SharePoint Server 2007**.  webtemp\*.xml is provisioned on each web front-end computer and installed to each locale available in the server farm configuration and available in six (6) unique instances:

**WEBTEMP.xml**

> Products:  **Microsoft Office SharePoint Server 2007**/**Windows SharePoint Services 3.0**

> Includes:  Team Site, Blank Site, Document Workspace, Basic Meeting Workspace, Blank Meeting Workspace, Decision Meeting Workspace, Social Meeting Workspace, Multipage Meeting Workspace, Central Admin Site, Wiki Site, and Blog templates.

**webtempsrch.xml**

> Products:  **Microsoft Office SharePoint Server 2007**

> Includes:  Search Center template.

**webtempsps.xml**

> Products:  **Microsoft Office SharePoint Server 2007**
> 
> Includes:  SharePoint Portal Server Site, SharePoint Portal Server Personal Space, Personalization Site, Contents area Template, Topic area Template, News Site, Publishing Site, Press Releases Site, Publishing Site with Workflow, Site Directory, Community area Template, Report Center, Collaboration Portal, Search Center with Tabs, Profiles, Publishing Portal, My Site Host templates.

**webtempoffile.xml**

> Products:  **Microsoft Office SharePoint Server 2007**
> 
> Includes:  Records Center template.

**webtempbdr.<local>.xml**

> Products:  **Microsoft Office SharePoint Server 2007**
> 
> Includes:  Document Center template.

**webtemposrv.xml**

> Products:  **Microsoft Office SharePoint Server 2007**
> 
> Includes:  Shared Services Administration Site template.

In the example 1 below, the Name attribute specifies the directory name equivelant to the directory hosting ONET.xml which contains the definition configuration under %commonprogramfiles%Microsoft SharedWeb Server Extensions12TEMPLATE<localeid><Name>XML.  The <ID> attribute is a unique ID corresponding to the ID of a configuration in an ONET.xml file that specifies the lists and modules of a site definition.  The <Configuration> element contains attributes that define the template, these attributes indicate what configuration should be appiled to the template when the Web site is instantiated.

**Configuration Attributes**:

*   <Title> Template title text displayed in the Template Selection user interface.
*   <Description> Description of the purpose and features of the requested template displayed in the Template Selection user interface.
*   <ImageUrl> Provides the virtual path to the preview image displayed in the Template Selection user interface. 
*   <DisplayCategory> Defines the category where the template should be made available for selection in the Template Selection user interface.
*   <RootWebOnly> Defines the usage scenario in which this template can be applied.
*   <ProvisionAssembly> Provides the fundamental publishing infrastructure in **Microsoft Office SharePoint Server 2007**.
*   <ProvisionClass> Defines the class associated with the <ProvisionAssembly> attribute.
*   <ProvisionData> Provides the virtual path to the associated Web manifest (%commonprogramfiles%Microsoft SharedWeb Server Extensions12TEMPLATESiteTemplatesWebManifestportalwebmanifest.xml)
*   <VisibilityFeatureDependency> Feature dependency associated with the template that provides its visibility.

**Example 1**:

> `<Template Name="SPSMSITEHOST" ID="54">  
>    <Configuration ID="0" Title="My Site Host" Type="0" RootWebOnly="TRUE" Hidden="FALSE" DisplayCategory="Enterprise" ImageUrl="../images/perstemp.gif" Description="A site used for hosting personal sites (My Sites) and the public People Profile page. This template needs to be provisioned only once per Shared Service Provider, please consult the documentation for details.">     
>     </Configuration>  
> </Template>`

**Example 2 (Single Site Definition)**:

> `<Template Name="STS" ID="1">  
>     <Configuration ID="0" Title="Team Site" Hidden="FALSE" ImageUrl="/_layouts/images/stsprev.png" Description="A site for teams to quickly organize, author, and share information. It provides a document library, and lists for managing announcements, calendar items, tasks, and discussions." DisplayCategory="Collaboration" >    
> </Configuration>  
> </Template>`

**Example 3 (Portal Site Definition)**

> `<Template Name="SPSPORTAL" ID="47">  
>     <Configuration ID="0" Title="Collaboration Portal" Type="0" Hidden="FALSE" ImageUrl="/_layouts/1033/images/template_corp_intranet.png" Description="A starter site hierarchy for an intranet divisional portal. It includes a home page, a News site, a Site Directory, a Document Center, and a Search Center with Tabs. Typically, this site has nearly as many contributors as  readers and is used to host team sites."  
>       ProvisionAssembly="Microsoft.SharePoint.Publishing, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"  ProvisionClass="Microsoft.SharePoint.Publishing.PortalProvisioningProvider"  ProvisionData="SiteTemplates\WebManifest\PortalWebManifest.xml"  
>       RootWebOnly="TRUE" DisplayCategory="Publishing" VisibilityFeatureDependency="97A2485F-EF4B-401f-9167-FA4FE177C6F6">  
>     </Configuration>  
>  </Template>`

On occassion you will want to hide a template from end-users in the Template Selection user interface, by setting the <Hidden> attribute to TRUE the configuration will be hidden from the user interface.  In **Microsoft Office SharePoint Server 2007** you may want to hide the SPSMSITEHOST template from the Template Selection user interface to prevent end-users from creating new Site Collections using the My Site Host template.  (See illustration).

 ![](https://wbaer.officeisp.net/Shared%20Picture%20Library/TemplateSelect_Clip.JPG)[](https://wbaer.officeisp.net/Shared%20Picture%20Library/TemplateSelect_Clip.JPG)

Other templates to consider removing from the Template Selection user interface include:  Site Directory, Search Center with Tabs, Search Center.

**Development Best Practices**

When developing custom site definitions, it is recommended to use an existing site definition as a baseline and copy that to a directory that will host your custom site definition.  Customizing the existing site definitions is generally not recommended as service packs and hotfixes can reset custom configurations. 

Use an existing WEBTEMP.xml as a base for your new site definition renaming the file to associate it with your new directory.  For example, if your new site definition directory is CONTOSO, rename the copied WEBTEMP.xml, WEBTEMP.contoso.xml.

Specify unique names in the <Template> <Name> and <ID> attributes; it is recommended the ID be an integer greater than 10000 to avoid any conflict.

> `<Template Name="ContosoBase" ID="10001">  
>     <Configuration ID="0" Title="Contoso Basic Site" Hidden="FALSE"  
> ImageUrl="/_layouts/images/contosoprev.png" Description="This template provides a standard site configuration  
> for basic Contoso sites." DisplayCategory="Collaboration">  
>     </Configuration>  
> </Template>`

The above example indicates a template name of Contoso that will be displayed in the Collaboration category of the Template Selection user interface as Contoso Basic Site with an associated preview image.

Once the site definition has been created, the site definition can be customized leveraging ONET.xml which serves as a repository for all available resources within the site definition.