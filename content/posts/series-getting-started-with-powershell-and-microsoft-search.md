---
title: 'Getting Started with PowerShell and Microsoft Search APIs'
date: Wed, 6 Jan 2021 23:37:03 +0000
draft: true
tags: ['PowerShell', 'Microsoft Search', 'Microsoft Graph']
---

With the GA of the Microsoft Search API in the Microsoft Graph, I figured I'd take a moment to write a tutorial series on what you can with the Microsoft Search API in the Microsoft Graph and PowerShell.  This is intended to provide some basic, introductory guidance to both the IT Professional and developer.

Since this series is designed more or less for the IT Professional, we'll be using PowerShell to query data in the Microsoft Graph.  That said, the first step is to install the Microsoft Graph PowerShell SDK.

To install the Microsoft Graph PowerShell SDK, in PowerShell (as an administrator), enter Install-Module Microsoft.Graph.

If prompted the NuGet provider is required to continue, select Y.  You may also be prompted that you are installing modules from an untrusted repository, if so, select A (Yes to All).

You can optionally install the module for all users with the Scope parameter, e.g. Install-Module Microsoft.Graph -Scope AllUsers.

To verify the installation completed successfully, you can run Get-InstalledModule Microsoft.Graph.  Your output should appear similar to the following:

| Version  | Name  | Repository  | Description  |
|---|---|---|---|
| 1.2.0  | Microsoft.Graph  | PSGallery  | Microsoft Graph PowerShell module  |

To update the SDK in the future, you can simply run Update-Module Microsoft.Graph.

