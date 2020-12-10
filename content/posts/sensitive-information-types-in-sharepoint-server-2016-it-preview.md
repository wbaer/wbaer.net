---
title: 'Sensitive Information Types in SharePoint Server 2016 IT Preview'
date: Wed, 26 Aug 2015 19:40:00 +0000
draft: false
tags: ['Ediscovery', 'SharePoint', 'SharePoint Server 2016']
---

One of the key improvements to eDiscovery in SharePoint Server 2016 IT Preview is the introduction on Sensitive Information Types to eDiscovery.

In SharePoint Server 2016 IT Preview Data Loss Prevention is now built into Enterprise Search. It allows you to search for sensitive content in your existing eDiscovery Center, keeping content in place and enabling you to search in real time.  SharePoint Server 2016 IT Preview provides a wide range of sensitive information types from different industry segments and geographies, such as credit card numbers, Social Security numbers (SSNs), bank account numbers, and other types, many of which you may already be using to search for sensitive content in email. These sensitive information types are detected based on pattern matching and are easy to set up.

Sensitive Information Types are defined by patterns that can be identified by Regular Expressions or a Function and are available for use within Data Loss Prevention policies. Sensitive Information Types improve on simple pattern matching by supporting the use of corroborative evidence such as keywords and checksums to identify sensitive information stored in SharePoint Server 2016 IT Preview in addition to including native confidence level and proximity logic that is used in the evaluation process.

Using the US Social Security Number sensitive information type as an example:

Patterns are identified in one of two ways, Formatted and Unformatted as shown below:

Formatted:

*   Nine digits in the format ddd-dd-dddd OR ddd dd dddd

Unformatted:

*   Nine digits in the format ddddddddd

For proximity it can be 85, 75, 65, or 55 percent. Using 85% as an example:

A Data Loss Prevention policy is 85% confident that it's detected this type of sensitive information if, within a proximity of 300 characters:

*   The function Func\_ssn finds content that matches the pattern.
*   At least one of the following is true:

*   A keyword from Keyword\_ssn is found.
*   The function Func\_us\_date finds a date in the right date format.
*   The function Func\_us\_address finds an address in the right date format.

The specific native keywords based on this type include:

Social Security

Social Security#

Soc Sec

SSN

SSNS

SSN#

SS#

SSID

In this example we have a document that contains the following information in Microsoft Word .docx format with a document name of Candidate Profile for Garth Fort containing the unformatted text:

Candidate Profile for Garth Fort

Background check completed on 8/26/2015

Social Security Number: 123-45-6789

Expires: 8/26/2018

A new eDiscovery Case is created within the eDiscovery Center as Credit Cards and SSNs and a corresponding query mapped to those types:

SensitiveType=”Credit Card Number” OR SensitiveType=”U.S. Social Security Number (SSN)”

In this example the document, once crawled, is discovered as having met the conditions of the Sensitive Information Type and presented as a result in the eDiscovery Case where additional actions can be taken against the content such as Export.

[![clip_image002](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image002_thumb_42386FA0.jpg "clip_image002")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/clip_image002_3E)6C.jpg)

To learn more about available Sensitive Information Types see also [https://technet.microsoft.com/en-us/library/jj150541(v=exchg.160).aspx](https://technet.microsoft.com/en-us/library/jj150541(v=exchg.160).aspx).