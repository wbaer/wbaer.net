---
title: 'Quick Steps to Diagnose Performance Issues in SharePoint 2010'
date: Mon, 04 Oct 2010 21:21:39 +0000
draft: false
tags: ['Administration', 'Performance', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

**Make the most of the Developer Dashboard**

**_Monitoring Latency and SQL Server Round Trips_**

Among the information provided through the Developer Dashboard is information about page latency and database queries surfaced under Execution Timeout in the user interface in the Web Server section. Using the information provided in this field you can determine whether or not a recently introduced feature or particular page is exceeding acceptable performance thresholds in your environment. As an example, general performance guidance dictates a single round trip for a typical page in addition to a single round trip per Web Part on the page. Wiki and layout pages will result in higher overall roundtrips when compared to a typical page at 2 to 2-3 roundtrips respectively. The Web Part round trip metric applies equally at 1 round trip per Web Part.

Latencies exceeding .5 seconds should also be considered suspect when your investigating possible performance issues. The most useful information when attempting the diagnose higher than expected latency is located under the Show or hide additional tracing information link.

Developers seeking to monitor the performance characteristics and resource usage of their custom code can wrap their code with a SPMonitoredScope.

Custom pages can also leverage the developer dashboard through simply adding the required controls.  The first control renders the launch icon to enable the developer dashboard OnDemand.  The second control specified where on the page the Developer Dashboard will render and the final control is responsible for capturing all of the operations occurring during the rendering of the page, with that said it is important to ensure that this control is at the top of the page.  To learn more about the Developer Dashboard see also [Welcome to the Developer Dashboard](http://blogs.technet.com/b/wbaer/archive/2009/11/21/welcome-to-the-developer-dashboard.aspx "Welcome to the Developer Dashboard").

  <Sharepoint:DeveloperDashboardLauncher  
        ID="DeveloperDashboardLauncher"  
        NavigateUrl="BLOCKED SCRIPTToggleDeveloperDashboard()"  
        runat="server"  
        ImageUrl="/\_layouts/images/fgimg.png"  
        Text="<%$Resources:wss,multipages\_launchdevdashalt\_text%>"  
        OffsetX=0  
        OffsetY=78  
        Height=16  
        Width=16 />

<div id="DeveloperDashboard" class="ms-developerdashboard" />

<SharePoint:DeveloperDashboard runat="server" />

**Make the most of the SharePoint Health Analyzer**

**_Identify Server Configuration Issues_**

As you investigate possible performance issues in your environment a quick and simple check to determine the potential cause of issues is to check the SharePoint Health Analyzer through SharePoint 2010 Central Administration to determine whether or not environmental or configuration issues are causing the problem.

**Make the most of ULS**

**_Error Handling_**

Correlation Ids are perhaps the single most improved feature in SharePoint 2010. Correlation Ids allow you to quickly isolate additional information about issues occurring in your environment in the ULS logs.

**Additional Tools**

Visual Round Trip Analyzer

[http://www.microsoft.com/downloads/en/details.aspx?FamilyID=119f3477-dced-41e3-a0e7-d8b5cae893a3&DisplayLang=en](http://www.microsoft.com/downloads/en/details.aspx?FamilyID=119f3477-dced-41e3-a0e7-d8b5cae893a3&DisplayLang=en "http://www.microsoft.com/downloads/en/details.aspx?FamilyID=119f3477-dced-41e3-a0e7-d8b5cae893a3&DisplayLang=en")

Bottleneck Detection Counters

[http://msdn.microsoft.com/en-us/library/ms804032.aspx](http://msdn.microsoft.com/en-us/library/ms804032.aspx "http://msdn.microsoft.com/en-us/library/ms804032.aspx")