---
title: 'One-Way Outbound Hybrid Search Step-by-Step and OneDrive for Business'
date: Mon, 24 Mar 2014 21:13:47 +0000
draft: false
tags: ['Hybrid', 'Hybrid and Coexistence', 'Office 365', 'OneDrive for Business', 'SharePoint', 'SharePoint Server 2013']
---

Recently we introduced a number of new coexistence scenarios in Service Pack 1 including redirection of [OneDrive for Business](http://blogs.technet.com/b/wbaer/archive/2014/03/21/onedrive-for-business-redirection-to-office-365.aspx) and Yammer.  Redirection of OneDrive for Business enables IT to provision cloud storage for users OneDrive for Business document libraries; however, in a hybrid scenario the content in that storage should be discoverable both on-premises and online.  The most common configuration to support OneDrive for Business redirection is an outbound search topology where users can return results from both on-premises and online within the on-premises search portal.

**NOTE** Office 365 returns only local results.

The steps below assume a hybrid identity infrastructure is configured for the target environment.  The hybrid identity infrastructure can be:

1.  _Cloud Identity_ – suitable for small organizations with up to 50 users, no affinity to on-premises Active Directory identity.
2.  _DirSync_ – suitable for larger organizations, provides a consistent authentication experience when combined with Password Sync.
3.  _AD FS / SSO_ – suitable for larger organizations planning to deploy complex hybrid workloads to include BCS, bidirectional search, etc.

See also Configure identity management for a hybrid topology in SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/dn197169(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn197169(v=office.15).aspx "http://technet.microsoft.com/en-us/library/dn197169(v=office.15).aspx")\] 

Install Prerequisites
=====================

On one or more Web servers install the following prerequisite software:

1.  [Microsoft Online Services Sign-In Assistant for IT Professionals RTW (msoidcli\_64bit.msi)](http://www.microsoft.com/en-us/download/details.aspx?id=28177)
2.  [Windows Azure Active Directory Module for Windows PowerShell (64-bit version)](http://go.microsoft.com/fwlink/p/?linkid=236297)
3.  [SharePoint Online Management Shell (sharepointonlinemanagementshell\_64bit.msi)](http://www.microsoft.com/en-us/download/details.aspx?id=35588)

Configure Server-To-Server Authentication Between SharePoint Server 2013 and Office 365
=======================================================================================

Server-To-Server authentication in hybrid environments between SharePoint Server 2013 and Office 365 creates a trust relationship between SharePoint Server 2013 and a SharePoint Online Tenant.  In this scenario Windows Azure Active Directory provides the trusted signing service.

Certificate Management
----------------------

The Security Token Service (STS) is the service component that builds, signs, and issues security tokens according to the WS-Trust and WS-Federation protocols. Replacing the STS certificate in SharePoint Server 2013 is necessary to establish trust between the Security Token Service of SharePoint Server 2013 and the SharePoint Online Tenant.  Replacing the STS certificate enables the STS Service and Windows Azure Active Directory to sign security tokens for authenticated users.

**NOTE** The steps below should be used in pilot/development/lab environments.  A certificate provided by a known CA should be used in production environments.

### Create a Self-Signed Certificate

Open Internet Information Services (IIS Manager) on Web server:

1.  Click **Start** > **Administrative Tools** > **Internet Information Services (IIS Manager)**
2.  Click the server name in the Connections pane.
3.  Double-click **Server Certificates** in the Details pane.
4.  Click **Create Self-Signed Certificates** in the Actions pane.
5.  On the Create Self-Signed Certificate Dialog provide a name for the certificate under Specify a friendly name for the certificate: (I.e. STS) and click **OK** to create the certificate.

> [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_7417D0BE.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_748403B3.png)

#### Export a PFX Certificate

A Personal Information Exchange certificate that is issued by a signing authority and verifies the authenticity and security of the hosted service (can be a self-signed certificate for testing purposes). The format of this certificate uses a .pfx extension.

Open Internet Information Services (IIS Manager) on a Web server:

1.  Click **Start** > **Administrative Tools** > **Internet Information Services (IIS Manager)**
2.  Click the server name in the Connections pane.
3.  Double-click **Server Certificates** in the Details pane.
4.  Right-click the Self-Signed Certificate created in the previous step and select **Export** from the list of available options.

#### Export a CER Certificate

In Internet Information Services (IIS Manager) select the Self-Signed Certificate created in the previous steps.

1.  Click **Start** > **Administrative Tools** > **Internet Information Services (IIS Manager)**
2.  Click the server name in the Connections pane.
3.  Double-click **Server Certificates** in the Details pane.
4.  Right-click the Self-Signed Certificate created in the previous step and select **View** from the list of available options.
5.  Click **Copy to File** on the Details tab and then click **Next**.
6.  On the **Export Private Key** page, click **Next**.
7.  For **Export File Format** page, choose **Base-64 encoded X.509 (.CER)**. Click **Next**.
8.  For **Export Certificate** type a path and file name for the .cer file. Click **Next**.
9.  Click **Finish**, and then click **OK** twice.

Server-To-Server Authentication
-------------------------------

Server-to-server authentication allows for servers that are capable of server-to-server authentication to access and request resources from one another on behalf of users. Servers that are capable of server-to-server authentication run SharePoint 2013, Exchange Server 2013, Lync Server 2013, Azure Workflow Service, or other software that supports the Microsoft server-to-server protocol.

### Configure Server-To-Server Authentication

Configuring server-to-server is necessary to service incoming requests from another SharePoint 2013 server farm or service where the primary SharePoint 2013 server farm trusts the send farm.  The following steps use the New-SPTrustedSecurityTokenIssuer CmdLet to configure the trust relationship by providing the JSON metadata endpoint of the sending farm.

#### Populate Common Variables

Open the SharePoint 2013 Management Shell:

**NOTE** The remaining steps in this article will be executed within this SharePoint 2013 Management Shell dialog.

1.  Click **Start** > **SharePoint 2013 Management Shell** and at the PS prompt enter:

> $PFXCertificate \= “<Drive:Path>”
> 
> $CERCertificate \= “<Drive:Path>”
> 
> $PFXCertificatePassword \= “<password>”
> 
> $RootDomain \= \*<Root FQDN>.com (I.e. \*.corp.contoso.com)
> 
> **NOTE** In this example the domain FQDN is wbaer.com.co (see below).
> 
> [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_6F351D02.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_1D8EA2B0.png)
> 
> $RootSite \= Get-SPSite <Top-Level Site Collection> (I.e. [http://sharepoint.corp.contoso.com)](http://sharepoint.corp.contoso.com))
> 
> $Site \= Get-SPSite $RootSite
> 
> $SPOAppId \= "00000003-0000-0ff1-ce00-000000000000"
> 
> $SPOContextId \= (Get-MsolCompanyInformation).ObjectID

#### Update Security Token Service Certificate

Updating the Security Token Service Certificate requires initializing a new instance of the X509Certificate2 class using a certificate file name and a password used to access the certificate in addition to the X.509 format version of the certificate prior to importing the signing certificate.

In the SharePoint 2013 Management Shell at the C> prompt enter:

> $STSCertificate = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 $PFXCertificate, $PFXCertificatePassword, 20
> 
> Set-SPSecurityTokenServiceConfig \-ImportSigningCertificate $STSCertificate

**NOTE** Enter \[**Y**\]es when prompted to replace the certificate.

In order to properly update the STS with the new certificate in the command prompt enter:

IISRESET and allow the service to restart

NET STOP SPTimerV4 and allow the Timer Service to stop

NET START SPTimerV4 and allow the Timer Service to start

#### Convert Certificates to Base64

$STSCertificate \= New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 \-ArgumentList $PFXCertificate, $PFXCertificatePassword

$PFXCertificateBin = $STSCertificate.GetRawCertData()

$Certificate \= New-Object System.Security.Cryptography.X509Certificates.X509Certificate2

$Certificate.Import($CERCertificate)

$CERCertificateBin = $cerCertificate.GetRawCertData()

$CredentialValue \= \[System.Convert\]::ToBase64String($CERCertificateBin)

#### Connect to Office 365

Enable-PSRemoting

Enter \[**A**\] Yes to All when prompted.

New-PSSession

$Credentials \= Get-Credential

Connect-MsolService \-Credential $Credentials

#### Import MS Online Modules

Import-Module MSOnline \-force  
Import-Module MSOnlineExtended \-force

#### Register the SharePoint 2013 STS as the Office 365 Service Principal

New-MsolServicePrincipalCredential \-AppPrincipalId $SPOAppId \-Type asymmetric \-Usage Verify \-Value $CredentialValue

$SharePoint \= Get-MsolServicePrincipal \-AppPrincipalId $SPOAppId

$ServicePrincipalName \= $SharePoint.ServicePrincipalNames

$ServicePrincipalName.Add("$SPOAppId/$RootDomain")

Set-MsolServicePrincipal \-AppPrincipalId $SPOAppId \-ServicePrincipalNames $ServicePrincipalName

$SPOContextId \= (Get-MsolCompanyInformation).ObjectID

$SPOAppPrincipalId \= (Get-MsolServicePrincipal \-ServicePrincipalName $SPOAppId).ObjectID

$SPONameIdentifier \= [$APOAppPrincipalId@$SPOContextId](mailto:$APOAppPrincipalId@$SPOContextId)

#### Establish SharePoint 2013 Trust with ACS

Windows Azure Active Directory Access Control is a cloud-based service that provides an easy way of authenticating and authorizing users to gain access to your web applications and services while allowing the features of authentication and authorization to be factored out of your code.

In a hybrid topology rather than implement an authentication system with user accounts specific to the application, ACS orchestrates the authentication and authorization of users.

$AppPrincipal \= Register-SPAppPrincipal \-site $Site.rootweb \-nameIdentifier $SPONameIdentifier \-displayName "SharePoint Online"

Set-SPAuthenticationRealm \-realm $SPOContextId

New-SPAzureAccessControlServiceApplicationProxy \-Name "ACS" \-MetadataServiceEndpointUri "https://accounts.accesscontrol.windows.net/metadata/json/1/" \-DefaultProxyGroup

New-SPTrustedSecurityTokenIssuer \-MetadataEndpoint "https://accounts.accesscontrol.windows.net/metadata/json/1/" \-IsTrustBroker \-Name "ACS"

##### Confirm Trust Relationship Configuration

Open SharePoint 2013 Central Administration to confirm Trust is configured:

1.  Click **Start** > **SharePoint 2013 Central Administration** and select **Security**.
2.  Select **Manage trust** from the list of available options and confirm two (2) ACS\_<GUID> entries exist.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_639F5FC3.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_23D5793E.png)

Configure Query Results and Rules
=================================

In order to surface content stored in SharePoint Online / OneDrive for Business a new Results Source and Query Rule are required on the SharePoint Server 2013 on-premises environment.  Optionally, where only OneDrive for Business is cloud-enabled, a new search vertical may be sufficient; however, in the event additional workloads to include general collaboration will be considered for the cloud, a base Results Source / Query Rule should be configured to aggregate results across all site collections (including OneDrive for Business) where a OneDrive for Business Result Type can be further configured for refinement.

Create Results Source
---------------------

_Result sources in SharePoint_ limit searches to certain content or to a subset of search results. SharePoint Server 2013 provides 16 pre-defined result sources. The pre-configured default result source is **Local SharePoint Results**.  In these steps a new Results Source will be created for **Remote SharePoint** in order to discover content stored in SharePoint Online / OneDrive for Business.

Open SharePoint 2013 Central Administration:

1.  Click **Start** > **SharePoint 2013 Central Administration** and select **Application Management**.
2.  Select **Manage service applications** from the list of available options.
3.  Select the Search Service Application from the list of available Service Applications.
4.  Select **Result Sources** under Queries and Results and then click **New Result Source** on the Manage Result Sources page.
5.  On the Add Results Source page provide a name for the Result Source in the **Name** field (I.e. SharePoint Online).
6.  Select **Remote SharePoint** under Protocol.
7.  Provide the Url of the root Site Collection in SharePoint Online under **Remote Service Url** (I.e. [http://contoso.sharepoint.com](http://contoso.sharepoint.com))
8.  Select **SharePoint Search Results** under Type.
9.  Under Query Transformation select or modify the existing method (the default is {searchTerms}.
10.  Select **Default Authentication** under Credentials Section.
11.  Click **OK** to save the Results Source created above.

> [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_4CE0183A.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_313B8C44.png)

### Create Query Rule

Query Rules in SharePoint help searches respond to the intent of users through conditions and correlated actions.  For example, when a query meets the conditions in a query rule, the search system performs the actions specified in the rule to improve the relevance of the search results.

1.  On the Search Administration page select **Query Rules** under Queries and Results.
2.  On the Manage Query Rules page select the Results Source created in the previous steps.
3.  Click **New Query Rule** and provide a Rule Name (I.e SharePoint Online Results).
4.  Expand the **Context** section:
    1.  Select **All sources** under Query is performed on these sources.
    2.  Select **All categories** under Query is performed from these categories.
    3.  Select **All user segments** under Query is performed by these user segments.
5.  On the Query Conditions section click **Remote Condition**  to allow the query to fire for any query text.
6.  On the Actions section click **Add Result Block**.
    1.  Select the Results Source (SharePoint Online) under Search this Source.
7.  Click **Save** to save the Query Rule.

**NOTE** This query rule will apply to all sites. To make one for just a specific site, use the query rules page in its Site Settings

#### Validate Results Source (Central Administration)

1.  To validate the new Results Source in Search Administration select **Result Sources** under Queries and Results.
2.  Select the Result Source created in the previous steps and click **Test Source**.
3.  In the Test Result Source Dialog verify the Test details: results reports **Succeeded**.

#### Validate Results Source (Search Center)

1.  Open the Search Center used by the Search Service Application and query a term used across SharePoint Server 2013 and SharePoint Online.
    1.  Validate the results are retrieved from local results set.
2.  Under Results found in <local> select **Everything**.
    1.  Validate the upper Results Block contains results from SharePoint Online and the lower Results Block, local results.

> [![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_284E8AB6.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_0CA9FEC0.png)

Conclusion
==========

Combining an outbound hybrid search topology with OneDrive for Business redirection in Service Pack 1 provides on-premises users of SharePoint Server 2013 visibility to content stored in OneDrive for Business libraries in Office 365 improving discovery and manageability of cloud content.

Implementing DirSync with Password Sync reduces overall complexity and provides an integrated authentication experience to support rapid provisioning of cloud storage.

Resources
=========

Hybrid for SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/jj838715(v=office.15).aspx](http://technet.microsoft.com/en-us/library/jj838715(v=office.15).aspx "http://technet.microsoft.com/en-us/library/jj838715(v=office.15).aspx")\]

Display hybrid search results in SharePoint Server 2013 \[[http://technet.microsoft.com/en-us/library/dn197173(v=office.15).aspx](http://technet.microsoft.com/en-us/library/dn197173(v=office.15).aspx "http://technet.microsoft.com/en-us/library/dn197173(v=office.15).aspx")\]