---
title: 'Productivity on the go...'
date: Mon, 04 Jun 2007 16:26:00 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'SharePoint Tips', 'Uncategorized', 'Windows SharePoint Services 3.0']
---

Of the many benefits of Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007, often overlooked is the native support of mobile devices through embedded mobile site URLs and mobile views.

Mobile views permit both viewing and updating Lists and Document Libraries from a mobile device. 

When considering leveraging mobile views, you should carefully consider the restrictions on length and size of some parts of a list or library. 

**Limitations**

Rendering and performance are considered in mobile views, therefore it is important to understand the limitations imposed by these considerations when implementing Lists and/or Document Libraries, for instance many common fields should have a character limitation of no greater than 20 applied, these include List and Document Library titles and names, and List and column name titles.  When the 20 character limit is exceeded, mobile device users will be presented with an ellipses representing the additional characters.  In example, a List title ThisListHasOverCharacters will be rendered on the mobile device as ThisListHasOverChara... See below for a complete list of limitations to consider when designing Lists and Document Libraries settings for mobile views.

  

**Item**

**Limit**

Characters in the Web title of a list or library

20

Characters in a list or library name

20

Number of mobile views

10

Number of items displayed in a view

100

Characters in a list item title

20

Characters in a column name

20

Single-line text field type

256

Multiple-line text field type

256

Each choice in a choice field type

10

Number of options in a choice field type

10

Characters in each item in a lookup field

20

Number of options in a lookup list

20

Characters in a hyperlink or picture field

20

Characters in an attachment file name

20

Number of attachments (to list items) displayed

3

Characters in a calculated field

20

**NOTE** Discussion Boards, the Currency, Yes/No, and Person or Group column types are not supported by mobile views.

**Accessing Mobile Site URLs and Views**

Mobile site URLs and views are native to Windows SharePoint Services 3.0/Microsoft Office SharePoint Server 2007, to access a mobile site URL or view simply append the URL with /m.  In example, <A href="http://%3cserver%3e/%3Cpath%3E/%3Csite%3E's" mce\_href="http:/// /'s">http://<server>/<path>/<site>'s mobile URL can be accessed through <A href="http://%3cserver%3e/%3Cpath%3E/%3Csite%3E/m" mce\_href="http:/// //m">http://<server>/<path>/<site>/m.

> **Standard Site URL View**
> 
> [![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D_thumb%5B11%5D.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D%5B21%5D.png)
> 
> **Mobile Site URL View**
> 
> [![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D_thumb%5B12%5D.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D%5B22%5D.png)

**Creating Mobile Views**

In addition to the embedded mobile views you can also create mobile views for Lists and Document Libraries.

To create a mobile view, select the List or Document Library source and select **Settings**, and then select **Document Library Settings** or **List Settings** from the menu.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D_thumb%5B13%5D.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D%5B23%5D.png)

Select **Create view** and select **Standard View** under the **Choose a view format** section.

**NOTE** Calendar, Access, Datasheet, and Gannt views are not supported for mobile devices.

Using the table in the section labeled Limitations as a guide, complete the required fields on the **Create View:  <List/Document Library>** page.

Expand **Mobile** on the **Create View:  <List/Document Library>** page.

[![](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D_thumb%5B14%5D.png)](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/MobileSiteUrlsandViews_A599/image%7B0%7D%5B24%5D.png)

Select **Make this a mobile view (Applies to pubic views only)** and optionally **Make this the default mobile view (Applies to public views only)**.

Click **OK**.

Now that you understand mobile site URLs and views in Windows SharePoint Services 3.0/Microsoft Office SharePoint Services 2007, go collaborate...on the go!