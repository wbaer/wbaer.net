---
title: 'Web Services, XSL and Windows SharePoint Services Content Management *UPDATED'
date: Sat, 04 Feb 2006 08:50:00 +0000
draft: false
tags: ['Code Samples']
---

I recently posted an article detailing how the Content Editor Web Part can be leveraged to display a menu based on the SELECT element, using hypertext markup and javascript to render hyperlinks in a manner that maximizes Windows SharePoint Services real-estate and promotes a positive user experience. Several requests and questions I received as a result of this post were whether or not the hyperlinks in the Content Editor Web Part could be harvested from a List. As a result I've put together this, albeit, brief tutorial. In this article you will create a Windows SharePoint Services List, create a new XSL transform Data View Web Part, connect to the Lists Web Service, and specify Exensible Style Language (XSL) and JavaScript (JS) to both render, populate and handle to form content.

**Create a Windows SharePoint Services ‘Custom’ List**

1\. Open a Windows SharePoint Services site in your browser, this site will host the List providing the Web Part its content.

2\. Select Documents and Lists from the top navigation bar.

3\. Click Create, and then select Custom List under Custom Lists.

4\. Enter a name and optional description for the list in the Name: and Description: text boxes and click OK.

5\. Select Modify settings and columns on the left navigation bar.

6\. Select Add a new column under Columns.

7\. Enter URL for the new column name in the Column name: text box and click OK.  Accept the default values when creating the new column.

8\. Go back to the list and add at least two new items.  The Title should be the textual representation for your link.

**Connect to the Windows SharePoint Services Lists Web Service**

1\. Open the List in Microsoft Office FrontPage 2003 or a Windows SharePoint Services compatible Web page editor.

2\. Select an open area of the page to insert the Data View.

**NOTE** The following instructions are specific to Microsoft Office FrontPage 2003, consult your Web page editor for instructions corresponding to the remaining instructions.

3\. Select Data, and then select Insert Data View.

4\. Select Add to catalog… under XML Web Services from the Data Source Catalog dialog.

5\. In the Data Source Properties window enter the location for the Lists Web Service in the Service description location box and click Connect Now.  The Lists Web Service is typically located at http://<portal>/<site>/\_vti\_bin/Lists.asmx?WSDL.

6\. Select ListsSoap and GetListItems in the Port: and Operation: menus.

7\. Double-click the listName Name in the Parameters(\*required) dialog.

8\. Enter the name of the List that contains the content for the Web Part in the Value: box and click OK.

9\. Click OK on the Data Source Properties window.

10\. Click the Web Service from the Data Source Catalog dialog and then select Insert Data View from the menu.

11\. Remove the ows\_Attachements, ows\_Title, and ows\_ID columns from the Data View.

12\. Select Data from the Microsoft Office FrontPage 2003 taskbar, and then select Style…. from the menu.

13\. Select the dropdown HTML view from the list of available views in the View Styles window and click OK.  Click Yes if presented with a formatting warning dialog.

**Edit the XSL Transform Data View Web Part Source Code**

1\. Click Code on the Microsoft Office FrontPage 2003 page view options menu.

2\. Locate the line <select name="ID" size="1"> and replace with <select name="spjump" onchange="window.open(this.options\[this.selectedIndex\].value)">.

3\. Enter the JavaScript below above the line <select name="spjump" onchange="window.open(this.options\[this.selectedIndex\].value)">.

<!--

\-->function menu\_spjump(path) {

window.open = path.options\[path.selectedIndex\].value;

}

//-->

**NOTE** You can optionally replace the text Choose One… in the line <option selected="true" value="0">Choose One...</option> to suit your needs, this is the default dropmenu option visible in the Web Part.

4\. Locate the line <option style="display:{$GroupStyle}"> and replace with <option>.

5\. Enter the following XSL attributes below the line <option>.

<xsl:attribute name="value">

<xsl:value-of select="@ows\_URL"/>

</xsl:attribute>

6\. Save the page.

**Refresh the Windows SharePoint Services List**

1.  Open the Windows SharePoint Services list in your browser.  Your XSL Data View will be visible below the standard List view.

**Additional Options**

If you would like to use the dropdown menu on another area of your site or install the menu as a Web Part elsewhere in your SharePoint environment, repeat the steps in the section Connect to the Windows SharePoint Services Lists Web Service; however, prior to step 3, select Data, and the select Web Part Zone from the menu in Microsoft Office FrontPage 2003, then proceed to with the remaining steps.  This option will create a Web Part in which the dropdown menu will be hosted.  You can export the Web Part from the Lists page in Windows SharePoint Services and uploaded the Web Part to other sites in your SharePoint environment on elsewhere on your site. The dropdown menu will show content added to your list.  If you would like to leverage the OPTGROUP element, simply create an additional column in your List labeled OPTGROUP and call the values in the XSL stylesheet for the List.

If you have any questions on how to implement steps in this tutorial or require troubleshooting assistance, please comment below.