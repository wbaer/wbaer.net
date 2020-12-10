---
title: 'Please don''t put that in my GAC...'
date: Fri, 05 Oct 2007 11:12:00 +0000
draft: false
tags: ['Uncategorized']
---

I have had the opportunity over the past two weeks to speak with several customers in regards to SharePoint Products and Technologies as a platform, geographically disperse architectural considerations, but one question stood out that was shared by each of these customers - "How do you \[Microsoft\] manage customizations in your SharePoint deployments?".  Before beginning to answer the question, I immediately realized how both widespread and common customization on this iteration of SharePoint is when compared to its predecessors.  In the past commentary was directed at whether or not to consider customization as opposed to having the anticipation of future customizations on the platform - so I was pleased to see that customers are recognizing the platforms' extensibility and ability to go beyond the _out of the box experience_. 

Customization is something we both encourage and plan for inside of Microsoft, but to be successful at managing what customizations we would consider as a candidate for deployment we first had to establish a clear set of ground rules in the form of a customization policy.  Our customization policy defines for would be developers what we will allow for introduction into any of our server farms and also acts as an guide to identify and encourage development best practices.

The most important aspect of considering a customization for deployment is gaining an understanding of that proposed customization.  When approached with a customization request, we will initially ask for both a functional and technical specification.  The functional specification is intended to provide insight into what the customization is, what the developer is trying to achieve, and for what purpose the customization will serve, for example, to fill a gap in the product or extend an existing feature set.  The technical specification is used to provide a definition of how the developer proposes to implement the customization, what calls they intend to make, and a description of the general underlying architecture of the customization.  Using this information we can evaluate their statements, make recommendations on alternative ways to achieve the same goal whether those be through fewer calls to the OM, customization best practices as defined in our customization policies, or if similar functionality can be found out of the box.

Now we've addressed two of the most important initial aspects of any platform development and customization, we've established a clear set of rules to follow and have engaged on the overall proposal and its associated requirements.

So what do we consider best practices and safe development?

As much as I would like to address every situation and aspect of safe developing on SharePoint Products and Technologies, there are too many considerations to be captured here.  As a general resource, I encourage reviewing a public iteration of our customization policy [here](http://go.microsoft.com/fwlink/?linkid=92311&clcid=0x409) ([http://go.microsoft.com/fwlink/?linkid=92311&clcid=0x409](http://go.microsoft.com/fwlink/?linkid=92311&clcid=0x409 "http://go.microsoft.com/fwlink/?linkid=92311&clcid=0x409")).  I would consider one of our primary goals as limiting the number of calls to the OM to as few as possible - while as rich as the OM is, we cannot afford every developer the resources to make frequent and/or unnecessary calls to the OM.  From an end-user/consumer perspective at Microsoft we openly permit the use of WYSIWYG editors, for example, Microsoft Office SharePoint Designer 2007 since the penalty for _unghosted_ pages is significantly less than that in Windows SharePoint Services 2.0 due to improvements in the .NET 2.0 runtime.

One of the most common customizations we've found both in previous versions and the current product is the desire to brand the user interface for a customized look and feel.  In Windows SharePoint Services 2.0 our end-users/consumers were limited to the use of Microsoft Office FrontPage 2003 since our customization policy prevented the implementation of site templates and definitions due to the uncertainties and challenges when presented with an upgrade.  Although our policy has not changed in that aspect, with Windows SharePoint Services 3.0 we have introduced alternative solutions that we can recommend to substitute for the use of site templates and definitions such as Master Pages.  While Master Pages present an excellent vehicle for customization of the user interface, there remains a risk that we may rethink or alter our policies concerning the use of Microsoft Office SharePoint Designer 2007 limiting the implementation of Master Pages by our end-users/consumers.  To mitigate that risk we encourage wrapping Master Pages into a deployable Feature that can be implemented at the site collection level through the use of a Feature receiver to remove the requirement of application through Microsoft Office SharePoint Designer 2007 (see sample code).

About Master Pages

Master Pages provide the look, feel, and standard behaviors for all of the pages in a site.  See also [http://msdn2.microsoft.com/en-us/library/ms443795.aspx](http://msdn2.microsoft.com/en-us/library/ms443795.aspx "http://msdn2.microsoft.com/en-us/library/ms443795.aspx").

```
    public class FeatureReciever : SPFeatureReceiver
    {
        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
                using (SPWeb oWebsiteRoot = (SPWeb)properties.Feature.Parent)
                {
                    string MasterPageFile = string.Empty;
                    MasterPageFile = properties.Feature.Properties\["MasterName"\].Value;
                    if ((MasterPageFile != null) && (MasterPageFile != string.Empty))
                    {
                        using (SPSite oSiteCollection = oWebsiteRoot.Site)
                        {
                            SPList oList = Site.GetCatalog(SPListTemplateType.MasterPageCatalog);
                            SPQuery oQuery = new SPQuery();
                            oQuery.Query = "<Where><Eq><FieldRef Name="FileLeafRef" />"
                                            + "<Value Type="File">" + MasterPageFile + "</Value>"
                                               + "</Eq></Where>";
                            SPListItemCollection collListItems = oList.GetItems(oQuery);
                            if (collListItems.Count > 0)
                            {
                                string Url = string.Empty;
                                // Get the server-relative URL of the root Web site in the Site Collection.
                                Url = Site.ServerRelativeUrl.ToString();
                                if (!Url.Equals("/")) Url += "/";
                                MasterPageFile = Url + collListItems\[0\].Url.ToString();
                                // Set the URL of the master page used for the Web site to the custom master page.
                                oWebsiteRoot.MasterUrl = MasterPageFile;
                                oWebsiteRoot.CustomMasterUrl = MasterPageFile;
                                oWebsiteRoot.Update();
                            }
                        }
                    }
                }
            }
        }
```

This code snippet is provided under the [Microsoft Permissive License](http://www.microsoft.com/resources/sharedsource/licensingbasics/permissivelicense.mspx).

The next and by far most critical step in introducing a customization into a server farm is testing.  We implement a variety of areas and scenarios beginning with smoke test.  The smoke test defines whether or not the code is "good" enough to be submitted to testing, this should be determined during the initial engagements with the prospective developer and based on the agreements and conclusions after final review of the functional and technical specifications and is a core component of design validation.

Build verification testing is the process of determining whether or not the code does what it is intended to do or has been developed to do and is closely aligned with design validation.  Additional testing to be considered is API testing depending on the nature and intent of the customization, resource testing to evaluate impact on memory, processor, and disk - you can generally use the performance measurements of the target environment prior to implementation as a baseline, and additional comprehensive tests consisting of interoperability/integration testing, performance and capacity testing, privacy/security testing, reliability testing, scalability testing, stress testing (may also include volume testing), localization testing, robustness testing and usability testing.  These tests when combined will provide important details on the impact of the customization in your server farm; whether it exposes a negative result on performance, expectations under low-resources, unavailable resources, and high-latency conditions,  scale limitations, whether or not strings are localized and that code pages are mapped properly and any international settings in the application do not break functionality, if portions of the code or prone to crash, save failure, or introduce data corruption, etc.

It is important to work with the developer to make the aspects of test areas known and what are the boundaries and limitations and what constitutes acceptance criteria.  This in turn encourages the developer to focus on many aspects of the code outside of the just implementing and planning for core functionality.

During the process of testing it is a best practice to define what what dependencies there are both internal and external and develop contingency plans to include procedures for bug reporting and sustained support of the customization.  While many customizations do not fall into many of the test area categories, making them core to the customization process minimizes the risk a customization may impose of the platform and provides a clear and concise mitigation plan in the event you are faced with the unexpected.

Resources

[Windows SharePoint Services Developer Center](http://msdn2.microsoft.com/en-us/sharepoint/default.aspx)

[Windows SharePoint Services 3.0 SDK](http://msdn2.microsoft.com/library/ms441339)

[Microsoft Office SharePoint Server 2007 Developer Portal](http://msdn.microsoft.com/office/server/moss/)

[What's new for developers in Microsoft Office SharePoint Server 2007](http://msdn2.microsoft.com/en-us/library/ms585163.aspx)

[Microsoft Office SharePoint Server 2007 SDK](http://msdn2.microsoft.com/en-us/library/ms550992.aspx)