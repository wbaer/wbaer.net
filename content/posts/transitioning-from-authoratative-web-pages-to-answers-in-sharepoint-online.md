---
title: 'Transitioning from Authoratative Web Pages to Answers in SharePoint Online'
date: Tue, 12 Jan 2021 03:59:52 +0000
draft: false
tags: ['Microsoft Search', 'SharePoint', 'Answers']
---
As Authoratative Pages are scheduled to be deprecated in SharePoint Online, now is the time to start thinking about how to deliver similar functionality with Microsoft Search.  For background, authoritative pages are those that link to the most relevant information as decided by the search administrator, specified as a URL. SharePoint search uses this list to calculate the rank of every page in the index.

For example, if an administrator wanted to rank the companies HR site above ranked results, an authoratative page could be configured for https://contoso.sharepoint.com/sites/HR.

Classic search will then use the list of authoritative pages to calculate the static ranking of results. Static rank determines the relative importance of a page. Static rank is calculated as the smallest number of clicks that it would take a user to navigate from an authoritative page to a document. The closer a document is to the most authoritative page, the higher the static rank of the page is.

You can view and manage authoratative pages at _layouts/15/searchadmin/editrelevancesettings.aspx?level=tenant.

Similar to the the intent of authoratative pages, Answers in Microsoft Search are highly relevant and high confidence result that satisfies a user intent expressed as a query/question in search, presenting the most relevant information needed to get a job done and help users to faster task completion.

An Answer is a way to address user intent. When searching, the user typically types in characters and keywords to express an intent. Recognizing the keywords that are triggers for specific intents is important, but it is even more important that the content that is shown in search satisfies the user intent.  

Answers are useful when you want to promote a search result to appear above ranked results. For example, for the query “sick leave”, you could specify a particular result, such as a link to a site that has a statement of company policy regarding time off work.  You can think of Answers as being navigational aids to assist employees in getting directions to the information that matters most to help them keep productive and informed.

Each bookmark includes a title, a URL, and a set of keywords that trigger it. You can also add categories to a bookmark that can be used for sorting and filtering in the admin portal. A bookmark can have several keywords and several bookmarks can share the same keyword, but reserved keyword can’t be shared. When a Bookmark is created or modified, the search index is refreshed immediately, and the bookmark is available to users immediately.

The first step to making the transition from Authoratative Web Pages to Answers is to first collect a list of configured Authoratative Web Pages from your environment.  You can collect this list using the SharePoint Admin Center and browsing to _layouts/15/searchadmin/editrelevancesettings.aspx?level=tenant.

Make note of each Url configured in the modal.

The next step, outside of what should retained versus retired, is determining how you would like to address the users' intent and to which Answer would be most relevant.  Authoratative Web Pages are triggered on a set of keywords wheres an Answer can be one of two types, Bookmark or QnA.  Bookmarks Answers are best used when the query is expressed as a set of keywords, for example, "time off" whereas QnA Answers are best used when the query is expressed as a question, for example "where can i see my vacation balance" - otherwise the presentation of these answers is similar - featured prominantly above ranked results in the SERP.

The option to configure both Bookmark and QnA Answers provides more flexibility to help guide users' in the organization to the best, most authorative result based on their query.

Learn more about the different Answers in Microsoft Search at https://wbaer.net/2020/10/making-the-most-of-answers-in-microsoft-search/.

The next step is setting up your new Answers in (Microsoft Search)[https://docs.microsoft.com/en-us/microsoftsearch/plan-your-content].