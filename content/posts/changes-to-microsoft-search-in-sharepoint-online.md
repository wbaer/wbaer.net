---
title: 'Changes to Microsoft Search in SharePoint Online (Updated 01/11/21)'
date: Mon, 04 Jan 2021 16:57:20 +0000
draft: false
tags: ['Microsoft Search', 'FQL', 'KQL', 'Search']
---

Last month we shared [changes we're making to Microsoft Search in SharePoint Online](https://techcommunity.microsoft.com/t5/microsoft-search-blog/we-re-making-changes-to-search-in-sharepoint-online/ba-p/1971119) as we continue our journey of bringing Microsoft Search to your favorite Microsoft 365  productivity apps and services.  As a result of this announcement, we've seen questions as to whether FQL (FAST Query Language) is being deprecated as a result of these changes.  The simple answer is **no**, FAST Query Language is not being deprecated; however, there are some features of FAST Query Language that are being deprecated:

* **COUNT**: Specifies the of number query term occurrences an item must include for the item to be returned as a result.  
* **FILTER**: Current behavior is that this FQL operator impacts ranking of results. After deprecation, FQL queries will work as before, but the ranking may be impacted. 
* **Dynamic rank** ‘weight’ parameter to the ‘string’ operator: The parameter will be ignored. Apart from that, the query will work as before. 
* Per string configuration of linguistics on/off: Enables linguistics control where stemming is not applied to the expressions enclosed in the affected string() operator.  After deprecation, FQL queries will work as before, but the ranking may be impacted. 
* **FQL dynamic rank difference** between OR and ANY: After, FQL queries will work as before, but the ranking may be impacted. 

*Additional Details*

As specified in https://docs.microsoft.com/en-us/sharepoint/dev/general-development/fast-query-language-fql-syntax-reference#fql-operators, the operators include basic search operators as AND/OR/NOT, a generic STRING operator and numeric data operators like RANGE.  As mentioned above, there are 3 operators deprecated as a result of these changes:

**COUNT**: This is a special operator that was created to support a limited number of legacy FAST scenarios no longer in use.  The operator enables a filtering based on the number of query term occurrences an item must include for the item to be returned as a result. 
**FILTER**: This FQL operator only impacts ranking of results. Any FQL sub-expression can be enclosed in a FILTER() operator clause, and this will impact the relevance ranking associated with the sub-expression inside the FILTER() expression. After deprecation, FQL queries will work as before without any impact on recall (set of results returned), but the relevance ranking of the results may be slightly impacted. The change will not impact any client code using FQL.
**ANY**: Today there is a subtle relevance rank behavior difference between the OR and ANY operator - apart from that, the two operators provide the same query behavior. After the deprecation, the ANY operator will behave as the OR operator also with respect to relevance ranking.

The remaining components of this deprecation are related to query parameters/attributes as described above:

**FQL query parameters/attributes** The parameters impacted by the deprecation are advanced parameters supported for the STRING() operator: https://docs.microsoft.com/en-us/sharepoint/dev/general-development/fast-query-language-fql-syntax-reference#fql_string_operator. 
**Dynamic rank ‘weight’ parameter**: After these changes, the parameter will be ignored and apart from a possible subtle relevance rank impact, the query will work as before.
**Per string configuration of linguistics on/off**: Enables linguistics control where stemming is not applied to the expressions enclosed in the affected string() operator.  In this context, stemming means the support for match on grammatical variants of a word inside the double quoted expression inside the STRING() operator.

Except for the COUNT() operator, the other deprecated features as a result of this change will only imply a subtle difference in relevance ranking of results from full-text query expressions.