---
title: 'Document Property Promotion and Demotion Overview and Considerations'
date: Fri, 29 Aug 2014 20:39:07 +0000
draft: false
tags: ['Administration', 'IT Pro Resources', 'SharePoint', 'SharePoint Server 2013']
---

Overview
========

Document Property Promotion and Demotion is a Feature in versions of SharePoint designed to synchronize specific metadata across documents and its parent List columns and/or fields.

Property promotion refers to the process of extracting values from properties of a document and writing those values to corresponding columns on the list or document library where the document is stored.

Property demotion is the same process in reverse. Values are read from list columns and written to document properties.

Document Parser
===============

SharePoint works together with a document parser to provide automation of the process of promoting and demoting properties so if the value of a one or more document properties changes, those changes are automatically synchronized to the parent List object or conversely when the values of the parent List columns or fields in a list item change, those changes are synchronized to the subordinate document associated with the item.

Document Parsers represent a significant advantage to managing metadata associated with one or more documents stored in a SharePoint List or Library, by providing a programmatic approach to managing the metadata associated with a document removing the need to manually synchronize important document characteristics across a document and its parent container.  By default SharePoint Server 2013 provides document parsers (pluggable) for the following types:

_docx      SharePoint.SPDocumentParser.OfficeParser_

_docm      SharePoint.SPDocumentParser.OfficeParser_

_dotx      SharePoint.SPDocumentParser.OfficeParser_

_dotm      SharePoint.SPDocumentParser.OfficeParser_

_pptx      SharePoint.SPDocumentParser.OfficeParser_

_pptm      SharePoint.SPDocumentParser.OfficeParser_

_potm      SharePoint.SPDocumentParser.OfficeParser_

_potx      SharePoint.SPDocumentParser.OfficeParser_

_ppsx      SharePoint.SPDocumentParser.OfficeParser_

_ppsm      SharePoint.SPDocumentParser.OfficeParser_

_xlsx      SharePoint.SPDocumentParser.OfficeParser_

_xlsb      SharePoint.SPDocumentParser.OfficeParser_

_xlsm      SharePoint.SPDocumentParser.OfficeParser_

_xltx      SharePoint.SPDocumentParser.OfficeParser_

_xltm      SharePoint.SPDocumentParser.OfficeParser_

_gif       SharePoint.SPDocumentParser.ImageParser_

_jpeg      SharePoint.SPDocumentParser.ImageParser_

_jpg       SharePoint.SPDocumentParser.ImageParser_

_jpe       SharePoint.SPDocumentParser.ImageParser_

_jfif      SharePoint.SPDocumentParser.ImageParser_

_bmp       SharePoint.SPDocumentParser.ImageParser_

_dib       SharePoint.SPDocumentParser.ImageParser_

_png       SharePoint.SPDocumentParser.ImageParser_

_tif       SharePoint.SPDocumentParser.ImageParser_

_tiff      SharePoint.SPDocumentParser.ImageParser_

_ico       SharePoint.SPDocumentParser.ImageParser_

_wdp       SharePoint.SPDocumentParser.ImageParser_

_hdp       SharePoint.SPDocumentParser.ImageParser_

In addition to the parsers provided out of the box, SharePoint Server 2013 also provides an extensible document parsing infrastructure that allows developers to install custom parsers for types not included out of the box to enable the process of property promotion and demotion for those types.

Architecture
============

Flow
----

Document Promotion and Demotion is applied when the following conditions are met:

*   A document is uploaded to a SharePoint Document Library
*   List item fields associated with a document are modified
*   SPFile object properties are programmatically modified
*   A document is downloaded after the list item schema is modified (first run experience only)

[![Picture1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_thumb_78891612.png "Picture1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_7B9B7407.png)

In each scenario SharePoint will attempt to determine whether or not a parser is associated with the document type and in the event a parser is associated with the document type, SharePoint invokes the parser and sends the parser the document and property bag object.  If a promotion scenario, the document parser will fill the property bag with the values that need to be synchronized with the parent list or in a demotion scenario, extracts values from the property bag that need to be written to the document.

Content Types
-------------

Referencing the illustration above, when using the document parser interface, document parsers can access the Content Type assigned to a document and subsequently store the content type in the document in addition to updating the Content Type definition stored in the document to match the version of the definition used by a List or Document Library.

[![Picture1](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_thumb_4EAB328E.png "Picture1")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/Picture1_2846BE92.png)

Validating Input / Output
=========================

For content supportive of Document Parsing an XML namespace designation is added to the document metadata, in some cases, the document itself.

Example 1
---------

Create a new HTML type document “PropValidation.html”.

Copy into the document the following HTML:

<html>  
    <head>  
</head>  
        <body>  
            <span>Hello World</span>  
        </body>  
    </head>  
</html>

Save as something.html

Upload to a SharePoint Document Library and open the document.

The following html will be added to the document

<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">  
    <head>  
         
<!--\[if gte mso 9\]><xml>  
<mso:CustomDocumentProperties>  
<mso:IsMyDocuments msdt:dt="string">1</mso:IsMyDocuments>  
</mso:CustomDocumentProperties>  
</xml><!\[endif\]-->  

</head>  
        <body>  
            <span>Hello World</span>  
        </body>  
    </head>  
</html>

Notice the UUID element.  The UUID is an XML namespace designation used as part of property demotion, everyone who saves an HTML-like file to a SharePoint document Library will have the same GUID inserted into the document.

Example 2
---------

Create a new Microsoft Word Document (Document.docx).

Edit the document properties and specify a Title property of “Parse this field”.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_6B47AE61.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_051BE491.png)

Upload the document to a Document Library.  The Title column field associated with the document will reflect the document property (promotion).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_7F635B9B.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_5D77F917.png)

Edit the Title property of Document.docx in the browser.

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_759DF423.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_4C935527.png)

Download the document, the document property will be updated to reflect the value specified in the Title column field associated with the document (demotion).

[![image](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_thumb_4746FF27.png "image")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/prod.evol.blogs.technet.com/CommunityServer.Blogs.Components.WeblogFiles/00/00/00/48/65/metablogapi/image_6591B61D.png)

### Special Content Type Considerations

In some cases a document Content Type may not be associated with the Document Library where the document is uploaded (I.e. a user creates a document from a Document Template containing a Content Type or moved the document to a different Document Library.  In these scenarios, unlike the flow depicted in the image above, SharePoint will:

*   Invoke the Document Parser to demote the out of the box default List Content Type for the Document Library into the document **if** the document contains a property for a Content Type, **but** the document property is empty.  SharePoint will then promote the document properties to match columns in the out of the box List Content Type.
*   Leaves the document Content Type unchanged **if** the Document Library allows any Content Type **and** the document is assigned a Content Type **not** associated with the Document Library.  SharePoint will not promote the document Content Type, but will promote any document properties that match the Document Library columns.

> **NOTE**
> 
> If a List is set to allow any Content Type, documents of any Content Type can be uploaded and their Content Types will not be overwritten which subsequently enables movement of documents between Libraries without the documents losing their metadata.

*   Invokes the Document Parser to demote the out of the box List Content Type for the Document Library into the document **if** the document is assigned a Content Type that **is not** associated with the Document Library **and** the Document Library does not allow any Content Types (see Note above).  SharePoint then promotes the document properties that match columns in the out of the box List Content Type and stores the document.

Enumerating Pluggable Parsers
=============================

Enumeration of Document Parsers lists all of the default (pluggable) parsers shipped with SharePoint.

To enumerate pluggable parsers refer to the following code sample.

C#
--

```
namespace EnumParsers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.SharePoint.Administration;

    public static class Program
    {
        private static void Main()
        {
            SPFarm objFarm = SPFarm.Local;
            SPWebService service = objFarm.Services.GetValue<SPWebService>(string.Empty);

            Dictionary<string, SPDocumentParser> objParser = service.PluggableParsers;
            Dictionary<string, SPDocumentParser>.KeyCollection keys = objParser.Keys;

            Console.WriteLine("Extension     Parser");
            Console.WriteLine("---------     -------");
            foreach (string key in keys)
            {
                Console.WriteLine(string.Format(CultureInfo.CurrentCulture, "{0, -7}       {1}", objParser\[key\].FileExtension, objParser\[key\].ProgId));
            }
        }
    }
}
```

Disabling the Document Parser
=============================

The Document Parser can be enabled and/or disabled on-premises by configuring the SPWeb.ParserEnabled value to True|False.

C#
--

```
namespace ParserEnabled
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.SharePoint;
    using Microsoft.SharePoint.Administration;

    class Program
    {
        static void Main(string\[\] args)
        {
            SPFarm oFarm = SPFarm.Local;
            SPSecurity.RunWithElevatedPrivileges(delegate()
            {
                SPWebApplication webApp = SPWebApplication.Lookup(new Uri("http://www.contoso.com"));

                foreach (SPSite site in webApp.Sites)
                {
                    foreach (SPWeb web in site.AllWebs)
                    {
                        if (web.ParserEnabled == true)
                        {
                            web.ParserEnabled = false;
                            web.Update();
                        }
                    }
                }
            });
        }
    }
}

```

Windows PowerShell
------------------

$web = Get-SPWeb [www.contoso.com](http://www.contoso.com)  
$web.ParserEnabled = $false  
$web.Update()  

**NOTE**

Disabled Document Parsing should be carefully considered as it will also impact Features dependent on promotion and demotion.  For example, content type syndication and document information panels.

Disabling Document Parsing is effectively a one-way operation.  Disabling parsing disables the bidirectional synchronization of document properties, if disabled, and subsequently re-enabled and the properties are diverged while disabled, the original property values will be synchronized as contained within the property bag.

Similarly, Document Parsers also affect how content types are managed.  For example, when SharePoint invokes a parser to promote document properties (writes the properties to the parent List), the parser writes all document properties to an instance of the IParserPropertyBag interface and then determines which properties in the property bag match the columns on the parent List or Library.  If the property bag indicates that the document has an assigned content type, and the content type is supported by the document library, SharePoint promotes the document properties that match the columns that are included in the content type.

Associating Custom Parsers with File Types
==========================================

In addition to enumeration and disabling document parsers, you can also add a document parser and associate with a specific parser.

The example below associates a custom document parser with an RTF extension.

C#
--

```
namespace AddParsers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.SharePoint.Administration;

    public static class Program
    {
        static void Main(string\[\] args)
        {
            SPWebService service = SPWebService.ContentService;
            Dictionary<string, SPDocumentParser> parsers = service.PluggableParsers;

            string extension = "rtf";
            string progID = parsers\["docx"\].ProgId;
            SPDocumentParser customParser = new SPDocumentParser(progID, extension);

            if (parsers.ContainsKey(extension))
            {
                parsers.Remove(extension);
                service.Update();
            }

            service.PluggableParsers.Add(extension, customParser);
            service.Update();
        }
    }
}
```

Purpose
=======

Document parsing in SharePoint provides a number of benefits to the management of metadata around documents,

Metadata management is a powerful capability offered in SharePoint, document parsing simplifies the scenario of maintaining consistent metadata between documents and their parent libraries and parent libraries and their subordinate documents.

In SharePoint several Features leverage Document Parser logic to include:

**Link Fixup**

Link Fixup is used to indicate a Web Part property that contain one or more links to a document, if the document is moved or renamed, Link Fixup corrects the absolute Url to reflect the new location as a relative Url.  See also ManagedLinkAttribute.Fixup property.

**Property Panels**

Document Information Panels are forms that are displayed within the client application, and which contains fields for the document metadata. Document information panels enable users to enter important metadata about a file anytime they want, without having to leave the client application.  For example, a Document Information Panel may include custom properties to associated with a document, such as declaration information, specific terms, etc.

For files stored in document libraries, the document information is actually the columns of the content type assigned to that file. The document information panel displays a field for each content type property, or column, the user can edit.

For documents stored in SharePoint, these property values are promoted back to the document library, as column values, when the user updates them in the document. Similarly, if the user updates the content type column values in the SharePoint user interface, the new values are demoted into the document itself, as document properties.

**Metadata Portability**

See Special Content Type Considerations above.

Conclusion
==========

Document Parsers in SharePoint provide an abstract method for users when managing metadata (document properties) across client and server.
---
### Comments:
#### 
[Bill Baer](http://wbaer.wordpress.com "wbaer@live.com") - <time datetime="2019-12-05 12:02:06">Dec 4, 2019</time>

How can I help?
<hr />
#### 
[Kris]( "kdale@london.ca") - <time datetime="2019-12-18 09:38:49">Dec 3, 2019</time>

Hi Bill, We have multiple libraries that have content types applied to them. All of these content types inherit from the same content type parent which has field X. Each library has a default column value for X that we want all files in the library to have. When users move files between libraries, the field X retains info from the previous library. I can identity the files that have the wrong value for field X and change them via pShell but the wrong value is still stored on the document and gets pushed back to the list item. Also I cant identify the bad info on the document so I can't fix this issue until the bad value is promoted.
<hr />
#### 
[Pieter Veenstra](http://veenstra.me.uk "pieter.veenstra@live.co.uk") - <time datetime="2019-09-13 04:36:25">Sep 5, 2019</time>

Hi Bill, I hit a few critical issues for my client related to Document Properties in Word: https://veenstra.me.uk/2019/09/13/document-properties-in-ms-word-3-major-issues/ Anything you can do to help?
<hr />
#### 
[Document Properties in MS Word, 3 major issues? &#8211; SharePains](http://veenstra.me.uk/2019/09/13/document-properties-in-ms-word-3-major-issues/ "") - <time datetime="2019-09-13 04:34:23">Sep 5, 2019</time>

\[…\] Bill Baer – Document Property Promotion and Demotion Overview and Considerations \[…\]
<hr />
