---
title: 'What’s new with Answers in Microsoft Search'
date: Fri, 20 Nov 2020 17:27:38 +0000
draft: false
tags: ['Acronyms', 'Answers', 'Bookmarks', 'Microsoft Search']
---

NEW FEATURE:  Bookmark Recommendations (FEATURE ID: 68864)
----------------------------------------------------------

Bookmark Answers in Microsoft Search provide the flexibility for you to curate and promote curated resources on top of ranked results to help guide users to authoritative resources. 

Bookmark Answers are designed to help employee’s way find the organization and quickly identify the best and most relevant resource curated by you or your organization such as authoritative sites or documents to satisfy the searchers’ intent.  Examples of Bookmark Answers can include sites, documents, or even files such as the Human Resources site, policy document, or more.

Microsoft Search now simplifies the process of creating and curating Bookmarks with Recommended Bookmarks.  Bookmark recommendations are generated by reasoning across SharePoint sites in Microsoft 365 to suggest Bookmarks to the Microsoft Search administrator, reducing the need to manually look across sites and information to determine the most valuable resources to editorially curate and promote to users of Microsoft Search.

### What’s a Bookmark?

Bookmarks are [one of many Answers in Microsoft Search](https://blog.wbaer.net/2020/10/06/making-the-most-of-answers-in-microsoft-search/).

Answers are highly relevant and high confidence results that satisfy a user’s intent expressed as a query/question in search.

An Answer is a way to address user intent. When searching, the user typically types in characters and keywords to express an intent. Recognizing the keywords that are triggers for specific intents is important, but it is even more important that the content that is shown in search satisfies the user intent.  

Learn more about Bookmarks at [https://blog.wbaer.net/2020/10/07/should-i-stay-or-should-i-go-bookmarks-vs-promoted-results/](https://blog.wbaer.net/2020/10/07/should-i-stay-or-should-i-go-bookmarks-vs-promoted-results/).

### Recommended Bookmarks in Microsoft Search

Recommended Bookmarks are mined from across SharePoint sites in Microsoft 365 and promoted to the Microsoft Search administrator for publication.

As an administrator of Microsoft Search you will be able to either enable or disable the automatic generation of recommended Bookmarks and optionally select to have Bookmarks automatically published to users in your organization; otherwise Bookmarks will be presented to the search administrator in the “Suggested” state where they can be manually reviewed, excluded and/or  published using the Search & intelligence admin dashboard.

[![](https://wbaer.files.wordpress.com/2020/11/rbookmark.png?w=977)](https://wbaer.files.wordpress.com/2020/11/rbookmark.png)

Recommended Bookmarks include the following mined information from SharePoint sites:

*   URL  
*   Title (as configured by the SharePoint admins)  
*   Keywords (Deciphered using SuggestKeyword service in Bookmark settings)  
*   Description (Only if configured on SharePoint site/page) 

#### Configuring recommended Bookmarks

Recommended Bookmarks provide the following setting configurations.

|*Configuration   	|*Behavior   	|*New Configuration   	|*New Behavior   	|
|---	|---	|---	|---	|
|Recommendations – Enabled  Auto publish – Enabled   	|Bookmark recommendations are enabled.  Recommended Bookmarks collected are automatically published to the organization   	|Recommendations – Disabled Auto publish – NA     	|Bookmark recommendations are disabled in Microsoft Search – recommended Bookmarks collected prior to disabling recommendations will be published.   	|
|Recommendations – Enabled  Auto publish – Enabled   	|Bookmark recommendations are enabled.  Recommended Bookmarks collected are automatically published to the organizatio   	|Recommendations – Enabled Auto publish – Disabled   	|New delta recommended Bookmarks are made available in the admin center in a “Suggested” state.  Bookmarks recommendations in a “Published” state are unaffected.   	|
|Recommendations – Enabled  Auto publish – Disabled   	|Bookmark recommendations are enabled.  Recommended Bookmarks collected are made available in the admin center in a “Suggested” state.   	|Recommendations – Enabled Auto publish – Enabled   	|New delta recommended Bookmarks are made available in the admin center in a “Published” state.  Bookmarks recommendations in a “Suggested” state are unaffected.   	|
|Recommendations – Enabled  Auto publish – Disabled   	|Bookmark recommendations are enabled.  Recommended Bookmarks collected are made available in the admin center in a “Suggested” state.   	|Recommendations – Disabled Auto publish – NA   	|Bookmark recommendations are disabled in Microsoft Search – recommended Bookmarks collected prior to disabling recommendations will be published.   	|
|Recommendations – Disabled Auto publish – NA     	|Bookmark recommendations are disabled in Microsoft Search.   	|Recommendations – Enabled  Auto publish – Enabled   	|Bookmark recommendations are enabled.  Recommended Bookmarks collected are automatically published to the organization   	|
|Recommendations – Disabled Auto publish – NA    	|Bookmark recommendations are disabled in Microsoft Search.   	|Recommendations – Enabled Auto publish – Disabled   	|Bookmark recommendations are enabled.  Recommended Bookmarks collected are made available in the admin center in a “Suggested” state.   	|
|   	|   	|   	|   	|

**NOTE** Bookmarks that remain in a “Suggested” greater than 180 days are removed.

### Managing duplicate Bookmarks

All recommended URLs are checked against URLs in existing bookmarks with a Published, Suggested, Excluded, or Scheduled state. If a matching URL is found in any of these existing bookmarks the link will not be recommended. 

### Using exclusion rules with recommended Bookmarks

If you want to exclude certain Bookmark URLs, in addition to child URLs associated with parent URL, setting a Bookmark to an “Excluded” state will prevent the Bookmark from being rendered in search.  Administrators of Microsoft Search can override this setting and elect to force publication of a child URL associated with a parent URL.  For example, [https://contoso.com](https://contoso.com) would be a parent URL of [https://contoso.com/sites/marketing](https://contoso.com/sites/marketing).

How are recommended Bookmarks displayed in search?

The end user experience for recommended and editorial bookmarks are very similar experience. Editorial bookmarks will include the text “Published by <company name>”. For recommended bookmarks, the text will be “Suggested for you”. 

Learn more about Answers in Microsoft Search at [https://docs.microsoft.com/en-us/microsoftsearch/plan-your-content](https://docs.microsoft.com/en-us/microsoftsearch/plan-your-content).

NEW FEATURE:  Acronym Exclusions (FEATURE ID: 68796)
----------------------------------------------------

In November 2020 (available in Targeted Release), you can exclude mined acronyms from appearing in Microsoft Search results.

To exclude an Acronym Answer in Microsoft Search:

1.  In the Microsoft 365 admin center browse to Settings | Search and intelligence, and then select Answers from the list of available options.

2.  Select **Exclude an acronym**.
3.  In the Exclude an acronym panel, enter the information that you want to exclude.
    *   To exclude an acronym, enter the acronym in the Acronym field.
    *   To exclude a meaning for an acronym, enter the acronym in the Acronym field and the meaning in the Stands for field.
4.  Select **Exclude**. It can take up to 7 hours for an excluded acronym to stop appearing in search results.

Excluding an acronym or a meaning doesn't delete the information from the Microsoft 365 admin center. It changes the status to Excluded and prevents the acronym or meaning from appearing in search results. To see your excluded acronyms and meanings:

1.  Next to Applied Filter, click **Status**.
2.  On the Filter panel, select **Excluded**, then select **Apply**.

### NEW FEATURE: File Results (FEATURE ID: 68877)

Results in Microsoft Search will now be presented with dynamic versus fixed height previews to provide support for richer descriptive text.