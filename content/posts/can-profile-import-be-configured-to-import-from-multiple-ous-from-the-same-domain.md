---
title: 'Can Profile Import be configured to import from multiple OU''s from the same domain?'
date: Wed, 08 Nov 2006 22:40:00 +0000
draft: false
tags: ['People and Profiles', 'Uncategorized']
---

**Microsoft Office SharePoint Server 2007** does not allow more than one connection to a domain; if you'd like to configure a custom import, such as a specific user filter (&(objectCategory=Person)(objectClass=User)), you can create a single connection with the common search base (DC=foo,DC=bar) and add a more restricted user filter to limit the users imported.