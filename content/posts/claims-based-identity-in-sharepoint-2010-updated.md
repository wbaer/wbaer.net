---
title: 'Claims-Based Identity in SharePoint 2010 [Updated]'
date: Wed, 14 Apr 2010 08:43:16 +0000
draft: false
tags: ['Claims', 'Identity']
---

Claims-based identity or Claims Mode Authentication in Microsoft SharePoint Server 2010 has been all the buzz.  Developers are looking to do more with augmentation of claims and IT Professionals are looking at new opportunities to delegate identities - whether across machine  or trust boundaries, or to provide seamless and secure solutions enabling robust interoperability scenarios with external systems.  Understanding claims-based identity is the first step in realizing its potential and to understand it, we need to understand the basic concepts and nomenclature.

Basic Definitions
-----------------

**Identities**

Identities are basically pieces of information about a person or an object, for example a user.  Identity is commonly encapsulated within a token, in a claims-based identity scenario, that token carries one or more “claims” about that user.

**Claims**

A “claim” if effectively an assertion made about an object by a trusted system.  These “claims” such as date of birth or given name as an example, are included in a token in addition to a digital signature that validates the issuer and prevents tampering.

**Issuer**

The issuer is the STS or Security Token Service, the STS gathers its information from an attribute store that contains the information about the user.  The attribute store can be Active Directory, Windows Live Id, etc.

There are many more definitions beyond these that you should be aware of, most of which can be found in the Additional Resources at the bottom of this post.  The definitions above will get you through the basic walkthrough that follows.

Identity and authentication are topics far too broad to cover in a single post, the best way to learn more is to 1) experiment with Claims Mode Authentication in Microsoft SharePoint Server 2010 (see walkthrough below) 2) read more on Claims Mode Authentication and claims-based identity (see Additional Resources at the bottom of this post).

Step-by-step Walkthrough
------------------------

This step-by-step walkthrough is intended for those looking to understand both Claim/Forms-based Authentication in Microsoft SharePoint Server 2010.  The following assumptions are made in this walkthrough:

*   You have Domain Controller with the Domain Root:  contoso.com with user objects in the Users container.

**NOTES**

If your Active Directory Domain Services configuration differs from that used in this walkthrough you will need to edit the **server** and **userContainer** attributes for the role provider and the **server** and **groupContainer** attributes for the membership provider for your configuration.

This walkthrough uses the LDAP membership and role provider that ships with Microsoft SharePoint Server 2010 and uses Active Directory Domain Services as the authorative source for users and groups.

### Create a new Web Application using Claims-based Authentication

In this step you will create a new Web application using the Uri http://claims.contoso.com using Claims-based Authentication.

1\. On the Central Administration Home page, in the **Application Management** section, click **Manage web applications**.

2\. On the ribbon, click **New**.

3\. On the Create New Web Application page, in the **Authentication** section, click **Claims Based Authentication**.

4\. In the **IIS Web Site** section click **Create a new IIS web site**, and then type the name of the Web site in the **Name** box.

5\. In the **IIS Web Site** section, in the **Port** box, type the port number you want to use to access the Web application.

6\. In the **IIS Web Site** section, in the **Host Header** box, type the URL you want to use to access the Web application as claims.contoso.com. This is an optional field.

7\. In the **IIS Web Site** section, in the **Path** box, type the path to the site directory on the server.

8\. In the **Security Configuration** section, choose whether or not to use allow anonymous access and whether or not to use Secure Sockets Layer (SSL).

    a) Under **Allow Anonymous**, click **No**.

    b) Under **Use Secure Sockets Layer (SSL)**, click **Yes** or **No**.

9\. In the **Identity Providers** section, select **Enable Windows Authentication**, and in the drop-down menu select **NTLM**.

10\. To enable forms-based authentication, select **Enable ASP.NET Membership and Role Provider**, and then enter the membership provider name and the role manager name in the boxes as LdapMembershipProvider and LdapRoleProvider respectively.

11\. In the **Sign In Page URL** section, the **Default Sign In Page URL** is selected, which will redirect users to a default sign in Web site for claims-based authentication.

12\. In the **Public URL** section, type http://claims.contoso.com as the URL for the domain name for all sites that users will access in this Web application.

13\. In the **Application Pool** section, create a new application pool for this Web application.

      To create a new application pool, click **Create a new application pool**.

      a) In the **Application pool name** box, type **Claims Application Pool** as the name of the new application pool.

      b) Under **Select a security account for this application pool**, click **Predefined**, and then select the appropriate security account from the drop-down menu.

14\. In the **Database Name and Authentication** section, choose the database server, database name, and authentication method (Windows authentication) for your new Web application.

15\. In the **Service Application Connections** section, select the service application connections that will be available to the Web application. In the drop-down menu, click **default**.

16\. In the **Customer Experience Improvement Program** section, click **Yes** or **No**.

17\. Click **OK** to create the new Web application.

### Configure Forms-based Authentication Support for Central Administration

In this step you will edit the Web.Config configuration file that corresponds with the Central Administration Web application to support Forms-based Authentication.

1\. Click **Start**, **All Programs**, **Accessories**, and then click **Windows Explorer**.

2\. Navigate to the root directory for the Central Administration Web application and open **Web.Config** in a text editor.

3\. Copy the following Xml to the Clipboard.

  <membership>  
    <providers>  
      <add name="LdapMembershipProvider"  
        type="Microsoft.Office.Server.Security.LdapMembershipProvider, Microsoft.Office.Server, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"  
        server="contoso.com"  
        port="389"  
        useSSL="false"  
        userDNAttribute="distinguishedName"  
        userNameAttribute="sAMAccountName"  
        userContainer="CN=Users,DC=contoso,DC=com"  
        userObjectClass="person"  
        userFilter="(ObjectClass=person)"  
        scope="Subtree"  
        otherRequiredUserAttributes="sn,givenname,cn" />  
    </providers>  
  </membership>  
  <roleManager enabled="true" defaultProvider="AspNetWindowsTokenRoleProvider">  
    <providers>  
      <add name="LdapRoleProvider"  
        type="Microsoft.Office.Server.Security.LdapRoleProvider, Microsoft.Office.Server, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"  
        server="contoso.com"  
        port="389"  
        useSSL="false"  
        groupContainer="CN=Users,DC=contoso,DC=com"  
        groupNameAttribute="cn"  
        groupNameAlternateSearchAttribute="samAccountName"  
        groupMemberAttribute="member"  
        userNameAttribute="sAMAccountName"  
        dnAttribute="distinguishedName"  
        groupFilter="(ObjectClass=group)"  
        userFilter="(ObjectClass=person)"  
        scope="Subtree" />  
    </providers>  
  </roleManager>

4\. Paste the contents from the Clipboard immediately following the **<system.web>** element.

5\. Save and close the Web.Config configuration file.

### Configure the Security Token Service for Forms-based Authentication

1\. Click **Start**, and then click **Control Panel** and click **System and Security**, and then click **Administrative Tools**.

2\. In the **Administrative Tools** window, double-click **Internet Information Services (IIS) Manager**.

3\. In Internet Information Services (IIS) Manager expand the Server node, and then expand the **Sites** node.

4\. Expand the **SharePoint Web Services** node and locate SecurityTokenServiceApplication, and then click **Explore** in the Action pane.

5\. Scroll to the bottom of the Web.Config configuration file and locate the **</system.net>** element.

6\. Copy the following Xml to the Clipboard.

  <membership>  
    <providers>  
      <add name="LdapMembershipProvider"  
        type="Microsoft.Office.Server.Security.LdapMembershipProvider, Microsoft.Office.Server, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"  
        server="contoso.com"  
        port="389"  
        useSSL="false"  
        userDNAttribute="distinguishedName"  
        userNameAttribute="sAMAccountName"  
        userContainer="CN=Users,DC=contoso,DC=com"  
        userObjectClass="person"  
        userFilter="(ObjectClass=person)"  
        scope="Subtree"  
        otherRequiredUserAttributes="sn,givenname,cn" />  
    </providers>  
  </membership>  
  <roleManager enabled="true">  
    <providers>  
      <add name="LdapRoleProvider"  
        type="Microsoft.Office.Server.Security.LdapRoleProvider, Microsoft.Office.Server, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"  
        server="contoso.com"  
        port="389"  
        useSSL="false"  
        groupContainer="CN=Users,DC=contoso,DC=com"  
        groupNameAttribute="cn"  
        groupNameAlternateSearchAttribute="samAccountName"  
        groupMemberAttribute="member"  
        userNameAttribute="sAMAccountName"  
        dnAttribute="distinguishedName"  
        groupFilter="(ObjectClass=group)"  
        userFilter="(ObjectClass=person)"  
        scope="Subtree" />  
    </providers>  
  </roleManager>

7\. Paste the contents from the Clipboard immediately following the **</system.net>** element.

8\. Save and close the Web.Config configuration file.

**NOTE**

In some scenarios the SharePoint Central Administration Web.Config may contain pre-existing <roleManager> and <membership> elements. Locate and remove these entries if they exist - they will commonly be located prior to the </system.web> element.

### Configure the claims.contoso.com Web Application for Forms-based Authentication

1\. Click **Start**, **All Programs**, **Accessories**, and then click **Windows Explorer**.

2\. Navigate to the root directory for the Central Administration Web application and open **Web.Config** in a text editor.

3\. Copy the following Xml to the Clipboard.

  <add name="LdapRoleProvider"   
    type="Microsoft.Office.Server.Security.LdapRoleProvider, Microsoft.Office.Server, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"   
    server="contoso.com"   
    port="389"   
    useSSL="false"   
    groupContainer="CN=Users,DC=contoso,DC=com"   
    groupNameAttribute="cn"   
    groupNameAlternateSearchAttribute="samAccountName"   
    groupMemberAttribute="member"   
    userNameAttribute="sAMAccountName"   
    dnAttribute="distinguishedName"   
    groupFilter="(ObjectClass=group)"   
    userFilter="(ObjectClass=person)"   
    scope="Subtree" />

4\. Paste the contents from the Clipboard immediately following the

  <roleManager>  
    <provider>

nodes.

5\. Copy the following Xml to the Clipboard.

  <add name="LdapMembershipProvider"   
    type="Microsoft.Office.Server.Security.LdapMembershipProvider, Microsoft.Office.Server, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"   
    server="contoso.com"   
    port="389"   
    useSSL="false"   
    userDNAttribute="distinguishedName"   
    userNameAttribute="sAMAccountName"   
    userContainer="CN=Users,DC=contoso,DC=com"   
    userObjectClass="person"   
    userFilter="(ObjectClass=person)"   
    scope="Subtree"   
    otherRequiredUserAttributes="sn,givenname,cn" />

6\. Paste the contents from the Clipboard immediately following the

  <membership>  
    <provider>

nodes.

7\. Save and close the Web.Config configuration file.

### Create a new User Policy

1\. On the Central Administration Home page, in the **Application Management** section, click **Manage web applications**.

2\. On the Web Applications Management page select the claims.contoso.com Web application.

3\. On the ribbon, click **User Policy**.

4\. On the Policy for Web Applications page click **Add Users**.

5\. On the Add Users page select **Default** from the Zones drop down and click **Next**.

6\. On the Add Users page click the Address Book icon and enter the account specifics in the Users field and press **Enter** (_you will be presented with the new claims-based People Picker user interface shown in the screenshot below_).

**NOTE**

Choose **Full Control – Has full control.** under Choose Permissions on the Add Users page.

[![Claims Picker](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6a929f9a90e8_7F6A/Claims%20Picker_thumb.png "Claims Picker")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6a929f9a90e8_7F6A/Claims%20Picker_2.png)

**NOTE**

You will be presented with two entries for each unique user representing the Active Directory and Ldap provider identities.

This completes the configuration, you can now browse to [http://claims.contoso.com](http://claims.contoso.com) and will be presented with a logon page that prompts the user to select their identity provider (see illustration).

[![Multi-mode Login](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6a929f9a90e8_7F6A/Multi-mode%20Login_thumb.png "Multi-mode Login")](https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_technet/wbaer/WindowsLiveWriter/6a929f9a90e8_7F6A/Multi-mode%20Login_2.png)

Upgrade Notes
-------------

If you were using Forms-based Authentication or WebSSO in Office SharePoint Server 2007 you will need to convert those Web applications to Claims Mode Authentication in Microsoft SharePoint Server 2010.  The first step in this process is to update the Web.Config configuration files to reflect the values in Microsoft SharePoint Server 2010 keeping in mind that the membership and role provider names you used in Office SharePoint Server 2007 must be the same in Microsoft SharePoint Server 2010.

**NOTE**

For custom membership and role providers you will always call MembershipProvider.ValidateUser Method and all of the roles you call will become claims that are presented in the SAML token.

The next step in the process is to switch to Claims|Windows authentication.  This can be achieved through Windows PowerShell using the following example script:

$webApp = Get-SPWebApplication "[http://claims.contoso.com/](http://claims.contoso.com/)"  
$webApp.UseClaimsAuthentication = $True;  
$webApp.Update()  
$webApp.ProvisionGlobally()

The final step in the process is to migrate users and permissions from the Office SharePoint Server 2007 naming conventions to the new Microsoft SharePoint Server 2010 naming conventions.  This can be achieved through Windows PowerShell using the following example script:

$webApp = Get-SPWebApplication "[http://claims.contoso.com/](http://claims.contoso.com/)"  
$webApp.MigrateUsers($True)

Additional Resources
--------------------

To learn more about the format of ASP.NET configuration files see also [http://msdn.microsoft.com/en-us/library/ackhksh7(vs.71).aspx](http://msdn.microsoft.com/en-us/library/ackhksh7(vs.71).aspx).

Read more on Claims-based Authentication in the [Microsoft SharePoint Server 2010 IT Professional Evaluation Guide](http://go.microsoft.com/fwlink/?LinkId=165421)

Read the article [Plan Authentication Methods (SharePoint Server 2010) on TechNet](http://technet.microsoft.com/en-us/library/cc262350%28office.14%29.aspx)

Read the article [Configure Forms-based Authentication for a Claims-based Web Application](http://technet.microsoft.com/en-us/library/ee806890(office.14).aspx) on TechNet (this article also provides some good upgrade material)

Read the article [Configure the Security Token Service](http://technet.microsoft.com/en-nz/library/ee806864(en-us,office.14).aspx) on TechNet

Read about [SharePoint and Claims-based Identity](http://msdn.microsoft.com/en-us/library/ee535242(office.14).aspx) on MSDN

Download and read [A Guide to Claims-Based Identity and Access Control](http://www.microsoft.com/downloads/details.aspx?FamilyID=4c09ffe4-43dd-4fcc-be35-c897c9bc4386&displaylang=en)

Download and read [Claims-Based Identity for Windows](http://download.microsoft.com/download/7/D/0/7D0B5166-6A8A-418A-ADDD-95EE9B046994/Claims-Based Identity for Windows.pdf)