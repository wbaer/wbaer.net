---
title: 'Quota Templates and Powershell'
date: Wed, 17 Jun 2009 11:07:56 +0000
draft: false
tags: ['Code Samples', 'Windows Powershell']
---

Continuing the series using Powershell and Microsoft SharePoint Products and Technologies, this weeks script sample illustrates how Powershell can be leveraged to programmatically provision Quota Templates in Windows SharePoint Services 3.0 and/or Microsoft Office SharePoint Server 2007.

**Instructions**

1.  Copy the source below into somefile.ps1.
2.  Copy the Xml source in QuotaTemplates.xml.
3.  In the Windows Powershell console call ./somefile.ps1

**Source**

#-------------------------------------------------------------------------------  
\# Function:    main  
#  
\# Description:    Main entry point for the script.  Loads the configuration source  
#        Xml and initializes the foreach loop to iterate over a  
#         collection of Xml nodes.  
#  
\# Parameters:    None  
#-------------------------------------------------------------------------------

function main()  
{  
  \[xml\]$cfg = Get-Content .QuotaTemplates.xml

  if( $? \-eq $false ) {  
    Write-Host "Cannot load configuration source Xml $cfg."  
    return $false  
  }

  $cfg.Configuration.QuotaTemplates.QuotaTemplate | ForEach-Object {  
    new-QuotaTemplates( $\_ )  
  }  
}

#-------------------------------------------------------------------------------  
\# Function:     new-QuotaTemplates  
#  
\# Description:     This script enables you to do programmatically what you can do  
#         manually through the user interface in the SharePoint Site  
#         Management section on the Central Administration Quota  
#         Templates page.  
#  
\# Parameters:     None  
#-------------------------------------------------------------------------------

function New-QuotaTemplates( \[object\] $cfg )  
{  
  \[Void\]\[System.Reflection.Assembly\]::LoadWithPartialName("Microsoft.Sharepoint")

  $webService = \[Microsoft.SharePoint.Administration.SPWebService\]::ContentService  
  $quota\=New-Object Microsoft.SharePoint.Administration.SPQuotaTemplate

  $quota.Name = $cfg.Name  
  $quota.StorageMaximumLevel = $cfg.StorageMaximumLevel  
  $quota.StorageWarningLevel = $cfg.StorageWarningLevel

  $webService.QuotaTemplates.Add($quota);

  $webService.Update();  
}

main

**Source Xml**

<?xml version="1.0" encoding="utf-8"?>  
<Configuration>  
  <!\[CDATA\[SPQuotaTemplate (Microsoft.SharePoint.Administration)\]\]>  
  <QuotaTemplates>  
    <QuotaTemplate Name="2GB">  
      <StorageMaximumLevel>2097152000</StorageMaximumLevel>  
      <StorageWarningLevel>1887436800</StorageWarningLevel>  
    </QuotaTemplate>  
    <QuotaTemplate Name="3GB">  
      <StorageMaximumLevel>3145728000</StorageMaximumLevel>  
      <StorageWarningLevel>2936012800</StorageWarningLevel>  
    </QuotaTemplate>  
    <QuotaTemplate Name="4GB">  
      <StorageMaximumLevel>4194304000</StorageMaximumLevel>  
      <StorageWarningLevel>3670016000</StorageWarningLevel>  
    </QuotaTemplate>  
    <QuotaTemplate Name="5GB">  
      <StorageMaximumLevel>5242880000</StorageMaximumLevel>  
      <StorageWarningLevel>4718592000</StorageWarningLevel>  
    </QuotaTemplate>  
    <QuotaTemplate Name="10GB">  
      <StorageMaximumLevel>10485760000</StorageMaximumLevel>  
      <StorageWarningLevel>9961472000</StorageWarningLevel>  
    </QuotaTemplate>  
    <QuotaTemplate Name="100GB">  
      <StorageMaximumLevel>104857600000</StorageMaximumLevel>  
      <StorageWarningLevel>99614720000</StorageWarningLevel>  
    </QuotaTemplate>  
  </QuotaTemplates>  
</Configuration>