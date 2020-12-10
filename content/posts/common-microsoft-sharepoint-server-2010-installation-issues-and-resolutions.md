---
title: 'Common Microsoft SharePoint Server 2010 Installation Issues and Resolutions'
date: Fri, 11 Dec 2009 19:19:53 +0000
draft: false
tags: ['Migration &amp; Upgrade', 'SharePoint']
---

I’ve been following the SharePoint 2010 Forums and have noticed several common installation issues.  These issues and possible steps to resolve those issues are included here.

**ISSUE #1:  when running the SharePoint 2010 Products Configuration Wizard you may experience the error:**

Failed to create the configuration database.  
An exception of type System.Security.Cryptography.CryptographicException was thrown.  Additional exception information: The data is invalid.

To resolve the issue you can perform the following steps:

Modify the ACL on the 14 directory under %commonprogramfilesMicrosoft SharedWeb Server Extensions.

1.  Right-click on the folder **%commonprogramfiles%Microsoft SharedWeb Server Extensions14**, and then select the **Security** tab.
2.  On the 14 Properties dialog under the Security tab, select **Edit**.
3.  On the Permissions for 14 dialog click **Add…** and enter **Network Service** in the Enter the object names to select and then click **OK**.
4.  On the Permissions for 14 dialog select **Full Control** under Permissions for NETWORK SERVICE and click **OK**.
5.  On the 14  Properties dialog click **OK**.

NOTE

The previous steps are applicable only prior to running the SharePoint 2010 Products Configuration Wizard.  If you have run the SharePoint 2010 Products Configuration Wizard, follow the steps below:

1.  Open an elevated Command Prompt and change directories to **%commonprogramfiles%Microsoft SharedWeb Server Extensions14** and enter **psconfig –cmd –configdb disconnect** to disconnect from the current configuration database.
2.  Open SQL Server Management Studio or SqlCmd and delete the existing configuration database.
3.  Follow the previous steps to modify the ACL on the 14 directory and run the SharePoint 2010 Products Configuration Wizard to create and configure the server farm.

NOTE

In the event the steps above do not immediately resolve the issue, open the Registry Editor and  delete the "SOFTWAREMicrosoftShared ToolsWeb Server Extensions14.0SecureFarmAdmin" Registry key and then run the SharePoint 2010 Products Configuration Wizard.

**ISSUE #2:  when running the SharePoint 2010 Products Configuration Wizard you may experience the error:**

An exception of type Microsoft.Office.Server.UserProfiles.UserProfileException was thrown.  Additional exception information: Unrecognized attribute 'allowInsecureTransport'. Note that attribute names are case-sensitive. (C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14WebClientsProfileclient.config line 56).

To resolve the issue you can perform the following steps:

Download and install KB976462 from [http://support.microsoft.com/kb/976462](http://support.microsoft.com/kb/976462) for Windows Server 2008 R2 or KB971831 from [http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=KB971831&DownloadId=7285](http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=KB971831&DownloadId=7285) for Windows Server 2008 and run the SharePoint 2010 Products Configuration Wizard.

**ISSUE #3:  when running Setup.exe for Microsoft SharePoint Server 2010 you may experience the error:**

Setup is unable to proceed due to the following error(s):  
A system restart from a previous installation or update is pending. Restart your computer and run setup to continue.  
For the list of pre-requisites needed to install the product please refer to:  
http://go.microsoft.com/fwlink/?LinkId=106209  
Correct the issue(s) listed above and re-run setup.

Check the value of the following Registry keys:

**HKEY\_LOCAL\_MACHINESOFTWAREMicrosoftUpdatesUpdateExeVolatile - if the value of the UpdateExeVolatile** Registry key is anything other than 0 you will see this message.

**HKEY\_LOCAL\_MACHINESYSTEMCurrentControlSetControlSession ManagerPendingFileRenameOperations** - if the PendingFileRenameOperations Registry key has any value you will see this message.

To remove an orphaned UpdateExeVolatile registry key value

1.  Open a registry editor, such as Regedit.exe or Regedt32.exe.
2.  Navigate to **HKLMSOFTWAREMicrosoftUpdates**
3.  In the right navigation pane, double-click the **UpdateExeVolatile** key.
4.  Configure the key with a value of **0**
5.  Close Registry Editor.

To delete the orphaned PendingFileRenameOperations registry key

1.  Open a registry editor, such as Regedit.exe or Regedt32.exe.
2.  Navigate to **HKLMSYSTEMCurrentControlSetControlSession Manager**
3.  In the right navigation pane, right-click the **PendingFileRenameOperations** key and select **Delete**.
4.  Close Registry Editor.

**ISSUE #4:  when running the SharePoint 2010 Products Configuration Wizard you may experience the error:**

Failed to register SharePoint services.  
An exception of type System.ServiceProcess.TimeoutException was thrown.  Additional exception information: Time out has expired and the operation has not been completed.  
System.ServiceProcess.TimeoutException: Time out has expired and the operation has not been completed.  
   at System.ServiceProcess.ServiceController.WaitForStatus(ServiceControllerStatus desiredStatus, TimeSpan timeout)

Run Setup.exe when the steps above have been completed.

To resolve the issue you can perform the following steps:

Download and install KB976462 from [http://support.microsoft.com/kb/976462](http://support.microsoft.com/kb/976462) for Windows Server 2008 R2 or KB971831 from [http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=KB971831&DownloadId=7285](http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=KB971831&DownloadId=7285) for Windows Server 2008 and run the SharePoint 2010 Products Configuration Wizard.

**ISSUE #5:  when running the SharePoint 2010 Products Configuration Wizard you may experience the error:**

Error: Cannot add the specified assembly to the global assembly cache: C:Program FilesCommon FilesMicrosoft SharedWeb Server Extensions14policyPolicy.11.0.Microsoft.SharePoint.dll.

To resolve this issue you can perform the following steps:

Delete the contents of **%commonprogramfiles%Microsoft SharedWeb Server Extensions14policy** and run the SharePoint 2010 Products Configuration Wizard.

**ISSUE #6:  when running Setup.exe for Microsoft SharePoint Server 2010 you may experience the following error:**

The language of this installation is not supported by your system

This issue is largely caused by corruption of the binaries, you can use the extract command in a Command Prompt and check the log to determine the health of the binaries; otherwise, download a new copy of the binaries and retry setup.
---
### Comments:
#### 
[Nu Finis]( "nufinis@hotmail.com") - <time datetime="2020-01-12 12:19:04">Jan 0, 2020</time>

Holy ……… cow. Thank you. Why is SharePoint to difficult? Installed brand new VM, W2012R2, all Windows updates, installed SQL2012SP2, then SP3, then Sharepoint 2010 Foundation SP2, all good. Tried to run configuration wizard, first insufficient memory errors, limited SQL memory, turned off HyperV dynamic memory allocation, then Cyrpto errors. Answers here worked perfectly, but really why doesn't this work out of the box ? Thanks you again
<hr />
