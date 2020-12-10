---
title: 'Configuring Trusted File Locations for Excel Services'
date: Wed, 14 Feb 2007 17:16:00 +0000
draft: false
tags: ['Excel Calculation Services', 'Uncategorized']
---

The following information is a reference guide to configuring Trusted File Locations for Excel Calculation Services in **Microsoft Office SharePoint Server 2007**.  Your configuration may vary due to performance and hardware considerations; you should test configuration parameters for performance and scale before application to a production environment.

Open your Shared Services Administration site and select **Trusted file locations** under **Excel Services Settings**.

Click **Add Trusted File Location** to add a new Excel workbook file location considered trustworthy. Trusted file locations can include Windows SharePoint Services Web Applications, network file shares, and web folder addresses. Excel Services will deny requests to open files that are not stored in any trusted location.

**Step 1 Location**

Location settings specify the address of the trusted location, type and scope of trust.

1\. **Address** field, specify the address of the trusted location. In this example we will use the sample Web Application - [**http://fabrikam**](http://fabrikam/).

2\. **Location Type** field, select the storage type of the trusted location, this example uses the sample Web Application – [**http://fabrikam**](http://fabrikam/) and will be configured as a Windows SharePoint Services storage type.

3\. **Children trusted** under **Trusted Children** to trust child libraries or directories, in this example using the [**http://fabrikam**](http://fabrikam/) Web Application all documents from Document Libraries on this server will be rendered as a result of selecting Children trusted.

4\. Provide a **Description** of the purpose of this trusted location. This is not a requirement to configure Excel Services; however, is beneficial for the management and identification of configured trusted locations hosted by the Shared Services Provider.

**Step 2 Session Management**

Session Management settings determine the behavior of Excel Calculation Services sessions using workbooks from the specified trusted location. Configurable settings include session timeouts and request durations.

1\. **Session Timeout** field specify the maximum time in seconds that an Excel Calculation Services session can remain open ad inactive. This value will be dependent on the performance of your environment and server hosting Excel Calculation Services. The default session timeout is **300** seconds. The session timeout is measured from the end of reach request and the session subsequently shut down at the timeout specified. For example an inactive session of 290 seconds will be reset once activity has been resumed or shutdown if it remains inactive after 300 seconds.

2\. **Short Session Timeout** field specify the maximum time in seconds that an Excel Web Access session can remain open and inactive. This setting is similar to the Session Timeout setting, though applies exclusively to Web Access sessions and the duration is measured from the end of the initial Open request. The default session timeout is **75** seconds.

**3\.** Maximum Request Duration field specify the maximum duration in seconds of a single request in a session. The default request duration is **300** seconds.

**Step 3 Workbook Properties**

Workbook property settings specify the behavior of workbooks from the specified trusted location in Excel Calculation Services sessions. Configurable settings include the maximum size of a workbook that can be opened and the maximum chart size in that can be opened by Excel Calculation Services.

1\. **Maximum Workbook Size** field specify the maximum size of a workbook that can be opened by Excel Calculation Services. The default maximum size value is **10**MB.  In our corporate deployments in MSIT we have configured this setting to 100MB on application servers running Windows Server 2003 x64 Edition with 8GB RAM (4 proc).

2\. **Maximum Chart Size** field specify the maximum chart size that can be opened by Excel Calculation Services. Any positive integer can be specified as a value in this field; the default maximum size value is **1**MB.  In our corporate deployments in MSIT we have configured this setting to 10MB on application servers running Windows Server 2003 x64 Edition with 8GB RAM (4 proc).

[![](https://wbaer.officeisp.net/Shared%20Picture%20Library/XLServices.JPG)](https://wbaer.officeisp.net/Shared%20Picture%20Library/XLServices.JPG)

**Step 4 Calculation Behavior**

Calculation behavior settings specify the calculation modes in Excel Calculation Services for workbooks in the trusted location. For most medium-large farms; the default settings are appropriate.

1\. **Volatile Function Cache Lifetime** field specify the value for the maximum time in seconds that a computed value for a volatile function is cached for automatic recalculations. The default maximum volatile function cache lifetime is **300** seconds.

2\. **Workbook Calculation Mode** field specify the calculation mode of workbooks in Excel Calculation Services. **Manual**, **Automatic** and **Automatic except data tables** settings override the workbook settings. The default calculation mode value is **File** which retains the workbook settings. The default workbook calculation mode is **File**.

**Step 5 External Data**

External data settings specify how Excel Calculation Services should handle external data connections in workbooks from the trusted location.

1\. **Allow External Data** field specify external data processing setting. To disable external data connections select the radio button labeled **None**; otherwise, select the radio button(s) labeled **Trusted data connection libraries only** or **Trusted data connections libraries and embedded** to allow connections embedded in workbooks from the trusted location. The default external data connection value is **None**.

2\. **Refresh warning enabled** to display a warning before refreshing external data in workbooks from the trusted location. The default warn on refresh value is **enabled**.

3\. **Stopping open enabled** to stop the open operation on a file from the trusted location when the file contains Refresh on Open data connections and cannot be refreshed when opened or the user does not have an Open right to the file. This setting can be used in conjunction with Warn on Refresh. The default stop when refresh on-open fails value is **enabled**.

4\. **Automatic refresh (periodic / on-open)** field specify the value for the automatic refresh duration in seconds. This setting specifies the time in seconds the system can use external query results. A value should be specified here if external data connections are allowed. The automatic refresh value is **300**.

5\. **Manual Refresh** field specify the value for the manual refresh duration in seconds. This setting specifies the time in seconds the system can use external query results. A value should be specified here if external data connections are allowed. The manual refresh value is **300**.

6\. **Maximum Concurrent Queries Per Session** field specify the value for the number of external data queries that can execute concurrently in a single session. This value can be any positive integer and has a default value of **5** concurrent queries per session.

**Step 6 User-Defined Functions**

1\. **User-defined functions allowed** to permit user-defined functions to be called from workbooks from this trusted location. The default user-defined functions value is **disallowed**.

[![](https://wbaer.officeisp.net/Shared%20Picture%20Library/XLServices2.JPG)](https://wbaer.officeisp.net/Shared%20Picture%20Library/XLServices2.JPG)

Click **OK** to commit the configuration when complete.