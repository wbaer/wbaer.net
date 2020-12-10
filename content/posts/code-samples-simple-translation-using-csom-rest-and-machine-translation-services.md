---
title: 'Code Samples, Simple Translation using CSOM, REST, and Machine Translation Services'
date: Fri, 30 May 2014 01:39:47 +0000
draft: false
tags: ['Code Samples', 'Machine Translation Services', 'OneDrive for Business', 'SharePoint', 'SharePoint Server 2013']
---

Machine Translation Services is a powerful Shared Service Application in SharePoint Server 2013 that provides automation synchronous and asynchronous translation of documents, folders, and sites.  The code samples in this post provide simple examples of synchronous document translation using the Client Side Object Model in managed (C#) applications and Windows PowerShell in addition to accessing Machine Translation Services via REST.

CSOM
====

The Client Side Object Model (CSOM) provides a rich alternative to earlier Web Services in providing an object-oriented system for interoperating with SharePoint data from a remote (client) machine.

The foundation of CSOM interop is the client context object which represents the current request context.  In the provided samples, it is represented in the C# example as:

new ClientContext(site)

or in the Windows PowerShell sample as:

New-Object Microsoft.SharePoint.Client.ClientContext($url) where the $url in this example is a parameter passed to the script.

Through this context you can obtain access to client objects to include site collections and their subordinates as represented in the above examples.

For example, in the sample scripts (download link below), the top-level site collection represents the new client context which is passed to the SyncTranslator class of the TranslationServices namespace as the Context property.

$context \= New-Object Microsoft.SharePoint.Client.ClientContext($url)  
$credentials \= New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($username, $password)  
$context.Credentials \= $credentials

$job \= New-Object Microsoft.Office.Client.TranslationServices.SyncTranslator($context, $language)

REST
====

REST or Representational State Transfer in the context of SharePoint 2013 development opens it to standard Web languages and technologies.  Technologies such as CSOM (as shown above) have been available to SharePoint over several releases; however, such APIs are limited to .NET applications and languages.  REST; however, enables accessing SharePoint capabilities and entities with standard Web languages such as JavaScript and preprocessor hypertext (PHP) in addition to any technology stack that supports REST.   One of the predominant benefits of REST is that it allows for limiting the footprint of Web applications, as such, reduces the barrier to entry to accessing cloud services and deploying applications whose target is such.

In SharePoint the REST service is implemented in client.svc contained within \_vti\_bin; however, through substitution \_api is used and establishes the base Url for each endpoint.

The service Url of specific endpoints is appended to the base Url, in the sample code:

$request \= \[System.Net.WebRequest\]::Create($url +"/\_api/TranslationJob.EnumerateSupportedLanguages")

These samples are intended to illustrate how Windows PowerShell can be used to access cloud services through CSOM and REST.

Download the samples here:

[CSOM](http://code.wbaer.net/Machine%20Translation%20Service/CSOM/CSOM.zip) (Windows PowerShell and C# Samples)

[REST](http://code.wbaer.net/Machine%20Translation%20Service/REST/REST.zip) (Windows PowerShell Samples)