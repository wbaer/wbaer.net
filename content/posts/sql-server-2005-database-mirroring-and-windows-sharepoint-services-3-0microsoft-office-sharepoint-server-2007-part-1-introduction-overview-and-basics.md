---
title: 'SQL Server 2005 Database Mirroring and Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007 - Part 1 (Introduction, Overview, and basics)'
date: Mon, 23 Apr 2007 18:59:00 +0000
draft: false
tags: ['Capacity Planning']
---

This will be the first of a multi-part series covering SQL Server 2005 Database Mirroring and **Windows SharePoint Services 3.0**/**Microsoft Office SharePoint Server 2007**.  This post will cover an introduction to SQL Server 2005 Database Mirroring, an overview, and the basics to include considerations and integration with **SharePoint Products and Technologies**. Part 2 will cover implementing SQL Server 2005 Database Mirroring with **SharePoint Products and Technologies** using NTLM authentication and dedicated (DAS) storage and failover examples.

SQL Server 2005 Database Mirroring has increased in popularity since its introduction and among the possible applications there is a growing demand to implement SQL Server 2005 Database mirroring for **SharePoint Products and Technologies**.  This article outlines the considerations and implications of designing SQL Server 2005 Database Mirroring into your **SharePoint Products and Technologies** database architecture.

**Understanding Basic Database Mirroring Concepts**

SQL Server 2005 Database Mirroring provides high-availability and rapid failover by continuously sending a databases's transaction logs from an originating SQL server instance (principal) to a destination SQL server instance (mirror).  Since the granularity of failover is at the database level unlike the server level failover in Microsoft Cluster Server, SQL Server 2005 Database Mirroring failover can provide an increase in failover performance and is more seamless and transparent to the application.  A complete overview of Database Mirroring in SQL Server 2005 is available at [http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirror.mspx](http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirror.mspx).

**Considerations and Implications**

There are several important factors to consider before implementing SQL Server 2005 Database Mirroring in your **SharePoint Products and Technologies** infrastructure.  Prior to implementing SQL Server 2005 Database Mirroring, you should understand what problems you are trying to solve whether they are performance, availability, or geographic replication related.

*   **Determine the SQL Server 2005 Database Mirroring implementation mode - High Performance vs. High Availability vs. High Protection**
    *   High performance SQL Server 2005 Database Mirroring is also known as asynchronous mirroring where the transaction safety level is OFF.  In high performance mirroring the transaction is committed as soon as the principal server writes the log record to the local log and sends the log record to the mirror.  The principal does not wait for acknowledge and if needed queues the logs, a failover at this point may result in data loss.
    *   High availability SQL Server 2005 Database Mirroring is also known as synchronous mirroring where the transaction safety level is FULL.  Each transaction committed on the principal database is also committed on the mirror server synchronously.  The principal server will only commit a transaction after receiving acknowledgement from the mirror server indicating the transaction log has been hardened.  This process of acknowledgement and receipt results in slower performance versus asynchronous mirroring.
    *   High protection SQL Server 2005 Database Mirroring is also known as synchronous mirroring where the transaction safety level is FULL and is similar to high availability with primary difference being that there is no implementation of a witness server which requires manual failover.
    *   SQL Server 2005 Standard Edition allows only the FULL transaction safety level.
*   **Understand and plan for database limitations**
    *   master, model, temp, or msdb cannot be mirrored.
    *   SQL Server 2005 Database Mirroring requires that the databases use the FULL recovery model, the SIMPLE and BULK-logged recovery models cannot be used.
    *   Transactions are played out on two servers, limiting the number of databases will reduce the performance cost.
    *   Fewer databases will result in less overhead, by limiting the number of databases in a mirroring session you can maintain optimum performance levels.  This may require the repartioning of smaller content databases to achieve fewer and larger content databases.  Larger databases can leverage multiple data files spanning one or more drives to optimize performance and management.
    *   Mirror databases that require redundancy and/or high value databases - content databases typically fall into this category.
*   **Determine the appropriate hardware requirements** - Can a single SQL server support your infrastructure?
    *   Automatic failover requires a witness (_polling_) server.  The witness server's role is to enable automatic failover - if the mirror server has confirmation from the witness, it can automatically take on the role of principal and make its database available.
    *   SQL Server 2005 Database Mirroring requires two unique SQL server instances, one on the principal server and one on the mirror server.
*   **Determine the deployment methodology**
    *   Decide on a localized or geographically disperse deployment.  A geographically disperse deployment provides a disaster solution, but comes with performance implications as the result of network performance, latency, and type LAN vs. MAN vs. WAN.
*   **Security**
    *   SQL Server 2005 Database Mirroring supports both Windows (NTLM/Kerberos) and Certificate based SQL authentication.
    *   SQL Server Database Mirroring supports both AES and RC4 encryption algorithms for transmission encryption.
*   **Decide on shared vs. dedicated storage**
    *   Storage is duplicated in mirroring 1TB of storage on the principal server requires 1TB of storage on the mirror server.  Since each server in a mirroring partnership is a unique SQL server instance, the resources are not shared.
*   **Plan for capacity**
    *   SQL Server 2005 Database Mirroring requires duplication of storage, before designing mirroring into your database architecture you should understand the capacity requirements of the current server farm and future scale.  1TB of storage on an MSCS cluster with shared storage requires 2TB of storage in mirroring, 1TB on the principal and 1TB on the mirror.
*   **Change** - understand the existing **SharePoint Products and Technologies** infrastructure's rate of change (_churn_).  The performance of the principal server is affected by the transfer of log records to the mirror.
    *   Long running and/or intensive transactions can impact performance and failover times and can include creating and/or rebuilding an index on a large table or bulk loading a large amount of data (Search).
    *   Log bound workload performance under database mirroring is highly dependent on network performance and log I/O.
*   **Handling role changes** - understand the implications resulting of the loss of the principal or mirror server on **SharePoint Products and Technologies**.
    *   Understand the manual failover steps to support **SharePoint Products and Technologies**.
    *   Script an automatic failover mechanism to handle client-redirects.
*   **Managing failover** - SQL Server 2005 Database Mirroring works with a single database at a time. You need to take this into account when designing SQL Server 2005 Database Mirroring into your database architecture.  \*See Failover Handling
*   **Planning and implementation**
    *   To provide the best initial performance when implementing SQL Server 2005 Database Mirroring, consider taking an online backup of the principal database(s), copy the database(s) to the mirror server and restore the database(s) with the option to apply further transaction logs.  This will reduce the length of time associated with initial synchronization and minimize the performance implications of the initial synchronization.
    *   Ensure the implication of mirroring role changes is understood and planned for and the technology has been thoroughly tested before designing into your database architecture.
    *   A one to one mapping of principal to mirror server is recommended to maximize compatibility with **SharePoint Products and Technologies**.
    *   In high availability SQL Server 2005 Database Mirroring the process of determining a failover is based on the network connection. If there is a problem with the network, mirroring will fail over or deny access to the database because of the quorum requirement.  Understand the network implications on database mirroring.
    *   As with any product or technology understand the support parameters, limitations of the product or technology, and ensure it has been thoroughly tested prior to a production implementation.

**Failover Handling**

The introduction of a witness server in your SQL Server 2005 Database Mirroring architecture provides a mechanism for automatic failover; however, since mirroring granularity is at the database level, it is important to consider how to handle both single, multiple database and/or server failure.  Since the principal and mirror server SQL server instances are unique, **SharePoint Products and Technologies** will need to be made aware of the database server hosting its content.  The following sections details the STSADM operations that can be run to create this awareness in **Windows SharePoint Services 3.0**/**Microsoft Office SharePoint Server 2007**.

If an individual database fails you can set the database server using the **SharePoint** 3.0 Central Administration user interface or STSADM.

Content Database Failover

To change the principal server for a content database using STSADM run:

> `stsadm -o deletecontentdb -url "<http:// webapplicationurl>" -databasename "<contentdatabase>" -databaseserver "<failedprincipal>"  
> stsadm -o addcontentdb -url "<http:// webapplication>" -databasename " <contentdatabase>" -databaseserver "<newprincial>"`

To change the principal server for a content database using the **SharePoint** 3.0 Central Administration user interface:

1.  In **SharePoint** 3.0 Central Administration select Application Management, then click Content Databases.
2.  From the Manage Content Databases page, select Remove content database for the failed content database.
3.  From the Manage Content Databases page, select Add a content database to reinstate the content database on the new principal server.

Configuration Database and Administration Content Database Failover

The configuration and administration content database must reside on the same SQL database server, in the event that either of these databases fails, both must be failed over to the new database server.  To failover the configuration and administration content database, run the following STSADM from a web front-end computer:

> `stsadm.exe -o renameserver -oldservername <failedprincipal> -newservername <newprincipal>`

> Restart Internet Information Services to commit the change.

Search Database Failover

The following STSADM operation should be run from one web front-end computer for each failed search database.

> `stsadm –o editssp –title <searchname> –ssplogin <username> –ssppassword <password> -searchdatabaseserver <newprincipal>`

Shared Services Database Failover

The following STSADM operation should be run from one web front-end computer for each failed SSP database.

> `stsadm –o editssp –title <SSPName> –ssplogin <username> –ssppassword <password> -sspdatabaseserver <newprincipal>`

The information provided above details the steps necessary to instantiate a manual failover of the various components of a **SharePoint Products and Technologies** server farm, for additional information on scripting automatic client-side redirect in the event of failover see [Alerting on Database Mirroring Events](http://www.microsoft.com/technet/prodtechnol/sql/2005/mirroringevents.mspx) and [Database Mirroring in SQL Server 2005](http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirror.mspx) under Resources and Recommended Reading.  While it is possible to mirror the configuration and other databases associated with a SharePoint Products and Technologies server farm through the proper implementation of STSADM operations; support of SQL Server 2005 Database Mirroring for SharePoint Products and Technologies is limited to the content databases.

**Resources and Recommended Reading**

[Database Mirroring in SQL Server 2005](http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirror.mspx)

[SQL Server: Database Mirroring Best Practices and Performance Considerations](http://www.microsoft.com/technet/prodtechnol/sql/2005/technologies/dbm_best_pract.mspx)

[SQL Server 2005 Database Mirroring FAQ](http://www.microsoft.com/technet/prodtechnol/sql/2005/dbmirfaq.mspx)

[Alerting on Database Mirroring Events](http://www.microsoft.com/technet/prodtechnol/sql/2005/mirroringevents.mspx)

[Using Database Mirroring with Office SharePoint Server and Windows SharePoint Services](http://technet2.microsoft.com/Office/en-us/library/80609398-b01d-4d0a-b429-040b74cae51c1033.mspx?mfr=true)

[SQL Server Performance Test Results](http://office.microsoft.com/en-us/sharepointportaladmin/HA100993571033.aspx)