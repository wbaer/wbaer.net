---
title: 'Setting up a SharePoint 2013 Development Environment 101'
date: Thu, 11 Oct 2012 00:10:40 +0000
draft: false
tags: ['Administration', 'SharePoint', 'SharePoint Server 2013', 'Virtualization']
---

**Step 1 Prepare the Operating Environment**

Preparation of your development environment is determined by the apps you will develop and the systems you have access to.  If you want to distribute apps for SharePoint through an app catalog, such as apps for SharePoint will full control permissions, a local installation of SharePoint 2013 is required; otherwise an Office 365 Development Site can be used. 

**NOTE**

Apps for SharePoint will full control permissions are not supported on an Office 365 site.

To learn more about Apps for SharePoint see [Apps for SharePoint overview](http://msdn.microsoft.com/en-us/library/office/apps/fp179930(v=office.15)).

\---------------------------------------

This article provides the necessary steps to setup and configure a local installation of SharePoint 2013 and begin developing apps.

SharePoint 2013 products cannot be directly installed on a client operating system such as Windows 7 or Windows 8; however, building and configuring a development environment on a client operating system such as Windows 8 that supports Hyper-V is supported.  Where access to a development environment is not available that supports local development you can use an Office 365 Development Site.  An Office 365 Developer Site is preconfigured for app isolation and OAuth, and enables you to develop on any computer and operating system on which you can install Visual Studio 2012.

See [How to: Set up an environment for developing apps for SharePoint on Office 365](http://msdn.microsoft.com/en-us/library/fp161179(v=office.15).aspx) for instructions on how to setup an Office 365 Developer Site.

The following options are available to deploying a development environment:

*   Install SharePoint on Windows Server 2008 R2 Service Pack 1 x64 (or Windows Server 2012).
*   Use Microsoft Hyper-V or a [SVVP validated](http://www.windowsservercatalog.com/svvp/) hypervisor and install SharePoint on a virtual machine running a Windows Server 2008 R2 Service Pack 1 x64 or Windows Server 2012 guest operating system.

Installation of SharePoint 2013 is supported only on Windows Server 2008 R2 Service Pack 1 or Windows Server 2012. If you want to develop apps for SharePoint for SharePoint 2013 on Windows 7, you can sign up for an Office 365 Developer Site and develop apps remotely. See [How to: Set up an environment for developing apps for SharePoint on Office 365](http://msdn.microsoft.com/en-us/library/fp161179(v=office.15).aspx).

If you’d like to perform Windows Azure Workflow based development you’ll need to install SharePoint 2013 and any domain controllers on separate servers, Windows Azure Workflow service cannot be installed on a domain controller. 

Where developing for Office Web Apps 2013 an additional server will be required to run Office Web Apps.

**Step 2 Install Hyper-V Features on Windows 8  
**Before virtual networks and machines can be created to host SharePoint 2013, Hyper-V features must be installed on Windows 8. To install Hyper-V Features on Windows 8:

1.  Navigate to **Control Panel** | **Programs** | **Programs and Features** and select **Turn Windows features on or off**
2.  On the Windows Features dialog select **Hyper-V** from the list of available options (this will install the Hyper-V Management Tools and Hyper-V Platform).

**Step 2.1 Create a Virtual Network**    
Hyper-V enables the configuration of complex virtual network environments; however, the basic concept of virtual networking is straightforward.  Virtual networks are similar to physical networks with the exception of the physical network switch which in virtual networks is implemented in software.  Ports are added or removed as they are needed when virtual machines are connected to or disconnected from a virtual network.

The Virtual Network Manager provides three distinct virtual network configurations to define various network topologies for virtual machines and the virtualization server.  These configurations include External, Internal, and Private virtual networks.

External Virtual Networks

External virtual networks provide virtual machines with access to the physical network to communicate with external servers and clients, such as domain controllers, etc.  External virtual networks also enable virtual machines on the same virtualization server to communicate with each other.  An external virtual network may also be made available for use by the management operating system.

**NOTE**

If you’re using Windows Server 2008 R2 as your management operating system on your virtualization server, wireless networks are not supported.  An external virtual network provides access to a physical network through a wired physical network adapter. Wireless networks with Hyper-V are supported in Windows 8 and Windows Server 2012 operating systems.

Internal Virtual Networks    
Internal virtual networks enable communication between virtual machines on the same virtualization server and between the virtual machines and the management operating system.  Internal virtual networks are most commonly used to build test environments where virtual machines need be to connected to from the management operating system.  Internal virtual networks are not bound to a physical network adapter, as a result are isolated from all external network traffic.  When developing apps for SharePoint you should at minimum have one external virtual network available for Internet access.

Private Virtual Networks    
Private virtual networks enable communication only between virtual machines on the same virtualization server, and like Internal virtual networks are not bound to a physical network adapter.  Private virtual networks are isolated from all external network traffic on the virtualization server, as well any network traffic between the management operating system and the external network.  Private virtual networks are recommended only when you need to create an isolated networking environment, such as an isolated test domain.

Prior to creating your virtual machines, you will need to setup virtual networks to enable access to the Internet and communication between each other.

The following steps will guide you through creating an Internal and External virtual network.

1.  In Hyper-V Manager, in the Actions pane, click **Virtual Network Manager**. Virtual Network Manager opens.
2.  First, create a virtual network that virtual machines can use to connect to the Internet:
3.  In the list of virtual networks, click **External**, and then click **Add**.
4.  In the Name box for the new virtual network, change the name to **External Network**.
5.  If you have more than one network adapter installed in the virtualization server, in the list of external network adapters, click the network adapter that you want your virtual machines to use.
6.  To create the new virtual network, click **Apply**. If the Apply Network Changes dialog box appears, review the warning information, and then click **Yes**.
7.  Next, create a virtual network that the virtual machines and the virtualization server can use to share files:
8.  In the left navigation pane, click **New virtual network**.
9.  In the list of virtual networks, click **Internal**, and then click **Add**.
10.  In the Name box for the new virtual network, change the name to **Internal Network**.
11.  To create the new virtual network, click **Apply**.
12.  To close Virtual Network Manager, click **OK**.

[![Drawing1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3051.Drawing1_thumb_52D37CA5.png "Drawing1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4628.Drawing1_4C207322.png)

**NOTE**

If you want to review detailed information about virtual networks in Hyper-V, see [Configuring Virtual Networks in the Hyper-V Planning and Deployment Guide](http://go.microsoft.com/fwlink/?LinkID=131362).

**Step 2.3 Create Virtual Machines**

The number of virtual machines needed to support your development environment depends on the type development you’ll be performing:

If developing customizations for Office Web Apps 2013 you’ll need a separate server to host Office Web Apps.  Office Web Apps 2013 cannot be installed on the same server where SharePoint 2013 is installed. 

If Windows Azure Workflow is a dependency you’ll need a separate server to host Windows Azure Workflow service.  Windows Azure Workflow service cannot be installed on a domain controller.

The New Virtual Machine Wizard provides you with a simple and flexible way to create a virtual machine. The New Virtual Machine Wizard is available from Hyper-V Manager.

When you use the wizard, you have two basic options for creating a virtual machine:

You can use default settings to create a virtual machine without proceeding through all the configuration pages of the wizard. This type of virtual machine is configured as follows:

Name

New Virtual Machine

Location

Default location configured on the virtualization server

Memory

512 MB

Network Connection

Not Connected

Virtual Hard Disk

Dynamically Expanding (127GB)

Installation Options

No media specified

SCSI Controller

No disks connected

You can use settings that you specify on the configuration pages to create a virtual machine that is customized for your needs.

To create a customized virtual machine:

1.  Open Hyper-V Manager. Click **Start**, point to **Administrative Tools**, and then click **Hyper-V Manager**.
2.  From the Action pane, click **New**, and then click **Virtual Machine**.
3.  Proceed through the pages of the wizard to specify the custom settings that you want to make. You can click **Next** to move through each page of the wizard, or you can click the name of a page in the left pane to move directly to that page.
4.  After you have finished configuring the virtual machine, click **Finish**.

Additional Considerations  
By default, membership in the local Administrators group, or equivalent, is the minimum required to complete this procedure.

You can customize the settings on as many or as few pages of the New Virtual Machine Wizard as you want, and then click Finish to complete the process. Default values are used for any pages that you did not customize before completing the wizard.

For virtual machine sizing information see also [Hardware and software requirements for SharePoint 2013](http://technet.microsoft.com/en-us/library/cc262485(v=office.15).aspx).

Regardless of which method that you use to create a virtual machine, you can change the configuration later by modifying the virtual machine settings.

**Step 2.4 Install and Operating System and Integration Services**  
SharePoint 2013 supports Windows 2008 R2 Service Pack 1 x64 and Windows Server 2012 operating systems.

A guest operating system is the operating system that you install and run in a virtual machine. Before you can install the guest operating system, if you did not specify the location of the installation media when you created the virtual machine, you will need to perform one of the following steps:

Obtain the installation media for the operating system and configure the virtual machine to use the CD/DVD drive to access the installation media. If you want to perform a network-based installation, configure the virtual machine to use a legacy network adapter that is connected to an external virtual network. This type of network provides connectivity to a physical network by routing traffic through an external virtual network to a physical network adapter.

*   [Evaluate Windows Server 2008 R2 with Service Pack 1](http://technet.microsoft.com/en-us/evalcenter/dd459137.aspx)
*   [Evaluate Windows Server 2012](http://technet.microsoft.com/en-US/evalcenter/hh670538.aspx?ocid=&wt.mc_id=TEC_108_1_33)

After you have configured the virtual machine appropriately, you can install the guest operating system.

To install the guest operating system:

1.  Open Hyper-V Manager. Click **Start**, point to **Administrative Tools**, and then click **Hyper-V Manager**.
2.  Connect to the virtual machine. From the Virtual Machines section of the results pane, using one of the following methods:    Right-click the name of the virtual machine and click Connect or Select name of the virtual machine. In the Action pane, click **Connect**.
3.  The Virtual Machine Connection tool opens.
4.  From the Action menu in the Virtual Machine Connection window, click **Start**.
5.  The virtual machine starts, searches the startup devices, and loads the installation package.
6.  Proceed through the installation.

To install integration services:

1.  Connect to the virtual machine. From the Virtual Machines section of the results pane, using one of the following methods:   Right-click the name of the virtual machine and click Connect or Select the name of the virtual machine. In the Action pane, click **Connect**.
2.  The Virtual Machine Connection tool opens.
3.  From the Action menu of Virtual Machine Connection, click **Insert Integration Services Setup Disk**. This action loads the setup disk in the virtual DVD drive.
4.  Depending on the operating system being installed, you may need to start the installation manually. Click anywhere in the guest operating system window and navigate to the CD drive. Use the method that is appropriate for the guest operating system to start the installation package from the CD drive.
5.  After the installation finishes, all integration services are available for use.  
    

> **NOTE**
> 
> The use of Virtual Machine Connection within a Remote Desktop Services session is not supported unless integration services are installed.

**Step 3 Install SharePoint 2013 Products**  
Before you begin installation, make sure that you have met all hardware and software requirements. For more information, see [Hardware and software requirements for SharePoint 2013](http://technet.microsoft.com/en-us/library/cc262485(v=office.15).aspx).  For installation guidance see [Install SharePoint 2013](http://technet.microsoft.com/en-US/library/cc303424(v=office.15).aspx).

*   [Evaluate SharePoint Server 2013](http://technet.microsoft.com/en-us/evalcenter/hh973397.aspx)

**NOTE**  
A domain is required to deploy SharePoint Server 2013.  If you do not have an isolated virtual domain available to deploy SharePoint Server 2013, you must create a virtual domain on a Hyper-V that is configured to use the following:

*   A domain controller with Active Directory Domain Services (AD DS)
*   A domain controller with a DNS server
*   You can deploy SharePoint Server on a domain controller; however, this scenario is not supported in production environments.

**Step 4 Install Development Tools**

**Step 4.1 Install Visual Studio 2012**    
Install Visual Studio 2012 from your installation media or optionally start installing Visual Studio by visiting the Visual Studio Downloads on the MSDN website and then choosing the edition you want to download.  For additional information on installing Visual Studio 2012 refer to the Visual Studio Administrators Guide ([http://msdn.microsoft.com/en-us/library/ee225238.aspx)](http://msdn.microsoft.com/en-us/library/ee225238.aspx)).  

**NOTE**

If you run Windows Server 2008 R2 with Hyper-V enabled and an accelerated graphics adapter, you may experience system slowdowns. This may affect customers who want to use the graphics-rich Visual Studio 2012 environment while they use Hyper-V for testing.  To avoid these slowdowns, you can ensure that the system supports a feature known as "Nested Page Tables" (AMD), "Rapid Virtualization Indexing" (AMD), or "Extended Page Tables" (Intel). This feature is present on AMD Phenom and Opteron processors, and on Intel Nehalem processors (Core i7 series, Xeon 5500 series). The processor feature is the preferred option because it enables full graphics performance and functionality without system slowdowns.

For more information, see also [Video performance may decrease when a Windows Server 2008 or Windows Server 2008 R2 based computer has the Hyper-V role enabled and an accelerated display adapter installed](http://support.microsoft.com/kb/961661).

**Step 4.2 Install Office and SharePoint Development Tools**

1.  [Download and install Office and SharePoint Development Tools](http://go.microsoft.com/fwlink/?LinkID=261869) or if you have installed Visual Studio 2012:
2.  In Control Panel, on the Programs and Features page, choose the product edition to which you want to add one or more components, and then choose **Change**.
3.  In the Setup wizard, choose **Modify**, and then choose the **Office and SharePoint Development Tools** to install.
4.  Choose **Next**, and then follow the remaining instructions.

**Step 4.3 SharePoint Server 2013 Client Components SDK**  
Download and install the SharePoint Server 2013 Client Components SDK from [http://www.microsoft.com/en-us/download/details.aspx?id=30355](http://www.microsoft.com/en-us/download/details.aspx?id=30355). The SharePoint Server 2013 Client Components SDK can be used to enable remote and local development with SharePoint Server 2013.

**Step 4.4 Install Apps For SharePoint**  
Download and install Apps for SharePoint from [http://technet.microsoft.com/en-us/evalcenter/hh973397](http://technet.microsoft.com/en-us/evalcenter/hh973397).

**Step 4.5 Configure an Isolated App Domain**  
If you want to create and deploy SharePoint-hosted apps on your SharePoint 2013 installation, you must create an isolated domain on the developer workstation where your apps for SharePoint will run. Your SharePoint 2013 installation needs a general wildcard host header domain where it can provision SharePoint-hosted apps.

This domain should be a URL namespace that you reserve as a namespace for organizing apps.

Perform the steps in the following procedure to create an isolated app domain.

Start the SPTimer and Admin Services

Open the SharePoint 2013 Management Shell and run the following commands:

NET START SPAdminV4  
NET START SPTimerV4

Create an Isolated App Domain 

Open the SharePoint 2013 Management Shell and run the following commands:   Set-SPAppDomain "App Domain"

Ensure the SPSubscriptionSettingsService and AppManagementServiceInstance are available.

Open the SharePoint 2013 Management Shell and run the following command:  Get-SPServiceInstance | where{$\_.GetType().Name -eq "AppManagementServiceInstance" -or $\_.GetType().Name -eq "SPSubscriptionSettingsServiceInstance"} | Start-SPServiceInstance

You must specify an account under which the SPSubscriptionService and AppManagementServiceInstance service instances will run. This account must be a SPManagedAccount. You can create an SPManagedAccount by typing the following command in the SharePoint Management Shell.

Open the SharePoint 2013 Management Shell and following the steps below:  
$account = New-SPManagedAccount

Specify an account, application pool, and database settings for the SPSubscriptionService and AppManagementServiceInstance services by typing the following code in the SharePoint Management Shell. If you created a SPManagedAccount in the preceding step, use that account name here.

> $account = Get-SPManagedAccount "domainuser"  
> $appPoolSubSvc = New-SPServiceApplicationPool -Name SettingsServiceAppPool -Account $account  
> $appPoolAppSvc = New-SPServiceApplicationPool -Name AppServiceAppPool -Account $account  
> $appSubSvc = New-SPSubscriptionSettingsServiceApplication –ApplicationPool $appPoolSubSvc –Name SettingsServiceApp –DatabaseName SettingsServiceDB  
> $proxySubSvc = New-SPSubscriptionSettingsServiceApplicationProxy –ServiceApplication $appSubSvc  
> $appAppSvc = New-SPAppManagementServiceApplication -ApplicationPool $appPoolAppSvc -Name AppServiceApp -DatabaseName AppServiceDB  
> $proxyAppSvc = New-SPAppManagementServiceApplicationProxy -ServiceApplication $appAppSvc    

Specify your tenant name by typing the following code in the SharePoint Management Shell.  
Set-SPAppSiteSubscriptionName -Name "app" -Confirm:$false

After you create your isolated app domain, perform the steps in the following procedure to add that domain to your bypass list in Internet Explorer. This ensures that you can navigate to this domain after you deploy a SharePoint-hosted app.

1.  In Internet Explorer, click **Tools**, and then click **Internet Options**.
2.  On the Connections tab, select **LAN Settings**, and clear the **Automatically detect settings** check box.
3.  Select the **Use a proxy server for your LAN** check box.
4.  Choose the **Advanced** button, and then add \*.App Domain.com to the Exceptions list.
5.  Click **OK**.
6.  Click **OK** to close the Local Area Network (LAN) Settings dialog box.  
7.  Click **OK** to close the Internet Options dialog box.

**Step 5 Create Hyper-V Images**

Hyper-V images enable reuse of your virtual environment.  The Hyper-V role in Windows Server 2008 Service Pack 2 provides infrastructure and management tools that enable you to create multiple server environments on a single host.

To programmatically create a virtual hard drive using an existing Windows image see the [Install-WindowsImage](http://archive.msdn.microsoft.com/InstallWindowsImage) Windows PowerShell script in the MSDN Code Gallery.

**Recommendations and Notes**

**Troubleshooting App Deployment Issues** 

Error deploying Provider Hosted SharePoint App "Error occurred in deployment step 'Install App for SharePoint':  Failed to install App for SharePoint."

Event Log:  
A certificate validation operation took 18605.0341 milliseconds and has exceeded the execution time threshold.  If this continues to occur, it may represent a configuration issue.  Please see [http://go.microsoft.com/fwlink/?LinkId=246987](http://go.microsoft.com/fwlink/?LinkId=246987)  for more details.

Common Issues:  
Certificate validation time out  
Workstation does not have Internet connectivity, adding crl.microsoft.com to HOSTS will generally resolve the issue.

"Error occurred in deployment step 'Install App for SharePoint': The specified identifier \* is invalid or does not exist."

If you're using <RemoteWebApplication ClientId="\*" /> the \* client ID only works if you are using ACS as the trust broker; otherwise if deploying to Office Store you’ll need to use high trust apps, you’ll also need need the clientId for high trust apps using S2S (see [http://msdn.microsoft.com/en-us/library/fp179901(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/fp179901(v=office.15).aspx)).