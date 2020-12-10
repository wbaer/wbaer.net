---
title: 'Running the Microsoft SharePoint 2010 Products Preparation Tool with Local Paths on Machines without Internet Connectivity'
date: Fri, 11 Dec 2009 20:53:13 +0000
draft: false
tags: ['IT Pro Resources', 'Migration &amp; Upgrade', 'SharePoint', 'SharePoint Foundation 2010', 'SharePoint Server 2010']
---

One of the questions I’ve received on a few occasions to date is how to run the Microsoft SharePoint 2010 Products Preparation Tool on a machine that does not have a connection to the Internet.

There are two possible methods to working around this scenario:

Manually download on another machine and then install the prerequisite software and configure the Server Roles, Role Services, and Features accordingly. 

See the following posts that describe the prerequisite software and accompanying download locations in addition to configuring the required Server Roles, Role Services, and Features for Microsoft SharePoint Foundation and Server 2010.

[Configuring the Web and Application Server Roles for Microsoft SharePoint Foundation and Server 2010](http://blogs.technet.com/wbaer/archive/2009/12/06/configuring-the-web-and-application-server-roles-for-microsoft-sharepoint-server-and-foundation-2010.aspx)

[Installation Notes for Microsoft SharePoint Server and Microsoft SharePoint Foundation 2010 Beta](http://blogs.technet.com/wbaer/archive/2009/11/18/installation-notes-for-microsoft-sharepoint-server-and-microsoft-sharepoint-foundation-2010-beta.aspx)

The second option is to create and implement an installation file that specifies local or network paths to be used by the Microsoft SharePoint 2010 Products Preparation Tool:

Create the file PrerequisiteInstaller.Arguments.txt and specify the local or network path of the software to be installed that was downloaded through the links provided in the links above.

Create a new text document PrerequisiteInstaller.Arguments.txt in a text editor (Notepad).

Open PrerequisiteInstaller.Arguments.txt and specify the custom paths using the following examples:

/W2K8SP2:<path>

/NETFX35SP1:<path>

/PowerShell:<path>

/WindowsInstaller:<path>

/IDFX:<path>

/Sync:<path>

/ChartControl:<path>

/FilterPack:<path>

/ADOMD:<path>

/SQLNCli:<path>

A single space should separate each switch and argument, I.e. /NETFX35SP1:<path> /WindowsInstaller:<path>.  For additional help see the example below:

For example:

/NETFX35SP1:”\\<server><share>dotnetfx35.exe” /IDFX:”\\<server><share>MicrosoftGenevaFramework.x64.msi”  
/ChartControl:”\\<server><share>MSChart.exe” /sqlncli:”\\<server><share>sqlncli.msi”  
/Sync:”\\<server><share>Synchronization.msi” /WindowsInstaller:”\\<server><share>Windows6.0-KB942288-v2-x64.msu”

Save PrerequisiteInstaller.Arguments.txt to the directory where PrerequisiteInstaller.exe resides and run PrerequisiteInstaller.exe or run PrerequisiteInstaller.exe from the Command Prompt and append with the arguments used in PrerequisiteInstaller.Arguments.txt. 

PrerequisiteInstaller.exe will use the paths specified in PrerequisiteInstaller.Arguments.txt or the Command Prompt arguments when installing the software prerequisites for Microsoft SharePoint Foundation and Server 2010.

For additional help using the Microsoft SharePoint 2010 Products Preparation Tool from the Command Prompt run PrerequisiteInstaller.exe /?.