---
title: 'SQL Scripting for Manageability'
date: Tue, 31 Oct 2006 13:44:00 +0000
draft: false
tags: ['Code Samples', 'Uncategorized']
---

The attached SQL scripts are intended as sample scripts and may require some modification to suit your individual environments; however, serve as a foundation and guidance in SQL scripting under **Windows SharePoint Services 3.0**.

**Retrieve active Content Databases from a WSS 3.0 Configuration Database**

*   Returns a list of all active Content Databases in the Windows SharePoint Services Configuration Database.

> USE <WSS\_3.0\_Configuration\_Database>  
> SELECT DISTINCT SiteMap.DatabaseId, Objects.Name  
> FROM SiteMap  
> INNER JOIN Objects  
> ON SiteMap.DatabaseId=Objects.Id

**Get Site Collections in Content Databases not in Configuration Database**

*   Returns all Site Collections in a Content Database using the Windows SharePoint Services 3.0 Configuration Database. Add additional Content Databases as required.

> SELECT \* FROM \[<WSS\_3.0\_Configuration\_Database>\].dbo.SiteMap WHERE ApplicationID = '670181FD-E7AE-4230-A0B0-9261092D7A4C' AND Id NOT IN (  
> (SELECT ID FROM\[<SQL\_Server\_Instance>\].<WSS\_3.0\_Content\_Database>.dbo.Sites)  
> UNION (SELECT ID FROM \[<SQL\_Server\_Instance>\]. <WSS\_3.0\_Content\_Database>.dbo.Sites)  
> )

**Get Content Database and Database Server Information**

*   Returns Content Database and associated Database Server information.

> SELECT SQLServers.Name AS SQLServerName, SQLInstances.Name AS SQLInstanceName, DBs.Name AS DBName  
> FROM Objects AS DBs  
> INNER JOIN Objects AS SQLInstances  
> ON DBs.ParentId = SQLInstances.Id  
> INNER JOIN Objects AS SQLServers  
> ON SQLInstances.ParentId = SQLServers.Id  
> INNER JOIN Classes  
> ON SQLInstances.ClassId = Classes.Id  
> WHERE Classes.Fullname LIKE 'Microsoft.SharePoint.Administration.SPDatabaseServiceInstance%'

**Get Site Collection Count from WSS 3.0 Content Database**

*   Returns the Site Collection count from a Windows SharePoint Services 3.0 Content Database.

> USE <WSS\_3.0\_Configuration\_Database>  
> SELECT \* FROM Sitemap s  
> INNER JOIN Objects o  
> ON s.DatabaseId=o.Id  
> WHERE o.Name LIKE '<WSS\_3.0\_Content\_Database>%'

**Get Site Collection Mapping Information**

*   Maps a Windows SharePoint Services 3.0 Site Collection to its host Content Database using the Windows SharePoint Services 3.0 Configuration Database.

> USE <WSS\_3.0\_Configuration\_Database>  
> SELECT a.Path, a.Id, b.Name, c.Name  
> FROM <WSS\_3.0\_Configuration\_Database>..SiteMap AS a INNER JOIN  
> <WSS\_3.0\_Configuration\_Database>..Objects AS b ON a.DatabaseId = b.Id INNER JOIN  
> <WSS\_3.0\_Configuration\_Database>..Objects AS c ON b.ParentId=c.Id  
> WHERE a.ApplicationId = '670181FD-E7AE-4230-A0B0-9261092D7A4C'

**Compare WSS 2.0 and WSS 3.0 Content Databases \[Useful in Gradual Upgrade Mode\]**

*   Compares Windows SharePoint Services 2.0 and Windows SharePoint Services 3.0 Content Databases returning the variance.

> USE \[<WSS\_3.0\_Configuration\_Database>\]  
> GO  
> DECLARE @dbid UNIQUEIDENTIFIER  
> DECLARE @pairname NVARCHAR(100)  
> DECLARE @databasename NVARCHAR(100)  
> SELECT @pairname = '<WSS\_3.0\_Content\_Database>'  
> SELECT @dbid = (SELECT \[Id\] FROM DBO.objects WHERE \[Name\] = @pairname)  
> SELECT REPLACE(t1.FullUrl,'[http://<WSS\_2.0\_URL](http://%3cwss_2.0_url/)\>','')  
> FROM \[<SQL\_Server\_Instance>\].<WSS\_2.0\_Content\_Database>.DBO.Sites t1  
> WHERE NOT EXISTS  
> (SELECT t2.\[Path\] FROM DBO.SiteMap t2 WHERE t2.DatabaseId = @dbid  
> AND t2.\[Path\] = REPLACE(t1.FullUrl,'[http://<WSS\_3.0\_URL](http://%3cwss_3.0_url/)\>',''))

**Locate a specific Site Collection using the WSS 3.0 Configuration Database**

*   Locates a specific Site Collection in the Windows SharePoint Services 3.0 Configuration Database.

> USE <WSS\_3.0\_Configuration\_Database>  
> SELECT \* FROM SiteMap s  
> JOIN Objects o ON s.DatabaseId = o.Id  
> AND s.Path LIKE '%<Site\_Collection\_Path>%'