---
title: 'Correlation Ids in SharePoint 2010'
date: Sat, 01 May 2010 14:58:31 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2010']
---

SharePoint 2010 provides the administrator a number of improvements to facilitate rapid problem identification and resolution.  Among these is the implementation of Correlation Ids.  Correlation Ids are GUIDs assigned to events which transpire during the lifecycle of a resource request.  As problems occur, the Correlation Id is commonly surfaced within the context of an error when presented to the person initiating the request or through the [Developer Dashboard](http://blogs.technet.com/wbaer/archive/2009/11/21/welcome-to-the-developer-dashboard.aspx).

**User Interface (error.aspx)**

[![Error](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/CorrelationIdsinSharePoint2010_B4AB/Error_thumb.png "Error")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/CorrelationIdsinSharePoint2010_B4AB/Error_2.png)

**Developer Dashboard**

[![DevDashboard](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/CorrelationIdsinSharePoint2010_B4AB/DevDashboard_thumb.png "DevDashboard")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/CorrelationIdsinSharePoint2010_B4AB/DevDashboard_2.png)

An administrator can then use the Correlation Id to locate and isolate the request in the ULS log, usage logging database, or through SQL Server Profiler.  Correlation Ids also span machine boundaries, so in the event a conversion crosses a machine boundary, such as a Web front-end calling a Web service on an application server, etc., a unique Correlation Id is assigned to the conversation enabling a complete view of the request and what transpired during the operation.

**Using SQL Server Profiler to Track Correlation Ids**

1.  Open SQL Server Profiler.
    1.  Select **Start** | **All Programs** | **Microsoft SQL Server 200x** | **Performance Tools** | **SQL Server Profiler**.
    2.  In SQL Server Profiler select **File** | **New Trace...** and then connect to the appropriate SQL Server instance from the Connect to Server dialog.
    3.  In the Trace Properties dialog specify a name for the trace and click **Run**.

A Correlation Id in SQL Server Profiler is expressed as a RequestGUID and commonly located under the RPC:Starting and SP:Starting events.  In some cases a NULL GUID may be presented, typically this will occur when the executed code is not wrapped within a SPMonitoredScope.  A SPMonitoredScope monitors performance and resource use for a specified scoped block of code.  For additional information on SPMonitoredScope see also [http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.utilities.spmonitoredscope(office.14).aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.utilities.spmonitoredscope(office.14).aspx "http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.utilities.spmonitoredscope(office.14).aspx").

**Using Correlation Ids in the Usage and Health Data Collection Logging Database**

The logging database collects events that have occurred within the system.  For example, suppose you would like to gain additional information on a failed request.  You can execute a query against the RequestUsage table using the example Transact-SQL statement providing the Correlation Id associated with the request.

SELECT \* FROM dbo.RequestUsage WHERE CorrelationId = ‘Insert Correlation Id'

**Using Correlation Ids with Microsoft Excel**

In addition to server-side applications you can also use Microsoft Excel to work with Correlation Ids by copying the text from the required ULS log into Microsoft Excel, and by using Sort and Filter functions can isolate the Correlation Id you are looking to gain additional information about.

**Using Correlation Ids with ULS Viewer**

An improved ULS Viewer can also be used to isolate events by their respective Correlation Id, to learn more visit [http://code.msdn.microsoft.com/ULSViewer](http://code.msdn.microsoft.com/ULSViewer "http://code.msdn.microsoft.com/ULSViewer").

**Windows PowerShell Examples for working with Correlation Ids**

Follow a Correlation Id retrieving a random Correlation Id and returning it to the console with an echo.

$result = Get-SPLogEvent -StartTime (Get-Date).AddMinutes(-5) | select correlationid -first 1  
echo $result

Follow a Correlation Id specifying a unique Correlation Id.

Get-SPLogEvent -StartTime (Get-Date).AddMinutes(-5) | ?{$\_.correlationid -eq “Insert Correlation Id”} | select correlationid, category, level, message | format-table -wrap –autosize

Return all Correlation Ids written in the previous 5 minutes.

Get-SPLogEvent -StartTime (Get-Date).AddMinutes(-5) | select correlationid –unique

For more Get-SPLogEvent examples run Get-Help Get-SPLogEvent –examples.