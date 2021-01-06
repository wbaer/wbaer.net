---
title: 'Migrating User Accounts in Windows SharePoint Services'
date: Sun, 09 Mar 2008 01:33:00 +0000
draft: false
tags: ['Code Samples', 'People and Profiles', 'Upgrade &amp; Migration']
---

While attending Ask the Experts at the Microsoft Office SharePoint Server Conference 2008, I was asked about migrating user accounts in Windows SharePoint Services 3.0 to a new login name programmatically, fortunately Windows SharePoint Services addressed user account migrations with the Windows SharePoint Services 2.0 post SP1 hotfix package 896593 which was followed by a number of applications including SPUserUtil _Keith Richie corrected me today - SPUserUtil preceeded the MigrateUser API - Thanks Keith!_.  The good news is that with the exception of minor OM changes, the base functionality is retained in WSS 3.0.

**Programmatically (Multiple User Scenarios)**

Where working with a large number of users, you may wish to programmatically migrate those users using the MigrateUserAccount method which migrates a user account in WSS to a new login name and binary Id updating the site collection user in the UserInfo tables, people lists, and security policies across the farm. The MigrateUserAccount method is a member of the Microsoft.SharePoint.Administration namespace, SP Farm class and takes three arguments, oldLogin, newLogin, and enforceSidHistory.

1.  oldLogin is the is the login name you would like to modify - if the login name exists, it will be deleted to allow the change.
2.  newLogin is the desired login name.
3.  enforceSidHistory will query the Active Directory for the SID history attribute to ensure that the new logon name is truly correspondent to the old one (checks and balances).  **NOTE** Set enforceSidHistory to False when working with non-Windows user accounts, for example, Forms-Based Authentication users.

**Sample Code**

```
using Microsoft.SharePoint;
using Microsoft.SharePoint.Administration;

namespace MigrateUser
{
    class Program
    {
        static void Main(string\[\] args)
        {
            SPFarm Farm = SPFarm.Local;
            Farm.MigrateUserAccount("CONTOSO\\UserA", "CONTOSO\\UserB", true);
        }
    }
}
```

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).

**NOTE**  WSS stores user information based on both the Security Identifier and user logon information, when either changes in Active Directory, WSS needs to be updated with the new user information otherwise that user will be unable to access the WSS environment.

**SharePoint Administration Tool (Single User Scenarios)**

User accounts can also be migrated using the SharePoint Administration Tool (STSADM) migrateuser operation documented here [http://technet2.microsoft.com/windowsserver/WSS/en/library/f9f9a3eb-ce46-4dbb-a15c-9fad9eb32ec71033.mspx?mfr=true](http://technet2.microsoft.com/windowsserver/WSS/en/library/f9f9a3eb-ce46-4dbb-a15c-9fad9eb32ec71033.mspx?mfr=true "http://technet2.microsoft.com/windowsserver/WSS/en/library/f9f9a3eb-ce46-4dbb-a15c-9fad9eb32ec71033.mspx?mfr=true").  **NOTE** The ignoresidhistory parameter should be set to True when working with non-Windows user accounts, for example, Forms-Based Authentication users. Where working with a large number of users that are migrated in Active Directory subsequently changing those users corresponding Security Identifiers and/or where modifying the logon information for those users consider utilizing the MigrateUserAccount method to reduce the administration overhead of working with single user entities on a one by one basis.