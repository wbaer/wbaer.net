---
title: 'Should I stay or should I go...Bookmarks vs Promoted Results'
date: Wed, 07 Oct 2020 19:26:48 +0000
draft: false
tags: ['Answers', 'Bookmarks', 'Microsoft Search', 'Promoted Results', 'Query Rules']
---

What’s a promoted result?
=========================

In brief, Promoted Results are a component of query results that allow you to promote a search result to appear above ranked results. For example, for the query "sick leave", a query rule could specify a particular result, such as a link to a site that has a statement of company policy regarding time off work or otherwise, the promoted result link.

What’s a Bookmark?
==================

Bookmarks are [one of many Answers in Microsoft Search](https://blog.wbaer.net/2020/10/06/making-the-most-of-answers-in-microsoft-search/).

Answers are highly relevant and high confidence results that satisfy a user’s intent expressed as a query/question in search.

An Answer is a way to address user intent. When searching, the user typically types in characters and keywords to express an intent. Recognizing the keywords that are triggers for specific intents is important, but it is even more important that the content that is shown in search satisfies the user intent.  

Answers are useful when you want to promote a search result to appear above ranked results. For example, for the query “sick leave”, you could specify a particular result, such as a link to a site that has a statement of company policy regarding time off work.  You can think of Answers as being navigational aids to assist employees in getting directions to the information that matters most to help them keep productive and informed.

Similar to Promoted Results in SharePoint, Bookmark Answers are designed to help employees way find the organization and quickly identify the best and most relevant resource curated by you or your organization such as authoritative sites or documents to satisfy the searchers’ intent.  Examples of Bookmark Answers can include sites, documents, or even files such as the Human Resources site, policy document, or more.

When to use what?
=================

While Promoted Results and Bookmarks provide similar functionality in respect to promoting curated resources to user’s, Promoted Results are a classic search component based on Best Bets (introduced with SharePoint Server 2010) with limited functionality when compared to Bookmarks (which are a feature of Microsoft Search).  Bookmarks, unlike Promoted Results support a variety of capabilities from presentation, targeting, and integration with other Microsoft 365 apps and services.  For example, a Bookmark created with Microsoft Search will display in apps and services to include SharePoint, Outlook, Office.com, Bing, and Microsoft Teams.

 

Promoted Results

Bookmark Answers

Supports Banner Display

Y

Y

Supports Title

Y

Y

Supports URL

Y

Y

Supports Description

Y

Y

Supports App Integration (E.g. PowerApps)

N

Y (PowerApps)

Supports Reserved Keywords

N

Y

Supports Scheduling

Y

Y

Supports Targeting by Country

N

Y

Supports Targeting by Language

N

Y

Supports Targeting by Group

N

Y

Supports Targeting by OS or Device

N

Y

Supports Targeted Variations

N

Y

Supports Display in other Microsoft 365 apps and services

N

Y

Fires on condition: Query matches keyword exactly

Y

Y

Fires on condition: Query Contains Action Term

Y

Y

Fires on condition: Query Matches Dictionary Exactly

Y

N

Query More Common in Source

Y

N

Result Type Commonly Clicked

Y

Y (via Related)

Supports condition: Advanced Query Text Match

Y

Y

Creating Bookmarks
==================

You can create a bookmark in just a few steps. Each bookmark includes a title, a URL, and a set of keywords that trigger it. You can also add categories to a bookmark that can be used for sorting and filtering in the admin portal.  Use the Import or Export feature to bulk create or edit bookmarks. It makes adding or editing many bookmarks faster and easier.

![](https://wbaer.files.wordpress.com/2020/10/bookmark-user.png?w=1024)

Bookmark in the SharePoint SERP

Bookmarks can be configured with the following options:

**Keywords:**  Keywords specify the search terms commonly used to find the Bookmark.

**Reserved Keywords**:  Reserved keywords are used when you want to ensure the bookmark shows for a specific keyword.  Reserved keywords override all other keywords, for example: Time Off

**Category:**  Categories allow for organization and grouping a collection of keywords.  For example, if you have multiple Bookmarks to a variety of working from home resources, you can categorize them into a Remote Work category.

**Dates:** Allow you to specify when a Bookmark Answer should be presented in the SERP.  Date presentation is useful when you want to have a Bookmark appear and subsequently expire from the SERP, such as supporting an event or product launch.

**Country or Region:**  Allows you to specify the target country or region for where the Bookmark Answer should appear in the SERP

**Groups:** Allow you to specify a security group for which the Bookmark should appear in the SERP.

**Device and OS:**  Allow you to specify the device and/or OS the user is using to determine whether or not the Bookmark should appear in the SERP, for example, you may want to present device specific information the query not only satisfies the user’s intent, but also is applicable to their device whether PC (Windows or Mac) or mobile device (iOS or Android).

**Targeted Variations:**  Targeted variations are useful when you want the Bookmark to appear in the SERP with different content based on device, country, region, or both.  The Date and Group settings are considered when using targeted variations.

**App ID:**  The App ID setting is used when you would like to embed a PowerApp in the Bookmark, for example, if you have a PowerApp to record employee vacation requests, you can embed it in the Bookmark.

![](https://wbaer.files.wordpress.com/2020/10/bookmark-admin.png?w=1024)

Bookmark administration in Microsoft Search

Migrating Promoted Results
==========================

If your organization set up Promoted Results in SharePoint, you can import the Promoted Results into Microsoft Search and make the imported content available to your users. This is an easy way to quickly populate search results as soon as you set up Microsoft Search and make it more effective for your users. We recommend using promoted results from SharePoint as a reference to understand how to name and create relevant search results.

Resources
=========

Learn more about Answers in Microsoft Search at [https://docs.microsoft.com/en-us/microsoftsearch/plan-your-content](https://docs.microsoft.com/en-us/microsoftsearch/plan-your-content).
---
### Comments:
#### 
[What’s new with Answers in Microsoft Search &#8211; Bill Bär (&#039;bɛər)](http://blog.wbaer.net/2020/11/20/whats-new-with-answers-in-microsoft-search/ "") - <time datetime="2020-11-20 09:27:44">Nov 5, 2020</time>

\[…\] Learn more about Bookmarks at https://blog.wbaer.net/2020/10/07/should-i-stay-or-should-i-go-bookmarks-vs-promoted-results/. \[…\]
<hr />
#### 
[Microsoft Search deep-dive | Sarah Haase](http://blog.splibrarian.com/2020/11/12/microsoft-search-deep-dive/ "") - <time datetime="2020-11-12 06:13:08">Nov 4, 2020</time>

\[…\] also discussed Bookmarks and Answers in Microsoft Search. Bill advises using Bookmarks when a user query is expressed as a \[…\]
<hr />
