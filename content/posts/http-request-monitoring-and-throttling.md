---
title: 'HTTP Request Monitoring and Throttling'
date: Thu, 22 Apr 2010 20:17:51 +0000
draft: false
tags: ['SharePoint Foundation 2010', 'SharePoint Server 2010', 'Uncategorized']
---

Last week I covered Managed Accounts in SharePoint Server 2010, this week we’ll cover HTTP Request Monitoring and Throttling - I've been following a lot of conversions surrounding Resource Throttling in SharePoint Server 2010, of which most have focused on the core scenario involving managing large lists; however, there have been a few discussions on HTTP Request Monitoring and Throttling and how that ties in an organizations security architecture or how it can be used to augment it, particularly how it relates to Distributed-Denial of Service (DDoS) attacks.  DDoS attacks are similar in purpose to DoS attacks with the key differentiating characteristic being DDoS attacks involve multiple machines which send repeated requests to a server to load it down and render it inaccessible.

Overview
--------

HTTP Request Monitoring and Throttling is a new feature in SharePoint 2010 that can be used to control resource utilization within your server farm on one or more servers.  HTTP Request Monitoring and Throttling helps prevent a server from running out of resources used to serve existing jobs and high priority user requests such as PUT/POST and is configured on a per-Web application basis.  HTTP Request Monitoring and Throttling monitors a set of performance counters on a server with predefined thresholds shipped out of the box and begins request throttling GET requests when the server is under load exceeding the configured thresholds.

SharePoint 2010 ships with the following HTTP Request Monitoring and Throttling defaults:

**Performance Counter**

**Min**

**Max**

Processor% Processor Time

0

99

MemoryAvailable Mbytes

20

3.402823E+38  

ASP.NETRequests Queued

0

500

ASP.NETRequest Wait Time

0

30000

Performance counters are read every 5 seconds; however, you can configure the interval through Windows PowerShell or the Object Model (see below).  A server enters a throttled state after 3 successive checks have failed, each successive check results in a state.  Initially in 2 warning states, followed by the throttled the state in which the duration is a minimum of 5 seconds.  A server remains in the throttled state until a successful interval has been completed.

So while HTTP Request Monitoring and Throttling is a key capability that can be used to control resource utilization within your server farm and facilitates an optimal user experience it is important to understand that throttling is not designed to provide a barrier against DDoS attacks since throttling occurs only after authentication, and once a request passes authentication, it is always trusted.

To be more precise, throttling is invoked as requests (HTTP) leave the ASP.NET Request Queue and prior to the thread being constructed to manage the request.  So as a request leaves the request queue we call a method which retrieves the state of one or more servers in the topology, and returns a value that corresponds to the “load” of the server – the requests that fall below the priority of the monitor are rejected, with each core scenario handling the request uniquely.

As mentioned above, each core scenario in SharePoint prompts a unique response when the request queue is loaded, for example, for incoming HTTP requests – a throttled state will result in the user begin presented with a 503 Server is Busy (HTTP requests are not queued, the user will need to refresh their page request when in a throttled state).

Scenarios respond differently to a throttled state, with Timer Jobs – throttling occurs in response to the server busy status.  Timer Jobs that have been executed prior to the server entering a throttled state will continue to be executed through their completion; however, any new resource consuming Timer Jobs will not be executed while the server is in a throttled state.

Search is the last common scenario when we think about the interaction between users and SharePoint.  Search will compete with incoming HTTP requests for resource time; however, is placed in a lower priority queue.  Search is typically more demanding an operation than a simple HTTP request so throttling in this scenario occurs depending the state of the request queue.

To understand the request type, SharePoint uses the UserAgent field in the HTTP Header and classifies the request as robot HTTP, user HTTP, Office client application, SOAP robot, or SOAP user.

Configuring HTTP Request Monitoring and Throttling
--------------------------------------------------

**Enable/Disable HTTP Request Monitoring and Throttling (Windows PowerShell)**

HTTP Request Monitoring and Throttling can be enabled or disabled through Windows PowerShell.  The example below illustrates in Windows PowerShell how to disable HTTP Request Monitoring and Throttling, optionally, you could use $True to enable HTTP Request Monitoring and Throttling.

$uri\=new-object System.Uri("[http://www.contoso.com")](http://www.contoso.com"))  
$webApp\=\[Microsoft.SharePoint.Administration.SPWebApplication\]::Lookup($uri)  
$httpThrottleSettings\=$webApp.HttpThrottleSettings  
$httpThrottleSettings.PerformThrottle=$False  
$httpThrottleSettings.Update()

**Enable Disable HTTP Request Monitoring and Throttling (Central Administration)**

In addition to Windows PowerShell, HTTP Request Monitoring and Throttling can be enabled and disabled through Central Administration.

1.  In SharePoint 2010 Central Administration click **Web application management** under Application Manage.
2.  Select the Web application to configure from the list of available Web applications on the Web Applications Management Page.
    1.  On the Ribbon select **Resource Throttling** under General Settings.
    2.  On the Resource Throttling page click **On** under HTTP Request Monitoring and Throttling.
    3.  Click **OK** to save your changes.

**Edit a HTTP Request Monitoring and Throttling Threshold (Windows PowerShell)**

Thresholds, either out of the both or user created can be configured through Windows PowerShell.  In this example, the CPU utilization threshold is decreased to 75%.

NOTE

Thresholds cannot be configured through Central Administration.

$uri\=new-object System.Uri("[http://www.contoso.com")](http://www.contoso.com"))  
$webApp\=\[Microsoft.SharePoint.Administration.SPWebApplication\]::Lookup($uri)  
$httpThrottleSettings\=$webApp.HttpThrottleSettings  
$cpu\=$httpThrottleSettings.PerformanceMonitors\[0\]  
$cpu.MaxValue\=75  
$httpThrottleSettings.Update()

The following example illustrates how the same can be acheived as the above example using the built-in Set-SPWebApplicationHttpThrottlingMonitor.

Set-SPWebApplicationHttpThrottlingMonitor \-Identity [http://www.contoso.com](http://www.contoso.com) \-Category "Processor" \-Counter "%  
Processor Time" \-Instance "\_Total" \-MaxThreshold 75 \-MinThreshold 0

HTTP Request Monitoring and Throttling can be enabled through either Windows PowerShell, Central Administration, or the Object Model; however, to configure existing counters or extend the scope of HTTP Request Monitoring and Throttling you must use Windows PowerShell or the Object Model (see more below).

Windows PowerShell or the Object Model can be used to configure:

Refresh Interval

The Refresh Interval specifies the amount of time between successive counter samples.

Performance Monitors

Performance Monitors specify the counters associated with HTTP Request Monitoring and Throttling when the server is under load.  For example Process% Processor Time.

PerfomThrottle

PerformThrottle specifies the boolean value to enable or disable HTTP Request Monitoring and Throttling.  (See above for Windows PowerShell and Central Administration configuration points.)

ThrottleClassifiers

ThrottleClassifiers specifies the set of rules that classify requests, for example, a classifier to throttle PUT requests and a separate classifier to never throttle POST requests.

**Add a new HTTP Request Monitoring and Throttling Counter**

Adding a new HTTP Request Monitoring and Throttling counter with Windows PowerShell is a process similar to editing an HTTP Request Monitoring and Throttling threshold as shown in the steps above.

In this example we’ll add a new counter that configures a new counter for PhysicalDisk% Disk Time.

$uri \= new-object System.Uri("[http://www.contoso.com")](http://www.contoso.com"))  
$webApp\=\[Microsoft.SharePoint.Administration.SPWebApplication\]::Lookup($uri)  
$httpThrottleSettings\=$webApp.HttpThrottleSettings  
$httpThrottleSettings.AddPerformanceMonitor("PhysicalDisk", "% Disk Time", "\_Total", 80, 0)  
$httpThrottleSettings.Update()

Extending Core Capabilities and Coverage
----------------------------------------

Both extending and configuring HTTP Request Monitoring and Throttling in most cases is a simple task, throttling counters can be added through Windows PowerShell as shown above or you can use the Object Model for more complex scenarios.  Since HTTP Request Monitoring and Throttling is also extensible that means you can develop a scenario-focused system for monitoring Windows Server 2008 performance counters and for throttling HTTP requests when those counters indicated that a worker process is too busy to handle all the requests that it is receiving.  The majority of classes you’ll need to begin developing your own system are contained within the Microsoft.SharePoint.Utilities namespace, you’ll find more documentation on this namespace and the classes it contains here [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.utilities(office.14).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.utilities(office.14).aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.utilities(office.14).aspx").

Troubleshooting
---------------

With HTTP Request Monitoring and Throttling, it is important to understand what occurred that caused the server to enter a throttled state to prevent future occurrences or adjust the throttling levels.  When a performance monitor exceeds its value, and a throttled state is entered, SharePoint collects a variety of diagnostic information to determine why a particular value was exceeded – this information can include reporting throttled requests to include corresponding SQL requests, etc.

The most common locations you’ll find diagnostic information related to HTTP Request Monitoring and Throttling are the server Application Event Logs and the ULS logs.

To view the collection of counters and their corresponding values you can use the Get-SPWebApplicationHttpThrottlingMonitors CmdLet, and conversely to configure counters you can use the Set-SPWebApplicationHttpThrottlingMonitors CmdLet.

For additional information on the Get- and Set-SPWebApplicationHttpThrottlingMonitors run Get-Help Get- or Set-SPWebApplicationHttpThrottlingMonitors in the SharePoint 2010 Management Shell.