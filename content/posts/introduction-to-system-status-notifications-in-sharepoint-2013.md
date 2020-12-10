---
title: 'Introduction to System Status Notifications in SharePoint 2013'
date: Mon, 29 Apr 2013 02:00:47 +0000
draft: false
tags: ['Administration', 'Code Samples', 'SharePoint', 'SharePoint Server 2013', 'Windows Powershell']
---

SharePoint 2013 implements new System Status Notifications designed to provide site users information about lifecycle events to include availability of upgrade, maintenance, and read-only states.

System Status Notifications present important information about a SharePoint deployment and its availability, whether during upgrades, routine maintenance,  or conversion to read-only. Users are kept “in the know” as they receive a prominent banner on their sites that provides insight into the activity being performed—helping reduce calls to the help desk and subsequent burden on IT.

Farm administrators and developers can configure System Status Notifications to provide additional information to users and adjust upgrade delays.

SPWebApplication Properties
===========================

UpgradeReminderDelay
--------------------

The UpgradeReminderDelay property is used to enable users to suppress the upgrade availability System Status Notification for a specified period of time.  Farm administrators can configure the UpgradeReminderDelay to allow users to suppress the UpgradeAvailable reminder for a period of time or alternatively set the value to 0 which shows users an UpgradeRequired reminder.  The default value is 30 (days).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1778.image_thumb_4B2A99C3.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2330.image_199F2C2E.png)

Figure 1 above illustrates the System Status Notification when the UpgradeReminderDelay is set to a value greater than 0.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2772.image_thumb_31566394.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6661.image_31C29689.png)

Figure 2 above illustrates the System Status Notification when the UpgradeReminderDelay is set to 0.

Configuring the UpgradeReminderDelay SPWebApplication property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
    class Program  
    {  
        static void Main(string\[\] args)  
        {  
            SPWebApplication webApp = SPWebApplication.Lookup(new Uri("[http://sharepoint.contoso.com"));](http://sharepoint.contoso.com)  
            webApp.UpgradeReminderDelay = 90;  
            webApp.Update();  
        }  
    }  
}

Windows PowerShell

$webApp = Get-SPWebApplication http://sharepoint.contoso.com

$webApp.UpgradeReminderDelay = 90

$weApp.Update()

UpgradeMaintenanceLink
----------------------

The UpgradeMaintenanceLink property is used to provide users additional information during the site collection upgrade process.  Farm administrators can use the UpgradeMaintenanceLink property to enable a More Information link in the System Status Notification during the upgrade process directing users to a location where more information is available related to the upgrade process.  The default value for the UpgradeMaintenanceLink property is null therefore no More Information link is displayed to users.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/0257.image_thumb_50990A67.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8156.image_45DBB312.png)

Figure 3 Illustrates the System Status Notification when the UpgradeMaintenanceLink is not null.

Configuring the UpgradeMaintenanceLink SPWebApplication property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
     class Program  
     {  
         static void Main(string\[\] args)  
         {  
             SPWebApplication webApp = SPWebApplication.Lookup(new Uri("[http://sharepoint.contoso.com"));](http://sharepoint.contoso.com/)  
             webApp.UpgradeMaintenanceLink = "http://office.microsoft.com/en-us/sharepoint-help/training-courses-for-sharepoint-2013-HA104030990.aspx";  
             webApp.Update();  
         }  
     }  
}

Windows PowerShell

$webApp = Get-SPWebApplication http://sharepoint.contoso.com

$webApp.UpgradeMaintenanceLink =  “http://office.microsoft.com/en-us/sharepoint-help/training-courses-for-sharepoint-2013-HA104030990.aspx”

$webApp.Update()

ReadOnlyMaintenanceLink
-----------------------

The  ReadOnlyMaintenanceLink property is used to provide users additional information when a site collection is set to read-only or a content database is configured to read-only in Microsoft SQL Server.  Farm administrators can use the ReadOnlyMaintenanceLink property to enable a More information link in the System Status Notification while a site collection or content database is in a read-only state.  The default value for the ReadOnlyMaintenanceLink is null therefore no More Information link is displayed to users.  For example, if a farm administrator would like to provide additional information on the read-only experience for users, the ReadOnlyMaintenanceLink can be configured with a More information link that directs users to [http://technet.microsoft.com/en-us/library/dd793608.aspx#proc1](http://technet.microsoft.com/en-us/library/dd793608.aspx#proc1).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5875.image_thumb_56DFE0F5.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/5531.image_0943B475.png)

Figure 4 Illustrates the System Status Notification when the ReadOnly property for a SPSite is set to $true.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/4478.image_thumb_1CF09E09.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/6038.image_086B4E8B.png)

Figure 5 Illustrates the System Status Notification when the content database for a SPSite is set to read-only.

Configuring the ReadOnlyMaintenanceLink SPWebApplication property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
    class Program  
     {  
         static void Main(string\[\] args)  
         {  
             SPWebApplication webApp = SPWebApplication.Lookup(new Uri("[http://sharepoint.contoso.com"));](http://sharepoint.contoso.com/)  
             webApp.ReadOnlyMaintenanceLink = "http://technet.microsoft.com/en-us/library/dd793608.aspx#proc1";  
             webApp.Update();  
         }  
     }  
}

Windows PowerShell

$webApp = Get-SPWebApplication http://sharepoint.contoso.com

$webApp.ReadOnlyMaintenanceLink = “http://technet.microsoft.com/en-us/library/dd793608.aspx#proc1”;

$webApp.Update()

**NOTE**

If a site collection or content database is set to read-only, the read-only message is displayed, upgrade status notifications are not displayed.  If ReadOnlyMaintenanceLink is not empty, a More Information link will be displayed.

If a site collection or content database is not read-only, and an upgrade is processing, “the site is currently being upgraded” is displayed.  If UpgradeMaintenanceLink is not empty, a More Information link will be displayed.

If a site collection or content database is not read-only, not upgrading, and the site is in 2010 mode, and current user is site collection admin:

*   If SPWebApplication.UpgradeReminderDelay is greater than 0, “upgrade is available” notification will be displayed. Clicking on the “remind me later” will update the SPSite.UpgradeReminderDate to be in n days, and dismiss the notification.
*   When SPWebApplication.UpgradeReminderDelay is 0, site admin will see “upgrade is required” notification. There will be no “remind me later” option. The notification will be displayed on every browse, and have to be manually dismissed each time.

UpgradeEvalSitesRetentionDays
-----------------------------

The UpgradeEvalSitesRetentionDays SPWebApplication property is used to specify the default number days after which upgrade evaluation sites will be deleted. The expiration date for upgrade evaluation sites is set based on their creation date plus this value in days.  For example, in the event a site collection administrator requests an evaluation site collection, and that site collection is created on 4/16/2013, the evaluation site collection will be deleted on 5/16/2013 (the default value is 30 days).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1682.image_thumb_2741C269.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3252.image_559B4816.png)

Figure 6 Illustrates the System Status Notification when the UpgradeEvalSitesRetentionDays is set.

Configuring the UpgradeEvalSitesRetentionDays SPWebApplication property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
    class Program  
     {  
         static void Main(string\[\] args)  
         {  
             SPWebApplication webApp = SPWebApplication.Lookup(new Uri("[http://sharepoint.contoso.com"));](http://sharepoint.contoso.com/)  
             webApp.UpgradeEvalSitesRetentionDays = 90;  
             webApp.Update();  
         }  
     }  
}

Windows PowerShell

$webApp = Get-SPWebApplication http://sharepoint.contoso.com

$webApp.UpgradeEvalSitesRetentionDays = 90;

$webApp.Update()

SPSiteUpgradeThrottleSettings
-----------------------------

This class stores the throttle settings for large site upgrade, for example, a farm administrator can throttle the upgrade of site collections with a specified number of sites.

See also [SPSiteUpgradeThrottleSettings members (Microsoft.SharePoint](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.administration.spsiteupgradethrottlesettings_members.aspx "SPSiteUpgradeThrottleSettings members (Microsoft.SharePoint").

SPSite Properties
=================

UpgradeReminderDate
-------------------

The UpgradeReminderDate SPSite property is used to specify a date after which site collection administrators will be reminded to upgrade the site collection.

Configuring the UpgradeReminderDate SPSite property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
    class Program  
    {  
        static void Main(string\[\] args)  
        {  
            SPSite site = new SPSite("[http://sharepoint.contoso.com");](http://sharepoint.contoso.com");)

            System.DateTime today = System.DateTime.Now;  
            System.TimeSpan duration = new System.TimeSpan(30, 0, 0, 0);

            site.UpgradeReminderDate.Add(duration);  
        }  
    }  
}

Windows PowerShell

$site = Get-SPSite [http://sharepoint.contoso.com](http://sharepoint.contoso.com)

$today = Get-Date

$duration = $today.AddDays(30)

$site.UpgradeReminderDate.Add($duration)

ExtendUpgradeReminderDate
-------------------------

The ExtendUpgradeReminderDate SPSite property is used to extend the upgrade reminder date for a site collection by the days specified at UpgradeReminderDate.  When called, it adds SPWebApplication.UpgradeReminderDelay to the current time, stores it in SPSite.UpgradeReminderDelay.

Configuring the ExtendUpgradeReminderDate SPSite property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
    class Program  
    {  
        static void Main(string\[\] args)  
        {  
            SPSite site = new SPSite("[http://sharepoint.contoso.com");](http://sharepoint.contoso.com%22);/)  
            site.ExtendUpgradeReminderDate();  
        }  
    }  
}

Windows PowerShell

$site = Get-SPSite http://sharepoint.contoso.com

$site.ExtendUpgradeReminderDate()

**More Information**  

System Status Notifications are rendered through sending JavaScript to the page head and do not implement server-side controls.  The ExtendUpgradeReminderDate is implemented as an xmlHttp object that sends a REST call to web.Url/\_api/Site/ExtendUpgradeReminderDate.

AllowSelfServiceUpgrade
-----------------------

The AllowSelfServiceUpgrade SPSite property is used to specify whether version to version upgrade is allowed on a site collection.  If the AllowSelfServiceUpgrade property is set to false site collection administrators will not be able to upgrade their site collection, if set to true, site collection administrators can perform a self-service (Deferred Site Collection Upgrade).  Farm administrators can control the upgrade process either en masse or selectively by disabling self-service upgrade.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/2112.image_thumb_1B3FD235.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/8154.image_0DD9BF2F.png)

Figure 7 illustrates configuring the AllowSelfServiceUpgrade SPSite property to $false.

Configuring the AllowSelfServiceUpgrade SPSite property:

C#

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Threading.Tasks;  
using Microsoft.SharePoint;  
using Microsoft.SharePoint.Administration;

namespace Sample\_Maintenance\_Link\_Code  
{  
    class Program  
    {  
        static void Main(string\[\] args)  
        {  
            SPSite site = new SPSite("[http://sharepoint.contoso.com");](http://sharepoint.contoso.com");)  
            site.AllowSelfServiceUpgrade = false;  
        }  
    }  
}

Windows PowerShell

$site = Get-SPSite [http://sharepoint.contoso.com](http://sharepoint.contoso.com)

$site.AllowSelfServiceUpgrade = $false;

Summary
=======

A completely revised, backward-compatible upgrade experience is designed to balance the needs of users with those of IT. Because changing software is often difficult, SharePoint Server 2013 enables IT to upgrade SharePoint Server 2010 without having to upgrade users’ sites and content. These upgrades are deferred to the users, allowing them to choose when the time is right.

New evaluation site collections allow users to request an evaluation of the upgrade prior to upgrading production content; if satisfied with the experience, site collection administrators then can upgrade their content. It’s important to note that whether you have deployed SharePoint Server 2010 on-premises or subscribe to SharePoint Online in Office 365, the full upgrade capability is available.