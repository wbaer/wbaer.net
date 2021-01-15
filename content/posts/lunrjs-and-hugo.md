---
title: 'Getting started with Lunr.js and Hugo'
date: Thu, 14 Jan 2021 23:08:03 +0000
draft: false
tags: ['Lunrjs', 'Hugo', 'Go']
---

A few weeks ago I posted on using Algolia Search with Hugo.  As mentioned in that post, I currently use Lunr to serve the purposes of search on this site and am finally getting around to posting how to pull together the two.

Lunr, unlike other search services, has no external dependencies and works either within the browser or on the server with node.js - at its core it's a small, full-text search library for use in the browser.  Lunr describes itself as "A bit like Solr, but much smaller and not as bright."

The beauty of Lunr, particularly with static site generators such as Hugo is that with all their data already sitting in the client, it makes sense to be able to search that data on the client too. Lunr therefore mitigates the need to add additional, compacted services on the services.  As a result, you have a local search index that's quicker,there is no network overhead, and best of all remains available and usable even without a network connection.

While, depending on the scope of the content indexed, there's a bit of overhead loading an index, but the performance of loading the SERP from a preloaded index is undeniable.

Now to getting started...

If you read my post on Algolia, the first thing we need to do is generate an index in a format (key value pairs) that can be read by Lunr, fortunately, we can use the same "shim" methodology we used with Algolia with no modification (for basic purposes).

Using the same "shim" code we used for Algolia previously, we can generate the JSON needed by Lunr.  To do that, we need to create a new file in our projects' layouts/_default directory named list.lunr.json and paste the following code.

        {{- $.Scratch.Add "index" slice -}}
        {{- $section := $.Site.GetPage "section" .Section }}
              {{- range .Site.AllPages -}}
                    {{- if or (and (.IsDescendant $section) (and (not .Draft) (not .Params.private))) $section.IsHome -}}
                          {{- $.Scratch.Add "index" (dict "objectID" .UniqueID "date" .Date.UTC.Unix "description" .Description "dir" .Dir "expirydate" .ExpiryDate.UTC.Unix "fuzzywordcount" .FuzzyWordCount "keywords" .Keywords "kind" .Kind "lang" .Lang "lastmod" .Lastmod.UTC.Unix "permalink" .Permalink "publishdate" .PublishDate "readingtime" .ReadingTime "relpermalink" .RelPermalink "summary" .Summary "title" .Title "type" .Type "url" .URL "weight" .Weight "wordcount" .WordCount "section" .Section "tags" .Params.Tags "categories" .Params.Categories "authors" .Params.Authors)}}
                          {{- end -}}
              {{- end -}}
        {{- $.Scratch.Get "index" | jsonify -}}

The code above uses Hugo’s .Scratch function which acts as a “scratchpad” to allow for writable page- or shortcode-scoped variables. We’re using .Scratch.Add to add multiple values to the same variable or key while iterating over your sites' regular pages and assembling a JSON file with the title, date, URL, summary, and tags of each. To create the aforementioned Object ID for each record we’re using Hugo’s .File.UniqueID variable, which returns the MD5-checksum of the content file’s path.

Now before we get started, we need to instruct Hugo as to the expected output formats we'd like to see.

To configure our output, open config.toml (or otherwise config.yaml or .json depending upon your preferences) and paste the following (this example is in .toml):

        [outputs]
        home = ["HTML","RSS","Lunr"]
        
        [outputFormats.Lunr]
        baseName = "lunr"
        isPlainText = true
        mediaType = "application/json"
        notAlternative = true
        
        [params.lunr]
        vars = ["title", "summary", "date", "publishdate", "expirydate", "permalink"]
        params = ["categories", "tags"]

Here we’re creating a new output format labeled as “Lunr”. with a baseName of “lunr” which will prepend our output file, e.g. lunr.json, a value for isPlainText, the mediaType, and a value for nonAlternative.

With both our "shim" in place and output defined in config.toml we can generate the Lunr index, which is as simple as running our Hugo build command, e.g. "hugo".  This should generate a file lunr.json in your project, which is the index we'll call with Lunr.

Next we need to to call Lunr in our project.  

We can simply include the lunr.js source file in the page that you want to use it. Lunr.js is supported in all modern browsers.

        <script src="https://unpkg.com/lunr/lunr.js"></script>

Alternatively an npm package is also available via npm install lunr.

The above steps show how to quickly get full text search with Lunr. 

To review what we've done here, we generated an index in a format that Lunr accepts and included lunr.js source file in our page.  The next step is to create a search form and script to render our results.

The first thing you need is a search form itself, I'll defer to your requirements as to how you'd like to implement your form, but at minimum you need an input field with a defined Id we'll call.

Once we have our form, we need our SERP or otherwise, where we'll generate our results.  In my case here we'll use a template as our preferred SERP on the same page as the form itself.

        <template id="mdl-wb__search-result" hidden>
                <article class="content post">
                    <h4 class="post-title"><a class="search-result__link"></a></h4>
                    <p class="search-result__summary"></p>
                    <div>
                        <span class="mdl-button mdl-js-button mdl-button--accent" role="button"><a class="search-result__button">Expand Result</a></span>
                    </div>
                </article>
        </template>

Now that we have our form, here's an example of the aforementioned script we'll need (based on how I use Lunr here).

        window.addEventListener("DOMContentLoaded", function(event)
        {
        var index = null;
        var lookup = null;
        var queuedTerm = null;

        var form = document.getElementById("search");
        var input = document.getElementById("search-expandable");

        form.addEventListener("submit", function(event)
        {
            event.preventDefault();

            var term = input.value.trim();
            if (!term)
            return;

            startSearch(term);
        }, false);

        function startSearch(term)
        {
            form.setAttribute("data-running", "true");

            if (index)
            {
            search(term);
            }
            else if (queuedTerm)
            {
            queuedTerm = term;
            }
            else
            {
            queuedTerm = term;
            initIndex();
            }
        }

        function searchDone()
        {
            form.removeAttribute("data-running");

            queuedTerm = null;
        }

        function initIndex()
        {
            var request = new XMLHttpRequest();
            request.open("GET", "https://example.com/lunr.json");
            request.responseType = "json";
            request.addEventListener("load", function(event)
            {
            lookup = {};
            index = lunr(function()
            {
                this.ref("url");
                this.field("title");
                this.field("summary");

                for (var doc of request.response)
                {
                this.add(doc);
                lookup[doc.url] = doc;
                }
            });
                
            search(queuedTerm);
            }, false);
            request.addEventListener("error", searchDone, false);
            request.send(null);
        }

        function search(term)
        {
            var results = index.search(term);
            var target = document.querySelector(".mdl-wb .search-result__container");

            while (target.firstChild)
            target.removeChild(target.firstChild);

            var title = document.createElement("h3");

            if (results.length == 0)
            title.textContent = `No results found for “${term}”`;
            else if (results.length == 1)
            title.textContent = `Found one result for “${term}”`;
            else
            title.textContent = `Found ${results.length} results for “${term}”`;
            target.appendChild(title);
            document.title = title.textContent;

            var template = document.getElementById("mdl-wb__search-result");
            for (var result of results)
            {
            var doc = lookup[result.ref];
            var element = template.content.cloneNode(true);
                
            element.querySelector(".search-result__link").href = element.querySelector(".search-result__button").href = doc.url;
            element.querySelector(".search-result__link").textContent = doc.title;
            element.querySelector(".search-result__summary").textContent = truncate(doc.summary, 70);
                
            target.appendChild(element);
            }
            title.scrollIntoView(true);

            searchDone();
        }

        function truncate(text, minWords)
        {
            var match;
            var result = "";
            var wordCount = 0;
            var regexp = /(\S+)(\s*)/g;
            while (match = regexp.exec(text))
            {
            wordCount++;
            if (wordCount <= minWords)
                result += match[0];
            else
            {
                var char1 = match[1][match[1].length - 1];
                var char2 = match[2][0];
                if (/[.?!"]/.test(char1) || char2 == "\n")
                {
                result += match[1];
                break;
                }
                else
                result += match[0];
            }
            }
            return result;
        }
        }, false);

In my case, I use the above as search.js in my project and call it immediately following the inclusion of lunr.js.

That's about it - now you should be able to build your site as normal and start searching.

This has been a rather brief walkthrough and if you're interested in seeing how I'm using Lunr and Hugo here, just scroll to the bottom of the page and click the code icon to view the source of this site.

To learn more about Lunr visit https://lunrjs.com/guides/getting_started.html.