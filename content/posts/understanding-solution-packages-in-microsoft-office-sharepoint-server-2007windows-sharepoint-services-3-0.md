---
title: 'Understanding Solution Packages in Microsoft Office SharePoint Server 2007/Windows SharePoint Services 3.0'
date: Thu, 29 Mar 2007 19:48:00 +0000
draft: false
tags: ['Code Samples']
---

**Understanding Solution Packages**

Solution packages are designed to provide the ability to develop and deploy reusable  site and feature definitions, web part files, templates, assemblies, and code access security policies across one or more server farms.  A solution package is a cabinet file that can contain, site and feature definitions, web part files, templates, assemblies, and code access security policies.  A solution package contains a web manifest that that defines the list of features, site definitions, resource files, Web Part files, and assemblies to process when the solution is deployed.  The directory structure within the cabinet file dictates the resulting structure on the web front-end computer when the solution is deployed.  If solution files are not indicated in the web manifest; however, they will not be processed with the solution. 

Solutions can range from simple to highly complex incorporating features, new site definitions, code deployments, etc.  The benefit of a solution package is the ability to deploy the solution to multiple servers and server farms rapidly, on a desired schedule, and uniformly across servers and server farms from one location.  The solution sample in this post details the simplest of solutions, deployment of a new default content page replacing an existing default content page.

**Sample Solution Package**

The sample web manifest shown indicates a solution package directory structure of SiteTemplatessts and the file to be deployed as default.aspx.

Web Manifest (manifest.xml)

> `<Solution SolutionId="6F2A9959-E7C3-471b-9AB8-030D7DFFEA64" xmlns="[http://schemas.microsoft.com/sharepoint/](http://schemas.microsoft.com/sharepoint/)">  
>   <TemplateFiles>  
>     <TemplateFile Location="SiteTemplatesstsdefault.aspx"/>  
>   </TemplateFiles>  
> </Solution>`

The <Solution> element is the web manifests root element and can contain <TemplateFiles>, and <TemplateFile> child elements in addition to <FeatureManifests>, <FeatureManifests>, <RootFiles>, <RootFile>, <Assemblies>, and <Assembly> child elements depending on the application.  In the sample web manifest, the <TemplateFile> child element contains a Location attribute that specifies the relative path to the site template directory on a web front-end computer.  In this sample default.aspx will be replaced on the STS site template with the file packaged in the solution.  In order to ensure the file is correctly placed, the solution package should host default.aspx in the following directory structure/substructure:  SiteTemplatessts complementing the relative path on the web front-end computer. 

The <Solution> root element has attributes of SolutionID and xmlns; the SolutionID attribute specifies the unique GUID assigned to the solution and the xmlns element is used to declare namespace bindings.  For additional information on namespaces in XML visit:  [http://www.w3.org/TR/REC-xml-names/#sec-namespaces](http://www.w3.org/TR/REC-xml-names/#sec-namespaces).

**Building the Solution Package**

A solution package in essence is a cabinet file using the wsp file extension.  To build a solution package, you can use the Microsoft MakeCAB tool supplying an optional file containing the MakeCAB directives.  The Microsoft MakeCAB user's guide is available at [http://msdn2.microsoft.com/en-us/library/bb267310.aspx#microsoftmakecabusersguide](http://msdn2.microsoft.com/en-us/library/bb267310.aspx#microsoftmakecabusersguide).

**Adding the Solution Package to the Server Farm**

A solution package can be deployed through STSADM.

To add a solution to the server farm you can use the STSADM operation AddSolution. 

> `stsadm.exe -o addsolution  
>             -filename <Solution filename>  
>             [-lcid <language>]`

**Deploying the Solution Package**

A solution package can be deployed either through the Central Administration user interface or optionally through STSADM.

> **Central Administration**
> 
> To add a solution to the server farm using the Central Administration user interface, open Central Administration, select Operations, and then select Solution management under the Global Configuration options.
> 
> The Solution Management user interface lists the solutions in the server farm, their individual status, and the Web Application they have been deployed to, when deployed.
> 
> To deploy a solution to the server farm, select the solution name from the list of available solutions, and then select Deploy Solution from the Solution Properties user interface.  The Solution Properties user interface can also be used to check the status of deployed solutions and includes information about the deployment status, deployment location, and results of the deployment operation.  Alternatively you can use STSADM to view a list of solutions deployed to the server farm using the enumsolutions operation (stsadm.exe -o enumsolutions).
> 
> **STSADM **
> 
> To deploy the solution to the server farm you can also use the STSADM operation deploysolution.
> 
> > `stsadm.exe -o deploysolution  
> >             -name <Solution name>  
> >            [-url <virtual server url>]  
> >            [-allcontenturls]  
> >            [-time <time to deploy at>]  
> >            [-immediate]  
> >            [-local]  
> >            [-allowgacdeployment]  
> >            [-allowcaspolicies]  
> >            [-lcid <language>]  
> >            [-force]`
> 
> In the sample syntax above you will see we opted to retain the .cab extension as opposed to providing the .wsp extension to the solution package.
> 
> These deployment operations allow you to add a solution to a server farm and deploy the solution at a later time or optionally deploy the solution immediately.  To deploy a solution or redeploy a solution to a single web front-end computer, you can optionally use the -local parameter in the operation above or the -global parameter to deploy the solution to all web applications in the current server farm.

**Retracting a Solution Package**

Solution packages can be retracted as easily as they are deployed.  A solution package can be retracted either through the Central Administration user interface or optionally through STSADM.

> **Central Administration**
> 
> To retract a solution from the server farm using the Central Administration user interface, open Central Administration, select Operations, and then select Solution management under the Global Configuration options. Select the solution to be retracted, and then select Retract Solution from the Solution Management user interface. As with deployment, retracting a solution is dependent on a **Windows SharePoint Services** Timer Job.  Once the solution has been retracted from the server farm, any dependencies on that solution will be affected.  When retracting a solution, ensure that any dependencies are properly remediated prior to retracting the solution from the server farm.

> **STSADM**
> 
> To deploy the solution to the server farm you can also use the STSADM operation retractsolution.
> 
> > `stsadm.exe -o retractsolution  
> >             -name <Solution name>  
> >            [-url <virtual server url>]  
> >            [-allcontenturls]  
> >            [-time <time to remove at>]  
> >            [-immediate]  
> >            [-local]  
> >            [-lcid <language>]`