---
title: 'Making the most of Answers in Microsoft Search'
date: Tue, 06 Oct 2020 22:19:28 +0000
draft: false
tags: ['Microsoft Search']
---

What are Answers in Microsoft Search?
=====================================

An Answer is a highly relevant and high confidence result that satisfies a user intent expressed as a query/question in search, presenting the most relevant information needed to get a job done and help users to faster task completion.

An Answer is a way to address user intent. When searching, the user typically types in characters and keywords to express an intent. Recognizing the keywords that are triggers for specific intents is important, but it is even more important that the content that is shown in search satisfies the user intent.  

Answers are useful when you want to promote a search result to appear above ranked results. For example, for the query "sick leave", you could specify a particular result, such as a link to a site that has a statement of company policy regarding time off work.  You can think of Answers as being navigational aids to assist employees in getting directions to the information that matters most to help them keep productive and informed.

In Microsoft Search, an Answer can come from a variety of sources. The examples below are not meant to be exhaustive. An Answer can be anything that helps fulfil the user’s intent.  

*   Some types of answers can be manually curated by the tenant admin. Examples include editorial Bookmarks, Acronyms, QnA, Locations, and Floorplans. 
*   Answers can be entities that exist in Azure Active Directory: People, Groups, Apps 
*   Answers can be user-created content that exactly matches the user’s intent: News, Files, Sites.. 
*   Answers can be knowledge or entities mined from content or communications.

What kinds of Answers are there?
================================

Calendar
--------

Calendar Answers in Outlook represent a high confidence result that satisfies the searchers original intent.  For example, for a Calendar Answer, “meeting” is a primary intent. “Accept a meeting” contains a sub-intent, “Accept”.  An example query that would trigger a Calendar Answer could be “my next 1:1” or “my next meeting”.

![](https://wbaer.files.wordpress.com/2020/10/calendar-answer.png?w=1024)

Calendar Answer in Outlook

People
------

Often when you are searching for an entity in the enterprise context, you need to rely on knowing at least part of the entity title or exact keywords to search for. People Answers are designed to change how we think about an entity we don't know the name of. For example, we often remember who created or edited the document, but can't really remember it’s name. In a traditional search scenario, we'd and search for “<first-name> <last-name>”, and the results presented would be a set of entities that contain the words “<first-name> <last-name>” in them.  People Answers are designed to allow you to search around a person - consider the scenario below.

Daisy is an employee at Contoso and wants to find a document that Jane Smith has worked on. The document is shared with Daisy, but she can’t remember the name of the document. Daisy opens Office.com, types “Jane” in the search box and clicks on the suggestion for “Jane Smith”. On the SERP Daisy finds the document she is looking for.

An example query that would trigger a People Answer could be "[Megan](https://www.office.com/search/people?auth=2&q=Megan)" ,"Megan Bowen's Office", or "Megan Bowen's Calendar"

![](https://wbaer.files.wordpress.com/2020/10/people-answer.png?w=1024)

People Answer in SharePoint

File
----

File answers, coming soon to Outlook (web), allow you to narrow your search to a file or link within an email suggestive of a file using natural syntax containing file name, author of the file, sender of the email that contains a file or just the file type across attachments you’ve received in addition to files someone shared with you on a Teams chat or your files in OneDrive For Business and SharePoint.

Location
--------

Location Answers help you find addresses and location buildings and places by providing accurate location information, directions, and navigation assistance.  For example, Location Answers can be offices, campuses, buildings, or points of interest.

As best practice, you should consider adding all the important locations of your organization. Unlike Bookmarks and QnA, the index is not refreshed immediately, and it can take several hours for new or changed locations to appear in search results.

![](https://wbaer.files.wordpress.com/2020/10/location-answer.png?w=1024)

Location Answer in SharePoint

Bookmark
--------

Similar to Promoted Results in SharePoint, Bookmark Answers are designed to help employees way find the organization and quickly identify the best and most relevant resource curated by you or your organization such as authoritative sites or documents to satisfy the searchers’ intent.  Examples of Bookmark Answers can include sites, documents, or even files such as the Human Resources site, policy document, or more.

![](https://wbaer.files.wordpress.com/2020/10/bookmark-answer.png?w=1024)

Bookmark Answer in SharePoint

Each bookmark includes a title, a URL, and a set of keywords that trigger it. You can also add categories to a bookmark that can be used for sorting and filtering in the admin portal. A bookmark can have several keywords and several bookmarks can share the same keyword, but reserved keyword can't be shared. When a Bookmark is created or modified, the search index is refreshed immediately, and the bookmark is available to users immediately.

As best practice when creating bookmark answers, consider how a bookmark best represents a means to an end.  For example, you may find through Microsoft Search insights, employees are commonly searching for “time off”.  In this scenario, if your organization has a formal site or process for requesting time off, you may consider creating a bookmark answer to promote this site or process so it shows up at the top of the search results when employees are searching for this topic or guidance.  In addition, you can use insights to understand the various keywords your employees are using to help ensure this answer is presented consistently.  For example, “time off”, “vacation balance”, “pto”, etc.  Bookmark answers can also be used to help employees complete a task as well by integrating Power Apps into the answer, so for this scenario you can help your employees complete tasks, such as entering vacation time or reporting expenses, by adding existing Power Apps to your bookmarks.

In addition, consider reserved keywords for important Bookmark Answers as a Bookmark can have several keywords and Bookmarks can share the same keyword, but reserved keyword can't be shared. When a bookmark is created or modified, the search index is refreshed immediately, and the bookmark is available to users immediately. 

NOTE where Bookmark and Q&A Answers share the same keywords, the Bookmark answer is prioritized in the SERP.

For more information on Bookmark answers see also [https://docs.microsoft.com/en-us/microsoftsearch/manage-bookmarks](https://docs.microsoft.com/en-us/microsoftsearch/manage-bookmarks).

Q&A
---

Q&A Answers are like Bookmarks with the difference in that they allow you to answer the user's questions instead of just providing a link to a webpage. You can also format the answer in rich text. If a bookmark and a Q&A share the same keyword, the bookmark result is shown first. Like bookmarks, the Q&A index is refreshed immediately after a Q&A is added or changed.

![](https://wbaer.files.wordpress.com/2020/10/qna-answer.png?w=1024)

Q&A Answer in SharePoint

For experimental purposes you can download a set of sample QnA’s [here](https://go.microsoft.com/fwlink/?linkid=2145117).

Acronyms
--------

Did you know the world's longest acronym, according to the [_Guinness Book of World Records_](https://simple.wikipedia.org/wiki/Guinness_Book_of_World_Records) is NIIOMTPLABOPARMBETZHELBETRABSBOMONIMONKONOTDTEKHSTROMONT?

Often, we come across unfamiliar acronyms at work. Sometimes, these terms could even mean specific to different teams, projects, or organizations. Finding the meaning of acronyms at work is now easier than ever using natural language queries across Microsoft 365 apps and services. For example, you can query ‘Define DNN’, ‘What is DNN’, ‘Meaning of DNN’ etc. to see all the definitions of DNN used within your organization. Definitions are both mined from the content you have access to and curated by your organizations, Microsoft 365 administrator.

![](https://wbaer.files.wordpress.com/2020/10/acronym-answer.png?w=1024)

Acronym Answer in SharePoint

Acronyms answers are currently available in SharePoint and Office.com (in English) in addition to Bing.com (in English, Spanish, French, German, Portuguese, and Italian) and soon in Outlook web, Outlook mobile, Teams mobile, Office apps like Word, Excel and PowerPoint in English and additional languages.

Acronyms answers can be both created and curated by admins and editors in addition to those that are mined from documents and conversations.

For experimental purposes you can download a set of sample Acronym Answers [here](https://go.microsoft.com/fwlink/?linkid=2144796) that represent a list of U.S. States by abbreviation including their expansion, description as provided by Wikipedia data, and Url linking to their official, respective website.

Floorplan
---------

Floorplans help you navigate offices and their surroundings at your organization. To scale floorplan architectures, Floorplans files must be in DWG format; DWG files can contain text labels. When a text label marks a room, it is called a room label. The DWG file must have at least 10 rooms marked with labels.  DWG is required to process metadata and correlate between Microsoft AAD and these architectures. 

Floor Plans and Locations are available at 100% GA on Bing.com, Office.com and SharePoint.com.

Resources
=========

Learn how to plan content for Microsoft Search at [https://docs.microsoft.com/en-us/microsoftsearch/plan-your-content](https://docs.microsoft.com/en-us/microsoftsearch/plan-your-conten)
---
### Comments:
#### 
[What’s new with Answers in Microsoft Search &#8211; Bill Bär (&#039;bɛər)](http://blog.wbaer.net/2020/11/20/whats-new-with-answers-in-microsoft-search/ "") - <time datetime="2020-11-20 09:27:41">Nov 5, 2020</time>

\[…\] Bookmarks are one of many Answers in Microsoft Search. \[…\]
<hr />
#### 
[Microsoft Search 101 &#8211; Bill Bär (&#039;bɛər)](http://blog.wbaer.net/2020/11/19/microsoft-search-101/ "") - <time datetime="2020-11-19 19:11:03">Nov 4, 2020</time>

\[…\] For example, when searching in Outlook (context or otherwise the setting) the expectation would be results are prioritized to that setting, finding emails, etc. that satisfy the intent of the search or in Microsoft Teams, chats, messages, etc. whereas in SharePoint, the expectation would be to find information related to that setting.  Several “settings”; however, do provide wide coherence in the scope of tenant-wide search to include Office.com, SharePoint home, Bing, and the NTP in Microsoft Search are all scoped to tenant-wide results by default.  In addition, for several core Answers, coherence is provided across search entry points. Learn more about Answers here. \[…\]
<hr />
#### 
[Should I stay or should I go&#8230;Bookmarks vs Promoted Results | Bill Bär (&#039;bɛər)](http://blog.wbaer.net/2020/10/07/should-i-stay-or-should-i-go-bookmarks-vs-promoted-results/ "") - <time datetime="2020-10-07 11:26:55">Oct 3, 2020</time>

\[…\] Bookmarks are one of many Answers in Microsoft Search. \[…\]
<hr />
#### 
[Microsoft Search deep-dive | Sarah Haase](http://blog.splibrarian.com/2020/11/12/microsoft-search-deep-dive/ "") - <time datetime="2020-11-12 06:13:11">Nov 4, 2020</time>

\[…\] also discussed Bookmarks and Answers in Microsoft Search. Bill advises using Bookmarks when a user query is expressed as a set of \[…\]
<hr />
