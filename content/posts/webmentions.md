---
title: 'Now serving webmentions'
date: Wed, 21 Jan 2021 08:50:00 +0000
draft: false
tags: ['Webmentions', 'Hugo', 'Go', 'Indie']
---

Over the course of the past several weeks as I've made the transition from dynamic (WordPress) to static (Hugo), I've been looking at ways I could not only decentralize social, but also build that overarching objective into the fabric of this site.  Here enters [webmention](https://www.w3.org/TR/webmention/), a W3C recommendation as of January 2017.

So what exactly is webmention?  Well, as defined by the W3C, webmention is a simple way to notify any URL when you mention it on your site. From the receiver's perspective, it's a way to request notifications when other sites mention it.

Put into simpler terms, webmention is a standardized protocol that enables one address to notify another address that the former contains a reference to the latter - while allowing the latter to verify the authenticity of the reference (think pingback).  One can draw comparisons here to the humble @mention to which we're all familiar.  Regardless of canvas, it's likely you've become accustomed to this relatively standard way of communication, whether in consumer scenarios such as Twitter, Facebook, etc. or within the boundaries of commercial experiences, such as Microsoft Word.  Mentions have become the defacto mechanism to let you know you have been referenced directly or tagged in a post or photograph. 

Similar to pingback, webmention is one of the standardized forms of linkbacks, but was designed to be simpler than the XML-RPC protocol that pingback relies upon, by instead only using HTTP and x-www-urlencoded content.

So why webmention?  Here enters the problem, what if your blog post is mentioned on Twitter, or you're mentioned on Facebook but otherwise don't have a Twitter or Facebook account?  Webmention provides the "connective tissue" across these otherwise disconnected services, thereby mitigating the reliance on proprietary, opaque solutions to stitch together unrelated platforms and considering the increasing importance of privacy and identity protection, different use cases, the burden of additional usernames and passwords, and the time involved, many people don’t want to do this.

Webmention solves the problem surrounding disparate, fragmented solutions by allowing notifications between web addresses. To simplify further, if you mention this post on Twitter or Facebook, it will generate a mention here - even where I don't have an active Facebook account.

In my case there were a couple of steps required to get up and running with webmention:

1. updating any existing elements to support the Microformat classes [Microformats](https://en.wikipedia.org/wiki/Microformat).
2. wiring up webmentions

For the aforementioned Microformats, reference the link above.
For the latter webmentions, as opposed to rolling my own, I opted to take advantage of webmention.io. Webmention.io is a hosted service created to easily receive webmentions on any web page.  You can learn more about this on the IndieWeb wiki at https://indieweb.org/webmention.io.

While brief, I plan to expand on the "art of the possible" and how to get started with webmention in future posts. As usual, if you're interested in the code I'm using to generate webmention summaries and counts with Hugo, check out the source for this page by clicking the fork icon <i class="fa fa-code-fork" aria-hidden="true"></i> at the top of this page.