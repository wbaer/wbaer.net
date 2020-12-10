---
title: 'Best Practices: Are your DIPs alive? Alternate Access Mapping may be the answer...'
date: Sat, 28 Oct 2006 02:52:00 +0000
draft: false
tags: ['Microsoft Office SharePoint Server 2007', 'Uncategorized', 'Windows SharePoint Services 3.0']
---

Historically alternate access settings provided a mechanism to identify the different ways in which users access portal sites; in MSIT we've taken that practice one step further and leverage alternate access mappings (AAM) as a means to identify problem web front-ends in a NLB cluster. As an example an NLB (network load balancing) cluster may be bound to a VIP (virtual IP address) with a mapping of foo, where the hosts are foo1 and foo2, by leveraging alternate access mappings we can DIP test foo1 and foo2 both independently and through the **Microsoft Operations Manager** (**MOM**) Web Sites and Services Management Pack. The basic rules of AAM are that every alternate access setting entry must have a default URL, at which point each can have additional alternate acccess methods for either intranet, extranet, or custom access. Each URL though must differ from all other URLs. These mappings are stored in the configuration database. **Microsoft Office SharePoint Server 2007** uses the default URL for any requested URL that is not found in the mapping table.

For more information about Alternate Portal Access Settings in **Microsoft Office SharePoint Portal Server 2003** visit [http://office.microsoft.com/en-us/assistance/HA011603021033.aspx](http://office.microsoft.com/en-us/assistance/HA011603021033.aspx).