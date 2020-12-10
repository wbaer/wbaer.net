---
title: 'Managed Accounts in SharePoint 2010'
date: Sun, 11 Apr 2010 10:12:00 +0000
draft: false
tags: ['SharePoint Foundation 2010', 'SharePoint Server 2010', 'Uncategorized']
---

Microsoft SharePoint Server 2010 provides a number of compelling improvements designed especially for the system administrator, of these, commonly overlooked, are Managed Accounts.  A Managed Account is effectively an Active Directory user account whose credentials are managed by and contained within SharePoint.  In addition to storing the credentials of the object, Microsoft SharePoint Server 2010 can also leverage Active Directory Domain Policies to  automatically reset passwords while meeting the requirements established by policy.

How credentials are stored…

Managed Account credentials are encrypted using a farm encryption key that is specified when you run PSConfig\[ui\].exe at farm creation based on the passphrase.  The passphrase is stored in a secure registry location so that it can only be accessed by the farm account and encrypted so that only the farm account has access (we won’t get into the encryption specifics here). The farm encryption key subsequently, is stored in the Configuration Database.   This scenario is what enables farm administrators to join machines to the farm without specifying the credentials as had to be done in previous versions of the product.

The last sentence of the paragraph above illustrates one of immediate benefits of using Managed Accounts, for example, suppose an administrator would like to create a new Web application using Windows PowerShell and/or SharePoint Central Administration – the administrator only needs to specify the Application Pool account (Windows PowerShell) or select the account in the SharePoint Central Administration user interface as opposed to both having to know the domainusername and associated password.

**Example (Windows PowerShell)**

$provider = New-SPAuthenticationProvider -ASPNETMembershipProvider "LdapMember" -ASPNETRoleProviderName "LdapRole"  
$webApp = New-SPWebApplication -Name "Claims" -ApplicationPool "Claims Application Pool" -**ApplicationPoolAccount "CONTOSOadministrator"**  
  -Url [http://claims.contoso.com](http://claims.contoso.com) -Port 80 -AuthenticationProvider $provider

**Get Managed Accounts (SharePoint Central Administration)**

1.  To view existing Managed Accounts using SharePoint Central Administration, select **Security** from the SharePoint Central Administration homepage.
2.  On the Security page select **Configure managed accounts** under General Security.
3.  The Managed Accounts page will list all Managed Accounts registered in SharePoint.

**Register Managed Accounts (SharePoint Central Administration)**

1.  To register new Managed Accounts using SharePoint Central Administration, select **Security** from the SharePoint Central Administration homepage.
2.  On the Security page select **Configure managed accounts** under General Security.
3.  On the Managed Accounts page select **Register Managed Account**.
4.  On the Register Managed Account page (see illustration below) specify the credentials and select the password change policies as desired.

[![CA](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/ManagedAccounts_835C/CA_thumb.jpg "CA")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/ManagedAccounts_835C/CA_2.jpg)

**Get Managed Accounts (Windows PowerShell)**

1.  To view existing Managed Accounts using Windows PowerShell, open the SharePoint 2010 Management Shell and enter Get-SPManagedAccount at the prompt.  For additional information on using the Get-SPManagedAccount CmdLet enter Get-Help Get-SPManagedAccount at the prompt.

[![ManagedAccount](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/ManagedAccounts_835C/ManagedAccount_thumb.jpg "ManagedAccount")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/ManagedAccounts_835C/ManagedAccount_2.jpg)

**Register Managed Accounts (Windows PowerShell)**

1.  To register Managed Accounts using Windows PowerShell open the SharePoint 2010 Management Shell and use the Set-SPManagedAccount CmdLet (see below for syntax).

Syntax

New-SPManagedAccount \[-Credential\] <PSCredential> \[-AssignmentCollection <SPAssignmentCollection>\] \[-Confirm \[<SwitchParameter>\]\] \[-WhatIf \[<SwitchParameter>\]\]

**Configure Managed Accounts (Windows PowerShell)**

1.  To configure Managed Accounts using Windows PowerShell open the SharePoint 2010 Management Shell and use the Set-SPManagedAccount CmdLet (see below for syntax).

Syntax

Set-SPManagedAccount -Identity <SPManagedAccountPipeBind> \[-AssignmentColle  
ction <SPAssignmentCollection>\] \[-Confirm \[<SwitchParameter>\]\] \[-EmailNotif  
ication <Int32>\] \[-PreExpireDays <Int32>\] \[-Schedule <String>\] \[-WhatIf \[<S  
witchParameter>\]\] \[<CommonParameters>\]

Set-SPManagedAccount -Identity <SPManagedAccountPipeBind> \[-AssignmentColle  
ction <SPAssignmentCollection>\] \[-AutoGeneratePassword <SwitchParameter>\] \[  
\-Confirm \[<SwitchParameter>\]\] \[-EmailNotification <Int32>\] \[-PreExpireDays  
<Int32>\] \[-Schedule <String>\] \[-WhatIf \[<SwitchParameter>\]\] \[<CommonParamet  
ers>\]

Set-SPManagedAccount -Identity <SPManagedAccountPipeBind> -ConfirmPassword  
<SecureString> -NewPassword <SecureString> \[-AssignmentCollection <SPAssign  
mentCollection>\] \[-Confirm \[<SwitchParameter>\]\] \[-EmailNotification <Int32>  
\] \[-PreExpireDays <Int32>\] \[-Schedule <String>\] \[-SetNewPassword <SwitchPar  
ameter>\] \[-WhatIf \[<SwitchParameter>\]\] \[<CommonParameters>\]

Set-SPManagedAccount -Identity <SPManagedAccountPipeBind> -ExistingPassword  
<SecureString> \[-AssignmentCollection <SPAssignmentCollection>\] \[-Confirm  
\[<SwitchParameter>\]\] \[-EmailNotification <Int32>\] \[-PreExpireDays <Int32>\]  
\[-Schedule <String>\] \[-UseExistingPassword <SwitchParameter>\] \[-WhatIf \[<Sw  
itchParameter>\]\] \[<CommonParameters>\]

For additional information on using the Set-SPManagedAccount CmdLet enter Get-Help Set-SPManagedAccount at the prompt.