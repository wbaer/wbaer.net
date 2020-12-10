---
title: 'Quick Starting Demos with Windows PowerShell'
date: Fri, 21 Mar 2014 15:58:08 +0000
draft: false
tags: ['Administration', 'Code Samples', 'Events', 'IT Pro Resources', 'Virtualization', 'Windows Powershell']
---

Preparing virtual machines for demonstrations can be a tedious process, compounding this is when virtual machines need to be started or shut down in a specific order.  For example, starting database servers prior to starting web servers, or starting the preferred active node before the passive node.  Starting those machines; however, is only a portion of the process, in most cases you will want them to be “available” before starting a subsequent machine.  For example, having an iSCSI Target available before the consuming iSCSI initiators are available.  Windows PowerShell, is perfect to support this scenario – it’s something I use almost everyday and have shared an example (below) of how you can accomplish all of these tasks…

So what does it do?

Provides parameters to Start/Shut Down one or more virtual machines.

Checks for process elevation, escapes if the script is not run elevated.

Starts the Hyper-V Virtual Machine Management Service if not running.

Iterates through an array of virtual machines stored in a .txt file.

Starts each virtual machine in the .txt file and waits for the heartbeat status to report ‘OK’ before starting the next virtual machine in the list.  Virtual machines are started in the order they appear in the source file, waiting ensures a clean start up – particularly where a defined start order with dependencies exists.

Shuts down virtual machines in the reverse order they were started by reading the source file bottom to top.  Waits for the virtual machine heartbeat status to report ‘’ before processing the next virtual machine.

Displays a progress bar to report on the status of the operation.

Script
======

\[CmdletBinding(ConfirmImpact\="Low")\]  
  
Param(  
     \[Parameter(Mandatory\=$True,Position\=0,ValueFromPipeline\=$False,HelpMessage\="Operation to perform on one or more virtual machines.")\]\[ValidateSet("Start","Stop")\]  
     \[String\]$operation,  
     \[Parameter(Mandatory\=$True,Position\=1,ValueFromPipeline\=$False,HelpMessage\="Collection of virtual machines on which operation is to be performed.")\]\[ValidateNotNullorEmpty()\]  
     \[String\]$source  
)  
  
$ErrorActionPreference \= "Stop"  
  
Process  
{  
     $identity \= \[System.Security.Principal.WindowsIdentity\]::GetCurrent()  
     $principal \= New-Object System.Security.Principal.WindowsPrincipal($identity)  
     $role \= \[System.Security.Principal.WindowsBuiltInRole\]::Administrator  
     $elevated \= $principal.IsInRole($role)  
  
     If ($operation \-eq "Start")  
     {  
         $service \= Get-Service -Name vmms  
  
         If ($service.Status \-ne "Running")  
         {  
             Try  
             {  
                 If ($elevated)  
                 {  
                     Start-Service $service  
  
                     Write-Host "Starting the Hyper-V Virtual Machine Management Service."  
  
                     Start-Sleep -s 10  
  
                     Clear-Host  
                 }  
                 Else  
                 {  
                     Write-Host "Requires elevation."  
                     break  
                 }  
             }  
             Catch  
             {  
                 \[System.Exception\]  
                 Write-Host "Could not start Virtual Machine Management Service."  
                 break  
             }  
         }  
  
         $exists \= Test-Path "$(Get-Location)$source.txt"   
  
         If ($exists \-eq $True)  
         {  
             Try  
             {  
                 $list \= Get-Content "$(Get-Location)$source.txt"  
             }  
             Catch  
             {  
                 \[System.Exception\]  
                 break  
             }  
         }  
         Else  
         {  
             Write-Host "The file could not be found: $source.  The document name or path is not valid."  
             break  
         }  
  
         For ( $count \= 0; $count \-lt $list.Count; $count++)   
         {   
             $guest \= $list\[$count\]  
  
             $progress \= 100 / $list.Count \* ($count + 1)  
  
             Write-Progress -Activity "Starting virtual machine..." -CurrentOperation "Starting..." -Status $guest -PercentComplete $progress  
  
             Try  
             {  
                 If ($elevated)  
                 {  
                     Start-VM -Name $guest  
                 }  
                 Else  
                 {  
                     Write-Host "Requires elevation."  
                     break  
                 }  
             }  
             Catch  
             {  
                 Write-Host "Could not start virtual machine(s)."  
                 break  
             }  
  
             Write-Progress -Activity "Starting virtual machine..." -CurrentOperation "Waiting..." -Status $guest -PercentComplete $progress  
  
             do {Start-Sleep -milliseconds 100}   
             until ((Get-VMIntegrationService $guest | ?{$\_.name \-eq "Heartbeat"}).PrimaryStatusDescription \-eq "OK")  
         }  
     }  
  
     ElseIf ($operation \-eq "Stop")  
     {  
         $exists \= Test-Path "$(Get-Location)$source.txt"   
  
         If ($exists \-eq $True)  
         {  
             Try  
             {  
                 $list \= Get-Content "$(Get-Location)$source.txt"  
             }  
             Catch  
             {  
                 \[System.Exception\]  
                 break  
             }  
         }  
         Else  
         {  
             Write-Host "The file could not be found: $source.  The document name or path is not valid."  
             break  
         }  
  
         For ($count \= $list.Length\-1; $count \-ge 0 ; $count\-\-)  
         {   
             $guest \= $list\[$count\]  
  
             $progress \= 100 / $list.Count \* ($count + 1)  
  
             Write-Progress -Activity "Stopping virtual machine..." -CurrentOperation "Stopping..." -Status $guest -PercentComplete $progress  
      
             Try  
             {  
                 Stop-VM -Name $guest  
             }  
             Catch  
             {  
                 Write-Host "Could not stop virtual machine."  
                 break  
             }  
  
             Write-Progress -Activity "Stopping virtual machine..." -CurrentOperation "Waiting..." -Status $guest -PercentComplete $progress  
  
             do {Start-Sleep -milliseconds 100}   
             until ((Get-VMIntegrationService $guest | ?{$\_.name \-eq "Heartbeat"}).PrimaryStatusDescription \-ne "OK")  
         }  
  
         Start-Sleep -s 10  
  
         If ($elevated)  
         {  
             Try  
             {  
                 Stop-Service vmms  
                 Write-Host "Stopping the Hyper-V Virtual Machine Management Service..."  
             }  
             Catch  
             {  
                 \[System.Exception\]  
                 Write-Host "Could not stop the Hyper-V Virtual Machine Management Service."  
                 break  
             }  
         }  
         Else  
         {  
             Write-Host "Requires elevation."  
             break  
         }  
  
         Clear-Host  
     }  
}

Usage
=====

Using the scripts requires 1) saving the attached script as <name>.ps1 2) creating source .txt file with virtual machines listed in the preferred start up order.  For example,

Machine1

Machine2

Machine3

3) Saving the script and source .txt file in the same location.

4) Running the script as <name>.ps1 –Operation Start –Source <name>