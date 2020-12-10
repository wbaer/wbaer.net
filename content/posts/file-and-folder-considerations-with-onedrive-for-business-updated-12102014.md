---
title: 'File and Folder Considerations with OneDrive for Business [UPDATED 12/10/2014]'
date: Sat, 24 May 2014 22:56:00 +0000
draft: false
tags: ['Administration', 'Code Samples', 'OneDrive for Business', 'SharePoint Server 2013']
---

Updated 8/12/2014 – Removed & as an illegal character.  & character is now supported with OneDrive for Business sync client and Web UX. Updated 8/22/2014 – Updated to include prohibited types per [http://office.microsoft.com/en-us/office365-sharepoint-online-small-business-help/types-of-files-that-cannot-be-added-to-a-list-or-library-HA101907868.aspx](http://office.microsoft.com/en-us/office365-sharepoint-online-small-business-help/types-of-files-that-cannot-be-added-to-a-list-or-library-HA101907868.aspx "http://office.microsoft.com/en-us/office365-sharepoint-online-small-business-help/types-of-files-that-cannot-be-added-to-a-list-or-library-HA101907868.aspx"). Updated 8/23/2014 – Updated to include optional UI-based scanning (FileCheckerUI.exe). Updated 8/31/2014 – Updated FileChecker.exe (integrated desktop and command line application). Updated 12/10/2014 – Updated to remove prohibited characters {, }, \[, \], ~, and ..  Updated FileChecker.exe When considering a migration to OneDrive for Business you should be aware of the specific File and Folder considerations and restrictions.  While some considerations exist that are explicit to OneDrive for Business and SharePoint; others are derivatives of the underlying client and/or server file system.  For example, on Microsoft Windows the following characters cannot be used in paths or files:

Files
-----

<

\>

|

☺

☻

♥

♦

♣

♠♫

☼

►

◄

↕

‼

¶

§

▬

↨

↑

↓

→

←

∟

↔

▲

▼

:

\*

?

/

Paths
-----

<

\>

|

☺

☻

♥

♦

♣

♠♫

☼

►

◄

↕

‼

¶

§

▬

↨

↑

↓

→

←

∟

↔

▲

▼

:

\*

?

/ **NOTE** The above represents an array returned by the Path.GetInvalidFileNameChars and Path.GetInvalidPathChars methods respectively.  These methods; however, do not return a complete set of characters invalid in file and path names as they can differ depending on the underlying file system.  On Windows-based desktop platforms, invalid path characters might include ASCII/Unicode characters 1 through 31, as well as quote ("), less than (<), greater than (>), pipe (|), backspace (b), null () and tab (t) in addition to those in the example above.

File and Folders preceded with (\_).
====================================

Files and Folders whose name is preceded with the (\_) are considered ‘hidden’.  This limitation is derived from the Win32FileAttributes in the WebDAV protocol.  In scenarios where a File and/or Folder are preceded with (\_), such as \_Documents or \_document.docx, in both cases the File and/or Folder will be visible in the OneDrive for Business Sync Client as well as the Web UI; however, when using Explorer View in the Web UI, Files and Folders preceded with (\_) will not be visible.  Explorer View in OneDrive for Business uses the WebDAV protocol.  WebDAV refers to Web Distributed Authoring and Versioning, an extension of the HTTP protocol that is used to enable management of documents stored on WWW servers.  The scenario herein is based on limitations implied in FrontPage 2000 (see also [http://support.microsoft.com/kb/219193](http://support.microsoft.com/kb/219193 "http://support.microsoft.com/kb/219193")). In OneDrive for Business Explorer View can be instantiated by selected the Open with Explorer option in the Ribbon. [![Picture1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_thumb_6D95B8FF.png "Picture1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_4BAA567B.png) When you use Open with Explorer, it opens Windows Explorer on your computer, but it displays the folder structure on the server computer that underlies the site.  You can manipulate the files in the folder, such as copying, renaming, deleting, etc. Customers who have deployed OneDrive for Business on-premises can nullify the Win32FileAttributes using Windows PowerShell or C# as illustrated in the samples below:

Windows PowerShell
------------------

For IT Professionals you can use Windows PowerShell to remove the vti\_winfileattribs folder metadata as shown in the example below. $Folder = (Get-SPWeb http://contoso.sharepoint.com).Folders\["<DocLib\_Name>"\].SubFolders\["<\_Folder\_Name\>"\] $Folder.Properties\["vti\_winfileattribs"\]=""

C#
--

Developers can use the SPFolder.Properties property to enumerate the hash table that contains the metadata for folders and implement the DeleteProperty method to deletes the element with the vti\_winfileattribs key from the metadata for the folder.  See also [http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.spfolder.deleteproperty(v=office.15).aspx](http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.spfolder.deleteproperty(v=office.15).aspx "http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.spfolder.deleteproperty(v=office.15).aspx") for an explanation and examples of using the SPFolder.DeleteProperty method.

WebDAV Resources
----------------

WebDAV API Functions \[[http://msdn.microsoft.com/en-us/library/windows/desktop/dd408161(v=vs.85).aspx](http://msdn.microsoft.com/en-us/library/windows/desktop/dd408161(v=vs.85).aspx "http://msdn.microsoft.com/en-us/library/windows/desktop/dd408161(v=vs.85).aspx")\] \[MS-WDV\]: Web Distributed Authoring and Versioning (WebDAV) Protocol: Client Extensions \[[http://msdn.microsoft.com/en-us/library/cc250046.aspx](http://msdn.microsoft.com/en-us/library/cc250046.aspx "http://msdn.microsoft.com/en-us/library/cc250046.aspx")\] \[MS-WDVSE\]: Web Distributed Authoring and Versioning (WebDAV) Protocol: Server Extensions \[[http://msdn.microsoft.com/en-us/library/cc250200.aspx](http://msdn.microsoft.com/en-us/library/cc250200.aspx "http://msdn.microsoft.com/en-us/library/cc250200.aspx")\]

Files and Folders preceded or followed with (.).
================================================

A number of restrictions with File and Folder naming convention are derivative of the the File System, developers who use the Windows APIs for file and device I/O in many cases, understand the various rules, conventions, and limitations of names for files and directories. Files and Folders whose name is preceded or followed with the (.) character cannot be stored or synchronized with the OneDrive for Business.  All file systems follow the same general naming conventions for an individual file: a base file name and an optional extension, separated by a period.   The assumption in this case is (.) separates the base file name from the extension in the name of a directory or file.

Restricted Characters in File and Folder Names
==============================================

Beyond those limitations documented above, users can create Files and Folders using any character including Unicode characters and characters in the extended character set (128–255), except for the following reserved characters:

*   < (less than)
*   \> (greater than)
*   : (colon)
*   " (double quote)
*   / (forward slash)
*   (backslash)
*   | (vertical bar or pipe)
*   ? (question mark)
*   \* (asterisk)

These limitations are applicable to Microsoft Windows. In addition you cannot use the:

*   ~ (Tilde)
*   \# (Number Sign)
*   % (Percent)
*   \[ \] (Braces)
*   { } (Angle Brackets)
*   ? (Question Mark)
*   You cannot use the period character consecutively in the middle of a folder name.  In the Windows File System, two consecutive periods (..) are used as a directory _component_ in a path to represent the parent of the current directory, for example "..temp.txt".

These limitations are applicable to OneDrive for Business and SharePoint 2013.  For additional information see also [http://support.microsoft.com/kb/905231](http://support.microsoft.com/kb/905231 "http://support.microsoft.com/kb/905231").

Other Considerations
====================

SharePoint 2013 and OneDrive for Business do not provide support for POSIX semantics, that is a Folder “Foo” and “foo” are considered the same, as opposed to differing paths.

Validating File and Folder Names
================================

Developers can validate File and Folder names using a number of methods.  The sample code at [http://tinyurl.com/opcjfor](http://tinyurl.com/opcjfor) uses Regular Expressions to deterministically identify illegal characters in a File name.

Syntax
------

FileChecker.exe -d C:Temp

Screenshots
-----------

### Source Directory

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_7AFE5CB6.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_2B25A77A.png)

### Filechecker.exe

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_2E5CB0C4.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_15CA82C3.png)

### Output

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_5B742E43.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_04E86F84.png)