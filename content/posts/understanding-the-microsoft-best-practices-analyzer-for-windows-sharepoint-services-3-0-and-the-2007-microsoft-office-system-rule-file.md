---
title: 'Understanding the Microsoft Best Practices Analyzer for Windows SharePoint Services 3.0 and the 2007 Microsoft Office System Rule File'
date: Tue, 17 Apr 2007 13:20:00 +0000
draft: false
tags: ['Best Practices Analyzer', 'Uncategorized']
---

Since my original post [Microsoft Best Practices Analyzer for Windows SharePoint Services 3.0 and the 2007 Microsoft Office System Available!](http://blogs.technet.com/wbaer/archive/2007/02/16/microsoft-best-practices-analyzer-for-windows-sharepoint-services-3-0-and-microsoft-office-sharepoint-server-2007-available.aspx) , I've received several comments and requests for information on how to create custom rule definitions that can be used with the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System. The article below references the basic steps required to create and use custom rule definitions.

The default rule definitions for the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System are contained within sharepointbpa.config.xml.  sharepointbpa.config.xml is available in the directory specified during the installation.

>   

The Object element defines the object to be parsed using the Type element. In the example above, the configuration database connection string is gathered from the Registry key SOFTWAREMicrosoftShared ToolsWeb Server Extensions12.0SecureConfigDBdsn as CONFIG\_DB\_CONN. The connection string is stored in the dsn key as Data Source=;Initial Catalog=;Integrated Security=True;Enlist=False. CONFIG\_DB\_CONN is used for variable substitution when executing T-SQL statements against the configuration database. Variable substitution defines the server name through the command line switch -substitution SERVER\_NAME. 

In the Incoming E-Mail test (below), the connection string is passed to the statement as %CONFIG\_DB\_CONN% and the subsequent statement executed as select count(\*) AS WSS\_INCOMING\_EMAIL from dbo.objects where classid = 'b0bde0e6-6fb0-4f14-a93f-93170dc5b3ed'. This statement returns a numeric value of TRUE = 1 or FALSE = 0. If the result of the statement is less than 1 using the Query attribute value of Windows SharePoint Services 3.0 and the 2007 Microsoft Office System rule file.

>   
>   
>   
>   

The example below is a custom rule definition that verifies the installation of the SQL Server 2005 Reporting Services Web Part Package.

>   
>   
>   

In the above example, I elected to obtain a count of Web Part packages whose title is equal to rswebparts.cab, if the result was less than 1, the rule is instantiated and my custom error definition rendered in the output report file.

Rule definitions can also include Registry checks for specific key values and/or name sets. The example below was taken from the default rule file packaged with the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System.

>   
>   
>   
>   

The Object Type attribute defines the object to be parsed, in this case the Registry. The Key1 attribute is a substitution value that specifies the server name (see above). The attribtute, Key3, defines the path to be checked in the definition. In this example the path SYSTEMCurrentControlSetServicesWSSArpiPerformance is parsed and the Query attribute matches($.,'1') applied to determine the existence of the key value Disable Performance Counters. If the value is present the rule is instantiated and written to the output report file.

>   
>   
>   
>   

In the above example, I elected to return the **Windows SharePoint Services** installation type from the Registry. Using the path SOFTWAREMicrosoftShared ToolsWeb Server Extensions12.0WSSSetupType in the Key3 and Key1 attributes the Query attribute matches($.,'CLEAN\_INSTALL') is applied and returns TRUE a value matching the text CLEAN\_INSTALL, optionally this can be configured to return a result where the text does not match CLEAN\_INSTALL. This is a fairly basic example of using rule definitions, but illustrates the rules definition capabilities that can be applied in the rule definition file.

The Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System can also be used to run checks against XML objects as shown in the example below taken from the default rule file packed with the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System.

>    
>     
>   
> `    $. and $. > 0" Error="Warning" Sev="2" Title="Memory Cache Threshold is too Small" Text="Memory cache threshold is set at {1}%. This threshold, together with the Maximum Private Bytes, determines the amount of caching that Excel Calculation Service within SSP {2} is able to provide. If you set the threshold lower than 30% cache performance is limited. We recommend that you configure this threshold to be greater than 30%." P1="$." S2="%SSP_DB_INSTANCE_NAME%" />`  
>   
>   
>   

Among other object types that can be checked using the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System are FILE, GROUP and METABASE types, the examples below were taken from the default rule file packaged with the Microsoft Best Practices Analyzer for **Windows SharePoint Services 3.0** and the 2007 Microsoft Office System - I'm still experimenting with WMI so stay tuned!

> `       
>          
>          
>            
>            
>          
>       </Object>`

> `       
>          
>          
>          
>            
>            
>              
>              
>            
>          
>       </Object>  
>     </Object>`