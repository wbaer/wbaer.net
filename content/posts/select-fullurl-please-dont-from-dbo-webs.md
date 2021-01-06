---
title: 'SELECT FullUrl [Please Don''t] from dbo.Webs'
date: Tue, 01 Jul 2008 09:42:00 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'Windows SharePoint Services 3.0']
---

I was just browsing [Mike Fitzmaurice's blog](http://mikefitzmaurice.wordpress.com/) and I'm glad to see he continues to [dissuade direct database access](http://blogs.msdn.com/mikefitz/archive/2005/04/01/404802.aspx) with Microsoft SharePoint Products and Technologies.  All too often I've seen what was conceptually a good idea, result in performance, scalability, and manageability problems long term.  While initially an otherwise simple SELECT statement, yes, even read, may be perceived as non-intrusive, problems later down the road may be compounded by what was offered as a "simple means" to getting a particular task accomplished.

Most often instances of directly reading and/or writing to SharePoint Products and Technologies databases occur in what I call a dotted-line deployment, where there is little or no separation of those who are responsible for Microsoft SharePoint Products and Technologies and those responsible for hosting and maintaining the database servers.  The problem is less frequent where there are distinct groups of individuals responsible for their respective technologies, a more physically separated deployment and management approach.  But in either case, the possibility exists.

So what's the problem:

Consider dirty reads, while SQL servers' default behavior is Read Committed Isolation Model, in this scenario while SQL server will not allow transactions to read data written to a table by an uncommitted transaction, phantom and non-readable reads are fair game.  And then we have record locking, so in the event the individuals actions result in concurrent collisions, SQL server will do its best to protect itself from the individual or otherwise you from yourself, but this comes with a measurable performance penalty.  Since this post is intended to promote a programmatic approach to accessing data stored in Microsoft SharePoint Products and Technologies databases, we won't discuss the last set of statements with using SELECT and disabling record locking.  ;-)

With that said, I am equally pleased to see both the [Microsoft Asset Inventory Tool](http://go.microsoft.com/fwlink/?LinkID=103035) and [Nintex Reporting 2008](http://www.nintex.com/Nproducts/Reporting.aspx) offer a robust reporting solution that avoid directly accessing the database(s), using SOAP, WMI, and other providers to extrapolate the data and provide a presentation layer for the end-user or IT Pro.  Not only are these great reporting applications, but serve as an example of how a well thought solution can be implemented without compromising the integrity of the environment.

In conclusion, use the Object Model when and wherever possible to replace directly accessing Microsoft SharePoint Products and Technologies databases, it provides protection in the form of supportability, reduces operational complexity, and enables an upgrade path for your solutions when the time arises and can manage database schema changes, all of which are not guaranteed when manipulating databases directly with Transact-SQL and/or other methods.

**Resources**

SharePoint Database Access

[http://msdn.microsoft.com/en-us/library/bb861829.aspx](http://msdn.microsoft.com/en-us/library/bb861829.aspx "http://msdn.microsoft.com/en-us/library/bb861829.aspx")

Office Development (Microsoft SharePoint Products and Technologies)

[http://msdn.microsoft.com/en-us/library/bb931739.aspx](http://msdn.microsoft.com/en-us/library/bb931739.aspx "http://msdn.microsoft.com/en-us/library/bb931739.aspx")