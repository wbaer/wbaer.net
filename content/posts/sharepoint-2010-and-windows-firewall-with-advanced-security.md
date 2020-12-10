---
title: 'SharePoint 2010 and Windows Firewall with Advanced Security'
date: Fri, 02 Sep 2011 19:21:33 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010', 'Windows Firewall', 'Windows Firewall with Advanced Security']
---

I’ve recently noticed a number of posts on social.msdn.com related to configuring SharePoint 2010 with Windows Firewall with Advanced Security. The following post provides the basic steps necessary to get started with provisioning a SharePoint 2010 server farm in environments where the Windows Firewall is enabled.

To access an instance of the SQL Server through a firewall, you must configure the firewall on the computer that is running SQL Server to allow access.

**Step 1 Create an Inbound Rule for SQL Server Database Engine**

Create a new Inbound rule for the SQL Server Database Engine. In default installations this port is TCP 1433.

**Using Windows Firewall with Advanced Security Microsoft Management Console**

To create a new Inbound rule open Windows Firewall with Advanced Security by clicking **Start**, **Run…**, and then enter **WF.msc** in the Run dialog and click **OK**.

On the Windows Firewall with Advanced Security Microsoft Management Console window, select **Inbound Rules**, and then select **New Rule…** from the Action Pane.

On the New Inbound Rule Wizard on the Rule Type dialog from the list of available options select **Port**, and then click **Next >**.

On the Protocol and Ports dialog from the list of available options select **TCP**, enter **1433** in the Select local ports: input box, and then click **Next >**.

On the Action dialog from the list of available options select **Allow the connection**, and then click **Next >**.

On the Profile dialog from the list of available options select **Domain**, **Private**, and **Public**, and then click **Next >**.

On the Name dialog enter **SQL Server Database Engine** in the Name: input box, and optionally enter a description in the Description (optional): input box, and then click **Finish**.

Suggested text for the Description (optional): input box:

The Database Engine is the core service for storing, processing, and securing data. The Database Engine provides controlled access and rapid transaction processing to meet the requirements of the most demanding data consuming applications within your enterprise.

**Using Netsh Commands**

Open a Command Prompt by clicking **Start**, **Run…**, and then enter **cmd** in the Run dialog and click **OK**.

Enter **netsh advfirewall firewall add rule name = “SQL Server Database Engine” description = “The Database Engine is the core service for storing, processing, and securing data. The Database Engine provides controlled access and rapid transaction processing to meet the requirements of the most demanding data consuming applications within your enterprise.” dir = in protocol = tcp action = allow localport = 1433 remoteip = localsubnet profile = ALL** in the Command Prompt and press **Enter**.

**Step 2 Create an Inbound Rule for SQL Server Browser Service**

Create a new Inbound rule for the SQL Server Browser Service. In default installations this port is UDP 1434.

**Using Windows Firewall with Advanced Security Microsoft Management Console**

To create a new Inbound rule open Windows Firewall with Advanced Security by clicking **Start**, **Run…**, and then enter **WF.msc** in the Run dialog and click **OK**.

On the Windows Firewall with Advanced Security Microsoft Management Console window, select **Inbound Rules**, and then select **New Rule…** from the Action Pane.

On the New Inbound Rule Wizard on the Rule Type dialog from the list of available options select **Port**, and then click **Next >**.

On the Protocol and Ports dialog from the list of available options select **UDP**, enter **1434** in the Select local ports: input box, and then click **Next >**.

On the Action dialog from the list of available options select **Allow the connection**, and then click **Next >**.

On the Profile dialog from the list of available options select **Domain**, **Private**, and **Public**, and then click **Next >**.

On the Name dialog enter **SQL Server Browser Service** in the Name: input box, and optionally enter a description in the Description (optional): input box, and then click **Finish**.

Suggested text for the Description (optional): input box:

The SQL Server Browser program runs as a Windows service. SQL Server Browser listens for incoming requests for Microsoft SQL Server resources and provides information about SQL Server instances installed on the computer.

**Using Netsh Commands**

Open a Command Prompt by clicking **Start**, **Run…**, and then enter **cmd** in the Run dialog and click **OK**.

Enter **netsh advfirewall firewall add rule name = “SQL Server Browser Service” description = “The SQL Server Browser program runs as a Windows service. SQL Server Browser listens for incoming requests for Microsoft SQL Server resources and provides information about SQL Server instances installed on the computer.” dir = in protocol = udp action = allow localport = 1434 remoteip = localsubnet profile = ALL** in the Command Prompt and press **Enter**.

**Step 3 Enable Named Pipes on the SQL Server Instance**

Enabling Named Pipes will allow the provisioning of a new server farm using the SharePoint 2010 Products and Configuration Wizard. A named pipe is a named, one-way or duplex pipe for communication between the pipe server and one or more pipe clients and is used to provide communication between processes on the same computer or between processes on different computers across a network.

Open SQL Server Configuration Manager by clicking **Start**, **All Programs**, **Microsoft SQL Server 2008** (or Microsoft SQL Server 2008 R2), **Configuration Tools**, **SQL Server Configuration Manager**.

Select **Protocols for MSSQLSERVER** under SQL Server 2008 Network Configuration.

Right-click **Named Pipes** and select **Enable** from the list of available options.

Restart the MSSQLSERVER service to commit the change.

Open a Command Prompt by clicking **Start**, **Run…**, and then enter **cmd** in the Run dialog and click **OK**.

Enter **net stop mssqlserver** in the Command Prompt and press **Enter**.

Enter **net start mssqlserver** in the Command Prompt and press **Enter**.

To enable Named Pipes using Windows PowerShell see also http://msdn.microsoft.com/en-us/library/dd206997.aspx.

**Step 4 Create new Inbound Rules for Optional Services**

For additional services, such as Analysis Services, see also http://msdn.microsoft.com/en-us/library/cc646023.aspx.

To learn more about Windows Firewall with Advanced Security see also http://www.microsoft.com/download/en/details.aspx?displaylang=en&id=19192.

**Step 5 Export and Reuse the Firewall Policy**

To configure additional SQL Server database servers you can export the rule set configured on the initial SQL Server and apply that set to any additional SQL Server database servers to be configured.

To export a firewall policy you can use the Windows Firewall with Advanced Security Microsoft Management Console or Netsh commands.

**Using Windows Firewall with Advanced Security Management Console**

Open Windows Firewall with Advanced Security by clicking **Start**, **Run…**, and then enter **WF.msc** in the Run dialog and click **OK**.

On the Windows Firewall with Advanced Security Microsoft Management Console window, select **Export Policy…** from the Action Pane.

On the Save As dialog specify a location to save the policy file and file name.

On the Windows Firewall with Advanced Security Microsoft Management Console window, select **Import Policy…** from the Action Pane.

On the Windows Firewall with Advanced Security prompt click **Yes** to import a policy.

**NOTE**

Importing a policy will overwrite the current Windows Firewall with Advanced Security policy.

On the Open dialog, browse to the location of the policy file and click Open.

**Using Netsh Commands**

Open a Command Prompt by clicking **Start**, **Run…**, and then enter **cmd** in the Run dialog and click **OK**.

Enter **netsh** in the Command Prompt and press **Enter**.

In the netsh context enter **advfirewall** in the Command Prompt and press **Enter**.

To export the current firewall policy enter **netsh advfirewall export “C:Users<user>DocumentsPolicy.wfw**”.

To import the firewall policy enter **netsh advfirewall import “C:Users<user>DocumentsPolicy.wfw”**.

Running the SharePoint 2010 Products Configuration Wizard should now enable the provisioning of a new server farm.