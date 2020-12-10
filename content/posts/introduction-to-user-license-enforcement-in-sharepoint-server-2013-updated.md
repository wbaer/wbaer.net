---
title: 'Introduction to User License Enforcement in SharePoint Server 2013 [Updated]'
date: Mon, 12 Nov 2012 21:30:00 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2013', 'SPC219', 'User License Enforcement']
---

Introduction

SharePoint Server 2013 introduces new User License Enforcement capabilities that enable the definition, assignment, and mapping of licenses to users associated with specific Active Directory security groups. For example an administrator can map Enterprise features to individual users who appear in the ‘Enterprise CAL’ Active Directory security group or limit usage of Duet capabilities to users in the ‘Duet CAL’ Active Directory security group.

By default in SharePoint Server 2013 User License Enforcement is disabled when SharePoint Server 2013 is deployed and must first be enabled to begin assigning, using, and implementing user licensing capabilities. When User License Enforcement is enabled, usage data is logged and access to unlicensed features are blocked at runtime if the user does not have the appropriate license assignment.

The assignment of license is based on individual users Active Directory security group membership. There are five basic CAL categories that may be assigned which include Standard, Enterprise, Project, Duet, and WAC (these categories are explained in more detail later in this article). In the event a user has membership in more than one of the available user CAL categories a separate entry for that user is logged for each license they are assignment. Unlicensed users, or those who do not have membership in a security group with license assignment are logged as “Unlicensed”.

In scenarios where User License Enforcement has not been enabled in an environment, license usage is logged; however, is mapped to the installed SKU. For example, a user accessing an environment where the Enterprise CAL is deployed is considered an Enterprise licensed user as it is likely that user will traverse a page where Enterprise features exist (such as a Web Part). Conversely, in a Standard CAL environment, a user would be considered Standard CAL licensed.

An important note however is that User License Enforcement does not provide complete coverage across all SharePoint entities.  User License Enforcement can be used to compliment blended CAL scenarios (such as serving Enterprise and Standard CALs within a single-server farm), but does not enable compliance.  In addition the MAP toolkit can be implemented for reporting purposes.

When User License Enforcement is disabled, only Standard and Enterprise (based on SKU) is logged. Project, Duet, and WAC are not logged when User License Enforcement is disabled.

User License Enforcement is enabled, disabled, and managed through Windows PowerShell. Eight cmdlets are available for use with User License Enforcement.

1\. [Get-SPUserLicensing](http://technet.microsoft.com/en-us/library/jj219687(v=office.15).aspx)

2\. [Enable-SPUserLicensing](http://technet.microsoft.com/en-us/library/jj219586(v=office.15).aspx)

3\. [Disable-SPUserLicensing](http://technet.microsoft.com/en-us/library/jj219644(v=office.15).aspx)

4\. [Get-SPUserLicense](http://technet.microsoft.com/en-us/library/jj219606(v=office.15).aspx)

5\. [Get-SPUserLicenseMapping](http://technet.microsoft.com/en-us/library/jj219671(v=office.15).aspx)

6\. [New-SPUserLicenseMapping](http://technet.microsoft.com/en-us/library/jj219495(v=office.15).aspx)

7\. [Add-SPUserLicenseMapping](http://technet.microsoft.com/en-us/library/jj219682(v=office.15).aspx)

8\. [Remove-SPUserLicenseMapping](http://technet.microsoft.com/en-us/library/jj219529(v=office.15).aspx)

Enabling User License Enforcement

To verify if user licensing is enabled in an environment:

Click **Start** | **All Programs** | **SharePoint Server 2013** | **SharePoint 2013 Management Shell**

In the SharePoint 2013 Management Shell at the command prompt enter Get-SPUserLicensing and press **Enter**.

If user licensing is disabled the cmdlet will return the value ‘False’. To enable user licensing in an environment: 

Click **Start** | **All Programs** | **SharePoint Server 2013** | **SharePoint 2013 Management Shell**

In the SharePoint 2013 Management Shell at the command prompt enter Enable-SPUserLicensing and press **Enter**.

To verify user licensing is enabled in an environment:

Click **Start** | **All Programs** | **SharePoint Server 2013** | **SharePoint 2013 Management Shell**

In the SharePoint 2013 Management Shell at the command prompt enter Get-SPUserLicensing and press **Enter**.

If user licensing is enabled the cmdlet will return the value ‘True’.

Mapping User Licenses

The assignment of licensing is established through mapping security groups or individual users to specific licensing categories associated with one or more features. Feature categories include Unlicensed, Standard, Enterprise, Project, and WACEdit.

Sample Windows PowerShell Code

The following code sample will map users in the Enterprise Client Access License AD security group to the Enterprise licensing attribute.

$a = New-SPUserLicenseMapping -SecurityGroup "CORPEnterprise Client Access License" -Li  
cense Enterprise

Add-SPUserLicenseMapping -Mapping $a 

User License Enforcement Categories

The Standard licensing category enables user access to all Standard CAL features of SharePoint Server 2013.

The Enterprise licensing category provides access to Enterprise CAL features to include:

*   InfoPath Form Web part
*   Excel Web Access
*   Visio Web Access  
    PerformancePoint Filter  
    PerformancePoint Report  
    PerformancePoint Scorecard  
    PerformancePoint Stack Selector  
    Indicator Details (deprecated but may show up in adder on sites that have been upgraded from 14 to 15)  
    Status List (deprecated but may show up in adder on sites that have been upgraded from 14 to 15)  
    Taxonomy Refinement Panel  
    Catalog-Item Reuse  
    Search-Driven Content (all web parts in this category)  
    Business Data Actions  
    Business Data Connectivity Filter  
    Business Data Item  
    Business Data Item Builder  
    Business Data List  
    Business Data Related List

Licensable Entities

Licensable entities include:

*   AccessServices
*   BCS
*   Duet
*   InfoPath
*   PPS
*   Project
*   EntSearch
*   VisioServices
*   WAC
*   ExcelServices
*   MySites

Users who are not licensed to use a specific Web Part, such as Business Data List, will not have the Web Part visible when visiting a page where that particular Web Part has been added. In the event the Web Part has been added using SharePoint Designer or already inserted on the page the user will presented with an error as illustrated below in place of the Web Part.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6136.image_thumb_50DD2389.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5531.image_250CCF9A.png)

Licensing scope includes user CAL and device CAL information which include the username initiating the request and their IP address respectively. Log usage is by license name as opposed to specific feature or role.

Logging Handling

Logging occurs each time a user accesses SharePoint. SharePoint maintains a cache (provided through Distributed Cache) to temporarily store logging data in the event the same user accesses the environment again preventing that request from begin logged. The cache is maintained for 24 hours until its cleared and that same user will be logged again.

Resources

[Learn more about SharePoint Server 2013](http://sharepoint.microsoft.com/en-us/Pages/default.aspx)

[Use Windows PowerShell cmdlets to manage user licenses in SharePoint 2013](http://technet.microsoft.com/en-us/library/jj219609(v=office.15).aspx)