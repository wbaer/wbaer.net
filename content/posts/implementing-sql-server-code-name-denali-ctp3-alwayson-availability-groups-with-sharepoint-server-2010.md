---
title: 'Implementing SQL Server Code Name “Denali” CTP3 AlwaysOn Availability Groups with SharePoint Server 2010'
date: Thu, 13 Oct 2011 00:38:00 +0000
draft: false
tags: ['Administration', 'AlwaysOn', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010', 'SQL Server Code Name &quot;Denali&quot;']
---

If you attended my SharePoint Conference Session on SharePoint 2010 on SQL Server Denali you’re probably ready to get started with some of the features and capabilities we discussed and demonstrated today, particularly AlwaysOn Availability Groups which provide a robust, ready to use solution supporting both local redundancy and remote disaster recovery.

**NOTE**

SharePoint 2010 is not currently supported on SQL Server Code Name “Denali”.

There are several prerequisites to using AlwaysOn which are documented further at [http://msdn.microsoft.com/en-us/library/ff878487(v=SQL.110)](http://msdn.microsoft.com/en-us/library/ff878487(v=SQL.110)).

**Windows Server Failover Clustering**

While SQL Server Denali does not need to be clustered from a SQL Server perspective, the nodes on which SQL Server Denali is installed should be members of the same WSFC if configuring an AlwaysOn scenario.

**NOTE**

The steps in this post make several assumptions about the SQL Server environment where SQL Server Codename “Denali” will be installed. The steps to install and configure SQL Server Codename “Denali” may differ as a result.

These steps will help you configure AlwaysOn in a SQL Server Code Name “Denali” environment.

**Download SQL Server Code Name “Denali” CTP3**

Download SQL Server Code Name “Denali” CTP 3.

Download [SQL Server Code Name “Denali” CTP3](http://technet.microsoft.com/en-us/evalcenter/hh225126) at the TechNet Evaluations Center.

**Create or Select a Windows Server Failover Cluster**

Choose and existing or create a new Failover Cluster on which each node SQL Server Code Name “Denali” will be installed.

**Install .NET Framework 3.5.1**

On each Windows Server where SQL Server Code Name “Denali” will be installed install the .NET 3.5.1 Features.

1.  Open Server Manager and select the **Features** node.
2.  In the Feature pane select **Add Features**.
3.  Expand .NET Framework 3.5.1 Features and select **.NET Framework 3.5.1**.
4.  Click **Next >** to install the select Features.

**Install SQL Server Code Name “Denali” CTP3**

Install SQL Server Code Name “Denali” CTP3.  For installation instructions see also [Installation for SQL Server ‘Denali’](http://msdn.microsoft.com/en-us/library/bb500469(v=SQL.110).aspx).

**Enable Named Pipes and AlwaysOn High Availability Groups**

Enable Named Pipes and AlwaysOn High Availability Groups.

Enable Named Pipes

1.  Click **Start** | **All Programs** | **Microsoft SQL Server Denali CTP3** | **Configuration Tools** | **SQL Server Configuration Manager**.
2.  Expand SQL Server Network Configuration and then select **Protocols for MSSQLSERVER**.
3.  Right-click Named Pipes and select **Enable** from the list of available options.

**NOTE**

MSSQLSERVER will need to be restarted to commit the changes.

In SQL Server Code Name “Denali” you will need to include the startup option 9532 (TraceFlag 9532) to enable enabling AlwaysOn High Availability Groups.  To configure the required startup option on each Windows Server where SQL Server Code Name “Denali” is installed:

1.  Click **Start** | **All Programs** | **Accessories** | **Command Prompt**.
2.  Enter **NET STOP MSSQLSERVER**.
3.  Enter **NET START MSSQLSERVER /T9532**.

Enable AlwaysOn High Availability Groups

1.  Click **Start** | **All Programs** | **Microsoft SQL Server Denali CTP3** | **Configuration Tools** | **SQL Server Configuration Manager**.
2.  Select **SQL Server Services**.
3.  In the details pane right-click SQL Server (MSSQLSERVER) and select **Properties** from the list of the available options.
4.  Select **AlwaysOn High Availability**, select the checkbox labeled **Enable AlwaysOn Availability Groups** and click **OK**.

**NOTE**

The Windows Failover Cluster Name should appear on the AlwaysOn High Availability dialog.  MSSQLSERVER will need to be restarted to commit the changes.

**Create a Seed or select an existing Database**

Create a seed database.

**NOTE**

At least one database must exist to create a new Availability Group in Step 9 below.  This step is not required when installing SharePoint Server 2010 using DBA created databases.  For information on installing SharePoint Server 2010 using DBA created databases see [Deploy by using DBA-created databases (SharePoint Server 2010)](http://technet.microsoft.com/en-us/library/cc262869.aspx "Deploy by using DBA-created databases (SharePoint Server 2010)").

1.  Click **Start** | **All Programs** | **Microsoft SQL Server Denali CTP3** | **SQL Server Management Studio**.
2.  Right-click the Databases node and select **New Database…**
3.  Enter **Seed** in Database name: and click **OK**.

**Backup the Seed or an existing Database**

Backup the Seed Database

1.  Click **Start** | **All Programs** | **Microsoft SQL Server Denali CTP3** | **SQL Server Management Studio**.
2.  Expand **Databases**.
3.  Right-click Seed and select **Tasks**, and then select **Back Up…**
4.  On the Back Up Database – Seed dialog click **OK**.

**NOTE**

Prior to adding a database to an Availability Group a FULL backup of the database must exist.

**Create a Network Share**

Create a Network Share

A network share must exist and must be accessible by all nodes in the AlwaysOn configuration in order to perform initial data synchronization.

**Create an Availability Group**

Create a new Availability Group

1.  In Object Explorer, connect to the server instance that hosts the primary availability replica, and expand the server tree.
2.  To launch the New Availability Group Wizard, expand the **Management** node, right-click the **Availability Groups** node, and click **New Availability Group**.
3.  On the **Specify Availability Group Name** page, enter the name of the new availability group in the **Availability group name** field. This name must be a valid SQL Server identifier that is unique on the WSFC failover cluster and in your domain as a whole.
4.  On the **Select Databases** page, the **User databases meeting high-availability requirements** grid lists local user databases that are eligible to become the _availability databases_ for the new availability group. Select one or more of the listed databases to participate as _availability databases_ in the availability group. These local availability databases will initially be the _primary databases_ of the new availability group. 
5.  On the **Replicas** tab, the **Selected instances** grid initially displays only the instance of SQL Server to which you are connected. This server instance will host the initial primary replica. To specify the server instance that will host the secondary replica, click **Add**. Note that in CTP3, you must add a single secondary replica now.
6.  Select the desired configuration for each instance in the **Selected instances** grid.
7.  Click Next.
8.  Click Finish to create the Availability Group.
9.  Click Start Data Synchronization to initiate initial data synchronization.

**NOTE**

The following restrictions exist for using the New Availability Group wizard to start data synchronization:

*   If the file paths on the secondary replica location from the file paths on the primary location, click **Close** to exit the New Availability Group wizard now and then start data synchronization manually.
*   If any secondary database already exists, using the New Availability Group wizard to start data synchronization requires manually deleting these secondary databases before you click **Start Data Synchronization**. If want to use your existing secondary databases, click **Close** to exit the New Availability Group wizard now and then start data synchronization manually.
*   If you have clicked **Start Data Synchronization** the **Start Data Synchronization** page opens. This page requires a network share (_backup share_). Either browse for your backup share, or enter its fully qualified universal naming convention (UNC) path name, \\_Systemname__ShareName__Path_, in the **Specify a shared network location for backups** field. Optionally, click **Test** to verify the path.

For each database in the availability group, the **Start Data Synchronization** page displays the progress of the following operations:

1.  Creating a full database backup of the primary database on the network share.
2.  b. Creating a log backup (which will be part of the backup log chain) on the network share.
3.  c. Restoring these backups onto the secondary replica location. These restore operations both use RESTORE WITH NORECOVERY, leaving the new secondary database in the RESTORING state.
4.  d. Joining the secondary database to the availability group. This step puts the secondary database in to the ONLINE state, and starts data synchronization for this database.

**Column**

**Description**

**Replica Location**

Displays the name of the server instance that will host the availability replica.

**Read Mode in Secondary Role**

Specifies whether the availability databases on this replica location will be readable when the availability replica is serving as a secondary replica (performing the secondary role).

Select one of the following values from the drop-down list:

Value Description

**Disallow Connections**No direct connections are allowed to secondary databases of this replica. They are not available for read access.

**Allow Only Read Intent Connections**Only direct read-only connections are allowed to secondary databases of this replica. The secondary database(s) are all available for read access.

**Allow All Connections**All connections are allowed to secondary databases of this replica, but only for read access. The secondary database(s) are all available for read access.

**Initial Role**

Indicates the role that the new replica will initially perform: **Primary** or **Secondary**.

**Create a Client Access Point**

An access point is a name and associated IP address information.  For additional information on Client Access Points in a Failover Cluster see also [Understanding Access Points (Names and IP Addresses) in a Failover.](http://technet.microsoft.com/en-us/library/cc732536.aspx "Understanding Access Points (Names and IP Addresses) in a Failover")  The Client Access Point will be used when configuring SharePoint 2010.

1.  Click **Start** | **Administrative Tools**, and then click **Failover Cluster Manager**.
2.  Expand the cluster.
3.  Expand **Services and Applications**, and select the name of the Availability Group created in the previous steps.
4.  Note that the resource group, AG1, has the same name as the availability group.
5.  In the **Actions** pane click **Add a resource** and select **1 – Client Access Point**.
6.  In the **Client Access Point** dialog specify a name for the network name, and then click **Next**.
7.  In the **Confirmation** dialog box, click **Next**.
8.  In the **Summary** dialog box, click **Finish**.
9.  In the **Summary of AG1** navigation pane, right-click **AG1** under **Other Resources**, and then click **Take this resource offline**.
10.  In the **Please confirm action** dialog box, click **Take AG1 offline**.
11.  Right-click **AG1** and then click **Properties**.
12.  In the **AG1 Properties** dialog box, click the **Dependencies** tab.
13.  Click **Insert**, and then click the drop-down box under the **Resource** column.
14.  In the drop-down list, select the network name, and then click **OK**.
15.  In the **Summary of AG1** navigation pane, right-click **AG1**, and then click **Bring this resource online**.

**Configure SharePoint Server 2010**

Start the SharePoint 2010 Products Configuration Wizard.

Create a new server farm specifying the name of the Client Access Point as the name of the database sever.

**Add Databases to the Availability Group**

1.  In Object Explorer, connect to the server instance that hosts the primary replica of the availability group, and expand the server tree.
2.  Expand the **Management** node, the **AlwaysOn High Availability** node, and the **Availability Groups** node.
3.  Right-click the availability group to which you are adding a database, and select the **Add Database** command. This command launches the Add Database to Availability Group Wizard.
4.  On the **Select Databases** page, select one or more databases.
5.  On the **Select Initial Data Synchronization** page, choose how you want your new secondary databases to be created and joined to the availability group. Choose one of the following options:
6.  · **Full**
7.  In the **Specify a shared network location accessible by all replicas:** field, specify a backup share to which all of the server instance that host replicas have read-write access.
8.  On the **Connect to Existing Secondary Replicas** page, Information\_still\_to\_come.
9.  The **Validation** page verifies whether the values you specified in this Wizard meet the requirements of the New Availability Group Wizard. If the validation changes, you can click **Previous** to return to an earlier wizard page to change one or more values. The click **Next** to return to the **Validation** page, and click **Re-run Validation**.
10.  On the **Summary** page, review your choices for the new availability group. To make a change, click **Previous** to return to the relevant page. After making the change, click **Next** to return to the **Summary** page.
11.  If you are satisfied with your selections, optionally click Script to create a script of the steps the wizard will execute. Then, to create and configure the new availability group, click **Finish**.
12.  The **Progress** page displays the progress of the steps for creating the availability group (configuring endpoints, creating the availability group, and joining the secondary replica to the group).
13.  When these steps complete, the **Results** page displays the result of each step. If all these steps succeed, the new availability group is completely configured. If any of the steps result in an error, you might need to manually complete the configuration. For information about the cause of a given error, click the associated "Error" link in the **Result** column.
14.  When the wizard completes, click **Close** to exit.

Once all databases have been added to one or more Availability Groups the configuration is complete.

**NOTE**

SharePoint 2010 is not currently supported on SQL Server Code Name “Denali”.