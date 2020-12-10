---
title: 'Alternate Access Mappings and Windows Powershell'
date: Wed, 10 Jun 2009 00:19:10 +0000
draft: false
tags: ['Code Samples', 'Uncategorized', 'Windows Powershell']
---

I had a request this week on how to leverage Windows Powershell to add Alternate Access Mappings to the collection for a specific Web application.  Surprisingly after some searching I was unable to find anything existing on the topic, so for those curious see the attached script and corresponding source Xml.

**Instructions**

1.  Copy the source below into somefile.ps1.
2.  Copy the Xml source in AAM.xml.
3.  In the Windows Powershell console call ./somefile.ps1.

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
  \[xml\]$cfg = Get-Content .AAM.xml

  if( $? \-eq $false ) {  
    Write-Host "Cannot load configuration source Xml $cfg."  
    return $false  
  }

  $cfg.Configuration.WebApplication | ForEach-Object {  
    new-SPAlternateUrl( $\_ )  
  }  
}

#-------------------------------------------------------------------------------  
\# Function:     New-SPAlternateURL  
#  
\# Description:     This script adds the specified URLs to the collection of  
#        alternate request URLs for the Web application.  
#  
\# Parameters:    None  
#-------------------------------------------------------------------------------

function New-SPAlternateURL( \[object\] $cfg )  
{  
  \[Void\]\[System.Reflection.Assembly\]::LoadWithPartialName("Microsoft.Sharepoint")

  $webApp = $nul;  
  $webApp = \[Microsoft.SharePoint.Administration.SPWebApplication\]::Lookup($cfg.Url)  
  trap \[Exception\] {   
      Write-Host  
    Write-Error $("Exception: " + $\_.Exception.Message);  
    continue;  
  }

  $cfg.AlternateUrl | ForEach-Object {  
  $map=New-Object Microsoft.SharePoint.Administration.SPAlternateUrl($\_.IncomingUrl, $\_.UrlZone)  
  $webApp.AlternateUrls.Add($map)  
  return $map  
  }

main

**Source Xml**

<?xml version="1.0" encoding="utf-8"?>  
<Configuration>  
  <WebApplication Url="[http://contoso"](http://contoso")\>  
    <AlternateUrl IncomingUrl="[http://www.contoso.com"](http://www.contoso.com") UrlZone="Internet" />  
    <AlternateUrl IncomingUrl="[http://contoso:1234"](http://contoso:1234") UrlZone="Custom" />  
    <AlternateUrl IncomingUrl="[http://contoso:4321"](http://contoso:4321") UrlZone="Custom" />  
  </WebApplication>  
</Configuration>