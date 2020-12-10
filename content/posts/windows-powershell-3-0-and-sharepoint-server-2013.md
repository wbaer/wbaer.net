---
title: 'Windows PowerShell 3.0 and SharePoint Server 2013'
date: Mon, 12 Nov 2012 20:55:13 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2013', 'SPC219', 'Windows Powershell']
---

SharePoint 2013 includes [Windows Management Framework 3.0](http://www.microsoft.com/en-us/download/details.aspx?id=34595) the as one of the new prerequisites to installation and configuration.  Included in the Windows Management Framework 3.0 is Windows PowerShell 3.0.

Windows PowerShell 3.0 extends upon the usability of Windows PowerShell 2.0 while maintaining backward compatibility with Windows PowerShell 2.0. Windows PowerShell 3.0 includes a number of new capabilities that can help administrators of a SharePoint farm including new session management, Web access, and scheduling capabilities.

Session Management / Disconnected Sessions

New in Windows PowerShell 3.0 is the ability to manage PSSessions on remote machine. In Windows PowerShell 3.0 PSSessions are persisted on the remote machine created using New-PSSession as opposed to being dependent on the session where they were created. You can use the ComputerName parameter with Get-PSSession to return all of the user's session on the machine to include those started within a different session or from a different machine. Connecting to sessions allows you to get the results of commands, start new ones, and disconnect sessions.

You can also disconnect from a session without disrupting the commands running in the session. For example, when executing a command such as Get-SPSite | Get-SPWeb, the session can be closed, the initiating machine powered down and the session reconnected to from another machine. While Windows PowerShell 3.0 maintains backward compatibility with Windows PowerShell 2.0, disconnected sessions are supported when the source and destination machines are both running Windows PowerShell 3.0.

Windows PowerShell Web Access

Windows PowerShell 3.0 also includes new Windows PowerShell Web Access with Windows Server 2012 that enables users to run Windows PowerShell cmdlets and scripts in a Web console on devices even where Windows PowerShell is not installed without the need for remote management software or browser plug-ins. All that is required is a properly-configured Windows PowerShell Web Access gateway and a client device browser that supports JavaScript and accepts cookies.

Scheduled Jobs

Job scheduling allows the scheduling and management of background jobs. Scheduled jobs can be viewed and managed through both Windows PowerShell and Task Scheduler.

Like Windows PowerShell background jobs, scheduled jobs run asynchronously in the background. Instances of scheduled jobs that have completed can be managed by using the job cmdlets, such as Start-Job and Get-Job.

Like Task Scheduler tasks, you can run scheduled jobs on a one-time or recurrent schedule or in response to an action or event. You can view and manage scheduled jobs in Task Scheduler, enable and disable them as needed, run them or use them as templates, and set conditions under which the jobs start.

In addition, scheduled jobs come with a customized set of cmdlets for managing them. The cmdlets let you create, edit, manage, disable, and re-enable scheduled jobs, create scheduled job triggers and set scheduled job options.

For example to execute the SharePoint Translation Services Timer Job Definition on a defined schedule:

Create a new Windows PowerShell Script using the following sample:

> $tj = Get-SPTimerJob "SharePoint Translation Services"
> 
> $tj.Runnow()

Open the Management Shell and enter the following:

> $jobTrigger = New-JobTrigger -Daily -At 3AM
> 
> $jobOption = New-ScheduledJobOption -HideInTaskScheduler
> 
> Register-ScheduledJob -Name "<name>" -FilePath "<drive>:<file>.ps1" -Trigger $jobTrigger -ScheduledJobOption $jobOption
> 
> Register-ScheduledJob -Name "<name>" -FilePath "<drive>:<file>.ps1" -Trigger $jobTrigger -ScheduledJobOption $jobOption

This will schedule a new job that will run daily at 3:00 A.M. with the option that it does not appear in the Task Scheduler.

Resources

[Learn more about SharePoint Server 2013](http://sharepoint.microsoft.com/en-us/Pages/default.aspx)

[Learn more about SharePoint 2013 Hardware and Software Requirements](http://technet.microsoft.com/en-us/library/cc262485(v=office.15))

[Learn more about Windows PowerShell and SharePoint 2013](http://technet.microsoft.com/en-us/sharepoint/jj672838.aspx)

[Learn more about Windows PowerShell](http://technet.microsoft.com/en-us/library/bb978526.aspx)

[Start working with Windows PowerShell and SharePoint with the new Windows PowerShell Command Builder for SharePoint](http://technet.microsoft.com/en-us/sharepoint/jj672838.aspx)