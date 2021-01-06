---
title: 'PowerShell and SharePoint Automation Examples Part 3'
date: Thu, 17 Sep 2009 11:28:00 +0000
draft: false
tags: ['Code Samples', 'Windows Powershell']
---

Automating your Microsoft SharePoint Products and Technologies installations can provide both consistency and efficiency while reducing the potential for human error.  This is the third post on the subject of leveraging PowerShell to provide configuration logic for your environment(s).  In this example we cover the configuration of Diagnostic Logging through PowerShell and a source Xml manifest.  For previous examples see [http://blogs.technet.com/wbaer/archive/tags/Powershell/default.aspx](http://blogs.technet.com/wbaer/archive/tags/Powershell/default.aspx).

**Instructions**

*   Copy the source below into somefile.ps1.
*   Copy the Xml source in DiagnosticsLogging.xml.

2.  In the Windows Powershell console call ./somefile.ps1

**Source**

#-------------------------------------------------------------------------------  
\# Function: Main  
#  
\# Description: Main entry point for the script.  Loads the configuration source  
#  Xml and initializes the foreach loop to iterate over a  
\#   collection of Xml nodes.  
#  
\# Parameters: None  
#-------------------------------------------------------------------------------

function Main()  
{  
  \[xml\]$cfg = Get-Content .DiagnosticLogging.xml

  if( $? \-eq $false ) {  
    Write-Host "Cannot load configuration source Xml $cfg."  
    return $false  
  }

  $cfg.Configuration.DiagnosticLogging | ForEach-Object {  
    new-DiagnosticLogging( $\_ )  
  }  
}

#-------------------------------------------------------------------------------  
\# Function:  new-DiagnosticLogging  
#  
\# Description:  This script enables you to do programmatically what you can do  
\#   manually through the user interface in the Logging and  
\#   Reporting section on the Central Administration Diagnostics  
\#   Logging page.  
#  
\# Parameters:  None  
#-------------------------------------------------------------------------------

function new-DiagnosticLogging( \[object\] $cfg )  
{  
  \[Void\]\[System.Reflection.Assembly\]::LoadWithPartialName("Microsoft.Sharepoint")

  if (!(Test-Path -Path $cfg.LogLocation))  
  {  
    New-Item $cfg.LogLocation -type directory  
  }

  $SPDiagnosticsService = \[Microsoft.SharePoint.Administration.SPDiagnosticsService\]::Local  
  $SPDiagnosticsService.LogLocation = $cfg.LogLocation  
  $SPDiagnosticsService.LogsToKeep = $cfg.LogsToKeep  
  $SPDiagnosticsService.LogCutInterval = $cfg.LogCutInterval

  Write-Host (\[Environment\]::NewLine+"DiagnosticsService.PS1 is making the requested changes.  This may take several minutes to complete.")

  $SPDiagnosticsService.Update()

  $ErrorReporting = \[Microsoft.SharePoint.Administration.SPWebService\]::AdministrationService  
   
  if( $cfg.ErrorReportingEnabled.ToString().ToLower() \-eq "true" ) {  
    $ErrorReporting.Farm.ErrorReportingEnabled = $true  
  }  
  elseif( $cfg.ErrorReportingEnabled.ToString().ToLower() \-eq "false" ) {  
    $ErrorReporting.Farm.ErrorReportingEnabled = $false  
  }

  if( $cfg.ErrorReportingAutomaticUpload.ToString().ToLower() \-eq "true" ) {  
    $ErrorReporting.Farm.ErrorReportingAutomaticUpload = $true  
  }  
  elseif( $cfg.ErrorReportingAutomaticUpload.ToString().ToLower() \-eq "false" ) {  
    $ErrorReporting.Farm.ErrorReportingAutomaticUpload = $false  
  }  
}

main

**Source Xml**

<?xml version="1.0" encoding="utf-8"?>  
<Configuration>  
  <!\[CDATA\[ SPDiagnosticsService (Microsoft.SharePoint.Administration) \]\]>  
  <DiagnosticLogging>  
    <ErrorReporting>  
      <ErrorReportingEnabled>True</ErrorReportingEnabled>  
      <ErrorReportingAutomaticUpload>True</ErrorReportingAutomaticUpload>  
    </ErrorReporting>  
    <LogCutInterval>96</LogCutInterval>  
    <LogLocation>C:SomePath</LogLocation>  
    <LogsToKeep>10</LogsToKeep>  
  </DiagnosticLogging>  
</Configuration>