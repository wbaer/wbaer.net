---
title: 'Windows SharePoint Services 2.0 vs. 3.0 Incremental Crawl'
date: Sat, 02 Dec 2006 23:54:00 +0000
draft: false
tags: ['Search']
---

In a recent conversation with a colleague I was asked the differences between **Windows SharePoint Services 2.0** and 3.0 incremental crawls and the availability of results and thought I would share and explain briefly the differences here:

In **Windows SharePoint Services 2.0** when an incremental crawl is run, **SharePoint** determines whether or not a document has changed and should therefore be included in the incremental crawl results. It does it by performing a _hash_ of the document, if the _hash_ is different between crawls, then so is the document and the document is readily; though, perhaps not immediately available to search results, but are available prior to any complete crawl being run successfully.

For the **Windows SharePoint Services 3.0** these rules have changed; the crawler uses the **Windows SharePoint Services** change log to inform itself of changes made to a site collection. This change log informs the crawler whether items have been added, modified, or deleted and the crawler managed the change according to those variables and will always append to the existing index on the indexer and makes the results immediately available.

In retrospect, the item is not available in search results until it is crawled and propagated (seconds) in **Microsoft Office SharePoint Server 2007**. It does not wait for the crawl to complete, but happens on an ongoing basis. The key to achieving the most current results propagation are frequent incremental crawls.