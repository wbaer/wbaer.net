+++ 
title = "Going Static" 
date = 2020-12-09T13:10:22-08:00 
images = [] 
tags = ['Open Source', 'Static', 'Hugo', 'Go', 'lunr', 'GitHub', 'Utterances'] 
draft = false
+++

You’ve probably noticed some changes around here over the last couple of days.  After 15 years of maintaining my blog and 20 of maintaining this domain I’ve decided to consolidate the two - my “splash” page at wbaer.net and blog at blog.wbaer.net.
\
\
For the last 15 years I’ve maintained my “technical” blog on TechNet or more recently (with the sunsetting of TechNet blogs a while ago) on Wordpress.com.  Wordpress.com at the time was more or less the proverbial “path of least resistance" since TechNet had transitioned from Telligent to WordPress several years ago - making the migration options an easy decision.
\
\
Fast forward a few years and I’ve ended up with a bunch a fragmented solutions spread across disparate providers, using different languages, etc.  For example, in addition to WordPress (on Wordpress.com and later self hosted), I’ve been hosting my splash page on Media Temple (since 2001 - check out the archives) first, dynamic (PHP / MySQL) and later as flat HTML - needless to say, it was time to look for something different.
\
\
Since late 2019 I’ve been meaning to make the transition over to static, but it never bubbled up as a priority.  That said over the past week or so I started to put into buckets what I wanted to accomplish as a forcing function to start making the shift.  Among those buckets or otherwise priorities in relative order were:  consolidation, consistency, and ease of maintaining the end result.  So what you see here is what I would call the ‘MVP’ of this effort.
\
\
Taking a step back where I ended landing is:
\
\
GitHub Pages
Hugo
Utteranc.es
lunr
\
\
For those not familiar with Hugo, Hugo is a static site generator written in Go - and Go is a statically typed, compiled programming language syntactically similar to C.  The benefits of Hugo are numerous, performance aside, Hugo makes putting together static sites simple and takes data files, i18n bundles, configuration, templates for layouts, static files, and content written in Markdown or Org-mode.  This post for example, was written in Markdown.
\
\
The learning curve was next to none; however, it took some time to understand Hugo’s lookup order, theming, etc.  On the latter, there’s a wide assortment of themes available for Hugo, but I opted to preserve some of the thematic elements I put together over the years across my splash page and blog when consolidating the two here.  Building a theme was probably the most arduous part of this endeavor.
\
\
So where do GitHub Pages come into the equation?  This decision was made simple… while I have hosting at both GoDaddy and Media Temple, I wasn’t really taking advantage of the benefits of those subscriptions for the simple purposes I was using them for and one of my priorities was consolidation.  GitHub Pages provided everything I needed, versioning, deployment automation, etc.  A few DNS updates later and I had redirected my domain and within an hour or two, GitHub generated my certificates and I was up and running.  The second thing that factored into GitHub was commenting…. Wordpress provides a great system for accepting and curating comments and I wanted to retain some of that benefit.  While I see a lot of sites using Discus, consolidation was my objective, so I chose to use Utteranc.es.  Utteranc.es is a lightweight comments widget, which allows you to use Github Issues for blog comments. It’s open source, clean, and comments are stored on Github - when Utterances loads, the GitHub issue search API is used to find the issue associated with the page based on url, pathname or title.
\
\
**NOTE** Since writing this post this site is now served by Netlify.  While GitHub Pages provided a good solution, I'm preferential to Netlify's deployment automation.
\
\
Next up is lunr.  I next wanted a low overhead search solution I could integrate that was both simple and extendible (Hugo doesn’t have a native provider).  While the search box isn’t apparent yet here (hence the MVP among other small issues), it was surprisingly simple to extend lunr to Hugo and generate the requisite JSON representation of my content to serve to lunr.js.
\
\
I have a ton more to post related to this effort, so expect more detailed information on making the transition from WordPress to Hugo (including how to export WordPress content into a format readable by Hugo).
\
\
Now to the issues - yes there were and are issues aplenty.  You’ll see them on some of the older posts, both those from WordPress and Telligent - most of these issues are formatting related.  For example, table translations to Markdown didn’t quite come through - but considering I was working with 15+ years of content that predominantly resided in databases, I’ll make concessions on the smaller issues…
\
\
This journey is far from complete as the migration from WordPress and the static content from Media Temple (including building this site out with Hugo) has all been done in 48 hours.  
\
\
Next steps are to get search up and running, update the design to use a CSS Grid Layout (so I can spend less time writing media queries), and apply a little more design touch.
\
\
If you see any issues, feel free to leave a comment.