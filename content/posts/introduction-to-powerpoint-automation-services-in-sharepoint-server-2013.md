---
title: 'Introduction to PowerPoint Automation Services in SharePoint Server 2013'
date: Mon, 12 Nov 2012 21:28:19 +0000
draft: false
tags: ['PowerPoint Automation Services', 'SharePoint', 'SharePoint Server 2013', 'SPC219']
---

Introduction

PowerPoint Automation Services is a new service application in SharePoint Server 2013 that provides automatic server-side conversion of PowerPoint Presentations from one format to another, for example, a PowerPoint Presentation in Open XML File Formar .pptx format can be converted into Portable Document Format (.pdf) for archival purposes, distribution to clients who do not have Microsoft PowerPoint installed, or to protect the presentation from editing.

[![PPTAutomation](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/1018.PPTAutomation_thumb_40B24766.png "PPTAutomation")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/3250.PPTAutomation_08E00343.png)

PowerPoint Automation Services supports conversion of Open XML File Format (.pptx) and PowerPoint 97-2003 presentation format (.ppt) to .pptx, .pdf, .xps, .jpg, and .png.

PowerPoint Automation Services provides conversion capabilities similar to Word Automation Services introduced in SharePoint Server 2010.  The code samples that follow show the similarities between Word Automation Services and PowerPoint Automation Services programming.

Word Automation Services

using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using Microsoft.SharePoint;  
using Microsoft.Office.Word.Server.Conversions;

class Program  
{  
    static void Main(string\[\] args)  
    {  
        string siteUrl = "[http://www.contoso.com";](http://www.contoso.com";)  
        string wordAutomationServiceName = "Word Automation Services";  
        using (SPSite spSite = new SPSite(siteUrl))  
        {  
            ConversionJob job = new ConversionJob(wordAutomationServiceName);  
            job.UserToken = spSite.UserToken;  
            job.Settings.UpdateFields = true;  
            job.Settings.OutputFormat = SaveFormat.MHTML;  
             job.AddFile(siteUrl + "/Documents/Foo.docx",  
                siteUrl + "/Documents/Foo.mht");  
            job.Start();  
        }  
    }  
}

PowerPoint Automation Services

using System;  
using System.Collections.Generic;  
using System.IO;  
using System.Linq;  
using System.Text;  
using System.Web;  
using Microsoft.SharePoint;  
using Microsoft.Office.Server.PowerPoint.Conversion;

class Program  
{  
    static void Main(string\[\] args)  
    {  
        string siteURL = "[http://www.contoso.com";](http://www.contoso.com";)  
        using (SPSite site = new SPSite(siteURL))  
      {  
          using (SPWeb web = site.OpenWeb())  
          {  
              SPFolder docs = web.Folders\[siteURL +  
              "/Shared Documents"\];  
              SPFile file = docs.Files\[siteURL +  
              "/Documents/foo.ppt"\];

              Stream fStream = file.OpenBinaryStream();  
              SPFileStream stream = new SPFileStream(web, 0x1000);

              PresentationRequest request = new PresentationRequest(  
                fStream,  
                ".ppt",  
                stream);

              IAsyncResult result = request.BeginConvert(  
                SPServiceContext.GetContext(site),  
                null,  
                null);

              request.EndConvert(result);

              SPFile newFile = docs.Files.Add(  
                "foo.pptx",  
                 stream,  
                 true);  
           }  
       }  
    }  
}

Conclusion

PowerPoint Automation Services is a new service application in SharePoint Server 2013 that provides automatic server-side conversion of PowerPoint Presentations from one format to another.

Resources

[Learn more about SharePoint Server 2013](http://sharepoint.microsoft.com/en-us/Pages/default.aspx)

[Learn more about PowerPoint Automation Services](http://msdn.microsoft.com/en-us/library/fp179894(v=office.15).aspx)