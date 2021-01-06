---
title: 'WSS UserInfo versus MOSS Profile Q & A (The Basics)'
date: Sun, 28 Jan 2007 00:16:00 +0000
draft: false
tags: ['People and Profiles']
---

**What happens when manually adding a user to a Windows SharePoint Services 3.0 Site Collection, who previously did not have a Microsoft Office SharePoint Server 2007 profile?**

**Windows SharePoint Services 3.0** userinfo and **Microsoft Office SharePoint Server 2007** profile are not hard-linked; what this means is when a new user is created in **Windows SharePoint Services 3.0** it does not get created in the **Microsoft Office SharePoint Server 2007** profile store; the opposite of this is true as well - **Microsoft Office SharePoint Server 2007** -> **Windows SharePoint Services 3.0**.

**What information about users is stored?**

**Windows SharePoint Services 3.0** stores the information about the user local to the site collection in the userinfo and user lists; this is site collection specific and as a result when creating another top-level Site Collection it is required to add the information about the individual again. **Windows SharePoint Services 3.0** will make an attempt to get as much information about the individual from the directory when you add them to the Site Collection, including the inviduals' name, username, SIP address, email address, title, etc.

**How are name changes managed?**

**Microsoft Office SharePoint Server 2007** has more information about users than **Windows SharePoint Services 3.0**.  This information is regularly updated through the import job - **Microsoft Office SharePoint Server 2007** has a synchronization job (profsynch) that enumerates every user record in every **Windows SharePoint Services 3.0** Site Collection and will make any updates as discovered.  **Microsoft Office SharePoint Server 2007** leverages the profile store to manage changed values in the profile store, to include directory, Business Database Catalog or user applied changes such as personal site photographs, etc; the **Microsoft Office SharePoint Server 2007** process will update every Site Collection where this individual is referenced.