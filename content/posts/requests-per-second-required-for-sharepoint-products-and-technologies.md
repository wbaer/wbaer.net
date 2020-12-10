---
title: 'Requests Per Second Required for SharePoint Products and Technologies'
date: Fri, 06 Jul 2007 13:10:00 +0000
draft: false
tags: ['Capacity Planning', 'Performance', 'Uncategorized']
---

One of the most common questions making its way to my Inbox as of recently is how to determine the required requests per second (RPS) to support a SharePoint Products and Technologies deployment.  While many IT Pros opt to use the recommend values associated with RPS and Internet Information Services (IIS) the transactions are considerably different between a light-weight .NET application or common IIS Web site.  To establish a general requirement for requests per second for a SharePoint Products and Technologies deployment you will need answers to the following questions:

1.  What is the total or anticipated number of users that will potentially access the server farm?  It is usually best to consider all seats in this figure, overestimating in this case is preferable to underestimating.
2.  What is the estimated percentage of users that would potential access the server farm concurrently on a given day?  Again, overestimating is preferable to underestimating.  Generally we would assume at least 35% of users would access the server farm concurrently on a given day, though, depending on the nature of the users, the purpose of the deployment and any competing technologies, e.g. file shares, this number can fluctuate significantly.
3.  What is the average number of common requests per user on a given day?  Common requests include basic operations such as updating an item in a List or Document Library.
4.  What is the anticipated ratio by which peak usage will exceed average usage on a given day?  As a general rule, your users will be more active at certain periods throughout a business day, such as early in the morning or later in the afternoon.  Considering you've profiled your users utilization of the server farm, by how much does peak usage exceed the average usage.  2x is generally a safe estimate for most deployments, but again may vary depending on the nature and overall purpose of the deployment.
5.  How many hours are in a business day?  A business day can generally be considered the operating hours of the business; however, for extranet deployments, centralized or regional deployments, a business day may stretch beyond 8:00 A.M. and 5:00 P.M.  Consider this when determine business hours.

Now that questions 1 through 5 have an answer associated with them, simple mathematics can be applied to determine the required requests per second to support your user base.

**Step 1**

Take the sum of 1 \* 2 \* 3 \* 4

**Step 2**

Take the sum of 5 \* 360000 where 360000 is the number of seconds per hour

**Step 3**

Divide the sum of 1 \* 2 \* 3 \* 4 by the sum of 5 \* 360000 to determine the required requests per second to support your user base.

For example, let's assume Contoso has 95,000 total users, where 50% are assumed to access the server farm concurrently, each averaging 248 requests per day and peak usage is 2x the average usage.

> 95000 \* 50% \* 248 \* 2 = 23560000

Using the result above anticipating Contoso will have users accessing the server farm 24 hours a day gives us the result of 8640000 seconds.

Now we divide 23560000 by 8640000 to determine the required requests per second to support the potential Contoso user base giving the result 2.726. 

Now we round 2.726 and move the decimal for a final result of 273 required requests per second.

**Resources**

Capacity Planning for Windows SharePoint Services

[http://www.microsoft.com/resources/documentation/wss/2/all/adminguide/en-us/stsb07.mspx?mfr=true](http://www.microsoft.com/resources/documentation/wss/2/all/adminguide/en-us/stsb07.mspx?mfr=true "http://www.microsoft.com/resources/documentation/wss/2/all/adminguide/en-us/stsb07.mspx?mfr=true")

Estimate Performance and Capacity Requirements for Search Environments

[http://technet2.microsoft.com/Office/en-us/library/5465aa2b-aec3-4b87-bce0-8601ff20615e1033.mspx?mfr=true](http://technet2.microsoft.com/Office/en-us/library/5465aa2b-aec3-4b87-bce0-8601ff20615e1033.mspx?mfr=true "http://technet2.microsoft.com/Office/en-us/library/5465aa2b-aec3-4b87-bce0-8601ff20615e1033.mspx?mfr=true")